import React from 'react';
import { ShieldAlert, Target, FileCheck, ChevronDown, ChevronUp, Info } from 'lucide-react';

const RiskManagementFramework = () => {
  const [activeSection, setActiveSection] = React.useState('governance');
  const [showTooltip, setShowTooltip] = React.useState('');
  const [expandedPoints, setExpandedPoints] = React.useState({});

  const frameworks = {
    governance: {
      title: 'Security Governance',
      icon: ShieldAlert,
      color: 'bg-blue-500',
      introduction: 'Security Governance forms the foundation of an organization\'s security program, ensuring alignment between security initiatives and business objectives.',
      components: [
        {
          name: 'Strategy',
          description: 'Define security objectives aligned with business goals',
          examples: ['NIST CSF implementation', 'Security metrics dashboard'],
          learning: 'Security strategy involves creating a roadmap that balances protection of assets with business growth. The NIST CSF provides a framework for developing comprehensive security programs.'
        },
        {
          name: 'Policy Framework',
          description: 'Establish guidelines and procedures',
          examples: ['Access control policies', 'Incident response procedures'],
          learning: 'Policy Framework involves creating guidelines and procedures to ensure security across the organization. Access control policies define who can access certain resources, while incident response procedures outline how to respond to security incidents.'
        },
        {
          name: 'Oversight',
          description: 'Monitor and review security effectiveness',
          examples: ['Security steering committee', 'Regular audits'],
          learning: 'Oversight involves monitoring and reviewing security effectiveness to ensure that security initiatives are meeting their objectives. Security steering committees provide oversight by reviewing security initiatives and making recommendations.'
        }
      ]
    },
    risk: {
      title: 'Risk Management',
      icon: Target,
      color: 'bg-red-500',
      introduction: 'Risk Management is the systematic process of identifying, assessing, and responding to security risks that could impact an organization.',
      components: [
        {
          name: 'Identification',
          description: 'Discover potential threats and vulnerabilities',
          examples: ['Threat modeling', 'Asset inventory'],
          learning: 'Risk identification involves systematic analysis of potential threats, vulnerabilities, and their potential impact on business assets. Threat modeling helps visualize and prioritize security risks.'
        },
        {
          name: 'Assessment',
          description: 'Evaluate risk impact and likelihood',
          examples: ['FAIR analysis', 'Risk scoring matrix'],
          learning: 'Risk assessment involves evaluating the impact and likelihood of security risks. FAIR analysis provides a framework for evaluating risk, while risk scoring matrix helps prioritize security risks.'
        },
        {
          name: 'Treatment',
          description: 'Implement controls and mitigation strategies',
          examples: ['Control implementation', 'Risk transfer'],
          learning: 'Risk treatment involves implementing controls and mitigation strategies to reduce the likelihood and impact of security risks. Control implementation involves deploying security controls, while risk transfer involves transferring security risks to third parties.'
        }
      ]
    },
    compliance: {
      title: 'Compliance Management',
      icon: FileCheck,
      color: 'bg-green-500',
      introduction: 'Compliance Management ensures that an organization adheres to laws and regulations.',
      components: [
        {
          name: 'Regulatory',
          description: 'Ensure adherence to laws and regulations',
          examples: ['GDPR compliance', 'HIPAA requirements'],
          learning: 'Regulatory compliance involves ensuring that an organization adheres to laws and regulations. GDPR compliance involves complying with the General Data Protection Regulation, while HIPAA compliance involves complying with the Health Insurance Portability and Accountability Act.'
        },
        {
          name: 'Standards',
          description: 'Follow industry best practices',
          examples: ['ISO 27001', 'PCI DSS'],
          learning: 'Standards compliance involves following industry best practices. ISO 27001 compliance involves implementing an information security management system, while PCI DSS compliance involves following the Payment Card Industry Data Security Standard.'
        },
        {
          name: 'Documentation',
          description: 'Maintain compliance evidence',
          examples: ['Audit trails', 'Policy documentation'],
          learning: 'Documentation compliance involves maintaining compliance evidence. Audit trails provide evidence of compliance activities, while policy documentation provides guidelines for compliance.'
        }
      ]
    }
  };

  const togglePoint = (sectionKey) => {
    setExpandedPoints((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="flex items-center gap-2 text-2xl font-bold mb-6">
            <ShieldAlert className="h-6 w-6" />
            Security and Risk Management Framework
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {Object.entries(frameworks).map(([key, section]) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`p-4 rounded-lg transition-all ${
                  activeSection === key 
                    ? `${section.color} text-white shadow-lg transform scale-105` 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <section.icon className="h-8 w-8" />
                  <span className="font-semibold">{section.title}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                {frameworks[activeSection].icon && 
                  React.createElement(frameworks[activeSection].icon, {
                    className: "h-6 w-6"
                  })
                }
                {frameworks[activeSection].title}
              </h3>
              
              <p className="text-gray-700 mb-4">
                {frameworks[activeSection].introduction}
              </p>
            </div>

            <div className="space-y-4">
              {frameworks[activeSection].components.map((component, idx) => (
                <div key={idx} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg flex items-center gap-2">
                        {component.name}
                        <Info
                          className="h-4 w-4 text-gray-400 cursor-help"
                          onMouseEnter={() => setShowTooltip(`${activeSection}-${idx}`)}
                          onMouseLeave={() => setShowTooltip('')}
                        />
                      </h4>
                      {showTooltip === `${activeSection}-${idx}` && (
                        <div className="mt-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                          {component.description}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => togglePoint(`${activeSection}-${idx}`)}
                      className="text-gray-500 hover:text-gray-700"
                      aria-expanded={expandedPoints[`${activeSection}-${idx}`]}
                      aria-label={expandedPoints[`${activeSection}-${idx}`] ? "Collapse section" : "Expand section"}
                    >
                      {expandedPoints[`${activeSection}-${idx}`] ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  {expandedPoints[`${activeSection}-${idx}`] && (
                    <div className="mt-3 space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h5 className="font-semibold text-blue-800 mb-2">Learn More:</h5>
                        <p className="text-blue-900">{component.learning}</p>
                      </div>

                      <div className="pl-4 border-l-2 border-gray-200">
                        <p className="text-sm text-gray-600 mb-2">Examples:</p>
                        <ul className="list-disc list-inside text-sm text-gray-700">
                          {component.examples.map((example, i) => (
                            <li key={i} className="mb-1">{example}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskManagementFramework;
