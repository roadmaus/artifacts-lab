import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Key, MessageCircle, Eye, EyeOff, ArrowRight, RefreshCw, Shield, CheckCircle } from 'lucide-react';

const SecureMessagingDemo = () => {
  const [message, setMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [showInterceptor, setShowInterceptor] = useState(false);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(true);
  const [animatingTransit, setAnimatingTransit] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // Key states with rotation
  const [keys, setKeys] = useState({
    alice: { id: 'IK_A1', session: 'SK_A1', counter: 0 },
    bob: { id: 'IK_B1', session: 'SK_B1', counter: 0 }
  });

  const rotateKeys = () => {
    setKeys(prev => ({
      alice: {
        ...prev.alice,
        session: `SK_A${prev.alice.counter + 1}`,
        counter: prev.alice.counter + 1
      },
      bob: {
        ...prev.bob,
        session: `SK_B${prev.bob.counter + 1}`,
        counter: prev.bob.counter + 1
      }
    }));
  };

  const encryptMessage = (msg) => {
    setAnimatingTransit(true);
    const encrypted = Array.from(msg).map(char => 
      char.charCodeAt(0).toString(16).padStart(2, '0')
    ).join('');
    setEncryptedMessage(encrypted);
    setTimeout(() => {
      setAnimatingTransit(false);
      rotateKeys();
    }, 1500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Shield className="text-blue-600" size={24} />
            <h1 className="text-2xl font-bold">Secure Message Exchange</h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowInterceptor(!showInterceptor)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                showInterceptor ? 'bg-red-100 text-red-700' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {showInterceptor ? <EyeOff size={16} /> : <Eye size={16} />}
              {showInterceptor ? "Hide" : "Show"} Interceptor
            </button>
            <button
              onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {showTechnicalDetails ? "Hide" : "Show"} Technical Details
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 flex gap-6">
        {/* Communication Panel */}
        <div className="flex-1 bg-white rounded-xl shadow-sm p-6 space-y-6">
          <div className="flex justify-between items-stretch gap-8">
            {/* Sender Panel */}
            <div className="w-1/3 space-y-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  Sender (Alice)
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center bg-white p-2 rounded border">
                    <span className="text-gray-600">Identity Key:</span>
                    <code className="bg-blue-100 px-2 py-1 rounded text-xs font-mono">
                      {keys.alice.id}
                    </code>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 rounded border">
                    <span className="text-gray-600">Session Key:</span>
                    <code className="bg-blue-100 px-2 py-1 rounded text-xs font-mono">
                      {keys.alice.session}
                    </code>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full p-3 border rounded-lg text-sm resize-none h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Message Transit */}
            <div className="flex-1 flex flex-col items-center justify-center relative">
              {message && (
                <div className={`space-y-4 text-center transition-all duration-500 ${
                  animatingTransit ? 'transform translate-x-8 opacity-50' : ''
                }`}>
                  <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-16 bg-blue-200"></div>
                    <Lock className={`text-green-500 ${animatingTransit ? 'animate-pulse' : ''}`} />
                    <div className="h-px w-16 bg-blue-200"></div>
                  </div>
                  <div className="font-mono text-xs bg-black text-green-400 p-3 rounded-lg shadow-sm max-w-[200px] overflow-hidden text-ellipsis">
                    {encryptedMessage || (message && encryptMessage(message))}
                  </div>
                  {showInterceptor && (
                    <div className="absolute top-full mt-2 text-xs text-red-500 flex items-center gap-2 bg-red-50 px-3 py-1 rounded-full">
                      <Eye size={12} />
                      Intercepted but encrypted!
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Receiver Panel */}
            <div className="w-1/3 space-y-4">
              <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  Receiver (Bob)
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center bg-white p-2 rounded border">
                    <span className="text-gray-600">Identity Key:</span>
                    <code className="bg-green-100 px-2 py-1 rounded text-xs font-mono">
                      {keys.bob.id}
                    </code>
                  </div>
                  <div className="flex justify-between items-center bg-white p-2 rounded border">
                    <span className="text-gray-600">Session Key:</span>
                    <code className="bg-green-100 px-2 py-1 rounded text-xs font-mono">
                      {keys.bob.session}
                    </code>
                  </div>
                </div>
              </div>
              {encryptedMessage && (
                <div className="bg-white rounded-lg border p-4 space-y-2">
                  <div className="text-xs text-gray-500">Decrypted Message:</div>
                  <div className="text-sm bg-green-50 p-3 rounded border border-green-100">
                    {message}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={() => encryptMessage(message)}
              disabled={!message || animatingTransit}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              <Lock size={16} />
              Send Encrypted Message
            </button>
          </div>
        </div>

        {/* Technical Details Panel */}
        {showTechnicalDetails && (
          <div className="w-96 bg-white rounded-xl shadow-sm p-6 space-y-6 h-fit">
            <div className="space-y-6">
              {[
                {
                  title: "Key Exchange (X3DH)",
                  description: "Extended Triple Diffie-Hellman Protocol",
                  steps: [
                    "Identity Key Verification",
                    "Ephemeral Key Generation",
                    "Session Key Derivation"
                  ],
                  active: true
                },
                {
                  title: "Double Ratchet Algorithm",
                  description: "Message encryption process",
                  steps: [
                    "Key Ratcheting",
                    "Message Key Derivation",
                    "AEAD Encryption"
                  ],
                  active: message.length > 0
                },
                {
                  title: "Forward Secrecy",
                  description: "Protection of past communications",
                  steps: [
                    "Automatic Key Rotation",
                    "Session Key Updates",
                    "Past Message Security"
                  ],
                  active: keys.alice.counter > 0
                }
              ].map((section, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border ${
                    section.active ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <h3 className="font-medium flex items-center gap-2">
                    {section.active && <CheckCircle size={16} className="text-green-500" />}
                    {section.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{section.description}</p>
                  <ul className="mt-3 space-y-1">
                    {section.steps.map((step, i) => (
                      <li 
                        key={i}
                        className={`text-sm flex items-center gap-2 ${
                          section.active ? 'text-gray-800' : 'text-gray-400'
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          section.active ? 'bg-blue-500' : 'bg-gray-300'
                        }`} />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecureMessagingDemo;
