import React, { useState, useEffect } from 'react';
import { Lock, Shield, Check, Key, Server, Laptop, ArrowRight, ArrowLeft, RefreshCw } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const HandshakeVisualizer = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    let timer;
    if (autoPlay) {
      timer = setInterval(() => {
        setCurrentStep((prev) => (prev < 3 ? prev + 1 : 0));
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [autoPlay]);

  const steps = [
    {
      title: "Initial Handshake",
      description: "Client initiates connection and server presents certificate",
      clientMessage: "ClientHello + Supported Ciphers",
      serverMessage: "ServerHello + Certificate",
      icon: <Lock className="text-blue-500" />,
    },
    {
      title: "Certificate Validation",
      description: "Client verifies server's certificate chain",
      clientMessage: "Verify Certificate Chain",
      serverMessage: "Certificate Authority Trust",
      icon: <Shield className="text-green-500" />,
    },
    {
      title: "Key Exchange",
      description: "Generate and exchange session keys securely",
      clientMessage: "Client Key Exchange",
      serverMessage: "Server Key Exchange",
      icon: <Key className="text-yellow-500" />,
    },
    {
      title: "Secure Connection",
      description: "Begin encrypted communication with perfect forward secrecy",
      clientMessage: "Finished (Encrypted)",
      serverMessage: "Finished (Encrypted)",
      icon: <Check className="text-green-500" />,
    },
  ];

  const MessageLine = ({ active, reverse, children }) => (
    <div className={`flex items-center justify-center gap-2 my-2 transition-opacity duration-500 ${
      active ? 'opacity-100' : 'opacity-0'
    }`}>
      {!reverse && <ArrowRight className="text-blue-500" />}
      <div className="px-3 py-1 bg-blue-100 rounded-full text-sm">
        {children}
      </div>
      {reverse && <ArrowLeft className="text-blue-500" />}
    </div>
  );

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="text-blue-500" />
          SSL/TLS Handshake Process
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6">
          <AlertDescription>
            This visualization demonstrates how SSL/TLS establishes a secure connection using asymmetric encryption for key exchange.
          </AlertDescription>
        </Alert>

        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            className="px-4 py-2 text-blue-500 hover:text-blue-600 disabled:opacity-50"
            disabled={currentStep === 0}
          >
            Previous
          </button>
          <div className="flex gap-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentStep ? 'bg-blue-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => setCurrentStep(prev => Math.min(3, prev + 1))}
            className="px-4 py-2 text-blue-500 hover:text-blue-600 disabled:opacity-50"
            disabled={currentStep === 3}
          >
            Next
          </button>
        </div>

        <div className="relative">
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="flex flex-col items-center">
              <Laptop className="w-12 h-12 text-gray-600 mb-2" />
              <div className="text-sm font-medium">Client</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-lg font-semibold mb-2 flex items-center gap-2">
                {steps[currentStep].icon}
                {steps[currentStep].title}
              </div>
              <div className="text-sm text-gray-600 text-center">
                {steps[currentStep].description}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <Server className="w-12 h-12 text-gray-600 mb-2" />
              <div className="text-sm font-medium">Server</div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <MessageLine active={true} reverse={false}>
              {steps[currentStep].clientMessage}
            </MessageLine>
            <MessageLine active={true} reverse={true}>
              {steps[currentStep].serverMessage}
            </MessageLine>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">Step Details</h3>
          <div className="space-y-2 text-sm">
            {currentStep === 0 && (
              <>
                <p>• Client sends supported cipher suites and TLS version</p>
                <p>• Server responds with chosen cipher suite and its certificate</p>
                <p>• Certificate contains server's public key</p>
              </>
            )}
            {currentStep === 1 && (
              <>
                <p>• Client verifies certificate hasn't expired</p>
                <p>• Validates certificate chain up to trusted root CA</p>
                <p>• Confirms certificate matches domain name</p>
              </>
            )}
            {currentStep === 2 && (
              <>
                <p>• Client generates pre-master secret</p>
                <p>• Encrypts it with server's public key</p>
                <p>• Both sides derive session keys</p>
              </>
            )}
            {currentStep === 3 && (
              <>
                <p>• Symmetric encryption begins with session keys</p>
                <p>• Perfect forward secrecy ensures future key compromises don't affect past sessions</p>
                <p>• Secure communication channel established</p>
              </>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className="flex items-center gap-2 px-4 py-2 text-blue-500 hover:text-blue-600"
          >
            <RefreshCw className={`w-4 h-4 ${autoPlay ? 'animate-spin' : ''}`} />
            {autoPlay ? 'Stop' : 'Auto Play'}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HandshakeVisualizer;
