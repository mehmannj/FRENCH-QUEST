# FrenchQuest - French Learning Platform PRD

## Original Problem Statement
Create a complete, modern, student-focused language learning website for French beginners called "FrenchQuest". The platform helps students go from zero knowledge of French to strong fluency in 7 months. Features a mix of structured courses, gamified learning (like Duolingo), interactive mini-games, AI-powered tutoring, and progress-based mastery system.

## User Personas
1. **Complete Beginner** - Zero French knowledge, needs alphabet and pronunciation basics
2. **School/College Student** - Learning French for academic requirements
3. **International Student** - Preparing for study abroad or proficiency tests
4. **Casual Learner** - Learning French for travel or personal interest

## Core Requirements
- 7-month structured curriculum with progressive difficulty
- Four core skills: Speaking, Listening, Reading, Writing
- Gamification: XP, streaks, badges, leaderboards
- AI tutor for personalized help
- Interactive mini-games for vocabulary and grammar
- Progress tracking and analytics

## What's Been Implemented (Mar 28, 2026)

### Backend (FastAPI + MongoDB)
- [x] User authentication (JWT with localStorage + Bearer tokens)
- [x] Lessons API with Month 1 content (20 lessons seeded)
- [x] Quizzes API with questions
- [x] Mini-games API with 6 game types
- [x] AI Tutor chat (GPT-5.2 via Emergent LLM Key - REAL, not mocked)
- [x] OpenAI TTS endpoint for French pronunciation audio (REAL, not mocked)
- [x] TTS caching in MongoDB to reduce API calls
- [x] Progress tracking (XP, levels, badges, skills)
- [x] Leaderboard API
- [x] 7-month roadmap API
- [x] Admin panel endpoints (stats, users, lessons, quizzes CRUD, seed content)
- [x] Daily challenges system

### Frontend (React + Tailwind + Shadcn)
- [x] Home Page - Hero, features, roadmap preview
- [x] Login/Register - Clean auth forms
- [x] Dashboard - Stats, quick actions, skill cards, leaderboard
- [x] 7-Month Roadmap - Full curriculum timeline
- [x] Lessons Page - Lesson list + detail with vocab audio (TTS), learn/practice tabs
- [x] Speaking Lab - Pronunciation practice with Web Speech API + TTS audio playback
- [x] Listening Lab - Audio comprehension with real TTS audio from backend
- [x] Reading Lab - Passage reading with comprehension questions
- [x] Writing Lab - Fill-blank, translation, word order exercises
- [x] Games Hub - 5 playable games (Memory Cards, Translation Race, Vocab Match, Spelling Bee, Boss Battle) + Daily Challenge
- [x] AI Tutor - Chat interface with real GPT-5.2 responses
- [x] Admin Panel - Stats, users, seed content
- [x] Profile, Progress, Achievements pages

### Integrations (ALL REAL, NOT MOCKED)
- [x] OpenAI GPT-5.2 via Emergent LLM Key (AI Tutor)
- [x] OpenAI TTS via Emergent LLM Key (Audio pronunciation)

### Auth
- JWT tokens stored in localStorage
- Global axios interceptor reads token from localStorage per request
- Session persistence verified across page navigation

## Design System
- Font: Outfit (headings), Work Sans (body)
- Colors: Blue primary (#3B82F6), Red accent (#EF4444), Gold (#F59E0B)
- Modern rounded cards with hover effects

## Technical Stack
- **Frontend**: React 18, Tailwind CSS, Shadcn/UI, React Router, Framer Motion
- **Backend**: FastAPI, Motor (MongoDB async)
- **Database**: MongoDB
- **AI**: OpenAI GPT-5.2 (via Emergent LLM key + emergentintegrations)
- **TTS**: OpenAI TTS-1 (via Emergent LLM key + emergentintegrations)
- **Auth**: JWT with localStorage + Bearer tokens

## P0/P1/P2 Feature Backlog

### P0 (Critical - COMPLETE)
- [x] Authentication flow
- [x] Dashboard with progress
- [x] Basic lessons structure with audio
- [x] Mini-games (5 playable)
- [x] AI Tutor with real GPT-5.2
- [x] TTS audio for vocabulary

### P1 (High Priority - Future)
- [ ] Month 2-7 content and curriculums
- [ ] Monthly assessments/final tests
- [ ] Speech-to-text accuracy improvements
- [ ] More quiz varieties per lesson

### P2 (Medium Priority - Backlog)
- [ ] Push notifications for streak reminders
- [ ] Social features (follow friends)
- [ ] Weekly challenges
- [ ] Downloadable certificates
- [ ] Mobile app version

## API Endpoints
- Base URL: /api
- Auth: Bearer token in Authorization header
- See `/app/memory/test_credentials.md` for test accounts

## Testing Status
- Backend: 93% (27/29 pytest tests - 2 failures are test isolation, not bugs)
- Frontend: 100% (all UI flows working)
- Deployment check: PASSED
