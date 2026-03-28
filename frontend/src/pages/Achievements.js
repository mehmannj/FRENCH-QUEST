import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { Trophy, Star, Flame, BookOpen, Mic, Gamepad2, Target, Lock } from 'lucide-react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Achievements = () => {
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

  const allBadges = [
    { id: 'newcomer', name: 'Newcomer', desc: 'Started your French journey', icon: Star, color: 'from-green-400 to-green-600' },
    { id: 'first_100_xp', name: 'XP Earner', desc: 'Earned your first 100 XP', icon: Trophy, color: 'from-blue-400 to-blue-600' },
    { id: 'dedicated_learner', name: 'Dedicated Learner', desc: 'Earned 500 XP total', icon: Target, color: 'from-purple-400 to-purple-600' },
    { id: 'lesson_master', name: 'Lesson Master', desc: 'Completed 10 lessons', icon: BookOpen, color: 'from-emerald-400 to-emerald-600' },
    { id: 'streak_7', name: 'Week Warrior', desc: '7-day learning streak', icon: Flame, color: 'from-orange-400 to-orange-600' },
    { id: 'streak_30', name: 'Month Champion', desc: '30-day learning streak', icon: Flame, color: 'from-red-400 to-red-600' },
    { id: 'gamer', name: 'Game Master', desc: 'Played 10 mini-games', icon: Gamepad2, color: 'from-pink-400 to-pink-600' },
    { id: 'speaker', name: 'Brave Speaker', desc: 'Completed 20 speaking exercises', icon: Mic, color: 'from-cyan-400 to-cyan-600' },
    { id: 'month_1', name: 'Month 1 Complete', desc: 'Finished Month 1 curriculum', icon: Star, color: 'from-amber-400 to-amber-600' },
    { id: 'month_2', name: 'Month 2 Complete', desc: 'Finished Month 2 curriculum', icon: Star, color: 'from-amber-400 to-amber-600' },
    { id: 'month_3', name: 'Month 3 Complete', desc: 'Finished Month 3 curriculum', icon: Star, color: 'from-amber-400 to-amber-600' },
    { id: 'fluent', name: 'Fluent Speaker', desc: 'Completed the entire 7-month journey', icon: Trophy, color: 'from-yellow-400 to-yellow-600' },
  ];

  const userBadges = stats?.badges || user?.badges || ['newcomer'];
  const earnedCount = allBadges.filter(b => userBadges.includes(b.id)).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8" data-testid="achievements-page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Achievements</h1>
          <p className="text-slate-600">Collect badges as you progress in your French journey</p>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white mb-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-5xl font-bold">{earnedCount}</div>
              <div className="text-amber-100">Badges Earned</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold">{allBadges.length - earnedCount}</div>
              <div className="text-amber-100">Badges Remaining</div>
            </div>
          </div>
          <div className="mt-4 h-3 bg-white/20 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white rounded-full transition-all duration-500"
              style={{ width: `${(earnedCount / allBadges.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allBadges.map((badge, i) => {
            const isEarned = userBadges.includes(badge.id);
            
            return (
              <div
                key={badge.id}
                className={`relative bg-white rounded-2xl p-6 border transition-all ${
                  isEarned 
                    ? 'border-amber-200 shadow-sm' 
                    : 'border-slate-200 opacity-60'
                }`}
                data-testid={`badge-${badge.id}`}
              >
                {/* Badge icon */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                  isEarned 
                    ? `bg-gradient-to-r ${badge.color}` 
                    : 'bg-slate-200'
                }`}>
                  {isEarned ? (
                    <badge.icon className="w-8 h-8 text-white" />
                  ) : (
                    <Lock className="w-8 h-8 text-slate-400" />
                  )}
                </div>

                {/* Badge info */}
                <div className="text-center">
                  <h3 className={`font-semibold ${isEarned ? 'text-slate-900' : 'text-slate-500'}`}>
                    {badge.name}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">{badge.desc}</p>
                </div>

                {/* Earned indicator */}
                {isEarned && (
                  <div className="absolute top-4 right-4">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Motivation */}
        <div className="mt-8 bg-purple-50 rounded-2xl p-6 text-center">
          <h3 className="text-lg font-semibold text-purple-900 mb-2">Keep Going!</h3>
          <p className="text-purple-700">
            {earnedCount < 3 
              ? "You're just getting started! Complete more lessons to earn badges."
              : earnedCount < 6
                ? "Great progress! Keep learning to unlock more achievements."
                : "Amazing work! You're becoming a French master!"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
