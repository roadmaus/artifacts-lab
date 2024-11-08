import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, Unlock, Key, Send, RefreshCw, ArrowRight, ShieldCheck } from 'lucide-react';

const AnimatedBlock = ({ children, isAnimating, direction = 'right' }) => (
  <div className={`transition-all duration-1000 transform ${
    isAnimating 
      ? `translate-${direction === 'right' ? 'x-full opacity-0' : '-x-full opacity-0'}`
      : 'translate-x-0 opacity-100'
  }`}>
    {children}
  </div>
);

const DataFlow = ({ active, color }) => (
  <div className="absolute left-0 right-0 overflow-hidden">
    <div className={`h-0.5 ${color} transition-transform duration-1500 ${
      active ? 'w-full' : 'w-0'
    }`} />
  </div>
);

const AsymmetricEncryptionDemo = () => {
  const [message, setMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeStep, setActiveStep] = useState('input');
  const [animationPhase, setAnimationPhase] = useState(null);
  
  // Enhanced encryption simulation with character transformation animation
  const animateEncryption = async (text) => {
    const base64 = btoa(text);
    const encrypted = base64.split('').map(char => char + Math.random().toString(36).charAt(2)).join('');
    
    // Animate character by character
    let current = text;
    const steps = 8; // Number of transformation steps
    
    for (let i = 0; i < steps; i++) {
      await new Promise(resolve => setTimeout(resolve, 100));
      current = current.split('').map(char => 
        String.fromCharCode(char.charCodeAt(0) + Math.floor(Math.random() * 10))
      ).join('');
      setEncryptedMessage(current);
    }
    
    // Final encrypted result
    setEncryptedMessage(encrypted);
  };

  // Enhanced decryption simulation with character transformation animation
  const animateDecryption = async (encrypted) => {
    const base64 = encrypted.split('').filter((_, i) => i % 2 === 0).join('');
    const final = atob(base64);
    
    let current = encrypted;
    const steps = 8;
    
    for (let i = 0; i < steps; i++) {
      await new Promise(resolve => setTimeout(resolve, 100));
      if (i === steps - 1) {
        current = final;
      } else {
        current = current.split('').map(char => 
          String.fromCharCode(char.charCodeAt(0) - Math.floor(Math.random() * 10))
        ).join('');
      }
      setDecryptedMessage(current);
    }
  };

  const handleEncrypt = async () => {
    setIsAnimating(true);
    setActiveStep('encrypting');
    setAnimationPhase('starting');
    
    // Phase 1: Message moves to encryption
    await new Promise(resolve => setTimeout(resolve, 500));
    setAnimationPhase('encrypting');
    
    // Phase 2: Encryption animation
    await animateEncryption(message);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Phase 3: Complete
    setAnimationPhase('encrypted');
    setActiveStep('encrypted');
    setIsAnimating(false);
  };

  const handleDecrypt = async () => {
    setIsAnimating(true);
    setActiveStep('decrypting');
    setAnimationPhase('decrypting');
    
    // Phase 1: Start decryption
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Phase 2: Decryption animation
    await animateDecryption(encryptedMessage);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Phase 3: Complete
    setAnimationPhase('completed');
    setActiveStep('decrypted');
    setIsAnimating(false);
  };

  const reset = () => {
    setMessage('');
    setEncryptedMessage('');
    setDecryptedMessage('');
    setActiveStep('input');
    setAnimationPhase(null);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Keys Section with Animation */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className={`bg-blue-50 transition-transform duration-500 ${
          activeStep === 'encrypting' ? 'scale-105' : ''
        }`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Key className={`w-5 h-5 ${
                activeStep === 'encrypting' ? 'animate-pulse' : ''
              }`} />
              Public Key (For Encryption)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`font-mono text-sm bg-white p-3 rounded border border-blue-200 ${
              activeStep === 'encrypting' ? 'border-blue-500' : ''
            }`}>
              {`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4...
-----END PUBLIC KEY-----`}
            </div>
          </CardContent>
        </Card>

        <Card className={`bg-amber-50 transition-transform duration-500 ${
          activeStep === 'decrypting' ? 'scale-105' : ''
        }`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-700">
              <Key className={`w-5 h-5 ${
                activeStep === 'decrypting' ? 'animate-pulse' : ''
              }`} />
              Private Key (For Decryption)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`font-mono text-sm bg-white p-3 rounded border border-amber-200 ${
              activeStep === 'decrypting' ? 'border-amber-500' : ''
            }`}>
              {`-----BEGIN PRIVATE KEY-----
MIICdgIBADANBgkqhkiG9w0BAQE...
-----END PRIVATE KEY-----`}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Process Section */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6 relative">
            {/* Message Input */}
            <AnimatedBlock isAnimating={animationPhase === 'starting'}>
              <div className="space-y-2">
                <label className="text-sm font-medium">Original Message:</label>
                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter a secret message..."
                    disabled={activeStep !== 'input'}
                  />
                  <Button
                    onClick={handleEncrypt}
                    disabled={!message || isAnimating || activeStep !== 'input'}
                    className="flex items-center gap-2 relative overflow-hidden"
                  >
                    <Lock className={`w-4 h-4 ${isAnimating ? 'animate-spin' : ''}`} />
                    Encrypt
                  </Button>
                </div>
              </div>
            </AnimatedBlock>

            {/* Data Flow Lines */}
            {encryptedMessage && (
              <DataFlow 
                active={animationPhase === 'encrypting'} 
                color="bg-blue-500" 
              />
            )}

            {/* Encrypted Message */}
            {encryptedMessage && (
              <div className="relative">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Encrypted Message:</label>
                  <div className="flex gap-2">
                    <div className={`flex-1 font-mono text-sm bg-gray-50 p-3 rounded border overflow-x-auto transition-colors duration-500 ${
                      animationPhase === 'encrypting' ? 'border-blue-500 bg-blue-50' : ''
                    }`}>
                      {encryptedMessage}
                    </div>
                    <Button
                      onClick={handleDecrypt}
                      disabled={isAnimating || activeStep !== 'encrypted'}
                      className="flex items-center gap-2"
                    >
                      <Unlock className={`w-4 h-4 ${
                        activeStep === 'decrypting' ? 'animate-spin' : ''
                      }`} />
                      Decrypt
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Data Flow Lines */}
            {decryptedMessage && (
              <DataFlow 
                active={animationPhase === 'decrypting'} 
                color="bg-amber-500" 
              />
            )}

            {/* Decrypted Result */}
            {decryptedMessage && (
              <div className="relative">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Decrypted Message:</label>
                  <div className={`font-mono text-sm bg-green-50 p-3 rounded border transition-colors duration-500 ${
                    animationPhase === 'completed' ? 'border-green-500' : ''
                  }`}>
                    {decryptedMessage}
                    {animationPhase === 'completed' && (
                      <ShieldCheck className="w-4 h-4 text-green-500 inline ml-2 animate-bounce" />
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Process Visualization */}
            <div className="flex justify-center gap-16 pt-4">
              <div className={`flex flex-col items-center gap-2 transition-colors duration-300 ${
                activeStep === 'encrypting' ? 'text-blue-500' : 'text-gray-400'
              }`}>
                <Lock className={`w-6 h-6 ${
                  activeStep === 'encrypting' ? 'animate-bounce' : ''
                }`} />
                <span className="text-sm">Encryption</span>
              </div>
              <div className={`flex flex-col items-center gap-2 transition-colors duration-300 ${
                activeStep === 'decrypting' ? 'text-amber-500' : 'text-gray-400'
              }`}>
                <Unlock className={`w-6 h-6 ${
                  activeStep === 'decrypting' ? 'animate-bounce' : ''
                }`} />
                <span className="text-sm">Decryption</span>
              </div>
            </div>

            {/* Reset Button */}
            {activeStep !== 'input' && (
              <div className="flex justify-center pt-4">
                <Button
                  variant="outline"
                  onClick={reset}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Start Over
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AsymmetricEncryptionDemo;