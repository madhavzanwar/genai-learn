const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    res.json({ unlockedLessons: req.user.unlockedLessons });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch progress', error: error.message });
  }
});

router.post('/unlock', auth, async (req, res) => {
  try {
    const { lessonId } = req.body;

    if (!lessonId) {
      return res.status(400).json({ message: 'lessonId is required' });
    }

    const user = await User.findById(req.user._id);

    if (!user.unlockedLessons.includes(lessonId)) {
      user.unlockedLessons.push(lessonId);
      await user.save();
    }

    res.json({ unlockedLessons: user.unlockedLessons });
  } catch (error) {
    res.status(500).json({ message: 'Failed to unlock lesson', error: error.message });
  }
});

module.exports = router;
