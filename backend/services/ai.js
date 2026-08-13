const { GoogleGenerativeAI } = require('@google/generative-ai');

function getModel() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
}

async function generateText(prompt) {
  const model = getModel();
  const result = await model.generateContent(prompt);
  return result.response.text().trim();
}

async function explainConcept(concept) {
  const prompt = `
You are a friendly AI tutor teaching a beginner AI/ML course called GenAI Learn.

A student wants to understand: "${concept}"

Explain this in 3-4 simple sentences. Avoid jargon. Use a real-life analogy if possible.
End with one sentence on why this concept matters.
`;
  return generateText(prompt);
}

async function getHintsBatch(wrongAnswers) {
  if (!wrongAnswers.length) return [];

  const hints = [];
  for (const item of wrongAnswers) {
    const prompt = `
You are a friendly AI tutor teaching a beginner AI/ML course.

Question: ${item.question}
Student answered: ${item.student_answer}
Correct answer: ${item.correct_answer}

In 2 sentences max, explain why the correct answer is right. Use very simple language.
`;
    const hint = await generateText(prompt);
    hints.push({
      question: item.question,
      hint,
    });
  }
  return hints;
}

module.exports = { explainConcept, getHintsBatch };
