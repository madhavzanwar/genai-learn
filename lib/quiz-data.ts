export type QuizQuestion = {
  id: number
  difficulty: 'easy' | 'hard'
  question: string
  options: string[]
  answer: number
}

export const PASS_SCORE = 7

const l1Questions: QuizQuestion[] = [
  {
    id: 1,
    difficulty: 'easy',
    question: 'Which statement best describes Artificial Intelligence (AI)?',
    options: [
      'Computers storing very large amounts of data',
      'Machines performing tasks that normally require human intelligence',
      'Programs designed only for mathematical calculations',
      'Machines operating without any algorithms',
    ],
    answer: 1,
  },
  {
    id: 2,
    difficulty: 'easy',
    question: 'Which ability is an important part of human intelligence illustrated by learning to walk after repeated attempts?',
    options: [
      'Storing files',
      'Learning from experience',
      'Translating languages',
      'Generating random outputs',
    ],
    answer: 1,
  },
  {
    id: 3,
    difficulty: 'easy',
    question: 'When a phone recognizes a person\'s face to unlock the device, which human ability is being approximated?',
    options: [
      'Understanding emotions',
      'Making physical decisions',
      'Recognizing faces',
      'Learning to walk',
    ],
    answer: 2,
  },
  {
    id: 4,
    difficulty: 'easy',
    question: 'Which of the following is an example of AI being used for recommendations?',
    options: [
      'A keyboard displaying letters',
      'YouTube suggesting videos',
      'A calculator performing addition',
      'A USB drive storing files',
    ],
    answer: 1,
  },
  {
    id: 5,
    difficulty: 'easy',
    question: 'According to the examples, what does Google Maps demonstrate in the context of AI?',
    options: [
      'Face recognition',
      'Language translation only',
      'Navigation and route selection',
      'Image generation',
    ],
    answer: 2,
  },
  {
    id: 6,
    difficulty: 'hard',
    question: 'Which combination represents the basic idea shown for making a machine appear intelligent?',
    options: [
      'Data, algorithms, and computational methods',
      'Only internet access and storage',
      'Only hardware and electricity',
      'Random numbers and manual instructions only',
    ],
    answer: 0,
  },
  {
    id: 7,
    difficulty: 'hard',
    question: 'Which capability is directly associated with AI learning from data?',
    options: [
      'Physically repairing hardware',
      'Replacing all human decisions',
      'Recognizing patterns',
      'Creating electrical power',
    ],
    answer: 2,
  },
  {
    id: 8,
    difficulty: 'hard',
    question: 'Which example best represents AI making predictions?',
    options: [
      'Opening a text document',
      'Typing a sentence manually',
      'Weather or traffic prediction',
      'Connecting a computer to a monitor',
    ],
    answer: 2,
  },
  {
    id: 9,
    difficulty: 'hard',
    question: 'What is the main difference emphasized between human intelligence and a machine performing an intelligent task?',
    options: [
      'Humans cannot learn from experience',
      'Humans depend only on algorithms',
      'Machines always have human-like understanding',
      'Machines use data, algorithms, and computational methods',
    ],
    answer: 3,
  },
  {
    id: 10,
    difficulty: 'easy',
    question: 'What question naturally leads from the introduction to the topic of Machine Learning?',
    options: [
      'How does a machine learn from data?',
      'How can humans stop using computers?',
      'How can a machine work without data?',
      'How can a computer store more files?',
    ],
    answer: 0,
  },
]

const l2Questions: QuizQuestion[] = [
  {
    id: 1,
    difficulty: 'easy',
    question: 'What is the primary purpose of a weight in a neural network?',
    options: [
      'To store the final output',
      'To determine the importance/strength of an input',
      'To remove non-linearity',
      'To count the number of neurons',
    ],
    answer: 1,
  },
  {
    id: 2,
    difficulty: 'easy',
    question: 'What does bias allow a neuron to do?',
    options: [
      'Remove the weights',
      'Increase the number of inputs',
      'Shift the output independently of the inputs',
      'Convert a hidden layer into an input layer',
    ],
    answer: 2,
  },
  {
    id: 3,
    difficulty: 'easy',
    question: 'Which of the following is the correct basic neuron equation?',
    options: [
      'y = wx - b',
      'y = w + x + b',
      'y = wx + b',
      'y = w/x + b',
    ],
    answer: 2,
  },
  {
    id: 4,
    difficulty: 'hard',
    question: 'A neuron receives x₁ = 2, x₂ = 3, with weights w₁ = 0.5, w₂ = 0.2. What is the weighted sum before adding bias?',
    options: [
      '1.6',
      '2.6',
      '1.2',
      '0.7',
    ],
    answer: 0,
  },
  {
    id: 5,
    difficulty: 'hard',
    question: 'Why are activation functions important in neural networks?',
    options: [
      'They increase the number of input features',
      'They introduce non-linearity',
      'They eliminate weights',
      'They always make the output equal to 1',
    ],
    answer: 1,
  },
  {
    id: 6,
    difficulty: 'easy',
    question: 'Which activation function has an output range of 0 to 1 and is commonly used for binary classification?',
    options: [
      'ReLU',
      'Tanh',
      'Sigmoid',
      'Leaky ReLU',
    ],
    answer: 2,
  },
  {
    id: 7,
    difficulty: 'easy',
    question: 'In a typical feed-forward neural network, which layer receives the original features/data?',
    options: [
      'Output layer',
      'Hidden layer',
      'Input layer',
      'Activation layer',
    ],
    answer: 2,
  },
  {
    id: 8,
    difficulty: 'hard',
    question: 'A neuron has: x₁ = 2, x₂ = -1, x₃ = 3; w₁ = 0.5, w₂ = 2, w₃ = -1; Bias b = 1. What is the value of z = Σxᵢwᵢ + b?',
    options: [
      '-2',
      '0',
      '2',
      '4',
    ],
    answer: 1,
  },
  {
    id: 9,
    difficulty: 'hard',
    question: 'Suppose a neuron calculates: z = x₁w₁ + x₂w₂ + b where x₁ = 2, x₂ = 1, w₁ = 1, w₂ = -2, b = 1. If ReLU is applied, what is the final output?',
    options: [
      '-1',
      '0',
      '1',
      '3',
    ],
    answer: 1,
  },
  {
    id: 10,
    difficulty: 'hard',
    question: 'Consider a neuron with: x₁ = 1, x₂ = 2; w₁ = 2, w₂ = 1, b = -2. The neuron uses Sigmoid activation: σ(z) = 1 / (1 + e⁻ᶻ). What is the approximate output?',
    options: [
      '0.12',
      '0.50',
      '0.73',
      '0.88',
    ],
    answer: 1,
  },
]

const l3Questions: QuizQuestion[] = [
  {
    id: 1,
    difficulty: 'easy',
    question: 'What is a traditional RNN mainly used for, based on the video?',
    options: [
      'To process a sequence of words one step at a time, in order',
      'To translate sentences into another language instantly',
      'To predict images from text',
      'To store an entire sentence as one number and ignore word order',
    ],
    answer: 0,
  },
  {
    id: 2,
    difficulty: 'easy',
    question: 'In which direction does a traditional (unidirectional) RNN process a sequence?',
    options: [
      'Right to left',
      'Left to right',
      'Both directions at the same time',
      'All words at once, with no particular order',
    ],
    answer: 1,
  },
  {
    id: 3,
    difficulty: 'hard',
    question: 'In "The movie was not good because it was too long," when the RNN reaches the word "good," which words does its hidden state mainly reflect?',
    options: [
      'because it was too long',
      'The movie was not',
      'The entire sentence equally',
      'No words at all',
    ],
    answer: 1,
  },
  {
    id: 4,
    difficulty: 'hard',
    question: 'What is the main limitation of a unidirectional RNN, as shown in the video?',
    options: [
      'It cannot process short sentences',
      'It has limited access to future context (words that come later)',
      'It cannot remember any past words at all',
      'It only works with numbers, not words',
    ],
    answer: 1,
  },
  {
    id: 5,
    difficulty: 'hard',
    question: 'In "The bank was crowded because people were depositing money," why is the word "bank" tricky for a unidirectional RNN?',
    options: [
      ' "Bank" could mean a financial institution or a riverbank, and the RNN can\'t yet see the clarifying words',
      ' "Bank" is not a real word',
      'The sentence is too long for an RNN to handle',
      ' "Bank" is always misspelled by RNNs',
    ],
    answer: 0,
  },
  {
    id: 6,
    difficulty: 'easy',
    question: 'What information helps correctly understand that "bank" means a financial institution in that sentence?',
    options: [
      'The words that come after "bank," like "depositing money"',
      'Only the word "The" before it',
      'The total number of words in the sentence',
      'How many times "bank" appears',
    ],
    answer: 0,
  },
  {
    id: 7,
    difficulty: 'easy',
    question: 'What is the key difference between a unidirectional RNN and a Bidirectional RNN?',
    options: [
      'A Bidirectional RNN uses only past information, just like a unidirectional RNN',
      'A Bidirectional RNN uses both past and future information, while a unidirectional RNN uses only past information',
      'A unidirectional RNN is always more accurate',
      'A Bidirectional RNN doesn\'t use hidden states',
    ],
    answer: 1,
  },
  {
    id: 8,
    difficulty: 'easy',
    question: 'You need to fill in a blank like "The ___ was crowded because people were depositing money," where the answer depends on words that come after the blank. Which type of RNN would work better?',
    options: [
      'Unidirectional RNN, because it\'s simpler',
      'Bidirectional RNN, because it can use both past and future words',
      'Neither type can handle this',
      'It doesn\'t matter which one is used',
    ],
    answer: 1,
  },
  {
    id: 9,
    difficulty: 'hard',
    question: 'True or False: The "Backward RNN" (which reads a sequence from right to left) is the same thing as "backpropagation" (the process used to train the model).',
    options: [
      'True',
      'False',
      'Both are the same training process',
      'Neither exists in neural networks',
    ],
    answer: 1,
  },
  {
    id: 10,
    difficulty: 'hard',
    question: 'Based on the video, what is the relationship between LSTM and Bidirectional RNN?',
    options: [
      'LSTM helps remember information over long sequences, while Bi-RNN adds the ability to use both past and future context',
      'LSTM and Bi-RNN do exactly the same thing',
      'Bi-RNN removes the need for hidden states',
      'LSTM only works backward, and Bi-RNN only works forward',
    ],
    answer: 0,
  },
]

export const quizzesByLesson: Record<
  string,
  { title: string; questions: QuizQuestion[] }
> = {
  l1: { title: 'What is Artificial Intelligence (AI)?', questions: l1Questions },
  l2: { title: 'Artificial Neural Networks', questions: l2Questions },
  l3: { title: 'Bidirectional RNNs', questions: l3Questions },
}

export function getQuizForLesson(lessonId: string) {
  return quizzesByLesson[lessonId] ?? quizzesByLesson.l1
}

/** @deprecated use getQuizForLesson — kept so older imports still type-check */
export const quizQuestions = l1Questions
export const TOTAL_QUESTIONS = 10
