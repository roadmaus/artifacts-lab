import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { 
  ArrowRight, 
  Clock, 
  Shield, 
  AlertTriangle, 
  SplitSquareVertical,
  KeyRound
} from 'lucide-react';

const DESVisualization = () => {
  const [activeFeistelStep, setActiveFeistelStep] = useState(0);
  
  const timelineEvents = [
    {
      year: 1973,
      event: "IBM begins development",
      icon: <Clock className="w-5 h-5 text-blue-500" />,
      details: "IBM starts developing DES in response to NIST's call for encryption standards"
    },
    {
      year: 1977,
      event: "Adopted as standard",
      icon: <Shield className="w-5 h-5 text-green-500" />,
      details: "DES becomes the official FIPS standard for encryption"
    },
    {
      year: 1999,
      event: "First successful attack",
      icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
      details: "Distributed.net and EFF break DES encryption in less than 24 hours"
    },
    {
      year: 2002,
      event: "Replaced by AES",
      icon: <KeyRound className="w-5 h-5 text-red-500" />,
      details: "DES is officially replaced by AES as the standard encryption algorithm"
    }
  ];

  const feistelSteps = [
    {
      title: "Initial Split",
      description: "64-bit input block is split into left (L0) and right (R0) halves",
      color: "blue"
    },
    {
      title: "Round Function",
      description: "Right half goes through F-function with round key",
      color: "green"
    },
    {
      title: "XOR Operation",
      description: "F-function output is XORed with left half",
      color: "orange"
    },
    {
      title: "Swap Halves",
      description: "Right half becomes new left half, XOR result becomes new right half",
      color: "purple"
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 p-6">
      {/* Title Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Data Encryption Standard (DES)</h1>
        <p className="text-gray-600">A Historical Perspective on the First Standardized Encryption Algorithm</p>
      </div>

      {/* Timeline Section */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Historical Timeline</h2>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
          <div className="space-y-8">
            {timelineEvents.map((event, index) => (
              <div key={event.year} className="flex items-start gap-4">
                <div className="relative z-10 rounded-full p-2 bg-white border-2 border-gray-200">
                  {event.icon}
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-gray-800">{event.year}</span>
                    <span className="font-medium text-gray-700">{event.event}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{event.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Feistel Network Structure */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Feistel Network Structure</h2>
        <div className="grid grid-cols-2 gap-8">
          {/* Visual Representation */}
          <div className="relative">
            <div className="aspect-square border-2 border-gray-200 rounded-lg p-4">
              <div className="h-full flex flex-col justify-between">
                {/* Input Block */}
                <div className="w-full h-16 bg-blue-100 border-2 border-blue-300 rounded-lg flex items-center justify-center">
                  <span className="font-mono">64-bit Input Block</span>
                </div>
                
                {/* Middle Processing */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 w-full">
                    <div className={`h-20 border-2 rounded-lg flex items-center justify-center
                      ${activeFeistelStep === 0 ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                      L0
                    </div>
                    <div className={`h-20 border-2 rounded-lg flex items-center justify-center
                      ${activeFeistelStep === 0 ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}>
                      R0
                    </div>
                  </div>
                </div>

                {/* Output Block */}
                <div className="w-full h-16 bg-green-100 border-2 border-green-300 rounded-lg flex items-center justify-center">
                  <span className="font-mono">64-bit Output Block</span>
                </div>
              </div>
            </div>
          </div>

          {/* Steps Description */}
          <div className="space-y-4">
            {feistelSteps.map((step, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${activeFeistelStep === index 
                    ? `border-${step.color}-500 bg-${step.color}-50` 
                    : 'border-gray-200'}`}
                onClick={() => setActiveFeistelStep(index)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <SplitSquareVertical className={`w-5 h-5 text-${step.color}-500`} />
                  <h3 className="font-semibold">{step.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Key Features and Limitations */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="font-semibold text-gray-700 mb-3">Key Features</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-blue-500" />
              64-bit block size
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-blue-500" />
              16 rounds of Feistel structure
            </li>
            <li className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4 text-blue-500" />
              Symmetric key algorithm
            </li>
          </ul>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold text-gray-700 mb-3">Limitations</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              56-bit key size (too small)
            </li>
            <li className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              Vulnerable to brute force attacks
            </li>
            <li className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              Obsolete for modern security needs
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default DESVisualization;
