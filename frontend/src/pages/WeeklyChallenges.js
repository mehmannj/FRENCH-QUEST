import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Target, CheckCircle2, Trophy } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { toast } from 'sonner';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const WeeklyChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [weekStart, setWeekStart] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchChallenges(); }, []);

  const fetchChallenges = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/challenges/weekly`);
      setChallenges(res.data.challenges);
      setWeekStart(res.data.week_start);
    } catch {
      toast.error('Failed to load weekly challenges');
    } finally {
      setLoading(false);
    }
  };

  const typeColors = {
    vocab: 'bg-blue-100 text-blue-700',
    games: 'bg-purple-100 text-purple-700',
    speaking: 'bg-green-100 text-green-700',
    streak: 'bg-orange-100 text-orange-700',
    lessons: 'bg-pink-100 text-pink-700',
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8" data-testid="weekly-challenges-page">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-3">
            <Target className="w-4 h-4" />
            Weekly Challenges
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">This Week's Challenges</h1>
          <p className="text-slate-600">Week of {weekStart && new Date(weekStart + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full mx-auto" />
          </div>
        ) : (
          <div className="space-y-4">
            {challenges.map((ch) => {
              const pct = Math.min((ch.current / ch.target) * 100, 100);
              return (
                <div key={ch.id} className={`bg-white rounded-2xl border p-6 ${ch.completed ? 'border-green-200 bg-green-50/30' : ''}`} data-testid={`challenge-${ch.id}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-slate-900">{ch.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${typeColors[ch.type] || 'bg-slate-100 text-slate-600'}`}>
                          {ch.type}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">{ch.description}</p>
                    </div>
                    {ch.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
                    ) : (
                      <div className="text-right flex-shrink-0">
                        <p className="text-lg font-bold text-amber-600">+{ch.xp_reward}</p>
                        <p className="text-xs text-slate-500">XP</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <Progress value={pct} className="h-2.5 flex-1" />
                    <span className="text-sm font-medium text-slate-600 whitespace-nowrap">
                      {ch.current}/{ch.target}
                    </span>
                  </div>

                  {ch.completed && (
                    <div className="mt-3 flex items-center gap-2 text-green-600 text-sm">
                      <Trophy className="w-4 h-4" />
                      <span>Challenge completed! +{ch.xp_reward} XP</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-8 bg-amber-50 rounded-xl p-6">
          <h3 className="font-semibold text-amber-900 mb-2">How Weekly Challenges Work</h3>
          <ul className="space-y-1.5 text-sm text-amber-700">
            <li>- New challenges appear every Monday</li>
            <li>- Complete challenges by doing regular learning activities</li>
            <li>- Earn bonus XP for each completed challenge</li>
            <li>- Challenges reset at the start of each week</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WeeklyChallenges;
