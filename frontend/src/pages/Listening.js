import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Headphones, Volume2, CheckCircle2, XCircle, Play, RotateCcw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { toast } from 'sonner';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Listening = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completed, setCompleted] = useState(false);
  const audioRef = useRef(null);

  const exercises = [
    {
      french: "Bonjour, je m'appelle Marie.",
      question: "What is the speaker's name?",
      options: ["Marie", "Sophie", "Claire", "Julie"],
      correct: 0,
      transcript: "Bonjour, je m'appelle Marie."
    },
    {
      french: "J'habite à Paris depuis cinq ans.",
      question: "How long has the speaker lived in Paris?",
      options: ["Three years", "Five years", "Seven years", "Ten years"],
      correct: 1,
      transcript: "J'habite à Paris depuis cinq ans."
    },
    {
      french: "Il fait beau aujourd'hui.",
      question: "What is the weather like?",
      options: ["It's raining", "It's nice/beautiful", "It's cold", "It's windy"],
      correct: 1,
      transcript: "Il fait beau aujourd'hui."
    },
    {
      french: "Je voudrais un café, s'il vous plaît.",
      question: "What does the speaker want?",
      options: ["Tea", "Water", "Coffee", "Juice"],
      correct: 2,
      transcript: "Je voudrais un café, s'il vous plaît."
    },
    {
      french: "Le train part à huit heures.",
      question: "What time does the train leave?",
      options: ["6 o'clock", "7 o'clock", "8 o'clock", "9 o'clock"],
      correct: 2,
      transcript: "Le train part à huit heures."
    },
    {
      french: "Ma soeur a trois enfants.",
      question: "How many children does the speaker's sister have?",
      options: ["One", "Two", "Three", "Four"],
      correct: 2,
      transcript: "Ma soeur a trois enfants."
    },
    {
      french: "Le restaurant est fermé le lundi.",
      question: "When is the restaurant closed?",
      options: ["Sunday", "Monday", "Tuesday", "Saturday"],
      correct: 1,
      transcript: "Le restaurant est fermé le lundi."
    }
  ];

  const exercise = exercises[currentExercise];
  const progressVal = ((currentExercise) / exercises.length) * 100;

  const playAudio = async () => {
    if (isPlaying) return;
    setIsPlaying(true);

    try {
      const response = await axios.post(`${API_URL}/api/tts/generate`, {
        text: exercise.french,
        voice: "nova",
        speed: 0.85
      });

      const audio = new Audio(`data:audio/mp3;base64,${response.data.audio_base64}`);
      audioRef.current = audio;
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => setIsPlaying(false);
      audio.play();
    } catch {
      // Fallback to browser TTS
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(exercise.french);
        utterance.lang = 'fr-FR';
        utterance.rate = 0.8;
        utterance.onend = () => setIsPlaying(false);
        speechSynthesis.speak(utterance);
      } else {
        setIsPlaying(false);
        toast.error('Audio playback unavailable');
      }
    }
  };

  const checkAnswer = () => {
    if (selectedAnswer === null) return;
    if (selectedAnswer === exercise.correct) {
      setScore(s => s + 1);
    }
    setShowResult(true);
  };

  const nextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentExercise(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
  };

  if (completed) {
    const finalScore = showResult && selectedAnswer === exercise.correct ? score : score;
    const percentage = (finalScore / exercises.length) * 100;

    return (
      <div className="min-h-screen bg-slate-50 py-8" data-testid="listening-results">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center">
            <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-6">
              <Headphones className="w-10 h-10 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Listening Practice Complete!</h2>
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

            <p className="text-lg font-medium mb-2 text-purple-700">+{finalScore * 15} XP earned</p>
            <p className="text-slate-600 mb-6">
              {percentage >= 80 ? 'Excellent! Your listening skills are impressive!' :
               percentage >= 60 ? 'Good job! Keep practicing to improve further.' :
               'Keep practicing! Listening takes time to develop.'}
            </p>

            <div className="flex gap-4 justify-center">
              <Button onClick={resetQuiz} variant="outline" className="rounded-full gap-2">
                <RotateCcw className="w-4 h-4" />
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8" data-testid="listening-lab">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
            <Headphones className="w-4 h-4" />
            Listening Practice
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Listening Lab</h1>
          <p className="text-slate-600">Train your ear to understand spoken French</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
            <span>Exercise {currentExercise + 1} of {exercises.length}</span>
            <span>Score: {score}/{currentExercise}</span>
          </div>
          <Progress value={progressVal} className="h-3" />
        </div>

        {/* Exercise Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
          {/* Audio player */}
          <div className="p-8 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-center">
            <button
              onClick={playAudio}
              className={`w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4 transition-transform ${
                isPlaying ? 'scale-110 animate-pulse' : 'hover:scale-105'
              }`}
              data-testid="play-audio-btn"
            >
              {isPlaying ? (
                <Volume2 className="w-10 h-10" />
              ) : (
                <Play className="w-10 h-10 ml-1" />
              )}
            </button>
            <p className="text-purple-100">{isPlaying ? 'Playing audio...' : 'Click to play audio'}</p>
            <p className="text-xs text-purple-200 mt-1">You can replay as many times as you need</p>
          </div>

          {/* Question */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">{exercise.question}</h3>

            {/* Options */}
            <div className="space-y-3">
              {exercise.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => !showResult && setSelectedAnswer(i)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    showResult
                      ? i === exercise.correct
                        ? 'border-green-500 bg-green-50'
                        : selectedAnswer === i
                          ? 'border-red-500 bg-red-50'
                          : 'border-slate-200'
                      : selectedAnswer === i
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 hover:border-blue-300'
                  }`}
                  disabled={showResult}
                  data-testid={`option-${i}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      showResult && i === exercise.correct
                        ? 'border-green-500 bg-green-500'
                        : showResult && selectedAnswer === i
                          ? 'border-red-500 bg-red-500'
                          : selectedAnswer === i
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-slate-300'
                    }`}>
                      {showResult && i === exercise.correct && <CheckCircle2 className="w-4 h-4 text-white" />}
                      {showResult && selectedAnswer === i && i !== exercise.correct && <XCircle className="w-4 h-4 text-white" />}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Transcript (shown after answer) */}
            {showResult && (
              <div className="mt-6 p-4 bg-slate-50 rounded-xl">
                <p className="text-sm text-slate-500 mb-1">Transcript:</p>
                <p className="text-lg font-medium text-slate-900 italic">"{exercise.transcript}"</p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          {!showResult ? (
            <Button
              onClick={checkAnswer}
              disabled={selectedAnswer === null}
              className="rounded-full bg-purple-500 hover:bg-purple-600 px-8"
              data-testid="check-answer-btn"
            >
              Check Answer
            </Button>
          ) : (
            <Button
              onClick={nextExercise}
              className="rounded-full bg-blue-500 hover:bg-blue-600 px-8"
              data-testid="next-exercise-btn"
            >
              {currentExercise === exercises.length - 1 ? 'See Results' : 'Next Exercise'}
            </Button>
          )}
        </div>

        {/* Tips */}
        <div className="mt-8 bg-purple-50 rounded-xl p-6">
          <h3 className="font-semibold text-purple-900 mb-3">Listening Tips</h3>
          <ul className="space-y-2 text-sm text-purple-700">
            <li>- Listen for keywords and context clues</li>
            <li>- Don't worry about understanding every word</li>
            <li>- Play the audio multiple times if needed</li>
            <li>- Focus on intonation and rhythm</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Listening;
