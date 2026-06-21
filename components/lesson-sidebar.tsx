'use client'

import Link from 'next/link'
import { CheckCircle2, Lock, PlayCircle, FileText, HelpCircle, ChevronDown, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { courseModules } from '@/lib/data'
import type { Lesson } from '@/lib/data'
import { getUnlockedLessons } from '@/lib/unlocked-lessons'
import { useState, useEffect } from 'react'

function LessonIcon({ lesson }: { lesson: Lesson }) {
  if (lesson.completed) return <CheckCircle2 className="size-4 shrink-0 text-[#16A34A]" />
  if (lesson.locked) return <Lock className="size-4 shrink-0 text-muted-foreground/50" />
  if (lesson.type === 'quiz') return <HelpCircle className="size-4 shrink-0 text-foreground" />
  if (lesson.type === 'reading') return <FileText className="size-4 shrink-0 text-foreground" />
  return <PlayCircle className="size-4 shrink-0 text-foreground" />
}

export function LessonSidebar({ courseId, activeLessonId }: { courseId: string; activeLessonId: string }) {
  const [expanded, setExpanded] = useState<string[]>(['module-1', 'module-2'])
  const [unlockedLessons, setUnlockedLessons] = useState<string[]>([])

  useEffect(() => {
    setUnlockedLessons(getUnlockedLessons())
  }, [])

  const isLessonLocked = (lesson: Lesson) =>
    lesson.locked && !unlockedLessons.includes(lesson.id)

  const toggle = (id: string) =>
    setExpanded((prev) => (prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]))

  return (
    <aside className="bg-card border border-border rounded-xl overflow-hidden flex flex-col">
      <div className="px-5 py-4 border-b border-border">
        <h2 className="text-[13px] font-semibold text-foreground tracking-tight">Course Content</h2>
        <p className="text-[12px] text-muted-foreground mt-0.5">Introduction to Generative AI</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {courseModules.map((mod, modIndex) => {
          const isOpen = expanded.includes(mod.id)
          return (
            <div key={mod.id} className="border-b border-border last:border-0">
              <button
                onClick={() => toggle(mod.id)}
                className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-muted/50 transition-colors text-left"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-[11px] text-muted-foreground font-medium tracking-wide uppercase">
                    Module {modIndex + 1}
                  </span>
                  <span className="text-[13px] font-semibold text-foreground tracking-tight">
                    {mod.title}
                  </span>
                </div>
                {isOpen ? (
                  <ChevronDown className="size-4 text-muted-foreground shrink-0" />
                ) : (
                  <ChevronRight className="size-4 text-muted-foreground shrink-0" />
                )}
              </button>

              {isOpen && (
                <ul className="pb-1">
                  {mod.lessons.map((lesson, lessonIndex) => {
                    const isActive = lesson.id === activeLessonId
                    const locked = isLessonLocked(lesson)
                    const globalIndex = courseModules
                      .slice(0, modIndex)
                      .reduce((acc, m) => acc + m.lessons.length, 0) + lessonIndex + 1

                    return (
                      <li key={lesson.id}>
                        <Link
                          href={locked ? '#' : `/course/${courseId}?lesson=${lesson.id}`}
                          className={cn(
                            'flex items-center gap-3 px-5 py-2.5 transition-colors',
                            isActive
                              ? 'bg-foreground/5 border-l-2 border-foreground'
                              : 'hover:bg-muted/50',
                            locked && 'opacity-50 pointer-events-none'
                          )}
                        >
                          <span className="text-[11px] text-muted-foreground w-5 shrink-0 text-right">
                            {globalIndex}
                          </span>
                          <LessonIcon lesson={{ ...lesson, locked }} />
                          <div className="flex flex-col gap-0.5 min-w-0">
                            <span
                              className={cn(
                                'text-[12px] leading-snug truncate',
                                isActive
                                  ? 'font-semibold text-foreground'
                                  : 'font-medium text-foreground'
                              )}
                            >
                              {lesson.title}
                            </span>
                            <span className="text-[11px] text-muted-foreground capitalize">
                              {lesson.type} &middot; {lesson.duration}
                            </span>
                          </div>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )
        })}
      </div>
    </aside>
  )
}
