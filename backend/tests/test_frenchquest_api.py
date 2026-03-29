#!/usr/bin/env python3
"""
FrenchQuest Backend API Tests - Pytest Version
Tests all backend endpoints including auth, lessons, games, AI tutor, TTS, and admin
"""

import pytest
import requests
import os
from datetime import datetime

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Test credentials from /app/memory/test_credentials.md
ADMIN_EMAIL = "admin@frenchquest.com"
ADMIN_PASSWORD = "admin123"


@pytest.fixture(scope="module")
def api_client():
    """Shared requests session"""
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})
    return session


@pytest.fixture(scope="module")
def admin_auth(api_client):
    """Login as admin and return token"""
    response = api_client.post(f"{BASE_URL}/api/auth/login", json={
        "email": ADMIN_EMAIL,
        "password": ADMIN_PASSWORD
    })
    if response.status_code == 200:
        data = response.json()
        return data.get("access_token")
    pytest.skip("Admin authentication failed")


@pytest.fixture(scope="module")
def student_auth(api_client):
    """Register a new student and return token"""
    timestamp = datetime.now().strftime("%H%M%S%f")
    response = api_client.post(f"{BASE_URL}/api/auth/register", json={
        "name": f"TEST_Student_{timestamp}",
        "email": f"TEST_student_{timestamp}@test.com",
        "password": "test123456"
    })
    if response.status_code == 200:
        data = response.json()
        return data.get("access_token")
    pytest.skip("Student registration failed")


@pytest.fixture
def admin_headers(admin_auth):
    """Headers with admin auth token"""
    return {"Authorization": f"Bearer {admin_auth}"}


@pytest.fixture
def student_headers(student_auth):
    """Headers with student auth token"""
    return {"Authorization": f"Bearer {student_auth}"}


# ===================
# HEALTH & ROOT TESTS
# ===================

class TestHealthEndpoints:
    """Health and root endpoint tests"""
    
    def test_health_check(self, api_client):
        """Test /api/health returns healthy status"""
        response = api_client.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "timestamp" in data
        print(f"Health check passed: {data}")
    
    def test_root_api(self, api_client):
        """Test /api/ returns welcome message"""
        response = api_client.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "FrenchQuest" in data["message"]
        print(f"Root API passed: {data}")


# ===================
# AUTH TESTS
# ===================

class TestAuthentication:
    """Authentication endpoint tests"""
    
    def test_admin_login_success(self, api_client):
        """Test admin login with correct credentials"""
        response = api_client.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        })
        assert response.status_code == 200
        data = response.json()
        assert data["email"] == ADMIN_EMAIL
        assert data["role"] == "admin"
        assert "access_token" in data
        assert len(data["access_token"]) > 0
        print(f"Admin login passed: role={data['role']}, name={data['name']}")
    
    def test_login_invalid_credentials(self, api_client):
        """Test login with wrong password"""
        response = api_client.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": "wrongpassword"
        })
        assert response.status_code == 401
        data = response.json()
        assert "detail" in data
        print(f"Invalid login correctly rejected: {data['detail']}")
    
    def test_register_new_user(self, api_client):
        """Test user registration"""
        timestamp = datetime.now().strftime("%H%M%S%f")
        response = api_client.post(f"{BASE_URL}/api/auth/register", json={
            "name": f"TEST_NewUser_{timestamp}",
            "email": f"TEST_newuser_{timestamp}@test.com",
            "password": "test123456"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["role"] == "student"
        assert data["xp"] == 0
        assert data["level"] == 1
        assert "access_token" in data
        print(f"Registration passed: name={data['name']}, badges={data['badges']}")
    
    def test_register_duplicate_email(self, api_client):
        """Test registration with existing email fails"""
        response = api_client.post(f"{BASE_URL}/api/auth/register", json={
            "name": "Duplicate User",
            "email": ADMIN_EMAIL,
            "password": "test123456"
        })
        assert response.status_code == 400
        data = response.json()
        assert "already registered" in data["detail"].lower()
        print(f"Duplicate email correctly rejected: {data['detail']}")
    
    def test_auth_me_with_token(self, api_client, student_headers):
        """Test /api/auth/me returns current user"""
        response = api_client.get(f"{BASE_URL}/api/auth/me", headers=student_headers)
        assert response.status_code == 200
        data = response.json()
        assert "email" in data
        assert "name" in data
        assert "xp" in data
        print(f"Auth me passed: email={data['email']}, xp={data['xp']}")
    
    def test_auth_me_without_token(self, api_client):
        """Test /api/auth/me without token returns 401"""
        response = api_client.get(f"{BASE_URL}/api/auth/me")
        assert response.status_code == 401
        print("Auth me without token correctly rejected")
    
    def test_logout(self, api_client, student_headers):
        """Test logout endpoint"""
        response = api_client.post(f"{BASE_URL}/api/auth/logout", headers=student_headers)
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        print(f"Logout passed: {data['message']}")


# ===================
# LESSONS TESTS
# ===================

class TestLessons:
    """Lesson endpoint tests"""
    
    def test_get_all_lessons(self, api_client):
        """Test /api/lessons returns lesson list"""
        response = api_client.get(f"{BASE_URL}/api/lessons")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0
        # Verify lesson structure
        first_lesson = data[0]
        assert "id" in first_lesson
        assert "title" in first_lesson
        assert "month" in first_lesson
        print(f"Lessons list passed: {len(data)} lessons, first={first_lesson['title']}")
    
    def test_get_lessons_by_month(self, api_client):
        """Test /api/lessons?month=1 filters by month"""
        response = api_client.get(f"{BASE_URL}/api/lessons?month=1")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        for lesson in data:
            assert lesson["month"] == 1
        print(f"Lessons by month passed: {len(data)} lessons in month 1")
    
    def test_get_lesson_detail(self, api_client):
        """Test /api/lessons/{lesson_id} returns lesson detail"""
        # First get a lesson ID
        lessons_response = api_client.get(f"{BASE_URL}/api/lessons")
        lessons = lessons_response.json()
        if len(lessons) == 0:
            pytest.skip("No lessons available")
        
        lesson_id = lessons[0]["id"]
        response = api_client.get(f"{BASE_URL}/api/lessons/{lesson_id}")
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == lesson_id
        assert "vocabulary" in data
        assert "content" in data
        print(f"Lesson detail passed: {data['title']}, vocab count={len(data.get('vocabulary', []))}")
    
    def test_get_nonexistent_lesson(self, api_client):
        """Test /api/lessons/{invalid_id} returns 404"""
        response = api_client.get(f"{BASE_URL}/api/lessons/nonexistent-lesson-id")
        assert response.status_code == 404
        print("Nonexistent lesson correctly returns 404")


# ===================
# GAMES TESTS
# ===================

class TestGames:
    """Games endpoint tests"""
    
    def test_get_games_list(self, api_client):
        """Test /api/games returns games list"""
        response = api_client.get(f"{BASE_URL}/api/games")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) >= 5  # Should have at least 5 games
        
        # Verify game structure
        game_names = [g["name"] for g in data]
        print(f"Games list passed: {len(data)} games - {game_names}")
        
        # Check for expected games
        expected_games = ["Memory Cards", "Translation Race", "Spelling Bee"]
        for expected in expected_games:
            assert any(expected in name for name in game_names), f"Missing game: {expected}"
    
    def test_submit_game_score(self, api_client, student_headers):
        """Test /api/games/score submits score"""
        response = api_client.post(f"{BASE_URL}/api/games/score", 
            headers=student_headers,
            json={
                "game_type": "memory-cards",
                "score": 100,
                "time_taken": 60,
                "difficulty": "easy"
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert "xp_earned" in data
        assert data["xp_earned"] >= 0
        print(f"Game score submitted: xp_earned={data['xp_earned']}")


# ===================
# AI TUTOR TESTS
# ===================

class TestAITutor:
    """AI Tutor endpoint tests"""
    
    def test_tutor_chat(self, api_client, student_headers):
        """Test /api/tutor/chat returns AI response"""
        response = api_client.post(f"{BASE_URL}/api/tutor/chat",
            headers=student_headers,
            json={
                "message": "How do I say hello in French?",
                "session_id": "test-session-pytest"
            },
            timeout=30  # AI responses may take longer
        )
        assert response.status_code == 200
        data = response.json()
        assert "response" in data
        assert len(data["response"]) > 0
        assert "session_id" in data
        print(f"AI Tutor chat passed: response length={len(data['response'])}")
    
    def test_tutor_chat_without_auth(self, api_client):
        """Test /api/tutor/chat without auth returns 401"""
        response = api_client.post(f"{BASE_URL}/api/tutor/chat",
            json={"message": "Hello"}
        )
        assert response.status_code == 401
        print("AI Tutor without auth correctly rejected")


# ===================
# TTS TESTS
# ===================

class TestTTS:
    """Text-to-Speech endpoint tests"""
    
    def test_tts_generate(self, api_client, student_headers):
        """Test /api/tts/generate returns audio"""
        response = api_client.post(f"{BASE_URL}/api/tts/generate",
            headers=student_headers,
            json={
                "text": "Bonjour, comment allez-vous?",
                "voice": "nova",
                "speed": 0.9
            },
            timeout=30
        )
        assert response.status_code == 200
        data = response.json()
        assert "audio_base64" in data
        assert len(data["audio_base64"]) > 100  # Should have substantial audio data
        print(f"TTS generate passed: audio length={len(data['audio_base64'])}, cached={data.get('cached', False)}")
    
    def test_tts_without_auth(self, api_client):
        """Test /api/tts/generate without auth returns 401"""
        response = api_client.post(f"{BASE_URL}/api/tts/generate",
            json={"text": "Bonjour"}
        )
        assert response.status_code == 401
        print("TTS without auth correctly rejected")
    
    def test_tts_text_too_long(self, api_client, student_headers):
        """Test /api/tts/generate with text > 500 chars returns 400"""
        long_text = "Bonjour " * 100  # > 500 chars
        response = api_client.post(f"{BASE_URL}/api/tts/generate",
            headers=student_headers,
            json={"text": long_text}
        )
        assert response.status_code == 400
        data = response.json()
        assert "too long" in data["detail"].lower()
        print("TTS text too long correctly rejected")


# ===================
# PROGRESS & STATS TESTS
# ===================

class TestProgressStats:
    """Progress and stats endpoint tests"""
    
    def test_get_progress_stats(self, api_client, student_headers):
        """Test /api/progress/stats returns user stats"""
        response = api_client.get(f"{BASE_URL}/api/progress/stats", headers=student_headers)
        assert response.status_code == 200
        data = response.json()
        assert "xp" in data
        assert "level" in data
        assert "streak" in data
        assert "skills" in data
        assert "badges" in data
        print(f"Progress stats passed: xp={data['xp']}, level={data['level']}, streak={data['streak']}")
    
    def test_leaderboard(self, api_client):
        """Test /api/leaderboard returns rankings"""
        response = api_client.get(f"{BASE_URL}/api/leaderboard?limit=10")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        if len(data) > 0:
            first = data[0]
            assert "rank" in first
            assert "name" in first
            assert "xp" in first
            assert first["rank"] == 1
        print(f"Leaderboard passed: {len(data)} players")


# ===================
# ROADMAP TESTS
# ===================

class TestRoadmap:
    """Roadmap endpoint tests"""
    
    def test_get_roadmap(self, api_client):
        """Test /api/roadmap returns 7 months"""
        response = api_client.get(f"{BASE_URL}/api/roadmap")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) == 7  # 7 months curriculum
        
        # Verify structure
        for i, month in enumerate(data):
            assert month["month"] == i + 1
            assert "title" in month
            assert "title_fr" in month
            assert "topics" in month
            assert "skills" in month
        
        print(f"Roadmap passed: {len(data)} months, titles={[m['title'] for m in data]}")


# ===================
# ADMIN TESTS
# ===================

class TestAdmin:
    """Admin endpoint tests"""
    
    def test_admin_stats(self, api_client, admin_headers):
        """Test /api/admin/stats returns admin statistics"""
        response = api_client.get(f"{BASE_URL}/api/admin/stats", headers=admin_headers)
        assert response.status_code == 200
        data = response.json()
        assert "total_users" in data
        assert "total_lessons" in data
        assert "total_quizzes" in data
        print(f"Admin stats passed: users={data['total_users']}, lessons={data['total_lessons']}")
    
    def test_admin_stats_without_admin_role(self, api_client, student_headers):
        """Test /api/admin/stats with student role returns 403"""
        response = api_client.get(f"{BASE_URL}/api/admin/stats", headers=student_headers)
        assert response.status_code == 403
        print("Admin stats correctly rejected for non-admin")
    
    def test_admin_users_list(self, api_client, admin_headers):
        """Test /api/admin/users returns user list"""
        response = api_client.get(f"{BASE_URL}/api/admin/users", headers=admin_headers)
        assert response.status_code == 200
        data = response.json()
        assert "users" in data
        assert "total" in data
        assert isinstance(data["users"], list)
        print(f"Admin users list passed: total={data['total']}")
    
    def test_admin_lessons_list(self, api_client, admin_headers):
        """Test /api/admin/lessons returns lesson list"""
        response = api_client.get(f"{BASE_URL}/api/admin/lessons", headers=admin_headers)
        assert response.status_code == 200
        data = response.json()
        assert "lessons" in data
        assert "total" in data
        print(f"Admin lessons list passed: total={data['total']}")


# ===================
# QUIZ TESTS
# ===================

class TestQuizzes:
    """Quiz endpoint tests"""
    
    def test_get_quiz(self, api_client):
        """Test /api/quizzes/{lesson_id} returns quiz"""
        # Get a lesson ID first
        lessons_response = api_client.get(f"{BASE_URL}/api/lessons")
        lessons = lessons_response.json()
        if len(lessons) == 0:
            pytest.skip("No lessons available")
        
        lesson_id = lessons[0]["id"]
        response = api_client.get(f"{BASE_URL}/api/quizzes/{lesson_id}")
        assert response.status_code == 200
        data = response.json()
        assert "lesson_id" in data
        assert "questions" in data
        print(f"Quiz get passed: lesson_id={data['lesson_id']}, questions={len(data['questions'])}")


# ===================
# DAILY CHALLENGES TESTS
# ===================

class TestDailyChallenges:
    """Daily challenges endpoint tests"""
    
    def test_get_daily_challenge(self, api_client, student_headers):
        """Test /api/challenges/daily returns challenge"""
        response = api_client.get(f"{BASE_URL}/api/challenges/daily", headers=student_headers)
        assert response.status_code == 200
        data = response.json()
        assert "completed" in data
        if not data["completed"]:
            assert "challenge" in data
            assert "goal" in data["challenge"]
            assert "xp_reward" in data["challenge"]
        print(f"Daily challenge passed: completed={data['completed']}")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
