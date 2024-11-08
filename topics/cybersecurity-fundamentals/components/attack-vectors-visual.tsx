import React, { useState, useEffect } from 'react';
import { 
  Zap, Cloud, Lock, Box, Server, Database,
  Key, AlertCircle, FileCode, Git, Package,
  Shield, Terminal, Network, HardDrive, Users
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AttackVectorsVisual = () => {
  const [activeVector, setActiveVector] = useState('supply-chain');
  const [simulationStep, setSimulationStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [showTechnical, setShowTechnical] = useState(false);

  const attackVectors = {
    'supply-chain': {
      title: 'Supply Chain Attack',
      icon: Package,
      phases: [
        {
          name: 'Initial Compromise',
          description: 'Attacker compromises trusted vendor',
          technical: [
            'Infiltration of build server',
            'Code injection into CI/CD pipeline',
            'Malicious package publication'
          ],
          indicators: [
            'Modified build signatures',
            'Unusual pipeline activity',
            'New package versions'
          ]
        },
        {
          name: 'Payload Distribution',
          description: 'Compromised update pushed to customers',
          technical: [
            'Trojanized software update',
            'Modified binary signatures',
            'Backdoor insertion'
          ],
          indicators: [
            'Changed file hashes',
            'New network connections',
            'Suspicious code segments'
          ]
        },
        {
          name: 'Activation',
          description: 'Malicious code executes on target systems',
          technical: [
            'Backdoor activation',
            'C2 channel establishment',
            'Privilege escalation'
          ],
          indicators: [
            'Unusual process behavior',
            'Network beaconing',
            'New service creation'
          ]
        }
      ]
    },
    'ransomware': {
      title: 'Modern Ransomware',
      icon: Lock,
      phases: [
        {
          name: 'Initial Access',
          description: 'Attacker gains system access',
          technical: [
            'Phishing email delivery',
            'RDP brute force',
            'Exploit kit execution'
          ],
          indicators: [
            'Failed login attempts',
            'Suspicious attachments',
            'Unusual remote access'
          ]
        },
        {
          name: 'Data Exfiltration',
          description: 'Sensitive data stolen before encryption',
          technical: [
            'Local file enumeration',
            'Archive creation',
            'Encrypted transfer'
          ],
          indicators: [
            'Mass file access',
            'Large data transfers',
            'Suspicious compression'
          ]
        },
        {
          name: 'Encryption',
          description: 'Files encrypted and systems locked',
          technical: [
            'Shadow copy deletion',
            'File encryption',
            'Ransom note delivery'
          ],
          indicators: [
            'High disk activity',
            'Mass file changes',
            'System modifications'
          ]
        }
      ]
    },
    'cloud-native': {
      title: 'Cloud-Native Threats',
      icon: Cloud,
      phases: [
        {
          name: 'Resource Discovery',
          description: 'Attacker identifies cloud resources',
          technical: [
            'Public bucket enumeration',
            'API endpoint scanning',
            'Identity enumeration'
          ],
          indicators: [
            'Multiple API calls',
            'Resource listing attempts',
            'Authentication probes'
          ]
        },
        {
          name: 'Access Exploitation',
          description: 'Misconfiguration exploitation',
          technical: [
            'IAM role assumption',
            'Token theft',
            'Permission escalation'
          ],
          indicators: [
            'Unusual API patterns',
            'Cross-account access',
            'Policy modifications'
          ]
        },
        {
          name: 'Resource Abuse',
          description: 'Attacker leverages cloud resources',
          technical: [
            'Data exfiltration',
            'Compute resource abuse',
            'Service manipulation'
          ],
          indicators: [
            'Unusual data access',
            'Resource spikes',
            'Configuration changes'
          ]
        }
      ]
    }
  };

  useEffect(() => {
    let timer;
    if (isSimulating) {
      timer = setInterval(() => {
        setSimulationStep((prev) => {
          if (prev < attackVectors[activeVector].phases.length - 1) {
            return prev + 1;
          }
          setIsSimulating(false);
          return prev;
        });
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [isSimulating, activeVector]);

  const startSimulation = () => {
    setSimulationStep(0);
    setIsSimulating(true);
  };

  const AttackPhase = ({ phase, active }) => (
    <Card className={`border-2 transition-all ${
      active ? 'border-red-500 bg-red-50' : 'border-gray-200'
    }`}>
      <CardContent className="p-4">
        <h3 className="font-semibold mb-2">{phase.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{phase.description}</p>
        
        {showTechnical && (
          <div className="mt-4">
            <div className="bg-black rounded-lg p-3">
              <div className="font-mono text-sm text-green-400">
                {phase.technical.map((tech, i) => (
                  <div key={i} className="mb-1">$ {tech}</div>
                ))}
              </div>
            </div>
            <Alert className="mt-2 bg-blue-50">
              <AlertCircle className="h-4 w-4 text-blue-500" />
              <AlertDescription className="text-blue-700">
                {phase.indicators.map((indicator, i) => (
                  <div key={i}>• {indicator}</div>
                ))}
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader className="bg-gradient-to-r from-purple-900 to-purple-700 text-white">
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-6 w-6" />
            Emerging Attack Vectors - Interactive Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Attack Vector Selection */}
          <div className="flex gap-4 mb-6">
            {Object.entries(attackVectors).map(([key, vector]) => (
              <button
                key={key}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                  activeVector === key 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => setActiveVector(key)}
              >
                <vector.icon className="h-4 w-4" />
                {vector.title}
              </button>
            ))}
          </div>

          {/* Control Panel */}
          <div className="flex gap-4 mb-6">
            <button
              className={`px-4 py-2 rounded-lg ${
                isSimulating ? 'bg-red-500' : 'bg-green-500'
              } text-white hover:opacity-90`}
              onClick={startSimulation}
              disabled={isSimulating}
            >
              {isSimulating ? 'Simulation Running...' : 'Start Attack Simulation'}
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:opacity-90"
              onClick={() => setShowTechnical(!showTechnical)}
            >
              {showTechnical ? 'Hide Technical Details' : 'Show Technical Details'}
            </button>
          </div>

          {/* Attack Phase Visualization */}
          <div className="grid grid-cols-3 gap-6">
            {attackVectors[activeVector].phases.map((phase, index) => (
              <AttackPhase
                key={index}
                phase={phase}
                active={index <= simulationStep}
              />
            ))}
          </div>

          {/* Defense Recommendations */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <Card className="p-4 border-green-500">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                Prevention
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Vendor assessment</li>
                <li>• Code signing</li>
                <li>• Access controls</li>
              </ul>
            </Card>
            <Card className="p-4 border-blue-500">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Terminal className="h-4 w-4 text-blue-500" />
                Detection
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Behavior monitoring</li>
                <li>• File integrity checks</li>
                <li>• Network analysis</li>
              </ul>
            </Card>
            <Card className="p-4 border-orange-500">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Network className="h-4 w-4 text-orange-500" />
                Response
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Incident playbooks</li>
                <li>• System isolation</li>
                <li>• Evidence collection</li>
              </ul>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttackVectorsVisual;
