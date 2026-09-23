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
    modules: 2,
    duration: '1h 24m',
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

export const LESSON_SEQUENCE = ['l1', 'l2', 'l3', 'l4', 'l5', 'l6']

export function getNextLessonId(lessonId: string): string | null {
  const index = LESSON_SEQUENCE.indexOf(lessonId)
  if (index === -1 || index === LESSON_SEQUENCE.length - 1) return null
  return LESSON_SEQUENCE[index + 1]
}

export const courseModules: Module[] = [
  {
    id: 'module-1',
    title: 'Getting Started',
    lessons: [
      {
        id: 'l1',
        title: 'What is Artificial Intelligence (AI)?',
        duration: '14 min',
        completed: false,
        locked: false,
        type: 'video',
        videoId: 'E1-SHflLFVs',
        description:
          'Discover how Artificial Intelligence (AI) works and how it powers everyday tools like Google Maps, voice assistants, and recommendation engines. This introductory lesson breaks down key concepts into simple, easy-to-understand topics.\n\nKey Highlights:\n• Real-World Examples: See how AI operates behind the scenes in daily life.\n• Core Concepts: Learn what defines intelligence and how machines learn from data.\n• AI vs. Traditional Tech: Understand the difference between fixed programming, simple automation, and AI.\n• The Future of AI: Explore key industries being transformed and future career opportunities.',
      },
      {
        id: 'l2',
        title: 'Register Addressing Modes',
        duration: '12 min',
        completed: false,
        locked: true,
        type: 'video',
        videoId: 'nPPwS3bwzzk',
        description:
          'Learn how CPUs access data using register addressing modes. This lesson explains registers, operand access, and why register-based addressing is faster than memory addressing.\n\nKey Highlights:\n• What registers are and why they sit close to the CPU\n• Register addressing vs immediate, direct, and indirect modes\n• How instructions name source and destination registers\n• Why compilers prefer registers for speed',
      },
      {
        id: 'l3',
        title: 'Generative AI and Large Language Models',
        duration: '15 min',
        completed: false,
        locked: true,
        type: 'video',
        videoId: 'Y-SliKQtaXM',
        description:
          'Understand generative AI and how large language models (LLMs) produce text. This lesson covers training on large datasets, next-token prediction, and everyday LLM applications.\n\nKey Highlights:\n• What makes AI “generative” vs discriminative\n• How LLMs learn patterns in language\n• Tokens, prompts, and model outputs\n• Real uses: chatbots, writing help, and coding assistants',
      },
    ],
  },
  {
    id: 'module-2',
    title: 'Neural Networks & Sequence Models',
    lessons: [
      {
        id: 'l4',
        title: 'Encoders, Decoders, and Vectors',
        duration: '14 min',
        completed: false,
        locked: true,
        type: 'video',
        videoId: 'IpXkJF5fXP4',
        description:
          'See how encoder–decoder models turn input into vectors and generate output. This lesson introduces embeddings and why vectors are the language of modern neural networks.\n\nKey Highlights:\n• Encoder: compress input into a representation\n• Decoder: generate output from that representation\n• Vectors and embeddings as numeric meaning\n• Where this shows up in translation and transformers',
      },
      {
        id: 'l5',
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
        id: 'l6',
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

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question:
      'Which of the following best describes a Large Language Model (LLM)?',
    options: [
      'A rule-based expert system that uses a fixed knowledge base',
      'A neural network trained on large text corpora to predict and generate language',
      'A search engine that retrieves documents from the internet',
      'A symbolic AI system that reasons using formal logic',
    ],
    correct: 1,
  },
  {
    id: 2,
    question: 'What does the term "hallucination" mean in the context of LLMs?',
    options: [
      'When the model runs out of memory during inference',
      'When the model generates factually incorrect or fabricated information confidently',
      'When the model refuses to answer a question',
      'When the model takes too long to generate a response',
    ],
    correct: 1,
  },
  {
    id: 3,
    question:
      'What is the primary role of attention mechanisms in transformer models?',
    options: [
      'To compress the input text into a smaller representation',
      'To randomly sample tokens during generation',
      'To allow the model to weigh the relevance of different parts of the input when generating output',
      'To store long-term memories between conversations',
    ],
    correct: 2,
  },
  {
    id: 4,
    question: 'Which of these is an example of a generative AI task?',
    options: [
      'Classifying an image as a cat or a dog',
      'Predicting whether an email is spam or not',
      'Writing a short story based on a given prompt',
      'Sorting a list of names alphabetically',
    ],
    correct: 2,
  },
  {
    id: 5,
    question:
      'What does "context window" refer to in a large language model?',
    options: [
      'The graphical interface of the AI application',
      'The maximum number of tokens the model can process in a single input/output interaction',
      'The time limit for a model to generate a response',
      'The number of training examples used per batch',
    ],
    correct: 1,
  },
]
