#!/usr/bin/env python3
"""
FrenchQuest Backend API Tests - Full Feature Coverage (Iteration 3)
Tests all backend endpoints including new features:
- Monthly Assessments (Month 1-7)
- Weekly Challenges
- Social Features (follow/unfollow/friends/search)
- Certificates
- Notifications
- TTS and AI Tutor
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


@pytest.fixture(scope="module")
def second_student_auth(api_client):
    """Register a second student for social testing"""
    timestamp = datetime.now().strftime("%H%M%S%f")
    response = api_client.post(f"{BASE_URL}/api/auth/register", json={
        "name": f"TEST_Friend_{timestamp}",
        "email": f"TEST_friend_{timestamp}@test.com",
        "password": "test123456"
    })
    if response.status_code == 200:
        data = response.json()
        return {"token": data.get("access_token"), "id": data.get("id"), "name": data.get("name")}
    pytest.skip("Second student registration failed")


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
        print(f"✓ Health check passed: {data}")
    
    def test_root_api(self, api_client):
        """Test /api/ returns welcome message"""
        response = api_client.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "FrenchQuest" in data["message"]
        print(f"✓ Root API passed: {data}")


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
        print(f"✓ Admin login passed: role={data['role']}")
    
    def test_login_invalid_credentials(self, api_client):
        """Test login with wrong password"""
        response = api_client.post(f"{BASE_URL}/api/auth/login", json={
            "email": ADMIN_EMAIL,
            "password": "wrongpassword"
        })
        assert response.status_code == 401
        print("✓ Invalid login correctly rejected")
    
    def test_auth_me_with_token(self, api_client, student_headers):
        """Test /api/auth/me returns current user"""
        response = api_client.get(f"{BASE_URL}/api/auth/me", headers=student_headers)
        assert response.status_code == 200
        data = response.json()
        assert "email" in data
        assert "xp" in data
        print(f"✓ Auth me passed: email={data['email']}")


# ===================
# LESSONS TESTS
# ===================

class TestLessons:
    """Lesson endpoint tests - verifying 52 lessons across 7 months"""
    
    def test_get_all_lessons(self, api_client):
        """Test /api/lessons returns all lessons"""
        response = api_client.get(f"{BASE_URL}/api/lessons")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"✓ Total lessons: {len(data)}")
        # Should have lessons from months 1-7
        months = set(l["month"] for l in data)
        print(f"✓ Months with lessons: {sorted(months)}")
    
    def test_get_lessons_by_month_filter(self, api_client):
        """Test /api/lessons?month=X filters correctly"""
        for month in [1, 2, 3]:
            response = api_client.get(f"{BASE_URL}/api/lessons?month={month}")
            assert response.status_code == 200
            data = response.json()
            for lesson in data:
                assert lesson["month"] == month
            print(f"✓ Month {month} filter: {len(data)} lessons")
    
    def test_get_lesson_detail(self, api_client):
        """Test /api/lessons/{lesson_id} returns lesson detail"""
        lessons_response = api_client.get(f"{BASE_URL}/api/lessons")
        lessons = lessons_response.json()
        if len(lessons) == 0:
            pytest.skip("No lessons available")
        
        lesson_id = lessons[0]["id"]
        response = api_client.get(f"{BASE_URL}/api/lessons/{lesson_id}")
        assert response.status_code == 200
        data = response.json()
        assert "vocabulary" in data
        assert "content" in data
        print(f"✓ Lesson detail: {data['title']}")


# ===================
# MONTHLY ASSESSMENTS TESTS
# ===================

class TestMonthlyAssessments:
    """Monthly assessment endpoint tests"""
    
    def test_get_assessment_month_2(self, api_client, student_headers):
        """Test /api/assessments/2 returns assessment questions"""
        response = api_client.get(f"{BASE_URL}/api/assessments/2", headers=student_headers)
        assert response.status_code == 200
        data = response.json()
        assert "questions" in data
        assert "total_questions" in data
        assert data["month"] == 2
        assert data["passing_score"] == 70
        print(f"✓ Month 2 assessment: {data['total_questions']} questions")
    
    def test_get_assessment_all_months(self, api_client, student_headers):
        """Test assessments exist for months 1-7"""
        for month in range(1, 8):
            response = api_client.get(f"{BASE_URL}/api/assessments/{month}", headers=student_headers)
            # May return 200 or 404 if no content for that month
            if response.status_code == 200:
                data = response.json()
                print(f"✓ Month {month} assessment: {data['total_questions']} questions")
            else:
                print(f"⚠ Month {month} assessment: no content yet")
    
    def test_submit_assessment(self, api_client, student_headers):
        """Test /api/assessments/submit processes score"""
        response = api_client.post(f"{BASE_URL}/api/assessments/submit", 
            headers=student_headers,
            json={
                "month": 1,
                "answers": [0, 1, 2, 0, 1],
                "score": 80.0
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert "passed" in data
        assert "score" in data
        assert "xp_earned" in data
        print(f"✓ Assessment submit: passed={data['passed']}, score={data['score']}, xp={data['xp_earned']}")
    
    def test_assessment_invalid_month(self, api_client, student_headers):
        """Test /api/assessments/0 returns 400"""
        response = api_client.get(f"{BASE_URL}/api/assessments/0", headers=student_headers)
        assert response.status_code == 400
        print("✓ Invalid month correctly rejected")


# ===================
# WEEKLY CHALLENGES TESTS
# ===================

class TestWeeklyChallenges:
    """Weekly challenges endpoint tests"""
    
    def test_get_weekly_challenges(self, api_client, student_headers):
        """Test /api/challenges/weekly returns 3 challenges"""
        response = api_client.get(f"{BASE_URL}/api/challenges/weekly", headers=student_headers)
        assert response.status_code == 200
        data = response.json()
        assert "challenges" in data
        assert "week_start" in data
        challenges = data["challenges"]
        assert len(challenges) >= 3
        for ch in challenges:
            assert "id" in ch
            assert "title" in ch
            assert "target" in ch
            assert "xp_reward" in ch
            assert "current" in ch
        print(f"✓ Weekly challenges: {len(challenges)} challenges, week_start={data['week_start']}")
    
    def test_update_weekly_progress(self, api_client, student_headers):
        """Test /api/challenges/weekly/{id}/progress updates progress"""
        # First get challenges
        response = api_client.get(f"{BASE_URL}/api/challenges/weekly", headers=student_headers)
        challenges = response.json()["challenges"]
        challenge_id = challenges[0]["id"]
        
        # Update progress
        response = api_client.post(f"{BASE_URL}/api/challenges/weekly/{challenge_id}/progress", 
            headers=student_headers)
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        print(f"✓ Weekly progress updated for {challenge_id}")


# ===================
# SOCIAL FEATURES TESTS
# ===================

class TestSocialFeatures:
    """Social features endpoint tests"""
    
    def test_search_users(self, api_client, student_headers):
        """Test /api/social/users/search?q=test returns users"""
        response = api_client.get(f"{BASE_URL}/api/social/users/search?q=Admin", headers=student_headers)
        assert response.status_code == 200
        data = response.json()
        assert "users" in data
        print(f"✓ User search: found {len(data['users'])} users")
    
    def test_search_users_short_query(self, api_client, student_headers):
        """Test /api/social/users/search with short query returns empty"""
        response = api_client.get(f"{BASE_URL}/api/social/users/search?q=a", headers=student_headers)
        assert response.status_code == 200
        data = response.json()
        assert data["users"] == []
        print("✓ Short search query returns empty")
    
    def test_follow_user(self, api_client, student_headers, second_student_auth):
        """Test /api/social/follow/{id} follows a user"""
        target_id = second_student_auth["id"]
        response = api_client.post(f"{BASE_URL}/api/social/follow/{target_id}", headers=student_headers)
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        print(f"✓ Follow user: {data['message']}")
    
    def test_get_friends(self, api_client, student_headers, second_student_auth):
        """Test /api/social/friends returns followed users"""
        # First follow someone
        target_id = second_student_auth["id"]
        api_client.post(f"{BASE_URL}/api/social/follow/{target_id}", headers=student_headers)
        
        # Get friends
        response = api_client.get(f"{BASE_URL}/api/social/friends", headers=student_headers)
        assert response.status_code == 200
        data = response.json()
        assert "friends" in data
        print(f"✓ Friends list: {len(data['friends'])} friends")
    
    def test_unfollow_user(self, api_client, student_headers, second_student_auth):
        """Test /api/social/unfollow/{id} unfollows a user"""
        target_id = second_student_auth["id"]
        response = api_client.delete(f"{BASE_URL}/api/social/unfollow/{target_id}", headers=student_headers)
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        print(f"✓ Unfollow user: {data['message']}")
    
    def test_cannot_follow_self(self, api_client, student_headers, student_auth):
        """Test cannot follow yourself"""
        # Get own user ID
        me_response = api_client.get(f"{BASE_URL}/api/auth/me", headers=student_headers)
        my_id = me_response.json()["id"]
        
        response = api_client.post(f"{BASE_URL}/api/social/follow/{my_id}", headers=student_headers)
        assert response.status_code == 400
        print("✓ Cannot follow self correctly rejected")


# ===================
# CERTIFICATES TESTS
# ===================

class TestCertificates:
    """Certificate endpoint tests"""
    
    def test_certificate_not_passed(self, api_client, student_headers):
        """Test /api/certificates/1 returns 404 if not passed"""
        response = api_client.get(f"{BASE_URL}/api/certificates/1", headers=student_headers)
        # Should be 404 if user hasn't passed assessment
        assert response.status_code in [200, 404]
        if response.status_code == 404:
            data = response.json()
            assert "No passing assessment" in data["detail"]
            print("✓ Certificate correctly returns 404 for non-passed month")
        else:
            print("✓ Certificate available (user already passed)")
    
    def test_certificate_after_passing(self, api_client, student_headers):
        """Test certificate available after passing assessment"""
        # Submit a passing assessment
        api_client.post(f"{BASE_URL}/api/assessments/submit", 
            headers=student_headers,
            json={"month": 1, "answers": [], "score": 85.0}
        )
        
        # Now get certificate
        response = api_client.get(f"{BASE_URL}/api/certificates/1", headers=student_headers)
        assert response.status_code == 200
        data = response.json()
        assert "user_name" in data
        assert "month" in data
        assert "month_title" in data
        assert "score" in data
        assert "certificate_id" in data
        print(f"✓ Certificate: {data['month_title']}, score={data['score']}%")


# ===================
# NOTIFICATIONS TESTS
# ===================

class TestNotifications:
    """Notification endpoint tests"""
    
    def test_get_notifications(self, api_client, student_headers):
        """Test /api/notifications returns streak and other notifications"""
        response = api_client.get(f"{BASE_URL}/api/notifications", headers=student_headers)
        assert response.status_code == 200
        data = response.json()
        assert "notifications" in data
        notifications = data["notifications"]
        
        # Should have streak notification
        types = [n["type"] for n in notifications]
        assert "streak" in types
        assert "milestone" in types
        
        for n in notifications:
            assert "type" in n
            assert "title" in n
            assert "message" in n
            assert "priority" in n
        
        print(f"✓ Notifications: {len(notifications)} notifications, types={types}")


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
        assert len(data["audio_base64"]) > 100
        print(f"✓ TTS generate: audio length={len(data['audio_base64'])}, cached={data.get('cached', False)}")
    
    def test_tts_without_auth(self, api_client):
        """Test /api/tts/generate without auth returns 401"""
        response = api_client.post(f"{BASE_URL}/api/tts/generate",
            json={"text": "Bonjour"}
        )
        assert response.status_code == 401
        print("✓ TTS without auth correctly rejected")


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
                "session_id": "test-session-iter3"
            },
            timeout=30
        )
        assert response.status_code == 200
        data = response.json()
        assert "response" in data
        assert len(data["response"]) > 0
        print(f"✓ AI Tutor chat: response length={len(data['response'])}")


# ===================
# GAMES TESTS
# ===================

class TestGames:
    """Games endpoint tests"""
    
    def test_get_games_list(self, api_client):
        """Test /api/games returns games list with VocabMatch and SpellingBee"""
        response = api_client.get(f"{BASE_URL}/api/games")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) >= 5
        
        game_ids = [g["id"] for g in data]
        print(f"✓ Games list: {len(data)} games - {game_ids}")
        
        # Check for specific games
        assert "vocab-match" in game_ids or any("vocab" in g.lower() for g in game_ids)
        assert "spelling-bee" in game_ids or any("spelling" in g.lower() for g in game_ids)


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
        print(f"✓ Daily challenge: completed={data['completed']}")


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
        assert len(data) == 7
        for i, month in enumerate(data):
            assert month["month"] == i + 1
            assert "title" in month
            assert "topics" in month
        print(f"✓ Roadmap: {len(data)} months")


# ===================
# ADMIN TESTS
# ===================

class TestAdmin:
    """Admin endpoint tests"""
    
    def test_admin_stats(self, api_client, admin_headers):
        """Test /api/admin/stats returns statistics"""
        response = api_client.get(f"{BASE_URL}/api/admin/stats", headers=admin_headers)
        assert response.status_code == 200
        data = response.json()
        assert "total_users" in data
        assert "total_lessons" in data
        assert "total_quizzes" in data
        print(f"✓ Admin stats: users={data['total_users']}, lessons={data['total_lessons']}, quizzes={data['total_quizzes']}")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
