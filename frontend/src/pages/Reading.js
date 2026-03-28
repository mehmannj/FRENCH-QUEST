import React, { useState } from 'react';
import { BookOpenCheck, CheckCircle2, Clock, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';

const Reading = () => {
  const [currentPassage, setCurrentPassage] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const passages = [
    {
      level: 'Beginner',
      title: 'La Famille Martin',
      french: `Bonjour! Je m'appelle Sophie Martin. J'ai vingt ans. J'habite à Paris avec ma famille. Mon père s'appelle Pierre et ma mère s'appelle Marie. J'ai un frère, il s'appelle Thomas. Il a dix-huit ans. Nous avons un chat qui s'appelle Minou. Notre maison est grande et jolie.`,
      english: `Hello! My name is Sophie Martin. I am twenty years old. I live in Paris with my family. My father's name is Pierre and my mother's name is Marie. I have a brother, his name is Thomas. He is eighteen years old. We have a cat named Minou. Our house is big and beautiful.`,
      questions: [
        { question: "How old is Sophie?", options: ["18 years old", "20 years old", "22 years old", "25 years old"], correct: 1 },
        { question: "Where does Sophie live?", options: ["Lyon", "Marseille", "Paris", "Nice"], correct: 2 },
        { question: "What is the cat's name?", options: ["Thomas", "Pierre", "Marie", "Minou"], correct: 3 }
      ]
    },
    {
      level: 'Beginner',
      title: 'Au Café',
      french: `Ce matin, je vais au café avec mon ami Marc. Nous commandons deux cafés et deux croissants. Le serveur est très gentil. Marc prend aussi un jus d'orange. Le café est délicieux! Nous parlons de nos projets pour le week-end. Marc veut aller au cinéma samedi.`,
      english: `This morning, I go to the café with my friend Marc. We order two coffees and two croissants. The waiter is very nice. Marc also gets an orange juice. The coffee is delicious! We talk about our plans for the weekend. Marc wants to go to the cinema on Saturday.`,
      questions: [
        { question: "Who does the narrator go to the café with?", options: ["Sophie", "Marc", "Pierre", "Thomas"], correct: 1 },
        { question: "What does Marc also order?", options: ["Tea", "Water", "Orange juice", "Milk"], correct: 2 },
        { question: "What does Marc want to do on Saturday?", options: ["Go shopping", "Go to the cinema", "Visit family", "Play sports"], correct: 1 }
      ]
    },
    {
      level: 'Intermediate',
      title: 'Un Voyage à Lyon',
      french: `Le mois dernier, j'ai fait un voyage à Lyon avec ma sœur. Nous avons pris le TGV de Paris. Le voyage a duré deux heures. Lyon est une belle ville avec beaucoup d'histoire. Nous avons visité le Vieux Lyon et nous avons mangé dans un bouchon traditionnel. La cuisine lyonnaise est excellente! Nous avons aussi vu la basilique de Fourvière. C'était un week-end magnifique.`,
      english: `Last month, I took a trip to Lyon with my sister. We took the TGV from Paris. The journey lasted two hours. Lyon is a beautiful city with a lot of history. We visited Old Lyon and we ate at a traditional bouchon. Lyon cuisine is excellent! We also saw the Fourvière basilica. It was a magnificent weekend.`,
      questions: [
        { question: "How did they travel to Lyon?", options: ["By car", "By plane", "By TGV (train)", "By bus"], correct: 2 },
        { question: "How long was the journey?", options: ["One hour", "Two hours", "Three hours", "Four hours"], correct: 1 },
        { question: "What did they see?", options: ["Eiffel Tower", "Louvre", "Fourvière basilica", "Notre-Dame"], correct: 2 }
      ]
    }
  ];

  const passage = passages[currentPassage];
  const progress = ((currentPassage + 1) / passages.length) * 100;

  const handleAnswer = (questionIndex, answerIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: answerIndex
    });
  };

  const checkAnswers = () => {
    setShowResults(true);
  };

  const nextPassage = () => {
    if (currentPassage < passages.length - 1) {
      setCurrentPassage(currentPassage + 1);
      setSelectedAnswers({});
      setShowResults(false);
      setShowTranslation(false);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    passage.questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correct) correct++;
    });
    return correct;
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8" data-testid="reading-lab">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium mb-4">
            <BookOpenCheck className="w-4 h-4" />
            Reading Practice
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Reading Lab</h1>
          <p className="text-slate-600">Improve your French reading comprehension</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-slate-600 mb-2">
            <span>Passage {currentPassage + 1} of {passages.length}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
              passage.level === 'Beginner' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {passage.level}
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Reading Passage */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
          {/* Title */}
          <div className="p-6 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
            <h2 className="text-2xl font-bold">{passage.title}</h2>
          </div>

          {/* Text */}
          <div className="p-6">
            <div className="prose max-w-none">
              <p className="text-lg text-slate-700 leading-relaxed mb-4">
                {passage.french}
              </p>
            </div>

            {/* Translation toggle */}
            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className="text-sm text-blue-600 hover:underline mt-4"
              data-testid="toggle-translation"
            >
              {showTranslation ? 'Hide translation' : 'Show translation'}
            </button>

            {showTranslation && (
              <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                <p className="text-slate-600 italic">{passage.english}</p>
              </div>
            )}
          </div>
        </div>

        {/* Comprehension Questions */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Comprehension Questions</h3>

          <div className="space-y-6">
            {passage.questions.map((q, qi) => (
              <div key={qi}>
                <p className="font-medium text-slate-800 mb-3">{qi + 1}. {q.question}</p>
                <div className="grid grid-cols-2 gap-3">
                  {q.options.map((option, oi) => (
                    <button
                      key={oi}
                      onClick={() => !showResults && handleAnswer(qi, oi)}
                      className={`p-3 rounded-xl border-2 text-left transition-all ${
                        showResults
                          ? oi === q.correct
                            ? 'border-green-500 bg-green-50'
                            : selectedAnswers[qi] === oi
                              ? 'border-red-500 bg-red-50'
                              : 'border-slate-200'
                          : selectedAnswers[qi] === oi
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-slate-200 hover:border-blue-300'
                      }`}
                      disabled={showResults}
                      data-testid={`question-${qi}-option-${oi}`}
                    >
                      <div className="flex items-center gap-2">
                        {showResults && oi === q.correct && (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        )}
                        <span className="text-sm">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          {!showResults ? (
            <Button
              onClick={checkAnswers}
              disabled={Object.keys(selectedAnswers).length < passage.questions.length}
              className="rounded-full bg-emerald-500 hover:bg-emerald-600 px-8"
              data-testid="check-answers-btn"
            >
              Check Answers
            </Button>
          ) : (
            <div className="text-center">
              <div className="mb-4 p-4 bg-slate-50 rounded-xl">
                <p className="text-lg font-semibold text-slate-900">
                  Score: {calculateScore()}/{passage.questions.length}
                </p>
              </div>
              <Button
                onClick={nextPassage}
                disabled={currentPassage === passages.length - 1}
                className="rounded-full bg-blue-500 hover:bg-blue-600 px-8"
                data-testid="next-passage-btn"
              >
                Next Passage
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="mt-8 bg-emerald-50 rounded-xl p-6">
          <h3 className="font-semibold text-emerald-900 mb-3">Reading Tips</h3>
          <ul className="space-y-2 text-sm text-emerald-700">
            <li>• Read the passage slowly and carefully</li>
            <li>• Look for cognates (words similar to English)</li>
            <li>• Use context clues to understand new words</li>
            <li>• Re-read difficult sentences</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Reading;
