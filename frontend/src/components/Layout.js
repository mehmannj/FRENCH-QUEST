import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  BookOpen, 
  Gamepad2, 
  Trophy, 
  User, 
  LogOut, 
  Menu, 
  X, 
  Home,
  GraduationCap,
  MessageCircle,
  BarChart3,
  Mic,
  Headphones,
  BookOpenCheck,
  PenLine,
  Settings,
  Flame
} from 'lucide-react';
import { Button } from './ui/button';

const Layout = ({ children }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const publicNavLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/roadmap', label: 'Roadmap', icon: GraduationCap },
    { path: '/features', label: 'Features', icon: BookOpen },
  ];

  const studentNavLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/lessons', label: 'Lessons', icon: BookOpen },
    { path: '/speaking', label: 'Speaking', icon: Mic },
    { path: '/listening', label: 'Listening', icon: Headphones },
    { path: '/reading', label: 'Reading', icon: BookOpenCheck },
    { path: '/writing', label: 'Writing', icon: PenLine },
    { path: '/games', label: 'Games', icon: Gamepad2 },
    { path: '/tutor', label: 'AI Tutor', icon: MessageCircle },
  ];

  const navLinks = isAuthenticated ? studentNavLinks : publicNavLinks;

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                F
              </div>
              <span className="text-xl font-bold text-slate-800 hidden sm:block">FrenchQuest</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <>
                  {/* Streak indicator */}
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 rounded-full">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-semibold text-orange-600">{user?.streak || 0}</span>
                  </div>
                  
                  {/* XP indicator */}
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-full">
                    <Trophy className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-semibold text-blue-600">{user?.xp || 0} XP</span>
                  </div>

                  {/* Profile dropdown */}
                  <div className="relative group">
                    <button className="flex items-center gap-2 p-2 rounded-full hover:bg-slate-100 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-xl shadow-lg border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                      <Link to="/progress" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                        <BarChart3 className="w-4 h-4" />
                        Progress
                      </Link>
                      <Link to="/achievements" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                        <Trophy className="w-4 h-4" />
                        Achievements
                      </Link>
                      {user?.role === 'admin' && (
                        <Link to="/admin" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50">
                          <Settings className="w-4 h-4" />
                          Admin Panel
                        </Link>
                      )}
                      <hr className="my-2 border-slate-200" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login">
                    <Button variant="ghost" className="rounded-full" data-testid="login-btn">
                      Log In
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="rounded-full bg-blue-500 hover:bg-blue-600" data-testid="register-btn">
                      Start Learning
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-slate-100"
                data-testid="mobile-menu-btn"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <nav className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive(link.path)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <link.icon className="w-5 h-5" />
                  {link.label}
                </Link>
              ))}
              {isAuthenticated && (
                <>
                  <hr className="my-2 border-slate-200" />
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 w-full"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer - only show on public pages */}
      {!isAuthenticated && (
        <footer className="bg-slate-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                    F
                  </div>
                  <span className="text-xl font-bold">FrenchQuest</span>
                </div>
                <p className="text-slate-400 max-w-md">
                  Master French in 7 months with our structured, gamified learning platform. 
                  From complete beginner to confident speaker.
                </p>
                <div className="french-flag mt-6 w-32" />
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Learn</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><Link to="/roadmap" className="hover:text-white transition-colors">7-Month Roadmap</Link></li>
                  <li><Link to="/features" className="hover:text-white transition-colors">Features</Link></li>
                  <li><Link to="/games" className="hover:text-white transition-colors">Mini-Games</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-slate-400">
                  <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                  <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                  <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
              © 2026 FrenchQuest. All rights reserved. Made with ❤️ for French learners.
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
