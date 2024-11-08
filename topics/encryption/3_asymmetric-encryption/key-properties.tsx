import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Key, Lock, Shield, Fingerprint, Scale, AlertTriangle, Globe, CreditCard, Mail, Check } from 'lucide-react';

const KeyProperty = ({ title, description, icon: Icon, example, isActive, onDemo }) => (
  <Card className={`transition-all duration-500 h-auto ${
    isActive ? 'border-blue-500 shadow-lg' : 'hover:border-gray-300'
  }`}>
    <CardContent className="p-3">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-full transition-colors duration-300 ${
          isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
        }`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 space-y-2">
          <div>
            <h3 className="font-semibold text-base mb-1">{title}</h3>
            <p className="text-sm text-gray-600 leading-snug">{description}</p>
          </div>
          
          {isActive && (
            <div className="bg-gray-50 rounded-lg p-3 text-sm">
              <h4 className="font-medium mb-1">Real-World Example:</h4>
              <p className="text-gray-600">{example}</p>
            </div>
          )}
          
          <Button 
            variant={isActive ? "default" : "outline"} 
            size="sm"
            onClick={onDemo}
            className="mt-2"
          >
            {isActive ? 'Hide Demo' : 'Show Demo'}
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

const BruteForceVisual = ({ isActive }) => {
  const [attempts, setAttempts] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentOperation, setCurrentOperation] = useState(0);
  
  const operations = [
    'Testing prime factors...',
    'Analyzing key patterns...',
    'Attempting decryption...',
    'Checking key variants...'
  ];

  useEffect(() => {
    if (isActive && !isRunning) {
      setIsRunning(true);
      const attemptInterval = setInterval(() => {
        setAttempts(a => (a + Math.floor(Math.random() * 1000000)));
      }, 100);
      
      const operationInterval = setInterval(() => {
        setCurrentOperation(c => (c + 1) % operations.length);
      }, 2000);

      return () => {
        clearInterval(attemptInterval);
        clearInterval(operationInterval);
      };
    } else if (!isActive) {
      setIsRunning(false);
      setAttempts(0);
    }
  }, [isActive]);

  return (
    <div className="bg-gray-900 p-6 rounded-lg text-white font-mono text-sm space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Current Operation:</span>
          <span className="text-blue-400">{operations[currentOperation]}</span>
        </div>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ 
              width: `${((currentOperation + 1) / operations.length) * 100}%`,
              animation: 'pulse 2s infinite'
            }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span>Attempts:</span>
        <span className="text-green-400">{attempts.toLocaleString()}</span>
      </div>

      <div className="flex gap-2 items-center text-red-400">
        <AlertTriangle className="w-4 h-4 animate-pulse" />
        <span className="flex-1">Estimated completion time:</span>
        <span>2.3 x 10^52 years</span>
      </div>
    </div>
  );
};

const KeyPairVisual = ({ isActive }) => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setAnimationStep(s => (s + 1) % 4);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isActive]);

  return (
    <div className="relative h-48 p-4">
      <div className={`absolute left-1/4 transform -translate-x-1/2 transition-all duration-1000 ${
        isActive ? `${animationStep === 1 ? 'scale-110' : 'scale-100'} top-0` : 'top-20'
      }`}>
        <div className="flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full">
          <Key className="w-10 h-10 text-blue-600" />
        </div>
        <div className="text-center mt-2 text-sm font-medium">Public Key</div>
      </div>

      <div className={`absolute right-1/4 transform translate-x-1/2 transition-all duration-1000 ${
        isActive ? `${animationStep === 2 ? 'scale-110' : 'scale-100'} top-0` : 'top-20'
      }`}>
        <div className="flex items-center justify-center w-24 h-24 bg-amber-100 rounded-full">
          <Key className="w-10 h-10 text-amber-600" />
        </div>
        <div className="text-center mt-2 text-sm font-medium">Private Key</div>
      </div>

      <svg 
        className={`absolute left-1/2 transform -translate-x-1/2 top-20 transition-opacity duration-500 ${
          isActive ? 'opacity-100' : 'opacity-0'
        }`} 
        width="240" 
        height="40"
      >
        <path
          d="M 20,20 C 70,20 170,20 220,20"
          stroke={animationStep === 3 ? '#3B82F6' : '#CBD5E1'}
          strokeWidth="3"
          fill="none"
          strokeDasharray="6 6"
        >
          <animate 
            attributeName="stroke-dashoffset" 
            values="24;0" 
            dur="2s" 
            repeatCount="indefinite"
          />
        </path>
      </svg>

      <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center transition-opacity duration-500 ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="text-sm text-gray-600 bg-gray-100 rounded-lg p-2">
          One-way mathematical relationship
        </div>
      </div>
    </div>
  );
};

const UniqueIdentityVisual = ({ isActive }) => {
  const [identities] = useState([
    { id: 1, name: 'Alice', color: 'bg-blue-100' },
    { id: 2, name: 'Bob', color: 'bg-green-100' },
    { id: 3, name: 'Carol', color: 'bg-purple-100' }
  ]);

  return (
    <div className="space-y-4">
      {identities.map(identity => (
        <div 
          key={identity.id}
          className={`flex items-center gap-4 p-3 rounded-lg ${identity.color} transition-transform duration-300 ${
            isActive ? 'hover:scale-105' : ''
          }`}
        >
          <Fingerprint className="w-5 h-5" />
          <div className="flex-1">{identity.name}</div>
          <div className="font-mono text-xs">
            {`${identity.id}f8a9...${identity.id}b23`}
          </div>
        </div>
      ))}
    </div>
  );
};

const KeyLengthVisual = ({ isActive }) => {
  const lengths = [128, 256, 512, 1024, 2048, 4096];
  const [selectedLength, setSelectedLength] = useState(2048);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        {lengths.map(length => (
          <Button
            key={length}
            variant={selectedLength === length ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedLength(length)}
            className={`transition-transform duration-300 ${
              isActive && selectedLength === length ? 'scale-110' : ''
            }`}
          >
            {length}
          </Button>
        ))}
      </div>
      <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-green-500 transition-all duration-500"
          style={{ width: `${(selectedLength/4096)*100}%` }}
        />
      </div>
      <div className="text-sm text-gray-600">
        Security Level: {selectedLength >= 2048 ? 'Strong' : selectedLength >= 1024 ? 'Moderate' : 'Weak'}
      </div>
    </div>
  );
};

const KeyPropertiesDemo = () => {
  const [activeProperty, setActiveProperty] = useState(null);
  
  const properties = [
    {
      id: 'computational',
      title: 'Computational Infeasibility',
      description: 'Deriving the private key from the public key would take billions of years, even with supercomputers.',
      example: 'HTTPS websites use this property to ensure that even if attackers intercept encrypted traffic, they cannot derive the private key to decrypt sensitive data like passwords or credit card information.',
      icon: Shield,
      demo: BruteForceVisual
    },
    {
      id: 'asymmetric',
      title: 'Mathematical Relationship',
      description: 'Public and private keys are mathematically linked but cannot be derived from each other.',
      example: 'Digital signatures in email systems like Gmail use this property. The sender signs with their private key, and recipients can verify with the public key, but cannot create new signatures.',
      icon: Lock,
      demo: KeyPairVisual
    },
    {
      id: 'unique',
      title: 'Unique Identity',
      description: 'Each key pair is uniquely tied to an identity and cannot be reused.',
      example: 'SSL/TLS certificates for websites use unique key pairs. Amazon.com cannot use Google.com\'s certificate because each domain requires its own unique key pair.',
      icon: Fingerprint,
      demo: UniqueIdentityVisual
    },
    {
      id: 'length',
      title: 'Key Length Security',
      description: 'Longer key lengths provide exponentially more security against brute force attacks.',
      example: 'Bitcoin wallets use 256-bit keys because cryptocurrency security requires protection against powerful attackers. A longer key length ensures the wallet remains secure.',
      icon: Scale,
      demo: KeyLengthVisual
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-3">
      <Card className="border-none shadow-lg">
        <CardHeader className="space-y-2 p-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Key className="w-5 h-5" />
            Key Properties of Public Key Cryptography
          </CardTitle>
          <CardDescription className="text-sm">
            Understanding the fundamental properties that make public key cryptography secure and practical
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3">
          <div className="grid sm:grid-cols-2 gap-3">
            {properties.map(prop => (
              <KeyProperty
                key={prop.id}
                {...prop}
                isActive={activeProperty === prop.id}
                onDemo={() => setActiveProperty(activeProperty === prop.id ? null : prop.id)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Demo Visualization Area */}
      {activeProperty && (
        <Card className="overflow-hidden border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Interactive Demonstration</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="h-48">
              {properties.map(prop => (
                <div
                  key={prop.id}
                  className={`transition-all duration-500 ${
                    activeProperty === prop.id ? 'opacity-100' : 'opacity-0 hidden'
                  }`}
                >
                  <prop.demo isActive={activeProperty === prop.id} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default KeyPropertiesDemo;