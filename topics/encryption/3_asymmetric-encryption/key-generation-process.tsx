import React, { useState } from 'react';
import { ArrowRight, Lock, Key, Shield, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Step = ({ title, children, isActive, isComplete }) => (
  <div className={`p-4 border rounded-lg mb-4 transition-all duration-300 ${
    isActive ? 'border-blue-500 shadow-lg' : 'border-gray-200'
  } ${isComplete ? 'bg-gray-50' : ''}`}>
    <h3 className="font-semibold mb-2 flex items-center gap-2">
      {isComplete && <div className="w-2 h-2 rounded-full bg-green-500" />}
      {title}
    </h3>
    <div className={`transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
      {children}
    </div>
  </div>
);

const NumberInput = ({ value, onChange, min, max, label }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(parseInt(e.target.value))}
      min={min}
      max={max}
      className="w-full p-2 border rounded"
    />
  </div>
);

const AsymmetricKeyGeneration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [p, setP] = useState(61);
  const [q, setQ] = useState(53);
  const [n, setN] = useState(0);
  const [totient, setTotient] = useState(0);
  const [e] = useState(65537);
  const [d, setD] = useState(0);

  const calculateN = () => {
    const newN = p * q;
    setN(newN);
    setCurrentStep(1);
  };

  const calculateTotient = () => {
    const newTotient = (p - 1) * (q - 1);
    setTotient(newTotient);
    setCurrentStep(2);
  };

  const calculateD = () => {
    // Simple modular multiplicative inverse calculation (for demonstration)
    let d = 1;
    while (((d * e) % totient) !== 1) {
      d++;
      if (d > 100000) break; // Prevent infinite loop
    }
    setD(d);
    setCurrentStep(3);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="text-blue-500" />
          Asymmetric Key Generation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            This is a simplified demonstration. Real-world implementations use much larger prime numbers.
          </AlertDescription>
        </Alert>

        <Step 
          title="1. Select Prime Numbers" 
          isActive={currentStep === 0}
          isComplete={currentStep > 0}
        >
          <div className="grid grid-cols-2 gap-4">
            <NumberInput
              value={p}
              onChange={setP}
              min={2}
              max={100}
              label="Prime p"
            />
            <NumberInput
              value={q}
              onChange={setQ}
              min={2}
              max={100}
              label="Prime q"
            />
          </div>
          <button
            onClick={calculateN}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Calculate n
          </button>
        </Step>

        <Step 
          title="2. Calculate Product (n)" 
          isActive={currentStep === 1}
          isComplete={currentStep > 1}
        >
          <div className="flex items-center gap-2 mb-4">
            <span>n = p × q = {p} × {q} = {n}</span>
          </div>
          <button
            onClick={calculateTotient}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Calculate Totient
          </button>
        </Step>

        <Step 
          title="3. Compute Totient φ(n)" 
          isActive={currentStep === 2}
          isComplete={currentStep > 2}
        >
          <div className="flex items-center gap-2 mb-4">
            <span>φ(n) = (p-1)(q-1) = ({p}-1)({q}-1) = {totient}</span>
          </div>
          <button
            onClick={calculateD}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Calculate Private Key
          </button>
        </Step>

        <Step 
          title="4. Generate Key Pair" 
          isActive={currentStep === 3}
          isComplete={currentStep > 3}
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="text-green-500" />
                <span className="font-semibold">Public Key</span>
              </div>
              <div>
                <div>n: {n}</div>
                <div>e: {e}</div>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Key className="text-red-500" />
                <span className="font-semibold">Private Key</span>
              </div>
              <div>
                <div>n: {n}</div>
                <div>d: {d}</div>
              </div>
            </div>
          </div>
        </Step>
      </CardContent>
    </Card>
  );
};

export default AsymmetricKeyGeneration;
