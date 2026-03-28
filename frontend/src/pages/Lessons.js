import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { 
  BookOpen, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  Lock,
  Volume2,
  PlayCircle,
  Trophy,
  Star
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { toast } from 'sonner';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Lessons = () => {
  const { lessonId } = useParams();
  const { user, refreshUser } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('learn');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResults, setQuizResults] = useState(null);

  useEffect(() => {
    fetchLessons();
  }, []);

  useEffect(() => {
    if (lessonId) {
      fetchLesson(lessonId);
    }
  }, [lessonId]);

  const fetchLessons = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/lessons`, { withCredentials: true });
      setLessons(response.data);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLesson = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/api/lessons/${id}`, { withCredentials: true });
      setCurrentLesson(response.data);
      setActiveTab('learn');
      setQuizAnswers({});
      setQuizSubmitted(false);
      setQuizResults(null);
    } catch (error) {
      console.error('Error fetching lesson:', error);
    }
  };

  const completeLesson = async () => {
    if (!currentLesson) return;

    try {
      const response = await axios.post(
        `${API_URL}/api/lessons/${currentLesson.id}/complete`,
        {
          lesson_id: currentLesson.id,
          skill_type: currentLesson.skill_focus?.[0] || 'vocabulary',
          score: 100,
          xp_earned: currentLesson.xp_reward || 20
        },
        { withCredentials: true }
      );

      toast.success(`🎉 Lesson completed! +${response.data.xp_earned} XP`);
      refreshUser();
    } catch (error) {
      console.error('Error completing lesson:', error);
      toast.error('Failed to record progress');
    }
  };

  const groupedLessons = lessons.reduce((acc, lesson) => {
    const key = `Month ${lesson.month} - Week ${lesson.week}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(lesson);
    return acc;
  }, {});

  // Lesson List View
  if (!lessonId) {
    return (
      <div className="min-h-screen bg-slate-50 py-8" data-testid="lessons-page">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">French Lessons</h1>
            <p className="text-slate-600">Master French step by step with our structured curriculum</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedLessons).map(([group, groupLessons]) => (
                <div key={group}>
                  <h2 className="text-lg font-semibold text-slate-700 mb-4">{group}</h2>
                  <div className="space-y-3">
                    {groupLessons.map((lesson, i) => {
                      const isCompleted = user?.completed_lessons?.includes(lesson.id);
                      
                      return (
                        <Link
                          key={lesson.id}
                          to={`/lessons/${lesson.id}`}
                          className={`flex items-center gap-4 bg-white rounded-xl p-5 border border-slate-200 hover:shadow-md transition-all ${
                            isCompleted ? 'border-l-4 border-l-green-500' : ''
                          }`}
                          data-testid={`lesson-item-${lesson.id}`}
                        >
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            isCompleted ? 'bg-green-100' : 'bg-blue-100'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle2 className="w-6 h-6 text-green-600" />
                            ) : (
                              <span className="text-lg font-bold text-blue-600">{lesson.day}</span>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-900">{lesson.title}</h3>
                            <p className="text-sm text-slate-500 italic">{lesson.title_fr}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 text-amber-600">
                              <Trophy className="w-4 h-4" />
                              <span className="text-sm font-medium">+{lesson.xp_reward || 20} XP</span>
                            </div>
                            <ArrowRight className="w-5 h-5 text-slate-400" />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Lesson Detail View
  if (!currentLesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8" data-testid="lesson-detail">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link to="/lessons" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Lessons
        </Link>

        {/* Lesson Header */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  Month {currentLesson.month} • Week {currentLesson.week} • Day {currentLesson.day}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900">{currentLesson.title}</h1>
              <p className="text-slate-500 italic">{currentLesson.title_fr}</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full">
              <Trophy className="w-5 h-5 text-amber-600" />
              <span className="font-semibold text-amber-700">+{currentLesson.xp_reward || 20} XP</span>
            </div>
          </div>
          <p className="text-slate-600">{currentLesson.description}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-white p-1 rounded-full border border-slate-200">
          {['learn', 'vocabulary', 'practice'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all ${
                activeTab === tab
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          {activeTab === 'learn' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">Introduction</h3>
                <p className="text-slate-600">{currentLesson.content?.intro || currentLesson.description}</p>
              </div>

              {currentLesson.content?.main_text && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Main Content</h3>
                  <p className="text-slate-600">{currentLesson.content.main_text}</p>
                </div>
              )}

              {currentLesson.grammar_points?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">Grammar Points</h3>
                  <ul className="space-y-2">
                    {currentLesson.grammar_points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                        <span className="text-slate-600">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'vocabulary' && (
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Vocabulary</h3>
              <div className="grid gap-4">
                {currentLesson.vocabulary?.map((word, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                    <div className="flex-1">
                      <p className="text-xl font-bold text-blue-600">{word.french}</p>
                      {word.pronunciation && (
                        <p className="text-sm text-slate-500 italic">[{word.pronunciation}]</p>
                      )}
                      <p className="text-slate-700">{word.english || word.example}</p>
                    </div>
                    <button className="p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200">
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'practice' && (
            <div className="text-center py-8">
              <PlayCircle className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Ready to Practice?</h3>
              <p className="text-slate-600 mb-6">Test your knowledge with interactive exercises</p>
              <Button 
                onClick={completeLesson}
                className="rounded-full bg-green-500 hover:bg-green-600"
                data-testid="complete-lesson-btn"
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Mark as Complete
              </Button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button variant="outline" className="rounded-full" disabled>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous Lesson
          </Button>
          <Button className="rounded-full bg-blue-500 hover:bg-blue-600" onClick={() => setActiveTab('practice')}>
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Lessons;
