#!/usr/bin/env python3
"""
FrenchQuest Backend API Testing Script
Tests all backend endpoints for functionality and integration
"""

import requests
import sys
import json
from datetime import datetime

class FrenchQuestAPITester:
    def __init__(self, base_url="https://bonjour-master.preview.emergentagent.com"):
        self.base_url = base_url
        self.session = requests.Session()
        self.admin_token = None
        self.student_token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def log_test(self, name, success, details=""):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name}")
        else:
            print(f"❌ {name} - {details}")
            self.failed_tests.append({"test": name, "error": details})

    def test_health_endpoint(self):
        """Test basic health endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/api/health", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                details += f", Response: {data.get('status', 'unknown')}"
            self.log_test("Health Check", success, details)
            return success
        except Exception as e:
            self.log_test("Health Check", False, str(e))
            return False

    def test_root_endpoint(self):
        """Test root API endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/api/", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            if success:
                data = response.json()
                details += f", Message: {data.get('message', 'unknown')}"
            self.log_test("Root API", success, details)
            return success
        except Exception as e:
            self.log_test("Root API", False, str(e))
            return False

    def test_admin_login(self):
        """Test admin login"""
        try:
            login_data = {
                "email": "admin@frenchquest.com",
                "password": "admin123"
            }
            response = self.session.post(
                f"{self.base_url}/api/auth/login",
                json=login_data,
                timeout=10
            )
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                data = response.json()
                details += f", User: {data.get('name', 'unknown')}, Role: {data.get('role', 'unknown')}"
                # Store cookies for future requests
                self.admin_token = True
            else:
                try:
                    error_data = response.json()
                    details += f", Error: {error_data.get('detail', 'unknown')}"
                except:
                    details += f", Response: {response.text[:100]}"
                    
            self.log_test("Admin Login", success, details)
            return success
        except Exception as e:
            self.log_test("Admin Login", False, str(e))
            return False

    def test_student_registration(self):
        """Test student registration"""
        try:
            # Use timestamp to ensure unique email
            timestamp = datetime.now().strftime("%H%M%S")
            register_data = {
                "name": f"Test Student {timestamp}",
                "email": f"student{timestamp}@test.com",
                "password": "test123"
            }
            response = self.session.post(
                f"{self.base_url}/api/auth/register",
                json=register_data,
                timeout=10
            )
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                data = response.json()
                details += f", User: {data.get('name', 'unknown')}, XP: {data.get('xp', 0)}"
                self.student_token = True
            else:
                try:
                    error_data = response.json()
                    details += f", Error: {error_data.get('detail', 'unknown')}"
                except:
                    details += f", Response: {response.text[:100]}"
                    
            self.log_test("Student Registration", success, details)
            return success
        except Exception as e:
            self.log_test("Student Registration", False, str(e))
            return False

    def test_auth_me(self):
        """Test current user endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/api/auth/me", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                data = response.json()
                details += f", User: {data.get('name', 'unknown')}, Email: {data.get('email', 'unknown')}"
            else:
                try:
                    error_data = response.json()
                    details += f", Error: {error_data.get('detail', 'unknown')}"
                except:
                    details += f", Response: {response.text[:100]}"
                    
            self.log_test("Auth Me", success, details)
            return success
        except Exception as e:
            self.log_test("Auth Me", False, str(e))
            return False

    def test_roadmap_endpoint(self):
        """Test roadmap data endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/api/roadmap", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                data = response.json()
                if isinstance(data, list) and len(data) == 7:
                    details += f", Months: {len(data)}, First: {data[0].get('title', 'unknown')}"
                else:
                    success = False
                    details += f", Invalid data structure: {type(data)}"
            else:
                try:
                    error_data = response.json()
                    details += f", Error: {error_data.get('detail', 'unknown')}"
                except:
                    details += f", Response: {response.text[:100]}"
                    
            self.log_test("Roadmap Data", success, details)
            return success
        except Exception as e:
            self.log_test("Roadmap Data", False, str(e))
            return False

    def test_lessons_endpoint(self):
        """Test lessons endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/api/lessons", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                data = response.json()
                if isinstance(data, list):
                    details += f", Lessons count: {len(data)}"
                    if len(data) > 0:
                        first_lesson = data[0]
                        details += f", First: {first_lesson.get('title', 'unknown')}"
                else:
                    success = False
                    details += f", Invalid data structure: {type(data)}"
            else:
                try:
                    error_data = response.json()
                    details += f", Error: {error_data.get('detail', 'unknown')}"
                except:
                    details += f", Response: {response.text[:100]}"
                    
            self.log_test("Lessons List", success, details)
            return success
        except Exception as e:
            self.log_test("Lessons List", False, str(e))
            return False

    def test_games_endpoint(self):
        """Test games endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/api/games", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                data = response.json()
                if isinstance(data, list):
                    details += f", Games count: {len(data)}"
                    if len(data) > 0:
                        first_game = data[0]
                        details += f", First: {first_game.get('name', 'unknown')}"
                else:
                    success = False
                    details += f", Invalid data structure: {type(data)}"
            else:
                try:
                    error_data = response.json()
                    details += f", Error: {error_data.get('detail', 'unknown')}"
                except:
                    details += f", Response: {response.text[:100]}"
                    
            self.log_test("Games List", success, details)
            return success
        except Exception as e:
            self.log_test("Games List", False, str(e))
            return False

    def test_progress_stats(self):
        """Test progress stats endpoint (requires auth)"""
        if not self.student_token:
            self.log_test("Progress Stats", False, "No authenticated user")
            return False
            
        try:
            response = self.session.get(f"{self.base_url}/api/progress/stats", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                data = response.json()
                details += f", XP: {data.get('xp', 0)}, Level: {data.get('level', 1)}, Streak: {data.get('streak', 0)}"
            else:
                try:
                    error_data = response.json()
                    details += f", Error: {error_data.get('detail', 'unknown')}"
                except:
                    details += f", Response: {response.text[:100]}"
                    
            self.log_test("Progress Stats", success, details)
            return success
        except Exception as e:
            self.log_test("Progress Stats", False, str(e))
            return False

    def test_ai_tutor_chat(self):
        """Test AI tutor chat endpoint (requires auth)"""
        if not self.student_token:
            self.log_test("AI Tutor Chat", False, "No authenticated user")
            return False
            
        try:
            chat_data = {
                "message": "Hello, can you help me learn French?",
                "session_id": "test-session-123"
            }
            response = self.session.post(
                f"{self.base_url}/api/tutor/chat",
                json=chat_data,
                timeout=15  # AI responses might take longer
            )
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                data = response.json()
                response_text = data.get('response', '')
                details += f", Response length: {len(response_text)}, Session: {data.get('session_id', 'none')}"
            else:
                try:
                    error_data = response.json()
                    details += f", Error: {error_data.get('detail', 'unknown')}"
                except:
                    details += f", Response: {response.text[:100]}"
                    
            self.log_test("AI Tutor Chat", success, details)
            return success
        except Exception as e:
            self.log_test("AI Tutor Chat", False, str(e))
            return False

    def test_leaderboard(self):
        """Test leaderboard endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/api/leaderboard?limit=5", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                data = response.json()
                if isinstance(data, list):
                    details += f", Players: {len(data)}"
                    if len(data) > 0:
                        top_player = data[0]
                        details += f", Top: {top_player.get('name', 'unknown')} ({top_player.get('xp', 0)} XP)"
                else:
                    success = False
                    details += f", Invalid data structure: {type(data)}"
            else:
                try:
                    error_data = response.json()
                    details += f", Error: {error_data.get('detail', 'unknown')}"
                except:
                    details += f", Response: {response.text[:100]}"
                    
            self.log_test("Leaderboard", success, details)
            return success
        except Exception as e:
            self.log_test("Leaderboard", False, str(e))
            return False

    def test_logout(self):
        """Test logout endpoint"""
        try:
            response = self.session.post(f"{self.base_url}/api/auth/logout", timeout=10)
            success = response.status_code == 200
            details = f"Status: {response.status_code}"
            
            if success:
                data = response.json()
                details += f", Message: {data.get('message', 'unknown')}"
                self.admin_token = None
                self.student_token = None
            else:
                try:
                    error_data = response.json()
                    details += f", Error: {error_data.get('detail', 'unknown')}"
                except:
                    details += f", Response: {response.text[:100]}"
                    
            self.log_test("Logout", success, details)
            return success
        except Exception as e:
            self.log_test("Logout", False, str(e))
            return False

    def run_all_tests(self):
        """Run all backend API tests"""
        print("🚀 Starting FrenchQuest Backend API Tests")
        print(f"📍 Testing against: {self.base_url}")
        print("=" * 60)

        # Basic connectivity tests
        print("\n📡 Basic Connectivity Tests")
        self.test_health_endpoint()
        self.test_root_endpoint()

        # Public endpoints (no auth required)
        print("\n🌍 Public Endpoints")
        self.test_roadmap_endpoint()
        self.test_lessons_endpoint()
        self.test_games_endpoint()
        self.test_leaderboard()

        # Authentication tests
        print("\n🔐 Authentication Tests")
        self.test_admin_login()
        self.test_auth_me()
        
        # Student registration and auth
        print("\n👨‍🎓 Student Registration & Auth")
        self.test_student_registration()
        self.test_auth_me()

        # Protected endpoints (require auth)
        print("\n🔒 Protected Endpoints")
        self.test_progress_stats()
        self.test_ai_tutor_chat()

        # Cleanup
        print("\n🧹 Cleanup")
        self.test_logout()

        # Summary
        print("\n" + "=" * 60)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} passed")
        
        if self.failed_tests:
            print("\n❌ Failed Tests:")
            for failed in self.failed_tests:
                print(f"  - {failed['test']}: {failed['error']}")
        
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        print(f"✨ Success Rate: {success_rate:.1f}%")
        
        return self.tests_passed == self.tests_run

def main():
    """Main test runner"""
    tester = FrenchQuestAPITester()
    success = tester.run_all_tests()
    
    # Return appropriate exit code
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())