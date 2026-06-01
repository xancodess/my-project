# 🔍 Aksara Website - Gamifikasi

An AI-assisted learning platform that turns uploaded course materials into skill trees, quizzes, explanations, and student learning insights.

![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-Database-3FCF8E?logo=supabase&logoColor=white)
![Status](https://img.shields.io/badge/Status-AI%20Learning%20Platform-blue)
![License](https://img.shields.io/badge/License-Not%20Specified-lightgrey)

## 📌 Overview

Aksara Website is a Next.js learning platform built for instructor and student workflows. It helps transform PDF-based learning materials into structured learning nodes, AI-generated quests, summaries, flash cards, and contextual explanations.

The system combines Supabase-backed data storage, PDF chunking, Gemini embeddings, retrieval-augmented generation, and adaptive learning logic. Students interact with sessions, skill trees, daily quizzes, and insights, while instructors can manage sessions, analytics, cognitive dashboards, and reports.

The main target users are instructors and students who need a more adaptive way to review course materials and track learning progress.

## 🧠 Model & Methodology

| Method | Output | Notes |
|---|---|---|
| **Retrieval-Augmented Generation (RAG)** | Context-aware explanations | Retrieves top PDF chunks through Supabase RPC before generating answers. |
| **Gemini Embeddings** | 768-dimensional vectors | Uses `gemini-embedding-2` with `outputDimensionality=768`. |
| **Gemini / Groq LLM Generation** | Text, JSON quests, summaries | Uses `gemini-2.5-flash` with Groq fallback using `llama-3.3-70b-versatile`. |
| **Bayesian Knowledge Tracing** | Mastery score updates | Updates mastery from correct/wrong quest attempts using prior, transition, guess, and slip probabilities. |
| **Risk Score Formula** | Learning risk score 0..1 | Weighted from login count, average quest score, and streak days. |

No accuracy or benchmark metric is provided in the project files.

## ✨ Features

- ✅ PDF upload and material chunking workflow.
- 🤖 AI-generated skill trees, quests, summaries, flash cards, and variants.
- 🔍 RAG-based question answering with source references and similarity scores.
- 📈 Student mastery tracking using Bayesian Knowledge Tracing.
- ⚠️ Risk scoring from engagement and performance signals.
- 📊 Instructor analytics, cognitive dashboard, heatmap, and reports.
- 👤 Student sessions, insights, daily quizzes, settings, and skill tree pages.

## 🛠️ Tech Stack

**Core:** Next.js 14, React 18, TypeScript  
**ML/AI:** Google Gemini, Groq, RAG, Bayesian Knowledge Tracing  
**Data:** Supabase, Supabase migrations, PDF chunks, vector RPC  
**Visualization:** Recharts  
**API/Backend:** Next.js API routes, Supabase SSR  
**Frontend:** Tailwind CSS, Lucide React, React Markdown, SWR  
**Tools:** npm, ESLint, PostCSS

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

## ⚡ Strengths & Limitations

**Strengths:**

- Implements concrete AI learning workflows, not only UI screens.
- Uses RAG with source references to reduce unsupported answers.
- Includes adaptive mastery tracking and risk scoring logic.
- Provides separate instructor and student dashboard paths.

**Limitations:**

- Requires Supabase, Gemini, and optional Groq environment configuration.
- No benchmark dataset or evaluation metric is included.
- The existing repository includes generated `.next` artifacts.

Future improvements may include adding evaluation tests for generated quests and documenting required environment variables.

## 📁 Project Structure

```text
Aksara_Website/
├── lib/                    # Gemini, RAG, BKT, risk score, chunking, quest generation
├── src/app/                # Next.js App Router pages and API routes
│   ├── api/                # Upload, session, quest, dashboard, user APIs
│   ├── dashboard/          # Instructor and student dashboards
│   ├── login/              # Login page
│   ├── onboarding/         # Onboarding page
│   └── session/            # Public/session learning pages
├── supabase/migrations/    # Database schema migrations
├── types/supabase.ts       # Supabase database types
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- Supabase project credentials
- Gemini API key
- Groq API key if fallback generation is needed

### Installation

```bash
git clone <repository-url>
cd Aksara_Website
npm install
```

### How to Run

```bash
npm run dev
```

Open `http://localhost:3000`.

## 📊 Results & Performance

No model accuracy metric is provided in the project files. The available measurable outputs are generated skill trees, quests, summaries, RAG responses, mastery score updates, and dashboard risk scores.

## 👨‍💻 Author

**Axandio**  
LinkedIn: Not provided in project files  
GitHub: Not provided in project files

Open to collaborations and feedback — feel free to reach out!

---
> ⭐ If you find this project useful,
> please give it a star!

## 💡 Portfolio Suggestions

1. Add screenshots of instructor analytics and student skill tree pages.
2. Document `.env.local` variables for Supabase, Gemini, and Groq.
3. Add sample PDF input and example generated quest output.
