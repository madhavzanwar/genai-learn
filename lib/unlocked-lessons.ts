const STORAGE_KEY = 'unlockedLessons'

export function getUnlockedLessons(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? (JSON.parse(stored) as string[]) : []
  } catch {
    return []
  }
}

export function saveUnlockedLessons(lessonIds: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(lessonIds))
}

export function unlockLesson(lessonId: string): string[] {
  const current = getUnlockedLessons()
  if (current.includes(lessonId)) return current
  const updated = [...current, lessonId]
  saveUnlockedLessons(updated)
  return updated
}
