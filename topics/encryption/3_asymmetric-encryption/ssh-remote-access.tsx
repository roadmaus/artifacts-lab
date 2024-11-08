import React, { useState, useEffect } from 'react';
import { Key, Lock, Server, ArrowRight, Shield, Check, AlertCircle, Copy, Terminal, Eye, EyeOff, ZapOff, Zap } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Reusable styled button component
const Button = ({ children, variant = 'primary', disabled, onClick, className = '' }) => {
  const baseStyles = "px-4 py-2 rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    success: "bg-green-500 hover:bg-green-600 text-white",
    secondary: "text-gray-600 hover:text-gray-800",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// Tooltip component
const Tooltip = ({ children, content, show }) => {
  if (!show) return null;
  
  return (
    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-2 rounded shadow-lg z-10 transition-all duration-200">
      {content}
    </div>
  );
};

const SSHVisualization = () => {
  const [step, setStep] = useState(0);
  const [showTooltip, setShowTooltip] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('keypair');
  const [showCopyFeedback, setShowCopyFeedback] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCommandFeedback, setShowCommandFeedback] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('idle');
  const [terminalOutput, setTerminalOutput] = useState([]);

  const keyPair = {
    public: 'ssh-rsa AAAAB3NzaC1yc2EAAAADA....',
    private: '-----BEGIN RSA PRIVATE KEY-----\nMIIEpQIBAAKCAQEA...',
    fingerprint: 'SHA256:2Ws8Kg0dYQnHXFQ...'
  };

  const steps = [
    { 
      title: 'Key Generation',
      description: 'Generate public/private key pair',
      icon: Key,
      details: {
        command: 'ssh-keygen -t rsa -b 4096',
        explanation: 'Creates a 4096-bit RSA key pair',
        keyLocation: '~/.ssh/id_rsa',
        considerations: [
          'Use strong passphrase',
          'Store private key securely',
          'Backup key material'
        ]
      }
    },
    {
      title: 'Host Verification',
      description: 'Verify server fingerprint',
      icon: Shield,
      details: {
        command: 'ssh-keyscan -t rsa hostname',
        explanation: 'Retrieves and verifies host key',
        location: '~/.ssh/known_hosts',
        considerations: [
          'Always verify first connection',
          'Check fingerprint out-of-band',
          'Monitor for changes'
        ]
      }
    },
    {
      title: 'Key Exchange',
      description: 'Exchange and verify credentials',
      icon: ArrowRight,
      details: {
        command: 'ssh-copy-id -i ~/.ssh/id_rsa.pub user@host',
        explanation: 'Copies public key to remote host',
        location: '~/.ssh/authorized_keys',
        considerations: [
          'Verify key permissions',
          'Use ssh-agent for key management',
          'Consider certificate authority'
        ]
      }
    },
    {
      title: 'Authentication',
      description: 'Establish secure connection',
      icon: Lock,
      details: {
        command: 'ssh -i ~/.ssh/id_rsa user@hostname',
        explanation: 'Establishes encrypted connection',
        considerations: [
          'Use config file for options',
          'Enable agent forwarding carefully',
          'Consider connection multiplexing'
        ]
      }
    }
  ];

  const terminalMessages = {
    0: [
      'Generating public/private rsa key pair.',
      'Enter passphrase (empty for no passphrase):',
      'Your identification has been saved in ~/.ssh/id_rsa',
      'Your public key has been saved in ~/.ssh/id_rsa.pub'
    ],
    1: [
      '# hostname SSH-2.0-OpenSSH_8.9',
      'hostname ssh-rsa AAAAB3NzaC1yc2EAAAADA....',
      'Host added to ~/.ssh/known_hosts'
    ],
    2: [
      '/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/home/user/.ssh/id_rsa.pub"',
      'Number of key(s) added: 1',
      'Now try logging into the machine'
    ],
    3: [
      'OpenSSH_8.9p1 Ubuntu-3ubuntu0.1, OpenSSL 3.0.2 15 Mar 2022',
      'debug1: Authentication succeeded (publickey).',
      'debug1: channel 0: new [client-session]'
    ]
  };

  const simulateConnection = async () => {
    if (step === steps.length - 1) {
      setConnectionStatus('connecting');
      setIsAnimating(true);
      setTerminalOutput(terminalMessages[step]);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setConnectionStatus('verifying');
      await new Promise(resolve => setTimeout(resolve, 1000));
      setConnectionStatus('establishing');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setConnectionStatus('connected');
      setAuthenticated(true);
      setIsAnimating(false);
    } else {
      handleNextStep();
    }
  };

  const handleNextStep = () => {
    setIsAnimating(true);
    setShowCommandFeedback(true);
    setTerminalOutput(terminalMessages[step]);
    
    setTimeout(() => {
      if (step < steps.length - 1) {
        setStep(prev => prev + 1);
      }
      setIsAnimating(false);
      setShowCommandFeedback(false);
    }, 1500);
  };

  const handleReset = () => {
    setStep(0);
    setAuthenticated(false);
    setShowPrivateKey(false);
    setShowTooltip('');
    setConnectionStatus('idle');
    setIsAnimating(false);
    setTerminalOutput([]);
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowCopyFeedback(type);
      setTimeout(() => setShowCopyFeedback(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const AuthenticationMethods = () => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-3">Authentication Method</h3>
      <div className="flex flex-wrap gap-2">
        {['keypair', 'certificate', 'password'].map(method => (
          <Button
            key={method}
            variant={selectedMethod === method ? 'primary' : 'secondary'}
            onClick={() => setSelectedMethod(method)}
          >
            {method.charAt(0).toUpperCase() + method.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  );

  const TerminalWindow = () => (
    <div className="bg-gray-900 p-4 rounded-lg mb-6">
      <div className="flex items-center justify-between mb-2 text-green-400">
        <div className="flex items-center">
          <Terminal className="w-4 h-4 mr-2" />
          <span className="font-mono text-sm">Terminal</span>
        </div>
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
      </div>
      <div className="font-mono text-sm text-green-400 whitespace-pre-wrap break-all">
        <div>$ {steps[step].details.command}</div>
        {terminalOutput.map((line, index) => (
          <div key={index} className="mt-1 opacity-80">{line}</div>
        ))}
      </div>
    </div>
  );

  const KeyDetails = () => (
    <div className="bg-gray-50 p-4 rounded-lg mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Key Details</h3>
        <button
          onClick={() => setShowPrivateKey(!showPrivateKey)}
          className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          {showPrivateKey ? <EyeOff className="w-4 h-4 mr-1" /> : <Eye className="w-4 h-4 mr-1" />}
          {showPrivateKey ? 'Hide' : 'Show'} Private Key
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Public Key:</span>
            <button
              onClick={() => copyToClipboard(keyPair.public, 'public')}
              className="flex items-center text-blue-500 hover:text-blue-600 transition-colors"
            >
              <Copy className="w-4 h-4 mr-1" />
              {showCopyFeedback === 'public' ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div className="text-sm font-mono bg-white p-3 rounded border overflow-x-auto">
            {keyPair.public}
          </div>
        </div>
        
        {showPrivateKey && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Private Key:</span>
              <button
                onClick={() => copyToClipboard(keyPair.private, 'private')}
                className="flex items-center text-blue-500 hover:text-blue-600 transition-colors"
              >
                <Copy className="w-4 h-4 mr-1" />
                {showCopyFeedback === 'private' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <div className="text-sm font-mono bg-white p-3 rounded border overflow-x-auto">
              {keyPair.private}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const SecurityConsiderations = () => (
    <div className="bg-blue-50 p-4 rounded-lg">
      <h3 className="font-semibold mb-3">Security Considerations</h3>
      <ul className="list-disc list-inside text-sm space-y-2">
        {steps[step].details.considerations.map((consideration, index) => (
          <li key={index} className="text-gray-700">{consideration}</li>
        ))}
      </ul>
    </div>
  );

  const ConnectionStatus = () => {
    const statusMessages = {
      idle: 'Ready to connect',
      connecting: 'Initiating connection...',
      verifying: 'Verifying credentials...',
      establishing: 'Establishing secure tunnel...',
      connected: 'Connection established'
    };

    return (
      <div className="flex items-center space-x-2 text-sm mt-2">
        {connectionStatus === 'idle' ? (
          <ZapOff className="w-4 h-4 text-gray-400" />
        ) : (
          <Zap className={`w-4 h-4 ${connectionStatus === 'connected' ? 'text-green-500' : 'text-blue-500'}`} />
        )}
        <span className={`
          ${connectionStatus === 'connected' ? 'text-green-600' : 'text-blue-600'}
        `}>
          {statusMessages[connectionStatus]}
        </span>
      </div>
    );
  };

  const CommandFeedback = () => (
    <div className={`
      mt-2 text-sm text-green-600
      transition-opacity duration-300
      ${showCommandFeedback ? 'opacity-100' : 'opacity-0'}
    `}>
      <div className="flex items-center space-x-2">
        <Check className="w-4 h-4" />
        <span>Command executed successfully</span>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">SSH Connection Process</h2>
        <p className="text-gray-600">Interactive visualization of secure remote access</p>
        <ConnectionStatus />
      </div>

      <div className="space-y-6">
        <AuthenticationMethods />

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="relative mb-16">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2" />
            <div 
              className="absolute top-1/2 left-0 h-1 bg-blue-500 -translate-y-1/2 transition-all duration-500"
              style={{ width: `${(step / (steps.length - 1)) * 100}%` }} 
            />
            
            <div className="relative flex justify-between">
              {steps.map((s, index) => {
                const Icon = s.icon;
                const isActive = index === step;
                const isComplete = index < step || authenticated;
                
                return (
                  <div 
                    key={index}
                    className="relative"
                    onMouseEnter={() => setShowTooltip(s.title)}
                    onMouseLeave={() => setShowTooltip('')}
                  >
                    <div 
                      className={`
                        w-12 h-12 rounded-full flex items-center justify-center
                        transition-all duration-500 ease-in-out
                        ${isAnimating && isActive ? 'scale-125' : ''}
                        ${isActive ? 'bg-blue-500 text-white scale-110' :
                          isComplete ? 'bg-green-500 text-white' : 'bg-white text-gray-400 border-2 border-gray-200'}
                      `}
                    >
                      <Icon className={`w-6 h-6 ${isAnimating && isActive ? 'animate-pulse' : ''}`} />
                    </div>
                    
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                      <span className={`
                        text-sm font-medium transition-colors duration-300
                        ${isActive ? 'text-blue-600' : isComplete ? 'text-green-600' : 'text-gray-600'}
                      `}>
                        {s.title}
                      </span>
                    </div>
                    
                    <Tooltip 
                      show={showTooltip === s.title}
                      content={s.description}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8">
            {authenticated ? (
              <Alert className="bg-green-50 border-green-200">
                <Check className="w-4 h-4 text-green-500" />
                <AlertTitle>Connection Established</AlertTitle>
                <AlertDescription>
                  <div className="space-y-2">
                    <p>Secure SSH connection is now active and encrypted</p>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Session Details:</span>
                      <ul className="list-disc list-inside mt-1 ml-2">
                        <li>Encryption: AES-256-GCM</li>
                        <li>Key Exchange: curve25519-sha256</li>
                        <li>MAC: hmac-sha2-256</li>
                      </ul>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-6">
                <Alert className={`
                  bg-blue-50 border-blue-200 transition-all duration-300
                  ${isAnimating ? 'scale-102' : ''}
                `}>
                  <AlertCircle className="w-4 h-4 text-blue-500" />
                  <AlertTitle>Step {step + 1}: {steps[step].title}</AlertTitle>
                  <AlertDescription>
                    <div className="space-y-2">
                      <p>{steps[step].details.explanation}</p>
                      {steps[step].details.keyLocation && (
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Location: </span>
                          <span className="font-mono">{steps[step].details.keyLocation}</span>
                        </div>
                      )}
                    </div>
                  </AlertDescription>
                </Alert>
                
                <TerminalWindow />
                <CommandFeedback />
                {step === 0 && <KeyDetails />}
                <SecurityConsiderations />
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <Button
              variant="secondary"
              onClick={handleReset}
              disabled={isAnimating}
            >
              Reset
            </Button>
            <Button
              variant={authenticated ? 'success' : 'primary'}
              onClick={simulateConnection}
              disabled={isAnimating}
              className={isAnimating ? 'animate-pulse' : ''}
            >
              {connectionStatus === 'idle' ? (authenticated ? 'Connected' : 'Next Step') : 
               connectionStatus === 'connected' ? 'Connected' : 'Connecting...'}
            </Button>
          </div>
        </div>

        {/* Additional Information Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
          <div>
            <h3 className="font-semibold mb-2">SSH Best Practices</h3>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• Use SSH protocol version 2</li>
              <li>• Implement strong access controls</li>
              <li>• Regular key rotation</li>
              <li>• Disable root login</li>
              <li>• Use non-standard ports</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Security Features</h3>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• Public key authentication</li>
              <li>• Perfect forward secrecy</li>
              <li>• Strong encryption</li>
              <li>• Host verification</li>
              <li>• Session isolation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SSHVisualization;