function getApiBase() {
  const raw = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
  const trimmed = raw.replace(/\/$/, '')
  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`
}

const BASE = getApiBase()

async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeoutMs: number = 4000
): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    })
    return res
  } finally {
    clearTimeout(timeoutId)
  }
}

export async function register(name: string, email: string, password: string) {
  const res = await fetchWithTimeout(
    `${BASE}/auth/register`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    },
    5000
  )

  let data: any
  try {
    data = await res.json()
  } catch {
    throw new Error('Registration server unreachable')
  }

  if (!res.ok) throw new Error(data.message || 'Registration failed')
  return data as { token: string; name: string; email: string }
}

export async function login(email: string, password: string) {
  const res = await fetchWithTimeout(
    `${BASE}/auth/login`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    },
    5000
  )

  let data: any
  try {
    data = await res.json()
  } catch {
    throw new Error('Login server unreachable')
  }

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
  token: string,
  lessonId: string = 'l1'
) {
  const res = await fetchWithTimeout(
    `${BASE}/quiz/submit`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ courseId, answers, lessonId }),
    },
    3500
  )

  let data: any
  try {
    data = await res.json()
  } catch {
    throw new Error('Invalid response from quiz server')
  }

  if (!res.ok) throw new Error(data.message || 'Quiz submission failed')
  return data as {
    score: number
    passed: boolean
    unlockedLessons: string[]
    hints?: { question: string; hint: string }[]
  }
}

export async function getProgress(token: string) {
  const res = await fetchWithTimeout(
    `${BASE}/progress`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    3500
  )

  let data: any
  try {
    data = await res.json()
  } catch {
    throw new Error('Failed to parse progress response')
  }

  if (!res.ok) throw new Error(data.message || 'Failed to fetch progress')
  return data as { unlockedLessons: string[] }
}

export async function explainConcept(concept: string) {
  const res = await fetchWithTimeout(
    `${BASE}/ai/explain`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ concept }),
    },
    6000
  )

  let data: any
  try {
    data = await res.json()
  } catch {
    throw new Error('AI tutor server unreachable')
  }

  if (!res.ok) throw new Error(data.message || 'AI tutor unavailable')
  return data as { explanation: string }
}
