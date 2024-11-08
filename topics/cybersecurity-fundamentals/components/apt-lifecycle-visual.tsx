import React, { useState, useEffect } from 'react';
import { 
  Sword, Shield, Eye, Lock, Network, Database, 
  AlertCircle, Terminal, Server, Mail, 
  Download, Laptop, UserCheck, FolderOpen,
  HardDrive, Cable, Upload
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const APTAttackSimulation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLogs, setShowLogs] = useState(false);
  const [detectionPoints, setDetectionPoints] = useState([]);

  const attackSteps = [
    {
      phase: 'Initial Access',
      icon: Mail,
      action: 'Spear-phishing email delivered to finance department',
      technical: 'Email contains malicious XLS file with macro',
      logs: [
        'SMTP: Inbound email from external-domain.com',
        'File: XLS attachment detected - quarterly_report.xls',
        'Macro: VBA code execution attempted'
      ],
      detection: 'Email security flagged suspicious macro'
    },
    {
      phase: 'Execution',
      icon: Download,
      action: 'Malicious macro executes and downloads stage 2 payload',
      technical: 'PowerShell download cradle fetches encrypted payload',
      logs: [
        'Process: EXCEL.EXE spawned PowerShell.exe',
        'Network: PowerShell connection to 192.0.2.100:443',
        'File: Binary dropped to %TEMP%\\svc.dll'
      ],
      detection: 'EDR detected suspicious PowerShell activity'
    },
    {
      phase: 'Persistence',
      icon: HardDrive,
      action: 'Malware establishes persistence via scheduled task',
      technical: 'Creates scheduled task for system DLL hijacking',
      logs: [
        'Schtasks.exe: New task created "SystemServices"',
        'File: DLL placed in system32 directory',
        'Registry: New service key created'
      ],
      detection: 'SIEM alerted on suspicious scheduled task'
    },
    {
      phase: 'Privilege Escalation',
      icon: UserCheck,
      action: 'Exploits local vulnerability to gain SYSTEM access',
      technical: 'Uses named pipe impersonation for privilege elevation',
      logs: [
        'Process: Service running as SYSTEM',
        'Security: Token manipulation detected',
        'Process: New admin process created'
      ],
      detection: 'Behavioral analytics flagged privilege escalation'
    },
    {
      phase: 'Lateral Movement',
      icon: Network,
      action: 'Spreads across network using stolen credentials',
      technical: 'Pass-the-hash attack with harvested NTLM hashes',
      logs: [
        'Network: SMB connections to multiple hosts',
        'Auth: Multiple failed login attempts',
        'Process: PsExec execution detected'
      ],
      detection: 'Network monitoring detected unusual SMB traffic'
    },
    {
      phase: 'Data Collection',
      icon: FolderOpen,
      action: 'Identifies and collects sensitive data',
      technical: 'Automated scanning for specific file types and content',
      logs: [
        'File: Mass file access detected',
        'Process: Archive creation activity',
        'Network: Internal database queries'
      ],
      detection: 'DLP detected unusual file access patterns'
    },
    {
      phase: 'Exfiltration',
      icon: Upload,
      action: 'Data exfiltrated via encrypted channel',
      technical: 'Custom protocol tunneled through HTTPS',
      logs: [
        'Network: Large outbound HTTPS transfer',
        'DNS: Unusual domain resolution pattern',
        'Traffic: Encrypted data bursts detected'
      ],
      detection: 'Network monitoring flagged suspicious data transfer'
    }
  ];

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < attackSteps.length - 1) {
            setDetectionPoints(points => [...points, prev]);
            return prev + 1;
          }
          setIsPlaying(false);
          return prev;
        });
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const resetSimulation = () => {
    setCurrentStep(0);
    setDetectionPoints([]);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader className="bg-gradient-to-r from-red-900 to-red-700 text-white">
          <CardTitle className="flex items-center gap-2">
            <Sword className="h-6 w-6" />
            APT Attack Simulation - Active Breach Scenario
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Control Panel */}
          <div className="flex gap-4 mb-6">
            <button
              className={`px-4 py-2 rounded-lg ${
                isPlaying ? 'bg-red-500' : 'bg-green-500'
              } text-white hover:opacity-90`}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? 'Pause Simulation' : 'Start Attack'}
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:opacity-90"
              onClick={resetSimulation}
            >
              Reset
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:opacity-90"
              onClick={() => setShowLogs(!showLogs)}
            >
              {showLogs ? 'Hide Logs' : 'Show Logs'}
            </button>
          </div>

          {/* Attack Timeline */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              {attackSteps.map((step, index) => (
                <div
                  key={index}
                  className={`relative flex-1 ${
                    index < attackSteps.length - 1 ? 'border-t-2' : ''
                  } ${
                    index <= currentStep ? 'border-red-500' : 'border-gray-200'
                  }`}
                >
                  <div
                    className={`absolute -top-3 left-1/2 transform -translate-x-1/2 
                    w-6 h-6 rounded-full flex items-center justify-center
                    ${
                      index <= currentStep ? 'bg-red-500' : 'bg-gray-200'
                    }`}
                  >
                    <step.icon className="h-4 w-4 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Attack Details */}
          {currentStep < attackSteps.length && (
            <Card className="mb-6 border-red-500">
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">
                  {attackSteps[currentStep].phase}
                </h3>
                <p className="text-gray-600 mb-2">
                  {attackSteps[currentStep].action}
                </p>
                <p className="text-sm text-gray-500">
                  {attackSteps[currentStep].technical}
                </p>
                
                {showLogs && (
                  <div className="mt-4 bg-black rounded-lg p-4">
                    <div className="font-mono text-sm text-green-400">
                      {attackSteps[currentStep].logs.map((log, index) => (
                        <div key={index} className="mb-1">
                          {`[${new Date().toISOString()}] ${log}`}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {detectionPoints.includes(currentStep) && (
                  <Alert className="mt-4 bg-yellow-50 border-yellow-500">
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                    <AlertDescription className="text-yellow-700">
                      Detection Point: {attackSteps[currentStep].detection}
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}

          {/* Defense Status */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 border-orange-500">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Terminal className="h-4 w-4" />
                EDR Status
              </h4>
              <p className="text-sm text-orange-600">
                Multiple alerts triggered
              </p>
            </Card>
            <Card className="p-4 border-purple-500">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Network className="h-4 w-4" />
                Network Security
              </h4>
              <p className="text-sm text-purple-600">
                Suspicious traffic detected
              </p>
            </Card>
            <Card className="p-4 border-blue-500">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Server className="h-4 w-4" />
                SIEM
              </h4>
              <p className="text-sm text-blue-600">
                Correlation rules matching
              </p>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default APTAttackSimulation;
