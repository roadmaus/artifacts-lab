import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Key, Send, Shield, ChevronRight, AlertCircle, Smartphone, Laptop, HardDrive, Check } from 'lucide-react';

const WalletTypeCard = ({ icon: Icon, title, description, security, convenience }) => (
  <div className="p-4 border rounded-lg">
    <div className="flex items-center gap-2 mb-2">
      <Icon className="w-6 h-6 text-blue-500" />
      <h4 className="font-semibold">{title}</h4>
    </div>
    <p className="text-sm text-gray-600 mb-2">{description}</p>
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <div className="w-20 text-sm">Security:</div>
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 rounded-full h-2 transition-all duration-500"
            style={{ width: `${security}%` }}
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-20 text-sm">Usage:</div>
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 rounded-full h-2 transition-all duration-500"
            style={{ width: `${convenience}%` }}
          />
        </div>
      </div>
    </div>
  </div>
);

const AnimatedDerivation = ({ value, isAnimating }) => {
  const [displayValue, setDisplayValue] = useState('');
  
  useEffect(() => {
    if (isAnimating) {
      let current = '';
      const reveal = setInterval(() => {
        if (current.length < value.length) {
          current += value[current.length];
          setDisplayValue(current);
        } else {
          clearInterval(reveal);
        }
      }, 50);
      return () => clearInterval(reveal);
    } else {
      setDisplayValue(value);
    }
  }, [value, isAnimating]);

  return (
    <div className="font-mono bg-gray-100 p-2 rounded text-sm break-all">
      {displayValue}
    </div>
  );
};

const CryptoWalletDemo = () => {
  const [privateKey, setPrivateKey] = useState('e9873d79c6d87dc0fb6a5778633389f4453213303da61f20bd67fc233aa33262');
  const [message, setMessage] = useState('Send 0.1 BTC to Alice');
  const [step, setStep] = useState(0);
  const [showTooltip, setShowTooltip] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [selectedWalletType, setSelectedWalletType] = useState(null);

  const walletTypes = [
    {
      icon: Smartphone,
      title: 'Mobile Wallet',
      description: 'Software wallets on your phone. Convenient for daily transactions.',
      security: 60,
      convenience: 90
    },
    {
      icon: Laptop,
      title: 'Desktop Wallet',
      description: 'Full node capability with complete transaction history.',
      security: 70,
      convenience: 75
    },
    {
      icon: HardDrive,
      title: 'Hardware Wallet',
      description: 'Cold storage device for maximum security.',
      security: 95,
      convenience: 40
    }
  ];

  // Simulate deriving a public key
  const getPublicKey = (privKey) => {
    return privKey.slice(0, 32).split('').reverse().join('');
  }

  // Simulate creating a wallet address
  const getAddress = (pubKey) => {
    return '1' + pubKey.slice(0, 32);
  }

  // Simulate transaction signing
  const getSignature = (msg, privKey) => {
    return privKey.slice(0, 8) + msg.length.toString(16) + msg.slice(0, 4);
  }

  // Simulate signature verification
  const verifySignature = (signature, message, publicKey) => {
    // In reality, this would use cryptographic verification
    return signature.includes(message.length.toString(16));
  }

  const handleNextStep = () => {
    setIsAnimating(true);
    setStep(Math.min(4, step + 1));
    setTimeout(() => setIsAnimating(false), 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Wallet Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Choose Your Wallet Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {walletTypes.map((wallet) => (
              <div 
                key={wallet.title}
                onClick={() => setSelectedWalletType(wallet)}
                className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  selectedWalletType?.title === wallet.title ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <WalletTypeCard {...wallet} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Wallet Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Cryptocurrency Wallet Demonstration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Private Key Section */}
            <div className={`transition-all duration-500 ${step >= 0 ? 'opacity-100' : 'opacity-50'}`}>
              <div className="flex items-center gap-4 mb-4">
                <div 
                  className="p-4 bg-blue-100 rounded-lg cursor-help"
                  onMouseEnter={() => setShowTooltip('private')}
                  onMouseLeave={() => setShowTooltip('')}
                >
                  <Lock className="w-8 h-8 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Private Key</h3>
                  <AnimatedDerivation value={privateKey} isAnimating={isAnimating && step === 0} />
                  {showTooltip === 'private' && (
                    <div className="mt-2 text-sm text-gray-600">
                      Your private key is the master key to your wallet. Never share it!
                      {selectedWalletType?.title === 'Hardware Wallet' && 
                        " Stored securely in your hardware device's secure element."}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Public Key Derivation */}
            <div className={`transition-all duration-500 ${step >= 1 ? 'opacity-100' : 'opacity-50'}`}>
              <div className="flex items-center gap-4 mb-4">
                <ChevronRight className="text-gray-400" />
                <div 
                  className="p-4 bg-green-100 rounded-lg cursor-help"
                  onMouseEnter={() => setShowTooltip('public')}
                  onMouseLeave={() => setShowTooltip('')}
                >
                  <Key className="w-8 h-8 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Public Key</h3>
                  <AnimatedDerivation 
                    value={getPublicKey(privateKey)} 
                    isAnimating={isAnimating && step === 1} 
                  />
                  {showTooltip === 'public' && (
                    <div className="mt-2 text-sm text-gray-600">
                      Your public key is derived from your private key using elliptic curve cryptography
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Wallet Address */}
            <div className={`transition-all duration-500 ${step >= 2 ? 'opacity-100' : 'opacity-50'}`}>
              <div className="flex items-center gap-4 mb-4">
                <ChevronRight className="text-gray-400" />
                <div 
                  className="p-4 bg-purple-100 rounded-lg cursor-help"
                  onMouseEnter={() => setShowTooltip('address')}
                  onMouseLeave={() => setShowTooltip('')}
                >
                  <Send className="w-8 h-8 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">Wallet Address</h3>
                  <AnimatedDerivation 
                    value={getAddress(getPublicKey(privateKey))} 
                    isAnimating={isAnimating && step === 2}
                  />
                  {showTooltip === 'address' && (
                    <div className="mt-2 text-sm text-gray-600">
                      Your wallet address is derived from your public key - this is what you share to receive funds
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Transaction Signing */}
            <div className={`transition-all duration-500 ${step >= 3 ? 'opacity-100' : 'opacity-50'}`}>
              <div className="p-4 border rounded-lg mt-6">
                <h3 className="text-lg font-semibold mb-4">Transaction Signing</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Transaction Message</label>
                    <input 
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Digital Signature</label>
                    <AnimatedDerivation 
                      value={getSignature(message, privateKey)}
                      isAnimating={isAnimating && step === 3}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Verification */}
            <div className={`transition-all duration-500 ${step >= 4 ? 'opacity-100' : 'opacity-50'}`}>
              <div className="p-4 border rounded-lg mt-6">
                <h3 className="text-lg font-semibold mb-4">Transaction Verification</h3>
                <div className="space-y-4">
                  <button
                    onClick={() => setShowVerification(true)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                  >
                    Verify Transaction
                  </button>
                  {showVerification && (
                    <div className="mt-4 p-4 bg-green-100 rounded-lg flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600" />
                      <span>Transaction signature verified successfully!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <button 
              onClick={() => setStep(Math.max(0, step - 1))}
              className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
              disabled={step === 0}
            >
              Previous
            </button>
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-gray-600">Hover over icons for explanations</span>
            </div>
            <button 
              onClick={handleNextStep}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              disabled={step === 4}
            >
              Next Step
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CryptoWalletDemo;
