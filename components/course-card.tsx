'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Star, Users, Lock, Unlock, Clock, Layers, ArrowUpRight, X, ArrowRight, BookOpen, AlertCircle } from 'lucide-react'
import type { Course } from '@/lib/data'
import { isCourseUnlocked } from '@/lib/unlocked-lessons'

interface CourseCardProps {
  course: Course
  isFeatured?: boolean
}

interface CourseCurriculum {
  prerequisites: string[]
  syllabus: { title: string; desc: string }[]
}

function getCourseCurriculum(course: Course): CourseCurriculum {
  if (course.id === 'fine-tuning-llms') {
    return {
      prerequisites: [
        'Must complete Introduction to Generative AI first',
        'Working knowledge of Python and PyTorch / deep learning basics',
        'Understanding of transformer architectures, attention, and tokenization',
      ],
      syllabus: [
        { title: 'Module 1: Pre-training vs Fine-Tuning & Data Preparation', desc: 'Dataset curation, formatting conversation templates, and memory constraints' },
        { title: 'Module 2: Parameter-Efficient Fine-Tuning (PEFT)', desc: 'LoRA, prefix-tuning, adapter layers, and rank selection strategies' },
        { title: 'Module 3: Quantization & QLoRA Techniques', desc: '4-bit and 8-bit quantization with BitsAndBytes and VRAM reduction' },
        { title: 'Module 4: Supervised Fine-Tuning (SFT) with Hugging Face TRL', desc: 'Writing training loops, hyperparameter optimization, and loss tracking' },
        { title: 'Module 5: Alignment with DPO and RLHF', desc: 'Direct Preference Optimization, reward modelling, and evaluation benchmarks' },
      ],
    }
  }

  if (course.id === 'building-ai-agents') {
    return {
      prerequisites: [
        'Must complete Introduction to Generative AI first',
        'Prompt Engineering Fundamentals recommended',
      ],
      syllabus: [
        { title: 'Module 1: Tool Use & Function Calling', desc: 'Connecting LLMs to external APIs, structured outputs, and schema design' },
        { title: 'Module 2: Memory & Context Windows', desc: 'Short-term vs long-term memory, conversation buffers, and entity tracking' },
        { title: 'Module 3: Multi-Agent Systems & Orchestration', desc: 'Role specialization, delegation patterns, and consensus protocols' },
        { title: 'Module 4: Guardrails & Autonomous Execution', desc: 'Safety envelopes, loop prevention, and graceful error recovery' },
      ],
    }
  }

  if (course.id === 'langchain-applications') {
    return {
      prerequisites: [
        'Must complete Introduction to Generative AI first',
        'Must complete Prompt Engineering & LangChain fundamentals',
        'Familiarity with REST APIs and vector databases',
      ],
      syllabus: [
        { title: 'Module 1: LangChain Expression Language (LCEL) & Runnables', desc: 'Composing declarative chains, prompt templates, and streaming handlers' },
        { title: 'Module 2: Document Ingestion & Chunking Strategies', desc: 'Semantic splitting, metadata extraction, and multi-format loaders' },
        { title: 'Module 3: Vector Stores & Embedding Models', desc: 'Vector index setup, distance metrics, and approximate nearest neighbor search' },
        { title: 'Module 4: Retrieval-Augmented Generation (RAG) Systems', desc: 'Context stuffing, contextual compression, and reciprocal rank fusion' },
        { title: 'Module 5: Stateful Agents with LangGraph', desc: 'Designing cyclic graphs, human checkpoints, and state persistence' },
        { title: 'Module 6: Memory Strategies in Production', desc: 'Summary buffer memory, conversation token limits, and entity graphs' },
        { title: 'Module 7: Tracing & Monitoring with LangSmith', desc: 'Debugging complex chains, automated evaluators, and production observability' },
      ],
    }
  }

  if (course.category === 'Advanced') {
    return {
      prerequisites: [
        'Must complete Introduction to Generative AI first',
        'Prompt Engineering Fundamentals recommended',
        'Intermediate Python programming background',
      ],
      syllabus: [
        { title: 'Module 1: Advanced Architecture Deep Dive', desc: 'Examining model weights, layers, and modern transformer architectures' },
        { title: 'Module 2: Optimization & Execution Pipelines', desc: 'Hardware considerations, caching, and inference acceleration' },
        { title: 'Module 3: Complex Multi-step Workflows', desc: 'Structured workflows, reasoning trees, and state management' },
        { title: 'Module 4: Production Evaluation & Benchmarks', desc: 'Automated evaluation pipelines and domain-specific benchmarks' },
      ],
    }
  }

  // Default Applied track
  return {
    prerequisites: [
      'Must complete Introduction to Generative AI first',
      'Must complete Prompt Engineering & LangChain first',
      'Basic spreadsheet or tabular data familiarity',
    ],
    syllabus: [
      { title: 'Module 1: Automated Data Wrangling with Code Interpreters', desc: 'Handling messy tabular datasets, missing values, and type inference with LLMs' },
      { title: 'Module 2: Exploratory Data Analysis & Statistical Syntheses', desc: 'Prompting for automated distribution summaries and correlation discovery' },
      { title: 'Module 3: Natural Language to SQL & Warehouse Querying', desc: 'Schema-aware text-to-SQL generation and semantic query verification' },
      { title: 'Module 4: Automated Dashboards & Narrative Reports', desc: 'Generating interactive charts, executive takeaways, and automated briefing decks' },
    ],
  }
}

export function CourseCard({ course, isFeatured = false }: CourseCardProps) {
  const [showModal, setShowModal] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(!course.locked)

  useEffect(() => {
    setIsUnlocked(!course.locked || isCourseUnlocked(course.id))
  }, [course.id, course.locked])

  const isLocked = !isUnlocked

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

  const curriculum = getCourseCurriculum(course)

  // Handle escape key and body scroll lock
  useEffect(() => {
    if (!showModal) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowModal(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [showModal])

  const cardContent = (
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
            {isLocked ? (
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
              isLocked 
                ? 'bg-stone-100 text-stone-600 hover:bg-stone-200' 
                : 'bg-[#18181B] text-[#F7F4EF] group-hover:bg-stone-800'
            }`}>
              <span>{isLocked ? 'View Prerequisites' : 'Start Course'}</span>
              <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {isLocked ? (
        <div
          role="button"
          tabIndex={0}
          onClick={() => setShowModal(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setShowModal(true)
            }
          }}
          className="group block h-full text-left cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#18181B] rounded-md"
          aria-label={`View prerequisites for locked course: ${course.title}`}
        >
          {cardContent}
        </div>
      ) : (
        <Link 
          href={`/course/${course.id}`} 
          className="group block h-full focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#18181B] rounded-md"
        >
          {cardContent}
        </Link>
      )}

      {/* Prerequisites & Syllabus Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setShowModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`modal-title-${course.id}`}
        >
          <div
            className="relative w-full max-w-2xl bg-white border border-[#E4E0D7] rounded-xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Accent Strip */}
            <div className={`h-2 w-full ${theme.accentBar}`} />

            {/* Modal Header */}
            <div className={`p-6 ${theme.accentBg} border-b border-[#E4E0D7] relative`}>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="absolute top-5 right-5 p-1.5 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
                aria-label="Close modal"
              >
                <X className="size-5" />
              </button>

              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                <span className={`text-[10px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded-xs border ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}>
                  {course.category} Track
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded border border-amber-300">
                  <Lock className="size-3 text-amber-700" />
                  LOCKED — PREREQUISITES REQUIRED
                </span>
              </div>

              <h2 id={`modal-title-${course.id}`} className="text-xl sm:text-2xl font-bold text-[#18181B] tracking-tight">
                {course.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1.5 leading-relaxed">
                {course.description}
              </p>

              {/* Course Meta */}
              <div className="flex flex-wrap items-center gap-4 mt-4 pt-3 border-t border-[#E4E0D7]/60 text-xs font-mono text-stone-600">
                <span className="font-semibold text-stone-800">
                  Instructor: {course.instructor}
                </span>
                <span className="text-stone-300">•</span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5 text-stone-400" />
                  {course.duration}
                </span>
                <span className="text-stone-300">•</span>
                <span className="flex items-center gap-1">
                  <Layers className="size-3.5 text-stone-400" />
                  {course.modules} Modules
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Prerequisites Card */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-lg p-4 space-y-2.5">
                <div className="flex items-center gap-2 text-amber-900 font-semibold text-sm">
                  <AlertCircle className="size-4 text-amber-700 shrink-0" />
                  <span>Required Prerequisites Before Enrolling</span>
                </div>
                <ul className="space-y-2 pl-6 list-disc text-xs sm:text-[13px] text-amber-950 leading-relaxed">
                  {curriculum.prerequisites.map((prereq, idx) => (
                    <li key={idx} className="font-medium">
                      {prereq}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Syllabus Preview */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="size-4 text-stone-600" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 font-mono">
                    Syllabus Preview ({course.modules} Modules)
                  </h3>
                </div>
                <div className="space-y-2.5">
                  {curriculum.syllabus.map((item, idx) => (
                    <div key={idx} className="p-3 bg-stone-50 border border-stone-200/80 rounded-md">
                      <p className="text-xs font-bold text-stone-900">
                        {item.title}
                      </p>
                      <p className="text-[11.5px] text-stone-600 mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:px-6 bg-stone-50 border-t border-[#E4E0D7] flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-[11px] font-mono text-stone-500 text-center sm:text-left">
                Start with foundational coursework to unlock advanced modules.
              </p>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 sm:flex-none px-4 py-2 text-xs font-mono uppercase tracking-wider text-stone-600 hover:text-stone-900 border border-stone-300 rounded hover:bg-stone-100 transition-colors"
                >
                  Close
                </button>
                <Link
                  href="/course/intro-to-genai"
                  onClick={() => setShowModal(false)}
                  className="flex-1 sm:flex-none px-4 py-2 text-xs font-mono uppercase tracking-wider font-semibold text-[#F7F4EF] bg-[#18181B] hover:bg-stone-800 rounded inline-flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Start Prerequisite: Intro to GenAI</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

