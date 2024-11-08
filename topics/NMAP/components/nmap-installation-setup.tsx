import React, { useState, useEffect } from 'react';
import { Settings, Terminal, Shield, Server, FileText, Database, Monitor, Command, Box, AlertTriangle, CheckCircle, HardDrive, Laptop, Play, Copy, Info } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const NmapInstallationSetup = () => {
  const [selectedOS, setSelectedOS] = useState(null);
  const [selectedSection, setSelectedSection] = useState('installation');
  const [showConfigDetails, setShowConfigDetails] = useState(false);
  const [commandOptions, setCommandOptions] = useState({
    target: '',
    scanType: '',
    portRange: '',
    timing: '',
    version: false,
    os: false,
    scripts: [],
    output: ''
  });
  const [builtCommand, setBuiltCommand] = useState('nmap');

  const operatingSystems = [
    { id: 'linux', name: 'Linux', icon: Server },
    { id: 'windows', name: 'Windows', icon: Monitor },
    { id: 'macos', name: 'macOS', icon: Laptop }
  ];

  const configFiles = [
    {
      name: 'nmap-services',
      description: 'Port/service mapping database',
      location: '/usr/share/nmap/nmap-services'
    },
    {
      name: 'nmap-protocols',
      description: 'Protocol definitions',
      location: '/usr/share/nmap/nmap-protocols'
    },
    {
      name: 'nmap-service-probes',
      description: 'Service fingerprint database',
      location: '/usr/share/nmap/nmap-service-probes'
    },
    {
      name: 'nmap-mac-prefixes',
      description: 'Vendor MAC address database',
      location: '/usr/share/nmap/nmap-mac-prefixes'
    }
  ];

  const scanTypes = [
    { value: '-sS', label: 'SYN Scan (Stealth)', requiresPrivilege: true },
    { value: '-sT', label: 'TCP Connect Scan', requiresPrivilege: false },
    { value: '-sU', label: 'UDP Scan', requiresPrivilege: true },
    { value: '-sA', label: 'ACK Scan', requiresPrivilege: true },
    { value: '-sn', label: 'Ping Scan', requiresPrivilege: false }
  ];

  const timingTemplates = [
    { value: '-T0', label: 'Paranoid' },
    { value: '-T1', label: 'Sneaky' },
    { value: '-T2', label: 'Polite' },
    { value: '-T3', label: 'Normal' },
    { value: '-T4', label: 'Aggressive' },
    { value: '-T5', label: 'Insane' }
  ];

  const scriptCategories = [
    { value: 'default', label: 'Default Scripts' },
    { value: 'vuln', label: 'Vulnerability Scripts' },
    { value: 'safe', label: 'Safe Scripts' },
    { value: 'auth', label: 'Authentication Scripts' },
    { value: 'discovery', label: 'Discovery Scripts' }
  ];

  const outputFormats = [
    { value: '', label: 'Normal Output' },
    { value: '-oN', label: 'Normal File' },
    { value: '-oX', label: 'XML File' },
    { value: '-oG', label: 'Grepable File' },
    { value: '-oA', label: 'All Formats' }
  ];

  const installationCommands = {
    linux: `# Debian/Ubuntu
sudo apt update
sudo apt install nmap

# Red Hat/CentOS
sudo yum install epel-release
sudo yum install nmap

# Verify installation
nmap --version`,
    windows: `# Download NMAP installer from nmap.org
# Run installer as administrator
# Add to system PATH

# Verify in Command Prompt (Admin)
nmap --version`,
    macos: `# Using Homebrew
brew install nmap

# Or download installer from nmap.org
# Run the .dmg installer

# Verify installation
nmap --version`
  };

  const performanceSettings = [
    { name: 'Timing Template', command: '-T<0-5>', description: 'Adjusts scan timing (higher = faster)' },
    { name: 'Min Rate', command: '--min-rate', description: 'Minimum packets per second' },
    { name: 'Max Retries', command: '--max-retries', description: 'Maximum port scan probe retransmissions' },
    { name: 'Host Timeout', command: '--host-timeout', description: 'Give up on target after this long' }
  ];

  useEffect(() => {
    let command = 'nmap';
    
    if (commandOptions.scanType) {
      command += ` ${commandOptions.scanType}`;
    }
    
    if (commandOptions.timing) {
      command += ` ${commandOptions.timing}`;
    }
    
    if (commandOptions.version) {
      command += ' -sV';
    }
    
    if (commandOptions.os) {
      command += ' -O';
    }
    
    if (commandOptions.scripts.length > 0) {
      command += ` --script=${commandOptions.scripts.join(',')}`;
    }
    
    if (commandOptions.portRange) {
      command += ` -p${commandOptions.portRange}`;
    }
    
    if (commandOptions.output) {
      command += ` ${commandOptions.output} scan-results`;
    }
    
    if (commandOptions.target) {
      command += ` ${commandOptions.target}`;
    }
    
    setBuiltCommand(command);
  }, [commandOptions]);

  const renderInstallationGuide = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4 mb-6">
        {operatingSystems.map((os) => (
          <div
            key={os.id}
            onClick={() => setSelectedOS(os.id)}
            className={`p-4 rounded-lg border cursor-pointer transition-all
              ${selectedOS === os.id ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-300'}`}
          >
            <div className="flex items-center justify-center gap-2">
              <os.icon className="h-6 w-6" />
              <span className="font-medium">{os.name}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedOS && (
        <div className="mt-4">
          <div className="bg-gray-900 rounded-lg p-4">
            <pre className="text-green-400 font-mono text-sm overflow-x-auto">
              {installationCommands[selectedOS]}
            </pre>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Post-Installation Steps</span>
            </div>
            <ul className="list-disc pl-5 text-sm space-y-2">
              <li>Update NSE scripts: <code>nmap --script-updatedb</code></li>
              <li>Verify permissions for privileged scans</li>
              <li>Test basic functionality with simple scan</li>
              <li>Configure firewall exceptions if needed</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );

  const renderConfigurationGuide = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        {configFiles.map((file) => (
          <div key={file.name} className="p-4 bg-white rounded-lg border">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <h4 className="font-medium">{file.name}</h4>
            </div>
            <p className="text-sm text-gray-600 mb-1">{file.description}</p>
            <code className="text-xs bg-gray-100 px-2 py-1 rounded">{file.location}</code>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white rounded-lg border">
        <h4 className="font-medium mb-3">Performance Tuning</h4>
        <div className="space-y-2">
          {performanceSettings.map((setting) => (
            <div key={setting.name} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
              <Command className="h-4 w-4 text-blue-500" />
              <code className="text-sm">{setting.command}</code>
              <span className="text-sm text-gray-600">- {setting.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecurityChecklist = () => (
    <div className="space-y-4">
      <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="flex items-center gap-2 mb-3">
          <Shield className="h-5 w-5 text-yellow-600" />
          <h4 className="font-medium text-yellow-800">Security Considerations</h4>
        </div>
        <ul className="list-disc pl-5 text-sm space-y-2 text-yellow-800">
          <li>Always obtain proper authorization before scanning</li>
          <li>Use secure storage for scan results</li>
          <li>Regularly update NMAP and its scripts</li>
          <li>Monitor system resource usage</li>
          <li>Follow security policies and compliance requirements</li>
        </ul>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded-lg border">
          <h4 className="font-medium mb-2">Required Privileges</h4>
          <ul className="text-sm space-y-2">
            <li>• SYN scan (sudo/admin)</li>
            <li>• Version detection (sudo/admin)</li>
            <li>• OS fingerprinting (sudo/admin)</li>
            <li>• Basic TCP connect (standard user)</li>
          </ul>
        </div>
        <div className="p-4 bg-white rounded-lg border">
          <h4 className="font-medium mb-2">Best Practices</h4>
          <ul className="text-sm space-y-2">
            <li>• Use isolated testing networks</li>
            <li>• Implement proper logging</li>
            <li>• Create scanning procedures</li>
            <li>• Regular backup of configs</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const renderCommandBuilder = () => (
    <div className="space-y-6">
      <div className="bg-gray-900 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-green-400 font-mono">Generated Command:</span>
          <button
            onClick={() => navigator.clipboard.writeText(builtCommand)}
            className="text-gray-400 hover:text-white flex items-center gap-1"
          >
            <Copy className="h-4 w-4" />
            Copy
          </button>
        </div>
        <pre className="text-green-400 font-mono text-sm overflow-x-auto whitespace-pre-wrap">
          {builtCommand}
        </pre>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg border">
            <h4 className="font-medium mb-3">Basic Options</h4>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium block mb-1">Target:</label>
                <input
                  type="text"
                  placeholder="IP, hostname, or range (e.g., 192.168.1.0/24)"
                  className="w-full p-2 border rounded"
                  value={commandOptions.target}
                  onChange={(e) => setCommandOptions(prev => ({
                    ...prev,
                    target: e.target.value
                  }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Scan Type:</label>
                <select
                  className="w-full p-2 border rounded"
                  value={commandOptions.scanType}
                  onChange={(e) => setCommandOptions(prev => ({
                    ...prev,
                    scanType: e.target.value
                  }))}
                >
                  <option value="">Select scan type</option>
                  {scanTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label} {type.requiresPrivilege ? '(requires privileges)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border">
            <h4 className="font-medium mb-3">Port and Timing</h4>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium block mb-1">Port Range:</label>
                <input
                  type="text"
                  placeholder="e.g., 80,443 or 1-1000"
                  className="w-full p-2 border rounded"
                  value={commandOptions.portRange}
                  onChange={(e) => setCommandOptions(prev => ({
                    ...prev,
                    portRange: e.target.value
                  }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Timing Template:</label>
                <select
                  className="w-full p-2 border rounded"
                  value={commandOptions.timing}
                  onChange={(e) => setCommandOptions(prev => ({
                    ...prev,
                    timing: e.target.value
                  }))}
                >
                  <option value="">Select timing</option>
                  {timingTemplates.map(template => (
                    <option key={template.value} value={template.value}>
                      {template.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>{/* Advanced Options */}
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg border">
            <h4 className="font-medium mb-3">Detection Options</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={commandOptions.version}
                  onChange={(e) => setCommandOptions(prev => ({
                    ...prev,
                    version: e.target.checked
                  }))}
                />
                <span className="text-sm">Version Detection (-sV)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={commandOptions.os}
                  onChange={(e) => setCommandOptions(prev => ({
                    ...prev,
                    os: e.target.checked
                  }))}
                />
                <span className="text-sm">OS Detection (-O)</span>
              </label>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border">
            <h4 className="font-medium mb-3">NSE Scripts</h4>
            <div className="space-y-2">
              {scriptCategories.map(script => (
                <label key={script.value} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={commandOptions.scripts.includes(script.value)}
                    onChange={(e) => {
                      setCommandOptions(prev => ({
                        ...prev,
                        scripts: e.target.checked
                          ? [...prev.scripts, script.value]
                          : prev.scripts.filter(s => s !== script.value)
                      }));
                    }}
                  />
                  <span className="text-sm">{script.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border">
            <h4 className="font-medium mb-3">Output Format</h4>
            <select
              className="w-full p-2 border rounded"
              value={commandOptions.output}
              onChange={(e) => setCommandOptions(prev => ({
                ...prev,
                output: e.target.value
              }))}
            >
              <option value="">Select output format</option>
              {outputFormats.map(format => (
                <option key={format.value} value={format.value}>
                  {format.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Command Explanation */}
      {builtCommand !== 'nmap' && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Info className="h-5 w-5 text-blue-500" />
            <h4 className="font-medium">Command Explanation</h4>
          </div>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {commandOptions.scanType && (
              <li>Using {scanTypes.find(t => t.value === commandOptions.scanType)?.label}</li>
            )}
            {commandOptions.timing && (
              <li>Timing template: {timingTemplates.find(t => t.value === commandOptions.timing)?.label}</li>
            )}
            {commandOptions.version && <li>Enabling version detection</li>}
            {commandOptions.os && <li>Enabling OS detection</li>}
            {commandOptions.scripts.length > 0 && (
              <li>Running NSE scripts: {commandOptions.scripts.join(', ')}</li>
            )}
            {commandOptions.portRange && <li>Scanning ports: {commandOptions.portRange}</li>}
            {commandOptions.output && (
              <li>Output format: {outputFormats.find(f => f.value === commandOptions.output)?.label}</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-6 w-6" />
            NMAP Installation and Configuration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setSelectedSection('installation')}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedSection === 'installation' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Installation
            </button>
            <button
              onClick={() => setSelectedSection('configuration')}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedSection === 'configuration' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Configuration
            </button>
            <button
              onClick={() => setSelectedSection('security')}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedSection === 'security' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Security
            </button>
            <button
              onClick={() => setSelectedSection('builder')}
              className={`px-4 py-2 rounded-md transition-colors ${
                selectedSection === 'builder' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Command Builder
            </button>
          </div>

          {selectedSection === 'installation' && renderInstallationGuide()}
          {selectedSection === 'configuration' && renderConfigurationGuide()}
          {selectedSection === 'security' && renderSecurityChecklist()}
          {selectedSection === 'builder' && renderCommandBuilder()}
        </CardContent>
      </Card>
    </div>
  );
};

export default NmapInstallationSetup;