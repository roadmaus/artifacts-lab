import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Lock, Key, Shield, ChevronRight, RefreshCw } from 'lucide-react';

const RSAKeyGeneration = () => {
  const [step, setStep] = useState(0);
  const [p, setP] = useState(61);
  const [q, setQ] = useState(53);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const primes = [53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
  const e = 65537;
  
  const calculateN = () => p * q;
  const calculateTotient = () => (p - 1) * (q - 1);
  
  // Extended Euclidean Algorithm for modular multiplicative inverse
  const modInverse = (a, m) => {
    let [old_r, r] = [a, m];
    let [old_s, s] = [1, 0];
    
    while (r !== 0) {
      const quotient = Math.floor(old_r / r);
      [old_r, r] = [r, old_r - quotient * r];
      [old_s, s] = [s, old_s - quotient * s];
    }
    
    return old_s > 0 ? old_s : old_s + m;
  };
  
  const calculateD = () => {
    const totient = calculateTotient();
    return modInverse(e, totient);
  };

  const nextStep = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setStep(prev => Math.min(prev + 1, 4));
      setIsAnimating(false);
    }, 500);
  };

  const reset = () => {
    setStep(0);
    setP(61);
    setQ(53);
  };

  const StepBox = ({ title, content, isActive, isComplete }) => (
    <div 
      className={`
        relative p-4 rounded-lg border-2 transition-all duration-300
        ${isActive ? 'border-blue-500 bg-blue-50' : 
          isComplete ? 'border-green-500 bg-green-50' : 'border-gray-200'}
      `}
    >
      <h3 className="font-bold mb-2">{title}</h3>
      <div className={`transition-opacity duration-300 ${isActive || isComplete ? 'opacity-100' : 'opacity-50'}`}>
        {content}
      </div>
      {isComplete && (
        <div className="absolute top-2 right-2 text-green-500">
          <Shield className="w-4 h-4" />
        </div>
      )}
    </div>
  );

  return (
    <div className="p-4">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h2 className="text-xl font-bold">RSA Key Generation</h2>
              <p className="text-sm text-gray-500">Visual guide to generating secure key pairs</p>
            </div>
            <button 
              onClick={reset}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-500"
              style={{ width: `${(step + 1) * 20}%` }}
            />
          </div>

          {/* Main Visualization */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Step 1: Prime Selection */}
            <StepBox
              title="Step 1: Select Prime Numbers"
              isActive={step === 0}
              isComplete={step > 0}
              content={
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <select 
                      value={p}
                      onChange={(e) => setP(Number(e.target.value))}
                      className="p-2 border rounded"
                      disabled={step !== 0}
                    >
                      {primes.map(prime => (
                        <option key={prime} value={prime}>{prime}</option>
                      ))}
                    </select>
                    <span>p</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <select
                      value={q}
                      onChange={(e) => setQ(Number(e.target.value))}
                      className="p-2 border rounded"
                      disabled={step !== 0}
                    >
                      {primes.map(prime => (
                        <option key={prime} value={prime}>{prime}</option>
                      ))}
                    </select>
                    <span>q</span>
                  </div>
                </div>
              }
            />

            {/* Step 2: Calculate n */}
            <StepBox
              title="Step 2: Calculate n = p × q"
              isActive={step === 1}
              isComplete={step > 1}
              content={
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span>{p}</span>
                    <span>×</span>
                    <span>{q}</span>
                    <span>=</span>
                    <span className="font-bold">{calculateN()}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    This will be part of both public and private keys
                  </div>
                </div>
              }
            />

            {/* Step 3: Calculate Totient */}
            <StepBox
              title="Step 3: Calculate Totient φ(n)"
              isActive={step === 2}
              isComplete={step > 2}
              content={
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span>(</span>
                    <span>{p}</span>
                    <span>-1)(</span>
                    <span>{q}</span>
                    <span>-1) =</span>
                    <span className="font-bold">{calculateTotient()}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    Used to generate the private key
                  </div>
                </div>
              }
            />

            {/* Step 4: Public Exponent */}
            <StepBox
              title="Step 4: Choose Public Exponent (e)"
              isActive={step === 3}
              isComplete={step > 3}
              content={
                <div className="space-y-2">
                  <div className="font-bold text-lg">e = 65537</div>
                  <div className="text-sm text-gray-500">
                    Commonly used because it's a Fermat prime
                  </div>
                </div>
              }
            />
          </div>

          {/* Final Keys Display */}
          <div className={`space-y-4 transition-all duration-500 ${step === 4 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="border rounded-lg p-4 bg-green-50">
              <div className="flex items-center gap-2 mb-2">
                <Key className="text-green-500" />
                <span className="font-bold">Public Key</span>
              </div>
              <div className="font-mono text-sm">
                (n={calculateN()}, e={e})
              </div>
            </div>
            
            <div className="border rounded-lg p-4 bg-red-50">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="text-red-500" />
                <span className="font-bold">Private Key</span>
              </div>
              <div className="font-mono text-sm">
                (n={calculateN()}, d={calculateD()})
              </div>
            </div>
          </div>

          {/* Next Button */}
          {step < 4 && (
            <button
              onClick={nextStep}
              disabled={isAnimating}
              className={`
                w-full py-2 px-4 rounded-lg bg-blue-500 text-white
                hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-300
              `}
            >
              Next Step
            </button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RSAKeyGeneration;
