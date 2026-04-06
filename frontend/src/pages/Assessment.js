import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ClipboardCheck, CheckCircle2, XCircle, Award, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { toast } from 'sonner';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Assessment = () => {
  const { month } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [completed, setCompleted] = useState(null);
  const [finalResult, setFinalResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssessment();
  }, [month]);

  const fetchAssessment = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/assessments/${month}`);
      setQuestions(res.data.questions);
      if (res.data.completed) {
        setCompleted(res.data.completed);
      }
    } catch (err) {
      toast.error('Failed to load assessment');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = () => {
    if (selected === null) return;
    const isCorrect = selected === questions[current].correct_answer;
    const newAnswers = [...answers, { question: current, selected, isCorrect }];
    setAnswers(newAnswers);
    setShowResult(true);
  };

  const nextQuestion = async () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      const correctCount = [...answers].filter(a => a.isCorrect).length +
        (selected === questions[current].correct_answer ? 1 : 0);
      const score = Math.round((correctCount / questions.length) * 100);
      try {
        const res = await axios.post(`${API_URL}/api/assessments/submit`, {
          month: parseInt(month),
          answers: answers,
          score
        });
        setFinalResult({ ...res.data, total: questions.length, correct: correctCount });
      } catch {
        toast.error('Failed to submit assessment');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (completed && !finalResult) {
    return (
      <div className="min-h-screen bg-slate-50 py-8" data-testid="assessment-completed">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 border text-center">
            <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Already Completed!</h2>
            <p className="text-slate-600 mb-2">You scored {completed.score}%</p>
            <p className={`text-lg font-medium mb-6 ${completed.passed ? 'text-green-600' : 'text-red-600'}`}>
              {completed.passed ? 'Passed!' : 'Not passed yet'}
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => { setCompleted(null); setCurrent(0); setAnswers([]); }} variant="outline" className="rounded-full">
                Retake
              </Button>
              <Button onClick={() => navigate('/roadmap')} className="rounded-full">
                Back to Roadmap
              </Button>
              {completed.passed && (
                <Button onClick={() => navigate(`/certificate/${month}`)} className="rounded-full bg-yellow-500 hover:bg-yellow-600">
                  View Certificate
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (finalResult) {
    return (
      <div className="min-h-screen bg-slate-50 py-8" data-testid="assessment-result">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 border text-center">
            {finalResult.passed ? (
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
            )}
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Month {month} Assessment {finalResult.passed ? 'Passed!' : 'Not Passed'}
            </h2>
            <p className="text-4xl font-bold mb-2" style={{ color: finalResult.passed ? '#10b981' : '#ef4444' }}>
              {finalResult.score}%
            </p>
            <p className="text-slate-600 mb-2">{finalResult.correct}/{finalResult.total} correct answers</p>
            <p className="text-blue-600 font-medium mb-6">+{finalResult.xp_earned} XP earned</p>

            {!finalResult.passed && (
              <p className="text-amber-600 mb-4">You need 70% to pass. Review the lessons and try again!</p>
            )}

            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate('/roadmap')} variant="outline" className="rounded-full">
                Back to Roadmap
              </Button>
              {finalResult.passed && (
                <Button onClick={() => navigate(`/certificate/${month}`)} className="rounded-full bg-yellow-500 hover:bg-yellow-600">
                  View Certificate
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="min-h-screen bg-slate-50 py-8" data-testid="assessment-page">
      <div className="max-w-3xl mx-auto px-4">
        <button onClick={() => navigate('/roadmap')} className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Roadmap
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-medium mb-3">
            <ClipboardCheck className="w-4 h-4" />
            Month {month} Assessment
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Monthly Assessment</h1>
        </div>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-slate-600 mb-2">
            <span>Question {current + 1} of {questions.length}</span>
            <span>{answers.filter(a => a.isCorrect).length} correct</span>
          </div>
          <Progress value={((current + 1) / questions.length) * 100} className="h-3" />
        </div>

        <div className="bg-white rounded-2xl border p-6 mb-6">
          <span className="text-xs px-2 py-1 bg-slate-100 rounded-full text-slate-500 mb-3 inline-block">
            {q.skill_type}
          </span>
          <h3 className="text-lg font-semibold text-slate-900 mb-4">{q.question}</h3>

          <div className="space-y-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => !showResult && setSelected(i)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  showResult && i === q.correct_answer
                    ? 'border-green-500 bg-green-50'
                    : showResult && selected === i
                      ? 'border-red-500 bg-red-50'
                      : selected === i
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-blue-300'
                }`}
                data-testid={`assessment-option-${i}`}
              >
                {opt}
              </button>
            ))}
          </div>

          {showResult && q.explanation && (
            <div className="mt-4 p-3 bg-blue-50 rounded-xl text-sm text-blue-700">
              {q.explanation}
            </div>
          )}
        </div>

        <div className="flex justify-center">
          {!showResult ? (
            <Button onClick={handleAnswer} disabled={selected === null} className="rounded-full px-8" data-testid="check-assessment-btn">
              Check Answer
            </Button>
          ) : (
            <Button onClick={nextQuestion} className="rounded-full px-8" data-testid="next-assessment-btn">
              {current === questions.length - 1 ? 'See Results' : 'Next Question'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment;
