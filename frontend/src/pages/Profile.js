import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { User, Mail, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
  const { user, refreshUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulated save
    setTimeout(() => {
      toast.success('Profile updated successfully!');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8" data-testid="profile-page">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Profile Settings</h1>
          <p className="text-slate-600">Manage your account information</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Avatar section */}
          <div className="p-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center">
            <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 text-4xl font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p className="text-blue-100">{user?.email}</p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm">
              Level {user?.level || 1} • {user?.xp || 0} XP
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="p-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 h-12 rounded-xl"
                  data-testid="profile-name-input"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="pl-10 h-12 rounded-xl bg-slate-50"
                />
              </div>
              <p className="text-xs text-slate-500">Email cannot be changed</p>
            </div>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-blue-500 hover:bg-blue-600"
              disabled={loading}
              data-testid="save-profile-btn"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
            <div className="text-2xl font-bold text-blue-600">{user?.streak || 0}</div>
            <div className="text-sm text-slate-500">Day Streak</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
            <div className="text-2xl font-bold text-purple-600">{user?.xp || 0}</div>
            <div className="text-sm text-slate-500">Total XP</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
            <div className="text-2xl font-bold text-emerald-600">{user?.completed_lessons?.length || 0}</div>
            <div className="text-sm text-slate-500">Lessons Done</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
            <div className="text-2xl font-bold text-amber-600">{user?.badges?.length || 1}</div>
            <div className="text-sm text-slate-500">Badges</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
