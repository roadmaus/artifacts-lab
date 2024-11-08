import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  Users, 
  Building,
  Camera,
  Wifi,
  ServerCrash,
  FileText,
  AlertTriangle,
  Settings,
  Activity,
  KeyRound,
  Eye,
  BookOpen,
  AlertCircle,
  CheckCircle,
  XCircle,
  Network,
  Database,
  Cloud,
  Hospital,
  Coins,
  ShoppingCart,
  Factory
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

// Add this new type near the top of the file
type IndustrySpecificControls = {
  [key: string]: {
    technical: string[];
    administrative: string[];
    physical: string[];
  }
};

type Control = {
  name: string;
  effectiveness: number;
};

const SecurityControlsVisualization = () => {
  const [activeScenario, setActiveScenario] = useState('healthcare');
  const [activeControlCategory, setActiveControlCategory] = useState('technical');
  const [selectedControl, setSelectedControl] = useState(null);
  const [incidentInProgress, setIncidentInProgress] = useState(false);
  const [metrics, setMetrics] = useState({
    threatDetections: 0,
    falsePositives: 0,
    controlEffectiveness: 85,
    complianceScore: 92
  });
  const [activeControls, setActiveControls] = useState<string[]>([]);
  const [selectedThreatDetails, setSelectedThreatDetails] = useState(null);

  // Industry scenarios with specific requirements and controls
  const industryScenarios = {
    healthcare: {
      name: "Healthcare Provider",
      icon: Hospital,
      description: "Protected Health Information (PHI) Security",
      requirements: ["HIPAA Compliance", "Patient Data Protection", "Medical Device Security"],
      threats: ["Data Breach", "Ransomware", "Insider Threats"],
      criticalAssets: ["Patient Records", "Medical Devices", "Research Data"]
    },
    financial: {
      name: "Financial Institution",
      icon: Coins,
      description: "Financial Services Security",
      requirements: ["PCI DSS", "Transaction Security", "Fraud Prevention"],
      threats: ["Financial Fraud", "Account Takeover", "Data Theft"],
      criticalAssets: ["Customer Data", "Transaction Systems", "Trading Platforms"]
    },
    ecommerce: {
      name: "E-commerce Platform",
      icon: ShoppingCart,
      description: "Online Retail Security",
      requirements: ["Payment Security", "Customer Data Protection", "Platform Availability"],
      threats: ["Card Skimming", "DDoS Attacks", "API Abuse"],
      criticalAssets: ["Customer Accounts", "Payment Systems", "Product Database"]
    },
    industrial: {
      name: "Industrial Control Systems",
      icon: Factory,
      description: "Critical Infrastructure Protection",
      requirements: ["OT Security", "Physical Security", "Safety Systems"],
      threats: ["Sabotage", "State Actors", "System Manipulation"],
      criticalAssets: ["SCADA Systems", "Control Networks", "Physical Infrastructure"]
    }
  };

  // Add this after the industryScenarios object
  const industrySpecificControls: IndustrySpecificControls = {
    healthcare: {
      technical: ["Encryption", "DLP", "WAF", "Zero Trust Network"],
      administrative: ["Security Policy", "Compliance Training", "Incident Response", "Risk Assessment"],
      physical: ["Biometric Access", "CCTV", "Secure Data Center", "Environmental Controls"]
    },
    financial: {
      technical: ["Next-Gen Firewall", "IDS/IPS", "Encryption", "Database Monitoring"],
      administrative: ["Security Awareness", "Incident Response", "Change Management", "Risk Assessment"],
      physical: ["Biometric Access", "Security Guards", "Secure Data Center", "Backup Power"]
    },
    ecommerce: {
      technical: ["WAF", "API Gateway", "DLP", "Container Security"],
      administrative: ["Security Policy", "Phishing Training", "Incident Response", "Change Management"],
      physical: ["Physical Locks", "CCTV", "Fire Suppression", "Secure Data Center"]
    },
    industrial: {
      technical: ["Network Segmentation", "IDS/IPS", "VPN", "Zero Trust Network"],
      administrative: ["Security Policy", "Incident Response Drills", "Change Management", "Risk Assessment"],
      physical: ["Security Guards", "CCTV", "Environmental Controls", "Backup Power"]
    }
  };

  // Update the threat scenarios to be industry-specific
  const industryThreatScenarios = {
    healthcare: [
      {
        name: "Patient Data Breach Attempt",
        type: "external",
        severity: "critical",
        controls: ["Encryption", "DLP", "Zero Trust Network"],
        response: ["Isolate affected systems", "Engage IR team", "Notify compliance officer"]
      },
      {
        name: "Ransomware Attack",
        type: "malware",
        severity: "critical",
        controls: ["WAF", "Zero Trust Network", "Security Policy"],
        response: ["Isolate infected systems", "Activate backup", "Contact authorities"]
      },
      {
        name: "Insider Data Theft",
        type: "internal",
        severity: "high",
        controls: ["DLP", "Biometric Access", "Security Policy"],
        response: ["Review access logs", "Restrict privileges", "Document evidence"]
      }
    ],
    financial: [
      {
        name: "Fraudulent Transaction",
        type: "external",
        severity: "critical",
        controls: ["Next-Gen Firewall", "IDS/IPS", "Database Monitoring"],
        response: ["Block suspicious transactions", "Alert fraud team", "Freeze affected accounts"]
      },
      {
        name: "API Attack",
        type: "external",
        severity: "high",
        controls: ["Next-Gen Firewall", "IDS/IPS", "Security Policy"],
        response: ["Rate limit API", "Review logs", "Update WAF rules"]
      },
      {
        name: "Physical Security Breach",
        type: "physical",
        severity: "critical",
        controls: ["Biometric Access", "Security Guards", "CCTV"],
        response: ["Lock down facility", "Alert security", "Review camera footage"]
      }
    ],
    ecommerce: [
      {
        name: "Card Skimming Attack",
        type: "external",
        severity: "critical",
        controls: ["WAF", "API Gateway", "DLP"],
        response: ["Block suspicious endpoints", "Alert security team", "Scan for malware"]
      },
      {
        name: "DDoS Attack",
        type: "external",
        severity: "high",
        controls: ["WAF", "API Gateway", "Container Security"],
        response: ["Enable DDoS protection", "Scale resources", "Filter traffic"]
      },
      {
        name: "Supply Chain Attack",
        type: "external",
        severity: "critical",
        controls: ["Container Security", "Security Policy", "Change Management"],
        response: ["Audit dependencies", "Isolate affected systems", "Update security policies"]
      }
    ],
    industrial: [
      {
        name: "SCADA System Breach",
        type: "external",
        severity: "critical",
        controls: ["Network Segmentation", "IDS/IPS", "VPN"],
        response: ["Isolate OT network", "Enable backup controls", "Alert response team"]
      },
      {
        name: "Physical Sabotage Attempt",
        type: "physical",
        severity: "critical",
        controls: ["Security Guards", "CCTV", "Environmental Controls"],
        response: ["Lock down facility", "Alert security", "Review camera footage"]
      },
      {
        name: "Control System Manipulation",
        type: "internal",
        severity: "high",
        controls: ["Network Segmentation", "Zero Trust Network", "Security Policy"],
        response: ["Revert to safe state", "Audit access logs", "Enable manual controls"]
      }
    ]
  };

  // Simulated monitoring metrics update
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        threatDetections: prev.threatDetections + Math.floor(Math.random() * 3),
        falsePositives: prev.falsePositives + Math.floor(Math.random() * 2),
        controlEffectiveness: Math.min(100, Math.max(70, prev.controlEffectiveness + (Math.random() * 6 - 3))),
        complianceScore: Math.min(100, Math.max(80, prev.complianceScore + (Math.random() * 4 - 2)))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Add this useEffect to update active controls when scenario changes
  useEffect(() => {
    const newControls = [
      ...industrySpecificControls[activeScenario].technical,
      ...industrySpecificControls[activeScenario].administrative,
      ...industrySpecificControls[activeScenario].physical
    ];
    setActiveControls(newControls);
  }, [activeScenario]);

  const ControlEffectiveness = ({ control }: { control: Control }) => {
    const isActive = activeControls.includes(control.name);
    
    return (
      <div className={`space-y-2 ${!isActive ? 'opacity-50' : ''}`}>
        <div className="flex justify-between text-sm">
          <span>{control.name}</span>
          <span>{isActive ? `${control.effectiveness}%` : 'Inactive'}</span>
        </div>
        <div className="h-2 w-full bg-gray-200 rounded">
          <div 
            className={`h-full rounded transition-all duration-500 ${
              !isActive ? 'bg-gray-400' :
              control.effectiveness >= 90 ? 'bg-green-500' :
              control.effectiveness >= 80 ? 'bg-blue-500' :
              'bg-yellow-500'
            }`}
            style={{ width: isActive ? `${control.effectiveness}%` : '0%' }}
          />
        </div>
      </div>
    );
  };

  const ScenarioCard = ({ scenario, isActive }) => {
    const ScenarioIcon = industryScenarios[scenario].icon;
    
    return (
      <Card 
        className={`cursor-pointer transition-all h-full ${
          isActive ? 'ring-2 ring-blue-500' : 'hover:bg-slate-50'
        }`}
        onClick={() => setActiveScenario(scenario)}
      >
        <CardHeader>
          <div className="flex items-center gap-2">
            <ScenarioIcon className="h-6 w-6 text-slate-600" />
            <CardTitle className="text-lg">{industryScenarios[scenario].name}</CardTitle>
          </div>
          <CardDescription className="mt-2">{industryScenarios[scenario].description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2 text-sm text-slate-700">Key Requirements</h4>
              <ul className="list-disc pl-4 space-y-1 text-sm text-slate-600">
                {industryScenarios[scenario].requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
            {isActive && (
              <div>
                <h4 className="font-medium mb-2 text-sm text-slate-700">Primary Threats</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm text-slate-600">
                  {industryScenarios[scenario].threats.map((threat, idx) => (
                    <li key={idx}>{threat}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  // Update the handleThreatScenarioClick function
  const handleThreatScenarioClick = (scenario) => {
    setSelectedThreatDetails(scenario);
    
    // Check if required controls are active
    const missingControls = scenario.controls.filter(
      control => !activeControls.includes(control)
    );
    
    // Update metrics
    setMetrics(prev => ({
      ...prev,
      threatDetections: prev.threatDetections + 1,
      controlEffectiveness: missingControls.length > 0 
        ? Math.max(70, prev.controlEffectiveness - 5)
        : Math.min(100, prev.controlEffectiveness + 2)
    }));
    
    if (missingControls.length > 0) {
      // Create a more detailed alert using the Alert component
      const alertMessage = (
        <Alert variant="destructive">
          <AlertTitle>Missing Security Controls</AlertTitle>
          <AlertDescription>
            <p>The following controls are required but not active:</p>
            <ul className="list-disc pl-4 mt-2">
              {missingControls.map((control, idx) => (
                <li key={idx}>{control}</li>
              ))}
            </ul>
            <p className="mt-2">Activate these controls to improve security posture.</p>
          </AlertDescription>
        </Alert>
      );
      // You'll need to implement a way to show this alert in your UI
      // For now, we'll use a simple alert
      alert(`Warning: Missing required controls: ${missingControls.join(', ')}`);
    } else {
      // Show success message for having all required controls
      alert('All required controls are active. Good security posture!');
    }
  };

  return (
    <div className="w-full max-w-6xl space-y-6 p-4">
      {/* Main Title */}
      <Card className="bg-gradient-to-r from-indigo-50 to-indigo-100">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-indigo-600" />
            <div>
              <CardTitle>Security Controls Implementation</CardTitle>
              <CardDescription>Industry-Specific Security Control Framework</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Industry Scenarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.keys(industryScenarios).map(scenario => (
          <ScenarioCard 
            key={scenario}
            scenario={scenario}
            isActive={activeScenario === scenario}
          />
        ))}
      </div>

      {/* Security Controls and Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Selection */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Active Security Controls</CardTitle>
            <CardDescription>
              Controls configured for {industryScenarios[activeScenario].name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Technical Controls */}
              <div className="space-y-4">
                <h3 className="font-medium">Technical Controls</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {industrySpecificControls[activeScenario].technical.map((control, idx) => (
                    <div key={idx} className="space-y-2">
                      <ControlEffectiveness 
                        control={{
                          name: control,
                          effectiveness: Math.floor(Math.random() * 20) + 80 // Random effectiveness between 80-100
                        }} 
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Administrative Controls */}
              <div className="space-y-4">
                <h3 className="font-medium">Administrative Controls</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {industrySpecificControls[activeScenario].administrative.map((control, idx) => (
                    <div key={idx} className="space-y-2">
                      <ControlEffectiveness 
                        control={{
                          name: control,
                          effectiveness: Math.floor(Math.random() * 20) + 80
                        }} 
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Physical Controls */}
              <div className="space-y-4">
                <h3 className="font-medium">Physical Controls</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {industrySpecificControls[activeScenario].physical.map((control, idx) => (
                    <div key={idx} className="space-y-2">
                      <ControlEffectiveness 
                        control={{
                          name: control,
                          effectiveness: Math.floor(Math.random() * 20) + 80
                        }} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monitoring Dashboard */}
        <Card>
          <CardHeader>
            <CardTitle>Security Metrics</CardTitle>
            <CardDescription>Real-time monitoring data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Detection Metrics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold">{metrics.threatDetections}</div>
                    <div className="text-sm text-gray-600">Threats Detected</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="text-2xl font-bold">{metrics.falsePositives}</div>
                    <div className="text-sm text-gray-600">False Positives</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Performance</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Control Effectiveness</span>
                      <span>{Math.round(metrics.controlEffectiveness)}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded">
                      <div 
                        className="h-full bg-green-500 rounded transition-all duration-500"
                        style={{ width: `${metrics.controlEffectiveness}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Compliance Score</span>
                      <span>{Math.round(metrics.complianceScore)}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-200 rounded">
                      <div 
                        className="h-full bg-blue-500 rounded transition-all duration-500"
                        style={{ width: `${metrics.complianceScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Threat Response Scenarios */}
      <Card>
        <CardHeader>
          <CardTitle>Threat Response Scenarios</CardTitle>
          <CardDescription>
            Industry-specific scenarios for {industryScenarios[activeScenario].name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {industryThreatScenarios[activeScenario].map((scenario, idx) => (
              <div 
                key={idx}
                className="p-4 border rounded-lg hover:bg-slate-50 cursor-pointer transition-all"
                onClick={() => handleThreatScenarioClick(scenario)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{scenario.name}</span>
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    scenario.severity === 'critical' ? 'bg-red-100 text-red-700' :
                    scenario.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {scenario.severity}
                  </span>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium">Required Controls:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {scenario.controls.map((control, idx) => (
                        <span 
                          key={idx}
                          className={`text-xs px-2 py-1 rounded-full ${
                            activeControls.includes(control)
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {control}
                        </span>
                      ))}
                    </div>
                  </div>
                  {selectedThreatDetails === scenario && (
                    <div className="mt-2 p-3 bg-slate-50 rounded-lg">
                      <span className="text-sm font-medium">Response Steps:</span>
                      <ul className="list-disc pl-4 mt-1 text-sm">
                        {scenario.response.map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Incident Response Simulation */}
      <Card>
        <CardHeader>
          <CardTitle>Incident Response Simulation</CardTitle>
          <CardDescription>Interactive security incident handling demonstration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Incident Trigger */}
            <div className="flex gap-4">
              <button
                onClick={() => setIncidentInProgress(true)}
                className={`px-4 py-2 rounded-lg ${
                  !incidentInProgress 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-gray-100 cursor-not-allowed'
                }`}
                disabled={incidentInProgress}
              >
                Simulate Incident
              </button>
              <button
                onClick={() => setIncidentInProgress(false)}
                className={`px-4 py-2 rounded-lg ${
                  incidentInProgress 
                    ? 'bg-green-500 text-white hover:bg-green-600' 
                    : 'bg-gray-100 cursor-not-allowed'
                }`}
                disabled={!incidentInProgress}
              >
                Resolve Incident
              </button>
            </div>

            {/* Incident Status */}
            {incidentInProgress && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="font-medium">Active Incident Response</span>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-2 bg-white rounded">
                      <div className="text-sm font-medium">Affected Systems</div>
                      <div className="text-2xl">3</div>
                    </div>
                    <div className="p-2 bg-white rounded">
                      <div className="text-sm font-medium">Response Time</div>
                      <div className="text-2xl">2m 30s</div>
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Active Controls:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <span className="px-2 py-1 bg-blue-100 rounded-full">IDS/IPS</span>
                      <span className="px-2 py-1 bg-blue-100 rounded-full">Firewall</span>
                      <span className="px-2 py-1 bg-blue-100 rounded-full">DLP</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Compliance and Best Practices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Alert className="bg-indigo-50 border-indigo-200">
          <AlertTitle>Implementation Best Practices</AlertTitle>
          <AlertDescription>
            <ul className="list-disc pl-4 space-y-2 mt-2">
              <li>Layer security controls for defense in depth</li>
              <li>Regular testing and validation of controls</li>
              <li>Maintain detailed documentation and procedures</li>
              <li>Conduct periodic risk assessments</li>
              <li>Ensure proper staff training and awareness</li>
            </ul>
          </AlertDescription>
        </Alert>

        <Alert className="bg-green-50 border-green-200">
          <AlertTitle>Control Monitoring Guidelines</AlertTitle>
          <AlertDescription>
            <ul className="list-disc pl-4 space-y-2 mt-2">
              <li>Establish clear metrics for control effectiveness</li>
              <li>Regular auditing of control performance</li>
              <li>Monitor for security control gaps</li>
              <li>Track and analyze security incidents</li>
              <li>Regular compliance assessments</li>
            </ul>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};

export default SecurityControlsVisualization;