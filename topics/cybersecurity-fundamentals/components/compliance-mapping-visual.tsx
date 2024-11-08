import React, { useState } from 'react';
import { 
  CheckCircle, Shield, Lock, FileText,
  CreditCard, Cloud, AlertTriangle, Eye,
  Database, User, Network, RefreshCw,
  List, AlertCircle, Server, UserCheck
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

// GDPR Component
const GDPRSection = () => {
  const [activePrinciple, setActivePrinciple] = useState(null);

  const principles = [
    {
      name: 'Data Protection Principles',
      icon: <Shield className="w-6 h-6 text-blue-500" />,
      principles: [
        'Lawfulness, Fairness, Transparency',
        'Purpose Limitation',
        'Data Minimization',
        'Accuracy',
        'Storage Limitation',
        'Integrity and Confidentiality'
      ],
      implementation: [
        'Document processing activities',
        'Establish legal basis',
        'Implement privacy notices',
        'Regular data reviews'
      ]
    },
    {
      name: 'Individual Rights',
      icon: <User className="w-6 h-6 text-green-500" />,
      principles: [
        'Right to Access',
        'Right to Rectification',
        'Right to Erasure',
        'Right to Portability',
        'Right to Object',
        'Right to Restrict Processing'
      ],
      implementation: [
        'DSAR process implementation',
        'Identity verification procedures',
        'Response tracking system',
        'Staff training'
      ]
    },
    {
      name: 'Security Measures',
      icon: <Lock className="w-6 h-6 text-red-500" />,
      principles: [
        'Technical Controls',
        'Organizational Controls',
        'Data Protection by Design',
        'Breach Notification',
        'Impact Assessments',
        'Records of Processing'
      ],
      implementation: [
        'Security controls implementation',
        'Regular assessments',
        'Incident response procedures',
        'Documentation maintenance'
      ]
    }
  ];

  return (
    <div className="space-y-4">
      {principles.map((section) => (
        <Card 
          key={section.name}
          className={`cursor-pointer transition-all ${
            activePrinciple === section.name ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => setActivePrinciple(activePrinciple === section.name ? null : section.name)}
        >
          <CardHeader className="flex flex-row items-center space-x-2">
            {section.icon}
            <div>
              <CardTitle className="text-lg">{section.name}</CardTitle>
            </div>
          </CardHeader>
          {activePrinciple === section.name && (
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Key Principles</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {section.principles.map((principle, idx) => (
                      <li key={idx} className="text-sm">{principle}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Implementation Steps</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {section.implementation.map((step, idx) => (
                      <li key={idx} className="text-sm">{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
};

// PCI DSS Component
const PCIDSSSection = () => {
  const [activeRequirement, setActiveRequirement] = useState(null);

  const requirements = [
    {
      name: 'Network Security',
      icon: <Network className="w-6 h-6 text-blue-500" />,
      requirements: [
        'Install and maintain firewall',
        'Change vendor defaults',
        'Protect stored data',
        'Encrypt transmission'
      ],
      implementation: [
        'Network segmentation',
        'Firewall configuration',
        'Encryption implementation',
        'Regular testing'
      ]
    },
    {
      name: 'Access Control',
      icon: <Lock className="w-6 h-6 text-green-500" />,
      requirements: [
        'Restrict access by need',
        'Unique user IDs',
        'Physical access control',
        'Monitor access'
      ],
      implementation: [
        'Role-based access',
        'Access review process',
        'Logging implementation',
        'Regular audits'
      ]
    },
    {
      name: 'Monitoring & Testing',
      icon: <Eye className="w-6 h-6 text-yellow-500" />,
      requirements: [
        'Track and monitor access',
        'Test security systems',
        'Maintain security policy',
        'Regular assessments'
      ],
      implementation: [
        'Log management',
        'Vulnerability scanning',
        'Penetration testing',
        'Policy reviews'
      ]
    }
  ];

  return (
    <div className="space-y-4">
      {requirements.map((req) => (
        <Card 
          key={req.name}
          className={`cursor-pointer transition-all ${
            activeRequirement === req.name ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => setActiveRequirement(activeRequirement === req.name ? null : req.name)}
        >
          <CardHeader className="flex flex-row items-center space-x-2">
            {req.icon}
            <div>
              <CardTitle className="text-lg">{req.name}</CardTitle>
            </div>
          </CardHeader>
          {activeRequirement === req.name && (
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Requirements</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {req.requirements.map((requirement, idx) => (
                      <li key={idx} className="text-sm">{requirement}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Implementation</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {req.implementation.map((step, idx) => (
                      <li key={idx} className="text-sm">{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
};

// SOC 2 Component
const SOC2Section = () => {
  const [activeCriteria, setActiveCriteria] = useState(null);

  const trustCriteria = [
    {
      name: 'Security',
      icon: <Shield className="w-6 h-6 text-red-500" />,
      criteria: [
        'Access Controls',
        'System Operations',
        'Change Management',
        'Risk Mitigation'
      ],
      controls: [
        'Authentication systems',
        'Security monitoring',
        'Incident response',
        'Vulnerability management'
      ]
    },
    {
      name: 'Availability',
      icon: <Server className="w-6 h-6 text-green-500" />,
      criteria: [
        'Performance Monitoring',
        'Disaster Recovery',
        'Business Continuity',
        'Incident Management'
      ],
      controls: [
        'Monitoring systems',
        'Backup procedures',
        'Recovery testing',
        'Capacity planning'
      ]
    },
    {
      name: 'Confidentiality',
      icon: <Lock className="w-6 h-6 text-blue-500" />,
      criteria: [
        'Data Classification',
        'Data Encryption',
        'Access Controls',
        'Data Disposal'
      ],
      controls: [
        'Encryption implementation',
        'Access reviews',
        'Data handling procedures',
        'Secure disposal methods'
      ]
    }
  ];

  return (
    <div className="space-y-4">
      {trustCriteria.map((criteria) => (
        <Card 
          key={criteria.name}
          className={`cursor-pointer transition-all ${
            activeCriteria === criteria.name ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => setActiveCriteria(activeCriteria === criteria.name ? null : criteria.name)}
        >
          <CardHeader className="flex flex-row items-center space-x-2">
            {criteria.icon}
            <div>
              <CardTitle className="text-lg">{criteria.name}</CardTitle>
            </div>
          </CardHeader>
          {activeCriteria === criteria.name && (
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Trust Criteria</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {criteria.criteria.map((criterion, idx) => (
                      <li key={idx} className="text-sm">{criterion}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Control Implementation</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {criteria.controls.map((control, idx) => (
                      <li key={idx} className="text-sm">{control}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
};

// Main Component
const ComplianceMappingVisual = () => {
  return (
    <div className="w-full max-w-4xl p-4 space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6" />
            <CardTitle>Compliance and Industry Standards</CardTitle>
          </div>
          <CardDescription>
            Interactive exploration of major compliance frameworks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <Tabs defaultValue="gdpr">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="gdpr">GDPR</TabsTrigger>
              <TabsTrigger value="pci">PCI DSS</TabsTrigger>
              <TabsTrigger value="soc2">SOC 2</TabsTrigger>
            </TabsList>
            
            <TabsContent value="gdpr">
              <GDPRSection />
            </TabsContent>
            
            <TabsContent value="pci">
              <PCIDSSSection />
            </TabsContent>
            
            <TabsContent value="soc2">
              <SOC2Section />
            </TabsContent>
          </Tabs>

          <Alert>
            <AlertDescription>
              Click on any section to explore detailed compliance requirements and implementation guidance.
              Remember that compliance requirements often overlap and can be mapped to common controls.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default ComplianceMappingVisual;
