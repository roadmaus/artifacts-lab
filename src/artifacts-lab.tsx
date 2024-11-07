import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface Quiz {
  title: string;
  description: string;
  totalQuestions: number;
  passingScore: number;
  questions: {
    id: number;
    type: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
}

interface SubTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  parentTopic: string;
  content?: ContentSection[];
  quiz?: Quiz;
  difficulty?: string;
  estimatedDuration?: string;
}

interface ContentSection {
  title: string;
  icon: string;
  sections: {
    subtitle: string;
    description: string;
    points: string[];
    codeExample?: string;
  }[];
}

interface MainTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: string;
  subtopics: {
    id: string;
    title: string;
    description: string;
    icon: string;
  }[];
  mainQuiz?: Quiz;
}

interface Progress {
  completed: boolean;
  score: number;
  lastAttempt: string;
}

interface ProgressTracking {
  [topicId: string]: {
    mainQuiz?: Progress;
    subtopics: {
      [subtopicId: string]: {
        quiz?: Progress;
        completed: boolean;
      };
    };
  };
}

interface QuizState {
  currentScore: number;
  answeredQuestions: boolean[];
  showExplanation: boolean;
  isComplete: boolean;
  hasSubmitted: boolean;  // New state to track if current question was submitted
}

// Add this interface above the existing interfaces
interface TopicGroup {
  name: string;
  topics: MainTopic[];
}

const DynamicContentViewer: React.FC = () => {
  const [mainTopics, setMainTopics] = useState<Record<string, MainTopic>>({});
  const [subTopics, setSubTopics] = useState<Record<string, SubTopic>>({});
  const [components, setComponents] = useState<Record<string, any>>({});
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);
  const [progress, setProgress] = useState<ProgressTracking>({});
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizResults, setQuizResults] = useState<{
    score: number;
    passed: boolean;
    showExplanation: boolean;
  } | null>(null);
  const [quizState, setQuizState] = useState<QuizState>({
    currentScore: 0,
    answeredQuestions: [],
    showExplanation: false,
    isComplete: false,
    hasSubmitted: false
  });
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [collapsedExamples, setCollapsedExamples] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Load saved progress from localStorage
    const savedProgress = localStorage.getItem('topicProgress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }

    const loadContent = async () => {
      // Update glob pattern to handle nested structure
      const jsonModules = import.meta.glob('../Topics/**/**/*.json', { eager: true });
      const tsxModules = import.meta.glob('../Topics/**/**/*.tsx', { eager: true });
      
      const mainTopicsMap: Record<string, MainTopic> = {};
      const subTopicsMap: Record<string, SubTopic> = {};
      const componentMap: Record<string, any> = {};

      Object.entries(jsonModules).forEach(([path, module]: [string, any]) => {
        const content = module.default;
        // The path structure doesn't affect how we process the content
        if (content.subtopics) {
          mainTopicsMap[content.id] = content;
        } else if (content.parentTopic) {
          subTopicsMap[content.id] = content;
        }
      });

      Object.entries(tsxModules).forEach(([path, module]: [string, any]) => {
        if (module.default && typeof module.default === 'function') {
          const fileName = path.split('/').pop()?.replace('.tsx', '');
          if (fileName) {
            componentMap[fileName] = module.default;
          }
        }
      });

      setMainTopics(mainTopicsMap);
      setSubTopics(subTopicsMap);
      setComponents(componentMap);
    };

    loadContent();
  }, []);

  const updateProgress = (
    topicId: string,
    subtopicId: string | null,
    quizResults: Progress | null,
    isCompleted: boolean
  ) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      
      if (!newProgress[topicId]) {
        newProgress[topicId] = {
          subtopics: {}
        };
      }

      if (subtopicId) {
        if (!newProgress[topicId].subtopics[subtopicId]) {
          newProgress[topicId].subtopics[subtopicId] = {
            completed: false
          };
        }
        
        if (quizResults) {
          newProgress[topicId].subtopics[subtopicId].quiz = quizResults;
        }
        if (isCompleted || (quizResults && quizResults.score >= (currentQuiz?.passingScore || 0))) {
          newProgress[topicId].subtopics[subtopicId].completed = true;
        }
      } else if (quizResults) {
        newProgress[topicId].mainQuiz = quizResults;
      }

      localStorage.setItem('topicProgress', JSON.stringify(newProgress));
      return newProgress;
    });
  };

  const getTopicProgress = (topicId: string) => {
    const topicProgress = progress[topicId];
    if (!topicProgress) return 0;

    const mainTopic = mainTopics[topicId];
    if (!mainTopic) return 0;

    const subtopics = mainTopic.subtopics;
    let totalWeight = subtopics.length;
    let completedWeight = 0;

    subtopics.forEach(subtopic => {
      const subtopicProgress = topicProgress.subtopics[subtopic.id];
      if (subtopicProgress?.completed) {
        completedWeight++;
      } else if (subtopicProgress?.quiz?.score && subTopics[subtopic.id]?.quiz) {
        // Clamp the score between 0 and 100
        const score = Math.min(100, Math.max(0, subtopicProgress.quiz.score));
        completedWeight += score / 100;
      }
    });

    if (mainTopic.mainQuiz) {
      totalWeight++;
      if (topicProgress.mainQuiz?.completed) {
        completedWeight++;
      } else if (topicProgress.mainQuiz?.score) {
        // Clamp the score between 0 and 100
        const score = Math.min(100, Math.max(0, topicProgress.mainQuiz.score));
        completedWeight += score / 100;
      }
    }

    // Ensure final percentage is between 0 and 100
    return Math.min(100, Math.max(0, (completedWeight / totalWeight) * 100));
  };

  const startQuiz = (quiz: Quiz, isMainQuiz: boolean = false) => {
    // Create a shuffled version of the quiz
    const shuffledQuiz: Quiz = {
      ...quiz,
      questions: shuffleArray(quiz.questions).map(q => {
        // Create array of options with their original indices
        const optionsWithIndices = q.options.map((opt, idx) => ({
          text: opt,
          originalIndex: idx
        }));
        
        // Shuffle options
        const shuffledOptions = shuffleArray(optionsWithIndices);
        
        // Find new index of correct answer
        const newCorrectAnswerIndex = shuffledOptions.findIndex(
          opt => opt.originalIndex === q.correctAnswer
        );

        return {
          ...q,
          options: shuffledOptions.map(opt => opt.text),
          correctAnswer: newCorrectAnswerIndex
        };
      })
    };

    setCurrentQuiz(shuffledQuiz);
    setQuizMode(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setQuizResults(null);
    setQuizState({
      currentScore: 0,
      answeredQuestions: new Array(shuffledQuiz.questions.length).fill(false),
      showExplanation: false,
      isComplete: false,
      hasSubmitted: false
    });
  };

  const handleQuizSubmit = () => {
    if (!currentQuiz || selectedAnswer === null) return;

    const currentQuestion = currentQuiz.questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    setQuizState(prev => {
      const newAnsweredQuestions = [...prev.answeredQuestions];
      newAnsweredQuestions[currentQuestionIndex] = true;

      const answeredCount = newAnsweredQuestions.filter(Boolean).length;
      const newScore = (prev.currentScore * (answeredCount - 1) + (isCorrect ? 100 : 0)) / answeredCount;

      return {
        ...prev,
        currentScore: Math.min(100, Math.max(0, newScore)),
        answeredQuestions: newAnsweredQuestions,
        showExplanation: true,
        hasSubmitted: true
      };
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < currentQuiz!.questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setQuizState(prev => ({ 
        ...prev, 
        showExplanation: false,
        hasSubmitted: false 
      }));
    } else {
      // Final question completed
      const finalScore = quizState.currentScore;
      const passed = finalScore >= currentQuiz!.passingScore;

      setQuizState(prev => ({ ...prev, isComplete: true }));
      
      updateProgress(
        selectedTopic!,
        selectedSubtopic,
        {
          completed: true,
          score: finalScore,
          lastAttempt: new Date().toISOString()
        },
        passed
      );

      setQuizResults({
        score: finalScore,
        passed,
        showExplanation: true
      });
    }
  };

  const DynamicIcon = ({ name }: { name: string }) => {
    const Icon = (Icons as any)[name];
    return Icon ? <Icon className="w-5 h-5" /> : <Icons.BookOpen className="w-5 h-5" />;
  };

  const renderQuiz = () => {
    if (!currentQuiz) return null;

    const question = currentQuiz.questions[currentQuestionIndex];
    const showExplanation = quizState.showExplanation && selectedAnswer !== null;
    const isCorrect = selectedAnswer === question.correctAnswer;
    const isLastQuestion = currentQuestionIndex + 1 === currentQuiz.questions.length;

    return (
      <div className="space-y-6">
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">{currentQuiz.title}</h3>
          <p className="text-gray-600">{currentQuiz.description}</p>
          <div className="mt-4">
            <Progress 
              value={(quizState.answeredQuestions.filter(Boolean).length / currentQuiz.questions.length) * 100} 
              className="w-full"
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}</CardTitle>
              <Badge variant="outline" className="ml-2">
                {isCorrect ? "Correct" : quizState.hasSubmitted ? "Incorrect" : "Not Answered"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg">{question.question}</p>
            
            <div className="space-y-2">
              {question.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => !showExplanation && setSelectedAnswer(idx)}
                  disabled={showExplanation}
                  className={`w-full text-left p-3 rounded border transition-colors ${
                    selectedAnswer === idx 
                      ? showExplanation
                        ? isCorrect
                          ? 'bg-green-50 border-green-200'
                          : 'bg-red-50 border-red-200'
                        : 'bg-blue-50 border-blue-200'
                      : showExplanation && idx === question.correctAnswer
                        ? 'bg-green-50 border-green-200'
                        : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showExplanation && (
                      <span>
                        {idx === question.correctAnswer && (
                          <Icons.CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                        {selectedAnswer === idx && idx !== question.correctAnswer && (
                          <Icons.XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {showExplanation && (
              <Alert className={isCorrect ? 'bg-green-50' : 'bg-red-50'}>
                <div className="flex items-center gap-2 mb-2">
                  {isCorrect ? (
                    <>
                      <Icons.CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="font-semibold text-green-700">
                        {getEncouragingMessage(true)}
                      </span>
                    </>
                  ) : (
                    <>
                      <Icons.XCircle className="w-5 h-5 text-red-500" />
                      <span className="font-semibold text-red-700">
                        {getEncouragingMessage(false)}
                      </span>
                    </>
                  )}
                </div>
                <AlertDescription className="mt-2">
                  {question.explanation}
                </AlertDescription>
              </Alert>
            )}

            <div className="flex gap-2">
              {!quizState.hasSubmitted ? (
                <Button 
                  onClick={handleQuizSubmit}
                  disabled={selectedAnswer === null}
                  className="w-full mt-4"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button 
                  onClick={handleNextQuestion}
                  className="w-full mt-4"
                  variant={isCorrect ? "default" : "secondary"}
                >
                  {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {quizResults && currentQuestionIndex === currentQuiz.questions.length - 1 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quiz Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Final Score:</span>
                  <span className="font-bold">{quizResults.score.toFixed(1)}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Status:</span>
                  <Badge variant={quizResults.passed ? "success" : "destructive"}>
                    {quizResults.passed ? "Passed" : "Failed"}
                  </Badge>
                </div>
                <Button 
                  onClick={() => {
                    setQuizMode(false);
                    setCurrentQuiz(null);
                  }}
                  className="w-full"
                >
                  Return to Content
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderContentSection = (section: ContentSection) => (
    <div key={section.title} className="space-y-6 mb-8">
      <div className="flex items-center gap-2 border-b pb-2">
        <DynamicIcon name={section.icon} />
        <h2 className="text-xl font-semibold">{section.title}</h2>
      </div>
      
      <div className="space-y-6">
        {section.sections.map((subsection, idx) => (
          <Card key={idx} className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg">{subsection.subtitle}</CardTitle>
              <p className="text-gray-600">{subsection.description}</p>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 mb-4">
                {subsection.points.map((point, pointIdx) => (
                  <li key={pointIdx} className="text-gray-700">{point}</li>
                ))}
              </ul>

              {subsection.codeExample && (
                <div className="mt-6 border rounded-lg bg-gray-50 overflow-hidden">
                  <button
                    onClick={() => setCollapsedExamples(prev => ({
                      ...prev,
                      [`${section.title}-${subsection.subtitle}`]: !isExampleCollapsed(`${section.title}-${subsection.subtitle}`)
                    }))}
                    className="w-full bg-gray-100 px-4 py-2 border-b flex items-center justify-between hover:bg-gray-200 transition-colors"
                  >
                    <h4 className="text-sm font-medium text-gray-700">Interactive Example</h4>
                    <Icons.ChevronDown className={`w-4 h-4 transition-transform ${
                      !isExampleCollapsed(`${section.title}-${subsection.subtitle}`) ? 'rotate-180' : ''
                    }`} />
                  </button>
                  {!isExampleCollapsed(`${section.title}-${subsection.subtitle}`) && (
                    <div className="p-4">
                      <ErrorBoundary>
                        <React.Suspense fallback={<div>Loading example...</div>}>
                          <div className="max-w-3xl mx-auto">
                            {React.createElement(
                              components[subsection.codeExample] || 
                              components[subsection.codeExample.replace('.tsx', '')] ||
                              (() => <div>Component not found: {subsection.codeExample}</div>)
                            )}
                          </div>
                        </React.Suspense>
                      </ErrorBoundary>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSubtopicCard = (subtopic: SubTopic) => {
    const subtopicProgress = progress[selectedTopic!]?.subtopics[subtopic.id];
    
    return (
      <Card 
        key={subtopic.id} 
        className="mb-6 cursor-pointer hover:shadow-lg transition-all"
        onClick={() => setSelectedSubtopic(subtopic.id)}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <DynamicIcon name={subtopic.icon || 'BookOpen'} />
            <CardTitle className="text-xl">{subtopic.title}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {subtopicProgress?.quiz && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Icons.CheckCircle className="w-4 h-4" />
                {subtopicProgress.quiz.score.toFixed(0)}%
              </Badge>
            )}
            {subtopic.quiz && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  startQuiz(subtopic.quiz!);
                }}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Icons.Brain className="w-4 h-4" />
                Take Quiz
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">{subtopic.description}</p>
          <div className="flex gap-4">
            {subtopic.difficulty && (
              <Badge variant="secondary" className="flex items-center gap-2">
                <Icons.BarChart2 className="w-4 h-4" />
                {subtopic.difficulty}
              </Badge>
            )}
            {subtopic.estimatedDuration && (
              <Badge variant="secondary" className="flex items-center gap-2">
                <Icons.Clock className="w-4 h-4" />
                {subtopic.estimatedDuration}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderSelectedContent = () => {
    if (!selectedTopic) return null;

    const mainTopic = mainTopics[selectedTopic];
    const currentSubtopic = selectedSubtopic ? subTopics[selectedSubtopic] : null;

    if (!mainTopic) return null;

    return (
      <div className="space-y-6">
        <div className="border-b pb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <DynamicIcon name={mainTopic.icon} />
              <h1 className="text-3xl font-bold">{mainTopic.title}</h1>
            </div>
            {mainTopic.mainQuiz && (
              <Button
                onClick={() => startQuiz(mainTopic.mainQuiz!, true)}
                className="flex items-center gap-2"
              >
                <Icons.Brain className="w-4 h-4" />
                Take Main Quiz
              </Button>
            )}
          </div>
          <p className="text-lg text-gray-600 mb-6">{mainTopic.description}</p>
        </div>

        {!currentSubtopic ? (
          // Subtopics overview page
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Available Subtopics</h2>
            {mainTopic.subtopics.map(subtopic => {
              const fullSubtopic = subTopics[subtopic.id];
              return fullSubtopic ? renderSubtopicCard(fullSubtopic) : null;
            })}
          </div>
        ) : (
          // Selected subtopic content
          <div className="space-y-6">
            <button
              onClick={() => setSelectedSubtopic(null)}
              className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <Icons.ArrowLeft className="w-4 h-4" />
              Back to Subtopics
            </button>
            
            <div className="border-b pb-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">{currentSubtopic.title}</h2>
                {currentSubtopic.quiz && (
                  <Button
                    onClick={() => startQuiz(currentSubtopic.quiz!)}
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    <Icons.Brain className="w-4 h-4" />
                    Take Quiz
                  </Button>
                )}
              </div>
              <p className="text-gray-600">{currentSubtopic.description}</p>
              
              <div className="flex gap-4 mt-4">
                {currentSubtopic.difficulty && (
                  <Badge variant="secondary" className="flex items-center gap-2">
                    <Icons.BarChart2 className="w-4 h-4" />
                    {currentSubtopic.difficulty}
                  </Badge>
                )}
                {currentSubtopic.estimatedDuration && (
                  <Badge variant="secondary" className="flex items-center gap-2">
                    <Icons.Clock className="w-4 h-4" />
                    {currentSubtopic.estimatedDuration}
                  </Badge>
                )}
                {progress[selectedTopic]?.subtopics[currentSubtopic.id]?.quiz && (
                  <Badge 
                    variant="success" 
                    className="flex items-center gap-2"
                  >
                    <Icons.CheckCircle className="w-4 h-4" />
                    Quiz Score: {progress[selectedTopic].subtopics[currentSubtopic.id].quiz!.score.toFixed(0)}%
                  </Badge>
                )}
              </div>
            </div>

            {currentSubtopic.content?.map(section => renderContentSection(section))}
          </div>
        )}
      </div>
    );
  };

  // Add new function to shuffle array
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Helper function to provide varied feedback messages
  const getEncouragingMessage = (isCorrect: boolean): string => {
    const correctMessages = [
      "Excellent work!",
      "You've got it!",
      "Perfect answer!",
      "Outstanding!",
      "That's exactly right!"
    ];
    
    const incorrectMessages = [
      "Not quite right, but keep going!",
      "Good try! Let's learn from this.",
      "Almost there! Review the explanation.",
      "Don't worry, learning from mistakes is part of the process!",
      "Nice attempt! Let's see why this one's tricky."
    ];

    const messages = isCorrect ? correctMessages : incorrectMessages;
    return messages[Math.floor(Math.random() * messages.length)];
  };

  // Add this function inside DynamicContentViewer component
  const groupTopicsByDirectory = () => {
    // Get all unique top-level directories from the file paths
    const topLevelDirs = new Set<string>();
    
    Object.entries(import.meta.glob('../Topics/**/**/*.json', { eager: true }))
      .forEach(([path]) => {
        const pathParts = path.split('/');
        if (pathParts.length >= 3) { // Topics/category/...
          const category = pathParts[2]; // Get the category folder name
          topLevelDirs.add(category);
        }
      });

    // Create groups object dynamically
    const groups: Record<string, TopicGroup> = {};
    
    topLevelDirs.forEach(dir => {
      // Convert directory name to display name (e.g., "cybersecurity-frameworks" -> "Cybersecurity Frameworks")
      const displayName = dir
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      groups[dir] = {
        name: displayName,
        topics: []
      };
    });

    // Populate groups with topics
    Object.values(mainTopics).forEach(topic => {
      const topicPath = Object.entries(import.meta.glob('../Topics/**/**/*.json', { eager: true }))
        .find(([_, module]) => (module as any).default.id === topic.id)?.[0] || '';
      
      const pathParts = topicPath.split('/');
      if (pathParts.length >= 3) {
        const category = pathParts[2];
        if (groups[category]) {
          groups[category].topics.push(topic);
        }
      }
    });

    return groups;
  };

  // Helper function to get collapsed state (true by default)
  const isExampleCollapsed = (key: string) => {
    return collapsedExamples[key] !== false;  // true by default unless explicitly set to false
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {quizMode ? (
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => {
              setQuizMode(false);
              setCurrentQuiz(null);
              setCurrentQuestionIndex(0);
              setSelectedAnswer(null);
              setQuizResults(null);
            }}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <Icons.ArrowLeft className="w-4 h-4" />
            Back to Content
          </button>
          {renderQuiz()}
        </div>
      ) : !selectedGroup ? (
        // Topic Groups Overview
        <div className="space-y-8 max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">Topics Library</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(groupTopicsByDirectory()).map(([groupId, group]) => {
              const totalTopics = group.topics.length;
              const avgProgress = group.topics.reduce((acc, topic) => 
                acc + getTopicProgress(topic.id), 0) / totalTopics;
              
              return (
                <Card 
                  key={groupId}
                  className="cursor-pointer transition-all hover:shadow-lg"
                  onClick={() => setSelectedGroup(groupId)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DynamicIcon name={group.topics[0]?.icon || 'Folder'} />
                        <CardTitle>{group.name}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-sm text-gray-600 mb-2">Topics Included:</h3>
                        <ul className="list-disc list-inside text-sm text-gray-500">
                          {group.topics.map(topic => (
                            <li key={topic.id}>{topic.title}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Average Progress</span>
                        <span>{Math.round(avgProgress)}%</span>
                      </div>
                      <Progress value={avgProgress} className="w-full" />
                      <div className="flex items-center gap-4">
                        <Badge variant="secondary" className="flex items-center gap-2">
                          <Icons.BookOpen className="w-4 h-4" />
                          {totalTopics} Topics
                        </Badge>
                        <Badge variant="secondary" className="flex items-center gap-2">
                          <Icons.GraduationCap className="w-4 h-4" />
                          {group.topics[0]?.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ) : !selectedTopic ? (
        // Topics within selected group
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => setSelectedGroup(null)}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <Icons.ArrowLeft className="w-4 h-4" />
            Back to Topic Groups
          </button>
          <h1 className="text-3xl font-bold mb-6">{groupTopicsByDirectory()[selectedGroup].name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupTopicsByDirectory()[selectedGroup].topics.map(topic => {
              const topicProgress = progress[topic.id];
              const progressValue = getTopicProgress(topic.id);
              
              return (
                <Card 
                  key={topic.id}
                  className="cursor-pointer transition-all hover:shadow-lg"
                  onClick={() => setSelectedTopic(topic.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DynamicIcon name={topic.icon} />
                        <CardTitle>{topic.title}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{topic.description}</p>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>Progress</span>
                        <span>{Math.round(progressValue)}%</span>
                      </div>
                      <Progress value={progressValue} className="w-full" />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Icons.BookOpen className="w-4 h-4" />
                          <span>{topic.difficulty}</span>
                        </div>
                        {topicProgress?.mainQuiz && (
                          <Badge variant="success" className="text-xs">
                            Quiz: {topicProgress.mainQuiz.score.toFixed(0)}%
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => {
              setSelectedTopic(null);
              setSelectedSubtopic(null);
            }}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <Icons.ArrowLeft className="w-4 h-4" />
            Back to Topics
          </button>
          {renderSelectedContent()}
        </div>
      )}
    </div>
  );
};

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg">
          <h3 className="font-bold mb-2">Component Error</h3>
          <pre className="text-sm">{this.state.error?.message}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default DynamicContentViewer;
