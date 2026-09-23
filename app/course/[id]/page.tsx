'use client'

import { use, useState, Suspense, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  ArrowLeft, 
  Info, 
  Loader2, 
  CheckCircle2, 
  ChevronDown, 
  X, 
  Lock, 
  PlayCircle 
} from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { LessonSidebar } from '@/components/lesson-sidebar'
import { courses, courseModules } from '@/lib/data'
import { explainConcept } from '@/lib/api'
import { isLessonWatched, markLessonWatched } from '@/lib/unlocked-lessons'
import { notFound } from 'next/navigation'

function findLesson(lessonId: string) {
  for (let modIndex = 0; modIndex < courseModules.length; modIndex++) {
    const mod = courseModules[modIndex]
    const lessonIndex = mod.lessons.findIndex((l) => l.id === lessonId)
    if (lessonIndex !== -1) {
      return { lesson: mod.lessons[lessonIndex], mod, modIndex, lessonIndex }
    }
  }
  return null
}

export default function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  return (
    <Suspense>
      <CoursePageContent params={params} />
    </Suspense>
  )
}

function CoursePageContent({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const searchParams = useSearchParams()
  const router = useRouter()
  const lessonId = searchParams.get('lesson') || 'l1'
  const [videoWatched, setVideoWatched] = useState(false)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [askInput, setAskInput] = useState('')
  const [aiResponse, setAiResponse] = useState<string | null>(null)
  const [aiLoading, setAiLoading] = useState(false)

  const course = courses.find((c) => c.id === id)
  const lessonData = findLesson(lessonId)
  if (!course || !lessonData) notFound()

  const { lesson, modIndex, lessonIndex } = lessonData
  const totalLessons = courseModules.reduce((acc, m) => acc + m.lessons.length, 0)

  useEffect(() => {
    setVideoWatched(isLessonWatched(lessonId))
  }, [lessonId])

  // Prevent scroll when mobile drawer is open & handle escape key
  useEffect(() => {
    if (!mobileDrawerOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileDrawerOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [mobileDrawerOpen])

  const handleMarkWatched = () => {
    markLessonWatched(lesson.id)
    setVideoWatched(true)
  }

  const goToQuiz = () => {
    if (videoWatched) router.push(`/quiz/${id}?lesson=${lessonId}`)
  }

  const handleAskAI = async () => {
    if (!askInput.trim() || aiLoading) return

    setAiLoading(true)
    setAiResponse(null)

    try {
      const data = await explainConcept(askInput.trim())
      setAiResponse(data.explanation)
    } catch (err) {
      setAiResponse(
        err instanceof Error
          ? err.message
          : 'AI tutor is unavailable. Please try again.'
      )
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="h-14 px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <Link 
              href="/"
              className={buttonVariants({ variant: 'ghost', size: 'sm', className: 'shrink-0 -ml-2' })}
            >
              <ArrowLeft data-icon="inline-start" />
              Back
            </Link>
            <Separator orientation="vertical" className="h-5" />
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-foreground truncate tracking-tight">
                {course.title}
              </p>
              <p className="text-[11px] text-muted-foreground">by {course.instructor}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {!videoWatched && (
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                <Lock className="size-3 text-amber-600 shrink-0" />
                Watch video to unlock quiz
              </span>
            )}
            <Button 
              size="sm" 
              disabled={!videoWatched} 
              onClick={goToQuiz}
              title={!videoWatched ? 'Mark video as watched to unlock the quiz' : 'Take Lesson Quiz'}
            >
              {!videoWatched ? 'Take Quiz (Locked)' : 'Take Quiz'}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6">
        {/* Mobile Lesson Navigation Bar (< 1024px) */}
        <div className="lg:hidden sticky top-16 z-30 mb-4 bg-card/95 backdrop-blur-md border border-border rounded-xl p-3 shadow-xs flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider truncate">
              Module {modIndex + 1} &middot; Lesson {lessonIndex + 1}
            </div>
            <div className="text-[13px] font-semibold text-foreground truncate mt-0.5">
              {lesson.title}
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMobileDrawerOpen(true)}
            className="shrink-0 h-8 px-2.5 text-xs font-medium flex items-center gap-1.5 border-border hover:bg-muted"
            aria-label="Change lesson"
          >
            <span>Change Lesson</span>
            <span className="text-[10px] font-mono text-muted-foreground">({totalLessons} lessons)</span>
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </Button>
        </div>

        <div className="flex gap-6 flex-col lg:flex-row">
          {/* Left — Video + Details */}
          <div className="flex-1 flex flex-col gap-5 min-w-0">
            {/* Video Player */}
            <div className="bg-[#F3F2EF] border border-border rounded-xl overflow-hidden aspect-video w-full relative">
              {lesson.videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${lesson.videoId}`}
                  title={lesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <span className="text-[12px] font-medium text-muted-foreground">
                    Video coming soon
                  </span>
                </div>
              )}
            </div>

            {/* High Clarity CTA: Mark Video as Watched / Watched Confirmed */}
            {videoWatched ? (
              <div className="w-full py-3 px-4 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors">
                <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
                <span>✓ Watched — Quiz Unlocked</span>
              </div>
            ) : (
              <Button
                size="lg"
                onClick={handleMarkWatched}
                className="w-full py-3 h-auto text-sm font-semibold bg-[#18181B] text-[#F7F4EF] hover:bg-stone-800 shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <PlayCircle className="size-4" />
                <span>Mark Video as Watched to Unlock Quiz</span>
              </Button>
            )}

            {/* Lesson Info */}
            <div className="flex flex-col gap-1">
              <h1 className="text-[22px] font-semibold text-foreground tracking-tight">
                {lesson.title}
              </h1>
              <p className="text-[13px] text-muted-foreground">
                Module {modIndex + 1} &middot; Lesson {lessonIndex + 1} &middot; {lesson.duration}
              </p>
            </div>

            {/* Description */}
            <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3">
              <p className="text-[13px] text-foreground font-semibold tracking-tight">
                About this lesson
              </p>
              <p className="text-[13px] text-muted-foreground leading-relaxed whitespace-pre-line">
                {lesson.description ??
                  'Lesson description will be available soon.'}
              </p>
            </div>

            {/* Ask AI */}
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask something about this lesson..."
                  value={askInput}
                  onChange={(e) => setAskInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
                  className="h-10 text-[13px]"
                />
                <Button onClick={handleAskAI} disabled={aiLoading || !askInput.trim()}>
                  {aiLoading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    'Ask AI'
                  )}
                </Button>
              </div>
              {aiLoading && (
                <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  Thinking...
                </div>
              )}
              {aiResponse && !aiLoading && (
                <div className="bg-white border border-[#E7E5E0] rounded-xl p-5 flex flex-col gap-2">
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
                    AI Tutor
                  </p>
                  <p className="text-[13px] text-foreground leading-relaxed">{aiResponse}</p>
                </div>
              )}
            </div>

            {/* Complete & Unlock Banner */}
            <div className="bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="size-8 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
                  <Info className="size-4 text-foreground" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-[13px] font-semibold text-foreground tracking-tight">
                    {videoWatched
                      ? 'Video completed! Ready for the quiz'
                      : 'Complete this video to unlock the quiz'}
                  </p>
                  <p className="text-[12px] text-muted-foreground">
                    {videoWatched
                      ? 'You have verified watching this lesson. Test your understanding with the quiz.'
                      : 'Watch the full lesson or mark as watched above before testing your knowledge in the quiz.'}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
                <Button 
                  disabled={!videoWatched} 
                  onClick={goToQuiz}
                  className="min-w-[140px]"
                  title={!videoWatched ? 'Watch video to unlock quiz' : 'Take Lesson Quiz'}
                >
                  {!videoWatched ? 'Take Quiz (Locked)' : 'Take Quiz'}
                </Button>
                {!videoWatched && (
                  <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                    <Lock className="size-3 text-muted-foreground" />
                    Watch video to unlock
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right — Sidebar */}
          <div className="w-full lg:w-[320px] xl:w-[360px] shrink-0">
            <div className="lg:sticky lg:top-20">
              <LessonSidebar 
                courseId={id} 
                activeLessonId={lessonId} 
                courseTitle={course.title}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Lesson Selector Sheet / Modal */}
      {mobileDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end sm:justify-center p-0 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setMobileDrawerOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Course Lessons"
        >
          <div
            className="bg-card text-card-foreground border border-border rounded-t-2xl sm:rounded-xl shadow-2xl max-h-[85vh] flex flex-col w-full max-w-lg mx-auto overflow-hidden animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-2 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile drag handle indicator */}
            <div className="w-12 h-1.5 bg-muted-foreground/30 rounded-full mx-auto mt-3 mb-1 sm:hidden" />

            {/* Header */}
            <div className="px-5 py-3.5 border-b border-border flex items-center justify-between gap-3">
              <div className="min-w-0">
                <h2 className="text-sm font-bold text-foreground tracking-tight">Course Lessons</h2>
                <p className="text-xs text-muted-foreground">
                  Current: Module {modIndex + 1}, Lesson {lessonIndex + 1} ({totalLessons} lessons total)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Close lesson selector"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Full Lesson List */}
            <div className="overflow-y-auto flex-1 p-2">
              <LessonSidebar
                courseId={id}
                activeLessonId={lessonId}
                courseTitle={course.title}
                className="border-0 shadow-none bg-transparent"
                onSelectLesson={() => setMobileDrawerOpen(false)}
              />
            </div>

            {/* Sheet Footer */}
            <div className="p-3 bg-muted/30 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
              <span>Tap any unlocked lesson to jump directly</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileDrawerOpen(false)}
                className="h-7 text-xs"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

