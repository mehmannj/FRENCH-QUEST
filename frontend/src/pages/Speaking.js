import React, { useState } from 'react';
import { Mic, Volume2, CheckCircle2, XCircle, RefreshCw, Play } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';

const Speaking = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [score, setScore] = useState(null);
  const [completed, setCompleted] = useState([]);

  const phrases = [
    { french: "Bonjour, comment allez-vous?", english: "Hello, how are you?", pronunciation: "bohn-zhoor, koh-mahn tah-lay voo" },
    { french: "Je m'appelle...", english: "My name is...", pronunciation: "zhuh mah-pel" },
    { french: "Enchanté de vous rencontrer", english: "Nice to meet you", pronunciation: "ahn-shahn-tay duh voo rahn-kohn-tray" },
    { french: "Merci beaucoup", english: "Thank you very much", pronunciation: "mehr-see boh-koo" },
    { french: "S'il vous plaît", english: "Please", pronunciation: "seel voo pleh" },
    { french: "Je ne comprends pas", english: "I don't understand", pronunciation: "zhuh nuh kohm-prahn pah" },
    { french: "Parlez-vous anglais?", english: "Do you speak English?", pronunciation: "par-lay voo ahn-gleh" },
    { french: "Au revoir", english: "Goodbye", pronunciation: "oh ruh-vwahr" },
  ];

  const phrase = phrases[currentPhrase];
  const progress = (completed.length / phrases.length) * 100;

  const handleRecord = () => {
    setIsRecording(!isRecording);
    if (isRecording) {
      // Simulate speech recognition result
      setTimeout(() => {
        const randomScore = Math.floor(Math.random() * 40) + 60;
        setScore(randomScore);
        if (randomScore >= 70 && !completed.includes(currentPhrase)) {
          setCompleted([...completed, currentPhrase]);
        }
      }, 1000);
    }
  };

  const nextPhrase = () => {
    if (currentPhrase < phrases.length - 1) {
      setCurrentPhrase(currentPhrase + 1);
      setScore(null);
    }
  };

  const prevPhrase = () => {
    if (currentPhrase > 0) {
      setCurrentPhrase(currentPhrase - 1);
      setScore(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8" data-testid="speaking-lab">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-4">
            <Mic className="w-4 h-4" />
            Speaking Practice
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Speaking Lab</h1>
          <p className="text-slate-600">Practice your French pronunciation with interactive exercises</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
            <span>Progress</span>
            <span>{completed.length}/{phrases.length} completed</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Phrase Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
          {/* Phrase display */}
          <div className="p-8 text-center border-b border-slate-100">
            <p className="text-sm text-slate-500 mb-2">Phrase {currentPhrase + 1} of {phrases.length}</p>
            <p className="text-3xl font-bold text-blue-600 mb-3">{phrase.french}</p>
            <p className="text-slate-400 italic mb-4">[{phrase.pronunciation}]</p>
            <p className="text-lg text-slate-600">{phrase.english}</p>
          </div>

          {/* Listen button */}
          <div className="p-4 bg-slate-50 flex justify-center">
            <Button variant="outline" className="rounded-full gap-2">
              <Volume2 className="w-5 h-5" />
              Listen to Pronunciation
            </Button>
          </div>

          {/* Recording section */}
          <div className="p-8">
            <div className="flex flex-col items-center">
              <button
                onClick={handleRecord}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${
                  isRecording
                    ? 'bg-red-500 scale-110 animate-pulse'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
                data-testid="record-btn"
              >
                <Mic className="w-10 h-10 text-white" />
              </button>
              <p className="mt-4 text-sm text-slate-600">
                {isRecording ? 'Recording... Click to stop' : 'Click to record your voice'}
              </p>
            </div>

            {/* Score display */}
            {score !== null && (
              <div className={`mt-6 p-4 rounded-xl text-center ${
                score >= 70 ? 'bg-green-50' : 'bg-amber-50'
              }`}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  {score >= 70 ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  ) : (
                    <XCircle className="w-6 h-6 text-amber-600" />
                  )}
                  <span className={`text-2xl font-bold ${
                    score >= 70 ? 'text-green-600' : 'text-amber-600'
                  }`}>
                    {score}%
                  </span>
                </div>
                <p className={`text-sm ${score >= 70 ? 'text-green-700' : 'text-amber-700'}`}>
                  {score >= 90 ? 'Excellent! Perfect pronunciation!' :
                   score >= 70 ? 'Good job! Keep practicing!' :
                   'Try again! Focus on the pronunciation guide.'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevPhrase}
            disabled={currentPhrase === 0}
            className="rounded-full"
          >
            Previous
          </Button>
          <Button
            onClick={() => {
              setScore(null);
              setIsRecording(false);
            }}
            variant="outline"
            className="rounded-full"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
          <Button
            onClick={nextPhrase}
            disabled={currentPhrase === phrases.length - 1}
            className="rounded-full bg-blue-500 hover:bg-blue-600"
          >
            Next
          </Button>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-purple-50 rounded-xl p-6">
          <h3 className="font-semibold text-purple-900 mb-3">Pronunciation Tips</h3>
          <ul className="space-y-2 text-sm text-purple-700">
            <li>• French 'r' is pronounced in the back of the throat</li>
            <li>• Silent letters are common at the end of words</li>
            <li>• Nasal sounds (an, en, in, on, un) are unique to French</li>
            <li>• Link words together (liaison) when speaking</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Speaking;
