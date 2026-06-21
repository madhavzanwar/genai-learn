const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const { quizQuestions, PASS_SCORE } = require('../data/questions');

const router = express.Router();

async function getHintsFromPython(wrongAnswers) {
  try {
    const response = await fetch('http://localhost:8000/hints/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wrong_answers: wrongAnswers }),
    });
    const data = await response.json();
    return data.hints || [];
  } catch (err) {
    console.error('Python AI service error:', err.message);
    return [];
  }
}

router.post('/submit', auth, async (req, res) => {
  try {
    const { courseId, answers } = req.body;

    if (!courseId || !Array.isArray(answers)) {
      return res.status(400).json({ message: 'courseId and answers array are required' });
    }

    if (answers.length !== quizQuestions.length) {
      return res.status(400).json({ message: `Expected ${quizQuestions.length} answers` });
    }

    let score = 0;
    const wrongAnswers = [];

    for (let i = 0; i < quizQuestions.length; i++) {
      if (answers[i] === quizQuestions[i].answer) {
        score++;
      } else {
        wrongAnswers.push({
          question: quizQuestions[i].question,
          student_answer:
            answers[i] >= 0 && answers[i] < quizQuestions[i].options.length
              ? quizQuestions[i].options[answers[i]]
              : 'No answer',
          correct_answer: quizQuestions[i].options[quizQuestions[i].answer],
        });
      }
    }

    const passed = score >= PASS_SCORE;
    const user = await User.findById(req.user._id);

    user.quizScores.push({
      courseId,
      score,
      passed,
      date: new Date(),
    });

    if (passed) {
      const lessonKey = `${courseId}-lesson-2`;
      if (!user.unlockedLessons.includes(lessonKey)) {
        user.unlockedLessons.push(lessonKey);
      }
    }

    await user.save();

    const hints = await getHintsFromPython(wrongAnswers);

    res.json({
      score,
      passed,
      unlockedLessons: user.unlockedLessons,
      hints,
    });
  } catch (error) {
    res.status(500).json({ message: 'Quiz submission failed', error: error.message });
  }
});

module.exports = router;
