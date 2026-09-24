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
    externalUrl: 'https://data-science-lab-nine.vercel.app',
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
          'The presentation explains what intelligence means and how humans use experience and knowledge to solve problems and make decisions. It then introduces Artificial Intelligence as the field of creating machines capable of performing tasks that require intelligence.\n\nIt highlights common AI applications such as navigation, recommendations, face recognition, speech understanding, and prediction, before connecting AI with the idea of machines learning from data through Machine Learning.',
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
          'This presentation explains the basic concepts of Artificial Neural Networks (ANNs) and how individual neurons process information. It covers important components such as inputs, weights, bias, weighted sum, and activation functions, along with their roles in determining a neuron’s output.\n\nIt also explains the structure of a neural network, including input, hidden, and output layers, and how neurons are connected through weighted connections. Common activation functions such as Sigmoid, Tanh, ReLU, and Leaky ReLU are introduced, highlighting how they add non-linearity and help neural networks learn complex patterns.',
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
          'Traditional RNNs read text left to right, so they miss future context — which is a problem for sentences like "The bank was crowded because people were depositing money," where later words are needed to know what "bank" means.\n\nA Bidirectional RNN fixes this by running two RNNs at once — a Forward RNN that processes past context and a Backward RNN that processes future context — then combining both for better understanding. The presentation also clarifies that a Backward RNN is different from backpropagation and briefly connects RNNs, LSTMs, and Bidirectional RNNs.',
      },
    ],
  },
]

// kept for legacy imports
export const quizQuestions: QuizQuestion[] = []
