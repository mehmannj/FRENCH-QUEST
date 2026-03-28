import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Gamepad2, 
  Trophy, 
  Clock, 
  Star,
  Play,
  Zap,
  Target,
  Swords,
  Calendar,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const Games = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeGame, setActiveGame] = useState(null);
  const [dailyChallenge, setDailyChallenge] = useState(null);

  useEffect(() => {
    fetchGames();
    fetchDailyChallenge();
  }, []);

  const fetchGames = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/games`, { withCredentials: true });
      setGames(response.data);
    } catch (error) {
      console.error('Error fetching games:', error);
      setGames([
        { id: 'vocab-match', name: 'Vocabulary Match', name_fr: 'Correspondance de Vocabulaire', description: 'Match French words with their meanings', type: 'matching', difficulty: ['easy', 'medium', 'hard'], xp_reward: 20 },
        { id: 'sentence-builder', name: 'Sentence Builder', name_fr: 'Constructeur de Phrases', description: 'Drag and drop words to form correct sentences', type: 'drag-drop', difficulty: ['easy', 'medium', 'hard'], xp_reward: 25 },
        { id: 'memory-cards', name: 'Memory Cards', name_fr: 'Cartes Mémoire', description: 'Find matching pairs of French-English words', type: 'memory', difficulty: ['easy', 'medium', 'hard'], xp_reward: 15 },
        { id: 'translation-race', name: 'Translation Race', name_fr: 'Course de Traduction', description: 'Translate as many words as possible in time limit', type: 'timed', difficulty: ['easy', 'medium', 'hard'], xp_reward: 35 },
        { id: 'spelling-bee', name: 'French Spelling Bee', name_fr: 'Épellation Française', description: 'Spell French words correctly', type: 'spelling', difficulty: ['easy', 'medium', 'hard'], xp_reward: 25 },
        { id: 'boss-battle', name: 'Boss Battle', name_fr: 'Combat de Boss', description: 'Test all your skills against the Month Boss!', type: 'boss', difficulty: ['hard'], xp_reward: 100 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchDailyChallenge = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/challenges/daily`, { withCredentials: true });
      setDailyChallenge(response.data);
    } catch (error) {
      console.error('Error fetching daily challenge:', error);
    }
  };

  const completeDailyChallenge = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/challenges/daily/complete`, {}, { withCredentials: true });
      toast.success(`Daily challenge completed! +${response.data.xp_earned} XP`);
      fetchDailyChallenge();
    } catch (error) {
      console.error('Error completing challenge:', error);
      toast.error('Failed to complete challenge');
    }
  };

  const gameIcons = {
    matching: '🔗',
    'drag-drop': '✋',
    memory: '🧠',
    timed: '⚡',
    spelling: '📝',
    listening: '👂',
    boss: '⚔️'
  };

  const gameColors = {
    matching: 'from-blue-500 to-blue-600',
    'drag-drop': 'from-purple-500 to-purple-600',
    memory: 'from-emerald-500 to-emerald-600',
    timed: 'from-amber-500 to-amber-600',
    spelling: 'from-pink-500 to-pink-600',
    listening: 'from-cyan-500 to-cyan-600',
    boss: 'from-red-600 to-red-700'
  };

  // Memory Game Component
  const MemoryGame = ({ onClose }) => {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameWon, setGameWon] = useState(false);

    const pairs = [
      { french: 'Bonjour', english: 'Hello' },
      { french: 'Merci', english: 'Thank you' },
      { french: 'Au revoir', english: 'Goodbye' },
      { french: 'Oui', english: 'Yes' },
      { french: 'Non', english: 'No' },
      { french: "S'il vous plaît", english: 'Please' },
    ];

    useEffect(() => {
      const allCards = pairs.flatMap((pair, i) => [
        { id: `${i}-fr`, text: pair.french, pairId: i, type: 'french' },
        { id: `${i}-en`, text: pair.english, pairId: i, type: 'english' }
      ]);
      setCards(allCards.sort(() => Math.random() - 0.5));
    }, []);

    const handleCardClick = (card) => {
      if (flipped.length === 2 || flipped.includes(card.id) || matched.includes(card.pairId)) return;

      const newFlipped = [...flipped, card.id];
      setFlipped(newFlipped);

      if (newFlipped.length === 2) {
        setMoves(m => m + 1);
        const [first, second] = newFlipped.map(id => cards.find(c => c.id === id));
        
        if (first.pairId === second.pairId && first.type !== second.type) {
          const newMatched = [...matched, first.pairId];
          setMatched(newMatched);
          setFlipped([]);
          
          if (newMatched.length === pairs.length) {
            setGameWon(true);
          }
        } else {
          setTimeout(() => setFlipped([]), 1000);
        }
      }
    };

    if (gameWon) {
      const score = Math.max(100 - moves * 5, 20);
      return (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Félicitations!</h3>
          <p className="text-slate-600 mb-4">You matched all pairs in {moves} moves!</p>
          <div className="text-3xl font-bold text-blue-600 mb-6">+{score} XP</div>
          <Button onClick={onClose} className="rounded-full">Back to Games</Button>
        </div>
      );
    }

    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm text-slate-600">Moves: <span className="font-bold">{moves}</span></div>
          <div className="text-sm text-slate-600">Matched: <span className="font-bold">{matched.length}/{pairs.length}</span></div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {cards.map(card => {
            const isFlipped = flipped.includes(card.id);
            const isMatched = matched.includes(card.pairId);
            
            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(card)}
                className={`aspect-square rounded-xl text-sm font-medium transition-all transform ${
                  isMatched 
                    ? 'bg-green-100 text-green-700 border-2 border-green-500 scale-95' 
                    : isFlipped 
                      ? 'bg-blue-100 text-blue-700 border-2 border-blue-500' 
                      : 'bg-slate-100 text-slate-400 border-2 border-slate-200 hover:bg-slate-200'
                }`}
                disabled={isMatched}
              >
                {isFlipped || isMatched ? card.text : '?'}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Translation Race Game Component
  const TranslationGame = ({ onClose }) => {
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [currentWord, setCurrentWord] = useState(null);
    const [answer, setAnswer] = useState('');
    const [gameOver, setGameOver] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const words = [
      { french: 'bonjour', english: 'hello' },
      { french: 'merci', english: 'thank you' },
      { french: 'oui', english: 'yes' },
      { french: 'non', english: 'no' },
      { french: 'eau', english: 'water' },
      { french: 'pain', english: 'bread' },
      { french: 'livre', english: 'book' },
      { french: 'chat', english: 'cat' },
      { french: 'chien', english: 'dog' },
      { french: 'maison', english: 'house' },
      { french: 'rouge', english: 'red' },
      { french: 'bleu', english: 'blue' },
      { french: 'vert', english: 'green' },
      { french: 'grand', english: 'big' },
      { french: 'petit', english: 'small' },
    ];

    useEffect(() => {
      nextWord();
    }, []);

    useEffect(() => {
      if (timeLeft > 0 && !gameOver) {
        const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
        return () => clearTimeout(timer);
      } else if (timeLeft === 0) {
        setGameOver(true);
      }
    }, [timeLeft, gameOver]);

    const nextWord = () => {
      const word = words[Math.floor(Math.random() * words.length)];
      setCurrentWord(word);
      setAnswer('');
      setFeedback(null);
    };

    const checkAnswer = (e) => {
      e.preventDefault();
      if (answer.toLowerCase().trim() === currentWord.english.toLowerCase()) {
        setScore(s => s + 10);
        setFeedback('correct');
        setTimeout(nextWord, 500);
      } else {
        setFeedback('wrong');
        setTimeout(() => setFeedback(null), 500);
      }
      setAnswer('');
    };

    if (gameOver) {
      return (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">⚡</div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Time's Up!</h3>
          <p className="text-slate-600 mb-4">You scored {score} points!</p>
          <div className="text-3xl font-bold text-amber-600 mb-6">+{score} XP</div>
          <Button onClick={onClose} className="rounded-full">Back to Games</Button>
        </div>
      );
    }

    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-amber-600">
            <Clock className="w-5 h-5" />
            <span className="font-bold">{timeLeft}s</span>
          </div>
          <div className="flex items-center gap-2 text-blue-600">
            <Zap className="w-5 h-5" />
            <span className="font-bold">{score} pts</span>
          </div>
        </div>

        <div className={`text-center p-8 rounded-2xl mb-6 transition-colors ${
          feedback === 'correct' ? 'bg-green-100' : 
          feedback === 'wrong' ? 'bg-red-100' : 'bg-slate-100'
        }`}>
          <p className="text-sm text-slate-500 mb-2">Translate to English:</p>
          <p className="text-3xl font-bold text-blue-600">{currentWord?.french}</p>
        </div>

        <form onSubmit={checkAnswer} className="flex gap-3">
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type the English translation..."
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <Button type="submit" className="rounded-xl">Check</Button>
        </form>
      </div>
    );
  };

  // Boss Battle Game Component
  const BossBattle = ({ onClose }) => {
    const [phase, setPhase] = useState(0);
    const [bossHealth, setBossHealth] = useState(100);
    const [playerHealth, setPlayerHealth] = useState(100);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [victory, setVictory] = useState(false);

    const questions = [
      { question: "How do you say 'hello' in French?", options: ["Bonjour", "Au revoir", "Merci", "Oui"], correct: 0 },
      { question: "What is 'fifteen' in French?", options: ["Douze", "Quinze", "Vingt", "Dix"], correct: 1 },
      { question: "'Je suis' means:", options: ["I have", "I am", "I go", "I want"], correct: 1 },
      { question: "Which is feminine?", options: ["Le livre", "La table", "Le stylo", "Le chat"], correct: 1 },
      { question: "How do you say 'thank you'?", options: ["S'il vous plaît", "Pardon", "Merci", "Bonjour"], correct: 2 },
      { question: "'J'ai faim' means:", options: ["I'm tired", "I'm hungry", "I'm cold", "I'm happy"], correct: 1 },
      { question: "What color is 'vert'?", options: ["Red", "Blue", "Green", "Yellow"], correct: 2 },
      { question: "'Nous sommes' means:", options: ["We have", "We are", "They are", "You are"], correct: 1 },
    ];

    useEffect(() => {
      setCurrentQuestion(questions[phase]);
    }, [phase]);

    const handleAnswer = (index) => {
      if (showResult) return;
      setSelectedAnswer(index);
      setShowResult(true);

      setTimeout(() => {
        if (index === currentQuestion.correct) {
          const damage = 15;
          const newHealth = bossHealth - damage;
          setBossHealth(newHealth);
          if (newHealth <= 0) {
            setVictory(true);
            setGameOver(true);
          }
        } else {
          const damage = 20;
          const newHealth = playerHealth - damage;
          setPlayerHealth(newHealth);
          if (newHealth <= 0) {
            setVictory(false);
            setGameOver(true);
          }
        }

        if (phase < questions.length - 1 && !gameOver) {
          setPhase(p => p + 1);
          setSelectedAnswer(null);
          setShowResult(false);
        } else if (!gameOver) {
          setVictory(bossHealth <= 0 || playerHealth > 0);
          setGameOver(true);
        }
      }, 1500);
    };

    if (gameOver) {
      return (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">{victory ? '🏆' : '💀'}</div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">
            {victory ? 'Victory!' : 'Defeated!'}
          </h3>
          <p className="text-slate-600 mb-4">
            {victory ? 'You defeated the Month 1 Boss!' : 'The boss was too strong. Keep practicing!'}
          </p>
          {victory && <div className="text-3xl font-bold text-amber-600 mb-6">+100 XP</div>}
          <Button onClick={onClose} className="rounded-full">Back to Games</Button>
        </div>
      );
    }

    return (
      <div>
        {/* Health Bars */}
        <div className="flex justify-between mb-6">
          <div className="w-[45%]">
            <div className="text-sm text-slate-600 mb-1">You</div>
            <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 transition-all"
                style={{ width: `${playerHealth}%` }}
              />
            </div>
          </div>
          <Swords className="w-6 h-6 text-red-500" />
          <div className="w-[45%]">
            <div className="text-sm text-slate-600 mb-1 text-right">Boss</div>
            <div className="h-4 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500 transition-all"
                style={{ width: `${bossHealth}%` }}
              />
            </div>
          </div>
        </div>

        {/* Boss Image */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-2">🐉</div>
          <p className="text-sm text-slate-500">Month 1 Boss: Le Dragon Débutant</p>
        </div>

        {/* Question */}
        <div className="bg-slate-100 rounded-xl p-4 mb-4">
          <p className="font-medium text-slate-900">{currentQuestion?.question}</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          {currentQuestion?.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              disabled={showResult}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                showResult && i === currentQuestion.correct
                  ? 'border-green-500 bg-green-50'
                  : showResult && selectedAnswer === i
                    ? 'border-red-500 bg-red-50'
                    : selectedAnswer === i
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 hover:border-blue-300'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mt-4 text-center text-sm text-slate-500">
          Question {phase + 1} of {questions.length}
        </div>
      </div>
    );
  };

  const renderGame = () => {
    switch (activeGame?.id) {
      case 'memory-cards':
        return <MemoryGame onClose={() => setActiveGame(null)} />;
      case 'translation-race':
        return <TranslationGame onClose={() => setActiveGame(null)} />;
      case 'boss-battle':
        return <BossBattle onClose={() => setActiveGame(null)} />;
      default:
        return (
          <div className="text-center py-8">
            <p className="text-slate-600 mb-4">This game is coming soon!</p>
            <Button onClick={() => setActiveGame(null)} className="rounded-full">Back to Games</Button>
          </div>
        );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8" data-testid="games-hub">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-4">
            <Gamepad2 className="w-4 h-4" />
            Learn by Playing
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Mini-Games Hub</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Practice French vocabulary, grammar, and listening skills through fun interactive games
          </p>
        </div>

        {/* Daily Challenge Card */}
        {dailyChallenge && (
          <div className={`mb-8 rounded-2xl p-6 ${dailyChallenge.completed ? 'bg-green-50 border border-green-200' : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${dailyChallenge.completed ? 'bg-green-200' : 'bg-white/20'}`}>
                  {dailyChallenge.completed ? (
                    <CheckCircle2 className="w-7 h-7 text-green-600" />
                  ) : (
                    <Calendar className="w-7 h-7 text-white" />
                  )}
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${dailyChallenge.completed ? 'text-green-800' : ''}`}>
                    Daily Challenge
                  </h3>
                  <p className={dailyChallenge.completed ? 'text-green-600' : 'text-amber-100'}>
                    {dailyChallenge.completed ? 'Completed!' : dailyChallenge.challenge?.goal}
                  </p>
                </div>
              </div>
              {!dailyChallenge.completed && (
                <div className="text-right">
                  <div className="text-2xl font-bold">+{dailyChallenge.challenge?.xp_reward} XP</div>
                  <Button 
                    onClick={completeDailyChallenge}
                    className="mt-2 rounded-full bg-white text-amber-600 hover:bg-amber-50"
                    size="sm"
                  >
                    Complete
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Active Game Modal */}
        {activeGame && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl" data-testid="game-modal">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">{activeGame.name}</h3>
                <button onClick={() => setActiveGame(null)} className="text-slate-400 hover:text-slate-600">✕</button>
              </div>
              {renderGame()}
            </div>
          </div>
        )}

        {/* Games Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <div
              key={game.id}
              className={`bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all ${
                game.type === 'boss' ? 'ring-2 ring-red-500' : ''
              }`}
              data-testid={`game-card-${game.id}`}
            >
              {/* Game Header */}
              <div className={`h-24 bg-gradient-to-r ${gameColors[game.type] || 'from-slate-500 to-slate-600'} flex items-center justify-center relative`}>
                <span className="text-4xl">{gameIcons[game.type] || '🎮'}</span>
                {game.type === 'boss' && (
                  <div className="absolute top-2 right-2 px-2 py-1 bg-red-700 rounded-full text-xs text-white font-bold">
                    BOSS
                  </div>
                )}
              </div>

              {/* Game Content */}
              <div className="p-5">
                <h3 className="font-semibold text-lg text-slate-900 mb-1">{game.name}</h3>
                <p className="text-sm text-slate-500 italic mb-3">{game.name_fr}</p>
                <p className="text-sm text-slate-600 mb-4">{game.description}</p>

                {/* Difficulty & Reward */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-1">
                    {game.difficulty?.map((diff, i) => (
                      <span
                        key={i}
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          diff === 'easy' ? 'bg-green-100 text-green-700' :
                          diff === 'medium' ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}
                      >
                        {diff}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-amber-600">
                    <Trophy className="w-4 h-4" />
                    <span className="text-sm font-medium">+{game.xp_reward} XP</span>
                  </div>
                </div>

                {/* Play Button */}
                <Button
                  onClick={() => setActiveGame(game)}
                  className={`w-full rounded-full bg-gradient-to-r ${gameColors[game.type] || 'from-blue-500 to-blue-600'} hover:opacity-90`}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {game.type === 'boss' ? 'Fight Boss!' : 'Play Now'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-2">Pro Tips</h3>
          <div className="grid sm:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-xl p-4">
              <Zap className="w-6 h-6 text-amber-500 mx-auto mb-2" />
              <p className="text-sm text-slate-600">Play daily to maintain your streak</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <Target className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-slate-600">Boss battles test all your skills</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <Star className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <p className="text-sm text-slate-600">Higher difficulty = more XP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;
