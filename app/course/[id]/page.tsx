'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Play, Volume2, SkipBack, Maximize2, Info, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { LessonSidebar } from '@/components/lesson-sidebar'
import { courses } from '@/lib/data'
import { notFound } from 'next/navigation'

export default function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [videoWatched, setVideoWatched] = useState(false)
  const [askInput, setAskInput] = useState('')
  const [aiResponse, setAiResponse] = useState<string | null>(null)
  const [aiLoading, setAiLoading] = useState(false)

  const course = courses.find((c) => c.id === id)
  if (!course) notFound()

  const goToQuiz = () => {
    if (videoWatched) router.push(`/quiz/${id}`)
  }

  const handleAskAI = async () => {
    if (!askInput.trim() || aiLoading) return

    setAiLoading(true)
    setAiResponse(null)

    try {
      const res = await fetch('http://localhost:8000/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concept: askInput.trim() }),
      })
      const data = await res.json()
      setAiResponse(data.explanation ?? 'No response received.')
    } catch {
      setAiResponse('Unable to reach AI tutor. Make sure the AI service is running on port 8000.')
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
              {/* Fake video placeholder — light warm gray background */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <button
                  aria-label="Play video"
                  className="size-16 rounded-full bg-foreground hover:bg-foreground/80 transition-colors flex items-center justify-center shadow-sm"
                >
                  <Play className="size-6 text-background fill-background ml-1" />
                </button>
                <span className="text-[12px] font-medium text-muted-foreground">Click to play</span>
              </div>
              {/* Progress bar */}
              <div className="absolute bottom-0 inset-x-0 px-4 pb-3 bg-gradient-to-t from-black/8 to-transparent pt-6">
                <div className="h-[2px] bg-foreground/15 rounded-full mb-3">
                  <div className="h-full w-0 bg-foreground rounded-full" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button aria-label="Play" className="text-foreground/60 hover:text-foreground transition-colors">
                      <Play className="size-4 fill-current" />
                    </button>
                    <button aria-label="Rewind" className="text-foreground/60 hover:text-foreground transition-colors">
                      <SkipBack className="size-4" />
                    </button>
                    <button aria-label="Volume" className="text-foreground/60 hover:text-foreground transition-colors">
                      <Volume2 className="size-4" />
                    </button>
                    <span className="text-[11px] text-foreground/50 font-mono">0:00 / 5:00</span>
                  </div>
                  <button aria-label="Fullscreen" className="text-foreground/60 hover:text-foreground transition-colors">
                    <Maximize2 className="size-4" />
                  </button>
                </div>
              </div>
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
                What is Generative AI?
              </h1>
              <p className="text-[13px] text-muted-foreground">
                Module 1 &middot; Lesson 2 &middot; 5 min
              </p>
            </div>

            {/* Description */}
            <div className="bg-card border border-border rounded-xl p-5 flex flex-col gap-3">
              <p className="text-[13px] text-foreground font-semibold tracking-tight">
                About this lesson
              </p>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                In this lesson, you will learn what generative AI is, how it differs from
                traditional discriminative AI, and why it has become one of the most transformative
                technologies of our time. We cover the key categories — text, image, audio, and
                code generation — with real-world examples for each.
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
            <LessonSidebar courseId={id} activeLessonId="l2" />
          </div>
        </div>
      </div>
    </div>
  )
}
