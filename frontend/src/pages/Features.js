import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Mic, 
  Headphones, 
  PenLine, 
  Gamepad2, 
  MessageCircle,
  Trophy,
  Flame,
  Target,
  Users,
  Sparkles,
  Clock,
  BarChart3,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/ui/button';

const Features = () => {
  const coreFeatures = [
    {
      icon: BookOpen,
      title: 'Structured Lessons',
      description: '200+ lessons organized into a clear 7-month curriculum. Each lesson builds on the previous one.',
      color: 'bg-blue-500'
    },
    {
      icon: Mic,
      title: 'Speaking Practice',
      description: 'Practice pronunciation with our voice recognition system and get instant feedback.',
      color: 'bg-emerald-500'
    },
    {
      icon: Headphones,
      title: 'Listening Exercises',
      description: 'Train your ear with native French audio clips at various difficulty levels.',
      color: 'bg-purple-500'
    },
    {
      icon: PenLine,
      title: 'Writing Practice',
      description: 'Build writing skills from basic sentences to paragraphs with guided exercises.',
      color: 'bg-amber-500'
    },
    {
      icon: Gamepad2,
      title: 'Mini-Games',
      description: '50+ interactive games including vocabulary match, sentence builder, and memory cards.',
      color: 'bg-pink-500'
    },
    {
      icon: MessageCircle,
      title: 'AI French Tutor',
      description: 'Get personalized help 24/7 from our AI tutor. Ask questions, practice conversations, and more.',
      color: 'bg-cyan-500'
    }
  ];

  const gamificationFeatures = [
    { icon: Trophy, title: 'XP Points', desc: 'Earn XP for every activity' },
    { icon: Flame, title: 'Daily Streaks', desc: 'Build learning habits' },
    { icon: Target, title: 'Achievements', desc: 'Unlock badges and rewards' },
    { icon: Users, title: 'Leaderboard', desc: 'Compete with learners worldwide' },
  ];

  return (
    <div className="min-h-screen bg-white" data-testid="features-page">
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Everything you need to learn French
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Features Designed for Success
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            FrenchQuest combines the best of structured learning, interactive games, 
            and AI-powered tutoring to help you master French.
          </p>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Core Learning Features</h2>
            <p className="text-lg text-slate-600">Master all four language skills with our comprehensive tools</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, i) => (
              <div 
                key={i}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all"
              >
                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-5`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gamification Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Stay Motivated with Gamification
              </h2>
              <p className="text-xl text-purple-100 mb-8">
                Learning French doesn't have to be boring. Our gamification system keeps 
                you engaged and motivated every step of the way.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {gamificationFeatures.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
                    <item.icon className="w-6 h-6 text-amber-300" />
                    <div>
                      <div className="font-semibold">{item.title}</div>
                      <div className="text-sm text-purple-200">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-4xl font-bold mb-2">100+</div>
                <div className="text-purple-200">Badges to unlock</div>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-4xl font-bold mb-2">10</div>
                <div className="text-purple-200">Mastery levels</div>
              </div>
              <div className="col-span-2 bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="text-2xl font-bold mb-2">Weekly Challenges</div>
                <div className="text-purple-200">Compete in timed challenges and climb the ranks</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Tutor Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-slate-100 rounded-2xl p-6">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold">U</div>
                    <div className="bg-white rounded-2xl rounded-bl-md p-4 max-w-[80%]">
                      <p className="text-slate-800">How do I conjugate "aller" in present tense?</p>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl rounded-br-md p-4 max-w-[80%]">
                      <p>Great question! Here's "aller" (to go) in present tense:</p>
                      <ul className="mt-2 text-sm space-y-1">
                        <li>je vais - I go</li>
                        <li>tu vas - you go</li>
                        <li>il/elle va - he/she goes</li>
                        <li>nous allons - we go</li>
                      </ul>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
                <MessageCircle className="w-4 h-4" />
                AI-Powered Learning
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Your Personal AI French Tutor
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Get instant answers to your French questions, practice conversations, 
                and receive personalized guidance whenever you need it.
              </p>
              <ul className="space-y-3">
                {[
                  'Grammar explanations in simple English',
                  'Vocabulary help with examples',
                  'Pronunciation guidance',
                  'Practice conversations',
                  'Writing corrections'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Tracking */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
              <BarChart3 className="w-4 h-4" />
              Track Your Progress
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Detailed Progress Analytics</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Know exactly where you stand with comprehensive progress tracking across all skills
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Skill Breakdown', desc: 'See your progress in speaking, listening, reading, and writing', icon: Target },
              { title: 'Learning Insights', desc: 'Understand your strengths and areas to improve', icon: Sparkles },
              { title: 'Time Tracking', desc: 'Monitor your daily learning time and consistency', icon: Clock },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-slate-200">
                <item.icon className="w-8 h-8 text-emerald-500 mb-4" />
                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-slate-600 mb-10">
            Start your French learning journey today and discover why thousands of 
            students choose FrenchQuest.
          </p>
          <Link to="/register">
            <Button size="lg" className="rounded-full bg-blue-500 hover:bg-blue-600 text-lg px-10 py-6" data-testid="features-cta-btn">
              Start Learning Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Features;
