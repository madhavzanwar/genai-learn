const { GoogleGenerativeAI } = require('@google/generative-ai');

const DEFAULT_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

function getModel() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured');
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: DEFAULT_MODEL });
}

async function generateText(prompt) {
  const model = getModel();
  const result = await model.generateContent(prompt);
  return result.response.text().trim();
}

async function explainConcept(concept) {
  const prompt = `
You are a friendly AI tutor teaching a beginner AI/ML course called Eklavya.

A student wants to understand: "${concept}"

Explain this in 3-4 simple sentences. Avoid jargon. Use a real-life analogy if possible.
End with one sentence on why this concept matters.
`;
  return generateText(prompt);
}

async function getHintsBatch(wrongAnswers) {
  if (!wrongAnswers.length) return [];

  const promises = wrongAnswers.slice(0, 3).map(async (item) => {
    try {
      const prompt = `
You are a friendly AI tutor teaching a beginner AI/ML course.

Question: ${item.question}
Student answered: ${item.student_answer}
Correct answer: ${item.correct_answer}

In 2 sentences max, explain why the correct answer is right. Use very simple language.
`;
      const hintPromise = generateText(prompt);
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('AI hint timeout')), 2500)
      );
      const hint = await Promise.race([hintPromise, timeoutPromise]);
      return { question: item.question, hint };
    } catch {
      return null;
    }
  });

  const results = await Promise.all(promises);
  return results.filter(Boolean);
}

module.exports = { explainConcept, getHintsBatch };
