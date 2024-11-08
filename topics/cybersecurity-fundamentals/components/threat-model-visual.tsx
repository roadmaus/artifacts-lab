import React, { useState } from 'react';
import { Shield, AlertTriangle, Bug, BarChart2, BookOpen, CheckCircle2, XCircle, InfoIcon, Brain, Target, ArrowRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

const ThreatModelVisual = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedVulnerability, setSelectedVulnerability] = useState(null);
  const [riskCalculation, setRiskCalculation] = useState({
    likelihood: 2,
    impact: 3
  });
  const [completedLessons, setCompletedLessons] = useState([]);
  const [showScenario, setShowScenario] = useState(false);
  const [userResponses, setUserResponses] = useState({});
  const [currentQuiz, setCurrentQuiz] = useState(null);

  const threatCategories = [
    {
      name: 'Natural',
      examples: ['Earthquakes', 'Floods', 'Natural Disasters'],
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      lesson: {
        title: 'Natural Threats in Cybersecurity',
        key_points: [
          'Natural disasters can cause data center outages',
          'Power surges can damage equipment',
          'Flooding can destroy physical infrastructure'
        ],
        real_world_example: 'In 2011, flooding in Thailand caused major disruptions to global hard drive manufacturing, impacting data center operations worldwide.',
        mitigation_strategies: [
          'Geographic redundancy',
          'Backup power systems',
          'Disaster recovery planning'
        ]
      }
    },
    {
      name: 'Human',
      examples: ['Insider Threats', 'Hackers', 'Social Engineering'],
      icon: <Target className="w-6 h-6" />,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      lesson: {
        title: 'Understanding Human Threats',
        key_points: [
          'Insider threats can be malicious or accidental',
          'Social engineering exploits human psychology',
          'Cybercriminals often target employee credentials'
        ],
        real_world_example: 'The 2020 Twitter hack occurred when attackers used social engineering to gain access to internal admin tools, compromising high-profile accounts.',
        mitigation_strategies: [
          'Security awareness training',
          'Principle of least privilege',
          'Multi-factor authentication'
        ]
      }
    },
    {
      name: 'Environmental',
      examples: ['Power Failures', 'HVAC Issues', 'Hardware Failures'],
      icon: <Bug className="w-6 h-6" />,
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      lesson: {
        title: 'Environmental Threat Impacts',
        key_points: [
          'HVAC failures can cause hardware damage',
          'Power fluctuations can corrupt data',
          'Environmental monitoring is crucial'
        ],
        real_world_example: 'In 2019, Google Cloud experienced service disruptions due to cooling system failures in a Belgian data center.',
        mitigation_strategies: [
          'Environmental monitoring systems',
          'Redundant power supplies',
          'Regular maintenance schedules'
        ]
      }
    }
  ];

  const scenarios = {
    Natural: {
      title: "Data Center Disaster Scenario",
      description: "A major hurricane is approaching your data center. You have 24 hours to prepare.",
      options: [
        "Shut down all systems immediately",
        "Activate backup site and begin failover",
        "Continue operations but monitor the situation",
        "Test backup generators and fuel supplies"
      ],
      correct: 1,
      explanation: "Activating the backup site and beginning failover is the best option as it ensures business continuity while protecting data and systems. This provides time for a controlled transition rather than a potential emergency shutdown."
    },
    Human: {
      title: "Social Engineering Attack Scenario",
      description: "An employee receives an urgent email from 'IT Support' requesting their password for system maintenance.",
      options: [
        "Provide the password since it's urgent",
        "Forward the email to their supervisor",
        "Report to security team and delete email",
        "Reply asking for verification"
      ],
      correct: 2,
      explanation: "Reporting to the security team is the correct response. Legitimate IT support will never ask for passwords. This helps protect the organization and allows the security team to alert others about the phishing attempt."
    },
    Environmental: {
      title: "HVAC Failure Scenario",
      description: "Data center temperature is rising due to HVAC failure. Current temperature is 85°F/29°C and rising.",
      options: [
        "Wait for maintenance team to arrive",
        "Shut down non-critical systems",
        "Open doors for ventilation",
        "Ignore as modern servers can handle heat"
      ],
      correct: 1,
      explanation: "Shutting down non-critical systems reduces heat generation while maintaining essential services. This buys time for repairs while preventing potential hardware damage from excessive heat."
    }
  };

  const handleScenarioResponse = (index) => {
    const currentScenario = scenarios[selectedCategory];
    setUserResponses({
      ...userResponses,
      [selectedCategory]: {
        selected: index,
        correct: index === currentScenario.correct
      }
    });
  };

  const LessonContent = ({ category }) => {
    const lesson = threatCategories.find(t => t.name === category)?.lesson;
    if (!lesson) return null;

    return (
      <div className="mt-6 p-6 bg-white rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-500" />
          {lesson.title}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Key Points:</h4>
            <ul className="space-y-2">
              {lesson.key_points.map((point, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Mitigation Strategies:</h4>
            <ul className="space-y-2">
              {lesson.mitigation_strategies.map((strategy, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span>{strategy}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Alert className="mt-4 bg-blue-50">
          <InfoIcon className="w-4 h-4" />
          <AlertTitle>Real-World Example</AlertTitle>
          <AlertDescription>
            {lesson.real_world_example}
          </AlertDescription>
        </Alert>

        <button
          onClick={() => setShowScenario(true)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <Brain className="w-4 h-4" />
          Practice Scenario
        </button>
      </div>
    );
  };

  const ScenarioChallenge = ({ category }) => {
    const scenario = scenarios[category];
    const response = userResponses[category];

    if (!scenario || !showScenario) return null;

    return (
      <div className="mt-6 p-6 bg-white rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-500" />
          {scenario.title}
        </h3>
        
        <p className="mb-4 text-lg">{scenario.description}</p>
        
        <div className="space-y-3">
          {scenario.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleScenarioResponse(index)}
              className={`w-full p-4 rounded-lg text-left transition-all ${
                response?.selected === index
                  ? response?.correct
                    ? 'bg-green-100 border-green-500'
                    : 'bg-red-100 border-red-500'
                  : 'bg-gray-50 hover:bg-gray-100'
              } border-2`}
              disabled={response !== undefined}
            >
              {option}
              {response?.selected === index && (
                <span className="float-right">
                  {response.correct ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </span>
              )}
            </button>
          ))}
        </div>

        {response !== undefined && (
          <Alert className={`mt-4 ${response.correct ? 'bg-green-50' : 'bg-red-50'}`}>
            <AlertTitle>
              {response.correct ? 'Correct!' : 'Not quite right'}
            </AlertTitle>
            <AlertDescription>
              {scenario.explanation}
            </AlertDescription>
          </Alert>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-6 bg-gray-50 rounded-xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-block p-3 rounded-full bg-blue-100 mb-4">
          <Shield className="w-12 h-12 text-blue-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Interactive Threat Analysis Training</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Learn about cybersecurity threats through interactive scenarios and real-world examples
        </p>
      </div>

      {/* Threat Categories */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            Threat Categories
          </CardTitle>
          <CardDescription>Select a category to learn more and test your knowledge</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {threatCategories.map((category) => (
              <div
                key={category.name}
                onClick={() => {
                  setSelectedCategory(category.name);
                  setShowScenario(false);
                  setUserResponses({});
                }}
                className={`relative p-6 rounded-xl cursor-pointer transition-all duration-300
                  ${category.bgColor} ${category.borderColor} border-2
                  ${selectedCategory === category.name ? 'ring-2 ring-offset-2 ring-blue-500' : 'hover:scale-105'}
                `}
              >
                <div className={`flex items-center gap-3 mb-4 ${category.color}`}>
                  {category.icon}
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                </div>
                <ul className="space-y-2">
                  {category.examples.map((example) => (
                    <li key={example} className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Content */}
      {selectedCategory && (
        <>
          <LessonContent category={selectedCategory} />
          <ScenarioChallenge category={selectedCategory} />
        </>
      )}
    </div>
  );
};

export default ThreatModelVisual;
