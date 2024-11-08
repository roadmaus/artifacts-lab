import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Shield, AlertTriangle, Target, Wrench, Share2, Globe2, Hash } from 'lucide-react';

const PyramidOfPain = () => {
  const [expandedLevel, setExpandedLevel] = useState(null);

  const levels = [
    {
      name: "Hash Values",
      color: "bg-gradient-to-br from-purple-600 to-purple-400",
      pain: "Trivial",
      icon: Hash,
      description: "Unique fingerprints of files used by attackers.",
      examples: ["MD5 hashes", "SHA1 hashes", "SHA256 hashes"],
      impact: "Low - Trivial to modify and create new hashes",
      detection: ["File scanning", "Hash databases", "YARA rules"],
      countermeasures: [
        "Anti-virus signatures",
        "Hash-based blocking",
        "File reputation services"
      ]
    },
    {
      name: "IP Addresses",
      color: "bg-gradient-to-br from-blue-600 to-blue-400",
      pain: "Irritating",
      icon: Target,
      description: "IP addresses used by adversary infrastructure.",
      examples: ["C2 servers", "Staging servers", "Scanning IPs"],
      impact: "Low to Moderate - Easy to change but requires infrastructure setup",
      detection: ["Network monitoring", "IP reputation", "Traffic analysis"],
      countermeasures: [
        "IP blocking",
        "Network segmentation",
        "Firewall rules"
      ]
    },
    {
      name: "Domain Names",
      color: "bg-gradient-to-br from-green-600 to-green-400",
      pain: "Annoying",
      icon: Globe2,
      description: "Domain names used for C2 servers, phishing, or other malicious purposes.",
      examples: ["Command & Control domains", "Phishing domains", "DGA domains"],
      impact: "Moderate - Requires new domain registration and infrastructure",
      detection: ["DNS monitoring", "Domain reputation", "WHOIS analysis"],
      countermeasures: [
        "DNS filtering",
        "Domain monitoring",
        "Real-time blocklists"
      ]
    },
    {
      name: "Network/Host Artifacts",
      color: "bg-gradient-to-br from-yellow-600 to-yellow-400",
      pain: "Painful",
      icon: Share2,
      description: "The traces and observables left on systems and networks during attack execution.",
      examples: ["Registry keys", "Mutex names", "File paths", "Process relationships"],
      impact: "Moderate to High - Requires significant effort to modify artifacts",
      detection: ["Log analysis", "File system monitoring", "Registry monitoring"],
      countermeasures: [
        "Host-based IDS/IPS",
        "File integrity monitoring",
        "System auditing"
      ]
    },
    {
      name: "Tools",
      color: "bg-gradient-to-br from-orange-600 to-orange-400",
      pain: "Excruciating",
      icon: Wrench,
      description: "The custom or commercially available software used by attackers to accomplish their mission.",
      examples: ["Cobalt Strike", "Mimikatz", "PowerSploit", "Custom malware"],
      impact: "High - Forces attackers to modify or rewrite their tools",
      detection: ["File analysis", "Memory analysis", "Network behavior"],
      countermeasures: [
        "Application whitelisting",
        "Advanced malware detection",
        "Behavioral monitoring"
      ]
    },
    {
      name: "TTPs",
      color: "bg-gradient-to-br from-red-700 to-red-500",
      pain: "Burning",
      icon: Shield,
      description: "Tactics, Techniques & Procedures represent the highest level of adversary behavior. These are the hardest indicators to change and cause the most pain when blocked.",
      examples: ["Living off the land techniques", "Pass-the-hash attacks", "DLL side-loading"],
      impact: "Critical - Disrupting TTPs forces attackers to redevelop their entire methodology",
      detection: ["Behavior analytics", "EDR solutions", "MITRE ATT&CK mapping"],
      countermeasures: [
        "Implementation of Zero Trust architecture",
        "Regular threat hunting exercises",
        "Advanced EDR/XDR solutions"
      ]
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-slate-50 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-center mb-4 text-slate-800">Pyramid of Pain</h2>
      <p className="text-center mb-8 text-slate-600">Click each level to explore threat indicators and their impact</p>
      
      <div className="flex flex-col items-center">
        {levels.map((level, index) => {
          const isExpanded = expandedLevel === index;
          const width = `${32 + (index * 14)}%`; // Starts narrow at top, gets wider at bottom
          const Icon = level.icon;
          
          return (
            <div
              key={level.name}
              className="w-full flex flex-col items-center mb-1"
              style={{ maxWidth: width }}
            >
              <div
                className={`${level.color} w-full p-3 cursor-pointer
                           transition-all duration-300 hover:shadow-lg
                           flex items-center justify-between text-white font-semibold
                           ${isExpanded ? 'rounded-t-lg' : 'rounded-lg shadow-md'}
                           ${index === 0 ? 'rounded-t-lg' : ''}
                           ${index === levels.length - 1 ? 'rounded-b-lg' : ''}`}
                onClick={() => setExpandedLevel(isExpanded ? null : index)}
              >
                <div className="flex items-center">
                  <Icon size={18} className="mr-2" />
                  <span className="text-sm md:text-base">{level.name}</span>
                </div>
                <div className="flex items-center text-sm md:text-base">
                  <span className="mr-2">{level.pain}</span>
                  {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </div>
              
              {isExpanded && (
                <div className="w-full bg-white p-6 rounded-b-lg shadow-xl border-t-0 mb-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-slate-800">Overview</h3>
                        <p className="text-slate-700">{level.description}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-bold mb-2 text-slate-800">Examples</h4>
                        <ul className="list-disc list-inside text-slate-700 space-y-1">
                          {level.examples.map((example, i) => (
                            <li key={i} className="ml-2">{example}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold mb-2 text-slate-800">Impact</h4>
                        <p className="text-slate-700">{level.impact}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-bold mb-2 text-slate-800">Detection Methods</h4>
                        <ul className="list-disc list-inside text-slate-700 space-y-1">
                          {level.detection.map((method, i) => (
                            <li key={i} className="ml-2">{method}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-bold mb-2 text-slate-800">Counter</h4>
                        <ul className="list-disc list-inside text-slate-700 space-y-1">
                          {level.countermeasures.map((measure, i) => (
                            <li key={i} className="ml-2">{measure}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="mt-8 text-center text-slate-600 text-sm">
        <p>The Pyramid of Pain demonstrates how different types of threat indicators impact adversaries when denied to them - from easily changeable hashes at the bottom to difficult-to-modify TTPs at the top.</p>
      </div>
    </div>
  );
};

export default PyramidOfPain;
