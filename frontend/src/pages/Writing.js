import React, { useState } from 'react';
import { PenLine, CheckCircle2, Lightbulb, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';

const Writing = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userText, setUserText] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const exercises = [
    {
      type: 'fill-blank',
      instruction: 'Complete the sentence by filling in the blank:',
      sentence: 'Bonjour, je _____ Marie.',
      answer: "m'appelle",
      hint: "Use the verb 's'appeler' conjugated for 'je'",
      translation: "Hello, my name is Marie."
    },
    {
      type: 'fill-blank',
      instruction: 'Complete the sentence:',
      sentence: 'Je _____ français.',
      answer: 'parle',
      hint: "Use the verb 'parler' (to speak) conjugated for 'je'",
      translation: "I speak French."
    },
    {
      type: 'fill-blank',
      instruction: 'Complete the sentence:',
      sentence: 'Nous _____ à Paris.',
      answer: 'habitons',
      hint: "Use the verb 'habiter' (to live) conjugated for 'nous'",
      translation: "We live in Paris."
    },
    {
      type: 'translate',
      instruction: 'Translate this sentence to French:',
      english: 'I am a student.',
      answer: 'Je suis étudiant',
      acceptedAnswers: ['Je suis étudiant', 'Je suis étudiante', 'Je suis un étudiant', 'Je suis une étudiante'],
      hint: "Use 'être' (to be) and the word for student"
    },
    {
      type: 'translate',
      instruction: 'Translate this sentence to French:',
      english: 'She has a cat.',
      answer: 'Elle a un chat',
      acceptedAnswers: ['Elle a un chat'],
      hint: "Use 'avoir' (to have) and remember articles!"
    },
    {
      type: 'reorder',
      instruction: 'Put the words in the correct order:',
      words: ['Paris', 'J\'', 'à', 'habite'],
      answer: "J'habite à Paris",
      hint: "French sentence structure: Subject + Verb + Location"
    }
  ];

  const exercise = exercises[currentExercise];
  const progress = ((currentExercise + 1) / exercises.length) * 100;

  const checkAnswer = () => {
    let isCorrect = false;
    
    if (exercise.type === 'fill-blank') {
      isCorrect = userText.toLowerCase().trim() === exercise.answer.toLowerCase();
    } else if (exercise.type === 'translate') {
      isCorrect = exercise.acceptedAnswers.some(
        ans => userText.toLowerCase().trim() === ans.toLowerCase()
      );
    } else if (exercise.type === 'reorder') {
      isCorrect = userText.toLowerCase().trim() === exercise.answer.toLowerCase();
    }

    if (isCorrect) {
      setScore(score + 1);
    }
    setSubmitted(true);
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setUserText('');
      setShowHint(false);
      setSubmitted(false);
    }
  };

  const resetQuiz = () => {
    setCurrentExercise(0);
    setUserText('');
    setShowHint(false);
    setSubmitted(false);
    setScore(0);
  };

  // Results screen
  if (currentExercise === exercises.length - 1 && submitted) {
    const finalScore = userText.toLowerCase().trim() === exercise.answer.toLowerCase() 
      || (exercise.acceptedAnswers && exercise.acceptedAnswers.some(ans => userText.toLowerCase().trim() === ans.toLowerCase()))
      ? score + 1 : score;
    const percentage = (finalScore / exercises.length) * 100;

    return (
      <div className="min-h-screen bg-slate-50 py-8" data-testid="writing-results">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center">
            <div className="text-6xl mb-4">✍️</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Writing Practice Complete!</h2>
            <p className="text-slate-600 mb-6">You scored {finalScore} out of {exercises.length}</p>
            
            <div className="w-32 h-32 mx-auto mb-6 relative">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="56" fill="none" stroke="#e2e8f0" strokeWidth="12" />
                <circle
                  cx="64" cy="64" r="56" fill="none"
                  stroke={percentage >= 80 ? '#10b981' : percentage >= 60 ? '#f59e0b' : '#ef4444'}
                  strokeWidth="12"
                  strokeDasharray={`${percentage * 3.52} 352`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-slate-900">{Math.round(percentage)}%</span>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={resetQuiz} variant="outline" className="rounded-full">
                Try Again
              </Button>
              <Button className="rounded-full bg-blue-500 hover:bg-blue-600">
                Continue Learning
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8" data-testid="writing-lab">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-4">
            <PenLine className="w-4 h-4" />
            Writing Practice
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Writing Lab</h1>
          <p className="text-slate-600">Practice writing French sentences and build your skills</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
            <span>Exercise {currentExercise + 1} of {exercises.length}</span>
            <span>Score: {score}/{currentExercise}</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Exercise Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
          {/* Exercise type badge */}
          <div className="p-4 bg-amber-50 border-b border-slate-100">
            <span className="px-3 py-1 bg-amber-200 text-amber-800 rounded-full text-sm font-medium">
              {exercise.type === 'fill-blank' ? 'Fill in the Blank' :
               exercise.type === 'translate' ? 'Translation' : 'Word Order'}
            </span>
          </div>

          {/* Exercise content */}
          <div className="p-6">
            <p className="text-slate-600 mb-4">{exercise.instruction}</p>

            {exercise.type === 'fill-blank' && (
              <div className="text-center p-6 bg-slate-50 rounded-xl mb-4">
                <p className="text-2xl font-medium text-slate-800">
                  {exercise.sentence.split('_____')[0]}
                  <span className="inline-block min-w-[100px] border-b-2 border-amber-500 mx-1">
                    {submitted && (
                      <span className={userText.toLowerCase().trim() === exercise.answer.toLowerCase() ? 'text-green-600' : 'text-red-600'}>
                        {userText || exercise.answer}
                      </span>
                    )}
                  </span>
                  {exercise.sentence.split('_____')[1]}
                </p>
                {exercise.translation && (
                  <p className="text-sm text-slate-500 mt-2 italic">{exercise.translation}</p>
                )}
              </div>
            )}

            {exercise.type === 'translate' && (
              <div className="text-center p-6 bg-slate-50 rounded-xl mb-4">
                <p className="text-2xl font-medium text-slate-800">"{exercise.english}"</p>
              </div>
            )}

            {exercise.type === 'reorder' && (
              <div className="p-6 bg-slate-50 rounded-xl mb-4">
                <div className="flex flex-wrap gap-2 justify-center">
                  {exercise.words.map((word, i) => (
                    <span key={i} className="px-4 py-2 bg-white border border-slate-300 rounded-lg font-medium">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            {!submitted && (
              <div className="relative">
                <input
                  type="text"
                  value={userText}
                  onChange={(e) => setUserText(e.target.value)}
                  placeholder={exercise.type === 'fill-blank' ? 'Type the missing word...' : 'Type your answer...'}
                  className="w-full p-4 pr-12 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-lg"
                  data-testid="writing-input"
                />
                <Button
                  onClick={checkAnswer}
                  disabled={!userText.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-amber-500 hover:bg-amber-600 p-2"
                  data-testid="submit-answer-btn"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            )}

            {/* Result */}
            {submitted && (
              <div className={`p-4 rounded-xl ${
                userText.toLowerCase().trim() === exercise.answer.toLowerCase() ||
                (exercise.acceptedAnswers && exercise.acceptedAnswers.some(ans => userText.toLowerCase().trim() === ans.toLowerCase()))
                  ? 'bg-green-50 border border-green-200'
                  : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className={`w-5 h-5 ${
                    userText.toLowerCase().trim() === exercise.answer.toLowerCase() ||
                    (exercise.acceptedAnswers && exercise.acceptedAnswers.some(ans => userText.toLowerCase().trim() === ans.toLowerCase()))
                      ? 'text-green-600' : 'text-red-600'
                  }`} />
                  <span className="font-medium">
                    {userText.toLowerCase().trim() === exercise.answer.toLowerCase() ||
                    (exercise.acceptedAnswers && exercise.acceptedAnswers.some(ans => userText.toLowerCase().trim() === ans.toLowerCase()))
                      ? 'Correct!' : 'Not quite right'}
                  </span>
                </div>
                <p className="text-sm text-slate-600">
                  Correct answer: <span className="font-medium text-green-700">{exercise.answer}</span>
                </p>
              </div>
            )}

            {/* Hint */}
            {!submitted && (
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-2 mt-4 text-amber-600 hover:text-amber-700"
              >
                <Lightbulb className="w-4 h-4" />
                <span className="text-sm">{showHint ? 'Hide hint' : 'Show hint'}</span>
              </button>
            )}

            {showHint && !submitted && (
              <div className="mt-2 p-3 bg-amber-50 rounded-lg text-sm text-amber-700">
                💡 {exercise.hint}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        {submitted && (
          <div className="flex justify-center">
            <Button
              onClick={nextExercise}
              className="rounded-full bg-blue-500 hover:bg-blue-600 px-8"
              data-testid="next-exercise-btn"
            >
              {currentExercise === exercises.length - 1 ? 'See Results' : 'Next Exercise'}
            </Button>
          </div>
        )}

        {/* Tips */}
        <div className="mt-8 bg-amber-50 rounded-xl p-6">
          <h3 className="font-semibold text-amber-900 mb-3">Writing Tips</h3>
          <ul className="space-y-2 text-sm text-amber-700">
            <li>• Pay attention to accents (é, è, ê, à, etc.)</li>
            <li>• Remember verb conjugations change with the subject</li>
            <li>• Use the correct article (le, la, les, un, une, des)</li>
            <li>• Check your spelling carefully</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Writing;
