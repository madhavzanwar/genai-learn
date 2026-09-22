'use client'

import { useState } from 'react'
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
  ArrowUpRight
} from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { Navbar } from '@/components/navbar'
import { CourseCard } from '@/components/course-card'
import { courses } from '@/lib/data'

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  // Real category counts from actual lib/data.ts
  const categoryCounts = {
    All: courses.length,
    Foundations: courses.filter((c) => c.category === 'Foundations').length,
    Advanced: courses.filter((c) => c.category === 'Advanced').length,
    Applied: courses.filter((c) => c.category === 'Applied').length,
  }

  const filteredCourses = selectedCategory === 'All'
    ? courses
    : courses.filter((c) => c.category.toLowerCase() === selectedCategory.toLowerCase())

  // Real data for hero workspace composition from the primary course
  const heroCourse = courses[0] // "Introduction to Generative AI"

  return (
    <div className="min-h-screen bg-[#F7F4EF] text-[#18181B] flex flex-col selection:bg-[#FED7AA]/60">
      <Navbar />

      {/* =========================================================================
          HERO SECTION — ASYMMETRIC LEARNING STUDIO WORKSPACE
          ========================================================================= */}
      <section className="relative border-b border-[#E4E0D7] pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#18181B_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Editorial Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-white border border-[#E4E0D7] text-[11px] font-mono font-bold uppercase tracking-widest text-[#18181B]">
                <span className="size-2 rounded-full bg-[#A7F3D0] border border-emerald-500" />
                GENERATIVE AI / LEARNING STUDIO
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-black tracking-tight text-[#18181B] leading-[1.05]">
                Learn AI.<br />
                <span className="underline decoration-[#FED7AA] decoration-4 underline-offset-6">
                  Intentionally
                </span> & Simply.
              </h1>

              <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
                A structured digital workspace for mastering LLMs, prompt engineering, and production AI architectures. Built with practitioner depth and real-time AI clarification.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link 
                  href="#courses"
                  className={buttonVariants({ 
                    size: 'default', 
                    className: 'bg-[#18181B] hover:bg-stone-800 text-[#F7F4EF] h-11 px-6 rounded-xs text-xs font-mono uppercase tracking-wider font-bold shadow-2xs' 
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
                    className: 'bg-white hover:bg-stone-100 text-[#18181B] h-11 px-6 rounded-xs text-xs font-mono uppercase tracking-wider font-bold border-[#E4E0D7]' 
                  })}
                >
                  Create Free Account
                </Link>
              </div>

              {/* Editorial Checkpoints */}
              <div className="pt-6 border-t border-[#E4E0D7] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-stone-600">
                <div className="flex items-center gap-2">
                  <div className="size-4 rounded-xs bg-[#C4B5FD]/40 border border-[#C4B5FD] flex items-center justify-center text-[#4C1D95] font-bold">
                    ✓
                  </div>
                  <span>Foundations to Applied</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-4 rounded-xs bg-[#FED7AA]/60 border border-[#FED7AA] flex items-center justify-center text-[#9A3412] font-bold">
                    ✓
                  </div>
                  <span>Milestone Quizzes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-4 rounded-xs bg-[#BAE6FD]/60 border border-[#BAE6FD] flex items-center justify-center text-[#0369A1] font-bold">
                    ✓
                  </div>
                  <span>In-Lesson AI Explainer</span>
                </div>
              </div>
            </div>

            {/* Right Editorial Workspace Composition (Real Data Collage) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Floating Studio Badge 1: Category Tag */}
                <div className="absolute -top-3.5 -left-3.5 z-20 px-3 py-1 bg-[#C4B5FD] text-[#4C1D95] border border-[#A78BFA] text-[10px] font-mono font-bold tracking-widest uppercase rounded-xs shadow-xs animate-float-subtle">
                  {heroCourse.category} TRACK
                </div>

                {/* Main Featured Course Studio Card */}
                <div className="bg-white border-2 border-[#18181B] rounded-sm p-6 shadow-[6px_6px_0px_0px_#18181B] space-y-4 text-left relative z-10">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E4E0D7]">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-stone-500">
                      STUDIO SPOTLIGHT
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-800 bg-[#A7F3D0]/50 px-2 py-0.5 rounded-xs border border-[#A7F3D0]">
                      UNLOCKED
                    </span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#4C1D95] bg-[#F4F0FD] px-2 py-0.5 rounded-xs font-semibold">
                      COURSE 01
                    </span>
                    <h2 className="text-xl font-black text-[#18181B] tracking-tight">
                      {heroCourse.title}
                    </h2>
                    <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                      {heroCourse.description}
                    </p>
                  </div>

                  {/* Real Metadata Grid */}
                  <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-mono">
                    <div className="p-2.5 rounded-xs bg-[#F7F4EF] border border-[#E4E0D7] flex items-center justify-between">
                      <span className="text-stone-500">Duration</span>
                      <span className="font-bold text-[#18181B]">{heroCourse.duration}</span>
                    </div>
                    <div className="p-2.5 rounded-xs bg-[#F7F4EF] border border-[#E4E0D7] flex items-center justify-between">
                      <span className="text-stone-500">Curriculum</span>
                      <span className="font-bold text-[#18181B]">{heroCourse.modules} Modules</span>
                    </div>
                  </div>

                  <Link
                    href={`/course/${heroCourse.id}`}
                    className="w-full py-2.5 px-4 bg-[#18181B] hover:bg-stone-800 text-[#F7F4EF] rounded-xs text-xs font-mono uppercase tracking-wider font-bold flex items-center justify-between transition-colors"
                  >
                    <span>Enter Course Room</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>

                {/* Floating Studio Badge 2: Rating */}
                <div className="absolute -bottom-4 -left-4 z-20 p-2.5 bg-white border border-[#18181B] rounded-xs shadow-[3px_3px_0px_0px_#18181B] flex items-center gap-2 animate-float-delayed">
                  <Star className="size-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-mono font-bold text-[#18181B]">{heroCourse.rating.toFixed(1)} Rating</span>
                </div>

                {/* Floating Studio Badge 3: Learner Count */}
                <div className="absolute -bottom-4 -right-4 z-20 p-2.5 bg-[#BAE6FD] border border-[#38BDF8] rounded-xs shadow-[3px_3px_0px_0px_#18181B] flex items-center gap-2 animate-float-subtle">
                  <Users className="size-3.5 text-[#0369A1]" />
                  <span className="text-xs font-mono font-bold text-[#0369A1]">{heroCourse.students.toLocaleString()} Learners</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          LEARNING SIGNAL MOTIF (CONTINUOUS FLOWING RAIL)
          ========================================================================= */}
      <div className="w-full border-b border-[#E4E0D7] bg-[#FAF8F5] py-3 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between text-[11px] font-mono text-stone-500 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#C4B5FD]" />
            <span>Foundations</span>
          </div>
          <span className="text-stone-300">———→</span>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#BAE6FD]" />
            <span>Advanced LLMs</span>
          </div>
          <span className="text-stone-300">———→</span>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#A7F3D0]" />
            <span>Applied AI</span>
          </div>
          <span className="text-stone-300 hidden sm:inline">———→</span>
          <div className="hidden sm:flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#FED7AA]" />
            <span>Milestone Quizzes</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          "WHY GENAI LEARN" — EDITORIAL INTERACTIVE LIST
          ========================================================================= */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
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
          <div className="lg:col-span-8 space-y-3 text-left">
            {[
              {
                num: '01',
                title: 'Structured Learning Tracks',
                desc: 'Progression from Foundations into Advanced architectures and Applied real-world data workflows.',
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
                desc: 'Clarify complex transformer layers, tokenization, or vector math in real time without leaving the lesson.',
                tag: 'Interactive Tutor',
                accentColor: 'border-l-[#BAE6FD] bg-[#F0F9FF]/40',
                chipBg: 'bg-[#BAE6FD]/50 text-[#0369A1] border-[#BAE6FD]',
                icon: Bot,
              },
              {
                num: '04',
                title: 'Curated by DS Virtual Lab',
                desc: 'Curriculum authored by active AI researchers and engineers who design and ship LLM systems daily.',
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
      <section id="workflow" className="border-y border-[#E4E0D7] bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-left">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {[
              {
                step: '01',
                label: 'CHOOSE',
                title: 'Select Track',
                desc: 'Begin with Foundations (Intro to GenAI, Prompt Engineering) or proceed to Advanced and Applied tracks.',
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
                desc: 'Pass the 10-question milestone checkpoint to unlock subsequent modules and advanced coursework.',
                accent: 'bg-[#A7F3D0]',
                borderAccent: 'border-t-[#A7F3D0]',
              },
            ].map(({ step, label, title, desc, accent, borderAccent }) => (
              <div 
                key={step}
                className={`p-6 bg-[#F7F4EF] border border-[#E4E0D7] border-t-4 ${borderAccent} rounded-xs studio-card-lift flex flex-col justify-between space-y-4`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-black text-[#18181B]">
                    {step}
                  </span>
                  <span className={`text-[10px] font-mono font-black tracking-widest px-2 py-0.5 rounded-xs ${accent} text-[#18181B]`}>
                    {label}
                  </span>
                </div>
                <div className="space-y-1.5">
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
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="bg-[#18181B] text-[#F7F4EF] rounded-sm p-8 sm:p-12 border border-[#18181B] shadow-[8px_8px_0px_0px_#FED7AA]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xs bg-stone-800 border border-stone-700 text-[10px] font-mono font-bold uppercase tracking-widest text-[#BAE6FD]">
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
            <div className="lg:col-span-6 space-y-3 font-mono text-xs">
              <div className="p-3.5 rounded-xs bg-stone-900 border border-stone-800 text-stone-300">
                <span className="text-[10px] uppercase text-[#FED7AA] font-bold block mb-1">
                  Learner Query:
                </span>
                &quot;Explain the transformer attention mechanism using a simple analogy.&quot;
              </div>

              <div className="p-4 rounded-xs bg-stone-900/90 border border-stone-700 text-stone-200 space-y-2">
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
      <section id="courses" className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-left">
        
        {/* Catalog Header & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-stone-500">
              CURATED CURRICULUM
            </span>
            <h2 className="text-3xl font-black tracking-tight text-[#18181B]">
              Course Catalog
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Explore 6 practitioner-crafted tracks spanning Foundations, Advanced LLMs, and Applied AI.
            </p>
          </div>

          {/* Editorial Sliding-style Filter Bar */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white rounded-xs border border-[#E4E0D7] shadow-2xs self-start md:self-auto">
            {(['All', 'Foundations', 'Advanced', 'Applied'] as const).map((cat) => {
              const isSelected = selectedCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xs text-[11px] font-mono uppercase tracking-wider font-bold transition-all ${
                    isSelected
                      ? 'bg-[#18181B] text-[#F7F4EF] shadow-xs'
                      : 'text-stone-600 hover:text-[#18181B] hover:bg-[#F7F4EF]'
                  }`}
                >
                  {cat === 'All' ? 'ALL COURSES' : cat.toUpperCase()} ({categoryCounts[cat]})
                </button>
              )
            })}
          </div>
        </div>

        {/* Dynamic Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, idx) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              isFeatured={idx === 0 && selectedCategory === 'All'}
            />
          ))}
        </div>

      </section>

      {/* =========================================================================
          MAGAZINE-STYLE DEEP INK FOOTER
          ========================================================================= */}
      <footer className="border-t border-[#18181B] bg-[#18181B] text-[#F7F4EF] mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-left">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-14 border-b border-stone-800">
            
            {/* Magazine Headline */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <div className="size-7 bg-[#F7F4EF] text-[#18181B] flex items-center justify-center font-mono font-black text-xs rounded-xs">
                  GL
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-stone-400">
                  GenAI Learn Studio
                </span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-none text-[#F7F4EF]">
                START<br />
                LEARNING.
              </h2>
              <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
                Authored by DS Virtual Lab. Master generative AI architectures, prompt design, and real-world deployment.
              </p>
            </div>

            {/* Quick Links & Tracks */}
            <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-6 font-mono text-xs">
              <div className="space-y-3">
                <span className="text-[10px] text-[#FED7AA] font-bold uppercase tracking-widest block">
                  Studio Tracks
                </span>
                <ul className="space-y-2 text-stone-400">
                  <li><Link href="#courses" className="hover:text-white transition-colors">Foundations</Link></li>
                  <li><Link href="#courses" className="hover:text-white transition-colors">Advanced LLMs</Link></li>
                  <li><Link href="#courses" className="hover:text-white transition-colors">Applied Workflows</Link></li>
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
            <p>&copy; {new Date().getFullYear()} DS Virtual Lab. All rights reserved.</p>
            <p className="text-stone-600">Engineered for clarity & practical mastery.</p>
          </div>

        </div>
      </footer>
    </div>
  )
}
