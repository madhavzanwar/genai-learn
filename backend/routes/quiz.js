const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const { getQuizForLesson, PASS_SCORE } = require('../data/questions');
const { getHintsBatch } = require('../services/ai');

const router = express.Router();

const LESSON_SEQUENCE = ['l1', 'l2', 'l3', 'l4', 'l5', 'l6'];

async function getHintsFromAI(wrongAnswers) {
  try {
    return await getHintsBatch(wrongAnswers);
  } catch (err) {
    console.error('AI hints error:', err.message);
    return [];
  }
}

router.post('/submit', auth, async (req, res) => {
  try {
    const { courseId, answers, lessonId = 'l1' } = req.body;

    if (!courseId || !Array.isArray(answers)) {
      return res.status(400).json({ message: 'courseId and answers array are required' });
    }

    const quiz = getQuizForLesson(lessonId);
    const questions = quiz.questions;

    if (answers.length !== questions.length) {
      return res.status(400).json({ message: `Expected ${questions.length} answers` });
    }

    let score = 0;
    const wrongAnswers = [];

    for (let i = 0; i < questions.length; i++) {
      if (answers[i] === questions[i].answer) {
        score++;
      } else {
        wrongAnswers.push({
          question: questions[i].question,
          student_answer:
            answers[i] >= 0 && answers[i] < questions[i].options.length
              ? questions[i].options[answers[i]]
              : 'No answer',
          correct_answer: questions[i].options[questions[i].answer],
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
      const currentIndex = LESSON_SEQUENCE.indexOf(lessonId);
      if (currentIndex !== -1 && currentIndex < LESSON_SEQUENCE.length - 1) {
        const nextLessonId = LESSON_SEQUENCE[currentIndex + 1];
        if (!user.unlockedLessons.includes(nextLessonId)) {
          user.unlockedLessons.push(nextLessonId);
        }
      }

      // Legacy compatibility
      if (lessonId === 'l1') {
        const legacyKey = `${courseId}-lesson-2`;
        if (!user.unlockedLessons.includes(legacyKey)) {
          user.unlockedLessons.push(legacyKey);
        }
      }
    }

    await user.save();

    const hints = await getHintsFromAI(wrongAnswers);

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
