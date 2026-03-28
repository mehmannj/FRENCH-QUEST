import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { 
  BookOpen, 
  Flame, 
  Trophy, 
  Target,
  ArrowRight,
  Mic,
  Headphones,
  BookOpenCheck,
  PenLine,
  Gamepad2,
  MessageCircle,
  Star,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, lessonsRes, leaderboardRes] = await Promise.all([
        axios.get(`${API_URL}/api/progress/stats`, { withCredentials: true }),
        axios.get(`${API_URL}/api/lessons?month=1`, { withCredentials: true }),
        axios.get(`${API_URL}/api/leaderboard?limit=5`, { withCredentials: true })
      ]);
      setStats(statsRes.data);
      setLessons(lessonsRes.data);
      setLeaderboard(leaderboardRes.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const xpProgress = stats ? (stats.xp % 100) : 0;
  const skillCards = [
    { name: 'Speaking', icon: Mic, color: 'bg-blue-500', path: '/speaking', score: stats?.skills?.speaking || 0 },
    { name: 'Listening', icon: Headphones, color: 'bg-purple-500', path: '/listening', score: stats?.skills?.listening || 0 },
    { name: 'Reading', icon: BookOpenCheck, color: 'bg-emerald-500', path: '/reading', score: stats?.skills?.reading || 0 },
    { name: 'Writing', icon: PenLine, color: 'bg-amber-500', path: '/writing', score: stats?.skills?.writing || 0 },
  ];

  const quickActions = [
    { name: 'Continue Lesson', icon: BookOpen, path: '/lessons', color: 'bg-blue-500' },
    { name: 'Play a Game', icon: Gamepad2, path: '/games', color: 'bg-green-500' },
    { name: 'AI Tutor', icon: MessageCircle, path: '/tutor', color: 'bg-purple-500' },
    { name: 'Practice Speaking', icon: Mic, path: '/speaking', color: 'bg-orange-500' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8" data-testid="student-dashboard">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Bonjour, {user?.name || 'Learner'}! 👋
          </h1>
          <p className="text-slate-600">Ready to continue your French journey?</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* XP Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm" data-testid="xp-card">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{stats?.xp || 0}</div>
                <div className="text-xs text-slate-500">Total XP</div>
              </div>
            </div>
            <Progress value={xpProgress} className="h-2" />
            <div className="text-xs text-slate-500 mt-1">{stats?.xp_to_next_level || 100} XP to next level</div>
          </div>

          {/* Level Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm" data-testid="level-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <Star className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">Level {stats?.level || 1}</div>
                <div className="text-xs text-slate-500">{stats?.level_title || 'Beginner'}</div>
              </div>
            </div>
          </div>

          {/* Streak Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm" data-testid="streak-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <Flame className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{stats?.streak || 0}</div>
                <div className="text-xs text-slate-500">Day Streak</div>
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm" data-testid="progress-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900">{stats?.progress_percentage || 0}%</div>
                <div className="text-xs text-slate-500">Course Complete</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Month Progress */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white" data-testid="month-progress">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm text-blue-200">Month {stats?.current_month || 1}</div>
                  <h3 className="text-xl font-bold">
                    {stats?.current_month === 1 ? 'Absolute Beginner Foundation' : 
                     stats?.current_month === 2 ? 'Building Core Basics' :
                     stats?.current_month === 3 ? 'Sentence Construction' : 'Continue Learning'}
                  </h3>
                </div>
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-2xl font-bold">{stats?.current_month || 1}</span>
                </div>
              </div>
              <Progress value={stats?.progress_percentage || 0} className="h-2 bg-white/20" />
              <div className="flex items-center justify-between mt-2 text-sm text-blue-200">
                <span>{stats?.completed_lessons || 0} lessons completed</span>
                <span>{stats?.progress_percentage || 0}% complete</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {quickActions.map((action, i) => (
                  <Link
                    key={i}
                    to={action.path}
                    className="bg-white rounded-xl p-4 border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all text-center"
                    data-testid={`quick-action-${action.name.toLowerCase().replace(' ', '-')}`}
                  >
                    <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{action.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Skills Overview */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Your Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                {skillCards.map((skill, i) => (
                  <Link
                    key={i}
                    to={skill.path}
                    className="bg-white rounded-xl p-5 border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all"
                    data-testid={`skill-${skill.name.toLowerCase()}`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 ${skill.color} rounded-xl flex items-center justify-center`}>
                        <skill.icon className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-medium text-slate-700">{skill.name}</span>
                    </div>
                    <Progress value={Math.min(skill.score, 100)} className="h-2" />
                    <div className="text-xs text-slate-500 mt-1">{skill.score} points</div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Lessons */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Continue Learning</h3>
                <Link to="/lessons" className="text-blue-600 text-sm font-medium hover:underline">
                  View all
                </Link>
              </div>
              <div className="space-y-3">
                {lessons.slice(0, 3).map((lesson, i) => (
                  <Link
                    key={lesson.id || i}
                    to={`/lessons/${lesson.id}`}
                    className="flex items-center gap-4 bg-white rounded-xl p-4 border border-slate-200 hover:shadow-md transition-all"
                    data-testid={`lesson-card-${lesson.id}`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-900">{lesson.title}</h4>
                      <p className="text-sm text-slate-500">{lesson.title_fr}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-blue-600 font-medium">+{lesson.xp_reward || 20} XP</span>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Your Badges</h3>
              <div className="flex flex-wrap gap-2">
                {(stats?.badges || ['newcomer']).map((badge, i) => (
                  <div
                    key={i}
                    className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-100 to-amber-200 text-amber-700 text-sm font-medium"
                    data-testid={`badge-${badge}`}
                  >
                    {badge.replace(/_/g, ' ')}
                  </div>
                ))}
              </div>
              <Link to="/achievements" className="mt-4 text-blue-600 text-sm font-medium hover:underline inline-block">
                View all achievements →
              </Link>
            </div>

            {/* Leaderboard */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Leaderboard</h3>
              <div className="space-y-3">
                {leaderboard.map((player, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 p-3 rounded-xl ${
                      i === 0 ? 'bg-amber-50' : 'bg-slate-50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      i === 0 ? 'bg-amber-500 text-white' :
                      i === 1 ? 'bg-slate-400 text-white' :
                      i === 2 ? 'bg-amber-600 text-white' :
                      'bg-slate-200 text-slate-600'
                    }`}>
                      {player.rank}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-900">{player.name}</div>
                      <div className="text-xs text-slate-500">{player.xp} XP</div>
                    </div>
                    {i < 3 && <Trophy className={`w-4 h-4 ${
                      i === 0 ? 'text-amber-500' : i === 1 ? 'text-slate-400' : 'text-amber-600'
                    }`} />}
                  </div>
                ))}
              </div>
              <Link to="/leaderboard" className="mt-4 text-blue-600 text-sm font-medium hover:underline inline-block">
                View full leaderboard →
              </Link>
            </div>

            {/* Daily Goal */}
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6" />
                <h3 className="font-semibold">Daily Goal</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm">Complete 1 lesson</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-white/50" />
                  <span className="text-sm text-emerald-200">Play 1 mini-game</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-white/50" />
                  <span className="text-sm text-emerald-200">Practice speaking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
