export type Course = {
  id: string
  title: string
  description: string
  instructor: string
  rating: number
  students: number
  modules: number
  duration: string
  locked: boolean
  thumbnail: string
  category: string
  externalUrl?: string
  isExternal?: boolean
}

export type Lesson = {
  id: string
  title: string
  duration: string
  completed: boolean
  locked: boolean
  type: 'video' | 'quiz' | 'reading'
  videoId?: string
  description?: string
}

export type Module = {
  id: string
  title: string
  lessons: Lesson[]
}

export type QuizQuestion = {
  id: number
  question: string
  options: string[]
  correct: number
}

export const courses: Course[] = [
  {
    id: 'intro-to-genai',
    title: 'Introduction to Generative AI',
    description:
      'Learn the fundamentals of generative AI, how large language models work, and their real-world applications.',
    instructor: 'Eklavya',
    rating: 4.8,
    students: 12430,
    modules: 1,
    duration: '43 min',
    locked: false,
    thumbnail: '',
    category: 'Foundations',
  },
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering Fundamentals',
    description:
      'Master the art of crafting effective prompts for ChatGPT, Claude, and other leading language models.',
    instructor: 'Eklavya',
    rating: 4.7,
    students: 9812,
    modules: 5,
    duration: '4h 10m',
    locked: true,
    thumbnail: '',
    category: 'Foundations',
  },
  {
    id: 'data-science',
    title: 'Data Science',
    description:
      'An introductory overview to Data Science, Python, and Machine Learning essentials.',
    instructor: 'Eklavya',
    rating: 4.9,
    students: 11450,
    modules: 4,
    duration: '3h 30m',
    locked: false,
    thumbnail: '',
    category: 'Data Science',
    externalUrl: 'https://your-datascience-platform.com',
    isExternal: true,
  },
]

export const LESSON_SEQUENCE = ['l1', 'l2', 'l3']

export function getNextLessonId(lessonId: string): string | null {
  const index = LESSON_SEQUENCE.indexOf(lessonId)
  if (index === -1 || index === LESSON_SEQUENCE.length - 1) return null
  return LESSON_SEQUENCE[index + 1]
}

export const courseModules: Module[] = [
  {
    id: 'module-1',
    title: 'AI Foundations',
    lessons: [
      {
        id: 'l1',
        title: 'What is Artificial Intelligence (AI)?',
        duration: '14 min',
        completed: false,
        locked: false,
        type: 'video',
        videoId: 'SzIA32khVQ8',
        description:
          'Discover how Artificial Intelligence (AI) works and how it powers everyday tools like Google Maps, voice assistants, and recommendation engines. This introductory lesson breaks down key concepts into simple, easy-to-understand topics.\n\nKey Highlights:\n• Real-World Examples: See how AI operates behind the scenes in daily life.\n• Core Concepts: Learn what defines intelligence and how machines learn from data.\n• AI vs. Traditional Tech: Understand the difference between fixed programming, simple automation, and AI.\n• The Future of AI: Explore key industries being transformed and future career opportunities.',
      },
      {
        id: 'l2',
        title: 'Artificial Neural Networks',
        duration: '16 min',
        completed: false,
        locked: true,
        type: 'video',
        videoId: 'VwfVzLH3Ob4',
        description:
          'Build intuition for artificial neural networks: neurons, layers, weights, and learning from examples. This lesson connects the brain-inspired idea to how models actually train.\n\nKey Highlights:\n• Neurons, weights, and activation functions\n• Input, hidden, and output layers\n• Forward pass and learning from error\n• Why depth helps models learn complex patterns',
      },
      {
        id: 'l3',
        title: 'Bidirectional RNNs',
        duration: '13 min',
        completed: false,
        locked: true,
        type: 'video',
        videoId: '8sG-19i-usE',
        description:
          'Learn how bidirectional RNNs read a sequence both forward and backward so each step can use past and future context. This lesson is useful for language and time-series tasks.\n\nKey Highlights:\n• Why a one-way RNN only sees the past\n• Forward and backward hidden states\n• Combining both directions for richer context\n• Typical uses: tagging, speech, and sequence labeling',
      },
    ],
  },
]

// kept for legacy imports
export const quizQuestions: QuizQuestion[] = []
