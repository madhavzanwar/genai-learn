export const VALID_LESSON_IDS = ['l1', 'l2', 'l3'] as const

const STORAGE_KEY = 'unlockedLessons'
const WATCHED_STORAGE_KEY = 'watchedLessons'
const COURSES_STORAGE_KEY = 'unlockedCourses'

export function getUnlockedLessons(): string[] {
  if (typeof window === 'undefined') return ['l1']
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return ['l1']
    const parsed = JSON.parse(stored) as string[]
    if (!Array.isArray(parsed)) return ['l1']
    // Filter strictly to valid lesson IDs (l1..l6), ignoring any legacy strings
    const valid = parsed.filter((id) => (VALID_LESSON_IDS as readonly string[]).includes(id))
    const result = Array.from(new Set(['l1', ...valid]))
    return result
  } catch {
    return ['l1']
  }
}

export function saveUnlockedLessons(lessonIds: string[]) {
  if (typeof window === 'undefined') return
  try {
    const valid = lessonIds.filter((id) => (VALID_LESSON_IDS as readonly string[]).includes(id))
    const result = Array.from(new Set(['l1', ...valid]))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result))

    // Save to active account if logged in
    syncAccountData({ unlockedLessons: result })
  } catch {
    // ignore
  }
}

export function unlockLesson(lessonId: string): string[] {
  if (!(VALID_LESSON_IDS as readonly string[]).includes(lessonId)) {
    return getUnlockedLessons()
  }
  const current = getUnlockedLessons()
  if (current.includes(lessonId)) return current
  const updated = [...current, lessonId]
  saveUnlockedLessons(updated)
  return updated
}

export function getWatchedLessons(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(WATCHED_STORAGE_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored) as string[]
    if (!Array.isArray(parsed)) return []
    return parsed.filter((id) => (VALID_LESSON_IDS as readonly string[]).includes(id))
  } catch {
    return []
  }
}

export function saveWatchedLessons(lessonIds: string[]) {
  if (typeof window === 'undefined') return
  try {
    const valid = lessonIds.filter((id) => (VALID_LESSON_IDS as readonly string[]).includes(id))
    localStorage.setItem(WATCHED_STORAGE_KEY, JSON.stringify(valid))
    syncAccountData({ watchedLessons: valid })
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

export function getUnlockedCourses(): string[] {
  if (typeof window === 'undefined') return ['intro-to-genai']
  try {
    const stored = localStorage.getItem(COURSES_STORAGE_KEY)
    const list = stored ? (JSON.parse(stored) as string[]) : []
    const unlockedLessons = getUnlockedLessons()

    const unlockedCourses: string[] = ['intro-to-genai']
    // Course 2 ("prompt-engineering") unlocks ONLY when all 6 lessons of Course 1 are completed
    const allCourse1Completed = (VALID_LESSON_IDS as readonly string[]).every((id) =>
      unlockedLessons.includes(id)
    )
    if (allCourse1Completed) {
      unlockedCourses.push('prompt-engineering')
      // Only include additional unlocked courses if Course 1 was fully completed
      if (Array.isArray(list)) {
        list.forEach((cid) => {
          if (typeof cid === 'string' && !unlockedCourses.includes(cid)) {
            unlockedCourses.push(cid)
          }
        })
      }
    }

    return unlockedCourses
  } catch {
    return ['intro-to-genai']
  }
}

export function saveUnlockedCourses(courseIds: string[]) {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courseIds))
    syncAccountData({ unlockedCourses: courseIds })
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

/**
 * Resets student progress to a clean initial state:
 * - Only Lesson 1 unlocked
 * - Only Course 1 ("Introduction to Generative AI") unlocked
 * - 0 watched lessons
 */
export function resetStudentProgress() {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(['l1']))
    localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(['intro-to-genai']))
    localStorage.setItem(WATCHED_STORAGE_KEY, JSON.stringify([]))
  } catch {
    // ignore
  }
}

/**
 * Synchronizes progress to the currently logged in user account in genai_accounts
 */
function syncAccountData(partial: {
  unlockedLessons?: string[]
  watchedLessons?: string[]
  unlockedCourses?: string[]
}) {
  if (typeof window === 'undefined') return
  try {
    const currentUser = localStorage.getItem('genai_user')
    if (!currentUser) return
    const stored = localStorage.getItem('genai_accounts')
    if (!stored) return
    const accounts = JSON.parse(stored)
    const idx = accounts.findIndex(
      (a: any) => a.name?.toLowerCase() === currentUser.toLowerCase()
    )
    if (idx !== -1) {
      accounts[idx] = { ...accounts[idx], ...partial }
      localStorage.setItem('genai_accounts', JSON.stringify(accounts))
    }
  } catch {
    // ignore
  }
}
