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
}

export type Lesson = {
  id: string
  title: string
  duration: string
  completed: boolean
  locked: boolean
  type: 'video' | 'quiz' | 'reading'
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
    instructor: 'DS Virtual Lab',
    rating: 4.8,
    students: 12430,
    modules: 4,
    duration: '3h 20m',
    locked: false,
    thumbnail: '',
    category: 'Foundations',
  },
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering Fundamentals',
    description:
      'Master the art of crafting effective prompts for ChatGPT, Claude, and other leading language models.',
    instructor: 'DS Virtual Lab',
    rating: 4.7,
    students: 9812,
    modules: 5,
    duration: '4h 10m',
    locked: false,
    thumbnail: '',
    category: 'Foundations',
  },
  {
    id: 'building-ai-agents',
    title: 'Building AI Agents from Scratch',
    description:
      'Design and implement autonomous AI agents using tool-calling, memory, and multi-step reasoning loops.',
    instructor: 'DS Virtual Lab',
    rating: 4.9,
    students: 7205,
    modules: 6,
    duration: '5h 50m',
    locked: true,
    thumbnail: '',
    category: 'Advanced',
  },
  {
    id: 'fine-tuning-llms',
    title: 'Fine-Tuning Large Language Models',
    description:
      'Learn how to fine-tune pre-trained LLMs on custom datasets using LoRA, QLoRA, and PEFT techniques.',
    instructor: 'DS Virtual Lab',
    rating: 4.6,
    students: 5634,
    modules: 5,
    duration: '6h 30m',
    locked: true,
    thumbnail: '',
    category: 'Advanced',
  },
  {
    id: 'ai-for-data-analysis',
    title: 'AI for Data Analysis',
    description:
      'Use AI tools to automate exploratory data analysis, generate insights, and build data-driven reports.',
    instructor: 'DS Virtual Lab',
    rating: 4.8,
    students: 8901,
    modules: 4,
    duration: '3h 45m',
    locked: true,
    thumbnail: '',
    category: 'Applied',
  },
  {
    id: 'langchain-applications',
    title: 'LLM Applications with LangChain',
    description:
      'Build production-ready LLM-powered applications using LangChain, RAG pipelines, and vector databases.',
    instructor: 'DS Virtual Lab',
    rating: 4.7,
    students: 6118,
    modules: 7,
    duration: '7h 15m',
    locked: true,
    thumbnail: '',
    category: 'Applied',
  },
]

export const courseModules: Module[] = [
  {
    id: 'module-1',
    title: 'Getting Started',
    lessons: [
      {
        id: 'l1',
        title: 'Course Introduction',
        duration: '3 min',
        completed: true,
        locked: false,
        type: 'video',
      },
      {
        id: 'l2',
        title: 'What is Generative AI?',
        duration: '5 min',
        completed: false,
        locked: false,
        type: 'video',
      },
      {
        id: 'l3',
        title: 'How Large Language Models Work',
        duration: '7 min',
        completed: false,
        locked: true,
        type: 'video',
      },
    ],
  },
  {
    id: 'module-2',
    title: 'Core Concepts',
    lessons: [
      {
        id: 'l4',
        title: 'Transformer Architecture Explained',
        duration: '9 min',
        completed: false,
        locked: true,
        type: 'video',
      },
      {
        id: 'l5',
        title: 'Training Data and Model Bias',
        duration: '6 min',
        completed: false,
        locked: true,
        type: 'video',
      },
      {
        id: 'l6',
        title: 'Tokens, Embeddings, and Context Windows',
        duration: '8 min',
        completed: false,
        locked: true,
        type: 'reading',
      },
      {
        id: 'l7',
        title: 'Quiz: Core Concepts',
        duration: '10 min',
        completed: false,
        locked: true,
        type: 'quiz',
      },
    ],
  },
  {
    id: 'module-3',
    title: 'Real-World Applications',
    lessons: [
      {
        id: 'l8',
        title: 'Text Generation and Summarization',
        duration: '7 min',
        completed: false,
        locked: true,
        type: 'video',
      },
      {
        id: 'l9',
        title: 'Image and Multimodal AI',
        duration: '8 min',
        completed: false,
        locked: true,
        type: 'video',
      },
      {
        id: 'l10',
        title: 'AI in Healthcare, Finance, and Law',
        duration: '10 min',
        completed: false,
        locked: true,
        type: 'video',
      },
    ],
  },
  {
    id: 'module-4',
    title: 'Responsible AI',
    lessons: [
      {
        id: 'l11',
        title: 'Hallucinations and Model Limitations',
        duration: '6 min',
        completed: false,
        locked: true,
        type: 'video',
      },
      {
        id: 'l12',
        title: 'Ethical Considerations in AI',
        duration: '8 min',
        completed: false,
        locked: true,
        type: 'video',
      },
      {
        id: 'l13',
        title: 'Final Quiz: Generative AI Basics',
        duration: '15 min',
        completed: false,
        locked: true,
        type: 'quiz',
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
