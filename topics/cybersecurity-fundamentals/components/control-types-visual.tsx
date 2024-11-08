import React, { useState } from 'react';
import { 
  Shield, FileText, Cpu, Building,
  Lock, Camera, AlertTriangle, RefreshCw,
  Eye, UserCheck, Settings, CheckCircle,
  Film, Fingerprint, Thermometer, Users
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Administrative Controls Component
const AdministrativeControls = () => {
  const [activeControl, setActiveControl] = useState(null);

  const controls = [
    {
      name: 'Security Policies',
      icon: <FileText className="w-6 h-6 text-blue-500" />,
      description: 'Formal documentation of security requirements',
      components: [
        'Acceptable Use Policy',
        'Information Classification',
        'Access Control Policy',
        'Incident Response Plan'
      ],
      implementation: [
        'Document clear requirements',
        'Get management approval',
        'Distribute to all staff',
        'Regular review and updates'
      ]
    },
    {
      name: 'Procedures',
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      description: 'Step-by-step guidance for security processes',
      components: [
        'Password Management',
        'Data Backup Procedures',
        'Incident Handling Steps',
        'Change Management Process'
      ],
      implementation: [
        'Create detailed workflows',
        'Train relevant staff',
        'Document exceptions',
        'Regular testing'
      ]
    },
    {
      name: 'Training',
      icon: <Users className="w-6 h-6 text-purple-500" />,
      description: 'Security awareness and skill development',
      components: [
        'Security Awareness',
        'Role-specific Training',
        'Compliance Training',
        'Incident Response Drills'
      ],
      implementation: [
        'Develop training materials',
        'Schedule regular sessions',
        'Track completion',
        'Assess effectiveness'
      ]
    }
  ];

  return (
    <div className="space-y-4">
      {controls.map((control) => (
        <Card 
          key={control.name}
          className={`cursor-pointer transition-all ${
            activeControl === control.name ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => setActiveControl(activeControl === control.name ? null : control.name)}
        >
          <CardHeader className="flex flex-row items-center space-x-2">
            {control.icon}
            <div>
              <CardTitle className="text-lg">{control.name}</CardTitle>
              <CardDescription>{control.description}</CardDescription>
            </div>
          </CardHeader>
          {activeControl === control.name && (
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Key Components</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {control.components.map((component, idx) => (
                      <li key={idx} className="text-sm">{component}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Implementation Steps</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {control.implementation.map((step, idx) => (
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

// Technical Controls Component
const TechnicalControls = () => {
  const [selectedCategory, setSelectedCategory] = useState('preventive');

  const controlCategories = {
    preventive: {
      title: 'Preventive Controls',
      icon: <Lock className="w-6 h-6 text-blue-500" />,
      description: 'Stop security incidents before they occur',
      examples: [
        'Firewalls',
        'Access Control Lists',
        'Encryption',
        'Authentication Systems'
      ],
      benefits: [
        'Proactive protection',
        'Reduce attack surface',
        'Enforce security policies',
        'Prevent unauthorized access'
      ]
    },
    detective: {
      title: 'Detective Controls',
      icon: <Eye className="w-6 h-6 text-yellow-500" />,
      description: 'Identify and alert on security incidents',
      examples: [
        'IDS/IPS Systems',
        'SIEM Solutions',
        'Log Monitoring',
        'File Integrity Monitoring'
      ],
      benefits: [
        'Early detection',
        'Incident validation',
        'Audit capabilities',
        'Compliance monitoring'
      ]
    },
    corrective: {
      title: 'Corrective Controls',
      icon: <RefreshCw className="w-6 h-6 text-green-500" />,
      description: 'Restore systems after an incident',
      examples: [
        'Backup Systems',
        'Patch Management',
        'Disaster Recovery',
        'Incident Response'
      ],
      benefits: [
        'Minimize damage',
        'Restore operations',
        'Improve resilience',
        'Learn from incidents'
      ]
    },
    compensating: {
      title: 'Compensating Controls',
      icon: <Shield className="w-6 h-6 text-purple-500" />,
      description: 'Alternative controls when primary ones aren\'t feasible',
      examples: [
        'Network Segmentation',
        'Enhanced Monitoring',
        'Additional Authentication',
        'Manual Reviews'
      ],
      benefits: [
        'Risk mitigation',
        'Regulatory compliance',
        'Cost-effective alternatives',
        'Operational flexibility'
      ]
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Technical Control Categories</CardTitle>
        <CardDescription>Different types of technical security controls</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="preventive">Preventive</TabsTrigger>
            <TabsTrigger value="detective">Detective</TabsTrigger>
            <TabsTrigger value="corrective">Corrective</TabsTrigger>
            <TabsTrigger value="compensating">Compensating</TabsTrigger>
          </TabsList>
          
          {Object.entries(controlCategories).map(([key, category]) => (
            <TabsContent key={key} value={key}>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  {category.icon}
                  <h3 className="font-medium">{category.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{category.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Examples</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {category.examples.map((example, idx) => (
                        <li key={idx} className="text-sm">{example}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Benefits</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {category.benefits.map((benefit, idx) => (
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

// Physical Controls Component
const PhysicalControls = () => {
  const [activeControl, setActiveControl] = useState(null);

  const physicalControls = [
    {
      name: 'Access Control Systems',
      icon: <Fingerprint className="w-6 h-6 text-blue-500" />,
      description: 'Control physical access to facilities',
      components: [
        'Card Readers',
        'Biometric Systems',
        'Mantraps',
        'Security Guards'
      ],
      considerations: [
        'Cost of implementation',
        'User convenience',
        'Maintenance requirements',
        'Integration capabilities'
      ]
    },
    {
      name: 'Surveillance',
      icon: <Camera className="w-6 h-6 text-green-500" />,
      description: 'Monitor and record facility activities',
      components: [
        'CCTV Systems',
        'Motion Sensors',
        'Security Cameras',
        'Recording Systems'
      ],
      considerations: [
        'Coverage areas',
        'Storage capacity',
        'Privacy concerns',
        'Monitoring procedures'
      ]
    },
    {
      name: 'Environmental Controls',
      icon: <Thermometer className="w-6 h-6 text-red-500" />,
      description: 'Protect against environmental threats',
      components: [
        'Fire Suppression',
        'HVAC Systems',
        'Water Detection',
        'Power Management'
      ],
      considerations: [
        'Regulatory requirements',
        'Equipment specifications',
        'Maintenance schedules',
        'Emergency procedures'
      ]
    }
  ];

  return (
    <div className="space-y-4">
      {physicalControls.map((control) => (
        <Card 
          key={control.name}
          className={`cursor-pointer transition-all ${
            activeControl === control.name ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => setActiveControl(activeControl === control.name ? null : control.name)}
        >
          <CardHeader className="flex flex-row items-center space-x-2">
            {control.icon}
            <div>
              <CardTitle className="text-lg">{control.name}</CardTitle>
              <CardDescription>{control.description}</CardDescription>
            </div>
          </CardHeader>
          {activeControl === control.name && (
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Key Components</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {control.components.map((component, idx) => (
                      <li key={idx} className="text-sm">{component}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Implementation Considerations</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {control.considerations.map((consideration, idx) => (
                      <li key={idx} className="text-sm">{consideration}</li>
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
const ControlTypesVisual = () => {
  return (
    <div className="w-full max-w-4xl p-4 space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6" />
            <CardTitle>Security Control Categories</CardTitle>
          </div>
          <CardDescription>
            Comprehensive overview of security control types and implementation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <Tabs defaultValue="administrative">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="administrative">Administrative</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="physical">Physical</TabsTrigger>
            </TabsList>
            
            <TabsContent value="administrative">
              <AdministrativeControls />
            </TabsContent>
            
            <TabsContent value="technical">
              <TechnicalControls />
            </TabsContent>
            
            <TabsContent value="physical">
              <PhysicalControls />
            </TabsContent>
          </Tabs>

          <Alert>
            <AlertDescription>
              Click on any control category to explore detailed implementation guidance and best practices.
              Effective security requires a balanced implementation of all control types.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default ControlTypesVisual;
