'use client'

import { use, useState, Suspense, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Info, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { LessonSidebar } from '@/components/lesson-sidebar'
import { courses, courseModules } from '@/lib/data'
import { explainConcept } from '@/lib/api'
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
  const [askInput, setAskInput] = useState('')
  const [aiResponse, setAiResponse] = useState<string | null>(null)
  const [aiLoading, setAiLoading] = useState(false)

  const course = courses.find((c) => c.id === id)
  const lessonData = findLesson(lessonId)
  if (!course || !lessonData) notFound()

  const { lesson, mod, modIndex, lessonIndex } = lessonData

  useEffect(() => {
    setVideoWatched(false)
  }, [lessonId])

  const goToQuiz = () => {
    if (videoWatched) router.push(`/quiz/${id}`)
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
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="h-14 px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <Button variant="ghost" size="sm" asChild className="shrink-0 -ml-2">
              <Link href="/">
                <ArrowLeft data-icon="inline-start" />
                Back
              </Link>
            </Button>
            <Separator orientation="vertical" className="h-5" />
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-foreground truncate tracking-tight">
                {course.title}
              </p>
              <p className="text-[11px] text-muted-foreground">by {course.instructor}</p>
            </div>
          </div>
          <Button size="sm" disabled={!videoWatched} onClick={goToQuiz}>
            Take Quiz
          </Button>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 py-6">
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

            <Button
              variant="outline"
              onClick={() => setVideoWatched(true)}
              disabled={videoWatched}
            >
              {videoWatched ? 'Marked as Watched' : 'Mark as Watched'}
            </Button>

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
            <div className="bg-card border border-border rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="size-8 rounded-lg bg-muted flex items-center justify-center shrink-0 mt-0.5">
                  <Info className="size-4 text-foreground" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-[13px] font-semibold text-foreground tracking-tight">
                    Complete this video to unlock the quiz
                  </p>
                  <p className="text-[12px] text-muted-foreground">
                    Watch the full lesson before testing your knowledge in the quiz below.
                  </p>
                </div>
              </div>
              <Button disabled={!videoWatched} onClick={goToQuiz}>
                Take Quiz
              </Button>
            </div>
          </div>

          {/* Right — Sidebar */}
          <div className="w-full lg:w-[320px] xl:w-[360px] shrink-0">
            <LessonSidebar courseId={id} activeLessonId={lessonId} />
          </div>
        </div>
      </div>
    </div>
  )
}
