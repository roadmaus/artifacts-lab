import React, { useState } from 'react';
import { 
  GitFork, Shield, Target, AlertCircle, 
  CheckCircle, RefreshCw, Eye, Lock,
  AlertTriangle, ArrowRight, Activity,
  Workflow, CircleDot, ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

// NIST CSF Component
const NISTFramework = () => {
  const [activeFunction, setActiveFunction] = useState(null);

  const coreFunctions = [
    {
      name: 'Identify',
      icon: <Eye className="w-6 h-6 text-blue-500" />,
      description: 'Develop understanding to manage cybersecurity risk',
      categories: [
        'Asset Management',
        'Business Environment',
        'Governance',
        'Risk Assessment',
        'Risk Management Strategy'
      ]
    },
    {
      name: 'Protect',
      icon: <Shield className="w-6 h-6 text-green-500" />,
      description: 'Implement safeguards to ensure service delivery',
      categories: [
        'Access Control',
        'Awareness Training',
        'Data Security',
        'Protection Processes'
      ]
    },
    {
      name: 'Detect',
      icon: <Target className="w-6 h-6 text-yellow-500" />,
      description: 'Identify cybersecurity events',
      categories: [
        'Anomalies and Events',
        'Security Monitoring',
        'Detection Processes'
      ]
    },
    {
      name: 'Respond',
      icon: <AlertCircle className="w-6 h-6 text-red-500" />,
      description: 'Take action regarding detected events',
      categories: [
        'Response Planning',
        'Communications',
        'Analysis',
        'Mitigation',
        'Improvements'
      ]
    },
    {
      name: 'Recover',
      icon: <RefreshCw className="w-6 h-6 text-purple-500" />,
      description: 'Maintain resilience and restore capabilities',
      categories: [
        'Recovery Planning',
        'Improvements',
        'Communications'
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">NIST Cybersecurity Framework</h3>
      <div className="grid grid-cols-1 gap-4">
        {coreFunctions.map((func) => (
          <div
            key={func.name}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              activeFunction === func.name ? 'border-blue-500 shadow-lg' : 'border-gray-200'
            }`}
            onClick={() => setActiveFunction(activeFunction === func.name ? null : func.name)}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              {func.icon}
              <h4 className="font-medium">{func.name}</h4>
              <p className="text-sm text-gray-600">{func.description}</p>
            </div>
            {activeFunction === func.name && (
              <div className="mt-4">
                <h5 className="font-medium mb-2">Categories:</h5>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {func.categories.map((category, idx) => (
                    <li key={idx}>{category}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ISO 27001 Component
const ISO27001Framework = () => {
  const [activePhase, setActivePhase] = useState(null);

  const pdcaCycle = [
    {
      phase: 'Plan',
      icon: <Target className="w-6 h-6 text-blue-500" />,
      description: 'Establish ISMS objectives and processes',
      activities: [
        'Define scope',
        'Risk assessment',
        'Select controls',
        'Create Statement of Applicability',
        'Design ISMS'
      ]
    },
    {
      phase: 'Do',
      icon: <Activity className="w-6 h-6 text-green-500" />,
      description: 'Implement and operate the ISMS',
      activities: [
        'Implement controls',
        'Train staff',
        'Manage operations',
        'Maintain records',
        'Deploy security measures'
      ]
    },
    {
      phase: 'Check',
      icon: <CheckCircle className="w-6 h-6 text-yellow-500" />,
      description: 'Monitor and review the ISMS',
      activities: [
        'Internal audits',
        'Performance measurement',
        'Control effectiveness',
        'Review risk assessments',
        'Management review'
      ]
    },
    {
      phase: 'Act',
      icon: <RefreshCw className="w-6 h-6 text-red-500" />,
      description: 'Maintain and improve the ISMS',
      activities: [
        'Implement improvements',
        'Corrective actions',
        'Preventive measures',
        'Communication',
        'Update documentation'
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">ISO 27001 Framework</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pdcaCycle.map((phase) => (
          <div
            key={phase.phase}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              activePhase === phase.phase ? 'border-blue-500 shadow-lg' : 'border-gray-200'
            }`}
            onClick={() => setActivePhase(activePhase === phase.phase ? null : phase.phase)}
          >
            <div className="flex items-center space-x-2 mb-2">
              {phase.icon}
              <h4 className="font-medium">{phase.phase}</h4>
            </div>
            <p className="text-sm text-gray-600 mb-2">{phase.description}</p>
            {activePhase === phase.phase && (
              <div className="mt-2">
                <h5 className="font-medium mb-2">Key Activities:</h5>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {phase.activities.map((activity, idx) => (
                    <li key={idx}>{activity}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// MITRE ATT&CK Component
const MITREFramework = () => {
  const [activeTactic, setActiveTactic] = useState(null);

  const tactics = [
    {
      name: 'Initial Access',
      icon: <Lock className="w-6 h-6 text-red-500" />,
      description: 'Techniques to gain entry to target',
      techniques: [
        'Phishing',
        'External Remote Services',
        'Supply Chain Compromise',
        'Valid Accounts'
      ]
    },
    {
      name: 'Execution',
      icon: <Activity className="w-6 h-6 text-orange-500" />,
      description: 'Running malicious code',
      techniques: [
        'Command Line Interface',
        'PowerShell',
        'Windows Management Instrumentation',
        'User Execution'
      ]
    },
    {
      name: 'Persistence',
      icon: <CircleDot className="w-6 h-6 text-yellow-500" />,
      description: 'Maintaining access',
      techniques: [
        'Registry Run Keys',
        'Scheduled Tasks',
        'Account Manipulation',
        'Create Account'
      ]
    },
    {
      name: 'Lateral Movement',
      icon: <ArrowRight className="w-6 h-6 text-green-500" />,
      description: 'Moving through environment',
      techniques: [
        'Remote Services',
        'Pass the Hash',
        'Internal Spearphishing',
        'Remote File Copy'
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">MITRE ATT&CK Framework</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tactics.map((tactic) => (
          <div
            key={tactic.name}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              activeTactic === tactic.name ? 'border-blue-500 shadow-lg' : 'border-gray-200'
            }`}
            onClick={() => setActiveTactic(activeTactic === tactic.name ? null : tactic.name)}
          >
            <div className="flex items-center space-x-2 mb-2">
              {tactic.icon}
              <h4 className="font-medium">{tactic.name}</h4>
            </div>
            <p className="text-sm text-gray-600 mb-2">{tactic.description}</p>
            {activeTactic === tactic.name && (
              <div className="mt-2">
                <h5 className="font-medium mb-2">Common Techniques:</h5>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {tactic.techniques.map((technique, idx) => (
                    <li key={idx}>{technique}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Component
const FrameworkComparisonVisual = () => {
  return (
    <div className="w-full max-w-4xl p-4 space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <GitFork className="w-6 h-6" />
            <CardTitle>Security Frameworks Comparison</CardTitle>
          </div>
          <CardDescription>
            Interactive exploration of major security frameworks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <Tabs defaultValue="nist">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="nist">NIST CSF</TabsTrigger>
              <TabsTrigger value="iso">ISO 27001</TabsTrigger>
              <TabsTrigger value="mitre">MITRE ATT&CK</TabsTrigger>
            </TabsList>
            
            <TabsContent value="nist">
              <NISTFramework />
            </TabsContent>
            
            <TabsContent value="iso">
              <ISO27001Framework />
            </TabsContent>
            
            <TabsContent value="mitre">
              <MITREFramework />
            </TabsContent>
          </Tabs>

          <Alert>
            <AlertDescription>
              Click on any framework element to explore detailed information about its components and implementation guidance.
              Each framework serves different but complementary purposes in an organization's security program.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default FrameworkComparisonVisual;
