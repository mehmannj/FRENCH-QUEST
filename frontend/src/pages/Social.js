import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Search, UserPlus, UserMinus, Trophy, Flame, Award } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Social = () => {
  const [friends, setFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  useEffect(() => { fetchFriends(); }, []);

  const fetchFriends = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/social/friends`);
      setFriends(res.data.friends);
    } catch {
      toast.error('Failed to load friends');
    } finally {
      setLoading(false);
    }
  };

  const searchUsers = async (e) => {
    e.preventDefault();
    if (searchQuery.length < 2) return;
    setSearching(true);
    try {
      const res = await axios.get(`${API_URL}/api/social/users/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchResults(res.data.users);
    } catch {
      toast.error('Search failed');
    } finally {
      setSearching(false);
    }
  };

  const followUser = async (userId, name) => {
    try {
      await axios.post(`${API_URL}/api/social/follow/${userId}`);
      toast.success(`Now following ${name}`);
      fetchFriends();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to follow');
    }
  };

  const unfollowUser = async (userId, name) => {
    try {
      await axios.delete(`${API_URL}/api/social/unfollow/${userId}`);
      toast.success(`Unfollowed ${name}`);
      setFriends(friends.filter(f => f.id !== userId));
    } catch {
      toast.error('Failed to unfollow');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8" data-testid="social-page">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-3">
            <Users className="w-4 h-4" />
            Social
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Friends & Community</h1>
          <p className="text-slate-600">Follow friends and track each other's progress</p>
        </div>

        {/* Search Users */}
        <div className="bg-white rounded-2xl border p-6 mb-6">
          <h3 className="font-semibold text-slate-900 mb-3">Find Friends</h3>
          <form onSubmit={searchUsers} className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                data-testid="search-users-input"
              />
            </div>
            <Button type="submit" disabled={searching} className="rounded-xl" data-testid="search-users-btn">
              Search
            </Button>
          </form>

          {searchResults.length > 0 && (
            <div className="mt-4 space-y-2">
              {searchResults.map(user => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                  <div>
                    <p className="font-medium text-slate-900">{user.name}</p>
                    <p className="text-sm text-slate-500">Level {user.level} - {user.xp} XP</p>
                  </div>
                  {!friends.find(f => f.id === user.id) ? (
                    <Button size="sm" onClick={() => followUser(user.id, user.name)} className="rounded-full gap-1" data-testid={`follow-${user.id}`}>
                      <UserPlus className="w-3 h-3" /> Follow
                    </Button>
                  ) : (
                    <span className="text-sm text-green-600">Following</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Friends List */}
        <div className="bg-white rounded-2xl border p-6">
          <h3 className="font-semibold text-slate-900 mb-4">
            Your Friends ({friends.length})
          </h3>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin w-6 h-6 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto" />
            </div>
          ) : friends.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <Users className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p>No friends yet. Search and follow other learners!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {friends.map((friend, i) => (
                <div key={friend.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl" data-testid={`friend-${friend.id}`}>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-900">{friend.name}</p>
                    <div className="flex items-center gap-3 text-sm text-slate-500">
                      <span className="flex items-center gap-1"><Trophy className="w-3 h-3" /> {friend.xp} XP</span>
                      <span className="flex items-center gap-1"><Flame className="w-3 h-3" /> {friend.streak} streak</span>
                      <span className="flex items-center gap-1"><Award className="w-3 h-3" /> Lv {friend.level}</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => unfollowUser(friend.id, friend.name)}
                    className="rounded-full gap-1 text-red-500 border-red-200 hover:bg-red-50"
                  >
                    <UserMinus className="w-3 h-3" /> Unfollow
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Social;
