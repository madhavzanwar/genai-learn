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
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lessonIds))
  } catch {
    // ignore
  }
}

export function unlockLesson(lessonId: string): string[] {
  const current = getUnlockedLessons()
  if (current.includes(lessonId)) return current
  const updated = [...current, lessonId]
  saveUnlockedLessons(updated)
  return updated
}

const WATCHED_STORAGE_KEY = 'watchedLessons'

export function getWatchedLessons(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(WATCHED_STORAGE_KEY)
    return stored ? (JSON.parse(stored) as string[]) : []
  } catch {
    return []
  }
}

export function saveWatchedLessons(lessonIds: string[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(WATCHED_STORAGE_KEY, JSON.stringify(lessonIds))
  } catch {
    // ignore
  }
}

export function markLessonWatched(lessonId: string): string[] {
  const current = getWatchedLessons()
  if (current.includes(lessonId)) return current
  const updated = [...current, lessonId]
  saveWatchedLessons(updated)
  return updated
}

export function isLessonWatched(lessonId: string): boolean {
  return getWatchedLessons().includes(lessonId)
}
