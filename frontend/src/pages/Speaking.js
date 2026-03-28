import React, { useState, useRef, useEffect } from 'react';
import { Mic, Volume2, CheckCircle2, XCircle, RefreshCw, Play, StopCircle, MicOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { toast } from 'sonner';

const Speaking = () => {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [score, setScore] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const recognitionRef = useRef(null);

  const phrases = [
    { french: "Bonjour", english: "Hello", pronunciation: "bohn-zhoor", difficulty: "easy" },
    { french: "Comment allez-vous?", english: "How are you?", pronunciation: "koh-mahn tah-lay voo", difficulty: "easy" },
    { french: "Je m'appelle...", english: "My name is...", pronunciation: "zhuh mah-pel", difficulty: "easy" },
    { french: "Enchanté de vous rencontrer", english: "Nice to meet you", pronunciation: "ahn-shahn-tay duh voo rahn-kohn-tray", difficulty: "medium" },
    { french: "Merci beaucoup", english: "Thank you very much", pronunciation: "mehr-see boh-koo", difficulty: "easy" },
    { french: "S'il vous plaît", english: "Please", pronunciation: "seel voo pleh", difficulty: "easy" },
    { french: "Je ne comprends pas", english: "I don't understand", pronunciation: "zhuh nuh kohm-prahn pah", difficulty: "medium" },
    { french: "Parlez-vous anglais?", english: "Do you speak English?", pronunciation: "par-lay voo ahn-gleh", difficulty: "medium" },
    { french: "Où est la gare?", english: "Where is the train station?", pronunciation: "oo ay lah gar", difficulty: "medium" },
    { french: "Je voudrais un café", english: "I would like a coffee", pronunciation: "zhuh voo-dray uhn kah-fay", difficulty: "medium" },
    { french: "Au revoir", english: "Goodbye", pronunciation: "oh ruh-vwahr", difficulty: "easy" },
    { french: "À bientôt", english: "See you soon", pronunciation: "ah bee-en-toh", difficulty: "easy" },
  ];

  const phrase = phrases[currentPhrase];
  const progress = (completed.length / phrases.length) * 100;

  useEffect(() => {
    // Check for speech recognition support
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
    }
  }, []);

  const initSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return null;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'fr-FR';

    recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      const text = result[0].transcript;
      setTranscript(text);

      if (result.isFinal) {
        evaluatePronunciation(text);
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
      if (event.error === 'no-speech') {
        toast.error('No speech detected. Please try again.');
      } else if (event.error === 'not-allowed') {
        toast.error('Microphone access denied. Please enable it in your browser settings.');
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    return recognition;
  };

  const evaluatePronunciation = (spokenText) => {
    const targetText = phrase.french.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents for comparison
      .replace(/[^a-z\s]/g, '');
    
    const spoken = spokenText.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z\s]/g, '');

    // Calculate similarity
    const targetWords = targetText.split(' ');
    const spokenWords = spoken.split(' ');
    
    let matchCount = 0;
    targetWords.forEach(word => {
      if (spokenWords.some(sw => sw.includes(word) || word.includes(sw))) {
        matchCount++;
      }
    });

    const similarity = (matchCount / targetWords.length) * 100;
    const adjustedScore = Math.min(Math.max(Math.round(similarity), 0), 100);
    
    setScore(adjustedScore);
    
    if (adjustedScore >= 70 && !completed.includes(currentPhrase)) {
      setCompleted([...completed, currentPhrase]);
      toast.success('Great pronunciation! +15 XP');
    }
  };

  const handleRecord = () => {
    if (isRecording) {
      // Stop recording
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
    } else {
      // Start recording
      setTranscript('');
      setScore(null);
      
      if (!isSupported) {
        // Fallback: simulate recording
        setIsRecording(true);
        setTimeout(() => {
          setIsRecording(false);
          const randomScore = Math.floor(Math.random() * 40) + 60;
          setScore(randomScore);
          if (randomScore >= 70 && !completed.includes(currentPhrase)) {
            setCompleted([...completed, currentPhrase]);
          }
        }, 2000);
        return;
      }

      recognitionRef.current = initSpeechRecognition();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
          setIsRecording(true);
        } catch (error) {
          console.error('Error starting recognition:', error);
          toast.error('Could not start recording. Please try again.');
        }
      }
    }
  };

  const playAudio = () => {
    setIsPlaying(true);
    // Use Web Speech API for text-to-speech
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(phrase.french);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.8;
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlaying(false), 1500);
    }
  };

  const nextPhrase = () => {
    if (currentPhrase < phrases.length - 1) {
      setCurrentPhrase(currentPhrase + 1);
      setScore(null);
      setTranscript('');
    }
  };

  const prevPhrase = () => {
    if (currentPhrase > 0) {
      setCurrentPhrase(currentPhrase - 1);
      setScore(null);
      setTranscript('');
    }
  };

  const getDifficultyColor = (diff) => {
    switch(diff) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-amber-100 text-amber-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
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
          <p className="text-slate-600">Practice your French pronunciation with speech recognition</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
            <span>Progress</span>
            <span>{completed.length}/{phrases.length} completed</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Browser Support Warning */}
        {!isSupported && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700">
            <strong>Note:</strong> Speech recognition is not fully supported in your browser. 
            Using simulated scoring for demo purposes. For best results, use Chrome.
          </div>
        )}

        {/* Phrase Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
          {/* Phrase display */}
          <div className="p-8 text-center border-b border-slate-100">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-sm text-slate-500">Phrase {currentPhrase + 1} of {phrases.length}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(phrase.difficulty)}`}>
                {phrase.difficulty}
              </span>
            </div>
            <p className="text-3xl font-bold text-blue-600 mb-3">{phrase.french}</p>
            <p className="text-slate-400 italic mb-4">[{phrase.pronunciation}]</p>
            <p className="text-lg text-slate-600">{phrase.english}</p>
          </div>

          {/* Listen button */}
          <div className="p-4 bg-slate-50 flex justify-center">
            <Button 
              variant="outline" 
              className="rounded-full gap-2"
              onClick={playAudio}
              disabled={isPlaying}
            >
              {isPlaying ? (
                <>
                  <Volume2 className="w-5 h-5 animate-pulse" />
                  Playing...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Listen to Pronunciation
                </>
              )}
            </Button>
          </div>

          {/* Recording section */}
          <div className="p-8">
            <div className="flex flex-col items-center">
              <button
                onClick={handleRecord}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all transform ${
                  isRecording
                    ? 'bg-red-500 scale-110 animate-pulse'
                    : 'bg-blue-500 hover:bg-blue-600 hover:scale-105'
                }`}
                data-testid="record-btn"
              >
                {isRecording ? (
                  <StopCircle className="w-10 h-10 text-white" />
                ) : (
                  <Mic className="w-10 h-10 text-white" />
                )}
              </button>
              <p className="mt-4 text-sm text-slate-600">
                {isRecording ? 'Recording... Click to stop' : 'Click to record your voice'}
              </p>
            </div>

            {/* Transcript Display */}
            {transcript && (
              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-slate-500 mb-1">What I heard:</p>
                <p className="text-lg font-medium text-blue-700">"{transcript}"</p>
              </div>
            )}

            {/* Score display */}
            {score !== null && (
              <div className={`mt-6 p-6 rounded-xl text-center ${
                score >= 80 ? 'bg-green-50' : 
                score >= 60 ? 'bg-amber-50' : 'bg-red-50'
              }`}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  {score >= 70 ? (
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  ) : (
                    <XCircle className="w-8 h-8 text-amber-600" />
                  )}
                  <span className={`text-4xl font-bold ${
                    score >= 80 ? 'text-green-600' : 
                    score >= 60 ? 'text-amber-600' : 'text-red-600'
                  }`}>
                    {score}%
                  </span>
                </div>
                <p className={`text-sm ${
                  score >= 80 ? 'text-green-700' : 
                  score >= 60 ? 'text-amber-700' : 'text-red-700'
                }`}>
                  {score >= 90 ? 'Excellent! Parfait! 🎉' :
                   score >= 80 ? 'Très bien! Great job!' :
                   score >= 70 ? 'Bon travail! Keep it up!' :
                   score >= 60 ? 'Getting there! Try again.' :
                   'Keep practicing! Listen and try again.'}
                </p>
                {score >= 70 && (
                  <p className="mt-2 text-green-600 font-medium">+15 XP earned!</p>
                )}
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
              setTranscript('');
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
            <li>• <strong>French 'R'</strong> - Pronounced in the back of the throat (guttural)</li>
            <li>• <strong>Silent letters</strong> - Final consonants are often silent (except C, R, F, L)</li>
            <li>• <strong>Nasal sounds</strong> - 'an', 'en', 'in', 'on', 'un' are unique nasal vowels</li>
            <li>• <strong>Liaison</strong> - Link words together when the second word starts with a vowel</li>
            <li>• <strong>Speak slowly</strong> - Clarity is more important than speed!</li>
          </ul>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 text-center border border-slate-200">
            <div className="text-2xl font-bold text-blue-600">{completed.length}</div>
            <div className="text-sm text-slate-500">Completed</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-slate-200">
            <div className="text-2xl font-bold text-green-600">{completed.length * 15}</div>
            <div className="text-sm text-slate-500">XP Earned</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center border border-slate-200">
            <div className="text-2xl font-bold text-purple-600">{phrases.length - completed.length}</div>
            <div className="text-sm text-slate-500">Remaining</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Speaking;
