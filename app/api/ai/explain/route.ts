import { NextResponse } from 'next/server'

const CURATED_EXPLANATIONS: Record<string, string> = {
  programming:
    'Traditional programming relies on explicit, human-written rules: if-then logic where developers manually code every scenario. AI and machine learning, by contrast, learn statistical patterns directly from large datasets. Think of traditional code like a rigid recipe book, while AI is like a chef who tastes thousands of dishes and discovers how ingredients complement each other.',
  register:
    'CPU registers are microscopic memory cells built directly inside the processor core itself, operating at the CPU clock speed (fractions of a nanosecond). Accessing main RAM requires crossing the motherboard bus, which takes dozens of cycles. Think of registers like items already in your hands, cache like items on your desk, and RAM like a storage cabinet down the hall.',
  token:
    'A token is a fragment of a word (roughly 4 characters in English) that language models convert into numerical IDs. During next-token prediction, the model assigns probabilities to all possible tokens in its vocabulary to pick the most coherent continuation. It works like an ultra-sophisticated autocomplete that considers the entire preceding context window.',
  vector:
    'An embedding vector is a coordinate list (e.g. 1,536 numbers) placing text into high-dimensional semantic space. Words with similar meanings or shared contexts (like "king" and "queen", or "Paris" and "France") cluster tightly together. Vectors allow neural networks to perform mathematical operations on human meaning.',
  neural:
    'Artificial neural networks are layered mathematical models inspired by biological neurons. Inputs flow through layers where "weights" scale the importance of signals (like volume knobs), and non-linear "activation functions" (like ReLU) determine if the neuron activates. Deep networks learn hierarchical representations, from simple edges to abstract thoughts.',
  rnn:
    'Standard RNNs read text strictly left-to-right, meaning they cannot see words that come later in a sentence. Bidirectional RNNs process the sequence simultaneously forward and backward, allowing the model to disambiguate words whose true meaning depends on context appearing at the end of the sentence.',
  hallucination:
    'Hallucinations occur because LLMs are probabilistic text predictors, not factual databases. The model generates words that sound stylistically convincing and contextually plausible, even if the underlying statement is factually incorrect. Techniques like Retrieval-Augmented Generation (RAG) help anchor models in verified knowledge.',
}

function findCuratedExplanation(query: string): string | null {
  const lower = query.toLowerCase()
  for (const [keyword, explanation] of Object.entries(CURATED_EXPLANATIONS)) {
    if (lower.includes(keyword)) {
      return explanation
    }
  }
  return null
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const concept = body?.concept?.trim()

    if (!concept) {
      return NextResponse.json(
        { message: 'Concept query is required.' },
        { status: 400 }
      )
    }

    const apiKey = process.env.GEMINI_API_KEY
    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash'

    if (apiKey) {
      try {
        const prompt = `
You are a friendly, highly knowledgeable AI tutor for an educational platform called GenAI Learn.
A student in the course asks: "${concept}"

Explain this clearly in 3-4 simple sentences:
- Avoid unnecessary jargon; explain complex technical terms simply.
- Use a relatable real-life analogy if possible.
- Conclude with one sentence on why this concept is essential for modern AI engineers.
`

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 300,
              },
            }),
          }
        )

        if (res.ok) {
          const data = await res.json()
          const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim()
          if (text) {
            return NextResponse.json({ explanation: text })
          }
        }
      } catch (geminiError) {
        console.warn('Gemini API fetch error, checking curated fallback:', geminiError)
      }
    }

    // Curated fallback for core curriculum prompt chips
    const curated = findCuratedExplanation(concept)
    if (curated) {
      return NextResponse.json({ explanation: curated })
    }

    return NextResponse.json({
      explanation: `"${concept}" is a fundamental topic in artificial intelligence and machine learning. To enable custom generative responses for open-ended queries on your deployment, ensure GEMINI_API_KEY is configured in your Vercel project environment variables.`,
    })
  } catch (err) {
    console.error('AI Explain Route Error:', err)
    return NextResponse.json(
      { message: 'AI tutor encountered an error. Please try again.' },
      { status: 500 }
    )
  }
}
