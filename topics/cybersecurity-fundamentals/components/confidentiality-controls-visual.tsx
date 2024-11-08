import React, { useState } from 'react';
import { Triangle, Lock, Shield, FileText, AlertCircle, Building, Hospital, Coins } from 'lucide-react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

const ConfidentialityVisualization = () => {
  const [activeExample, setActiveExample] = useState('healthcare');
  const [showClassification, setShowClassification] = useState(false);
  const [selectedAccessLevel, setSelectedAccessLevel] = useState('user');

  const accessRoles = ['user', 'nurse', 'doctor', 'admin'];
  
  const confidentialityExamples = {
    healthcare: {
      id: 'healthcare',
      icon: Hospital,
      title: 'Healthcare Records (HIPAA)',
      description: 'Patient medical records protection',
      technicalControls: [
        'End-to-end encryption for all patient data',
        'Access logging and audit trails',
        'Secure backup systems'
      ],
      administrativeControls: [
        'Staff HIPAA training',
        'Data handling policies',
        'Regular compliance audits'
      ],
      classification: 'Restricted',
      accessLevels: {
        user: ['View own medical records'],
        nurse: ['View assigned patient records', 'Update vitals'],
        doctor: ['View all patient records', 'Update diagnoses', 'Prescribe medications'],
        admin: ['System configuration', 'User management', 'Audit log review']
      }
    },
    financial: {
      id: 'financial',
      icon: Coins,
      title: 'Financial Data (PCI DSS)',
      description: 'Banking transactions and financial records',
      technicalControls: [
        'TLS 1.3 encryption for transactions',
        'Tokenization of sensitive data',
        'Real-time monitoring systems'
      ],
      administrativeControls: [
        'PCI DSS compliance training',
        'Transaction verification procedures',
        'Incident response protocols'
      ],
      classification: 'Confidential',
      accessLevels: {
        user: ['View own transactions'],
        nurse: ['Process transactions', 'View customer info'],
        doctor: ['Approve large transactions', 'Handle disputes'],
        admin: ['System maintenance', 'Security monitoring']
      }
    },
    corporate: {
      id: 'corporate',
      icon: Building,
      title: 'Corporate Strategy',
      description: 'Internal business plans and strategies',
      technicalControls: [
        'Document encryption',
        'Data Loss Prevention (DLP)',
        'Access control systems'
      ],
      administrativeControls: [
        'NDA agreements',
        'Clean desk policy',
        'Information classification training'
      ],
      classification: 'Internal',
      accessLevels: {
        user: ['View public documents'],
        nurse: ['View department documents', 'Create reports'],
        doctor: ['View strategic plans', 'Modify department docs'],
        admin: ['Manage document access', 'System configuration']
      }
    }
  };

  const classificationLevels = [
    {
      level: 'Restricted',
      color: 'bg-red-500',
      description: 'Highest sensitivity level requiring strict controls',
      examples: ['Patient health records', 'Banking credentials', 'Encryption keys']
    },
    {
      level: 'Confidential',
      color: 'bg-orange-500',
      description: 'Sensitive information for internal use only',
      examples: ['Financial reports', 'Employee data', 'Business strategies']
    },
    {
      level: 'Internal',
      color: 'bg-yellow-500',
      description: 'General internal-only information',
      examples: ['Internal procedures', 'Team documents', 'Project plans']
    },
    {
      level: 'Public',
      color: 'bg-green-500',
      description: 'Information safe for public release',
      examples: ['Marketing materials', 'Public announcements', 'Product documentation']
    }
  ];

  const getPermittedActions = () => {
    if (!activeExample) return [];
    return confidentialityExamples[activeExample]?.accessLevels[selectedAccessLevel] || [];
  };

  const ExampleIcon = ({example}) => {
    const IconComponent = confidentialityExamples[example]?.icon || FileText;
    return <IconComponent className="h-6 w-6" />;
  };

  return (
    <div className="w-full max-w-6xl space-y-6 p-4">
      {/* Main Title */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Triangle className="h-8 w-8 text-blue-600" />
            <div>
              <CardTitle>Confidentiality in Information Security</CardTitle>
              <CardDescription>Understanding access control, data protection, and privacy measures</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Interactive Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Data Classification Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Data Classification Framework
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {classificationLevels.map((level) => (
                <div
                  key={level.level}
                  className="p-4 rounded-lg border hover:bg-slate-50 cursor-pointer transition-colors"
                  onClick={() => setShowClassification(level.level)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${level.color}`} />
                    <span className="font-medium">{level.level}</span>
                  </div>
                  {showClassification === level.level && (
                    <div className="mt-2 space-y-2">
                      <p className="text-sm text-gray-600">{level.description}</p>
                      <div className="text-sm">
                        <strong>Examples:</strong>
                        <ul className="list-disc pl-4 mt-1">
                          {level.examples.map((example, idx) => (
                            <li key={idx}>{example}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Access Control Visualization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Access Control Simulation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-2 mb-4">
                {accessRoles.map((role) => (
                  <button
                    key={role}
                    onClick={() => setSelectedAccessLevel(role)}
                    className={`px-4 py-2 rounded-lg capitalize ${
                      selectedAccessLevel === role
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
              
              <div className="p-4 bg-slate-50 rounded-lg">
                <h3 className="font-medium mb-2">Permitted Actions:</h3>
                <ul className="list-disc pl-4 space-y-1">
                  {getPermittedActions().map((action, idx) => (
                    <li key={idx} className="text-sm">{action}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-world Examples */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.values(confidentialityExamples).map((example) => (
          <Card
            key={example.id}
            className={`cursor-pointer transition-all ${
              activeExample === example.id ? 'ring-2 ring-blue-500' : ''
            }`}
            onClick={() => setActiveExample(example.id)}
          >
            <CardHeader>
              <div className="flex items-center gap-2">
                <ExampleIcon example={example.id} />
                <CardTitle className="text-lg">{example.title}</CardTitle>
              </div>
              <CardDescription>{example.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {activeExample === example.id && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Technical Controls</h4>
                    <ul className="list-disc pl-4 space-y-1 text-sm">
                      {example.technicalControls.map((control, idx) => (
                        <li key={idx}>{control}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Administrative Controls</h4>
                    <ul className="list-disc pl-4 space-y-1 text-sm">
                      {example.administrativeControls.map((control, idx) => (
                        <li key={idx}>{control}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Key Principles */}
      <Alert className="bg-blue-50 border-blue-200">
        <AlertTitle>Key Principles of Confidentiality</AlertTitle>
        <AlertDescription>
          <ul className="list-disc pl-4 space-y-2 mt-2">
            <li>Principle of Least Privilege (PoLP) - Users receive minimum necessary access</li>
            <li>Need-to-Know Basis - Access granted only when required for job functions</li>
            <li>Defense in Depth - Multiple layers of security controls</li>
            <li>Regular Access Review - Periodic validation of access rights</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ConfidentialityVisualization;
