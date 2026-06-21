'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { RotateCcw, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { quizQuestions, PASS_SCORE, TOTAL_QUESTIONS } from '@/lib/quiz-data'
import { unlockLesson } from '@/lib/unlocked-lessons'
import { submitQuiz } from '@/lib/api'

const NEXT_LESSON_ID = 'l3'

export function QuizClient({ courseId }: { courseId: string }) {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(TOTAL_QUESTIONS).fill(null)
  )
  const [quizFinished, setQuizFinished] = useState(false)
  const [score, setScore] = useState(0)
  const [passed, setPassed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hints, setHints] = useState<{ question: string; hint: string }[]>([])

  const question = quizQuestions[currentIndex]
  const isLast = currentIndex === TOTAL_QUESTIONS - 1
  const progressWidth = ((currentIndex + 1) / TOTAL_QUESTIONS) * 100

  const finishQuiz = async (updated: (number | null)[]) => {
    setAnswers(updated)

    const answerValues = updated.map((a) => a ?? -1)
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('genai_token') : null

    if (token) {
      try {
        setIsSubmitting(true)
        const result = await submitQuiz(courseId, answerValues, token)
        setScore(result.score)
        setPassed(result.passed)
        setHints(result.hints ?? [])
        localStorage.setItem(
          'unlockedLessons',
          JSON.stringify(result.unlockedLessons)
        )
        setQuizFinished(true)
        return
      } catch {
        // Fall back to client-side scoring if API fails
      } finally {
        setIsSubmitting(false)
      }
    }

    const finalScore = updated.filter(
      (ans, i) => ans === quizQuestions[i]?.answer
    ).length
    setScore(finalScore)
    setPassed(finalScore >= PASS_SCORE)
    setHints([])
    setQuizFinished(true)
  }

  const handleNext = () => {
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
  }

  const handleRetake = () => {
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setAnswers(Array(TOTAL_QUESTIONS).fill(null))
    setQuizFinished(false)
    setScore(0)
    setPassed(false)
    setHints([])
  }

  const handleUnlockNextLesson = () => {
    unlockLesson(NEXT_LESSON_ID)
    router.push(`/course/${courseId}`)
  }

  if (quizFinished) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg flex flex-col items-center gap-6 text-center">
          <span className="text-[48px] font-semibold text-foreground tracking-tight leading-none">
            {score}/{TOTAL_QUESTIONS}
          </span>

          <div
            className={cn(
              'inline-flex items-center px-3 py-1 rounded-full text-[12px] font-semibold',
              passed
                ? 'bg-[#F0FDF4] text-[#16A34A]'
                : 'bg-[#FEF2F2] text-[#DC2626]'
            )}
          >
            {passed ? 'Passed' : 'Try Again'}
          </div>

          <p className="text-[14px] text-muted-foreground leading-relaxed max-w-sm">
            {passed
              ? 'Great job! You can now unlock the next lesson.'
              : 'You need 7/10 to unlock the next lesson. Review the material and try again.'}
          </p>

          {score < TOTAL_QUESTIONS && hints.length > 0 && (
            <div className="w-full flex flex-col gap-3 text-left">
              <p className="text-[13px] font-semibold text-foreground tracking-tight">
                Review your wrong answers
              </p>
              {hints.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 bg-white border border-[#E7E5E0] rounded-lg p-3"
                >
                  <Lightbulb className="size-4 shrink-0 text-muted-foreground mt-0.5" />
                  <div className="flex flex-col gap-1 min-w-0">
                    <p className="text-[12px] text-muted-foreground leading-snug">
                      {item.question}
                    </p>
                    <p className="text-[13px] text-foreground leading-relaxed">
                      {item.hint}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {passed ? (
            <Button size="lg" onClick={handleUnlockNextLesson}>
              Unlock Next Lesson
            </Button>
          ) : (
            <Button size="lg" onClick={handleRetake}>
              <RotateCcw data-icon="inline-start" />
              Retake Quiz
            </Button>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-start justify-center px-4 pt-10 pb-16">
      <div className="w-full max-w-[640px] flex flex-col gap-8">
        {/* Progress bar */}
        <div className="h-[3px] w-full bg-[#E7E5E0] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1C1C1A] rounded-full transition-all duration-300"
            style={{ width: `${progressWidth}%` }}
          />
        </div>

        {/* Question header */}
        <div className="flex items-center justify-between gap-4">
          <span className="text-[13px] text-muted-foreground">
            Question {currentIndex + 1} of {TOTAL_QUESTIONS}
          </span>
          <span
            className={cn(
              'text-[11px] font-semibold px-2.5 py-0.5 rounded-full capitalize',
              question.difficulty === 'easy'
                ? 'bg-[#F0FDF4] text-[#16A34A]'
                : 'bg-[#F5F4F0] text-[#6B7280]'
            )}
          >
            {question.difficulty === 'easy' ? 'Easy' : 'Hard'}
          </span>
        </div>

        {/* Question */}
        <h2 className="text-[20px] font-medium text-foreground leading-snug tracking-tight">
          {question.question}
        </h2>

        {/* Options */}
        <div className="flex flex-col gap-3">
          {question.options.map((option, idx) => {
            const isSelected = selectedAnswer === idx

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedAnswer(idx)}
                className={cn(
                  'w-full text-left rounded-xl border px-5 py-4 transition-all duration-150',
                  'text-[14px] leading-relaxed text-foreground bg-white',
                  isSelected
                    ? 'border-[#1C1C1A] bg-[#FAFAF9]'
                    : 'border-[#E7E5E0] hover:border-[#1C1C1A]'
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      'size-5 rounded-full border shrink-0 transition-colors',
                      isSelected
                        ? 'border-[#1C1C1A] bg-[#1C1C1A]'
                        : 'border-[#E7E5E0] bg-white'
                    )}
                  />
                  {option}
                </div>
              </button>
            )
          })}
        </div>

        {/* Next / Submit */}
        <div className="flex justify-end pt-2">
          <Button
            onClick={handleNext}
            disabled={selectedAnswer === null || isSubmitting}
            size="lg"
          >
            {isLast ? 'Submit Quiz' : 'Next Question'}
          </Button>
        </div>
      </div>
    </div>
  )
}
