import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { QuizClient } from '@/components/quiz-client'
import { courses } from '@/lib/data'
import { getQuizForLesson } from '@/lib/quiz-data'

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ lesson?: string }>
}): Promise<Metadata> {
  const { id } = await params
  const { lesson } = (await searchParams) ?? {}
  const lessonId = lesson || 'l1'
  const course = courses.find((c) => c.id === id)
  const quiz = getQuizForLesson(lessonId)
  return {
    title: `${quiz.title} — Quiz | EKLAVYA Studio`,
    description: `Assessment for ${course?.title || 'Course'}. Test your knowledge and verify key milestones.`,
  }
}

export default async function QuizPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ lesson?: string }>
}) {
  const { id } = await params
  const { lesson } = (await searchParams) ?? {}
  const lessonId = lesson || 'l1'
  const course = courses.find((c) => c.id === id)
  if (!course) notFound()

  const quiz = getQuizForLesson(lessonId)

  return (
    <div className="min-h-screen bg-[#F7F4EF]">
      {/* Studio Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#F7F4EF]/95 backdrop-blur-xs border-b border-[#E4E0D7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <Link 
              href={`/course/${id}?lesson=${lessonId}`}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-semibold text-stone-700 hover:text-[#18181B] bg-white hover:bg-stone-100 border border-[#E4E0D7] px-3 py-1.5 rounded-xs transition-colors shadow-2xs shrink-0 cursor-pointer"
            >
              <ArrowLeft className="size-3.5" />
              <span className="hidden xs:inline">Back to Lesson</span>
              <span className="xs:hidden">Back</span>
            </Link>

            <div className="h-5 w-[1px] bg-[#E4E0D7] shrink-0" />

            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-xs bg-[#18181B] text-[#F7F4EF] flex items-center justify-center font-mono font-black text-xs shrink-0">
                EK
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[13px] font-bold text-[#18181B] tracking-tight truncate leading-none">
                  Quiz: {quiz.title}
                </span>
                <span className="text-[10px] font-mono text-stone-600 truncate leading-none mt-1 uppercase tracking-wider">
                  {course.title}
                </span>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-xs bg-white text-stone-700 border border-[#E4E0D7]">
              PASS BENCHMARK: 70%
            </span>
          </div>
        </div>
      </header>

      <main className="py-6 sm:py-10">
        <QuizClient courseId={id} lessonId={lessonId} />
      </main>
    </div>
  )
}
