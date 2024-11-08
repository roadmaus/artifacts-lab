import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  FileText, 
  RefreshCw, 
  Lock,
  Hash,
  FileWarning
} from 'lucide-react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

const IntegrityVisualization = () => {
  const [selectedSection, setSelectedSection] = useState('hashDemo');
  const [inputValue, setInputValue] = useState('');
  const [hashValue, setHashValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [monitoringAlerts, setMonitoringAlerts] = useState([]);
  const [activeDemo, setActiveDemo] = useState(null);

  // Simulated hash function (for demonstration)
  const simulateHash = (input) => {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(8, '0');
  };

  // Input validation rules
  const validationRules = {
    patientTemp: {
      min: 95,
      max: 105,
      description: "Patient temperature must be between 95°F and 105°F"
    },
    heartRate: {
      min: 40,
      max: 200,
      description: "Heart rate must be between 40 and 200 BPM"
    },
    bloodPressure: {
      pattern: /^\d{2,3}\/\d{2,3}$/,
      description: "Blood pressure must be in format 120/80"
    }
  };

  const fileIntegrityExamples = [
    {
      name: "system-config.conf",
      status: "unchanged",
      lastCheck: "2 mins ago",
      baselineHash: "8a4b2c1d",
      currentHash: "8a4b2c1d"
    },
    {
      name: "user-permissions.json",
      status: "modified",
      lastCheck: "1 min ago",
      baselineHash: "7f3e9d2a",
      currentHash: "7f3e9d2b"
    },
    {
      name: "security-policy.xml",
      status: "unchanged",
      lastCheck: "5 mins ago",
      baselineHash: "5c8b4a3d",
      currentHash: "5c8b4a3d"
    }
  ];

  const validateInput = (value, rule) => {
    if (rule.min !== undefined && rule.max !== undefined) {
      const numValue = parseFloat(value);
      return !isNaN(numValue) && numValue >= rule.min && numValue <= rule.max;
    }
    if (rule.pattern) {
      return rule.pattern.test(value);
    }
    return true;
  };

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setHashValue(simulateHash(newValue));
  };

  const addMonitoringAlert = (message, type) => {
    setMonitoringAlerts(prev => [{
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toLocaleTimeString()
    }, ...prev].slice(0, 5));
  };

  return (
    <div className="w-full max-w-6xl space-y-6 p-4">
      {/* Main Title */}
      <Card className="bg-gradient-to-r from-green-50 to-green-100">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-green-600" />
            <div>
              <CardTitle>Data Integrity Protection</CardTitle>
              <CardDescription>Ensuring data accuracy and preventing unauthorized modifications</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Interactive Demos Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setSelectedSection('hashDemo')}
          className={`p-4 rounded-lg border transition-colors ${
            selectedSection === 'hashDemo' ? 'bg-green-100 border-green-500' : 'hover:bg-slate-50'
          }`}
        >
          <Hash className="h-6 w-6 mb-2" />
          <h3 className="font-semibold">Hash Functions</h3>
          <p className="text-sm text-gray-600">See how data changes affect hash values</p>
        </button>

        <button
          onClick={() => setSelectedSection('inputValidation')}
          className={`p-4 rounded-lg border transition-colors ${
            selectedSection === 'inputValidation' ? 'bg-green-100 border-green-500' : 'hover:bg-slate-50'
          }`}
        >
          <CheckCircle className="h-6 w-6 mb-2" />
          <h3 className="font-semibold">Input Validation</h3>
          <p className="text-sm text-gray-600">Test data validation rules</p>
        </button>

        <button
          onClick={() => setSelectedSection('integrityMonitoring')}
          className={`p-4 rounded-lg border transition-colors ${
            selectedSection === 'integrityMonitoring' ? 'bg-green-100 border-green-500' : 'hover:bg-slate-50'
          }`}
        >
          <RefreshCw className="h-6 w-6 mb-2" />
          <h3 className="font-semibold">Integrity Monitoring</h3>
          <p className="text-sm text-gray-600">Monitor file changes in real-time</p>
        </button>
      </div>

      {/* Dynamic Content Section */}
      <Card>
        <CardContent className="p-6">
          {selectedSection === 'hashDemo' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Hash Function Demonstration</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Enter Data:</label>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Type something to see its hash..."
                  />
                </div>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-sm font-medium">Generated Hash:</p>
                  <p className="font-mono bg-white p-2 rounded mt-1">{hashValue || '0000000'}</p>
                </div>
                <Alert>
                  <AlertTitle>How It Works</AlertTitle>
                  <AlertDescription>
                    Hash functions create a fixed-size output (hash) from any input data. Even a small change in the input produces a completely different hash, making them ideal for detecting unauthorized modifications.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          )}

          {selectedSection === 'inputValidation' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Medical Data Validation</h3>
              <div className="grid gap-4">
                {Object.entries(validationRules).map(([field, rule]) => (
                  <div key={field} className="space-y-2">
                    <label className="block text-sm font-medium capitalize">
                      {field.replace(/([A-Z])/g, ' $1').trim()}:
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg"
                      placeholder={rule.description}
                      onChange={(e) => {
                        setIsValid(validateInput(e.target.value, rule));
                        setActiveDemo(field);
                      }}
                    />
                    {activeDemo === field && (
                      <div className={`text-sm ${isValid ? 'text-green-600' : 'text-red-600'}`}>
                        {isValid ? 
                          <span className="flex items-center gap-1">
                            <CheckCircle className="h-4 w-4" /> Valid input
                          </span> : 
                          <span className="flex items-center gap-1">
                            <XCircle className="h-4 w-4" /> {rule.description}
                          </span>
                        }
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedSection === 'integrityMonitoring' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">File Integrity Monitoring (FIM)</h3>
              <div className="space-y-4">
                {fileIntegrityExamples.map((file) => (
                  <div key={file.name} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <span className="font-medium">{file.name}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        file.status === 'unchanged' ? 
                        'bg-green-100 text-green-700' : 
                        'bg-red-100 text-red-700'
                      }`}>
                        {file.status}
                      </span>
                    </div>
                    <div className="mt-2 text-sm">
                      <p>Last checked: {file.lastCheck}</p>
                      <p className="font-mono text-xs mt-1">
                        Baseline: {file.baselineHash} | Current: {file.currentHash}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Alert className="bg-green-50 border-green-200">
        <AlertTitle>Data Integrity Best Practices</AlertTitle>
        <AlertDescription>
          <ul className="list-disc pl-4 space-y-2 mt-2">
            <li>Implement cryptographic hash functions for data verification</li>
            <li>Use digital signatures for non-repudiation</li>
            <li>Enforce strict input validation rules</li>
            <li>Maintain audit logs of all data modifications</li>
            <li>Regular integrity checks against known-good baselines</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default IntegrityVisualization;
