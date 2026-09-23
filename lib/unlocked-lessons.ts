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

const COURSES_STORAGE_KEY = 'unlockedCourses'

export function getUnlockedCourses(): string[] {
  if (typeof window === 'undefined') return ['intro-to-genai']
  try {
    const stored = localStorage.getItem(COURSES_STORAGE_KEY)
    const list = stored ? (JSON.parse(stored) as string[]) : []
    const unlockedLessons = getUnlockedLessons()
    
    const autoUnlocked: string[] = ['intro-to-genai']
    // If learner passed lesson 1 quiz (l2 unlocked), unlock prompt engineering
    if (unlockedLessons.length > 1 || unlockedLessons.includes('l2')) {
      autoUnlocked.push('prompt-engineering')
    }
    // If learner progressed through 4 lessons, unlock advanced fine tuning
    if (unlockedLessons.length >= 4 || unlockedLessons.includes('l4')) {
      autoUnlocked.push('fine-tuning-llms')
    }
    // If all 6 lessons unlocked, unlock remaining applied tracks
    if (unlockedLessons.length >= 6 || unlockedLessons.includes('l6')) {
      autoUnlocked.push('ai-for-data-analysis', 'langchain-applications')
    }

    return Array.from(new Set([...autoUnlocked, ...list]))
  } catch {
    return ['intro-to-genai']
  }
}

export function saveUnlockedCourses(courseIds: string[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courseIds))
  } catch {
    // ignore
  }
}

export function unlockCourse(courseId: string): string[] {
  const current = getUnlockedCourses()
  if (current.includes(courseId)) return current
  const updated = [...current, courseId]
  saveUnlockedCourses(updated)
  return updated
}

export function isCourseUnlocked(courseId: string): boolean {
  if (courseId === 'intro-to-genai') return true
  return getUnlockedCourses().includes(courseId)
}
