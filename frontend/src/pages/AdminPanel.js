import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Gamepad2, 
  Settings,
  Plus,
  Trash2,
  Edit,
  Save,
  X,
  RefreshCw,
  Download,
  TrendingUp,
  Activity
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const AdminPanel = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchData();
    }
  }, [user, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'dashboard') {
        const response = await axios.get(`${API_URL}/api/admin/stats`, { withCredentials: true });
        setStats(response.data);
      } else if (activeTab === 'users') {
        const response = await axios.get(`${API_URL}/api/admin/users`, { withCredentials: true });
        setUsers(response.data.users || []);
      } else if (activeTab === 'lessons') {
        const response = await axios.get(`${API_URL}/api/admin/lessons`, { withCredentials: true });
        setLessons(response.data.lessons || []);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const seedContent = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/admin/seed-content`, {}, { withCredentials: true });
      toast.success(`Seeded ${response.data.lessons_added} lessons and ${response.data.quizzes_added} quizzes!`);
      fetchData();
    } catch (error) {
      console.error('Error seeding content:', error);
      toast.error('Failed to seed content');
    }
  };

  const deleteLesson = async (lessonId) => {
    if (!window.confirm('Are you sure you want to delete this lesson?')) return;
    
    try {
      await axios.delete(`${API_URL}/api/admin/lessons/${lessonId}`, { withCredentials: true });
      toast.success('Lesson deleted');
      fetchData();
    } catch (error) {
      console.error('Error deleting lesson:', error);
      toast.error('Failed to delete lesson');
    }
  };

  // Redirect non-admin users
  if (!user || user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'lessons', label: 'Lessons', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50" data-testid="admin-panel">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-white border-r border-slate-200 p-4">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900">Admin Panel</h2>
            <p className="text-sm text-slate-500">FrenchQuest Management</p>
          </div>
          
          <nav className="space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
                data-testid={`admin-tab-${tab.id}`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
            </div>
          ) : (
            <>
              {/* Dashboard Tab */}
              {activeTab === 'dashboard' && stats && (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
                    <Button onClick={fetchData} variant="outline" className="rounded-full">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </Button>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 border border-slate-200">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                          <Users className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-slate-900">{stats.total_users}</div>
                          <div className="text-sm text-slate-500">Total Students</div>
                        </div>
                      </div>
                      <div className="mt-4 text-sm text-green-600">
                        +{stats.new_users_this_week} this week
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-slate-200">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-slate-900">{stats.total_lessons}</div>
                          <div className="text-sm text-slate-500">Total Lessons</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-slate-200">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                          <Activity className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-slate-900">{stats.total_quizzes}</div>
                          <div className="text-sm text-slate-500">Total Quizzes</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 border border-slate-200">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                          <Gamepad2 className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-slate-900">{stats.total_game_plays}</div>
                          <div className="text-sm text-slate-500">Game Sessions</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-8">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
                    <div className="flex flex-wrap gap-4">
                      <Button onClick={seedContent} className="rounded-full bg-emerald-500 hover:bg-emerald-600">
                        <Download className="w-4 h-4 mr-2" />
                        Seed Month 1 Content
                      </Button>
                      <Button onClick={() => setActiveTab('lessons')} variant="outline" className="rounded-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Lesson
                      </Button>
                    </div>
                  </div>

                  {/* Top Performers */}
                  {stats.top_performers && stats.top_performers.length > 0 && (
                    <div className="bg-white rounded-2xl p-6 border border-slate-200">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Top Performers</h3>
                      <div className="space-y-3">
                        {stats.top_performers.map((performer, i) => (
                          <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                              i === 0 ? 'bg-amber-500 text-white' :
                              i === 1 ? 'bg-slate-400 text-white' :
                              i === 2 ? 'bg-amber-600 text-white' :
                              'bg-slate-200 text-slate-600'
                            }`}>
                              {i + 1}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-slate-900">{performer.name}</div>
                              <div className="text-sm text-slate-500">{performer.email}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold text-blue-600">{performer.xp} XP</div>
                              <div className="text-xs text-slate-500">Level {performer.level}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Users Tab */}
              {activeTab === 'users' && (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
                    <Button onClick={fetchData} variant="outline" className="rounded-full">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh
                    </Button>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Name</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Email</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Role</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">XP</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Level</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Streak</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((u, i) => (
                          <tr key={i} className="border-t border-slate-100 hover:bg-slate-50">
                            <td className="px-6 py-4">{u.name}</td>
                            <td className="px-6 py-4 text-slate-500">{u.email}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                              }`}>
                                {u.role}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-medium">{u.xp || 0}</td>
                            <td className="px-6 py-4">{u.level || 1}</td>
                            <td className="px-6 py-4">{u.streak || 0} days</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Lessons Tab */}
              {activeTab === 'lessons' && (
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Lesson Management</h1>
                    <div className="flex gap-3">
                      <Button onClick={seedContent} variant="outline" className="rounded-full">
                        <Download className="w-4 h-4 mr-2" />
                        Seed Content
                      </Button>
                      <Button onClick={fetchData} variant="outline" className="rounded-full">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                      </Button>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">ID</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Title</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Month</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Week</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Day</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">XP</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {lessons.map((lesson, i) => (
                          <tr key={i} className="border-t border-slate-100 hover:bg-slate-50">
                            <td className="px-6 py-4 font-mono text-sm text-slate-500">{lesson.id}</td>
                            <td className="px-6 py-4">
                              <div className="font-medium">{lesson.title}</div>
                              <div className="text-sm text-slate-500 italic">{lesson.title_fr}</div>
                            </td>
                            <td className="px-6 py-4">{lesson.month}</td>
                            <td className="px-6 py-4">{lesson.week}</td>
                            <td className="px-6 py-4">{lesson.day}</td>
                            <td className="px-6 py-4 text-amber-600 font-medium">+{lesson.xp_reward || 20}</td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => deleteLesson(lesson.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {lessons.length === 0 && (
                      <div className="text-center py-12 text-slate-500">
                        No lessons found. Click "Seed Content" to add Month 1 lessons.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 mb-8">Settings</h1>
                  
                  <div className="bg-white rounded-2xl p-6 border border-slate-200">
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">Content Management</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <div>
                          <div className="font-medium">Seed Month 1 Content</div>
                          <div className="text-sm text-slate-500">Load all lessons and quizzes for Month 1</div>
                        </div>
                        <Button onClick={seedContent} className="rounded-full">
                          Load Content
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
