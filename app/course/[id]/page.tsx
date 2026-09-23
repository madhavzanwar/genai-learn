'use client'

import { use, useState, Suspense, useEffect, useCallback } from 'react'
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
  PlayCircle,
  Sparkles,
  Bot,
  Copy,
  Check,
  Volume2,
  Send,
  ArrowRight
} from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { LessonSidebar } from '@/components/lesson-sidebar'
import { courses, courseModules, getNextLessonId } from '@/lib/data'
import { explainConcept } from '@/lib/api'
import { isLessonWatched, markLessonWatched, getUnlockedLessons } from '@/lib/unlocked-lessons'
import { notFound } from 'next/navigation'

const LESSON_PROMPTS: Record<string, string[]> = {
  l1: [
    'Explain the difference between AI and traditional programming',
    'How does machine learning learn from data examples?',
    'Give a real-world analogy for pattern recognition in AI',
  ],
  l2: [
    'Why are CPU registers faster to access than main memory?',
    'Explain register addressing vs immediate addressing simply',
    'Why do compilers prioritize storing variables in registers?',
  ],
  l3: [
    'What is a token and how does an LLM process language?',
    'Explain next-token prediction with an everyday example',
    'What causes hallucinations in large language models?',
  ],
  l4: [
    'What is an embedding vector in plain, simple terms?',
    'How does an encoder-decoder model translate between languages?',
    'Why do similar words end up close together in vector space?',
  ],
  l5: [
    'Explain weights and activation functions using a simple analogy',
    'What happens during a forward pass in a neural network?',
    'Why does having multiple hidden layers help learning?',
  ],
  l6: [
    'Why does reading a sentence in both directions improve understanding?',
    'What is the role of hidden state in an RNN?',
    'When should you use a bidirectional RNN over a standard one?',
  ],
}

interface ChatMessage {
  id: string
  query: string
  response: string
}

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
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([])
  const [aiLoading, setAiLoading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [speakingId, setSpeakingId] = useState<string | null>(null)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [unlockedCount, setUnlockedCount] = useState(1)

  const course = courses.find((c) => c.id === id)
  const lessonData = findLesson(lessonId)
  if (!course || !lessonData) notFound()

  const { lesson, mod, modIndex, lessonIndex } = lessonData
  const totalLessons = courseModules.reduce((acc, m) => acc + m.lessons.length, 0)
  const currentGlobalIndex = courseModules
    .slice(0, modIndex)
    .reduce((acc, m) => acc + m.lessons.length, 0) + lessonIndex + 1

  const nextLessonId = getNextLessonId(lessonId)
  const nextLessonData = nextLessonId ? findLesson(nextLessonId) : null

  // Initialize and synchronize watched state
  useEffect(() => {
    setVideoWatched(isLessonWatched(lessonId))
    const unlocked = getUnlockedLessons()
    setUnlockedCount(Math.min(totalLessons, Math.max(1, unlocked.length)))
  }, [lessonId, totalLessons])

  // Handle drawer escape key
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
    const unlocked = getUnlockedLessons()
    setUnlockedCount(Math.min(totalLessons, Math.max(1, unlocked.length)))
  }

  const goToQuiz = () => {
    if (videoWatched) router.push(`/quiz/${id}?lesson=${lessonId}`)
  }

  const triggerAskAI = async (queryText: string) => {
    const trimmed = queryText.trim()
    if (!trimmed || aiLoading) return

    setAiLoading(true)
    setAskInput('')

    try {
      const data = await explainConcept(trimmed)
      const newMsg: ChatMessage = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        query: trimmed,
        response: data.explanation,
      }
      setChatHistory((prev) => [newMsg, ...prev])
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `${Date.now()}-err`,
        query: trimmed,
        response: err instanceof Error ? err.message : 'AI tutor is currently unavailable. Please try again.',
      }
      setChatHistory((prev) => [errorMsg, ...prev])
    } finally {
      setAiLoading(false)
    }
  }

  const handleCopyExplanation = (text: string, msgId: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedId(msgId)
        setTimeout(() => setCopiedId(null), 2000)
      })
    }
  }

  const handleSpeak = (text: string, msgId: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    if (speakingId === msgId) {
      window.speechSynthesis.cancel()
      setSpeakingId(null)
      return
    }
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1.05
    utterance.onend = () => setSpeakingId(null)
    utterance.onerror = () => setSpeakingId(null)
    setSpeakingId(msgId)
    window.speechSynthesis.speak(utterance)
  }

  const activePrompts = LESSON_PROMPTS[lessonId] || LESSON_PROMPTS.l1

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-[#FED7AA]/60">
      {/* Studio Top bar */}
      <header className="sticky top-0 z-40 bg-[#F7F4EF]/95 backdrop-blur-xs border-b border-[#E4E0D7] transition-all">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Left Brand + Breadcrumb */}
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/" className="flex items-center gap-2 shrink-0 group" title="Return to Course Catalog">
              <div className="w-8 h-8 rounded-xs bg-[#18181B] text-[#F7F4EF] flex items-center justify-center font-mono font-black text-sm tracking-tighter shadow-2xs">
                GL
              </div>
            </Link>

            <Separator orientation="vertical" className="h-5 bg-[#E4E0D7]" />

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#4C1D95] bg-[#C4B5FD]/40 px-2 py-0.5 rounded-xs border border-[#C4B5FD] hidden sm:inline-block">
                  {course.category} Track
                </span>
                <span className="text-xs text-stone-500 font-mono hidden md:inline-block truncate">
                  Lesson {currentGlobalIndex} of {totalLessons}
                </span>
              </div>
              <h1 className="text-[13px] sm:text-sm font-bold text-[#18181B] truncate tracking-tight">
                {course.title}
              </h1>
            </div>
          </div>
          
          {/* Right Action / Progress & Quiz */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Segmented Progress Pill */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xs bg-white border border-[#E4E0D7] text-xs font-mono">
              <span className="text-stone-500 font-semibold">{unlockedCount}/{totalLessons} Unlocked</span>
              <div className="flex gap-1 items-center">
                {Array.from({ length: totalLessons }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-[1px] transition-colors ${
                      i < unlockedCount ? 'bg-[#18181B]' : 'bg-[#E4E0D7]'
                    }`}
                  />
                ))}
              </div>
            </div>

            <Button 
              size="sm" 
              disabled={!videoWatched} 
              onClick={goToQuiz}
              className={`rounded-xs text-xs font-mono uppercase tracking-wider font-bold h-9 px-4 shadow-2xs transition-all ${
                videoWatched 
                  ? 'bg-[#18181B] hover:bg-stone-800 text-[#F7F4EF]' 
                  : 'bg-stone-200 text-stone-500 cursor-not-allowed border border-stone-300'
              }`}
              title={!videoWatched ? 'Mark video as watched to unlock the quiz' : 'Take Lesson Quiz'}
            >
              {!videoWatched ? 'Quiz (Locked)' : 'Take Quiz →'}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 w-full flex-1">
        {/* Mobile Lesson Navigation Bar (< 1024px) */}
        <div className="lg:hidden sticky top-18 z-30 mb-4 bg-white border border-[#E4E0D7] rounded-sm p-3 shadow-xs flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-mono text-stone-500 uppercase tracking-wider truncate">
              Module {modIndex + 1} &middot; Lesson {lessonIndex + 1}
            </div>
            <div className="text-[13px] font-bold text-[#18181B] truncate mt-0.5">
              {lesson.title}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            className="shrink-0 h-8 px-3 rounded-xs text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-1.5 border border-[#E4E0D7] bg-[#F7F4EF] hover:bg-stone-200 text-[#18181B] transition-colors cursor-pointer"
            aria-label="Change lesson"
          >
            <span>Change Lesson</span>
            <ChevronDown className="size-3 text-stone-600" />
          </button>
        </div>

        <div className="flex gap-6 flex-col lg:flex-row items-start">
          {/* Left — Video + Details */}
          <div className="flex-1 flex flex-col gap-6 min-w-0 w-full">
            {/* Video Player Frame */}
            <div className="bg-[#18181B] border-2 border-[#18181B] rounded-sm overflow-hidden aspect-video w-full relative shadow-[4px_4px_0px_0px_#18181B]">
              {lesson.videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${lesson.videoId}`}
                  title={lesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[#F7F4EF]">
                  <span className="text-xs font-mono font-medium">
                    Video coming soon
                  </span>
                </div>
              )}
            </div>

            {/* High Clarity CTA: Mark Video as Watched / Watched Confirmed */}
            {videoWatched ? (
              <div className="w-full py-3 px-4 rounded-xs bg-[#F0FDF4] border border-[#A7F3D0] text-[#047857] text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-[#047857]" />
                  <span>Lesson Verified — Quiz Unlocked</span>
                </div>
                <Button 
                  size="sm"
                  onClick={goToQuiz}
                  className="h-7 px-3 bg-[#18181B] hover:bg-stone-800 text-[#F7F4EF] rounded-xs text-[11px] font-mono uppercase tracking-wider font-bold"
                >
                  Start Quiz
                </Button>
              </div>
            ) : (
              <Button
                size="lg"
                onClick={handleMarkWatched}
                className="w-full py-3 h-auto text-xs font-mono uppercase tracking-wider font-bold bg-[#18181B] text-[#F7F4EF] hover:bg-stone-800 rounded-xs shadow-[3px_3px_0px_0px_#FED7AA] flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <PlayCircle className="size-4 text-[#FED7AA]" />
                <span>Mark Video as Watched to Unlock Quiz</span>
              </Button>
            )}

            {/* Lesson Title & Module Meta */}
            <div className="flex flex-col gap-1.5 pt-1">
              <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
                <span className="font-bold text-[#18181B]">MODULE 0{modIndex + 1}</span>
                <span>/</span>
                <span>LESSON 0{lessonIndex + 1}</span>
                <span>/</span>
                <span>{lesson.duration}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#18181B] tracking-tight leading-tight">
                {lesson.title}
              </h1>
            </div>

            {/* Lesson Structured Notes / Description */}
            <div className="bg-white border border-[#E4E0D7] rounded-sm p-6 shadow-2xs flex flex-col gap-3 text-left">
              <div className="flex items-center justify-between pb-2 border-b border-[#E4E0D7]">
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-stone-500">
                  LESSON BRIEF & KEY HIGHLIGHTS
                </span>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#4C1D95] bg-[#C4B5FD]/40 px-2 py-0.5 rounded-xs border border-[#C4B5FD]">
                  CORE CONCEPTS
                </span>
              </div>
              <div className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line font-normal">
                {lesson.description ?? 'Lesson description will be available soon.'}
              </div>
            </div>

            {/* Interactive AI Concept Explainer */}
            <div className="bg-white border border-[#E4E0D7] rounded-sm p-6 shadow-2xs flex flex-col gap-4 text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-6 rounded-xs bg-[#18181B] text-[#BAE6FD] flex items-center justify-center">
                    <Bot className="size-3.5" />
                  </div>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#18181B]">
                    In-Lesson AI Tutor
                  </span>
                </div>
                <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">
                  Powered by Gemini 2.5 Flash
                </span>
              </div>

              {/* Quick Prompt Suggestion Chips */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 block">
                  Suggested Questions for this Lesson:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activePrompts.map((promptText, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => triggerAskAI(promptText)}
                      disabled={aiLoading}
                      className="text-left text-xs font-mono text-stone-700 bg-[#F7F4EF] hover:bg-stone-200 hover:text-[#18181B] border border-[#E4E0D7] rounded-xs px-2.5 py-1.5 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Sparkles className="size-3 text-[#A7F3D0] shrink-0 fill-current" />
                      <span>{promptText}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Bar */}
              <div className="flex gap-2">
                <Input
                  placeholder="Ask any concept question about this lesson..."
                  value={askInput}
                  onChange={(e) => setAskInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && triggerAskAI(askInput)}
                  className="h-10 text-xs sm:text-sm font-sans rounded-xs border-[#E4E0D7] focus:ring-[#18181B]"
                />
                <Button 
                  onClick={() => triggerAskAI(askInput)} 
                  disabled={aiLoading || !askInput.trim()}
                  className="rounded-xs bg-[#18181B] hover:bg-stone-800 text-[#F7F4EF] text-xs font-mono uppercase tracking-wider font-bold h-10 px-4 cursor-pointer"
                >
                  {aiLoading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <span className="flex items-center gap-1.5">
                      <span>Ask AI</span>
                      <Send className="size-3" />
                    </span>
                  )}
                </Button>
              </div>

              {/* Loading State */}
              {aiLoading && (
                <div className="p-4 rounded-xs bg-[#F7F4EF] border border-[#E4E0D7] flex items-center gap-3 text-xs font-mono text-stone-600 animate-pulse">
                  <Loader2 className="size-4 animate-spin text-[#18181B]" />
                  <span>Synthesizing intuitive explanation via Gemini...</span>
                </div>
              )}

              {/* Conversational Chat History */}
              {chatHistory.length > 0 && (
                <div className="flex flex-col gap-3 pt-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 border-b border-[#E4E0D7] pb-1">
                    <span>EXPLANATION THREAD ({chatHistory.length})</span>
                    <button
                      type="button"
                      onClick={() => setChatHistory([])}
                      className="hover:text-red-600 transition-colors cursor-pointer"
                    >
                      Clear History
                    </button>
                  </div>
                  {chatHistory.map((item) => (
                    <div 
                      key={item.id} 
                      className="p-4 rounded-xs bg-[#FAF8F5] border border-[#E4E0D7] space-y-2.5 text-left"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-mono font-bold text-[#18181B] bg-white px-2 py-0.5 rounded-xs border border-[#E4E0D7]">
                          Q: &ldquo;{item.query}&rdquo;
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleCopyExplanation(item.response, item.id)}
                            title="Copy explanation"
                            className="p-1 rounded-xs hover:bg-white text-stone-500 hover:text-[#18181B] transition-colors cursor-pointer"
                          >
                            {copiedId === item.id ? (
                              <Check className="size-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="size-3.5" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSpeak(item.response, item.id)}
                            title="Listen to explanation"
                            className="p-1 rounded-xs hover:bg-white text-stone-500 hover:text-[#18181B] transition-colors cursor-pointer"
                          >
                            <Volume2 className={`size-3.5 ${speakingId === item.id ? 'text-emerald-600 animate-pulse' : ''}`} />
                          </button>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-normal">
                        {item.response}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Next Lesson Preview Banner if Watched */}
            {videoWatched && nextLessonData && (
              <div className="bg-[#FAF8F5] border border-[#E4E0D7] rounded-sm p-5 flex items-center justify-between gap-4 text-left">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-stone-500">
                    NEXT UP IN CURRICULUM
                  </span>
                  <h4 className="text-sm font-bold text-[#18181B]">
                    {nextLessonData.lesson.title} ({nextLessonData.lesson.duration})
                  </h4>
                  <p className="text-xs text-stone-600">
                    Pass the quiz for this lesson to unlock {nextLessonData.lesson.title}.
                  </p>
                </div>
                <Button
                  onClick={goToQuiz}
                  className="shrink-0 bg-[#18181B] hover:bg-stone-800 text-[#F7F4EF] rounded-xs text-xs font-mono uppercase tracking-wider font-bold h-9 px-4"
                >
                  Take Quiz Now
                </Button>
              </div>
            )}
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

