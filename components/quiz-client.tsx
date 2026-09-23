'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { RotateCcw, Lightbulb, Volume2, VolumeX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getQuizForLesson, PASS_SCORE } from '@/lib/quiz-data'
import { getNextLessonId } from '@/lib/data'
import { unlockLesson, getUnlockedLessons, saveUnlockedLessons, unlockCourse } from '@/lib/unlocked-lessons'
import { submitQuiz } from '@/lib/api'
import { ConfettiCanvas } from '@/components/confetti-canvas'
import {
  playOptionClick,
  playSuccessChime,
  playFailureChime,
  isSoundMuted,
  setSoundMuted,
} from '@/lib/sound-effects'

export function QuizClient({
  courseId,
  lessonId = 'l1',
}: {
  courseId: string
  lessonId?: string
}) {
  const router = useRouter()
  const quiz = getQuizForLesson(lessonId)
  const questions = quiz.questions
  const totalQuestions = questions.length
  const nextLessonId = getNextLessonId(lessonId)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(totalQuestions).fill(null)
  )
  const [quizFinished, setQuizFinished] = useState(false)
  const [score, setScore] = useState(0)
  const [displayedScore, setDisplayedScore] = useState(0)
  const [passed, setPassed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hints, setHints] = useState<{ question: string; hint: string }[]>([])
  const [soundMuted, setLocalSoundMuted] = useState(false)

  useEffect(() => {
    setLocalSoundMuted(isSoundMuted())
  }, [])

  const toggleSound = () => {
    const next = !soundMuted
    setLocalSoundMuted(next)
    setSoundMuted(next)
  }

  // Smooth animated counter for scorecard
  useEffect(() => {
    if (!quizFinished) return
    let current = 0
    const target = score
    if (target === 0) {
      setDisplayedScore(0)
      return
    }
    const stepTime = Math.max(30, Math.floor(700 / target))
    const timer = setInterval(() => {
      current += 1
      setDisplayedScore(current)
      if (current >= target) clearInterval(timer)
    }, stepTime)
    return () => clearInterval(timer)
  }, [quizFinished, score])

  const question = questions[currentIndex]
  const isLast = currentIndex === totalQuestions - 1
  const progressWidth = ((currentIndex + 1) / totalQuestions) * 100

  // Fail-safe watchdog: ensure isSubmitting NEVER stays stuck for more than 2.5 seconds
  useEffect(() => {
    if (!isSubmitting) return
    const watchdog = setTimeout(() => {
      const finalScore = answers.filter((ans, i) => ans === questions[i]?.answer).length
      const isPassed = finalScore >= PASS_SCORE
      if (isPassed) {
        if (nextLessonId) unlockLesson(nextLessonId)
        unlockCourse('prompt-engineering')
      }
      setScore(finalScore)
      setPassed(isPassed)
      setIsSubmitting(false)
      setQuizFinished(true)
    }, 2500)
    return () => clearTimeout(watchdog)
  }, [isSubmitting, answers, questions, nextLessonId])

  const finishQuiz = useCallback(
    async (updated: (number | null)[]) => {
      setAnswers(updated)

      // 1. Instant local calculation (100% resilient & deterministic)
      const finalScore = updated.filter(
        (ans, i) => ans === questions[i]?.answer
      ).length
      const isPassed = finalScore >= PASS_SCORE

      // 2. Immediately unlock next lesson and prompt-engineering course in storage
      if (isPassed) {
        if (nextLessonId) {
          unlockLesson(nextLessonId)
        }
        unlockCourse('prompt-engineering')
      }

      setIsSubmitting(true)

      const answerValues = updated.map((a) => a ?? -1)
      const token =
        typeof window !== 'undefined' ? localStorage.getItem('genai_token') : null

      let serverHints: { question: string; hint: string }[] = []

      // 3. Sync to backend with strict 2-second timeout
      if (token) {
        try {
          const timeoutPromise = new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('Backend submission timeout')), 2000)
          )
          const result = await Promise.race([
            submitQuiz(courseId, answerValues, token, lessonId),
            timeoutPromise,
          ])

          if (result && Array.isArray(result.unlockedLessons)) {
            const currentUnlocked = getUnlockedLessons()
            const merged = Array.from(new Set([...currentUnlocked, ...result.unlockedLessons]))
            if (isPassed && nextLessonId && !merged.includes(nextLessonId)) {
              merged.push(nextLessonId)
            }
            saveUnlockedLessons(merged)
          }

          if (result && result.hints) {
            serverHints = result.hints
          }
        } catch (err) {
          console.warn('Backend sync deferred or timed out, continuing with verified score:', err)
        }
      }

      // 4. Update UI states and play chime
      setScore(finalScore)
      setPassed(isPassed)
      setHints(serverHints)

      if (isPassed) {
        playSuccessChime()
      } else {
        playFailureChime()
      }

      setIsSubmitting(false)
      setQuizFinished(true)
    },
    [courseId, lessonId, nextLessonId, questions]
  )

  const handleNext = useCallback(() => {
    if (selectedAnswer === null || isSubmitting) return

    const updated = [...answers]
    updated[currentIndex] = selectedAnswer

    if (isLast) {
      finishQuiz(updated)
    } else {
      setAnswers(updated)
      setCurrentIndex((i) => i + 1)
      setSelectedAnswer(null)
    }
  }, [selectedAnswer, isSubmitting, answers, currentIndex, isLast, finishQuiz])

  const handleRetake = useCallback(() => {
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setAnswers(Array(totalQuestions).fill(null))
    setQuizFinished(false)
    setScore(0)
    setPassed(false)
    setHints([])
  }, [totalQuestions])

  const handleUnlockNextLesson = useCallback(() => {
    if (nextLessonId) {
      unlockLesson(nextLessonId)
      router.push(`/course/${courseId}?lesson=${nextLessonId}`)
    } else {
      unlockCourse('prompt-engineering')
      router.push(`/course/prompt-engineering`)
    }
  }, [courseId, nextLessonId, router])

  // Keyboard shortcut listener for 1, 2, 3, 4 / A, B, C, D and Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement)?.isContentEditable) {
        return
      }

      if (quizFinished) {
        if (e.key === 'Enter') {
          e.preventDefault()
          if (passed) {
            handleUnlockNextLesson()
          } else {
            handleRetake()
          }
        }
        return
      }

      const key = e.key.toUpperCase()
      let optionIdx: number | null = null

      if (key === '1' || key === 'A') optionIdx = 0
      else if (key === '2' || key === 'B') optionIdx = 1
      else if (key === '3' || key === 'C') optionIdx = 2
      else if (key === '4' || key === 'D') optionIdx = 3

      if (optionIdx !== null && question && optionIdx < question.options.length) {
        e.preventDefault()
        setSelectedAnswer(optionIdx)
        return
      }

      if (e.key === 'Enter') {
        if (selectedAnswer !== null && !isSubmitting) {
          e.preventDefault()
          handleNext()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    quizFinished,
    passed,
    question,
    selectedAnswer,
    isSubmitting,
    handleNext,
    handleRetake,
    handleUnlockNextLesson,
  ])

  // Results Screen
  if (quizFinished) {
    return (
      <div className="w-full max-w-[620px] mx-auto px-4 flex justify-center relative">
        {passed && <ConfettiCanvas />}
        <div className="w-full border border-[#E4E0D7] rounded-sm bg-white p-6 sm:p-10 shadow-[4px_4px_0px_0px_#18181B] flex flex-col items-center gap-6 text-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs bg-[#F7F4EF] border border-[#E4E0D7] text-xs font-mono font-bold uppercase tracking-widest text-stone-700">
            STUDIO QUIZ SCORECARD
          </div>

          {/* Big Bold Score (Animated Tally) */}
          <div className="flex items-baseline justify-center gap-2">
            <span className="font-mono text-6xl sm:text-7xl font-black text-[#18181B] tracking-tight leading-none">
              {displayedScore}
            </span>
            <span className="font-mono text-2xl sm:text-3xl font-bold text-stone-400">
              / {totalQuestions}
            </span>
          </div>

          {/* Pass / Retake Badge */}
          <div
            className={cn(
              'inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xs text-xs font-mono font-bold uppercase tracking-wider border',
              passed
                ? 'bg-emerald-100/70 text-emerald-800 border-emerald-300'
                : 'bg-red-50 text-red-700 border-red-200'
            )}
          >
            {passed ? '✓ PASSED (BENCHMARK MET)' : '✕ RETAKE REQUIRED (< 70%)'}
          </div>

          {/* Celebratory Card if Passed */}
          {passed ? (
            <div className="w-full bg-[#F7F4EF] border border-[#E4E0D7] rounded-xs p-5 text-left flex flex-col gap-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-xs bg-emerald-100 text-emerald-800 border border-emerald-300">
                  ★ MILESTONE VERIFIED
                </span>
                <span className="text-[11px] font-mono text-stone-600 uppercase tracking-wider font-semibold">
                  Assessment Complete
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#18181B]">
                  {nextLessonId
                    ? 'Lesson Completed & Next Module Unlocked'
                    : 'Full Course Milestone Completed!'}
                </h3>
                <p className="text-xs text-stone-600 font-mono mt-1 leading-relaxed">
                  {nextLessonId
                    ? 'Great job! Your understanding has been verified. You can now advance to the next lesson.'
                    : 'Congratulations! You have successfully mastered all lessons and quizzes in this course.'}
                </p>
              </div>
              {nextLessonId && (
                <div className="pt-2 border-t border-[#E4E0D7] flex items-center justify-between text-[11px] font-mono text-stone-700">
                  <span className="uppercase tracking-wider font-semibold">Unlocked Lesson:</span>
                  <span className="font-bold text-[#18181B] bg-white px-2 py-0.5 rounded-xs border border-[#E4E0D7]">
                    {nextLessonId.toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full bg-stone-50 border border-[#E4E0D7] rounded-xs p-4 text-left flex flex-col gap-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-stone-600">
                CRITERIA NOTICE
              </span>
              <p className="text-xs text-stone-700 leading-relaxed">
                A minimum score of <strong>{PASS_SCORE}/{totalQuestions} ({Math.round((PASS_SCORE / totalQuestions) * 100)}%)</strong> is required to verify competency and unlock the next lesson.
              </p>
            </div>
          )}

          {/* Wrong Answer Hints Review */}
          {score < totalQuestions && hints.length > 0 && (
            <div className="w-full flex flex-col gap-3 text-left">
              <p className="text-xs font-mono uppercase tracking-wider font-bold text-stone-700">
                Review Topics ({hints.length})
              </p>
              <div className="flex flex-col gap-2.5 max-h-60 overflow-y-auto pr-1">
                {hints.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-[#F7F4EF] border border-[#E4E0D7] rounded-xs p-3 text-xs"
                  >
                    <Lightbulb className="size-4 shrink-0 text-amber-600 mt-0.5" />
                    <div className="flex flex-col gap-1 min-w-0">
                      <p className="font-semibold text-[#18181B] leading-snug">
                        {item.question}
                      </p>
                      <p className="text-stone-600 font-mono text-[11px] leading-relaxed">
                        💡 {item.hint}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {passed ? (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                <Button
                  size="lg"
                  onClick={handleUnlockNextLesson}
                  className="w-full sm:w-auto h-11 px-8 rounded-xs bg-[#18181B] hover:bg-stone-800 text-[#F7F4EF] font-mono text-xs uppercase tracking-wider font-bold shadow-2xs transition-all active:scale-[0.99] cursor-pointer"
                >
                  {nextLessonId ? `Continue to Next Lesson (${nextLessonId.toUpperCase()}) ↵` : 'Explore Next Track (Prompt Engineering) ↵'}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => router.push(`/course/${courseId}`)}
                  className="w-full sm:w-auto h-11 px-6 rounded-xs border-[#E4E0D7] bg-white hover:bg-stone-100 text-[#18181B] font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer"
                >
                  Course Overview
                </Button>
              </div>
            ) : (
              <>
                <Button
                  size="lg"
                  onClick={handleRetake}
                  className="w-full sm:w-auto h-11 px-6 rounded-xs bg-[#18181B] hover:bg-stone-800 text-[#F7F4EF] font-mono text-xs uppercase tracking-wider font-bold shadow-2xs transition-all active:scale-[0.99] cursor-pointer"
                >
                  <RotateCcw data-icon="inline-start" className="size-4 mr-2" />
                  Retake Quiz ↵
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => router.push(`/course/${courseId}?lesson=${lessonId}`)}
                  className="w-full sm:w-auto h-11 px-6 rounded-xs border-[#E4E0D7] bg-white hover:bg-stone-100 text-[#18181B] font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer"
                >
                  Review Lesson
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Active Quiz Question
  const questionNum = String(currentIndex + 1).padStart(2, '0')
  const totalNum = String(totalQuestions).padStart(2, '0')

  return (
    <div className="w-full max-w-[680px] mx-auto px-4 flex flex-col gap-6">
      {/* Accessible Progress Bar */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-stone-600 font-bold uppercase tracking-wider">
            Quiz Progress
          </span>
          <span className="text-[#18181B] font-bold">
            {Math.round(progressWidth)}%
          </span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={currentIndex + 1}
          aria-valuemin={1}
          aria-valuemax={totalQuestions}
          aria-label={`Question ${currentIndex + 1} of ${totalQuestions}`}
          className="h-2 w-full bg-[#EFECE6] rounded-xs border border-[#E4E0D7] overflow-hidden"
        >
          <div
            className="h-full bg-[#18181B] transition-all duration-300 ease-out"
            style={{ width: `${progressWidth}%` }}
          />
        </div>
      </div>

      {/* Studio Question Container Card */}
      <div className="border border-[#E4E0D7] rounded-sm bg-white p-6 sm:p-8 shadow-[4px_4px_0px_0px_#18181B] flex flex-col gap-6">
        {/* Question Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-[#F7F4EF] border border-[#E4E0D7] text-xs font-mono font-bold uppercase tracking-wider text-[#18181B]">
            <span>QUESTION {questionNum} / {totalNum}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleSound}
              title={soundMuted ? 'Sound effects muted (Click to enable)' : 'Sound effects active (Click to mute)'}
              className="p-1 rounded-xs border border-[#E4E0D7] bg-[#F7F4EF] hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
              aria-label={soundMuted ? 'Unmute sounds' : 'Mute sounds'}
            >
              {soundMuted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5 text-stone-700" />}
            </button>
            <span
              className={cn(
                'text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-xs border',
                question.difficulty === 'easy'
                  ? 'bg-emerald-100/70 text-emerald-800 border-emerald-300'
                  : 'bg-stone-100 text-stone-700 border-[#E4E0D7]'
              )}
            >
              {question.difficulty === 'easy' ? 'EASY' : 'HARD'}
            </span>
          </div>
        </div>

        {/* Question Statement */}
        <h2 className="text-xl sm:text-2xl font-bold text-[#18181B] leading-snug tracking-tight">
          {question.question}
        </h2>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {question.options.map((option, idx) => {
            const isSelected = selectedAnswer === idx
            const letter = ['A', 'B', 'C', 'D'][idx] || String(idx + 1)

            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelectedAnswer(idx)
                  playOptionClick()
                }}
                className={cn(
                  'group w-full text-left rounded-xs border px-4 py-3.5 sm:px-5 sm:py-4 transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer',
                  isSelected
                    ? 'border-[#18181B] bg-[#F7F4EF] shadow-2xs ring-1 ring-[#18181B]'
                    : 'border-[#E4E0D7] bg-white hover:border-stone-400 hover:bg-stone-50/50'
                )}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span
                    className={cn(
                      'font-mono text-xs font-bold border rounded-xs px-2 py-1 transition-colors shrink-0',
                      isSelected
                        ? 'bg-[#18181B] text-[#F7F4EF] border-[#18181B]'
                        : 'bg-[#F7F4EF] text-stone-700 border-[#E4E0D7] group-hover:border-stone-400'
                    )}
                  >
                    {letter}
                  </span>
                  <span className="text-sm font-medium text-[#18181B] leading-relaxed">
                    {option}
                  </span>
                </div>
                <div
                  className={cn(
                    'size-4 rounded-xs border shrink-0 flex items-center justify-center transition-colors',
                    isSelected
                      ? 'border-[#18181B] bg-[#18181B] text-white'
                      : 'border-[#E4E0D7] bg-white group-hover:border-stone-400'
                  )}
                >
                  {isSelected && (
                    <div className="w-1.5 h-1.5 bg-[#F7F4EF] rounded-[0.5px]" />
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Card Footer with Tips & Action Button */}
        <div className="pt-2 border-t border-[#E4E0D7] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] font-mono text-stone-500 hidden sm:flex items-center gap-1.5">
            <span>Press</span>
            <kbd className="px-1.5 py-0.5 bg-[#EFECE6] border border-[#E4E0D7] rounded-xs font-bold text-stone-700">1</kbd>
            <span>-</span>
            <kbd className="px-1.5 py-0.5 bg-[#EFECE6] border border-[#E4E0D7] rounded-xs font-bold text-stone-700">4</kbd>
            <span>or</span>
            <kbd className="px-1.5 py-0.5 bg-[#EFECE6] border border-[#E4E0D7] rounded-xs font-bold text-stone-700">A</kbd>
            <span>-</span>
            <kbd className="px-1.5 py-0.5 bg-[#EFECE6] border border-[#E4E0D7] rounded-xs font-bold text-stone-700">D</kbd>
            <span>to pick,</span>
            <kbd className="px-1.5 py-0.5 bg-[#EFECE6] border border-[#E4E0D7] rounded-xs font-bold text-stone-700">Enter ↵</kbd>
            <span>to advance</span>
          </div>

          <Button
            onClick={handleNext}
            disabled={selectedAnswer === null || isSubmitting}
            className="w-full sm:w-auto h-10 px-6 rounded-xs bg-[#18181B] hover:bg-stone-800 text-[#F7F4EF] font-mono text-xs uppercase tracking-wider font-bold shadow-2xs transition-all active:scale-[0.99] cursor-pointer disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? 'Verifying...'
              : isLast
              ? 'Submit Quiz ↵'
              : 'Next Question ↵'}
          </Button>
        </div>
      </div>
    </div>
  )
}
