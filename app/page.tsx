'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  ArrowRight, 
  BookOpen, 
  Target, 
  GraduationCap, 
  Bot, 
  Check, 
  Layers, 
  Play, 
  Clock,
  Star,
  Users,
  Sparkles,
  ArrowUpRight,
  Search,
  X
} from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import { CourseCard } from '@/components/course-card'
import { courses } from '@/lib/data'
import { getUnlockedLessons, getWatchedLessons } from '@/lib/unlocked-lessons'

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [resumeProgress, setResumeProgress] = useState<{ unlockedCount: number; watchedCount: number } | null>(null)

  useEffect(() => {
    const unlocked = getUnlockedLessons()
    const watched = getWatchedLessons()
    if (unlocked.length > 1 || watched.length > 0) {
      setResumeProgress({
        unlockedCount: Math.min(6, Math.max(1, unlocked.length)),
        watchedCount: watched.length,
      })
    }
  }, [])

  // Dynamic category calculations based on existing courses in lib/data.ts
  const availableCategories = ['All', ...Array.from(new Set(courses.map((c) => c.category)))]
  const categoryCounts: Record<string, number> = {
    All: courses.length,
  }
  courses.forEach((c) => {
    categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1
  })

  const filteredCourses = courses.filter((c) => {
    const matchesCategory = selectedCategory === 'All' || c.category.toLowerCase() === selectedCategory.toLowerCase()
    const q = searchQuery.toLowerCase().trim()
    const matchesSearch = !q || 
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.instructor.toLowerCase().includes(q)
    return matchesCategory && matchesSearch
  })

  // Real data for hero workspace composition from the primary course
  const heroCourse = courses[0] // "Introduction to Generative AI"

  return (
    <div className="min-h-screen bg-[#F7F4EF] text-[#18181B] flex flex-col selection:bg-[#FED7AA]/60">
      <Navbar />

      {/* =========================================================================
          HERO SECTION — ASYMMETRIC LEARNING STUDIO WORKSPACE
          ========================================================================= */}
      <section className="relative border-b border-[#E4E0D7] pt-24 pb-28 md:pt-[96px] md:pb-[120px] overflow-hidden">
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#18181B_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
            
            {/* Left Editorial Column */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xs bg-white border border-[#E4E0D7] text-[11px] font-mono font-bold uppercase tracking-widest text-[#18181B] shadow-2xs">
                <span className="size-2 rounded-full bg-[#A7F3D0] border border-emerald-500" />
                AI LEARNING STUDIO
              </div>

              <div>
                <h1 className="text-[clamp(72px,10vw,140px)] font-black uppercase text-[#18181B] leading-[0.9] tracking-[-0.04em]">
                  <span className="underline decoration-[#FED7AA] decoration-[8px] md:decoration-[12px] underline-offset-[12px] md:underline-offset-[18px]">
                    EKLAVYA
                  </span>
                </h1>

                <h2 className="text-[clamp(24px,2.6vw,36px)] font-semibold text-stone-700 tracking-tight mt-4 sm:mt-5">
                  Learn AI Simply: Basics to Beyond
                </h2>

                <p className="text-[18px] text-stone-600 leading-relaxed max-w-[520px] mt-5">
                  A focused digital workspace for mastering LLMs, prompt engineering, and Data Science with real-time AI clarification.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link 
                  href="#courses"
                  className={buttonVariants({ 
                    size: 'default', 
                    className: 'bg-[#18181B] hover:bg-stone-800 text-[#F7F4EF] h-12 px-7 rounded-xs text-xs font-mono uppercase tracking-wider font-bold shadow-2xs' 
                  })}
                >
                  <Play className="size-3 mr-2 fill-current" />
                  Explore Courses
                </Link>
                <Link 
                  href="/auth?tab=register"
                  className={buttonVariants({ 
                    variant: 'outline', 
                    size: 'default', 
                    className: 'bg-white hover:bg-stone-100 text-[#18181B] h-12 px-7 rounded-xs text-xs font-mono uppercase tracking-wider font-bold border-[#E4E0D7]' 
                  })}
                >
                  Create Free Account
                </Link>
              </div>

            </div>

            {/* Right Editorial Workspace Composition (Clean Elevated Studio Card) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Floating Studio Badge: Category Tag */}
                <div className="absolute -top-3.5 -left-3.5 z-20 px-3.5 py-1 bg-[#C4B5FD] text-[#4C1D95] border border-[#A78BFA] text-[10px] font-mono font-bold tracking-widest uppercase rounded-xs shadow-xs animate-float-subtle">
                  {heroCourse.category} TRACK
                </div>

                {/* Main Featured Course Studio Card */}
                <div className="bg-white border-2 border-[#18181B] rounded-sm p-8 sm:p-9 shadow-[8px_8px_0px_0px_#18181B] space-y-6 text-left relative z-10">
                  <div className="flex items-center justify-between pb-3.5 border-b border-[#E4E0D7]">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500">
                      STUDIO SPOTLIGHT
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-800 bg-[#A7F3D0]/50 px-2.5 py-0.5 rounded-xs border border-[#A7F3D0]">
                      UNLOCKED
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#4C1D95] bg-[#F4F0FD] px-2.5 py-1 rounded-xs font-semibold">
                      COURSE 01
                    </span>
                    <h3 className="text-2xl font-black text-[#18181B] tracking-tight">
                      {heroCourse.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-2">
                      {heroCourse.description}
                    </p>
                  </div>

                  {/* Real Metadata Grid */}
                  <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono">
                    <div className="p-3 rounded-xs bg-[#F7F4EF] border border-[#E4E0D7] flex items-center justify-between">
                      <span className="text-stone-500">Duration</span>
                      <span className="font-bold text-[#18181B]">{heroCourse.duration}</span>
                    </div>
                    <div className="p-3 rounded-xs bg-[#F7F4EF] border border-[#E4E0D7] flex items-center justify-between">
                      <span className="text-stone-500">Curriculum</span>
                      <span className="font-bold text-[#18181B]">{heroCourse.modules} Modules</span>
                    </div>
                  </div>

                  <Link
                    href={`/course/${heroCourse.id}`}
                    className="w-full py-3.5 px-5 bg-[#18181B] hover:bg-stone-800 text-[#F7F4EF] rounded-xs text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-between transition-colors shadow-2xs"
                  >
                    <span>Enter Course Room</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          SEPARATE FEATURES & VALUE CHECKPOINTS ROW
          ========================================================================= */}
      <section className="w-full border-b border-[#E4E0D7] bg-white py-14 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs sm:text-sm font-mono text-stone-700">
            <div className="flex items-center gap-3.5 p-4 bg-[#F7F4EF] border border-[#E4E0D7] rounded-xs">
              <div className="size-6 rounded-xs bg-[#C4B5FD]/40 border border-[#C4B5FD] flex items-center justify-center text-[#4C1D95] font-bold text-xs shrink-0">
                ✓
              </div>
              <span className="font-semibold text-stone-900">Foundations to Beyond</span>
            </div>
            <div className="flex items-center gap-3.5 p-4 bg-[#F7F4EF] border border-[#E4E0D7] rounded-xs">
              <div className="size-6 rounded-xs bg-[#FED7AA]/60 border border-[#FED7AA] flex items-center justify-center text-[#9A3412] font-bold text-xs shrink-0">
                ✓
              </div>
              <span className="font-semibold text-stone-900">Milestone Quizzes</span>
            </div>
            <div className="flex items-center gap-3.5 p-4 bg-[#F7F4EF] border border-[#E4E0D7] rounded-xs">
              <div className="size-6 rounded-xs bg-[#BAE6FD]/60 border border-[#BAE6FD] flex items-center justify-center text-[#0369A1] font-bold text-xs shrink-0">
                ✓
              </div>
              <span className="font-semibold text-stone-900">In-Lesson AI Explainer</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          DEDICATED ACTIVE PROGRESS ROW (WHEN AVAILABLE)
          ========================================================================= */}
      {resumeProgress && (
        <section className="w-full border-b border-[#E4E0D7] bg-[#F7F4EF] py-5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="p-4 sm:p-5 bg-white border border-[#18181B] rounded-xs shadow-[3px_3px_0px_0px_#18181B] flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in duration-300">
              <div className="flex items-center gap-3.5">
                <div className="size-10 rounded-xs bg-[#A7F3D0] border border-emerald-500 flex flex-col items-center justify-center text-emerald-950 font-bold font-mono shrink-0">
                  <span className="text-xs leading-none">{resumeProgress.unlockedCount}</span>
                  <span className="text-[9px] text-emerald-800 font-normal leading-none">/6</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-900 bg-[#A7F3D0]/60 px-1.5 py-0.2 rounded-2xs border border-emerald-300">
                      Active Progress
                    </span>
                    <span className="text-xs font-bold text-[#18181B]">Introduction to Generative AI</span>
                  </div>
                  <p className="text-[11px] font-mono text-stone-500 mt-0.5">
                    {resumeProgress.unlockedCount} of 6 lessons unlocked • Milestone checkpoints active
                  </p>
                </div>
              </div>
              <Link
                href="/course/intro-to-genai"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#18181B] hover:bg-stone-800 text-[#F7F4EF] rounded-xs text-xs font-mono uppercase font-bold tracking-wider transition-colors shrink-0 shadow-2xs"
              >
                <span>Resume Course</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          LEARNING SIGNAL MOTIF (CONTINUOUS FLOWING RAIL)
          ========================================================================= */}
      <div className="w-full border-b border-[#E4E0D7] bg-[#FAF8F5] py-4 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between text-[11px] font-mono text-stone-500 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#C4B5FD]" />
            <span>Foundations</span>
          </div>
          <span className="text-stone-300">———→</span>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#FED7AA]" />
            <span>Prompt Engineering</span>
          </div>
          <span className="text-stone-300">———→</span>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#BAE6FD]" />
            <span>Data Science</span>
          </div>
          <span className="text-stone-300 hidden sm:inline">———→</span>
          <div className="hidden sm:flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#A7F3D0]" />
            <span>Milestone Quizzes</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          "WHY EKLAVYA" — EDITORIAL INTERACTIVE LIST
          ========================================================================= */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Large Left Editorial Typographic Block */}
          <div className="lg:col-span-4 text-left space-y-4 lg:sticky lg:top-24">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-stone-500">
              LEARNING PRINCIPLES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#18181B] leading-[1.1]">
              LEARN<br />
              WITH<br />
              <span className="text-stone-400">PURPOSE.</span>
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed pt-2">
              Every course module is engineered to bridge theoretical model architecture with hands-on prompt design and retention checkpoints.
            </p>
          </div>

          {/* Right Interactive Editorial Rows */}
          <div className="lg:col-span-8 space-y-4 text-left">
            {[
              {
                num: '01',
                title: 'Structured Learning Tracks',
                desc: 'Progression from Foundations into Prompt Engineering and applied Data Science workflows.',
                tag: 'Track Architecture',
                accentColor: 'border-l-[#C4B5FD] bg-[#F4F0FD]/40',
                chipBg: 'bg-[#C4B5FD]/40 text-[#4C1D95] border-[#C4B5FD]',
                icon: BookOpen,
              },
              {
                num: '02',
                title: 'Milestone Retention Quizzes',
                desc: '10-question checkpoints that validate conceptual comprehension before unlocking subsequent lessons.',
                tag: 'Mastery Validation',
                accentColor: 'border-l-[#FED7AA] bg-[#FFF7ED]/40',
                chipBg: 'bg-[#FED7AA]/50 text-[#9A3412] border-[#FED7AA]',
                icon: Target,
              },
              {
                num: '03',
                title: 'In-Lesson AI Concept Explainer',
                desc: 'Clarify complex transformer layers, tokenization, or Python logic in real time without leaving the lesson.',
                tag: 'Interactive Tutor',
                accentColor: 'border-l-[#BAE6FD] bg-[#F0F9FF]/40',
                chipBg: 'bg-[#BAE6FD]/50 text-[#0369A1] border-[#BAE6FD]',
                icon: Bot,
              },
              {
                num: '04',
                title: 'Curated by Eklavya',
                desc: 'Curriculum authored by active AI researchers and engineers who design and ship machine learning systems daily.',
                tag: 'Practitioner Rigor',
                accentColor: 'border-l-[#A7F3D0] bg-[#F0FDF4]/40',
                chipBg: 'bg-[#A7F3D0]/50 text-[#047857] border-[#A7F3D0]',
                icon: GraduationCap,
              },
            ].map(({ num, title, desc, tag, accentColor, chipBg, icon: Icon }, index) => (
              <div
                key={num}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                className={`p-6 bg-white border border-[#E4E0D7] border-l-4 ${accentColor} rounded-xs studio-row-hover transition-all cursor-default`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-black text-[#18181B]">
                      {num}
                    </span>
                    <h3 className="text-base font-bold text-[#18181B]">
                      {title}
                    </h3>
                  </div>
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs border self-start sm:self-auto ${chipBg}`}>
                    {tag}
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed sm:pl-7">
                  {desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          HOW IT WORKS — 3-STAGE HORIZONTAL LEARNING JOURNEY
          ========================================================================= */}
      <section id="workflow" className="border-y border-[#E4E0D7] bg-white py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-left">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-stone-500">
                THE METHODOLOGY
              </span>
              <h2 className="text-3xl font-black tracking-tight text-[#18181B]">
                How the Learning Studio Works
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 max-w-md">
              A 3-step progressive mastery cycle designed to verify comprehension before unlocking advanced content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              {
                step: '01',
                label: 'CHOOSE',
                title: 'Select Track',
                desc: 'Begin with Foundations (Intro to GenAI, Prompt Engineering) or explore the Data Science track.',
                accent: 'bg-[#C4B5FD]',
                borderAccent: 'border-t-[#C4B5FD]',
              },
              {
                step: '02',
                label: 'LEARN',
                title: 'Learn & Ask AI',
                desc: 'Engage with targeted video lessons and use the built-in AI explainer for immediate terminology breakdown.',
                accent: 'bg-[#BAE6FD]',
                borderAccent: 'border-t-[#BAE6FD]',
              },
              {
                step: '03',
                label: 'PROVE',
                title: 'Prove with Quizzes',
                desc: 'Pass the 10-question milestone checkpoint to unlock subsequent modules and course certifications.',
                accent: 'bg-[#A7F3D0]',
                borderAccent: 'border-t-[#A7F3D0]',
              },
            ].map(({ step, label, title, desc, accent, borderAccent }) => (
              <div 
                key={step}
                className={`p-7 bg-[#F7F4EF] border border-[#E4E0D7] border-t-4 ${borderAccent} rounded-xs studio-card-lift flex flex-col justify-between space-y-5`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-black text-[#18181B]">
                    {step}
                  </span>
                  <span className={`text-[10px] font-mono font-black tracking-widest px-2 py-0.5 rounded-xs ${accent} text-[#18181B]`}>
                    {label}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-[#18181B]">
                    {title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          IN-LESSON AI EXPLAINER VISUAL SHOWCASE
          ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-24 md:py-32">
        <div className="bg-[#18181B] text-[#F7F4EF] rounded-sm p-8 sm:p-14 border border-[#18181B] shadow-[8px_8px_0px_0px_#FED7AA]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center text-left">
            
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xs bg-stone-800 border border-stone-700 text-[10px] font-mono font-bold uppercase tracking-widest text-[#BAE6FD]">
                <Bot className="size-3" />
                BUILT-IN AI CONCEPT TUTOR
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
                Never get stuck on complex AI concepts again.
              </h2>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                During any video lesson, open the AI Explainer to query terms, request intuitive analogies, and receive instant grounded breakdowns.
              </p>
            </div>

            {/* Visual Conversation Preview */}
            <div className="lg:col-span-6 space-y-4 font-mono text-xs">
              <div className="p-4 rounded-xs bg-stone-900 border border-stone-800 text-stone-300">
                <span className="text-[10px] uppercase text-[#FED7AA] font-bold block mb-1.5">
                  Learner Query:
                </span>
                &quot;Explain the transformer attention mechanism using a simple analogy.&quot;
              </div>

              <div className="p-5 rounded-xs bg-stone-900/90 border border-stone-700 text-stone-200 space-y-2.5">
                <div className="flex items-center gap-1.5 text-[10px] uppercase text-[#A7F3D0] font-bold">
                  <Sparkles className="size-3 text-[#A7F3D0]" />
                  <span>AI Explainer Response:</span>
                </div>
                <p className="text-[11.5px] leading-relaxed text-stone-300">
                  &quot;Think of self-attention like reading a sentence while shining a dynamic spotlight: when reading the word &apos;bank&apos;, the model shines a brighter light on &apos;river&apos; or &apos;money&apos; in the surrounding context to decide the exact meaning.&quot;
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          COURSE CATALOG — THE STAR OF THE STUDIO
          ========================================================================= */}
      <section id="courses" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28 text-left">
        
        {/* Catalog Header & Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-stone-500">
              CURATED CURRICULUM
            </span>
            <h2 className="text-3xl font-black tracking-tight text-[#18181B]">
              Course Catalog
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Explore practitioner-crafted tracks spanning Foundations, Prompt Engineering, and Data Science.
            </p>
          </div>

          {/* Search bar & Category filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Live Search Input */}
            <div className="relative min-w-[220px] sm:min-w-[260px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tracks, topics, models..."
                className="w-full pl-9 pr-8 py-2.5 bg-white rounded-xs border border-[#E4E0D7] text-xs font-mono text-[#18181B] placeholder:text-stone-400 focus:outline-hidden focus:border-[#18181B] transition-all shadow-2xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-stone-400 hover:text-stone-700"
                  aria-label="Clear search"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {/* Dynamic Filter Bar */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white rounded-xs border border-[#E4E0D7] shadow-2xs self-start sm:self-auto">
              {availableCategories.map((cat) => {
                const isSelected = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-xs text-[11px] font-mono uppercase tracking-wider font-bold transition-all ${
                      isSelected
                        ? 'bg-[#18181B] text-[#F7F4EF] shadow-xs'
                        : 'text-stone-600 hover:text-[#18181B] hover:bg-[#F7F4EF]'
                    }`}
                  >
                    {cat === 'All' ? 'ALL COURSES' : cat.toUpperCase()} ({categoryCounts[cat] || 0})
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Responsive 3-Column Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, idx) => (
              <CourseCard 
                key={course.id} 
                course={course} 
                isFeatured={idx === 0 && selectedCategory === 'All' && !searchQuery}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-6 bg-white border border-[#E4E0D7] rounded-sm space-y-4 max-w-lg mx-auto shadow-2xs">
            <div className="inline-flex size-12 rounded-full bg-[#FED7AA]/40 border border-[#FED7AA] items-center justify-center text-[#9A3412] mx-auto">
              <Search className="size-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-[#18181B]">
                No courses found matching &ldquo;{searchQuery}&rdquo;
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We couldn&apos;t find any tracks with that title or description. Try searching for &ldquo;AI&rdquo;, &ldquo;Prompt&rdquo;, &ldquo;Data Science&rdquo;, or reset your filters.
              </p>
            </div>
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setSelectedCategory('All') }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#18181B] text-[#F7F4EF] rounded-xs text-xs font-mono font-bold uppercase tracking-wider hover:bg-stone-800 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </section>

      {/* =========================================================================
          MAGAZINE-STYLE DEEP INK FOOTER
          ========================================================================= */}
      <footer className="border-t border-[#18181B] bg-[#18181B] text-[#F7F4EF] mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 text-left">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-stone-800">
            
            {/* Magazine Headline */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="size-7 bg-[#F7F4EF] text-[#18181B] flex items-center justify-center font-mono font-black text-xs rounded-xs">
                  EK
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-stone-400">
                  EKLAVYA STUDIO
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-[#F7F4EF]">
                START<br />
                LEARNING.
              </h2>
              <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
                Authored by Eklavya. Master generative AI architectures, prompt design, and real-world deployment.
              </p>
            </div>

            {/* Quick Links & Tracks */}
            <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8 font-mono text-xs">
              <div className="space-y-3">
                <span className="text-[10px] text-[#FED7AA] font-bold uppercase tracking-widest block">
                  Studio Tracks
                </span>
                <ul className="space-y-2 text-stone-400">
                  <li><Link href="#courses" className="hover:text-white transition-colors">Foundations</Link></li>
                  <li><Link href="#courses" className="hover:text-white transition-colors">Prompt Engineering</Link></li>
                  <li><Link href="#courses" className="hover:text-white transition-colors">Data Science</Link></li>
                </ul>
              </div>

              <div className="space-y-3">
                <span className="text-[10px] text-[#BAE6FD] font-bold uppercase tracking-widest block">
                  Platform
                </span>
                <ul className="space-y-2 text-stone-400">
                  <li><Link href="#courses" className="hover:text-white transition-colors">All Courses</Link></li>
                  <li><Link href="#features" className="hover:text-white transition-colors">Features</Link></li>
                  <li><Link href="#workflow" className="hover:text-white transition-colors">How It Works</Link></li>
                </ul>
              </div>

              <div className="space-y-3 col-span-2 sm:col-span-1">
                <span className="text-[10px] text-[#A7F3D0] font-bold uppercase tracking-widest block">
                  Account
                </span>
                <ul className="space-y-2 text-stone-400">
                  <li><Link href="/auth" className="hover:text-white transition-colors">Log In</Link></li>
                  <li><Link href="/auth?tab=register" className="hover:text-white transition-colors">Register Free</Link></li>
                </ul>
              </div>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-500">
            <p>&copy; {new Date().getFullYear()} Eklavya. All rights reserved.</p>
            <p className="text-stone-600">Engineered for clarity & practical mastery.</p>
          </div>

        </div>
      </footer>
    </div>
  )
}
