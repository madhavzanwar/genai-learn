const express = require('express');
const { explainConcept } = require('../services/ai');

const router = express.Router();

router.post('/explain', async (req, res) => {
  try {
    const { concept } = req.body;

    if (!concept || !String(concept).trim()) {
      return res.status(400).json({ message: 'concept is required' });
    }

    const explanation = await explainConcept(String(concept).trim());
    res.json({ explanation });
  } catch (error) {
    console.error('AI explain error:', error.message);
    const isConfig = error.message === 'GEMINI_API_KEY is not configured';
    const isModel =
      error.message?.includes('404') ||
      error.message?.includes('no longer available') ||
      error.message?.includes('not found');
    res.status(503).json({
      message: isConfig
        ? 'AI tutor is not configured yet. Add GEMINI_API_KEY to Render.'
        : isModel
          ? 'AI model unavailable. Redeploy the latest backend code.'
          : 'AI tutor is temporarily unavailable. Please try again.',
    });
  }
});

module.exports = router;
