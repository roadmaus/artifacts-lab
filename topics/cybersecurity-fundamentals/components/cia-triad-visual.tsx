import React, { useState } from 'react';
import { Triangle, Lock, Shield, Signal } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const CIATriadVisual = () => {
  const [activeElement, setActiveElement] = useState(null);
  
  const elements = [
    {
      id: 'confidentiality',
      title: 'Confidentiality',
      shortTitle: 'C',
      icon: Lock,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500',
      bgHover: 'hover:bg-blue-600',
      lightBg: 'bg-blue-50',
      description: 'Protecting sensitive information from unauthorized access',
      examples: [
        'Encryption at rest and in transit',
        'Role-based access control (RBAC)',
        'Data classification'
      ]
    },
    {
      id: 'integrity',
      title: 'Integrity',
      shortTitle: 'I',
      icon: Shield,
      color: 'text-green-500',
      bgColor: 'bg-green-500',
      bgHover: 'hover:bg-green-600',
      lightBg: 'bg-green-50',
      description: 'Ensuring data accuracy and preventing unauthorized modifications',
      examples: [
        'Cryptographic hashing (SHA-256)',
        'Digital signatures',
        'Version control systems'
      ]
    },
    {
      id: 'availability',
      title: 'Availability',
      shortTitle: 'A',
      icon: Signal,
      color: 'text-red-500',
      bgColor: 'bg-red-500',
      bgHover: 'hover:bg-red-600',
      lightBg: 'bg-red-50',
      description: 'Maintaining reliable access to systems and data',
      examples: [
        'High-availability clusters',
        'Load balancers',
        'Disaster recovery planning'
      ]
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-3xl">
            <Triangle className="h-8 w-8" />
            The CIA Triad
          </CardTitle>
          <CardDescription className="text-gray-300">
            The three fundamental objectives of information security
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Main Visual Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {elements.map((element, index) => (
              <div
                key={element.id}
                className={`relative group cursor-pointer transition-all duration-300 ${
                  activeElement === element.id ? 'scale-105' : ''
                }`}
                onMouseEnter={() => setActiveElement(element.id)}
                onClick={() => setActiveElement(element.id)}
              >
                {/* Main Card */}
                <div className={`rounded-lg p-6 ${element.lightBg}`}>
                  {/* Large Letter Badge */}
                  <div className={`absolute -top-4 -left-4 w-12 h-12 ${element.bgColor} rounded-full
                    flex items-center justify-center text-white text-2xl font-bold shadow-lg
                    transform transition-transform group-hover:scale-110`}>
                    {element.shortTitle}
                  </div>
                  
                  {/* Content */}
                  <div className="pt-4">
                    <div className={`flex items-center gap-2 ${activeElement === element.id ? element.color : 'text-gray-800'}`}>
                      <element.icon className="h-6 w-6" />
                      <h3 className="text-xl font-bold">{element.title}</h3>
                    </div>
                    <p className="mt-2 text-gray-600 text-sm">{element.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Details Panel */}
          <div className={`rounded-lg p-6 transition-all duration-300 ${
            activeElement 
              ? elements.find(e => e.id === activeElement)?.lightBg
              : 'bg-gray-50'
          }`}>
            {activeElement ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${elements.find(e => e.id === activeElement)?.bgColor}`}>
                    {React.createElement(elements.find(e => e.id === activeElement)?.icon, {
                      className: 'h-6 w-6 text-white'
                    })}
                  </div>
                  <h3 className={`text-2xl font-bold ${elements.find(e => e.id === activeElement)?.color}`}>
                    {elements.find(e => e.id === activeElement)?.title}
                  </h3>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold mb-3 text-gray-800">Implementation Examples:</h4>
                  <ul className="space-y-2">
                    {elements
                      .find(e => e.id === activeElement)
                      ?.examples.map((example, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-700">
                          <div className={`w-2 h-2 rounded-full ${elements.find(e => e.id === activeElement)?.bgColor}`} />
                          {example}
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <p className="text-lg">Select any component to see detailed examples and implementations</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CIATriadVisual;
