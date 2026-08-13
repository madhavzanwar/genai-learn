# GenAI Learn

**Learn AI. Simply.**

A full-stack Learning Management System purpose-built for AI/ML education — video lessons, adaptive quizzes, progress-gated unlocking, and a Gemini-powered AI tutor, all wrapped in a clean, warm minimal interface.

Built by **DS Virtual Lab**.

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express%205-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Gemini AI](https://img.shields.io/badge/Gemini-2.5%20Flash-8E75B2?style=flat-square&logo=googlegemini&logoColor=white)](https://ai.google.dev/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/API%20on-Render-46E3B7?style=flat-square&logo=render&logoColor=white)](https://render.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](#license)

**[Live App](https://genai-learn-beta.vercel.app)** · **[API](https://genai-learn.onrender.com)** · **[Repository](https://github.com/madhavzanwar/genai-learn)**

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
  - [1. Course Catalog & Homepage](#1-course-catalog--homepage)
  - [2. User Authentication](#2-user-authentication)
  - [3. Video Lesson Player](#3-video-lesson-player)
  - [4. Quiz System](#4-quiz-system)
  - [5. Progress & Lesson Unlocking](#5-progress--lesson-unlocking)
  - [6. AI Tutor (Gemini-Powered)](#6-ai-tutor-gemini-powered)
  - [7. Light Mode Design System](#7-light-mode-design-system)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Environment Variables](#environment-variables)
  - [Run Locally](#run-locally)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [User Flow](#user-flow)
- [Deployment Guide](#deployment-guide)
- [Design Tokens](#design-tokens)
- [Screenshots](#screenshots)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Overview

**GenAI Learn** is a self-paced learning platform for AI and machine learning topics. Learners work through video lessons, prove comprehension via quizzes, and unlock the next lesson only after passing — with an AI tutor on standby to explain anything that doesn't click.

The project is split into three deployable pieces:

| Layer | Description | Deployment |
|---|---|---|
| **Frontend** | Next.js 16 App Router client | Vercel |
| **Backend** | Express 5 REST API, auth, quiz scoring, AI proxy | Render |
| **AI Service** *(optional)* | Standalone Python FastAPI microservice for local AI experimentation | Local only |

In production, all AI calls are routed through the Node backend (`services/ai.js`) — the Python FastAPI service exists purely as an optional local playground and is not part of the deployed stack.

---

## Features

### 1. Course Catalog & Homepage

- Hero section: **"Learn AI. Simply."**
- 6 courses spanning **Foundations**, **Advanced**, and **Applied** tracks:
  - Introduction to Generative AI
  - Prompt Engineering
  - Building AI Agents
  - Fine-Tuning LLMs
  - AI for Data Analysis
  - LLM Applications with LangChain
- Each course card displays rating, enrolled student count, module count, estimated duration, and locked/unlocked state at a glance.

### 2. User Authentication

- Register with name, email, and password.
- Login issues a **JWT** (7-day expiry), stored client-side in `localStorage` as `genai_token`.
- Display name persisted as `genai_user` in `localStorage`.
- Navbar is auth-aware — shows the user's name and a Logout action when signed in, or Login/Register when not.
- Passwords are hashed server-side with **bcrypt** (salt rounds: 10) before storage — plaintext passwords never touch the database.

### 3. Video Lesson Player

- YouTube embed integration for lesson content (e.g., Module 1 · Lesson 1 — *"What is Artificial Intelligence (AI)?"*, video ID `E1-SHflLFVs`).
- Collapsible lesson sidebar grouping lessons by module, with lock/unlock indicators per lesson.
- Lessons load dynamically via the `?lesson=l1` query parameter, pulling title, duration, and description from `lib/data.ts`.
- A **"Mark as Watched"** action gates quiz access — learners must confirm the video before attempting the quiz.

### 4. Quiz System

- 10 questions per quiz (5 easy, 5 hard) sourced from `lib/quiz-data.ts`.
- One question presented at a time with a visual progress bar.
- Difficulty pills — green for **Easy**, gray for **Hard**.
- **Pass threshold: 7/10.**
- Results screen shows score, pass/fail status, and a clear path to unlock the next lesson or retake the quiz.
- **Dual scoring paths:**
  - *Not logged in:* client-side fallback scoring (nothing persisted).
  - *Logged in:* server-side scoring via `/api/quiz/submit`, with results persisted to MongoDB.
- **AI-generated hints** on incorrect answers, powered by Gemini, surfaced directly on the results screen.

### 5. Progress & Lesson Unlocking

- Passing a quiz (≥7/10) unlocks the next lesson in the module sequence.
- Unlock state is stored in MongoDB on the `User` document (`unlockedLessons: [String]`).
- A parallel `localStorage` cache keeps unlock state available offline / for guests, synced against the server when authenticated.
- Backend routes: `GET /api/progress` (fetch state) and `POST /api/progress/unlock` (manual unlock, e.g. for admin/testing flows).

### 6. AI Tutor (Gemini-Powered)

- An **"Ask AI"** input is available on every course lesson page for free-form concept questions.
- `POST /api/ai/explain` returns a plain-language explanation of any AI/ML concept via Gemini.
- Wrong quiz answers automatically generate a contextual hint through the same Gemini integration.
- Model is configurable via the `GEMINI_MODEL` environment variable (default: `gemini-2.5-flash`).
- If the AI service is unreachable or the API key is invalid, the app degrades gracefully rather than breaking the quiz/lesson flow.

### 7. Light Mode Design System

- Forced light mode — no dark mode variant currently exists.
- Warm, minimal palette defined as CSS custom properties in `app/globals.css`:
  - Background `#FAFAF9`
  - Foreground `#1C1C1A`
  - Border `#E7E5E0`
- Built on **shadcn/ui** (base-nova style) with **Tailwind CSS v4** and **Lucide React** icons for a consistent, uncluttered aesthetic throughout.

---

## Architecture

```mermaid
flowchart LR
    subgraph Client["Frontend — Vercel"]
        A[Next.js 16 App Router]
        A1[Course Catalog]
        A2[Lesson Player]
        A3[Quiz Client]
        A --> A1 & A2 & A3
    end

    subgraph Server["Backend — Render"]
        B[Express 5 API]
        B1[Auth Routes]
        B2[Quiz Routes]
        B3[Progress Routes]
        B4[AI Routes]
        B --> B1 & B2 & B3 & B4
    end

    subgraph Data["Data & AI"]
        C[(MongoDB Atlas)]
        D[Gemini 2.5 Flash]
    end

    A -- "REST / JSON, JWT Bearer" --> B
    B1 --> C
    B3 --> C
    B2 --> C
    B4 -- "Gemini SDK" --> D
    B2 -- "hint generation" --> D
```

> The optional Python FastAPI microservice (`ai-service/`) is not shown above — it runs independently of this flow and is used only for local AI prototyping.

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| Next.js 16 (App Router) | React framework, routing, SSR |
| React 19 | UI library |
| TypeScript | Type safety |
| Tailwind CSS v4 | Utility-first styling |
| shadcn/ui (base-nova) | Component primitives |
| Lucide React | Icon set |
| Vercel | Hosting / CI-CD |

### Backend

| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB Atlas + Mongoose | Database & ODM |
| jsonwebtoken | JWT auth |
| bcryptjs | Password hashing |
| @google/generative-ai | Gemini SDK (Node) |
| Render | Hosting |

### AI Service (optional, local-only)

| Technology | Purpose |
|---|---|
| Python FastAPI + uvicorn | Local microservice |
| google-generativeai | Gemini SDK (Python) |

### Tooling

TypeScript · PostCSS · ESLint · `.env.local` / `backend/.env` for config · `vercel.json` for deployment config

---

## Project Structure

```
genai-learn/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage with course catalog
│   ├── layout.tsx                # Root layout (light mode, Inter font)
│   ├── globals.css               # Design tokens, warm palette
│   ├── auth/page.tsx             # Login / Register page
│   ├── course/[id]/page.tsx      # Video lesson player + AI tutor
│   └── quiz/[id]/page.tsx        # Quiz page
├── components/
│   ├── navbar.tsx                # Auth-aware navbar (login/logout)
│   ├── auth-client.tsx           # Login & register forms
│   ├── quiz-client.tsx           # Interactive quiz UI
│   ├── lesson-sidebar.tsx        # Course module/lesson navigation
│   ├── course-card.tsx           # Course card on homepage
│   └── ui/                       # shadcn components (button, input, tabs, etc.)
├── lib/
│   ├── api.ts                    # Frontend API helpers (auth, quiz, AI)
│   ├── data.ts                   # Courses, modules, lessons dummy data
│   ├── quiz-data.ts              # 10 quiz questions (5 hard, 5 easy)
│   ├── unlocked-lessons.ts       # localStorage unlock helpers
│   └── utils.ts                  # cn() utility
├── backend/                      # Express API (Render deployment)
│   ├── server.js                 # Entry point, CORS, MongoDB connect
│   ├── models/User.js            # User schema
│   ├── middleware/auth.js        # JWT Bearer middleware
│   ├── routes/
│   │   ├── auth.js               # Register, login
│   │   ├── quiz.js               # Quiz submit + AI hints
│   │   ├── progress.js           # Lesson unlock progress
│   │   └── ai.js                 # AI tutor explain endpoint
│   ├── services/ai.js            # Gemini integration
│   └── data/questions.js         # Quiz questions (mirror of frontend)
├── ai-service/                   # Optional Python FastAPI microservice
│   ├── main.py
│   └── requirements.txt
├── public/                       # Static assets
├── tailwind.config.ts
├── next.config.mjs
├── vercel.json
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18.x and npm
- **Python** ≥ 3.10 (only if running the optional AI microservice)
- A **MongoDB Atlas** cluster (free M0 tier is sufficient)
- A **Google AI Studio** API key for Gemini

### Clone the Repository

```bash
git clone https://github.com/madhavzanwar/genai-learn.git
cd genai-learn
```

### Environment Variables

**Frontend — `.env.local`** (repo root)

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the backend API | `https://genai-learn.onrender.com/api` |

**Backend — `backend/.env`**

| Variable | Description | Example |
|---|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/genai-learn` |
| `JWT_SECRET` | Secret used to sign JWTs | `your_secret_key` |
| `FRONTEND_URL` | Deployed frontend origin, for CORS | `https://genai-learn-beta.vercel.app` |
| `GEMINI_API_KEY` | Google AI Studio API key | `AIza...` |
| `GEMINI_MODEL` | Gemini model identifier | `gemini-2.5-flash` |
| `PORT` | Backend server port | `5000` |

**AI Service — `ai-service/.env`** *(optional, local only)*

| Variable | Description | Example |
|---|---|---|
| `GEMINI_API_KEY` | Google AI Studio API key | `AIza...` |

### Run Locally

The project runs as three independent processes. Open a terminal for each.

**Terminal 1 — Frontend**

```bash
npm install
npm run dev
# Runs on http://localhost:3000
```

**Terminal 2 — Backend**

```bash
cd backend
npm install
# Create backend/.env with MONGODB_URI, JWT_SECRET, GEMINI_API_KEY (see table above)
npm run dev
# Runs on http://localhost:5000
```

**Terminal 3 — AI Service** *(optional)*

```bash
cd ai-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Once all services are up, visit `http://localhost:3000` and point `NEXT_PUBLIC_API_URL` at `http://localhost:5000/api` for local end-to-end testing.

---

## API Documentation

Base URL (production): `https://genai-learn.onrender.com/api`

Routes marked **Auth: Yes** require an `Authorization: Bearer <token>` header.

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/health` | No | Health check |
| POST | `/api/auth/register` | No | Create account, returns JWT |
| POST | `/api/auth/login` | No | Login, returns JWT + unlocked lessons |
| POST | `/api/quiz/submit` | Yes | Submit answers, returns score, hints, unlocks |
| GET | `/api/progress` | Yes | Get user's unlocked lessons |
| POST | `/api/progress/unlock` | Yes | Manually unlock a lesson |
| POST | `/api/ai/explain` | No | AI tutor concept explanation |

### `GET /api/health`

```json
// 200 OK
{ "status": "ok", "uptime": 1234.56 }
```

### `POST /api/auth/register`

```json
// Request
{
  "name": "Madhav Zanwar",
  "email": "madhav@example.com",
  "password": "••••••••"
}
```

```json
// 201 Created
{
  "token": "eyJhbGciOi...",
  "user": {
    "id": "665f1c2e...",
    "name": "Madhav Zanwar",
    "email": "madhav@example.com",
    "unlockedLessons": ["intro-to-genai"]
  }
}
```

### `POST /api/auth/login`

```json
// Request
{ "email": "madhav@example.com", "password": "••••••••" }
```

```json
// 200 OK
{
  "token": "eyJhbGciOi...",
  "user": {
    "id": "665f1c2e...",
    "name": "Madhav Zanwar",
    "email": "madhav@example.com",
    "unlockedLessons": ["intro-to-genai", "prompt-basics"]
  }
}
```

### `POST /api/quiz/submit`

```json
// Request
// Header: Authorization: Bearer <token>
{
  "courseId": "intro-to-genai",
  "answers": [1, 0, 2, 1, 3, 0, 1, 2, 0, 1]
}
```

```json
// 200 OK
{
  "score": 8,
  "passed": true,
  "unlockedLesson": "prompt-basics",
  "hints": [
    { "questionId": "q3", "hint": "Think about how the model generalizes from labeled examples rather than memorizing them." }
  ]
}
```

### `GET /api/progress`

```json
// 200 OK
// Header: Authorization: Bearer <token>
{ "unlockedLessons": ["intro-to-genai", "prompt-basics"] }
```

### `POST /api/progress/unlock`

```json
// Request
// Header: Authorization: Bearer <token>
{ "lessonId": "agents-intro" }
```

```json
// 200 OK
{ "unlockedLessons": ["intro-to-genai", "prompt-basics", "agents-intro"] }
```

### `POST /api/ai/explain`

```json
// Request
{ "question": "What is the difference between supervised and unsupervised learning?" }
```

```json
// 200 OK
{
  "explanation": "Supervised learning trains on labeled examples where the correct answer is known, while unsupervised learning finds patterns in data without labeled outcomes..."
}
```

---

## Database Schema

**`User` model (MongoDB / Mongoose)**

| Field | Type | Notes |
|---|---|---|
| `name` | `String` | Required |
| `email` | `String` | Required, unique |
| `password` | `String` | Required, bcrypt-hashed |
| `unlockedLessons` | `[String]` | Default: `["intro-to-genai"]` |
| `quizScores` | `[{ courseId, score, passed, date }]` | One entry per quiz attempt |
| `createdAt` | `Date` | Auto-set on creation |

---

## User Flow

```mermaid
flowchart TD
    A[Register] --> B[Browse Courses]
    B --> C[Open Lesson]
    C --> D[Watch YouTube Video]
    D --> E[Mark as Watched]
    E --> F[Take Quiz]
    F --> G{Score ≥ 7/10?}
    G -- Yes --> H[Unlock Next Lesson]
    G -- No --> F
    H --> C
    C -.-> I[Ask AI Tutor anytime]
```

---

## Deployment Guide

### Vercel (Frontend)

1. Connect the GitHub repository to a new Vercel project.
2. Set the `NEXT_PUBLIC_API_URL` environment variable to your deployed backend URL (e.g. `https://genai-learn.onrender.com/api`).
3. Deploy.
4. **Important:** `NEXT_PUBLIC_*` variables are baked in at build time — any change requires a **redeploy**, not just a settings update.

### Render (Backend)

1. Create a new **Web Service**, pointing at the same repository.
2. Set **Root Directory** to `backend`.
3. **Build Command:** `npm install`
4. **Start Command:** `npm start`
5. Add environment variables: `MONGODB_URI`, `JWT_SECRET`, `FRONTEND_URL`, `GEMINI_API_KEY`, `GEMINI_MODEL`, `PORT`.
6. Deploy. Note that Render's free tier spins down on inactivity — see [Troubleshooting](#troubleshooting) for cold-start behavior.

### MongoDB Atlas

1. Create a free **M0** cluster.
2. Under **Database Access**, create a user with read/write permissions.
3. Under **Network Access**, allow `0.0.0.0/0` so Render can connect (or restrict to Render's static IPs if available on your plan).
4. Copy the connection string into `MONGODB_URI`.

---

## Design Tokens

| Token | Value |
|---|---|
| Background | `#FAFAF9` |
| Foreground | `#1C1C1A` |
| Border | `#E7E5E0` |
| Success | `#16A34A` |
| Fail / Error | `#DC2626` |
| Primary | `#18181B` |

---

## Screenshots

> _Add screenshots here._ Recommended: homepage/course catalog, lesson player with AI tutor open, quiz in progress, and the results screen.

| Homepage | Lesson Player | Quiz |
|---|---|---|
| _add screenshot_ | _add screenshot_ | _add screenshot_ |

---

## Troubleshooting

**CORS errors when calling the backend from the frontend**
Ensure `FRONTEND_URL` in `backend/.env` (or Render's env settings) exactly matches your deployed frontend origin, including protocol and no trailing slash. Restart/redeploy the backend after changing it.

**Gemini returns a 404 for the configured model**
The `GEMINI_MODEL` value must match a model currently available to your API key/region (e.g. `gemini-2.5-flash`). Model availability changes over time — check the [Google AI Studio](https://aistudio.google.com/) model list if you get a 404, and update `GEMINI_MODEL` accordingly.

**Backend feels slow or times out on first request**
Render's free tier spins down idle services. The first request after inactivity can take 30–60 seconds while the instance cold-starts. Subsequent requests will be fast until it idles again.

**Vercel isn't picking up a new environment variable**
`NEXT_PUBLIC_*` variables are inlined at build time. After adding or changing one in the Vercel dashboard, trigger a fresh deployment — simply saving the variable is not enough.

---

## Roadmap

- [ ] Video upload support for all lessons (beyond YouTube embeds)
- [ ] Admin panel for course/lesson/quiz management
- [ ] Completion certificates


---

## License

Distributed under the **MIT License**. See `LICENSE` for details.

---

## Author

**Madhav Zanwar**
Built as part of **DS Virtual Lab**

- GitHub: [@madhavzanwar](https://github.com/madhavzanwar)

---

<p align="center">Made with care for anyone trying to learn AI — simply.</p>
