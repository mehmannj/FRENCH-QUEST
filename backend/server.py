from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, Depends, UploadFile, File
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone, timedelta
import bcrypt
import jwt
from bson import ObjectId

# Import lesson content
try:
    from content.month1_lessons import MONTH_1_LESSONS, MONTH_1_QUIZZES
except ImportError:
    MONTH_1_LESSONS = []
    MONTH_1_QUIZZES = {}

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

ROOT_DIR = Path(__file__).parent

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT Configuration
JWT_SECRET = os.environ.get("JWT_SECRET", "frenchquest-secret-key-change-in-production-123456789")
JWT_ALGORITHM = "HS256"
ADMIN_EMAIL = os.environ.get("ADMIN_EMAIL", "admin@frenchquest.com")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "admin123")

# Emergent LLM Key for AI Tutor
EMERGENT_LLM_KEY = os.environ.get("EMERGENT_LLM_KEY", "")

# Create the main app
app = FastAPI(title="FrenchQuest API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ===================
# PYDANTIC MODELS
# ===================

class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(BaseModel):
    email: EmailStr
    name: str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    role: str
    xp: int
    level: int
    streak: int
    current_month: int
    badges: List[str]
    created_at: str

class ProgressUpdate(BaseModel):
    lesson_id: str
    skill_type: str  # speaking, listening, reading, writing, grammar, vocabulary
    score: int
    xp_earned: int

class LessonBase(BaseModel):
    month: int
    week: int
    day: int
    title: str
    title_fr: str
    description: str
    skill_focus: List[str]
    vocabulary: List[Dict[str, str]]
    grammar_points: List[str]
    content: Dict[str, Any]

class QuizQuestion(BaseModel):
    question: str
    question_fr: Optional[str] = None
    options: List[str]
    correct_answer: int
    explanation: str
    skill_type: str

class QuizSubmission(BaseModel):
    lesson_id: str
    answers: List[int]

class ChatMessage(BaseModel):
    message: str
    session_id: Optional[str] = None

class MiniGameScore(BaseModel):
    game_type: str
    score: int
    time_taken: int
    difficulty: str

# ===================
# HELPER FUNCTIONS
# ===================

def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed.decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))

def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(hours=24),
        "type": "access"
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def create_refresh_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
        "type": "refresh"
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"_id": ObjectId(payload["sub"])})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        user["id"] = str(user["_id"])
        user.pop("_id", None)
        user.pop("password_hash", None)
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

def calculate_level(xp: int) -> int:
    """Calculate level based on XP (100 XP per level)"""
    return (xp // 100) + 1

def get_level_title(level: int) -> str:
    titles = {
        1: "Beginner",
        2: "Explorer",
        3: "Learner",
        4: "Builder",
        5: "Speaker",
        6: "Intermediate",
        7: "Advanced",
        8: "Expert",
        9: "Master",
        10: "Champion"
    }
    return titles.get(min(level, 10), "Champion")

# ===================
# AUTH ENDPOINTS
# ===================

@api_router.post("/auth/register")
async def register(user_data: UserCreate, response: Response):
    email = user_data.email.lower()
    existing = await db.users.find_one({"email": email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    password_hash = hash_password(user_data.password)
    user_doc = {
        "email": email,
        "name": user_data.name,
        "password_hash": password_hash,
        "role": "student",
        "xp": 0,
        "level": 1,
        "streak": 0,
        "last_activity": datetime.now(timezone.utc).isoformat(),
        "current_month": 1,
        "badges": ["newcomer"],
        "skills": {
            "speaking": 0,
            "listening": 0,
            "reading": 0,
            "writing": 0,
            "grammar": 0,
            "vocabulary": 0
        },
        "completed_lessons": [],
        "completed_games": [],
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    
    result = await db.users.insert_one(user_doc)
    user_id = str(result.inserted_id)
    
    access_token = create_access_token(user_id, email)
    refresh_token = create_refresh_token(user_id)
    
    response.set_cookie(key="access_token", value=access_token, httponly=True, secure=True, samesite="none", max_age=86400, path="/")
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True, secure=True, samesite="none", max_age=604800, path="/")
    
    return {
        "id": user_id,
        "email": email,
        "name": user_data.name,
        "role": "student",
        "xp": 0,
        "level": 1,
        "streak": 0,
        "current_month": 1,
        "badges": ["newcomer"],
        "created_at": user_doc["created_at"],
        "access_token": access_token
    }

@api_router.post("/auth/login")
async def login(credentials: UserLogin, response: Response):
    email = credentials.email.lower()
    user = await db.users.find_one({"email": email})
    
    if not user or not verify_password(credentials.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    user_id = str(user["_id"])
    
    # Update last activity and check streak
    last_activity = datetime.fromisoformat(user.get("last_activity", datetime.now(timezone.utc).isoformat()))
    now = datetime.now(timezone.utc)
    days_diff = (now.date() - last_activity.date()).days
    
    new_streak = user.get("streak", 0)
    if days_diff == 1:
        new_streak += 1
    elif days_diff > 1:
        new_streak = 1
    
    await db.users.update_one(
        {"_id": user["_id"]},
        {"$set": {"last_activity": now.isoformat(), "streak": new_streak}}
    )
    
    access_token = create_access_token(user_id, email)
    refresh_token = create_refresh_token(user_id)
    
    response.set_cookie(key="access_token", value=access_token, httponly=True, secure=True, samesite="none", max_age=86400, path="/")
    response.set_cookie(key="refresh_token", value=refresh_token, httponly=True, secure=True, samesite="none", max_age=604800, path="/")
    
    return {
        "id": user_id,
        "email": user["email"],
        "name": user["name"],
        "role": user.get("role", "student"),
        "xp": user.get("xp", 0),
        "level": user.get("level", 1),
        "streak": new_streak,
        "current_month": user.get("current_month", 1),
        "badges": user.get("badges", []),
        "created_at": user.get("created_at", ""),
        "access_token": access_token
    }

@api_router.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"message": "Logged out successfully"}

@api_router.get("/auth/me")
async def get_me(request: Request):
    user = await get_current_user(request)
    return user

# ===================
# LESSONS ENDPOINTS
# ===================

@api_router.get("/lessons")
async def get_lessons(month: Optional[int] = None, request: Request = None):
    query = {}
    if month:
        query["month"] = month
    
    lessons = await db.lessons.find(query, {"_id": 0}).sort([("month", 1), ("week", 1), ("day", 1)]).to_list(100)
    return lessons

@api_router.get("/lessons/{lesson_id}")
async def get_lesson(lesson_id: str):
    lesson = await db.lessons.find_one({"id": lesson_id}, {"_id": 0})
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson

@api_router.post("/lessons/{lesson_id}/complete")
async def complete_lesson(lesson_id: str, progress: ProgressUpdate, request: Request):
    user = await get_current_user(request)
    user_id = user["id"]
    
    # Update user progress
    xp_earned = progress.xp_earned
    new_xp = user.get("xp", 0) + xp_earned
    new_level = calculate_level(new_xp)
    
    # Update skill scores
    skill_key = f"skills.{progress.skill_type}"
    
    update_data = {
        "$set": {
            "xp": new_xp,
            "level": new_level,
            "last_activity": datetime.now(timezone.utc).isoformat()
        },
        "$addToSet": {"completed_lessons": lesson_id},
        "$inc": {skill_key: progress.score}
    }
    
    # Check for new badges
    new_badges = []
    if new_xp >= 100 and "first_100_xp" not in user.get("badges", []):
        new_badges.append("first_100_xp")
    if new_xp >= 500 and "dedicated_learner" not in user.get("badges", []):
        new_badges.append("dedicated_learner")
    if len(user.get("completed_lessons", [])) + 1 >= 10 and "lesson_master" not in user.get("badges", []):
        new_badges.append("lesson_master")
    
    if new_badges:
        update_data["$addToSet"]["badges"] = {"$each": new_badges}
    
    await db.users.update_one({"_id": ObjectId(user_id)}, update_data)
    
    # Record progress
    await db.progress.insert_one({
        "user_id": user_id,
        "lesson_id": lesson_id,
        "skill_type": progress.skill_type,
        "score": progress.score,
        "xp_earned": xp_earned,
        "completed_at": datetime.now(timezone.utc).isoformat()
    })
    
    return {
        "message": "Lesson completed!",
        "xp_earned": xp_earned,
        "total_xp": new_xp,
        "level": new_level,
        "new_badges": new_badges
    }

# ===================
# QUIZ ENDPOINTS
# ===================

@api_router.get("/quizzes/{lesson_id}")
async def get_quiz(lesson_id: str):
    quiz = await db.quizzes.find_one({"lesson_id": lesson_id}, {"_id": 0})
    if not quiz:
        # Return default quiz if none exists
        return {
            "lesson_id": lesson_id,
            "questions": []
        }
    return quiz

@api_router.post("/quizzes/submit")
async def submit_quiz(submission: QuizSubmission, request: Request):
    user = await get_current_user(request)
    
    quiz = await db.quizzes.find_one({"lesson_id": submission.lesson_id}, {"_id": 0})
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    
    questions = quiz.get("questions", [])
    correct = 0
    total = len(questions)
    
    for i, answer in enumerate(submission.answers):
        if i < total and questions[i].get("correct_answer") == answer:
            correct += 1
    
    score = int((correct / total) * 100) if total > 0 else 0
    xp_earned = correct * 10
    
    # Update user XP
    await db.users.update_one(
        {"_id": ObjectId(user["id"])},
        {"$inc": {"xp": xp_earned}}
    )
    
    return {
        "correct": correct,
        "total": total,
        "score": score,
        "xp_earned": xp_earned
    }

# ===================
# MINI-GAMES ENDPOINTS
# ===================

@api_router.get("/games")
async def get_games():
    games = await db.games.find({}, {"_id": 0}).to_list(50)
    if not games:
        # Return default games
        return [
            {"id": "vocab-match", "name": "Vocabulary Match", "name_fr": "Correspondance de Vocabulaire", "description": "Match French words with their meanings", "type": "matching", "difficulty": ["easy", "medium", "hard"], "xp_reward": 20},
            {"id": "sentence-builder", "name": "Sentence Builder", "name_fr": "Constructeur de Phrases", "description": "Drag and drop words to form correct sentences", "type": "drag-drop", "difficulty": ["easy", "medium", "hard"], "xp_reward": 25},
            {"id": "listening-quiz", "name": "Listening Challenge", "name_fr": "Défi d'Écoute", "description": "Listen and choose the correct answer", "type": "listening", "difficulty": ["easy", "medium", "hard"], "xp_reward": 30},
            {"id": "spelling-bee", "name": "French Spelling Bee", "name_fr": "Épellation Française", "description": "Spell French words correctly", "type": "spelling", "difficulty": ["easy", "medium", "hard"], "xp_reward": 25},
            {"id": "memory-cards", "name": "Memory Cards", "name_fr": "Cartes Mémoire", "description": "Find matching pairs of French-English words", "type": "memory", "difficulty": ["easy", "medium", "hard"], "xp_reward": 15},
            {"id": "translation-race", "name": "Translation Race", "name_fr": "Course de Traduction", "description": "Translate as many words as possible in time limit", "type": "timed", "difficulty": ["easy", "medium", "hard"], "xp_reward": 35}
        ]
    return games

@api_router.post("/games/score")
async def submit_game_score(score_data: MiniGameScore, request: Request):
    user = await get_current_user(request)
    
    # Calculate XP based on score and difficulty
    difficulty_multiplier = {"easy": 1, "medium": 1.5, "hard": 2}
    base_xp = score_data.score // 10
    xp_earned = int(base_xp * difficulty_multiplier.get(score_data.difficulty, 1))
    
    await db.users.update_one(
        {"_id": ObjectId(user["id"])},
        {
            "$inc": {"xp": xp_earned},
            "$addToSet": {"completed_games": score_data.game_type}
        }
    )
    
    # Record game score
    await db.game_scores.insert_one({
        "user_id": user["id"],
        "game_type": score_data.game_type,
        "score": score_data.score,
        "time_taken": score_data.time_taken,
        "difficulty": score_data.difficulty,
        "xp_earned": xp_earned,
        "played_at": datetime.now(timezone.utc).isoformat()
    })
    
    return {"xp_earned": xp_earned, "message": "Score recorded!"}

# ===================
# AI TUTOR ENDPOINTS
# ===================

@api_router.post("/tutor/chat")
async def chat_with_tutor(chat: ChatMessage, request: Request):
    user = await get_current_user(request)
    
    if not EMERGENT_LLM_KEY:
        # Mock response when no API key
        mock_responses = [
            "Bonjour! I'm your AI French tutor. How can I help you today?",
            "That's a great question! In French, we say...",
            "Let me explain this grammar concept to you...",
            "Très bien! You're making great progress!",
            "Would you like to practice some pronunciation?",
        ]
        import random
        return {
            "response": random.choice(mock_responses),
            "session_id": chat.session_id or str(uuid.uuid4())
        }
    
    try:
        from emergentintegrations.llm.chat import LlmChat, UserMessage
        
        session_id = chat.session_id or str(uuid.uuid4())
        
        # Get chat history
        history = await db.chat_history.find(
            {"user_id": user["id"], "session_id": session_id}
        ).sort("created_at", 1).to_list(20)
        
        system_message = """You are FrenchQuest AI Tutor, a friendly and supportive French language tutor for beginners. 
        
Your role is to:
- Answer French grammar questions in simple, clear English
- Explain vocabulary with examples and pronunciation tips
- Help students practice conversations in French
- Correct mistakes gently and encouragingly
- Provide cultural context about France when relevant
- Keep responses concise but helpful
- Use both English and French in your responses
- Always encourage and motivate the student

Remember: Your students are beginners, so keep explanations simple and build their confidence!"""
        
        llm = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=session_id,
            system_message=system_message
        ).with_model("openai", "gpt-5.2")
        
        # Add history to context
        for msg in history[-10:]:
            if msg.get("role") == "user":
                await llm.send_message(UserMessage(text=msg["content"]))
        
        response = await llm.send_message(UserMessage(text=chat.message))
        
        # Save messages to history
        now = datetime.now(timezone.utc).isoformat()
        await db.chat_history.insert_many([
            {"user_id": user["id"], "session_id": session_id, "role": "user", "content": chat.message, "created_at": now},
            {"user_id": user["id"], "session_id": session_id, "role": "assistant", "content": response, "created_at": now}
        ])
        
        return {"response": response, "session_id": session_id}
        
    except Exception as e:
        logger.error(f"AI Tutor error: {str(e)}")
        return {
            "response": "Je suis désolé, I'm having trouble connecting right now. Please try again later!",
            "session_id": chat.session_id or str(uuid.uuid4())
        }

@api_router.get("/tutor/history")
async def get_chat_history(session_id: str, request: Request):
    user = await get_current_user(request)
    
    history = await db.chat_history.find(
        {"user_id": user["id"], "session_id": session_id},
        {"_id": 0}
    ).sort("created_at", 1).to_list(100)
    
    return history

# ===================
# PROGRESS & STATS
# ===================

@api_router.get("/progress/stats")
async def get_user_stats(request: Request):
    user = await get_current_user(request)
    
    # Get completion stats
    completed_lessons = len(user.get("completed_lessons", []))
    completed_games = len(user.get("completed_games", []))
    
    # Get skill breakdown
    skills = user.get("skills", {})
    
    # Calculate overall progress percentage (7 months = ~210 lessons estimate)
    total_lessons = 210
    progress_percentage = min(int((completed_lessons / total_lessons) * 100), 100)
    
    return {
        "xp": user.get("xp", 0),
        "level": user.get("level", 1),
        "level_title": get_level_title(user.get("level", 1)),
        "streak": user.get("streak", 0),
        "current_month": user.get("current_month", 1),
        "completed_lessons": completed_lessons,
        "completed_games": completed_games,
        "progress_percentage": progress_percentage,
        "skills": skills,
        "badges": user.get("badges", []),
        "next_level_xp": (user.get("level", 1)) * 100,
        "xp_to_next_level": (user.get("level", 1)) * 100 - user.get("xp", 0)
    }

@api_router.get("/leaderboard")
async def get_leaderboard(limit: int = 10):
    users = await db.users.find(
        {"role": "student"},
        {"_id": 0, "password_hash": 0, "email": 0}
    ).sort("xp", -1).limit(limit).to_list(limit)
    
    leaderboard = []
    for i, user in enumerate(users):
        leaderboard.append({
            "rank": i + 1,
            "name": user.get("name", "Anonymous"),
            "xp": user.get("xp", 0),
            "level": user.get("level", 1),
            "streak": user.get("streak", 0),
            "badges": len(user.get("badges", []))
        })
    
    return leaderboard

# ===================
# ROADMAP DATA
# ===================

@api_router.get("/roadmap")
async def get_roadmap():
    return [
        {
            "month": 1,
            "title": "Absolute Beginner Foundation",
            "title_fr": "Fondation Débutant Absolu",
            "description": "Start your French journey with the basics: alphabet, pronunciation, greetings, and essential words.",
            "topics": ["French alphabet", "Pronunciation basics", "Greetings", "Numbers 1-100", "Days & months", "Colors", "Basic classroom words"],
            "skills": {"speaking": "Basic greetings", "listening": "Sound recognition", "reading": "Simple words", "writing": "Personal details"},
            "games": ["Alphabet Sound Game", "Greeting Memory Match", "Number Challenge"],
            "color": "#3B82F6"
        },
        {
            "month": 2,
            "title": "Building Core Basics",
            "title_fr": "Construire les Bases",
            "description": "Learn essential grammar, family vocabulary, and start forming simple sentences.",
            "topics": ["Articles (le, la, les)", "Noun gender", "Être & avoir verbs", "Family vocabulary", "Food & hobbies", "Simple questions"],
            "skills": {"speaking": "Family introductions", "listening": "Short dialogues", "reading": "Simple conversations", "writing": "Basic sentences"},
            "games": ["Verb Matching", "Gender Challenge", "Family Quiz"],
            "color": "#10B981"
        },
        {
            "month": 3,
            "title": "Sentence Construction",
            "title_fr": "Construction de Phrases",
            "description": "Master present tense, sentence order, and daily routine vocabulary.",
            "topics": ["Present tense (regular verbs)", "Common irregular verbs", "Adjectives", "Negation", "Question forms", "Time expressions"],
            "skills": {"speaking": "Daily questions", "listening": "Comprehension", "reading": "Short passages", "writing": "Guided tasks"},
            "games": ["Sentence Builder", "Daily Routine Quest", "Grammar Puzzle"],
            "color": "#F59E0B"
        },
        {
            "month": 4,
            "title": "Speaking Confidence",
            "title_fr": "Confiance à l'Oral",
            "description": "Practice real-life scenarios: shopping, travel, weather, and directions.",
            "topics": ["Shopping vocabulary", "Travel phrases", "Weather", "Directions", "Ordering food", "Describing places"],
            "skills": {"speaking": "Real-life scenarios", "listening": "Practical clips", "reading": "Dialogues", "writing": "Messages"},
            "games": ["Roleplay Simulator", "Pronunciation Challenge", "Listening Detective"],
            "color": "#EF4444"
        },
        {
            "month": 5,
            "title": "Intermediate Development",
            "title_fr": "Développement Intermédiaire",
            "description": "Learn past tense, complex sentences, and paragraph writing.",
            "topics": ["Past tense (passé composé)", "Complex sentences", "Opinion expressions", "Paragraph reading", "Email writing"],
            "skills": {"speaking": "Past events", "listening": "Longer audio", "reading": "Detailed texts", "writing": "Short paragraphs"},
            "games": ["Tense Race", "Paragraph Builder", "Vocabulary Ladder"],
            "color": "#8B5CF6"
        },
        {
            "month": 6,
            "title": "Stronger Fluency",
            "title_fr": "Fluidité Renforcée",
            "description": "Develop fluency with future tense, connectors, and natural conversations.",
            "topics": ["Future expressions", "Advanced vocabulary", "Connectors", "Comparison", "Error correction", "Story understanding"],
            "skills": {"speaking": "Longer responses", "listening": "Natural French", "reading": "Stories", "writing": "Structured responses"},
            "games": ["Correction Battle", "Advanced Vocab Missions", "Fluency Timer"],
            "color": "#EC4899"
        },
        {
            "month": 7,
            "title": "Mastery & Exam Readiness",
            "title_fr": "Maîtrise et Préparation aux Examens",
            "description": "Final revision, exam practice, and real-life communication mastery.",
            "topics": ["Grammar revision", "Fluency conversations", "Exam-style listening", "Interview practice", "Essay writing", "Real-life tasks"],
            "skills": {"speaking": "Confident communication", "listening": "Full comprehension", "reading": "Test passages", "writing": "Clear essays"},
            "games": ["Final Boss Challenge", "Mastery Arena", "Exam Prep Challenge"],
            "color": "#06B6D4"
        }
    ]

# ===================
# ADMIN ENDPOINTS
# ===================

@api_router.get("/admin/stats")
async def get_admin_stats(request: Request):
    user = await get_current_user(request)
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    total_users = await db.users.count_documents({"role": "student"})
    total_lessons = await db.lessons.count_documents({})
    total_quizzes = await db.quizzes.count_documents({})
    total_games = await db.game_scores.count_documents({})
    
    # Get recent activity
    recent_progress = await db.progress.find({}, {"_id": 0}).sort("completed_at", -1).limit(10).to_list(10)
    
    # Get user growth (last 7 days)
    week_ago = datetime.now(timezone.utc) - timedelta(days=7)
    new_users_week = await db.users.count_documents({
        "created_at": {"$gte": week_ago.isoformat()}
    })
    
    # Get top performers
    top_users = await db.users.find(
        {"role": "student"},
        {"_id": 0, "password_hash": 0}
    ).sort("xp", -1).limit(5).to_list(5)
    
    return {
        "total_users": total_users,
        "total_lessons": total_lessons,
        "total_quizzes": total_quizzes,
        "total_game_plays": total_games,
        "new_users_this_week": new_users_week,
        "recent_activity": recent_progress,
        "top_performers": top_users
    }

@api_router.get("/admin/users")
async def get_all_users(request: Request, skip: int = 0, limit: int = 50):
    user = await get_current_user(request)
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    users = await db.users.find(
        {},
        {"_id": 0, "password_hash": 0}
    ).skip(skip).limit(limit).to_list(limit)
    
    total = await db.users.count_documents({})
    
    return {"users": users, "total": total}

@api_router.get("/admin/lessons")
async def get_all_lessons_admin(request: Request):
    user = await get_current_user(request)
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    lessons = await db.lessons.find({}, {"_id": 0}).sort([("month", 1), ("week", 1), ("day", 1)]).to_list(500)
    return {"lessons": lessons, "total": len(lessons)}

@api_router.post("/admin/lessons")
async def create_lesson(lesson: LessonBase, request: Request):
    user = await get_current_user(request)
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    lesson_doc = lesson.model_dump()
    lesson_doc["id"] = str(uuid.uuid4())
    lesson_doc["created_at"] = datetime.now(timezone.utc).isoformat()
    
    await db.lessons.insert_one(lesson_doc)
    return {"message": "Lesson created", "id": lesson_doc["id"]}

@api_router.put("/admin/lessons/{lesson_id}")
async def update_lesson(lesson_id: str, lesson: LessonBase, request: Request):
    user = await get_current_user(request)
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    existing = await db.lessons.find_one({"id": lesson_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Lesson not found")
    
    lesson_doc = lesson.model_dump()
    lesson_doc["updated_at"] = datetime.now(timezone.utc).isoformat()
    
    await db.lessons.update_one({"id": lesson_id}, {"$set": lesson_doc})
    return {"message": "Lesson updated", "id": lesson_id}

@api_router.delete("/admin/lessons/{lesson_id}")
async def delete_lesson(lesson_id: str, request: Request):
    user = await get_current_user(request)
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    result = await db.lessons.delete_one({"id": lesson_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Lesson not found")
    
    return {"message": "Lesson deleted", "id": lesson_id}

@api_router.get("/admin/quizzes")
async def get_all_quizzes_admin(request: Request):
    user = await get_current_user(request)
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    quizzes = await db.quizzes.find({}, {"_id": 0}).to_list(500)
    return {"quizzes": quizzes, "total": len(quizzes)}

class QuizCreate(BaseModel):
    lesson_id: str
    questions: List[Dict[str, Any]]

@api_router.post("/admin/quizzes")
async def create_quiz(quiz: QuizCreate, request: Request):
    user = await get_current_user(request)
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    existing = await db.quizzes.find_one({"lesson_id": quiz.lesson_id})
    if existing:
        await db.quizzes.update_one(
            {"lesson_id": quiz.lesson_id},
            {"$set": {"questions": quiz.questions, "updated_at": datetime.now(timezone.utc).isoformat()}}
        )
        return {"message": "Quiz updated", "lesson_id": quiz.lesson_id}
    
    quiz_doc = {
        "lesson_id": quiz.lesson_id,
        "questions": quiz.questions,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.quizzes.insert_one(quiz_doc)
    return {"message": "Quiz created", "lesson_id": quiz.lesson_id}

@api_router.post("/admin/seed-content")
async def seed_full_content(request: Request):
    """Seed all Month 1 content"""
    user = await get_current_user(request)
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    if not MONTH_1_LESSONS:
        raise HTTPException(status_code=500, detail="Content not loaded")
    
    # Clear existing Month 1 content
    await db.lessons.delete_many({"month": 1})
    
    # Insert new lessons
    for lesson in MONTH_1_LESSONS:
        lesson["created_at"] = datetime.now(timezone.utc).isoformat()
        await db.lessons.insert_one(lesson)
    
    # Insert quizzes
    for lesson_id, questions in MONTH_1_QUIZZES.items():
        await db.quizzes.update_one(
            {"lesson_id": lesson_id},
            {"$set": {"lesson_id": lesson_id, "questions": questions}},
            upsert=True
        )
    
    return {
        "message": "Content seeded successfully",
        "lessons_added": len(MONTH_1_LESSONS),
        "quizzes_added": len(MONTH_1_QUIZZES)
    }

# ===================
# DAILY CHALLENGES
# ===================

@api_router.get("/challenges/daily")
async def get_daily_challenge(request: Request):
    user = await get_current_user(request)
    
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    
    # Check if user already completed today's challenge
    existing = await db.daily_challenges.find_one({
        "user_id": user["id"],
        "date": today
    })
    
    if existing:
        return {"completed": True, "challenge": existing}
    
    # Generate daily challenge
    challenges = [
        {"type": "lesson", "goal": "Complete 1 lesson", "xp_reward": 20},
        {"type": "game", "goal": "Play 2 mini-games", "xp_reward": 15},
        {"type": "vocab", "goal": "Learn 10 new words", "xp_reward": 25},
        {"type": "speaking", "goal": "Complete 1 speaking exercise", "xp_reward": 30},
        {"type": "streak", "goal": "Maintain your streak", "xp_reward": 10}
    ]
    
    # Rotate based on day of year
    day_of_year = datetime.now(timezone.utc).timetuple().tm_yday
    daily_challenge = challenges[day_of_year % len(challenges)]
    
    return {
        "completed": False,
        "date": today,
        "challenge": daily_challenge
    }

@api_router.post("/challenges/daily/complete")
async def complete_daily_challenge(request: Request):
    user = await get_current_user(request)
    
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    
    # Check if already completed
    existing = await db.daily_challenges.find_one({
        "user_id": user["id"],
        "date": today
    })
    
    if existing:
        return {"message": "Already completed", "xp_earned": 0}
    
    # Get today's challenge XP
    day_of_year = datetime.now(timezone.utc).timetuple().tm_yday
    xp_rewards = [20, 15, 25, 30, 10]
    xp_earned = xp_rewards[day_of_year % len(xp_rewards)]
    
    # Record completion
    await db.daily_challenges.insert_one({
        "user_id": user["id"],
        "date": today,
        "completed_at": datetime.now(timezone.utc).isoformat(),
        "xp_earned": xp_earned
    })
    
    # Update user XP
    await db.users.update_one(
        {"_id": ObjectId(user["id"])},
        {"$inc": {"xp": xp_earned}}
    )
    
    return {"message": "Challenge completed!", "xp_earned": xp_earned}

# ===================
# HEALTH & ROOT
# ===================

@api_router.get("/")
async def root():
    return {"message": "Welcome to FrenchQuest API", "version": "1.0.0"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}

# Include the router
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Set-Cookie"],
)

# ===================
# STARTUP EVENTS
# ===================

@app.on_event("startup")
async def startup_event():
    # Create indexes
    await db.users.create_index("email", unique=True)
    await db.lessons.create_index([("month", 1), ("week", 1), ("day", 1)])
    await db.progress.create_index([("user_id", 1), ("lesson_id", 1)])
    await db.chat_history.create_index([("user_id", 1), ("session_id", 1)])
    
    # Seed admin user
    admin_exists = await db.users.find_one({"email": ADMIN_EMAIL})
    if not admin_exists:
        admin_doc = {
            "email": ADMIN_EMAIL,
            "name": "Admin",
            "password_hash": hash_password(ADMIN_PASSWORD),
            "role": "admin",
            "xp": 0,
            "level": 1,
            "streak": 0,
            "current_month": 1,
            "badges": ["admin"],
            "skills": {},
            "completed_lessons": [],
            "completed_games": [],
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        await db.users.insert_one(admin_doc)
        logger.info("Admin user created")
    
    # Seed sample lessons
    lesson_count = await db.lessons.count_documents({})
    if lesson_count == 0:
        sample_lessons = [
            {
                "id": "m1w1d1",
                "month": 1,
                "week": 1,
                "day": 1,
                "title": "The French Alphabet",
                "title_fr": "L'alphabet français",
                "description": "Learn to recognize and pronounce all 26 letters of the French alphabet.",
                "skill_focus": ["pronunciation", "listening"],
                "vocabulary": [
                    {"french": "A", "pronunciation": "ah", "example": "ami (friend)"},
                    {"french": "B", "pronunciation": "bay", "example": "bébé (baby)"},
                    {"french": "C", "pronunciation": "say", "example": "café (coffee)"},
                    {"french": "D", "pronunciation": "day", "example": "danse (dance)"},
                    {"french": "E", "pronunciation": "euh", "example": "école (school)"}
                ],
                "grammar_points": ["French letters have unique sounds", "Some letters sound different than English"],
                "content": {
                    "intro": "Welcome to your first French lesson! Today we'll learn the French alphabet.",
                    "main_text": "The French alphabet has the same 26 letters as English, but they sound different!",
                    "audio_available": True
                },
                "xp_reward": 20,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": "m1w1d2",
                "month": 1,
                "week": 1,
                "day": 2,
                "title": "Greetings & Polite Expressions",
                "title_fr": "Salutations et expressions polies",
                "description": "Learn how to greet people and use polite expressions in French.",
                "skill_focus": ["speaking", "listening"],
                "vocabulary": [
                    {"french": "Bonjour", "english": "Hello/Good day", "pronunciation": "bohn-zhoor"},
                    {"french": "Bonsoir", "english": "Good evening", "pronunciation": "bohn-swahr"},
                    {"french": "Salut", "english": "Hi (informal)", "pronunciation": "sah-loo"},
                    {"french": "Au revoir", "english": "Goodbye", "pronunciation": "oh ruh-vwahr"},
                    {"french": "Merci", "english": "Thank you", "pronunciation": "mehr-see"},
                    {"french": "S'il vous plaît", "english": "Please", "pronunciation": "seel voo pleh"}
                ],
                "grammar_points": ["Use 'Bonjour' during the day", "Use 'Bonsoir' in the evening", "'Salut' is informal"],
                "content": {
                    "intro": "Being polite is very important in French culture. Let's learn essential greetings!",
                    "main_text": "French people greet each other throughout the day. 'Bonjour' is the most common greeting.",
                    "audio_available": True
                },
                "xp_reward": 25,
                "created_at": datetime.now(timezone.utc).isoformat()
            },
            {
                "id": "m1w1d3",
                "month": 1,
                "week": 1,
                "day": 3,
                "title": "Numbers 1-20",
                "title_fr": "Les nombres 1-20",
                "description": "Master counting from 1 to 20 in French.",
                "skill_focus": ["speaking", "vocabulary"],
                "vocabulary": [
                    {"french": "un", "english": "1", "pronunciation": "uhn"},
                    {"french": "deux", "english": "2", "pronunciation": "duh"},
                    {"french": "trois", "english": "3", "pronunciation": "twah"},
                    {"french": "quatre", "english": "4", "pronunciation": "katr"},
                    {"french": "cinq", "english": "5", "pronunciation": "sank"},
                    {"french": "six", "english": "6", "pronunciation": "sees"},
                    {"french": "sept", "english": "7", "pronunciation": "set"},
                    {"french": "huit", "english": "8", "pronunciation": "weet"},
                    {"french": "neuf", "english": "9", "pronunciation": "nuhf"},
                    {"french": "dix", "english": "10", "pronunciation": "dees"}
                ],
                "grammar_points": ["Numbers are essential for daily life", "Practice counting out loud"],
                "content": {
                    "intro": "Numbers are used everywhere - shopping, telling time, and more!",
                    "main_text": "Let's learn to count in French. Pay attention to the pronunciation!",
                    "audio_available": True
                },
                "xp_reward": 25,
                "created_at": datetime.now(timezone.utc).isoformat()
            }
        ]
        await db.lessons.insert_many(sample_lessons)
        logger.info("Sample lessons created")
    
    # Seed sample quizzes
    quiz_count = await db.quizzes.count_documents({})
    if quiz_count == 0:
        sample_quizzes = [
            {
                "lesson_id": "m1w1d1",
                "questions": [
                    {"question": "How do you pronounce 'E' in French?", "options": ["ee", "euh", "ay", "oh"], "correct_answer": 1, "explanation": "In French, 'E' is pronounced 'euh'", "skill_type": "pronunciation"},
                    {"question": "What sound does 'C' make in French?", "options": ["kuh", "say", "see", "chuh"], "correct_answer": 1, "explanation": "'C' in French sounds like 'say'", "skill_type": "pronunciation"}
                ]
            },
            {
                "lesson_id": "m1w1d2",
                "questions": [
                    {"question": "What does 'Bonjour' mean?", "options": ["Goodbye", "Hello/Good day", "Thank you", "Please"], "correct_answer": 1, "explanation": "'Bonjour' means 'Hello' or 'Good day'", "skill_type": "vocabulary"},
                    {"question": "Which greeting is informal?", "options": ["Bonjour", "Bonsoir", "Salut", "Au revoir"], "correct_answer": 2, "explanation": "'Salut' is the informal way to say hi", "skill_type": "vocabulary"},
                    {"question": "How do you say 'Thank you' in French?", "options": ["Bonjour", "Merci", "Salut", "S'il vous plaît"], "correct_answer": 1, "explanation": "'Merci' means 'Thank you'", "skill_type": "vocabulary"}
                ]
            }
        ]
        await db.quizzes.insert_many(sample_quizzes)
        logger.info("Sample quizzes created")
    
    # Write test credentials
    import os
    os.makedirs("/app/memory", exist_ok=True)
    with open("/app/memory/test_credentials.md", "w") as f:
        f.write(f"""# FrenchQuest Test Credentials

## Admin Account
- Email: {ADMIN_EMAIL}
- Password: {ADMIN_PASSWORD}
- Role: admin

## Test User (create via registration)
- Email: student@test.com
- Password: test123
- Role: student

## Auth Endpoints
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me
""")
    
    logger.info("FrenchQuest API started successfully!")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
