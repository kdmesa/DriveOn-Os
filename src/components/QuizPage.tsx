import React, { useState } from 'react';
import { Trophy, Clock, CheckCircle, X, RotateCcw } from 'lucide-react';
import { useAuth } from '../App';
import Header from './Header';

interface QuizPageProps {
  onNavigate: (page: string) => void;
}

const quizzes = [
  {
    id: 1,
    title: 'Golf Rules & Etiquette',
    description: 'Test your knowledge of basic golf rules and course etiquette',
    questions: 15,
    timeLimit: 20,
    difficulty: 'Beginner',
    points: 100
  },
  {
    id: 2,
    title: 'Course Management',
    description: 'Strategic thinking and shot selection on the golf course',
    questions: 12,
    timeLimit: 15,
    difficulty: 'Intermediate',
    points: 150
  },
  {
    id: 3,
    title: 'Advanced Swing Mechanics',
    description: 'Technical aspects of the golf swing and ball flight laws',
    questions: 20,
    timeLimit: 25,
    difficulty: 'Advanced',
    points: 200
  }
];

const sampleQuestions = [
  {
    question: "What is the maximum number of clubs allowed in a golf bag during a round?",
    options: ["12", "14", "16", "18"],
    correct: 1,
    explanation: "According to golf rules, players are allowed a maximum of 14 clubs in their bag during a round."
  },
  {
    question: "When should you repair divots on the fairway?",
    options: ["Never", "Only if they're deep", "Always", "Only on par 3s"],
    correct: 2,
    explanation: "You should always repair divots on the fairway to maintain course condition for other players."
  },
  {
    question: "What does 'par' represent on a golf hole?",
    options: ["The minimum score", "The expected score for a skilled golfer", "The maximum score", "The average score"],
    correct: 1,
    explanation: "Par represents the expected number of strokes for a skilled golfer to complete the hole."
  }
];

const QuizPage: React.FC<QuizPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizStarted && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && quizStarted) {
      handleQuizComplete();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, quizStarted]);

  const startQuiz = (quizId: number) => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (quiz) {
      setSelectedQuiz(quizId);
      setTimeLeft(quiz.timeLimit * 60);
      setQuizStarted(true);
      setCurrentQuestion(0);
      setSelectedAnswers([]);
      setShowResults(false);
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    setQuizStarted(false);
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === sampleQuestions[index].correct) {
        correct++;
      }
    });
    return Math.round((correct / sampleQuestions.length) * 100);
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizStarted(false);
    setTimeLeft(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNavigate={onNavigate} openAuth={() => {}} />
      
      <div className="pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Quiz Selection */}
          {!selectedQuiz && (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Golf Knowledge Quizzes</h1>
                <p className="text-gray-600">Test and improve your golf knowledge with interactive quizzes</p>
              </div>

              <div className="grid gap-6">
                {quizzes.map((quiz) => (
                  <div key={quiz.id} className="bg-white p-6 rounded-xl shadow-sm border">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-xl font-semibold text-gray-900">{quiz.title}</h2>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            quiz.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                            quiz.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {quiz.difficulty}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-4">{quiz.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                            <span>{quiz.questions} questions</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{quiz.timeLimit} minutes</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Trophy size={14} />
                            <span>{quiz.points} points</span>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => startQuiz(quiz.id)}
                        className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                      >
                        Start Quiz
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Quiz Interface */}
          {selectedQuiz && quizStarted && !showResults && (
            <div className="bg-white rounded-xl shadow-sm border">
              {/* Quiz Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {quizzes.find(q => q.id === selectedQuiz)?.title}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Question {currentQuestion + 1} of {sampleQuestions.length}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-lg ${
                      timeLeft < 300 ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      <Clock size={16} />
                      <span className="font-mono">{formatTime(timeLeft)}</span>
                    </div>
                    <button
                      onClick={resetQuiz}
                      className="text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / sampleQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question */}
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-6">
                  {sampleQuestions[currentQuestion].question}
                </h3>
                
                <div className="space-y-3">
                  {sampleQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                        selectedAnswers[currentQuestion] === index
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-gray-200 hover:border-emerald-300'
                      }`}
                    >
                      <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                    </button>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    disabled={selectedAnswers[currentQuestion] === undefined}
                    className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {currentQuestion < sampleQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quiz Results */}
          {showResults && selectedQuiz && (
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-8 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  calculateScore() >= 80 ? 'bg-emerald-100' :
                  calculateScore() >= 60 ? 'bg-amber-100' : 'bg-red-100'
                }`}>
                  {calculateScore() >= 80 ? (
                    <Trophy className="text-emerald-600" size={32} />
                  ) : calculateScore() >= 60 ? (
                    <CheckCircle className="text-amber-600" size={32} />
                  ) : (
                    <X className="text-red-600" size={32} />
                  )}
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
                <p className="text-4xl font-bold text-emerald-600 mb-4">{calculateScore()}%</p>
                
                <p className="text-gray-600 mb-6">
                  You scored {selectedAnswers.filter((answer, index) => answer === sampleQuestions[index].correct).length} out of {sampleQuestions.length} questions correctly.
                </p>
                
                {calculateScore() >= 80 && (
                  <div className="bg-emerald-50 p-4 rounded-lg mb-6">
                    <p className="text-emerald-800 font-medium">Excellent work! You've earned {quizzes.find(q => q.id === selectedQuiz)?.points} points.</p>
                  </div>
                )}
                
                <div className="flex justify-center gap-4">
                  <button
                    onClick={resetQuiz}
                    className="flex items-center gap-2 bg-gray-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                  >
                    <RotateCcw size={16} />
                    Retake Quiz
                  </button>
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>

              {/* Detailed Results */}
              <div className="border-t border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Review Answers</h3>
                <div className="space-y-4">
                  {sampleQuestions.map((question, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                          selectedAnswers[index] === question.correct ? 'bg-emerald-100' : 'bg-red-100'
                        }`}>
                          {selectedAnswers[index] === question.correct ? (
                            <CheckCircle className="text-emerald-600" size={16} />
                          ) : (
                            <X className="text-red-600" size={16} />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 mb-2">{question.question}</p>
                          <p className="text-sm text-gray-600 mb-2">
                            Your answer: {question.options[selectedAnswers[index] || 0]}
                          </p>
                          {selectedAnswers[index] !== question.correct && (
                            <p className="text-sm text-emerald-600 mb-2">
                              Correct answer: {question.options[question.correct]}
                            </p>
                          )}
                          <p className="text-sm text-gray-500">{question.explanation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;