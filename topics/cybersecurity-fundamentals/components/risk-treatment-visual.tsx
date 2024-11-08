import React, { useState } from 'react';
import { Shield, RefreshCcw, Ban, Check, DollarSign, AlertTriangle, ArrowRight, HelpCircle, Scale, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const RiskTreatmentVisual = () => {
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [showCostBenefit, setShowCostBenefit] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);
  const [showDecisionGuide, setShowDecisionGuide] = useState(false);

  // Decision tree state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const strategies = [
    {
      id: "mitigate",
      title: "Risk Mitigation",
      icon: Shield,
      color: "text-blue-500",
      description: "Implement controls to reduce risk to acceptable levels",
      examples: [
        "Multi-factor Authentication Implementation",
        "Security Awareness Training Program",
        "Network Segmentation Project"
      ],
      controls: [
        { type: "Technical", examples: "Firewalls, Encryption, Access Controls" },
        { type: "Administrative", examples: "Policies, Procedures, Training" },
        { type: "Physical", examples: "Barriers, Environmental Controls, Security Guards" }
      ],
      effectiveness: "High",
      resourceRequirement: "High",
      timeToImplement: "Medium to Long",
      costBenefit: {
        costs: ["Implementation costs", "Maintenance expenses", "Training requirements"],
        benefits: ["Reduced risk exposure", "Improved security posture", "Regulatory compliance"]
      }
    },
    {
      id: "transfer",
      title: "Risk Transfer",
      icon: RefreshCcw,
      color: "text-green-500",
      description: "Shift risk responsibility to third parties",
      examples: [
        "Cyber Insurance Coverage",
        "Cloud Service Provider Agreement",
        "Security Service Contracts"
      ],
      methods: [
        { type: "Insurance", examples: "Cyber liability, Data breach coverage" },
        { type: "Contracts", examples: "Service Level Agreements, Liability clauses" },
        { type: "Outsourcing", examples: "Managed Security Services, Cloud providers" }
      ],
      effectiveness: "Medium",
      resourceRequirement: "Medium",
      timeToImplement: "Short to Medium",
      costBenefit: {
        costs: ["Premium payments", "Contract fees", "Service charges"],
        benefits: ["Risk sharing", "Expert handling", "Financial protection"]
      }
    },
    {
      id: "accept",
      title: "Risk Acceptance",
      icon: Check,
      color: "text-yellow-500",
      description: "Formal acceptance of identified risks",
      examples: [
        "Legacy System Operation",
        "Business Process Exception",
        "Cost-Prohibitive Controls"
      ],
      procedures: [
        { type: "Documentation", examples: "Risk acceptance forms, Business justification" },
        { type: "Approval", examples: "Executive sign-off, Risk committee review" },
        { type: "Monitoring", examples: "Regular risk reviews, Incident tracking" }
      ],
      effectiveness: "Low",
      resourceRequirement: "Low",
      timeToImplement: "Short",
      costBenefit: {
        costs: ["Potential incident costs", "Monitoring expenses", "Documentation effort"],
        benefits: ["Resource conservation", "Operational continuity", "Focus on critical risks"]
      }
    },
    {
      id: "avoid",
      title: "Risk Avoidance",
      icon: Ban,
      color: "text-red-500",
      description: "Eliminate the risk by removing the threat source",
      examples: [
        "Technology Replacement",
        "Process Elimination",
        "Market Exit"
      ],
      methods: [
        { type: "Elimination", examples: "Discontinue risky processes, Remove vulnerable systems" },
        { type: "Redesign", examples: "Architecture changes, Process reengineering" },
        { type: "Alternative", examples: "Different technology, Alternative methods" }
      ],
      effectiveness: "Very High",
      resourceRequirement: "Very High",
      timeToImplement: "Long",
      costBenefit: {
        costs: ["Implementation costs", "Business disruption", "Lost opportunities"],
        benefits: ["Complete risk elimination", "Reduced liability", "Simplified operations"]
      }
    }
  ];

  const caseStudies = [
    {
      id: 1,
      title: "Healthcare Data Protection",
      scenario: "A hospital needs to protect patient records from cyber threats",
      riskDetails: {
        asset: "Patient Health Records",
        threat: "Data Breach",
        impact: "High",
        likelihood: "Medium"
      },
      treatments: [
        {
          strategy: "mitigate",
          actions: "Implement encryption and access controls",
          cost: "$150,000",
          effectiveness: "85%",
          timeline: "6 months"
        },
        {
          strategy: "transfer",
          actions: "Obtain cyber insurance coverage",
          cost: "$50,000/year",
          effectiveness: "60%",
          timeline: "1 month"
        }
      ],
      outcome: "Combined approach: Implemented controls and obtained insurance",
      lessons: "Multiple treatment strategies can be combined for optimal protection"
    },
    {
      id: 2,
      title: "Legacy System Risk",
      scenario: "Manufacturing plant running critical legacy control system",
      riskDetails: {
        asset: "Industrial Control System",
        threat: "System Failure",
        impact: "Critical",
        likelihood: "Low"
      },
      treatments: [
        {
          strategy: "accept",
          actions: "Document risk and implement monitoring",
          cost: "$20,000",
          effectiveness: "30%",
          timeline: "1 month"
        },
        {
          strategy: "avoid",
          actions: "Replace entire system",
          cost: "$2,000,000",
          effectiveness: "100%",
          timeline: "18 months"
        }
      ],
      outcome: "Temporary acceptance with planned system replacement",
      lessons: "Risk acceptance can be appropriate with proper documentation and future planning"
    }
  ];

  const decisionGuide = [
    {
      question: "Is the risk level above your organization's risk appetite?",
      options: ["Yes", "No"],
      next: {
        "Yes": 1,
        "No": "accept"
      }
    },
    {
      question: "Can the risk be effectively reduced through controls?",
      options: ["Yes", "No"],
      next: {
        "Yes": 2,
        "No": 3
      }
    },
    {
      question: "Are control implementation costs justified by risk reduction?",
      options: ["Yes", "No"],
      next: {
        "Yes": "mitigate",
        "No": 3
      }
    },
    {
      question: "Can the risk be transferred to a third party?",
      options: ["Yes", "No"],
      next: {
        "Yes": "transfer",
        "No": "avoid"
      }
    }
  ];

  const getRecommendation = (answers) => {
    let currentQ = 0;
    for (const answer of answers) {
      const next = decisionGuide[currentQ].next[answer];
      if (typeof next === 'string') {
        return next;
      }
      currentQ = next;
    }
    return null;
  };

  const handleAnswer = (answer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    const next = decisionGuide[currentQuestion].next[answer];
    if (typeof next === 'string') {
      setSelectedStrategy(next);
      setCurrentQuestion(0);
      setAnswers([]);
    } else {
      setCurrentQuestion(next);
    }
  };

  const resetDecisionGuide = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedStrategy(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Risk Treatment Strategies</CardTitle>
          <CardDescription>
            Interactive guide to understanding and selecting risk treatment approaches
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="strategies" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="strategies">
                <Shield className="w-4 h-4 mr-2" />
                Strategies
              </TabsTrigger>
              <TabsTrigger value="decision-guide">
                <HelpCircle className="w-4 h-4 mr-2" />
                Decision Guide
              </TabsTrigger>
              <TabsTrigger value="case-studies">
                <FileText className="w-4 h-4 mr-2" />
                Case Studies
              </TabsTrigger>
            </TabsList>

            <TabsContent value="strategies">
              <div className="grid grid-cols-2 gap-4">
                {strategies.map((strategy) => (
                  <Card 
                    key={strategy.id}
                    className={`cursor-pointer transition-all ${
                      selectedStrategy === strategy.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedStrategy(strategy.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-2">
                        {React.createElement(strategy.icon, {
                          className: `w-5 h-5 ${strategy.color}`
                        })}
                        <h3 className="font-semibold">{strategy.title}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{strategy.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedStrategy && (
                <Card className="mt-4">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">
                        {strategies.find(s => s.id === selectedStrategy).title} Details
                      </h3>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2">Key Characteristics</h4>
                          <div className="space-y-2">
                            <p className="text-sm">
                              <span className="font-medium">Effectiveness:</span>{' '}
                              {strategies.find(s => s.id === selectedStrategy).effectiveness}
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Resource Requirement:</span>{' '}
                              {strategies.find(s => s.id === selectedStrategy).resourceRequirement}
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Implementation Time:</span>{' '}
                              {strategies.find(s => s.id === selectedStrategy).timeToImplement}
                            </p>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Examples</h4>
                          <ul className="list-disc list-inside text-sm space-y-1">
                            {strategies.find(s => s.id === selectedStrategy).examples.map((example, index) => (
                              <li key={index}>{example}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <Button 
                        onClick={() => setShowCostBenefit(!showCostBenefit)}
                        className="w-full mt-4"
                      >
                        {showCostBenefit ? 'Hide' : 'Show'} Cost-Benefit Analysis
                      </Button>

                      {showCostBenefit && (
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="space-y-2">
                            <h4 className="font-medium">Costs</h4>
                            <ul className="list-disc list-inside text-sm">
                              {strategies.find(s => s.id === selectedStrategy).costBenefit.costs.map((cost, index) => (
                                <li key={index}>{cost}</li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-medium">Benefits</h4>
                            <ul className="list-disc list-inside text-sm">
                              {strategies.find(s => s.id === selectedStrategy).costBenefit.benefits.map((benefit, index) => (
                                <li key={index}>{benefit}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="decision-guide">
              <Card>
                <CardContent className="p-4">
                  {selectedStrategy ? (
                    <div className="space-y-4">
                      <Alert>
                        <AlertDescription>
                          Recommended Strategy: {strategies.find(s => s.id === selectedStrategy).title}
                        </AlertDescription>
                      </Alert>
                      <p className="text-sm">
                        {strategies.find(s => s.id === selectedStrategy).description}
                      </p>
                      <Button onClick={resetDecisionGuide}>Start Over</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <h3 className="font-semibold">
                        {decisionGuide[currentQuestion].question}
                      </h3>
                      <div className="space-y-2">
                        {decisionGuide[currentQuestion].options.map((option) => (
                          <Button
                            key={option}
                            onClick={() => handleAnswer(option)}
                            variant="outline"
                            className="w-full"
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="case-studies">
              <div className="space-y-4">
                {caseStudies.map((study) => (
                  <Card key={study.id} className="cursor-pointer hover:bg-gray-50">
                    <CardHeader 
                      className="p-4"
                      onClick={() => setSelectedCase(selectedCase === study.id ? null : study.id)}
                    >
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{study.title}</CardTitle>
                        <ArrowRight className={`w-4 h-4 transition-transform ${
                          selectedCase === study.id ? 'rotate-90' : ''
                        }`} /></div>
                        <CardDescription>{study.scenario}</CardDescription>
                      </CardHeader>
                      
                      {selectedCase === study.id && (
                        <CardContent className="p-4 pt-0">
                          <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-medium mb-2">Risk Details</h4>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <span className="font-medium">Asset:</span> {study.riskDetails.asset}
                                </div>
                                <div>
                                  <span className="font-medium">Threat:</span> {study.riskDetails.threat}
                                </div>
                                <div>
                                  <span className="font-medium">Impact:</span> {study.riskDetails.impact}
                                </div>
                                <div>
                                  <span className="font-medium">Likelihood:</span> {study.riskDetails.likelihood}
                                </div>
                              </div>
                            </div>
  
                            <div>
                              <h4 className="font-medium mb-2">Treatment Options Considered</h4>
                              <div className="space-y-2">
                                {study.treatments.map((treatment, index) => (
                                  <Card key={index} className="bg-white">
                                    <CardContent className="p-4">
                                      <div className="flex items-center space-x-2 mb-2">
                                        {React.createElement(
                                          strategies.find(s => s.id === treatment.strategy).icon,
                                          { className: `w-4 h-4 ${strategies.find(s => s.id === treatment.strategy).color}` }
                                        )}
                                        <span className="font-medium">
                                          {strategies.find(s => s.id === treatment.strategy).title}
                                        </span>
                                      </div>
                                      <div className="grid grid-cols-2 gap-2 text-sm">
                                        <div>
                                          <span className="font-medium">Actions:</span> {treatment.actions}
                                        </div>
                                        <div>
                                          <span className="font-medium">Cost:</span> {treatment.cost}
                                        </div>
                                        <div>
                                          <span className="font-medium">Effectiveness:</span> {treatment.effectiveness}
                                        </div>
                                        <div>
                                          <span className="font-medium">Timeline:</span> {treatment.timeline}
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </div>
  
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h4 className="font-medium mb-2">Outcome</h4>
                              <p className="text-sm">{study.outcome}</p>
                            </div>
  
                            <div className="bg-green-50 p-4 rounded-lg">
                              <h4 className="font-medium mb-2">Key Lessons</h4>
                              <p className="text-sm">{study.lessons}</p>
                            </div>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
  
            <Card className="mt-4">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Scale className="w-5 h-5 text-blue-500" />
                  <h3 className="font-semibold">Best Practices</h3>
                </div>
                <ul className="mt-2 space-y-2 text-sm">
                  <li>• Always consider multiple treatment strategies for each risk</li>
                  <li>• Document the rationale behind chosen treatment approaches</li>
                  <li>• Regular review and adjustment of treatment effectiveness</li>
                  <li>• Consider business impact and resource constraints</li>
                  <li>• Maintain clear communication with stakeholders</li>
                </ul>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  export default RiskTreatmentVisual;