import Link from 'next/link'
import { ArrowRight, BookOpen, Target, GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Navbar } from '@/components/navbar'
import { CourseCard } from '@/components/course-card'
import { courses } from '@/lib/data'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
        <p className="text-[12px] font-medium tracking-widest uppercase text-muted-foreground mb-6">
          DS Virtual Lab
        </p>
        <h1 className="text-[48px] md:text-[64px] font-semibold tracking-tight text-foreground text-balance leading-[1.05] mb-6">
          Learn AI. Simply.
        </h1>
        <p className="text-[16px] text-muted-foreground leading-relaxed max-w-xl mx-auto mb-10">
          Structured courses on generative AI, prompt engineering, and LLM
          applications — built for clarity and depth.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Button size="lg" asChild>
            <Link href="#courses">
              Start Learning
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/auth">Create Free Account</Link>
          </Button>
        </div>
      </section>

      <Separator />

      {/* Value Props */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: BookOpen,
              label: 'Structured Learning Paths',
              desc: 'Courses designed to build knowledge progressively, from foundations to applied skills.',
            },
            {
              icon: Target,
              label: 'Quizzes That Unlock Progress',
              desc: 'Test your understanding before moving forward. No skipping ahead.',
            },
            {
              icon: GraduationCap,
              label: 'Built by Practitioners',
              desc: 'All content is authored by DS Virtual Lab — a team of working AI engineers and researchers.',
            },
          ].map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="flex flex-col gap-3 p-6 rounded-xl border border-border bg-card"
            >
              <div className="size-9 rounded-lg bg-muted flex items-center justify-center">
                <Icon className="size-4 text-foreground" />
              </div>
              <h3 className="text-[13px] font-semibold text-foreground tracking-tight">
                {label}
              </h3>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Course Catalog */}
      <section id="courses" className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <div className="flex flex-col gap-2">
            <p className="text-[12px] font-medium tracking-widest uppercase text-muted-foreground">
              Course Catalog
            </p>
            <h2 className="text-[28px] font-semibold tracking-tight text-foreground text-balance">
              Everything you need to understand AI
            </h2>
          </div>
          <span className="text-[13px] text-muted-foreground hidden md:block">
            {courses.length} courses
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-4">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[13px] font-semibold text-foreground">
            GenAI Learn
          </span>
          <p className="text-[12px] text-muted-foreground">
            &copy; {new Date().getFullYear()} DS Virtual Lab. All rights
            reserved.
          </p>
          <div className="flex items-center gap-5">
            {['Privacy', 'Terms', 'Contact'].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-[12px] text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
