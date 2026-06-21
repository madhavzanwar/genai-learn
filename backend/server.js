require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quiz');
const progressRoutes = require('./routes/progress');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      process.env.FRONTEND_URL || 'https://genai-learn.vercel.app',
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/progress', progressRoutes);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
