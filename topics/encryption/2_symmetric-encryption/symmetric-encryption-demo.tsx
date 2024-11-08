import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Unlock, Key, ArrowRight, FileText, FileCode } from 'lucide-react';

const SymmetricEncryption = () => {
  const [plaintext, setPlaintext] = useState('Hello World');
  const [key, setKey] = useState('SECRET');
  const [ciphertext, setCiphertext] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [step, setStep] = useState(0);

  // Simple Caesar cipher for demonstration
  const encrypt = (text, key) => {
    const shift = key.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 26;
    return text
      .split('')
      .map(char => {
        if (char.match(/[a-zA-Z]/)) {
          const code = char.charCodeAt(0);
          const isUpperCase = code >= 65 && code <= 90;
          const base = isUpperCase ? 65 : 97;
          return String.fromCharCode(((code - base + shift) % 26) + base);
        }
        return char;
      })
      .join('');
  };

  const handleEncrypt = () => {
    setIsAnimating(true);
    setStep(0);
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        if (step < 3) {
          setStep(step + 1);
        } else {
          setIsAnimating(false);
          setStep(0);
        }
      }, 1000);
      
      if (step === 2) {
        setCiphertext(encrypt(plaintext, key));
      }
      
      return () => clearTimeout(timer);
    }
  }, [step, isAnimating, plaintext, key]);

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Symmetric Encryption Demonstration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <FileText className="w-6 h-6" />
              <Input
                value={plaintext}
                onChange={(e) => setPlaintext(e.target.value)}
                placeholder="Enter plaintext"
                className="flex-1"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Key className="w-6 h-6" />
              <Input
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Enter encryption key"
                className="flex-1"
              />
            </div>
          </div>

          {/* Animation Section */}
          <div className="flex items-center justify-center space-x-4 h-32">
            <div className={`transition-all duration-500 transform ${
              step >= 1 ? 'scale-110' : ''
            }`}>
              <div className="flex flex-col items-center">
                <FileText className="w-8 h-8 mb-2" />
                <div className="text-sm">Plaintext</div>
              </div>
            </div>
            
            <ArrowRight className={`w-6 h-6 transition-opacity duration-500 ${
              step >= 1 ? 'opacity-100' : 'opacity-30'
            }`} />
            
            <div className={`transition-all duration-500 transform ${
              step === 2 ? 'scale-110' : ''
            }`}>
              <div className="flex flex-col items-center">
                {step >= 2 ? <Lock className="w-8 h-8 mb-2" /> : <Unlock className="w-8 h-8 mb-2" />}
                <div className="text-sm">Encryption</div>
              </div>
            </div>
            
            <ArrowRight className={`w-6 h-6 transition-opacity duration-500 ${
              step >= 2 ? 'opacity-100' : 'opacity-30'
            }`} />
            
            <div className={`transition-all duration-500 transform ${
              step >= 3 ? 'scale-110' : ''
            }`}>
              <div className="flex flex-col items-center">
                <FileCode className="w-8 h-8 mb-2" />
                <div className="text-sm">Ciphertext</div>
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <FileCode className="w-6 h-6" />
              <Input
                value={ciphertext}
                readOnly
                placeholder="Ciphertext will appear here"
                className="flex-1 bg-gray-50"
              />
            </div>
            <Button 
              onClick={handleEncrypt}
              className="w-full"
              disabled={isAnimating}
            >
              Encrypt Message
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SymmetricEncryption;
