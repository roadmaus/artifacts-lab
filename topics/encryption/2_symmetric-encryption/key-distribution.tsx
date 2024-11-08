import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lock, Key, RefreshCw, Shield, Mail, ArrowRight, FileCheck } from 'lucide-react';

const KeyDistribution = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [sharedSecret, setSharedSecret] = useState(null);
  
  // Diffie-Hellman simulation values
  const [alicePrivate, setAlicePrivate] = useState(6);
  const [bobPrivate, setBobPrivate] = useState(15);
  const g = 5; // generator
  const p = 23; // prime modulus

  const calculatePublicKey = (privateKey) => {
    return Math.pow(g, privateKey) % p;
  };

  const calculateSharedSecret = (publicKey, privateKey) => {
    return Math.pow(publicKey, privateKey) % p;
  };

  const nextStep = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentStep(prev => prev + 1);
      setIsAnimating(false);
    }, 1000);
  };

  const reset = () => {
    setCurrentStep(0);
    setSharedSecret(null);
  };

  const DiffieHellmanExchange = () => {
    const alicePublic = calculatePublicKey(alicePrivate);
    const bobPublic = calculatePublicKey(bobPrivate);
    
    useEffect(() => {
      if (currentStep === 3) {
        const secret = calculateSharedSecret(bobPublic, alicePrivate);
        setSharedSecret(secret);
      }
    }, [currentStep]);

    return (
      <div className="space-y-6">
        {/* Public Parameters */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Public Parameters</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-gray-500">Generator (g):</span>
              <span className="ml-2 font-mono">{g}</span>
            </div>
            <div>
              <span className="text-gray-500">Prime (p):</span>
              <span className="ml-2 font-mono">{p}</span>
            </div>
          </div>
        </div>

        {/* Exchange Visualization */}
        <div className="flex justify-between items-center gap-8">
          {/* Alice */}
          <div className="flex-1 space-y-4">
            <div className="text-center font-bold">Alice</div>
            <div className={`bg-blue-50 p-4 rounded-lg transition-all duration-300 ${currentStep >= 0 ? 'opacity-100' : 'opacity-0'}`}>
              <div className="text-sm text-gray-500">Private Key</div>
              <input
                type="range"
                min="1"
                max="20"
                value={alicePrivate}
                onChange={(e) => setAlicePrivate(Number(e.target.value))}
                disabled={currentStep > 0}
                className="w-full"
              />
              <div className="font-mono text-center">{alicePrivate}</div>
            </div>
            <div className={`bg-green-50 p-4 rounded-lg transition-all duration-300 ${currentStep >= 1 ? 'opacity-100' : 'opacity-0'}`}>
              <div className="text-sm text-gray-500">Public Key</div>
              <div className="font-mono text-center">{alicePublic}</div>
            </div>
          </div>

          {/* Exchange Arrows */}
          <div className="flex flex-col items-center gap-4">
            <div className={`transition-all duration-300 ${currentStep >= 1 ? 'opacity-100' : 'opacity-0'}`}>
              <ArrowRight className="text-green-500 transform rotate-0" />
            </div>
            <div className={`transition-all duration-300 ${currentStep >= 2 ? 'opacity-100' : 'opacity-0'}`}>
              <ArrowRight className="text-green-500 transform rotate-180" />
            </div>
          </div>

          {/* Bob */}
          <div className="flex-1 space-y-4">
            <div className="text-center font-bold">Bob</div>
            <div className={`bg-blue-50 p-4 rounded-lg transition-all duration-300 ${currentStep >= 0 ? 'opacity-100' : 'opacity-0'}`}>
              <div className="text-sm text-gray-500">Private Key</div>
              <input
                type="range"
                min="1"
                max="20"
                value={bobPrivate}
                onChange={(e) => setBobPrivate(Number(e.target.value))}
                disabled={currentStep > 0}
                className="w-full"
              />
              <div className="font-mono text-center">{bobPrivate}</div>
            </div>
            <div className={`bg-green-50 p-4 rounded-lg transition-all duration-300 ${currentStep >= 2 ? 'opacity-100' : 'opacity-0'}`}>
              <div className="text-sm text-gray-500">Public Key</div>
              <div className="font-mono text-center">{bobPublic}</div>
            </div>
          </div>
        </div>

        {/* Shared Secret */}
        <div className={`bg-purple-50 p-4 rounded-lg text-center transition-all duration-300 ${currentStep >= 3 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-sm text-gray-500 mb-2">Shared Secret</div>
          <div className="font-mono text-lg font-bold">{sharedSecret}</div>
        </div>

        {/* Next Step Button */}
        {currentStep < 3 && (
          <button
            onClick={nextStep}
            disabled={isAnimating}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Next Step
          </button>
        )}
      </div>
    );
  };

  const KeyWrapping = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="border p-4 rounded-lg">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <Key className="w-4 h-4" />
            Sender
          </h3>
          <div className="space-y-2">
            <div className="bg-blue-50 p-2 rounded">
              <div className="text-sm text-gray-500">Symmetric Key</div>
              <div className="font-mono">AES-256</div>
            </div>
            <div className="bg-green-50 p-2 rounded">
              <div className="text-sm text-gray-500">Recipient's Public Key</div>
              <div className="font-mono">RSA-2048</div>
            </div>
          </div>
        </div>
        
        <div className="border p-4 rounded-lg">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Recipient
          </h3>
          <div className="space-y-2">
            <div className="bg-red-50 p-2 rounded">
              <div className="text-sm text-gray-500">Private Key</div>
              <div className="font-mono">RSA-2048</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <ArrowRight className="text-green-500 transform rotate-90" />
      </div>
      
      <div className="bg-purple-50 p-4 rounded-lg">
        <h3 className="font-bold mb-2">Wrapped Key</h3>
        <div className="font-mono text-center">
          Encrypted AES-256 Key
        </div>
      </div>
    </div>
  );

  const OutOfBand = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="border p-4 rounded-lg">
          <h3 className="font-bold mb-2">Secure Phone Call</h3>
          <div className="text-center">
            <Mail className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="text-sm">Verbal key exchange</div>
          </div>
        </div>
        
        <div className="border p-4 rounded-lg">
          <h3 className="font-bold mb-2">Physical Exchange</h3>
          <div className="text-center">
            <Key className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="text-sm">USB or paper delivery</div>
          </div>
        </div>
        
        <div className="border p-4 rounded-lg">
          <h3 className="font-bold mb-2">Secure Courier</h3>
          <div className="text-center">
            <Shield className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <div className="text-sm">Trusted intermediary</div>
          </div>
        </div>
      </div>
    </div>
  );

  const CertificateBased = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 border p-4 rounded-lg">
          <h3 className="font-bold mb-2">Certificate Authority</h3>
          <div className="space-y-2">
            <div className="bg-purple-50 p-2 rounded">
              <FileCheck className="w-6 h-6 mb-1" />
              <div className="text-sm">Issues and signs certificates</div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 border p-4 rounded-lg">
          <h3 className="font-bold mb-2">Server</h3>
          <div className="space-y-2">
            <div className="bg-green-50 p-2 rounded">
              <div className="text-sm">Public Certificate</div>
            </div>
            <div className="bg-blue-50 p-2 rounded">
              <div className="text-sm">Private Key</div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 border p-4 rounded-lg">
          <h3 className="font-bold mb-2">Client</h3>
          <div className="space-y-2">
            <div className="bg-orange-50 p-2 rounded">
              <div className="text-sm">Trusted CA List</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center gap-4">
        <ArrowRight className="text-green-500" />
        <ArrowRight className="text-green-500 transform rotate-180" />
      </div>
    </div>
  );

  return (
    <div className="p-4">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold">Secure Key Distribution Methods</h2>
              <p className="text-sm text-gray-500">Interactive visualization of key exchange protocols</p>
            </div>
            <button onClick={reset} className="p-2 hover:bg-gray-100 rounded-full">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="diffie-hellman">
            <TabsList className="w-full">
              <TabsTrigger value="diffie-hellman" className="flex-1">Diffie-Hellman</TabsTrigger>
              <TabsTrigger value="key-wrapping" className="flex-1">Key Wrapping</TabsTrigger>
              <TabsTrigger value="out-of-band" className="flex-1">Out-of-Band</TabsTrigger>
              <TabsTrigger value="certificate" className="flex-1">Certificate-Based</TabsTrigger>
            </TabsList>

            <div className="mt-6">
              <TabsContent value="diffie-hellman">
                <DiffieHellmanExchange />
              </TabsContent>
              
              <TabsContent value="key-wrapping">
                <KeyWrapping />
              </TabsContent>
              
              <TabsContent value="out-of-band">
                <OutOfBand />
              </TabsContent>
              
              <TabsContent value="certificate">
                <CertificateBased />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default KeyDistribution;
