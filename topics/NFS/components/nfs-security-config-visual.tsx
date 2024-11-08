import React, { useState, useEffect } from 'react';
import { Shield, Lock, Users, Network, Settings, AlertTriangle, Check, X, Server, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const NFSSecurityConfig = () => {
  const [securityConfig, setSecurityConfig] = useState({
    rootSquash: 'root_squash',
    kerberosLevel: 'none',
    accessControl: {
      networks: [],
      netgroups: []
    },
    firewallRules: []
  });

  // Access Control Component
  const AccessControl = () => {
    const [network, setNetwork] = useState('');
    const [netgroup, setNetgroup] = useState('');

    const addNetwork = () => {
      if (network) {
        setSecurityConfig(prev => ({
          ...prev,
          accessControl: {
            ...prev.accessControl,
            networks: [...prev.accessControl.networks, network]
          }
        }));
        setNetwork('');
      }
    };

    const addNetgroup = () => {
      if (netgroup) {
        setSecurityConfig(prev => ({
          ...prev,
          accessControl: {
            ...prev.accessControl,
            netgroups: [...prev.accessControl.netgroups, netgroup]
          }
        }));
        setNetgroup('');
      }
    };

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Network Access</h3>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={network}
                    onChange={(e) => setNetwork(e.target.value)}
                    className="flex-1 p-2 border rounded"
                    placeholder="192.168.1.0/24"
                  />
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={addNetwork}
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-1">
                  {securityConfig.accessControl.networks.map((net, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-gray-100 rounded">
                      <Network className="w-4 h-4" />
                      <span>{net}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Netgroup Access</h3>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={netgroup}
                    onChange={(e) => setNetgroup(e.target.value)}
                    className="flex-1 p-2 border rounded"
                    placeholder="@trusted-clients"
                  />
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={addNetgroup}
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-1">
                  {securityConfig.accessControl.netgroups.map((group, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-gray-100 rounded">
                      <Users className="w-4 h-4" />
                      <span>{group}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // Root Squashing Component
  const RootSquashing = () => {
    const options = [
      {
        value: 'root_squash',
        label: 'Root Squash',
        description: 'Map remote root to nobody (Recommended)',
        icon: <Shield className="w-6 h-6" />
      },
      {
        value: 'no_root_squash',
        label: 'No Root Squash',
        description: 'Allow remote root access (High Risk)',
        icon: <AlertTriangle className="w-6 h-6" />
      },
      {
        value: 'all_squash',
        label: 'All Squash',
        description: 'Map all users to nobody (Maximum Security)',
        icon: <Lock className="w-6 h-6" />
      }
    ];

    return (
      <div className="space-y-4">
        <div className="grid gap-4">
          {options.map(option => (
            <div
              key={option.value}
              className={`p-4 rounded-lg cursor-pointer border-2 transition-all ${
                securityConfig.rootSquash === option.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-transparent bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => setSecurityConfig({...securityConfig, rootSquash: option.value})}
            >
              <div className="flex items-center gap-3">
                {option.icon}
                <div>
                  <h3 className="font-semibold">{option.label}</h3>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {securityConfig.rootSquash === 'no_root_squash' && (
          <Alert variant="destructive">
            <AlertTriangle className="w-4 h-4" />
            <AlertDescription>
              Warning: no_root_squash is a significant security risk and should only be used in trusted environments
            </AlertDescription>
          </Alert>
        )}
      </div>
    );
  };

  // Kerberos Configuration Component
  const KerberosConfig = () => {
    const securityLevels = [
      {
        level: 'none',
        label: 'No Kerberos',
        description: 'Standard NFS authentication',
        icon: <X className="w-6 h-6" />
      },
      {
        level: 'krb5',
        label: 'krb5',
        description: 'Authentication only',
        icon: <Shield className="w-6 h-6" />
      },
      {
        level: 'krb5i',
        label: 'krb5i',
        description: 'Authentication + Integrity',
        icon: <Lock className="w-6 h-6" />
      },
      {
        level: 'krb5p',
        label: 'krb5p',
        description: 'Authentication + Integrity + Privacy',
        icon: <Lock className="w-6 h-6 text-green-500" />
      }
    ];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {securityLevels.map(level => (
            <div
              key={level.level}
              className={`p-4 rounded-lg cursor-pointer border-2 transition-all ${
                securityConfig.kerberosLevel === level.level
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-transparent bg-gray-50 hover:bg-gray-100'
              }`}
              onClick={() => setSecurityConfig({...securityConfig, kerberosLevel: level.level})}
            >
              <div className="flex items-center gap-3">
                {level.icon}
                <div>
                  <h3 className="font-semibold">{level.label}</h3>
                  <p className="text-sm text-gray-600">{level.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {securityConfig.kerberosLevel !== 'none' && (
          <div className="bg-gray-900 text-white p-4 rounded font-mono text-sm">
            <div className="text-gray-400"># Export configuration with Kerberos:</div>
            /export/path *(sec={securityConfig.kerberosLevel})
          </div>
        )}
      </div>
    );
  };

  // Firewall Configuration Component
  const FirewallConfig = () => {
    const [showv4Rules, setShowv4Rules] = useState(true);

    const NFSPorts = {
      v4: [2049],
      v3: [2049, 111, 892, 662, 32803]
    };

    return (
      <div className="space-y-6">
        <div className="flex gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${showv4Rules ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setShowv4Rules(true)}
          >
            NFSv4 Rules
          </button>
          <button
            className={`px-4 py-2 rounded ${!showv4Rules ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setShowv4Rules(false)}
          >
            NFSv3 Rules
          </button>
        </div>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-4">Required Ports</h3>
            <div className="space-y-2">
              {(showv4Rules ? NFSPorts.v4 : NFSPorts.v3).map(port => (
                <div key={port} className="flex items-center gap-2 p-2 bg-gray-100 rounded">
                  <Network className="w-4 h-4" />
                  <span>Port {port}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="bg-gray-900 text-white p-4 rounded font-mono text-sm">
          <div className="text-gray-400"># iptables configuration:</div>
          {showv4Rules ? (
            <>
              iptables -A INPUT -p tcp --dport 2049 -j ACCEPT<br />
              iptables -A INPUT -p udp --dport 2049 -j ACCEPT
            </>
          ) : (
            NFSPorts.v3.map(port => (
              <React.Fragment key={port}>
                iptables -A INPUT -p tcp --dport {port} -j ACCEPT<br />
                iptables -A INPUT -p udp --dport {port} -j ACCEPT<br />
              </React.Fragment>
            ))
          )}
        </div>

        <Alert>
          <AlertDescription>
            {showv4Rules ? 
              'NFSv4 simplifies firewall configuration by using only port 2049' :
              'NFSv3 requires multiple ports for various services'
            }
          </AlertDescription>
        </Alert>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Shield className="w-6 h-6" />
          <CardTitle>NFS Security Configuration</CardTitle>
        </div>
        <CardDescription>
          Configure comprehensive security measures for your NFS deployment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="access" className="space-y-4">
          <TabsList className="grid grid-cols-4 gap-4">
            <TabsTrigger value="access">Access Control</TabsTrigger>
            <TabsTrigger value="root">Root Squashing</TabsTrigger>
            <TabsTrigger value="kerberos">Kerberos</TabsTrigger>
            <TabsTrigger value="firewall">Firewall</TabsTrigger>
          </TabsList>

          <TabsContent value="access">
            <Card>
              <CardContent className="p-6">
                <AccessControl />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="root">
            <Card>
              <CardContent className="p-6">
                <RootSquashing />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kerberos">
            <Card>
              <CardContent className="p-6">
                <KerberosConfig />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="firewall">
            <Card>
              <CardContent className="p-6">
                <FirewallConfig />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NFSSecurityConfig;
