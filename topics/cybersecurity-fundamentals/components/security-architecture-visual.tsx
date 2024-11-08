import React, { useState } from 'react';
import { 
  Layout, Lock, Shield, Network, Key, 
  LockKeyhole, FileKey, KeyRound, Fingerprint,
  WallOff, Users, ShieldAlert, Layers
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';

// 1. Security Models Component
const SecurityModelsSection = () => {
  const [activeModel, setActiveModel] = useState(null);
  
  const models = [
    {
      name: 'Bell-LaPadula',
      icon: <Lock className="w-6 h-6 text-blue-500" />,
      description: 'Confidentiality Model',
      rules: [
        'No Read Up: Users cannot read data above their security level',
        'No Write Down: Users cannot write data to lower security levels',
        'Used in: Military systems, Government classifications'
      ]
    },
    {
      name: 'Biba',
      icon: <Shield className="w-6 h-6 text-green-500" />,
      description: 'Integrity Model',
      rules: [
        'No Read Down: Users cannot read data below their integrity level',
        'No Write Up: Users cannot write data to higher integrity levels',
        'Focus: Preventing data corruption'
      ]
    },
    {
      name: 'Clark-Wilson',
      icon: <Network className="w-6 h-6 text-purple-500" />,
      description: 'Transaction Integrity Model',
      rules: [
        'Well-formed transactions maintain data integrity',
        'Separation of duties between users',
        'Audit logs for all transactions'
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {models.map((model) => (
        <Card 
          key={model.name}
          className={`cursor-pointer transition-all duration-200 ${
            activeModel === model.name ? 'ring-2 ring-blue-500' : ''
          }`}
          onClick={() => setActiveModel(activeModel === model.name ? null : model.name)}
        >
          <CardHeader className="flex flex-row items-center space-x-2">
            {model.icon}
            <div>
              <CardTitle className="text-lg">{model.name}</CardTitle>
              <CardDescription>{model.description}</CardDescription>
            </div>
          </CardHeader>
          {activeModel === model.name && (
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                {model.rules.map((rule, idx) => (
                  <li key={idx} className="text-sm">{rule}</li>
                ))}
              </ul>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
};

// 2. Cryptography Component
const CryptographySection = () => {
  const [activeTab, setActiveTab] = useState('symmetric');

  const cryptoTypes = {
    symmetric: {
      icon: <LockKeyhole className="w-6 h-6 text-indigo-500" />,
      title: 'Symmetric Encryption',
      description: 'Uses the same key for encryption and decryption',
      examples: ['AES', 'DES', '3DES'],
      pros: ['Fast', 'Efficient for large data'],
      cons: ['Key distribution challenges', 'Scalability issues']
    },
    asymmetric: {
      icon: <KeyRound className="w-6 h-6 text-green-500" />,
      title: 'Asymmetric Encryption',
      description: 'Uses public-private key pairs',
      examples: ['RSA', 'ECC', 'Diffie-Hellman'],
      pros: ['Secure key exchange', 'Digital signatures'],
      cons: ['Slower', 'Resource intensive']
    },
    hashing: {
      icon: <FileKey className="w-6 h-6 text-orange-500" />,
      title: 'Hashing',
      description: 'One-way function for data integrity',
      examples: ['SHA-256', 'SHA-3', 'Blake2'],
      pros: ['Data integrity verification', 'Password storage'],
      cons: ['No decryption possible', 'Collision risks']
    }
  };

  return (
    <Tabs defaultValue="symmetric" className="w-full">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="symmetric">Symmetric</TabsTrigger>
        <TabsTrigger value="asymmetric">Asymmetric</TabsTrigger>
        <TabsTrigger value="hashing">Hashing</TabsTrigger>
      </TabsList>
      
      {Object.entries(cryptoTypes).map(([key, data]) => (
        <TabsContent key={key} value={key}>
          <Card>
            <CardHeader className="flex flex-row items-center space-x-2">
              {data.icon}
              <div>
                <CardTitle>{data.title}</CardTitle>
                <CardDescription>{data.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Examples</h4>
                  <ul className="list-disc list-inside">
                    {data.examples.map((ex, idx) => (
                      <li key={idx}>{ex}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Advantages</h4>
                  <ul className="list-disc list-inside">
                    {data.pros.map((pro, idx) => (
                      <li key={idx}>{pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Disadvantages</h4>
                  <ul className="list-disc list-inside">
                    {data.cons.map((con, idx) => (
                      <li key={idx}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
};

// 3. Secure Architecture Component
const SecureArchitectureSection = () => {
  const [activePrinciple, setActivePrinciple] = useState(null);

  const principles = [
    {
      name: 'Defense in Depth',
      icon: <Layers className="w-6 h-6 text-blue-500" />,
      description: 'Multiple layers of security controls',
      examples: [
        'Network segmentation',
        'Access controls',
        'Encryption',
        'Physical security'
      ]
    },
    {
      name: 'Segregation of Duties',
      icon: <Users className="w-6 h-6 text-green-500" />,
      description: 'Split critical tasks between multiple users',
      examples: [
        'Approval workflows',
        'Role-based access',
        'Two-person control',
        'Administrator separation'
      ]
    },
    {
      name: 'Zero Trust',
      icon: <ShieldAlert className="w-6 h-6 text-red-500" />,
      description: 'Never trust, always verify',
      examples: [
        'Continuous authentication',
        'Micro-segmentation',
        'Least privilege access',
        'Identity-based security'
      ]
    }
  ];

  return (
    <div className="space-y-4">
      {principles.map((principle) => (
        <Card 
          key={principle.name}
          className="cursor-pointer hover:shadow-md transition-all"
          onClick={() => setActivePrinciple(activePrinciple === principle.name ? null : principle.name)}
        >
          <CardHeader className="flex flex-row items-center space-x-2">
            {principle.icon}
            <div>
              <CardTitle>{principle.name}</CardTitle>
              <CardDescription>{principle.description}</CardDescription>
            </div>
          </CardHeader>
          {activePrinciple === principle.name && (
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Implementation Examples:</h4>
                  <ul className="list-disc list-inside">
                    {principle.examples.map((example, idx) => (
                      <li key={idx}>{example}</li>
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
const SecurityArchitectureVisual = () => {
  return (
    <div className="w-full max-w-4xl p-4 space-y-8">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Layout className="w-6 h-6" />
            <CardTitle>Security Architecture and Engineering</CardTitle>
          </div>
          <CardDescription>
            Interactive visualization of core security concepts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <Tabs defaultValue="models">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="models">Security Models</TabsTrigger>
              <TabsTrigger value="crypto">Cryptography</TabsTrigger>
              <TabsTrigger value="architecture">Secure Architecture</TabsTrigger>
            </TabsList>
            
            <TabsContent value="models">
              <SecurityModelsSection />
            </TabsContent>
            
            <TabsContent value="crypto">
              <CryptographySection />
            </TabsContent>
            
            <TabsContent value="architecture">
              <SecureArchitectureSection />
            </TabsContent>
          </Tabs>

          <Alert>
            <AlertDescription>
              Click on any card to explore more details about each security concept. 
              The visualization is designed to help you understand the relationships between different security principles.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityArchitectureVisual;