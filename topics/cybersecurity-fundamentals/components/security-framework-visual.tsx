import React, { useState } from 'react';
import { 
  ShieldAlert, Lock, Database, AlertTriangle, 
  Bell, FileCheck, Terminal, Construction, Settings,
  ChevronRight, Info, Check, X, Network, UserCheck, 
  TestTube, Code
} from 'lucide-react';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SecurityFrameworkVisual = () => {
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [completedDomains, setCompletedDomains] = useState([]);
  const [progress, setProgress] = useState(0);
  
  const domains = [
    {
      id: 1,
      name: "Security and Risk Management",
      icon: ShieldAlert,
      color: "bg-blue-500",
      description: "Core principles of security governance and risk management",
      details: [
        "Security governance principles",
        "Compliance and regulations",
        "Professional ethics",
        "Business continuity requirements",
        "Risk management concepts",
        "Threat modeling techniques",
        "Security policies and procedures",
        "Security awareness and training",
        "Incident response",
        "Emerging technology considerations"
      ],
      tools: ["GRC Platforms", "Risk Management Tools", "Policy Management Systems"],
      bestPractices: [
        "Regular risk assessments",
        "Documented security policies",
        "Security awareness training",
        "Incident response planning",
        "Compliance monitoring",
        "Business impact analysis",
        "Risk register maintenance"
      ]
    },
    {
      id: 2,
      name: "Asset Security",
      icon: Database,
      color: "bg-green-500",
      description: "Protection and classification of information assets",
      details: [
        "Asset classification",
        "Privacy protection",
        "Asset retention",
        "Data security controls",
        "Data lifecycle management",
        "Cloud security considerations",
        "Database security",
        "Asset ownership",
        "Data encryption methods",
        "Secure disposal techniques"
      ],
      tools: ["DLP Solutions", "Asset Management Tools", "Encryption Tools", "Cloud Security Platforms"],
      bestPractices: [
        "Data classification schemes",
        "Asset inventory management",
        "Secure disposal methods",
        "Data protection controls",
        "Regular asset audits",
        "Access control reviews"
      ]
    },
    {
      id: 3,
      name: "Security Architecture and Engineering",
      icon: Construction,
      color: "bg-purple-500",
      description: "Design and implementation of secure systems",
      details: [
        "Secure design principles",
        "Security models",
        "System capabilities",
        "Security vulnerabilities",
        "Cryptography",
        "Physical security",
        "Secure protocols",
        "IoT security",
        "Mobile security",
        "System lifecycle management"
      ],
      tools: ["Architecture Modeling Tools", "Cryptographic Solutions", "Security Testing Tools"],
      bestPractices: [
        "Defense in depth",
        "Security by design",
        "Regular architecture reviews",
        "Cryptographic key management",
        "Physical access controls"
      ]
    },
    {
      id: 4,
      name: "Communication and Network Security",
      icon: Network,
      color: "bg-orange-500",
      description: "Network architecture and secure communication channels",
      details: [
        "Network architecture",
        "Network protocols",
        "Network components",
        "Secure network design",
        "Wireless security",
        "Network attacks",
        "Network defense",
        "VPNs and encryption",
        "SDN security",
        "Cloud networking"
      ],
      tools: ["Wireshark", "Firewalls", "IDS/IPS", "Network Monitoring Tools"],
      bestPractices: [
        "Network segmentation",
        "Encrypted communications",
        "Regular security assessments",
        "Protocol security",
        "Wireless protection"
      ]
    },
    {
      id: 5,
      name: "Identity and Access Management (IAM)",
      icon: UserCheck,
      color: "bg-red-500",
      description: "Management of identities and access controls",
      details: [
        "Identity management lifecycle",
        "Access control models",
        "Authentication methods",
        "Identity federation",
        "Single sign-on",
        "Privileged access",
        "Authorization mechanisms",
        "Identity attacks",
        "Biometric systems",
        "Identity governance"
      ],
      tools: ["IAM Platforms", "PAM Solutions", "MFA Tools", "Directory Services"],
      bestPractices: [
        "Principle of least privilege",
        "Regular access reviews",
        "Strong authentication",
        "Identity lifecycle management",
        "Privileged account monitoring"
      ]
    },
    {
      id: 6,
      name: "Security Assessment and Testing",
      icon: TestTube,
      color: "bg-yellow-500",
      description: "Security testing and vulnerability assessment",
      details: [
        "Assessment strategies",
        "Security control testing",
        "Security assessments",
        "Security audits",
        "Vulnerability scanning",
        "Penetration testing",
        "Log reviews",
        "Security metrics",
        "Test data lifecycle",
        "Security process data"
      ],
      tools: ["Vulnerability Scanners", "Penetration Testing Tools", "Security Metrics Platforms"],
      bestPractices: [
        "Regular vulnerability assessments",
        "Continuous monitoring",
        "Security metrics tracking",
        "Audit compliance",
        "Test environment security"
      ]
    },
    {
      id: 7,
      name: "Security Operations",
      icon: Terminal,
      color: "bg-indigo-500",
      description: "Day-to-day security operations and incident handling",
      details: [
        "Security operations",
        "Incident management",
        "Disaster recovery",
        "Business continuity",
        "Log monitoring",
        "Change management",
        "Asset management",
        "Patch management",
        "Security awareness",
        "Incident response"
      ],
      tools: ["SIEM", "Incident Response Platforms", "Change Management Tools"],
      bestPractices: [
        "24/7 monitoring",
        "Incident response procedures",
        "Change control processes",
        "Business continuity planning",
        "Regular backups"
      ]
    },
    {
      id: 8,
      name: "Software Development Security",
      icon: Code,
      color: "bg-pink-500",
      description: "Security in software development lifecycle",
      details: [
        "Security in SDLC",
        "Development security",
        "Security controls",
        "Software security effectiveness",
        "Secure coding practices",
        "Source code review",
        "Software security testing",
        "Third-party components",
        "API security",
        "DevSecOps practices"
      ],
      tools: ["SAST Tools", "DAST Tools", "Code Analysis Tools", "DevSecOps Platforms"],
      bestPractices: [
        "Secure SDLC implementation",
        "Code security reviews",
        "Security testing automation",
        "Secure deployment practices",
        "Dependencies management"
      ]
    }
  ];

  const quizQuestions = [
    {
      question: "Which security domain is primarily responsible for establishing governance principles and managing organizational risk?",
      options: [
        "Security and Risk Management",
        "Asset Security",
        "Security Operations",
        "Security Architecture and Engineering"
      ],
      correct: "Security and Risk Management"
    },
    {
      question: "Which domain handles the classification, labeling, and protection of organizational information?",
      options: [
        "Asset Security",
        "Security Operations",
        "Identity and Access Management",
        "Communication and Network Security"
      ],
      correct: "Asset Security"
    },
    {
      question: "Which domain focuses on secure coding practices and application security throughout the development lifecycle?",
      options: [
        "Software Development Security",
        "Security Architecture and Engineering",
        "Security Assessment and Testing",
        "Security Operations"
      ],
      correct: "Software Development Security"
    },
    {
      question: "Which domain is responsible for securing data in transit and managing network infrastructure?",
      options: [
        "Communication and Network Security",
        "Security Architecture and Engineering",
        "Security Operations",
        "Identity and Access Management"
      ],
      correct: "Communication and Network Security"
    }
  ];

  const calculateProgress = (domains, quizAnswers) => {
    const domainProgress = (domains.length / 8) * 50;
    const quizProgress = (Object.keys(quizAnswers).length / 4) * 50;
    return domainProgress + quizProgress;
  };

  const handleQuizAnswer = (questionIndex, answer) => {
    setQuizAnswers(prev => {
      const newAnswers = { ...prev, [questionIndex]: answer };
      setProgress(calculateProgress(completedDomains, newAnswers));
      return newAnswers;
    });
  };

  const handleDomainComplete = (domainId) => {
    if (!completedDomains.includes(domainId)) {
      const newCompleted = [...completedDomains, domainId];
      setCompletedDomains(newCompleted);
      setProgress(calculateProgress(newCompleted, quizAnswers));
    }
  };

  const DomainCard = ({ domain }) => (
    <div
      className={`${domain.color} rounded-lg p-5 text-white cursor-pointer
        hover:scale-105 transition-all duration-300 relative
        min-h-[220px] flex flex-col justify-between
        ${selectedDomain?.id === domain.id ? 'ring-4 ring-white' : ''}
        ${completedDomains.includes(domain.id) ? 'opacity-90' : ''}`}
      onClick={() => setSelectedDomain(domain)}
    >
      {completedDomains.includes(domain.id) && (
        <div className="absolute top-3 right-3">
          <Check className="w-5 h-5" />
        </div>
      )}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <domain.icon className="w-6 h-6 flex-shrink-0" />
          <h3 className="font-bold text-base leading-tight">{domain.name}</h3>
        </div>
        <p className="text-sm opacity-90">{domain.description}</p>
      </div>
    </div>
  );

  const DomainDetails = ({ domain }) => (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <domain.icon className="w-6 h-6" />
          {domain.name}
        </CardTitle>
        <CardDescription>{domain.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="details">
            <AccordionTrigger>Key Components</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6 space-y-2">
                {domain.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="tools">
            <AccordionTrigger>Common Tools</AccordionTrigger>
            <AccordionContent>
              <div className="flex gap-2 flex-wrap">
                {domain.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 
                      transition-colors cursor-pointer flex items-center gap-1"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="practices">
            <AccordionTrigger>Best Practices</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                {domain.bestPractices.map((practice, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" />
                    {practice}
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <button
          onClick={() => handleDomainComplete(domain.id)}
          className={`mt-4 px-4 py-2 rounded-lg transition-colors ${
            completedDomains.includes(domain.id)
              ? 'bg-green-500 text-white' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {completedDomains.includes(domain.id)
            ? 'Completed!'
            : 'Mark as Complete'}
        </button>
      </CardContent>
    </Card>
  );

  const QuizSection = () => (
    <div className="space-y-6">
      {quizQuestions.map((q, idx) => (
        <Card key={idx} className="p-4">
          <h3 className="font-bold mb-4">{q.question}</h3>
          <div className="space-y-2">
            {q.options.map((option, optIdx) => (
              <div
                key={optIdx}
                onClick={() => handleQuizAnswer(idx, option)}
                className={`p-3 rounded-lg cursor-pointer transition-colors
                  ${quizAnswers[idx] === option
                    ? quizAnswers[idx] === q.correct
                      ? 'bg-green-100 border-green-500'
                      : 'bg-red-100 border-red-500'
                    : 'bg-gray-50 hover:bg-gray-100'
                  } border`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {quizAnswers[idx] === option && (
                    quizAnswers[idx] === q.correct
                      ? <Check className="w-5 h-5 text-green-500" />
                      : <X className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );

  const CompletionStatus = () => (
    <div className="mb-6 space-y-2">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Domains Completed: {completedDomains.length}/8</span>
        <span>Quiz Progress: {Object.keys(quizAnswers).length}/4</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      {progress === 100 && (
        <div className="text-center text-green-600 font-bold">
          🎉 Congratulations! You've completed all learning objectives!
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-8 h-8 text-blue-500" />
              <div>
                <CardTitle>CISSP Domains Framework</CardTitle>
                <CardDescription>Interactive Learning Experience</CardDescription>
              </div>
            </div>
            <button
              onClick={() => setShowQuiz(!showQuiz)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              {showQuiz ? 'Back to Framework' : 'Test Your Knowledge'}
            </button>
          </div>
          <CompletionStatus />
        </CardHeader>
        <CardContent>
          {!showQuiz ? (
            <div className="space-y-4">
              <div className="text-sm text-gray-600">
                <Info className="inline-block w-4 h-4 mr-2" />
                Click on each domain to learn more and mark it as complete
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {domains.map(domain => (
                  <DomainCard key={domain.id} domain={domain} />
                ))}
              </div>
              {selectedDomain && <DomainDetails domain={selectedDomain} />}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-sm text-gray-600">
                <Info className="inline-block w-4 h-4 mr-2" />
                Answer all questions to complete the quiz section
              </div>
              <QuizSection />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityFrameworkVisual;