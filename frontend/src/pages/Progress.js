import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { BarChart3, Mic, Headphones, BookOpenCheck, PenLine, Trophy, TrendingUp } from 'lucide-react';
import { Progress as ProgressBar } from '../components/ui/progress';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Progress = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/progress/stats`, { withCredentials: true });
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const skills = [
    { name: 'Speaking', icon: Mic, color: 'bg-blue-500', score: stats?.skills?.speaking || 0 },
    { name: 'Listening', icon: Headphones, color: 'bg-purple-500', score: stats?.skills?.listening || 0 },
    { name: 'Reading', icon: BookOpenCheck, color: 'bg-emerald-500', score: stats?.skills?.reading || 0 },
    { name: 'Writing', icon: PenLine, color: 'bg-amber-500', score: stats?.skills?.writing || 0 },
  ];

  const maxSkillScore = Math.max(...skills.map(s => s.score), 100);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8" data-testid="progress-page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Your Progress</h1>
          <p className="text-slate-600">Track your French learning journey</p>
        </div>

        {/* Overall Progress */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white mb-8">
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold">{stats?.progress_percentage || 0}%</div>
              <div className="text-blue-200">Course Complete</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">{stats?.completed_lessons || 0}</div>
              <div className="text-blue-200">Lessons Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">Month {stats?.current_month || 1}</div>
              <div className="text-blue-200">Current Stage</div>
            </div>
          </div>
          <div className="mt-6">
            <ProgressBar value={stats?.progress_percentage || 0} className="h-3 bg-white/20" />
          </div>
        </div>

        {/* Skills Breakdown */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            Skills Breakdown
          </h2>
          <div className="space-y-6">
            {skills.map((skill, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 ${skill.color} rounded-xl flex items-center justify-center`}>
                      <skill.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-slate-900">{skill.name}</span>
                  </div>
                  <span className="text-slate-600 font-medium">{skill.score} points</span>
                </div>
                <ProgressBar value={(skill.score / maxSkillScore) * 100} className="h-3" />
              </div>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              XP & Level
            </h3>
            <div className="text-center py-4">
              <div className="text-5xl font-bold text-blue-600 mb-2">{stats?.xp || 0}</div>
              <div className="text-slate-500">Total XP</div>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full">
                <span className="font-semibold text-purple-700">Level {stats?.level || 1}</span>
                <span className="text-purple-600">•</span>
                <span className="text-purple-600">{stats?.level_title || 'Beginner'}</span>
              </div>
              <div className="mt-4">
                <ProgressBar value={(stats?.xp % 100)} className="h-2" />
                <p className="text-sm text-slate-500 mt-1">{stats?.xp_to_next_level || 100} XP to next level</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              Activity
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-orange-50 rounded-xl">
                <div className="text-3xl font-bold text-orange-600">{stats?.streak || 0}</div>
                <div className="text-sm text-orange-700">Day Streak</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="text-3xl font-bold text-green-600">{stats?.completed_games || 0}</div>
                <div className="text-sm text-green-700">Games Played</div>
              </div>
              <div className="col-span-2 text-center p-4 bg-blue-50 rounded-xl">
                <div className="text-3xl font-bold text-blue-600">{stats?.badges?.length || 1}</div>
                <div className="text-sm text-blue-700">Badges Earned</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
