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

## What's Been Implemented (Jan 28, 2026)

### Backend (FastAPI + MongoDB)
- [x] User authentication (JWT with localStorage)
- [x] User registration and login with cookie + token support
- [x] Lessons API with sample content (3 lessons seeded)
- [x] Quizzes API with sample questions
- [x] Mini-games API with 6 game types
- [x] AI Tutor chat endpoint (GPT-5.2 integration ready)
- [x] Progress tracking (XP, levels, badges, skills)
- [x] Leaderboard API
- [x] 7-month roadmap API

### Frontend (React + Tailwind)
- [x] **Home Page** - Hero, features, roadmap preview, gamification showcase
- [x] **Login/Register** - Clean auth forms with validation
- [x] **Dashboard** - Stats overview, quick actions, skill cards, leaderboard
- [x] **7-Month Roadmap** - Full curriculum timeline visualization
- [x] **Lessons Page** - Lesson list with vocabulary, grammar, practice tabs
- [x] **Speaking Lab** - Pronunciation practice with recording UI
- [x] **Listening Lab** - Audio comprehension exercises
- [x] **Reading Lab** - Passage reading with comprehension questions
- [x] **Writing Lab** - Fill-blank, translation, word order exercises
- [x] **Games Hub** - 6 mini-games (Memory Cards, Translation Race, etc.)
- [x] **AI Tutor** - Chat interface with quick prompts
- [x] **Profile Page** - User info and stats
- [x] **Progress Page** - Detailed skill analytics
- [x] **Achievements** - Badge collection system

### Design System
- Font: Outfit (headings), Work Sans (body)
- Colors: Blue primary (#3B82F6), Red accent (#EF4444), Gold (#F59E0B)
- Modern rounded cards with hover effects
- French-themed subtle accents (flag colors)

## P0/P1/P2 Feature Backlog

### P0 (Critical - MVP Complete)
- [x] Authentication flow
- [x] Dashboard with progress
- [x] Basic lessons structure
- [x] Mini-games (2 playable)

### P1 (High Priority)
- [ ] More sample lessons (full Month 1 content)
- [ ] Audio playback for vocabulary/listening
- [ ] Speech recognition for speaking practice
- [ ] Monthly assessments/tests
- [ ] Admin panel for lesson management

### P2 (Medium Priority)
- [ ] Push notifications for streak reminders
- [ ] Social features (follow friends)
- [ ] Weekly challenges
- [ ] Downloadable certificates
- [ ] Mobile app version

## Next Tasks
1. Add more lesson content for Month 1 curriculum
2. Implement audio playback for vocabulary cards
3. Add speech-to-text for speaking exercises
4. Create admin dashboard for content management
5. Add more mini-game varieties (Boss Battle, Treasure Hunt)

## Technical Stack
- **Frontend**: React 18, Tailwind CSS, Shadcn/UI, React Router
- **Backend**: FastAPI, Motor (MongoDB async)
- **Database**: MongoDB
- **AI**: OpenAI GPT-5.2 (via Emergent LLM key)
- **Auth**: JWT with localStorage + httpOnly cookies

## API Documentation
- Base URL: /api
- Auth: Bearer token in Authorization header
- See `/app/memory/test_credentials.md` for test accounts
