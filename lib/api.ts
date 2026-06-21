const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

export async function register(name: string, email: string, password: string) {
  const res = await fetch(`${BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Registration failed')
  return data as { token: string; name: string; email: string }
}

export async function login(email: string, password: string) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Login failed')
  return data as {
    token: string
    name: string
    email: string
    unlockedLessons: string[]
  }
}

export async function submitQuiz(
  courseId: string,
  answers: number[],
  token: string
) {
  const res = await fetch(`${BASE}/quiz/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ courseId, answers }),
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Quiz submission failed')
  return data as {
    score: number
    passed: boolean
    unlockedLessons: string[]
    hints?: { question: string; hint: string }[]
  }
}

export async function getProgress(token: string) {
  const res = await fetch(`${BASE}/progress`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.message || 'Failed to fetch progress')
  return data as { unlockedLessons: string[] }
}
