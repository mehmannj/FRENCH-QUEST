import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  BookOpen, 
  Mic, 
  Headphones, 
  PenLine,
  Gamepad2,
  ArrowRight
} from 'lucide-react';
import { Button } from '../components/ui/button';

const Roadmap = () => {
  const months = [
    {
      month: 1,
      title: "Absolute Beginner Foundation",
      title_fr: "Fondation Débutant Absolu",
      description: "Start your French journey with the basics: alphabet, pronunciation, greetings, and essential words.",
      topics: ["French alphabet", "Pronunciation basics", "Greetings & polite expressions", "Numbers 1-100", "Days & months", "Colors", "Basic classroom words"],
      skills: {
        speaking: "Basic greetings & introductions",
        listening: "Sound recognition & simple words",
        reading: "Simple words & phrases",
        writing: "Personal details & basic words"
      },
      games: ["Alphabet Sound Game", "Greeting Memory Match", "Number Challenge", "Pronunciation Tap"],
      outcome: "Say hello, introduce yourself, recognize simple spoken words, read basic words",
      color: "from-blue-500 to-blue-600"
    },
    {
      month: 2,
      title: "Building Core Basics",
      title_fr: "Construire les Bases",
      description: "Learn essential grammar, family vocabulary, and start forming simple sentences.",
      topics: ["Articles (le, la, les)", "Noun gender", "Singular & plural", "Être & avoir verbs", "Family vocabulary", "Food & hobbies", "Simple questions"],
      skills: {
        speaking: "Family introductions & likes/dislikes",
        listening: "Short dialogues",
        reading: "Simple conversations",
        writing: "Basic sentences"
      },
      games: ["Verb Matching Game", "Gender Challenge", "Family Vocabulary Quiz", "Sentence Builder"],
      outcome: "Make basic sentences, talk about family, understand short dialogues",
      color: "from-emerald-500 to-emerald-600"
    },
    {
      month: 3,
      title: "Sentence Construction",
      title_fr: "Construction de Phrases",
      description: "Master present tense, sentence order, and daily routine vocabulary.",
      topics: ["Present tense (regular verbs)", "Common irregular verbs", "Sentence order", "Adjectives", "Negation", "Question forms", "Time expressions"],
      skills: {
        speaking: "Daily life questions & answers",
        listening: "Comprehension exercises",
        reading: "Short passages",
        writing: "Guided writing tasks"
      },
      games: ["Drag-and-Drop Sentences", "Listening Race", "Daily Routine Quest", "Grammar Puzzle"],
      outcome: "Form complete sentences, ask daily life questions, understand passages",
      color: "from-amber-500 to-amber-600"
    },
    {
      month: 4,
      title: "Speaking Confidence & Real-Life",
      title_fr: "Confiance à l'Oral",
      description: "Practice real-life scenarios: shopping, travel, weather, and directions.",
      topics: ["Shopping vocabulary", "Travel phrases", "Weather expressions", "Directions", "Ordering food", "Describing places", "Conversation roleplay"],
      skills: {
        speaking: "Real-life scenarios & roleplay",
        listening: "Practical audio clips",
        reading: "Dialogues & menus",
        writing: "Messages & responses"
      },
      games: ["Roleplay Simulator", "Pronunciation Challenge", "Conversation Choice", "Listening Detective"],
      outcome: "Speak in real-life scenarios, improved accent, practical communication",
      color: "from-red-500 to-red-600"
    },
    {
      month: 5,
      title: "Intermediate Development",
      title_fr: "Développement Intermédiaire",
      description: "Learn past tense, complex sentences, and paragraph writing.",
      topics: ["Past tense (passé composé)", "Complex sentence structures", "Opinion expressions", "Paragraph reading", "Email writing", "Comprehension passages", "Descriptive language"],
      skills: {
        speaking: "Talk about past events",
        listening: "Longer audio comprehension",
        reading: "Detailed text understanding",
        writing: "Short paragraphs"
      },
      games: ["Tense Race", "Paragraph Builder", "Vocabulary Ladder", "Listening Puzzle"],
      outcome: "Discuss past events, read with detail, write paragraphs",
      color: "from-purple-500 to-purple-600"
    },
    {
      month: 6,
      title: "Stronger Fluency & Accuracy",
      title_fr: "Fluidité Renforcée",
      description: "Develop fluency with future tense, connectors, and natural conversations.",
      topics: ["Future expressions", "Advanced vocabulary sets", "Connectors & transitions", "Comparison language", "Error correction", "Story understanding", "Natural conversations"],
      skills: {
        speaking: "Longer, flowing responses",
        listening: "Natural spoken French",
        reading: "Stories & articles",
        writing: "Structured responses"
      },
      games: ["Correction Battle", "Advanced Vocab Missions", "Story Order Game", "Fluency Timer"],
      outcome: "Speak naturally, understand stories, write structured responses",
      color: "from-pink-500 to-pink-600"
    },
    {
      month: 7,
      title: "Mastery & Exam Readiness",
      title_fr: "Maîtrise et Préparation aux Examens",
      description: "Final revision, exam practice, and real-life communication mastery.",
      topics: ["Grammar revision", "Fluency conversations", "Exam-style listening", "Speaking interview practice", "Reading comprehension tests", "Essay writing", "Real-life tasks"],
      skills: {
        speaking: "Confident communication",
        listening: "Full comprehension",
        reading: "Test-style passages",
        writing: "Clear essays"
      },
      games: ["Final Boss Challenge", "Mastery Arena", "Speaking Simulator", "Exam Prep Challenge"],
      outcome: "Confident French user, exam-ready, real-life communication skills",
      color: "from-cyan-500 to-cyan-600"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
            Your Complete Journey
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            7-Month French Mastery Roadmap
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            From complete beginner to confident French speaker. Follow our structured path to fluency.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-green-500 via-amber-500 via-red-500 via-purple-500 via-pink-500 to-cyan-500 transform md:-translate-x-1/2" />

          {/* Month Cards */}
          <div className="space-y-12">
            {months.map((month, index) => (
              <div 
                key={month.month}
                className={`relative flex items-start gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                data-testid={`roadmap-month-${month.month}`}
              >
                {/* Timeline dot */}
                <div className={`absolute left-8 md:left-1/2 w-8 h-8 rounded-full bg-gradient-to-r ${month.color} flex items-center justify-center text-white font-bold text-sm transform -translate-x-1/2 z-10 shadow-lg`}>
                  {month.month}
                </div>

                {/* Content Card */}
                <div className={`ml-20 md:ml-0 md:w-[calc(50%-2rem)] bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                  {/* Header */}
                  <div className="mb-4">
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${month.color} text-white mb-2`}>
                      Month {month.month}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{month.title}</h3>
                    <p className="text-sm text-slate-500 italic">{month.title_fr}</p>
                  </div>

                  <p className="text-slate-600 mb-4">{month.description}</p>

                  {/* Topics */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Topics Covered:</h4>
                    <div className="flex flex-wrap gap-2">
                      {month.topics.slice(0, 4).map((topic, i) => (
                        <span key={i} className="px-2 py-1 bg-slate-100 rounded-full text-xs text-slate-600">
                          {topic}
                        </span>
                      ))}
                      {month.topics.length > 4 && (
                        <span className="px-2 py-1 bg-slate-100 rounded-full text-xs text-slate-600">
                          +{month.topics.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Mic className="w-3 h-3 text-blue-500" />
                      <span className="truncate">{month.skills.speaking}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <Headphones className="w-3 h-3 text-purple-500" />
                      <span className="truncate">{month.skills.listening}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <BookOpen className="w-3 h-3 text-emerald-500" />
                      <span className="truncate">{month.skills.reading}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <PenLine className="w-3 h-3 text-amber-500" />
                      <span className="truncate">{month.skills.writing}</span>
                    </div>
                  </div>

                  {/* Games */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-700 mb-2">
                      <Gamepad2 className="w-4 h-4 text-green-500" />
                      <span className="font-medium">Mini-Games:</span>
                    </div>
                    <p className="text-xs text-slate-500">{month.games.join(', ')}</p>
                  </div>

                  {/* Outcome */}
                  <div className="flex items-start gap-2 p-3 bg-emerald-50 rounded-xl">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-emerald-700">{month.outcome}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
            <p className="text-blue-100 mb-6 max-w-xl mx-auto">
              Join thousands of students who have transformed their French skills with FrenchQuest.
            </p>
            <Link to="/register">
              <Button size="lg" className="rounded-full bg-white text-blue-600 hover:bg-blue-50" data-testid="roadmap-cta-btn">
                Start Learning Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
