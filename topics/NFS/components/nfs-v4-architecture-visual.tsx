import React, { useState, useEffect, useCallback } from 'react';
import { Network, Lock, Server, Database, Layers, RefreshCw, Shield, ArrowRight, FileText, Settings, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const NFSv4Architecture = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [clientState, setClientState] = useState({
    connected: true,
    delegation: false,
    leaseTime: 60,
    activeOperations: []
  });
  const [securityState, setSecurityState] = useState({
    authMethod: 'kerberos',
    encrypted: true,
    permissions: []
  });

  // Stateful Operation Demo Component
  const StatefulOperationDemo = () => {
    const [files, setFiles] = useState([
      { id: 1, name: 'document.txt', delegated: false, locked: false },
      { id: 2, name: 'shared.doc', delegated: false, locked: false },
      { id: 3, name: 'config.xml', delegated: false, locked: false }
    ]);

    const toggleDelegation = (fileId) => {
      setFiles(files.map(file => 
        file.id === fileId 
          ? { ...file, delegated: !file.delegated }
          : file
      ));
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Client State</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Connection:</span>
                <span className={`px-2 py-1 rounded ${clientState.connected ? 'bg-green-100' : 'bg-red-100'}`}>
                  {clientState.connected ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Lease Time:</span>
                <span>{clientState.leaseTime}s</span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Delegations</h3>
            <div className="space-y-2">
              {files.map(file => (
                <div key={file.id} className="flex items-center justify-between">
                  <span>{file.name}</span>
                  <button
                    className={`px-2 py-1 rounded ${
                      file.delegated ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => toggleDelegation(file.id)}
                  >
                    {file.delegated ? 'Delegated' : 'Request'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Integrated Services Demo
  const IntegratedServicesDemo = () => {
    const [activeServices, setActiveServices] = useState([]);
    const services = ['mount', 'lock', 'acl', 'main'];

    const toggleService = (service) => {
      setActiveServices(prev => 
        prev.includes(service)
          ? prev.filter(s => s !== service)
          : [...prev, service]
      );
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center space-x-4">
          <Server className="w-12 h-12" />
          <div className="h-0.5 w-32 bg-blue-500" />
          <div className="grid grid-cols-2 gap-2">
            {services.map(service => (
              <div
                key={service}
                className={`p-2 rounded cursor-pointer ${
                  activeServices.includes(service)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100'
                }`}
                onClick={() => toggleService(service)}
              >
                {service.toUpperCase()}
              </div>
            ))}
          </div>
        </div>
        <Alert>
          <AlertDescription>
            All services operate through single port 2049
          </AlertDescription>
        </Alert>
      </div>
    );
  };

  // Security Framework Demo
  const SecurityDemo = () => {
    const [selectedMechanism, setSelectedMechanism] = useState('kerberos');
    const mechanisms = [
      { id: 'kerberos', name: 'Kerberos 5', icon: <Shield className="w-4 h-4" /> },
      { id: 'spkm', name: 'SPKM3', icon: <Lock className="w-4 h-4" /> }
    ];

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {mechanisms.map(mech => (
            <div
              key={mech.id}
              className={`p-4 rounded-lg cursor-pointer ${
                selectedMechanism === mech.id
                  ? 'bg-blue-100 ring-2 ring-blue-500'
                  : 'bg-gray-50'
              }`}
              onClick={() => setSelectedMechanism(mech.id)}
            >
              <div className="flex items-center gap-2">
                {mech.icon}
                <span>{mech.name}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Security Features</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>UTF-8 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              <span>Extensible Framework</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Compound Operations Demo
  const CompoundOperationsDemo = () => {
    const [operations, setOperations] = useState([]);
    const [isExecuting, setIsExecuting] = useState(false);

    const addOperation = (type) => {
      setOperations(prev => [...prev, { type, id: Date.now() }]);
    };

    const executeCompound = () => {
      setIsExecuting(true);
      setTimeout(() => {
        setOperations([]);
        setIsExecuting(false);
      }, 2000);
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <button
            className="p-2 bg-blue-100 rounded hover:bg-blue-200"
            onClick={() => addOperation('lookup')}
          >
            Add Lookup
          </button>
          <button
            className="p-2 bg-blue-100 rounded hover:bg-blue-200"
            onClick={() => addOperation('access')}
          >
            Add Access Check
          </button>
          <button
            className="p-2 bg-blue-100 rounded hover:bg-blue-200"
            onClick={() => addOperation('read')}
          >
            Add Read
          </button>
        </div>
        <div className="h-32 bg-gray-50 rounded-lg p-2 overflow-y-auto">
          {operations.map((op, index) => (
            <div key={op.id} className="flex items-center gap-2 mb-1">
              <span>{index + 1}.</span>
              <div className="flex-1 p-2 bg-blue-100 rounded">
                {op.type.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
        <button
          className="w-full p-2 bg-green-500 text-white rounded disabled:bg-gray-300"
          onClick={executeCompound}
          disabled={operations.length === 0 || isExecuting}
        >
          {isExecuting ? 'Executing...' : 'Execute Compound Operation'}
        </button>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Network className="w-6 h-6" />
          <CardTitle>NFS Version 4 Architecture</CardTitle>
        </div>
        <CardDescription>
          Interactive exploration of NFSv4's modern features and protocols
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid grid-cols-4 gap-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="stateful">Stateful Operations</TabsTrigger>
            <TabsTrigger value="services">Integrated Services</TabsTrigger>
            <TabsTrigger value="security">Security & Compound Ops</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      icon: <Database className="w-6 h-6" />,
                      title: "Stateful Operation",
                      description: "Maintains client state for improved performance"
                    },
                    {
                      icon: <Layers className="w-6 h-6" />,
                      title: "Integrated Services",
                      description: "Single protocol, single port (2049)"
                    },
                    {
                      icon: <Shield className="w-6 h-6" />,
                      title: "Enhanced Security",
                      description: "Mandatory security mechanisms"
                    },
                    {
                      icon: <Settings className="w-6 h-6" />,
                      title: "Compound Operations",
                      description: "Multiple operations in single RPC"
                    }
                  ].map((feature, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg flex gap-3">
                      {feature.icon}
                      <div>
                        <h3 className="font-semibold">{feature.title}</h3>
                        <p className="text-sm text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stateful">
            <Card>
              <CardContent className="p-6">
                <StatefulOperationDemo />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardContent className="p-6">
                <IntegratedServicesDemo />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-4">Security Framework</h3>
                    <SecurityDemo />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Compound Operations</h3>
                    <CompoundOperationsDemo />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NFSv4Architecture;
