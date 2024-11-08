import React, { useState } from 'react';
import { AlertTriangle, Database, Shield, Search, Info, CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const RiskAssessmentVisual = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [showScenario, setShowScenario] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const steps = [
    {
      title: "Asset Inventory & Classification",
      icon: Database,
      color: "text-blue-500",
      description: "Identify and classify organizational assets",
      details: "Maintain comprehensive inventories of physical hardware, software systems, data repositories, and intellectual property. Classification is based on criticality and sensitivity.",
      realWorldExample: {
        title: "Healthcare Provider Asset Classification",
        scenario: "A major hospital system needs to classify its assets.",
        assets: [
          { name: "Patient Records Database", classification: "Critical", reason: "Contains sensitive patient data protected by HIPAA" },
          { name: "Medical Imaging Systems", classification: "High", reason: "Essential for patient diagnosis and treatment" },
          { name: "Billing System", classification: "Medium", reason: "Important for operations but has recovery options" },
          { name: "Public Website", classification: "Low", reason: "Public information only, minimal impact if temporarily unavailable" }
        ],
        challenge: {
          question: "A new telemedicine platform is being implemented. How should it be classified?",
          options: [
            { text: "Low - It's just a communication tool", correct: false },
            { text: "Critical - It handles patient care and sensitive data", correct: true },
            { text: "Medium - It can be replaced with phone calls", correct: false }
          ]
        }
      }
    },
    {
      title: "Threat Assessment",
      icon: AlertTriangle,
      color: "text-yellow-500",
      description: "Identify potential threats using multiple intelligence sources",
      details: "Analyze historical incidents, industry threat reports, and vulnerability databases. Consider both external threats (cybercriminals, nation-states) and internal threats.",
      realWorldExample: {
        title: "Financial Services Threat Landscape",
        scenario: "A cryptocurrency exchange faces multiple threat vectors.",
        threats: [
          { type: "External", name: "Advanced Persistent Threats (APTs)", risk: "High", description: "Nation-state actors targeting crypto assets" },
          { type: "External", name: "Ransomware Groups", risk: "High", description: "Organized cybercrime targeting high-value assets" },
          { type: "Internal", name: "Privileged Users", risk: "Medium", description: "Employees with access to critical systems" },
          { type: "Technical", name: "Smart Contract Vulnerabilities", risk: "High", description: "Code flaws in trading systems" }
        ],
        challenge: {
          question: "A new threat actor group is specifically targeting crypto exchanges. What should be the immediate focus?",
          options: [
            { text: "Update the website security", correct: false },
            { text: "Enhance wallet infrastructure security", correct: true },
            { text: "Increase marketing budget", correct: false }
          ]
        }
      }
    },
    {
      title: "Vulnerability Management",
      icon: Shield,
      color: "text-red-500",
      description: "Continuous scanning and assessment of security weaknesses",
      details: "Combine automated vulnerability scanning tools with manual penetration testing. Assess technical, procedural, and human vulnerabilities.",
      realWorldExample: {
        title: "E-commerce Platform Security Assessment",
        scenario: "A large online retailer conducts comprehensive vulnerability assessment.",
        vulnerabilities: [
          { system: "Payment Processing", type: "Technical", severity: "Critical", description: "Outdated SSL certificates" },
          { system: "User Authentication", type: "Configuration", severity: "High", description: "Weak password policies" },
          { system: "Employee Training", type: "Human", severity: "Medium", description: "Low security awareness scores" },
          { system: "Inventory System", type: "Integration", severity: "High", description: "Unencrypted data transmission" }
        ],
        challenge: {
          question: "During a scan, multiple vulnerabilities are found. Which should be addressed first?",
          options: [
            { text: "Update the company blog", correct: false },
            { text: "Fix SSL certificates in payment system", correct: true },
            { text: "Redesign the logo", correct: false }
          ]
        }
      }
    }
  ];

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % steps.length);
    resetInteraction();
  };

  const handlePrevious = () => {
    setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
    resetInteraction();
  };

  const resetInteraction = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowScenario(false);
  };

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
    setShowFeedback(true);
  };

  const ActiveIcon = steps[activeStep].icon;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Risk Assessment Process</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowInfo(!showInfo)}
            >
              <Info className="h-5 w-5" />
            </Button>
          </div>
          <CardDescription>
            Interactive guide to understanding the risk assessment lifecycle
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showInfo && (
            <Alert className="mb-4">
              <AlertDescription>
                Each step in the risk assessment process builds upon the previous one. 
                Explore real-world scenarios and test your knowledge with interactive challenges.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <React.Fragment key={index}>
                  <div
                    className={`flex flex-col items-center cursor-pointer transition-all
                      ${index === activeStep ? 'scale-110' : 'opacity-50'}`}
                    onClick={() => {
                      setActiveStep(index);
                      resetInteraction();
                    }}
                  >
                    <div className={`p-3 rounded-full bg-gray-100 ${index === activeStep ? 'ring-2 ring-blue-500' : ''}`}>
                      {React.createElement(step.icon, { className: `h-6 w-6 ${step.color}` })}
                    </div>
                    <div className="text-sm mt-2 text-center">Step {index + 1}</div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="h-px w-12 bg-gray-300 mt-4" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <Card className="bg-gray-50">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <ActiveIcon className={`h-6 w-6 ${steps[activeStep].color}`} />
                  <h3 className="text-xl font-semibold">{steps[activeStep].title}</h3>
                </div>
                <p className="text-gray-600">{steps[activeStep].description}</p>
                <div className="bg-white p-4 rounded-lg">
                  <p className="mb-2">{steps[activeStep].details}</p>
                </div>

                <Button 
                  onClick={() => setShowScenario(!showScenario)}
                  className="w-full"
                >
                  {showScenario ? "Hide" : "Show"} Real-World Example
                  {showScenario ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                </Button>

                {showScenario && (
                  <div className="bg-white p-4 rounded-lg space-y-4">
                    <h4 className="font-semibold text-lg">{steps[activeStep].realWorldExample.title}</h4>
                    <p className="text-gray-700">{steps[activeStep].realWorldExample.scenario}</p>
                    
                    <div className="space-y-2">
                      {/* Render different content based on step type */}
                      {activeStep === 0 && steps[activeStep].realWorldExample.assets.map((asset, index) => (
                        <div key={index} className="border-l-4 border-blue-500 pl-3 py-2">
                          <p className="font-semibold">{asset.name}</p>
                          <p className="text-sm text-gray-600">Classification: {asset.classification}</p>
                          <p className="text-sm text-gray-600">Reason: {asset.reason}</p>
                        </div>
                      ))}
                      
                      {activeStep === 1 && steps[activeStep].realWorldExample.threats.map((threat, index) => (
                        <div key={index} className="border-l-4 border-yellow-500 pl-3 py-2">
                          <p className="font-semibold">{threat.name}</p>
                          <p className="text-sm text-gray-600">Type: {threat.type} | Risk Level: {threat.risk}</p>
                          <p className="text-sm text-gray-600">{threat.description}</p>
                        </div>
                      ))}
                      
                      {activeStep === 2 && steps[activeStep].realWorldExample.vulnerabilities.map((vuln, index) => (
                        <div key={index} className="border-l-4 border-red-500 pl-3 py-2">
                          <p className="font-semibold">{vuln.system}</p>
                          <p className="text-sm text-gray-600">Type: {vuln.type} | Severity: {vuln.severity}</p>
                          <p className="text-sm text-gray-600">{vuln.description}</p>
                        </div>
                      ))}

                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <p className="font-semibold mb-2">Challenge Question:</p>
                        <p className="mb-4">{steps[activeStep].realWorldExample.challenge.question}</p>
                        
                        <div className="space-y-2">
                          {steps[activeStep].realWorldExample.challenge.options.map((option, index) => (
                            <Button
                              key={index}
                              variant={selectedAnswer === index ? 'default' : 'outline'}
                              className="w-full justify-start text-left"
                              onClick={() => handleAnswerSelect(index)}
                              disabled={showFeedback}
                            >
                              {option.text}
                              {showFeedback && option.correct && (
                                <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
                              )}
                              {showFeedback && !option.correct && selectedAnswer === index && (
                                <XCircle className="ml-2 h-4 w-4 text-red-500" />
                              )}
                            </Button>
                          ))}
                        </div>

                        {showFeedback && (
                          <Alert className="mt-4">
                            <AlertDescription>
                              {steps[activeStep].realWorldExample.challenge.options[selectedAnswer].correct 
                                ? "Correct! You've identified the appropriate action."
                                : "Incorrect. Consider the criticality of the system and its impact on security."}
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between mt-4">
            <Button onClick={handlePrevious} variant="outline">Previous</Button>
            <Button onClick={handleNext}>Next</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAssessmentVisual;
