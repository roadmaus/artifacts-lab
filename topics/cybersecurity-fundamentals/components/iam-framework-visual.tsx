import React, { useState } from 'react';
import { 
  Key, UserCircle, Shield, FileCheck, 
  Lock, Users, Settings, AlertCircle,
  CheckCircle2, XCircle, Clock, Activity,
  User, UserCog, UserMinus, UserPlus
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Identity Management Component
const IdentityManagementSection = () => {
  const [activePhase, setActivePhase] = useState('creation');

  const lifecyclePhases = {
    creation: {
      icon: <UserPlus className="w-6 h-6 text-green-500" />,
      title: 'Identity Creation',
      steps: [
        'Identity proofing verification',
        'Account provisioning',
        'Initial access setup',
        'MFA enrollment'
      ]
    },
    management: {
      icon: <UserCog className="w-6 h-6 text-blue-500" />,
      title: 'Identity Management',
      steps: [
        'Profile updates',
        'Role changes',
        'Password resets',
        'Access modifications'
      ]
    },
    termination: {
      icon: <UserMinus className="w-6 h-6 text-red-500" />,
      title: 'Identity Termination',
      steps: [
        'Access revocation',
        'Account deactivation',
        'Audit trail creation',
        'Archive management'
      ]
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Identity Lifecycle</CardTitle>
        <CardDescription>Manage user identities from creation to termination</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(lifecyclePhases).map(([phase, data]) => (
            <div
              key={phase}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                activePhase === phase ? 'border-blue-500 shadow-lg' : 'border-gray-200'
              }`}
              onClick={() => setActivePhase(phase)}
            >
              <div className="flex items-center space-x-2 mb-4">
                {data.icon}
                <h3 className="font-medium">{data.title}</h3>
              </div>
              {activePhase === phase && (
                <ul className="list-disc list-inside space-y-2">
                  {data.steps.map((step, idx) => (
                    <li key={idx} className="text-sm">{step}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Access Management Component
const AccessManagementSection = () => {
  const [selectedControl, setSelectedControl] = useState('rbac');

  const accessControls = {
    rbac: {
      title: 'Role-Based Access Control',
      icon: <Users className="w-6 h-6 text-indigo-500" />,
      description: 'Access based on user roles',
      examples: [
        'Admin Role: Full system access',
        'Manager Role: Department access',
        'User Role: Basic access',
        'Guest Role: Limited access'
      ],
      benefits: [
        'Easy to manage',
        'Clear hierarchy',
        'Scalable',
        'Audit-friendly'
      ]
    },
    abac: {
      title: 'Attribute-Based Access Control',
      icon: <Settings className="w-6 h-6 text-green-500" />,
      description: 'Access based on attributes',
      examples: [
        'Location: Office vs Remote',
        'Time: Business hours only',
        'Device: Corporate vs Personal',
        'Security clearance level'
      ],
      benefits: [
        'Fine-grained control',
        'Context-aware',
        'Flexible policies',
        'Dynamic adjustment'
      ]
    },
    pam: {
      title: 'Privileged Access Management',
      icon: <Shield className="w-6 h-6 text-red-500" />,
      description: 'Managing privileged accounts',
      examples: [
        'Just-in-time access',
        'Password vaulting',
        'Session recording',
        'Emergency access'
      ],
      benefits: [
        'Reduced risk',
        'Complete audit trail',
        'Controlled elevation',
        'Time-bound access'
      ]
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Access Control Models</CardTitle>
        <CardDescription>Different approaches to managing access rights</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedControl} onValueChange={setSelectedControl}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="rbac">RBAC</TabsTrigger>
            <TabsTrigger value="abac">ABAC</TabsTrigger>
            <TabsTrigger value="pam">PAM</TabsTrigger>
          </TabsList>
          
          {Object.entries(accessControls).map(([key, data]) => (
            <TabsContent key={key} value={key}>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  {data.icon}
                  <h3 className="font-medium">{data.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{data.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Examples</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {data.examples.map((example, idx) => (
                        <li key={idx} className="text-sm">{example}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Benefits</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {data.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-sm">{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Identity Governance Component
const GovernanceSection = () => {
  const [activeProcess, setActiveProcess] = useState(null);

  const governanceProcesses = [
    {
      name: 'Access Reviews',
      icon: <FileCheck className="w-6 h-6 text-blue-500" />,
      description: 'Regular review of user access rights',
      steps: [
        'Generate access reports',
        'Distribute to managers',
        'Review and approve/reject',
        'Implement changes',
        'Document decisions'
      ]
    },
    {
      name: 'Separation of Duties',
      icon: <Users className="w-6 h-6 text-purple-500" />,
      description: 'Prevent conflicts of interest',
      steps: [
        'Identify critical functions',
        'Define incompatible roles',
        'Implement controls',
        'Monitor violations',
        'Regular assessment'
      ]
    },
    {
      name: 'Compliance Reporting',
      icon: <Activity className="w-6 h-6 text-green-500" />,
      description: 'Generate compliance reports',
      steps: [
        'Collect audit logs',
        'Generate reports',
        'Review findings',
        'Address issues',
        'Document compliance'
      ]
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identity Governance</CardTitle>
        <CardDescription>Ensuring proper oversight and compliance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {governanceProcesses.map((process) => (
            <div
              key={process.name}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                activeProcess === process.name ? 'border-blue-500 shadow-lg' : 'border-gray-200'
              }`}
              onClick={() => setActiveProcess(activeProcess === process.name ? null : process.name)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {process.icon}
                  <div>
                    <h3 className="font-medium">{process.name}</h3>
                    <p className="text-sm text-gray-600">{process.description}</p>
                  </div>
                </div>
              </div>
              {activeProcess === process.name && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Process Steps:</h4>
                  <ul className="list-decimal list-inside space-y-1">
                    {process.steps.map((step, idx) => (
                      <li key={idx} className="text-sm">{step}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Main Component
const IAMFrameworkVisual = () => {
  return (
    <div className="w-full max-w-4xl p-4 space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Key className="w-6 h-6" />
            <CardTitle>Identity and Access Management Framework</CardTitle>
          </div>
          <CardDescription>
            Comprehensive IAM implementation visualization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <Tabs defaultValue="identity">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="identity">Identity Management</TabsTrigger>
              <TabsTrigger value="access">Access Management</TabsTrigger>
              <TabsTrigger value="governance">Governance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="identity">
              <IdentityManagementSection />
            </TabsContent>
            
            <TabsContent value="access">
              <AccessManagementSection />
            </TabsContent>
            
            <TabsContent value="governance">
              <GovernanceSection />
            </TabsContent>
          </Tabs>

          <Alert>
            <AlertDescription>
              Click on any section to explore detailed information about IAM processes and controls.
              Each component follows Zero Trust principles and modern security best practices.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default IAMFrameworkVisual;
