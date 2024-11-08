import React, { useState, useEffect } from 'react';
import { History, AlertCircle, HardDrive, Shield, Zap, Server, ArrowRight, RefreshCw, Lock, Database, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const NFSv2Visual = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [simulationState, setSimulationState] = useState('idle');
  const [writeProgress, setWriteProgress] = useState(0);
  const [currentFileSize, setCurrentFileSize] = useState(0);
  const [showError, setShowError] = useState(false);
  const [activeSimulation, setActiveSimulation] = useState(null);

  // Simulated file transfer animation
  const simulateFileTransfer = () => {
    setSimulationState('transferring');
    setWriteProgress(0);
    setShowError(false);

    const interval = setInterval(() => {
      setWriteProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setSimulationState('complete');
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  // File size simulation
  const simulateFileSizeOperation = (size) => {
    setCurrentFileSize(size);
    setShowError(size > 2);
  };

  // Network operation simulation
  const NetworkOperation = ({ type, progress }) => (
    <div className="relative w-full h-12 bg-gray-100 rounded-lg overflow-hidden">
      <div 
        className={`absolute h-full transition-all duration-500 ${
          type === 'write' ? 'bg-blue-500' : 'bg-green-500'
        }`}
        style={{ width: `${progress}%` }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-sm">
        {type === 'write' ? 'Writing' : 'Reading'} {progress.toFixed(0)}%
      </div>
    </div>
  );

  // Security visualization component
  const SecurityVisual = () => {
    const [selectedPermission, setSelectedPermission] = useState(null);
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          {['user', 'group', 'other'].map(type => (
            <div 
              key={type}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                selectedPermission === type ? 'bg-blue-100 ring-2 ring-blue-500' : 'bg-gray-100'
              }`}
              onClick={() => setSelectedPermission(type)}
            >
              <div className="font-bold capitalize">{type}</div>
              <div className="grid grid-cols-3 gap-1 mt-2">
                {['r', 'w', 'x'].map(perm => (
                  <span 
                    key={perm}
                    className={`text-center p-1 rounded ${
                      type === 'user' ? 'bg-green-100' :
                      type === 'group' ? 'bg-yellow-100' : 'bg-red-100'
                    }`}
                  >
                    {perm}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        {selectedPermission && (
          <Alert>
            <AlertDescription>
              NFSv2 {selectedPermission} permissions are basic Unix-style permissions, 
              lacking modern features like ACLs or extended attributes.
            </AlertDescription>
          </Alert>
        )}
      </div>
    );
  };

  // Protocol simulation component
  const ProtocolSimulation = () => {
    const [step, setStep] = useState(0);
    const steps = [
      { title: 'Client Request', icon: <Server className="w-6 h-6" /> },
      { title: 'Server Processing', icon: <RefreshCw className="w-6 h-6" /> },
      { title: 'Disk Write', icon: <Database className="w-6 h-6" /> },
      { title: 'Confirmation', icon: <Lock className="w-6 h-6" /> }
    ];

    useEffect(() => {
      if (activeSimulation === 'protocol' && step < steps.length) {
        const timer = setTimeout(() => setStep(s => s + 1), 1500);
        return () => clearTimeout(timer);
      }
    }, [step, activeSimulation]);

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`p-3 rounded-full ${
                step >= i ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {s.icon}
              </div>
              <span className="text-sm mt-2">{s.title}</span>
            </div>
          ))}
        </div>
        <button
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
          onClick={() => {
            setStep(0);
            setActiveSimulation('protocol');
          }}
          disabled={activeSimulation === 'protocol' && step < steps.length}
        >
          Simulate Protocol Flow
        </button>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <div className="flex items-center gap-2">
          <History className="w-6 h-6" />
          <CardTitle>NFS Version 2 Fundamentals</CardTitle>
        </div>
        <CardDescription>
          Interactive exploration of NFSv2's core features, limitations, and protocols
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid grid-cols-4 gap-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="filesize">File Size Limits</TabsTrigger>
            <TabsTrigger value="write">Write Operations</TabsTrigger>
            <TabsTrigger value="security">Security Model</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Alert>
                    <AlertCircle className="w-4 h-4" />
                    <AlertDescription>
                      NFSv2 introduced fundamental network file sharing concepts but has significant limitations.
                      Explore each tab to understand specific features and constraints.
                    </AlertDescription>
                  </Alert>
                  <ProtocolSimulation />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="filesize">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="relative h-32 w-full bg-gray-100 rounded-lg overflow-hidden">
                  <div 
                    className={`absolute h-full transition-all duration-500 ${
                      showError ? 'bg-red-200' : 'bg-blue-200'
                    }`}
                    style={{ width: `${Math.min(currentFileSize / 4 * 100, 100)}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono">
                      Current file size: {currentFileSize}GB 
                      {showError && ' (Exceeds 2GB limit!)'}
                    </span>
                  </div>
                </div>
                <div className="flex gap-4">
                  {[1, 2, 3, 4].map(size => (
                    <button
                      key={size}
                      className={`flex-1 p-2 rounded ${
                        size > 2 ? 'bg-red-100 hover:bg-red-200' : 'bg-blue-100 hover:bg-blue-200'
                      }`}
                      onClick={() => simulateFileSizeOperation(size)}
                    >
                      {size}GB File
                    </button>
                  ))}
                </div>
                {showError && (
                  <Alert variant="destructive">
                    <AlertTriangle className="w-4 h-4" />
                    <AlertDescription>
                      NFSv2 cannot handle files larger than 2GB due to 32-bit offset limitations.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="write">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">Write Operation (8KB chunks)</h3>
                    <NetworkOperation type="write" progress={writeProgress} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">Server Disk Status</h3>
                    <div className="h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      {simulationState === 'idle' && 'Ready'}
                      {simulationState === 'transferring' && 'Writing to disk...'}
                      {simulationState === 'complete' && 'Write complete!'}
                    </div>
                  </div>
                </div>
                <button
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
                  onClick={simulateFileTransfer}
                  disabled={simulationState === 'transferring'}
                >
                  Simulate Write Operation
                </button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardContent className="p-6">
                <SecurityVisual />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NFSv2Visual;
