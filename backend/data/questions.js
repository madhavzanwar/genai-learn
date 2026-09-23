const l1Questions = [
  {
    id: 1,
    difficulty: "hard",
    question: "What is the primary difference between traditional programming and machine learning?",
    options: [
      "Traditional programming uses neural networks",
      "Machine learning requires no data",
      "Traditional programming relies on explicit rules, while machine learning learns patterns from examples",
      "Machine learning cannot improve over time"
    ],
    answer: 2
  },
  {
    id: 2,
    difficulty: "hard",
    question: "Why does AI not truly understand language like humans do?",
    options: [
      "Because it lacks internet access",
      "Because it only predicts patterns and probabilities rather than possessing meaning or consciousness",
      "Because AI cannot process text quickly",
      "Because neural networks are too small"
    ],
    answer: 1
  },
  {
    id: 3,
    difficulty: "hard",
    question: "What major factor helped transform AI into a practical technology in recent decades?",
    options: [
      "Reduction in computer memory",
      "Decrease in internet usage",
      "Increase in handwritten programming rules",
      "Availability of massive data and stronger computing power"
    ],
    answer: 3
  },
  {
    id: 4,
    difficulty: "hard",
    question: "Neural networks are loosely inspired by:",
    options: [
      "Electrical circuits in smartphones",
      "The structure of the human brain",
      "Internet routing systems",
      "Satellite communication systems"
    ],
    answer: 1
  },
  {
    id: 5,
    difficulty: "hard",
    question: "In machine learning, why are thousands of labeled examples often required?",
    options: [
      "To physically upgrade the computer",
      "To help the system identify statistical patterns accurately",
      "To reduce electricity consumption",
      "To eliminate algorithms completely"
    ],
    answer: 1
  },
  {
    id: 6,
    difficulty: "easy",
    question: "What is artificial intelligence mainly designed to do?",
    options: [
      "Cook food",
      "Perform tasks that normally require human intelligence",
      "Build houses automatically",
      "Replace electricity"
    ],
    answer: 1
  },
  {
    id: 7,
    difficulty: "easy",
    question: "Which of the following is an example of AI in daily life?",
    options: [
      "Face unlock on phones",
      "Paper notebooks",
      "Manual clocks",
      "Printed newspapers"
    ],
    answer: 0
  },
  {
    id: 8,
    difficulty: "easy",
    question: "AI systems learn patterns mainly from:",
    options: [
      "Water",
      "Paint",
      "Data and examples",
      "Magnets"
    ],
    answer: 2
  },
  {
    id: 9,
    difficulty: "easy",
    question: "Does AI have emotions and self-awareness?",
    options: [
      "Yes",
      "Only sometimes",
      "No",
      "Only on the internet"
    ],
    answer: 2
  },
  {
    id: 10,
    difficulty: "easy",
    question: "What is the main message at the end of the intro video?",
    options: [
      "AI is disappearing",
      "AI is still in its early stages of growth",
      "Machines fully understand humans",
      "Technology will stop evolving"
    ],
    answer: 1
  }
];

const l2Questions = [
  {
    id: 1,
    difficulty: "easy",
    question: "What is a CPU register?",
    options: [
      "A large hard disk inside the computer",
      "A small, fast storage location inside the processor",
      "A type of computer monitor",
      "A wireless network adapter"
    ],
    answer: 1
  },
  {
    id: 2,
    difficulty: "easy",
    question: "In register addressing mode, the operand is stored in:",
    options: [
      "Main memory only",
      "A CPU register",
      "A USB drive",
      "The graphics card"
    ],
    answer: 1
  },
  {
    id: 3,
    difficulty: "easy",
    question: "Why is register addressing usually faster than memory addressing?",
    options: [
      "Registers are closer to the CPU and quicker to access",
      "Registers are larger than RAM",
      "Memory is never used by programs",
      "Registers use the internet"
    ],
    answer: 0
  },
  {
    id: 4,
    difficulty: "easy",
    question: "Which of these is an example of a typical CPU register name?",
    options: [
      "HTTP",
      "AX / R1",
      "PDF",
      "HTML"
    ],
    answer: 1
  },
  {
    id: 5,
    difficulty: "hard",
    question: "In register addressing, the instruction typically specifies:",
    options: [
      "The full RAM address of every byte",
      "Which register holds the operand",
      "The color of the screen",
      "The internet IP of the computer"
    ],
    answer: 1
  },
  {
    id: 6,
    difficulty: "hard",
    question: "Immediate addressing is different from register addressing because the operand is:",
    options: [
      "Stored in a register",
      "Part of the instruction itself",
      "Always on disk",
      "Fetched from another computer"
    ],
    answer: 1
  },
  {
    id: 7,
    difficulty: "hard",
    question: "Register indirect addressing means the register contains:",
    options: [
      "The final result only",
      "The memory address of the operand",
      "The name of the programmer",
      "A password"
    ],
    answer: 1
  },
  {
    id: 8,
    difficulty: "easy",
    question: "CPUs have only a small number of registers mainly because:",
    options: [
      "Registers are expensive, fast hardware",
      "Computers cannot count past ten",
      "Registers cannot store numbers",
      "Operating systems forbid extra registers"
    ],
    answer: 0
  },
  {
    id: 9,
    difficulty: "hard",
    question: "Compilers try to keep frequently used variables in registers to:",
    options: [
      "Slow the program down",
      "Reduce slow memory accesses and speed up execution",
      "Increase file size on disk",
      "Change the programming language"
    ],
    answer: 1
  },
  {
    id: 10,
    difficulty: "easy",
    question: "Which statement about addressing modes is true?",
    options: [
      "They describe how an instruction finds its data",
      "They describe the color theme of an IDE",
      "They are only used in web browsers",
      "They replace the need for a CPU"
    ],
    answer: 0
  }
];

const l3Questions = [
  {
    id: 1,
    difficulty: "easy",
    question: "Generative AI is mainly used to:",
    options: [
      "Create new content such as text, images, or code",
      "Only sort files alphabetically",
      "Replace computer power supplies",
      "Print paper newspapers"
    ],
    answer: 0
  },
  {
    id: 2,
    difficulty: "easy",
    question: "What does LLM stand for?",
    options: [
      "Local Laptop Memory",
      "Large Language Model",
      "Linear Logic Machine",
      "Low Latency Modem"
    ],
    answer: 1
  },
  {
    id: 3,
    difficulty: "easy",
    question: "LLMs typically generate text by:",
    options: [
      "Predicting the next token given previous tokens",
      "Opening a random book",
      "Calling a human writer each time",
      "Sorting words by length only"
    ],
    answer: 0
  },
  {
    id: 4,
    difficulty: "hard",
    question: "A token in an LLM is best described as:",
    options: [
      "A piece of text the model reads or writes, such as a word or subword",
      "A physical coin",
      "A Wi-Fi password",
      "A type of computer fan"
    ],
    answer: 0
  },
  {
    id: 5,
    difficulty: "hard",
    question: "LLMs learn language patterns mainly from:",
    options: [
      "A few handwritten rules",
      "Large amounts of text data during training",
      "Only one dictionary page",
      "Random numbers with no data"
    ],
    answer: 1
  },
  {
    id: 6,
    difficulty: "easy",
    question: "Which is a common real-world use of an LLM?",
    options: [
      "Chatbots and writing assistants",
      "Watering plants automatically",
      "Charging a phone battery faster",
      "Cooling a room"
    ],
    answer: 0
  },
  {
    id: 7,
    difficulty: "hard",
    question: "A prompt is:",
    options: [
      "The input text you give the model to guide its answer",
      "The model’s hardware serial number",
      "A type of graphics card",
      "The cooling fan speed"
    ],
    answer: 0
  },
  {
    id: 8,
    difficulty: "easy",
    question: "Generative AI differs from simple classification because it can:",
    options: [
      "Produce new outputs, not only labels like spam/not spam",
      "Only store files",
      "Never use data",
      "Only add two numbers"
    ],
    answer: 0
  },
  {
    id: 9,
    difficulty: "hard",
    question: "An LLM can sound confident even when it is wrong. This is related to:",
    options: [
      "Hallucination — generating plausible but incorrect text",
      "The computer overheating",
      "A broken keyboard",
      "Lost Wi-Fi only"
    ],
    answer: 0
  },
  {
    id: 10,
    difficulty: "easy",
    question: "ChatGPT, Claude, and similar tools are examples of:",
    options: [
      "Spreadsheet software only",
      "Applications built on large language models",
      "Printer drivers",
      "Operating systems from the 1980s"
    ],
    answer: 1
  }
];

const l4Questions = [
  {
    id: 1,
    difficulty: "easy",
    question: "In an encoder–decoder model, the encoder’s job is to:",
    options: [
      "Print the output on paper",
      "Turn the input into an internal representation (often a vector)",
      "Delete the input",
      "Charge the battery"
    ],
    answer: 1
  },
  {
    id: 2,
    difficulty: "easy",
    question: "The decoder’s job is to:",
    options: [
      "Only store passwords",
      "Compress ZIP files on disk",
      "Generate the output sequence from the encoded representation",
      "Draw the computer case"
    ],
    answer: 2
  },
  {
    id: 3,
    difficulty: "easy",
    question: "A vector in this context is:",
    options: [
      "A traffic arrow on the road",
      "A list of numbers that can represent meaning or features",
      "A type of USB cable",
      "A printer setting"
    ],
    answer: 1
  },
  {
    id: 4,
    difficulty: "hard",
    question: "An embedding maps words or tokens to:",
    options: [
      "Random emojis",
      "Folder names on Windows",
      "Email addresses",
      "Vectors in a numeric space so similar items are closer"
    ],
    answer: 3
  },
  {
    id: 5,
    difficulty: "hard",
    question: "Encoder–decoder models are commonly used for:",
    options: [
      "Machine translation (one language to another)",
      "Changing screen brightness only",
      "Formatting hard drives",
      "Naming Wi-Fi networks"
    ],
    answer: 0
  },
  {
    id: 6,
    difficulty: "easy",
    question: "If two word vectors are close together, those words often:",
    options: [
      "Must be spelled identically",
      "Have related meaning or usage",
      "Cannot appear in English",
      "Are always numbers"
    ],
    answer: 1
  },
  {
    id: 7,
    difficulty: "hard",
    question: "A bottleneck or context vector is useful because it:",
    options: [
      "Increases RAM price",
      "Turns off the GPU",
      "Summarizes the input so the decoder can generate output",
      "Removes all meaning from text"
    ],
    answer: 2
  },
  {
    id: 8,
    difficulty: "easy",
    question: "Transformers still use the encoder–decoder idea in models such as:",
    options: [
      "Translation and sequence-to-sequence systems",
      "Only analog radios",
      "CRT monitors",
      "Floppy disks"
    ],
    answer: 0
  },
  {
    id: 9,
    difficulty: "hard",
    question: "Without vectors/embeddings, neural nets would struggle to:",
    options: [
      "Turn the computer on",
      "Connect to Bluetooth mice",
      "Display a desktop wallpaper",
      "Represent words and sentences as numbers they can compute on"
    ],
    answer: 3
  },
  {
    id: 10,
    difficulty: "easy",
    question: "Which pair matches the encoder–decoder flow?",
    options: [
      "Decoder first, then delete the encoder",
      "Input → encoder → vector → decoder → output",
      "Output → encoder → input only",
      "Vector → printer → keyboard"
    ],
    answer: 1
  }
];

const l5Questions = [
  {
    id: 1,
    difficulty: "easy",
    question: "An artificial neural network is loosely inspired by:",
    options: [
      "Kitchen plumbing",
      "The brain’s network of neurons",
      "Traffic lights only",
      "Paper filing cabinets"
    ],
    answer: 1
  },
  {
    id: 2,
    difficulty: "easy",
    question: "A neuron in an ANN typically:",
    options: [
      "Stores videos on YouTube",
      "Cools the CPU fan",
      "Takes inputs, applies weights, then an activation function",
      "Draws the taskbar"
    ],
    answer: 2
  },
  {
    id: 3,
    difficulty: "easy",
    question: "Layers in a neural network are groups of:",
    options: [
      "Neurons stacked so data flows from input toward output",
      "Random files on disk",
      "Browser tabs",
      "Keyboard keys"
    ],
    answer: 0
  },
  {
    id: 4,
    difficulty: "hard",
    question: "Weights in a network are:",
    options: [
      "The physical weight of the laptop",
      "Numbers that scale each input and are learned during training",
      "Font sizes in Word",
      "Wi-Fi signal bars"
    ],
    answer: 1
  },
  {
    id: 5,
    difficulty: "hard",
    question: "An activation function is used to:",
    options: [
      "Charge the battery",
      "Compress PNG images",
      "Name the computer",
      "Add non-linearity so the network can learn complex patterns"
    ],
    answer: 3
  },
  {
    id: 6,
    difficulty: "easy",
    question: "The input layer of an ANN:",
    options: [
      "Receives the raw features (numbers describing the example)",
      "Always prints a PDF",
      "Is only used for audio volume",
      "Stores passwords in a browser"
    ],
    answer: 0
  },
  {
    id: 7,
    difficulty: "hard",
    question: "Training usually adjusts weights to:",
    options: [
      "Increase the clock speed of RAM",
      "Reduce the error between predictions and true labels",
      "Change the OS wallpaper",
      "Disable the keyboard"
    ],
    answer: 1
  },
  {
    id: 8,
    difficulty: "easy",
    question: "A hidden layer sits:",
    options: [
      "On the motherboard battery",
      "Inside the power cable",
      "Between the input layer and the output layer",
      "Only in the recycle bin"
    ],
    answer: 2
  },
  {
    id: 9,
    difficulty: "hard",
    question: "A forward pass means:",
    options: [
      "The user walks forward in a room",
      "The disk is formatted",
      "The mouse is unplugged",
      "Data flows through the network to produce a prediction"
    ],
    answer: 3
  },
  {
    id: 10,
    difficulty: "easy",
    question: "Deeper networks (more layers) can often:",
    options: [
      "Learn more complex features from data",
      "Replace the need for electricity",
      "Stop needing any training data",
      "Run without a processor"
    ],
    answer: 0
  }
];

const l6Questions = [
  {
    id: 1,
    difficulty: "easy",
    question: "RNN stands for:",
    options: [
      "Random Number Node",
      "Recurrent Neural Network",
      "Rapid Network Name",
      "Remote Nested Notebook"
    ],
    answer: 1
  },
  {
    id: 2,
    difficulty: "easy",
    question: "A standard (one-way) RNN reads a sequence:",
    options: [
      "From past to future, one step at a time",
      "All pixels of an image at once only",
      "Only file names on C:\\",
      "Random letters from the alphabet"
    ],
    answer: 0
  },
  {
    id: 3,
    difficulty: "easy",
    question: "A bidirectional RNN processes the sequence:",
    options: [
      "Only on weekends",
      "Without any hidden state",
      "Forward and backward, then combines both views",
      "Using only a calculator app"
    ],
    answer: 2
  },
  {
    id: 4,
    difficulty: "hard",
    question: "The benefit of the backward pass in a Bi-RNN is that each position can use:",
    options: [
      "Only the first character of the input",
      "Future context as well as past context",
      "The computer’s serial number",
      "A random Wikipedia page"
    ],
    answer: 1
  },
  {
    id: 5,
    difficulty: "hard",
    question: "Bidirectional RNNs are especially useful for tasks like:",
    options: [
      "Changing desktop icons",
      "Defragmenting a disk",
      "Updating a printer driver",
      "Part-of-speech tagging, where later words help label earlier ones"
    ],
    answer: 3
  },
  {
    id: 6,
    difficulty: "easy",
    question: "Hidden state in an RNN stores:",
    options: [
      "The user’s email password",
      "A summary of what the network has seen so far in the sequence",
      "The GPU brand name",
      "The color of the case"
    ],
    answer: 1
  },
  {
    id: 7,
    difficulty: "hard",
    question: "In a Bi-RNN, the two directions typically:",
    options: [
      "Share one identical state with no combination",
      "Never look at the input",
      "Have separate hidden states that are concatenated or combined",
      "Only run on paper"
    ],
    answer: 2
  },
  {
    id: 8,
    difficulty: "easy",
    question: "Unlike a feedforward net on a single vector, an RNN is designed for:",
    options: [
      "Sequential data such as text or time series",
      "Only static spreadsheets with one cell",
      "Turning off Wi-Fi",
      "Drawing rectangles"
    ],
    answer: 0
  },
  {
    id: 9,
    difficulty: "hard",
    question: "A limitation of using a Bi-RNN at generation time (word by word) is that:",
    options: [
      "Computers cannot store numbers",
      "The future tokens are not yet available, so bidirectional context may not apply the same way",
      "Text cannot be represented as tokens",
      "RNNs cannot use electricity"
    ],
    answer: 1
  },
  {
    id: 10,
    difficulty: "easy",
    question: "Which statement is true?",
    options: [
      "A Bi-RNN only works on images of cats",
      "RNNs replaced all CPUs",
      "Bidirectional means the model uses two keyboards",
      "A Bi-RNN can see both left and right context for labeling a word in a sentence"
    ],
    answer: 3
  }
];

const quizzesByLesson = {
  l1: { title: "What is Artificial Intelligence (AI)?", questions: l1Questions },
  l2: { title: "Register Addressing Modes", questions: l2Questions },
  l3: { title: "Generative AI and Large Language Models", questions: l3Questions },
  l4: { title: "Encoders, Decoders, and Vectors", questions: l4Questions },
  l5: { title: "Artificial Neural Networks", questions: l5Questions },
  l6: { title: "Bidirectional RNNs", questions: l6Questions }
};

function getQuizForLesson(lessonId) {
  return quizzesByLesson[lessonId] || quizzesByLesson.l1;
}

const PASS_SCORE = 7;
const quizQuestions = l1Questions;

module.exports = {
  quizQuestions,
  quizzesByLesson,
  getQuizForLesson,
  PASS_SCORE
};
