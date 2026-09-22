import Link from 'next/link'
import { Star, Users, Lock, Unlock, Clock, Layers, ArrowUpRight } from 'lucide-react'
import type { Course } from '@/lib/data'

interface CourseCardProps {
  course: Course
  isFeatured?: boolean
}

export function CourseCard({ course, isFeatured = false }: CourseCardProps) {
  // Category specific pastel accents strictly per user specification
  const categoryStyles: Record<string, { 
    accentBg: string
    badgeBg: string
    badgeText: string
    badgeBorder: string
    accentBar: string
  }> = {
    Foundations: {
      accentBg: 'bg-[#F4F0FD]',
      badgeBg: 'bg-[#C4B5FD]/40',
      badgeText: 'text-[#4C1D95]',
      badgeBorder: 'border-[#C4B5FD]',
      accentBar: 'bg-[#C4B5FD]',
    },
    Advanced: {
      accentBg: 'bg-[#F0F9FF]',
      badgeBg: 'bg-[#BAE6FD]/50',
      badgeText: 'text-[#0369A1]',
      badgeBorder: 'border-[#BAE6FD]',
      accentBar: 'bg-[#BAE6FD]',
    },
    Applied: {
      accentBg: 'bg-[#F0FDF4]',
      badgeBg: 'bg-[#A7F3D0]/50',
      badgeText: 'text-[#047857]',
      badgeBorder: 'border-[#A7F3D0]',
      accentBar: 'bg-[#A7F3D0]',
    },
  }

  const theme = categoryStyles[course.category] || {
    accentBg: 'bg-[#FAF8F5]',
    badgeBg: 'bg-stone-200',
    badgeText: 'text-stone-900',
    badgeBorder: 'border-stone-300',
    accentBar: 'bg-stone-400',
  }

  return (
    <Link href={`/course/${course.id}`} className="group block h-full">
      <div className={`bg-white border border-[#E4E0D7] rounded-md overflow-hidden studio-card-lift flex flex-col h-full group-hover:border-[#18181B] transition-colors relative ${
        isFeatured ? 'ring-1 ring-[#18181B]/10' : ''
      }`}>
        
        {/* Top Accent Line */}
        <div className={`h-1.5 w-full ${theme.accentBar}`} />

        {/* Card Header */}
        <div className={`p-5 ${theme.accentBg} border-b border-[#E4E0D7]/80 flex flex-col gap-3`}>
          <div className="flex items-center justify-between">
            <span className={`text-[10px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded-xs border ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}>
              {course.category}
            </span>
            
            <div className="flex items-center gap-1.5">
              {course.locked ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono text-stone-500 bg-white/80 px-2 py-0.5 rounded-xs border border-[#E4E0D7]">
                  <Lock className="size-3 text-stone-400" />
                  LOCKED
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-xs border border-emerald-300">
                  <Unlock className="size-3 text-emerald-700" />
                  UNLOCKED
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 text-[11.5px] font-mono text-stone-600">
            <span className="flex items-center gap-1">
              <Clock className="size-3 text-stone-400" />
              {course.duration}
            </span>
            <span className="text-stone-300">/</span>
            <span className="flex items-center gap-1">
              <Layers className="size-3 text-stone-400" />
              {course.modules} Modules
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 flex flex-col flex-1 justify-between gap-5">
          <div className="space-y-2">
            <h3 className="text-base font-bold text-[#18181B] leading-snug tracking-tight group-hover:text-black transition-colors">
              {course.title}
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
              {course.description}
            </p>
          </div>

          <div className="space-y-3 pt-3 border-t border-stone-100">
            <div className="flex items-center justify-between text-[11.5px]">
              <span className="text-stone-500 font-medium truncate max-w-[130px]">
                {course.instructor}
              </span>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-[#18181B] font-bold">
                  <Star className="size-3.5 fill-amber-400 text-amber-400" />
                  <span>{course.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center gap-1 text-stone-500 font-mono">
                  <Users className="size-3" />
                  <span>{course.students.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-1">
              <div className={`w-full py-2 px-3 rounded-xs text-[11.5px] font-mono uppercase tracking-wider font-semibold flex items-center justify-center gap-1.5 transition-all ${
                course.locked 
                  ? 'bg-stone-100 text-stone-500 hover:bg-stone-200' 
                  : 'bg-[#18181B] text-[#F7F4EF] group-hover:bg-stone-800'
              }`}>
                <span>{course.locked ? 'View Prerequisites' : 'Start Course'}</span>
                <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
