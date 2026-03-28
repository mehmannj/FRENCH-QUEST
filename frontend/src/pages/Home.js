import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Mic, 
  Headphones, 
  PenLine, 
  Gamepad2, 
  Trophy,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Target,
  Users,
  Flame,
  Star,
  Play
} from 'lucide-react';
import { Button } from '../components/ui/button';

const Home = () => {
  const features = [
    { icon: BookOpen, title: 'Reading', color: 'bg-emerald-500', desc: 'Build comprehension with engaging passages' },
    { icon: Mic, title: 'Speaking', color: 'bg-blue-500', desc: 'Practice pronunciation with AI feedback' },
    { icon: Headphones, title: 'Listening', color: 'bg-purple-500', desc: 'Train your ear with native speakers' },
    { icon: PenLine, title: 'Writing', color: 'bg-amber-500', desc: 'Master French writing step by step' },
  ];

  const stats = [
    { value: '7', label: 'Months to Fluency' },
    { value: '200+', label: 'Interactive Lessons' },
    { value: '50+', label: 'Mini-Games' },
    { value: '24/7', label: 'AI Tutor Access' },
  ];

  const roadmapPreview = [
    { month: 1, title: 'Foundation', desc: 'Alphabet, greetings, numbers', color: 'from-blue-500 to-blue-600' },
    { month: 2, title: 'Core Basics', desc: 'Articles, verbs, family vocab', color: 'from-emerald-500 to-emerald-600' },
    { month: 3, title: 'Sentences', desc: 'Present tense, questions', color: 'from-amber-500 to-amber-600' },
    { month: 4, title: 'Real-Life', desc: 'Shopping, travel, food', color: 'from-red-500 to-red-600' },
    { month: 5, title: 'Intermediate', desc: 'Past tense, paragraphs', color: 'from-purple-500 to-purple-600' },
    { month: 6, title: 'Fluency', desc: 'Future tense, stories', color: 'from-pink-500 to-pink-600' },
    { month: 7, title: 'Mastery', desc: 'Exam prep, confidence', color: 'from-cyan-500 to-cyan-600' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-100/50 blur-3xl" />
          <div className="absolute top-60 -left-20 w-60 h-60 rounded-full bg-red-100/50 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-8 animate-slide-up">
              <Sparkles className="w-4 h-4" />
              Start your French journey today
            </div>

            {/* Main heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Master French in{' '}
              <span className="text-gradient">7 Months</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              From zero French to confident fluency. Learn through interactive lessons, 
              mini-games, and AI-powered tutoring designed for students like you.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Link to="/register">
                <Button size="lg" className="rounded-full bg-blue-500 hover:bg-blue-600 text-lg px-8 py-6 shadow-lg shadow-blue-500/25" data-testid="hero-cta-btn">
                  Start Learning Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/roadmap">
                <Button size="lg" variant="outline" className="rounded-full text-lg px-8 py-6" data-testid="hero-roadmap-btn">
                  <Play className="mr-2 w-5 h-5" />
                  View Roadmap
                </Button>
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-12 flex items-center justify-center gap-8 text-slate-500 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br ${
                      i === 1 ? 'from-blue-400 to-blue-500' :
                      i === 2 ? 'from-green-400 to-green-500' :
                      i === 3 ? 'from-purple-400 to-purple-500' :
                      'from-amber-400 to-amber-500'
                    }`} />
                  ))}
                </div>
                <span className="text-sm">10,000+ students</span>
              </div>
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
                <span className="text-sm ml-1">4.9/5 rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* French flag accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-white to-red-500" />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Skills Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Master All 4 Language Skills
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our comprehensive approach covers every aspect of French language learning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div 
                key={i}
                className="bg-white rounded-2xl p-6 border border-slate-200 card-hover"
                data-testid={`skill-card-${feature.title.toLowerCase()}`}
              >
                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-5`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Your 7-Month Journey to Fluency
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              A structured roadmap that takes you from complete beginner to confident French speaker
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {roadmapPreview.slice(0, 4).map((month, i) => (
              <div 
                key={i}
                className="relative bg-white rounded-2xl p-6 border border-slate-200 card-hover"
                data-testid={`roadmap-month-${month.month}`}
              >
                <div className={`absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r ${month.color}`} />
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r ${month.color} text-white font-bold mb-4`}>
                  {month.month}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">{month.title}</h3>
                <p className="text-slate-600 text-sm">{month.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/roadmap">
              <Button variant="outline" className="rounded-full" data-testid="view-full-roadmap-btn">
                View Full Roadmap
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gamification Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Learn French Like Playing a Game
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Earn XP, unlock achievements, climb the leaderboard, and maintain your 
                learning streak. Making progress has never been this fun!
              </p>

              <div className="space-y-4">
                {[
                  { icon: Trophy, text: 'Earn badges for every milestone' },
                  { icon: Flame, text: 'Build and maintain daily streaks' },
                  { icon: Target, text: 'Complete challenges and quests' },
                  { icon: Users, text: 'Compete on the global leaderboard' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-lg">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* XP Card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Trophy className="w-8 h-8 mb-3 text-amber-400" />
                <div className="text-3xl font-bold mb-1">1,250</div>
                <div className="text-blue-200">Total XP</div>
              </div>

              {/* Streak Card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Flame className="w-8 h-8 mb-3 text-orange-400" />
                <div className="text-3xl font-bold mb-1">15</div>
                <div className="text-blue-200">Day Streak</div>
              </div>

              {/* Games Card */}
              <div className="col-span-2 bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <Gamepad2 className="w-8 h-8 mb-3 text-green-400" />
                <div className="text-xl font-semibold mb-2">50+ Mini-Games</div>
                <div className="text-blue-200">Vocabulary match, sentence builder, listening challenges & more</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Students Succeed */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Why Students Succeed with FrenchQuest
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Structured Learning Path',
                desc: 'Every lesson builds on the previous one. No confusion, no gaps.',
                icon: Target
              },
              {
                title: 'Daily Practice Made Fun',
                desc: 'Mini-games and challenges keep you engaged and coming back.',
                icon: Gamepad2
              },
              {
                title: 'AI-Powered Support',
                desc: 'Get instant answers and practice conversations anytime.',
                icon: Sparkles
              }
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
            Ready to Start Your French Journey?
          </h2>
          <p className="text-xl text-slate-600 mb-10">
            Join thousands of students who are learning French the fun way. 
            Your first lesson is just a click away.
          </p>
          <Link to="/register">
            <Button size="lg" className="rounded-full bg-blue-500 hover:bg-blue-600 text-lg px-10 py-6 shadow-lg shadow-blue-500/25" data-testid="final-cta-btn">
              Start Learning Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <p className="mt-4 text-slate-500 text-sm">No credit card required</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
