import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { QuizClient } from '@/components/quiz-client'
import { courses } from '@/lib/data'
import { notFound } from 'next/navigation'

export default async function QuizPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const course = courses.find((c) => c.id === id)
  if (!course) notFound()

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="h-14 px-6 flex items-center gap-4">
          <Link 
            href={`/course/${id}`}
            className={buttonVariants({ variant: 'ghost', size: 'sm', className: '-ml-2' })}
          >
            <ArrowLeft data-icon="inline-start" />
            Back to Lesson
          </Link>
          <Separator orientation="vertical" className="h-5" />
          <div>
            <p className="text-[13px] font-semibold text-foreground tracking-tight">
              Quiz: Generative AI Basics
            </p>
            <p className="text-[11px] text-muted-foreground">{course.title}</p>
          </div>
        </div>
      </header>

      <QuizClient courseId={id} />
    </div>
  )
}
