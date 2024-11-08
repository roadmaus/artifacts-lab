import React, { useState, useEffect } from 'react';
import { Network, Search, Shield, AlertTriangle, Database, Eye, Zap, Server, Globe, Lock, Activity, Radio, FileText, Mail, Users, Layers, Terminal, Info, Share2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const NetworkEnumerationWorkflow = () => {
  const [activePhase, setActivePhase] = useState(null);
  const [showMethodDetails, setShowMethodDetails] = useState(false);
  const [currentTourStep, setCurrentTourStep] = useState(0);
  const [isTourActive, setIsTourActive] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [simulationStep, setSimulationStep] = useState(0);

  // Simulation interval for dynamic visualizations
  useEffect(() => {
    if (selectedTechnique) {
      const interval = setInterval(() => {
        setSimulationStep((prev) => (prev + 1) % 4);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [selectedTechnique]);

  const phases = [
    {
      id: 'passive',
      title: 'Passive Enumeration',
      icon: Eye,
      description: 'Gathering information without direct target interaction',
      methods: [
        { name: 'DNS Records Analysis', icon: Globe },
        { name: 'WHOIS Lookups', icon: Search },
        { name: 'Public Records Search', icon: Database },
        { name: 'Social Media Research', icon: Users }
      ]
    },
    {
      id: 'active',
      title: 'Active Enumeration',
      icon: Zap,
      description: 'Direct interaction with target systems',
      methods: [
        { name: 'Host Discovery', icon: Server },
        { name: 'Port Scanning', icon: Radio },
        { name: 'Service Identification', icon: Layers },
        { name: 'OS Fingerprinting', icon: Terminal }
      ]
    }
  ];

  const techniques = {
    'DNS Records Analysis': {
      title: "DNS Records Explorer",
      visualization: () => (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              { type: 'A', record: '192.168.1.1', desc: 'IPv4 Address' },
              { type: 'AAAA', record: '2001:db8::1', desc: 'IPv6 Address' },
              { type: 'MX', record: 'mail.domain.com', desc: 'Mail Server' },
              { type: 'NS', record: 'ns1.domain.com', desc: 'Name Server' },
              { type: 'CNAME', record: 'www.domain.com', desc: 'Alias' },
              { type: 'TXT', record: 'v=spf1...', desc: 'Text Record' }
            ].map((record, idx) => (
              <div key={idx} className="p-3 bg-white rounded-lg border hover:border-blue-500 cursor-pointer">
                <div className="font-bold text-sm text-blue-600">{record.type}</div>
                <div className="text-sm truncate">{record.record}</div>
                <div className="text-xs text-gray-500">{record.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    'WHOIS Lookups': {
      title: "WHOIS Information",
      visualization: () => (
        <div className="space-y-4">
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
            <pre>
              {`Domain Name: example.com
Registrar: Example Registrar, Inc.
Updated Date: 2024-01-15
Creation Date: 2020-01-15
Registry Expiry Date: 2025-01-15
Registrant Organization: Example Corp
Registrant Country: US
Admin Email: admin@example.com
Name Servers:
  ns1.example.com
  ns2.example.com`}
            </pre>
          </div>
        </div>
      )
    },
    'Public Records Search': {
      title: "Public Information Sources",
      visualization: () => (
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Globe, name: 'Web Archives', count: '15 snapshots' },
            { icon: Mail, name: 'Email Records', count: '8 addresses' },
            { icon: Users, name: 'Employee Data', count: '24 profiles' },
            { icon: Share2, name: 'Subdomains', count: '12 found' },
            { icon: Shield, name: 'Certificates', count: '6 active' },
            { icon: Database, name: 'Tech Stack', count: '9 technologies' }
          ].map((source, idx) => (
            <div key={idx} className="p-3 bg-white rounded-lg border text-center">
              <source.icon className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <div className="font-medium text-sm">{source.name}</div>
              <div className="text-xs text-gray-500">{source.count}</div>
            </div>
          ))}
        </div>
      )
    },
    'Social Media Research': {
      title: "Social Media Intelligence",
      visualization: () => (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              { platform: 'LinkedIn', posts: 45, connections: 500 },
              { platform: 'Twitter', posts: 120, followers: 1200 },
              { platform: 'Facebook', groups: 5, pages: 3 },
              { platform: 'GitHub', repos: 12, contributors: 8 }
            ].map((platform, idx) => (
              <div key={idx} className="p-4 bg-white rounded-lg border">
                <h4 className="font-medium mb-2">{platform.platform}</h4>
                <div className="space-y-1 text-sm">
                  {Object.entries(platform).map(([key, value]) => (
                    key !== 'platform' && (
                      <div key={key} className="flex justify-between">
                        <span className="text-gray-600">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    'Host Discovery': {
      title: "Network Host Discovery",
      visualization: () => (
        <div className="relative p-4">
          <div className="grid grid-cols-4 gap-4">
            {Array(16).fill(0).map((_, idx) => {
              const isActive = (idx + simulationStep) % 4 === 0;
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border ${isActive ? 'bg-green-100 border-green-500' : 'bg-gray-50'}`}
                >
                  <div className="flex items-center gap-2">
                    <Server className={`h-4 w-4 ${isActive ? 'text-green-500' : 'text-gray-400'}`} />
                    <span className="text-sm">192.168.1.{idx + 1}</span>
                  </div>
                  <div className="text-xs mt-1 text-gray-500">
                    {isActive ? 'Responding' : 'Scanning...'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )
    },
    'Port Scanning': {
      title: "Port Scan Analysis",
      visualization: () => (
        <div className="space-y-4">
          <div className="grid grid-cols-6 gap-2">
            {[
              { port: 21, service: 'FTP', status: 'open' },
              { port: 22, service: 'SSH', status: 'open' },
              { port: 23, service: 'Telnet', status: 'filtered' },
              { port: 80, service: 'HTTP', status: 'open' },
              { port: 443, service: 'HTTPS', status: 'open' },
              { port: 3389, service: 'RDP', status: 'closed' }
            ].map((port, idx) => (
              <div
                key={idx}
                className={`p-2 rounded text-center ${
                  port.status === 'open' 
                    ? 'bg-green-100 border-green-500' 
                    : port.status === 'filtered'
                      ? 'bg-yellow-100 border-yellow-500'
                      : 'bg-red-100 border-red-500'
                } border`}
              >
                <div className="font-bold text-sm">{port.port}</div>
                <div className="text-xs">{port.service}</div>
                <div className="text-xs mt-1">{port.status}</div>
              </div>
            ))}
          </div>
          <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-xs">
            <pre>
              {`# nmap -sS -sV target.com
Starting Nmap scan...
Scanning target.com...
PORT     STATE    SERVICE
21/tcp   open     ftp
22/tcp   open     ssh
23/tcp   filtered telnet
...`}
            </pre>
          </div>
        </div>
      )
    },
    'Service Identification': {
      title: "Service Version Detection",
      visualization: () => (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              { port: 80, service: 'Apache', version: '2.4.41', banner: 'Apache/2.4.41 (Ubuntu)' },
              { port: 22, service: 'OpenSSH', version: '8.2p1', banner: 'SSH-2.0-OpenSSH_8.2p1' },
              { port: 21, service: 'vsftpd', version: '3.0.3', banner: '220 vsftpd 3.0.3' },
              { port: 443, service: 'nginx', version: '1.18.0', banner: 'nginx/1.18.0' }
            ].map((service, idx) => (
              <div key={idx} className="p-3 bg-white rounded-lg border">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Port {service.port}</span>
                  <span className="text-sm text-blue-500">{service.service}</span>
                </div>
                <div className="text-sm text-gray-600">Version: {service.version}</div>
                <div className="text-xs text-gray-500 mt-1">Banner: {service.banner}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    'OS Fingerprinting': {
      title: "Operating System Detection",
      visualization: () => (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg border space-y-2">
              <h4 className="font-medium">TCP/IP Characteristics</h4>
              {[
                { name: 'TTL Value', value: '64', hint: 'Linux/Unix' },
                { name: 'Window Size', value: '65535', hint: 'Modern OS' },
                { name: 'DF Flag', value: 'Set', hint: 'Standard MTU' }
              ].map((param, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span>{param.name}</span>
                  <span className="text-gray-500">{param.value} ({param.hint})</span>
                </div>
              ))}
            </div>
            <div className="p-4 bg-white rounded-lg border space-y-2">
              <h4 className="font-medium">Service Fingerprints</h4>
              {[
                { service: 'SSH', hint: 'OpenSSH 8.2 (Ubuntu)' },
                { service: 'HTTP', hint: 'Apache 2.4 (Ubuntu)' },
                { service: 'SMB', hint: 'Samba 4.11.6-Ubuntu' }
              ].map((service, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span>{service.service}</span>
                  <span className="text-gray-500">{service.hint}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <Info className="h-5 w-5 text-blue-500" />
              <span className="font-medium">OS Detection Result</span>
            </div>
            <div className="text-sm">Linux Ubuntu 20.04 LTS (95% confidence)</div>
          </div>
        </div>
      )
    }
  };

  const tourSteps = [
    {
      title: "Start with Passive Reconnaissance",
      content: "Begin with non-intrusive information gathering techniques.",
      target: "passive-phase"
    },
    {
      title: "Analyze Passive Results",
      content: "Review collected data to map out network structure.",
      target: "passive-results"
    },
    {
      title: "Plan Active Enumeration",
      content: "Based on passive results, plan your active scanning strategy.",
      target: "active-phase"
    },
    {
      title: "Execute Active Scans",
      content: "Perform detailed network scanning and analysis.",
      target: "active-scanning"
    },
    {
      title: "Document Findings",
      content: "Record and analyze all discoveries.",
      target: "documentation"
    }
  ];

  const nextTourStep = () => {
    if (currentTourStep < tourSteps.length - 1) {
      setCurrentTourStep(curr => curr + 1);
    } else {
      setIsTourActive(false);
      setCurrentTourStep(0);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Network className="h-6 w-6" />
              Understanding Network Enumeration
            </div>
            <button
              onClick={() => setIsTourActive(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors"
            >
              Start Guided Tour
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Main visualization area */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {phases.map((phase) => (
              <div
                key={phase.id}
                id={`${phase.id}-phase`}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all 
                  ${activePhase === phase.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'}
                  ${isTourActive && tourSteps[currentTourStep].target === `${phase.id}-phase`
                    ? 'ring-4 ring-blue-300'
                    : ''}`}
                onClick={() => {
                  setActivePhase(phase.id);
                  setShowMethodDetails(true);
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <phase.icon className="h-5 w-5" />
                  <h3 className="font-semibold">{phase.title}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-2">{phase.description}</p>
                
                {showMethodDetails && activePhase === phase.id && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Methods:</h4>
                    <div className="space-y-2">
                      {phase.methods.map((method, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2 bg-white rounded-lg border hover:bg-gray-50 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTechnique(method.name);
                          }}
                        >
                          <method.icon className="h-4 w-4" />
                          <span className="text-sm">{method.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Technique Visualization Area */}
          {selectedTechnique && techniques[selectedTechnique] && (
            <div className="mb-6 p-4 border rounded-lg">
              <h3 className="font-semibold mb-3">
                {techniques[selectedTechnique].title}
              </h3>
              {techniques[selectedTechnique].visualization()}
            </div>
          )}

          {/* Tour Dialog */}
          {isTourActive && (
            <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border max-w-md z-50">
              <h4 className="font-bold mb-2">{tourSteps[currentTourStep].title}</h4>
              <p className="text-sm mb-4">{tourSteps[currentTourStep].content}</p>
              <div className="flex justify-between">
                <button
                  onClick={() => setIsTourActive(false)}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  Skip Tour
                </button>
                <button
                  onClick={nextTourStep}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
                >
                  {currentTourStep === tourSteps.length - 1 ? 'Finish' : 'Next Step'}
                </button>
              </div>
            </div>
          )}

          {/* Best Practices Notice */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <h3 className="font-semibold text-yellow-800">Important Considerations</h3>
            </div>
            <ul className="list-disc pl-5 text-sm text-yellow-800">
              <li>Always obtain proper authorization before conducting enumeration</li>
              <li>Start with passive techniques before moving to active scanning</li>
              <li>Consider network impact and detection risks during active scanning</li>
              <li>Document all findings for proper analysis and reporting</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NetworkEnumerationWorkflow;