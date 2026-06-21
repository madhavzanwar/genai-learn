import Link from 'next/link'
import { Star, Users, Lock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import type { Course } from '@/lib/data'

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/course/${course.id}`} className="group block">
      <div className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-sm transition-shadow duration-200">
        {/* Thumbnail */}
        <div className="w-full h-40 bg-muted flex items-center justify-center relative">
          <div className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground">
            {course.category}
          </div>
          {course.locked && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
              <div className="flex flex-col items-center gap-1.5">
                <Lock className="size-5 text-muted-foreground" />
                <span className="text-[11px] text-muted-foreground font-medium">Complete prior course to unlock</span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[14px] font-semibold text-foreground leading-snug tracking-tight group-hover:opacity-80 transition-opacity">
              {course.title}
            </h3>
            <Badge
              variant={course.locked ? 'secondary' : 'outline'}
              className={
                course.locked
                  ? 'shrink-0 text-[11px] font-medium text-muted-foreground border-border'
                  : 'shrink-0 text-[11px] font-medium text-[#16A34A] border-[#BBF7D0] bg-[#F0FDF4]'
              }
            >
              {course.locked ? 'Locked' : 'Unlocked'}
            </Badge>
          </div>

          <p className="text-[12px] text-muted-foreground leading-relaxed line-clamp-2">
            {course.description}
          </p>

          <div className="pt-1 flex items-center justify-between">
            <span className="text-[12px] text-muted-foreground">
              by {course.instructor}
            </span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Star className="size-3 fill-foreground text-foreground" />
                <span className="text-[12px] font-medium text-foreground">{course.rating}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <Users className="size-3" />
                <span className="text-[12px]">{course.students.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
