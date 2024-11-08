import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowRight, Key, Lock, Unlock, Info } from 'lucide-react';

const TripleDESVisualization = () => {
  const [activeStage, setActiveStage] = useState(0);
  const [showDetails, setShowDetails] = useState({});

  const stages = [
    {
      id: 0,
      name: 'Initial State',
      details: 'Plaintext (64-bit blocks) ready for encryption'
    },
    {
      id: 1,
      name: 'First Encryption',
      details: 'DES encryption using Key 1 (56 bits). The data undergoes 16 rounds of Feistel network operations.'
    },
    {
      id: 2,
      name: 'Second Decryption',
      details: 'DES decryption using Key 2 (56 bits). This step adds complexity and increases security.'
    },
    {
      id: 3,
      name: 'Final Encryption',
      details: 'DES encryption using Key 3 (56 bits). Produces the final ciphertext.'
    },
    {
      id: 4,
      name: 'Complete',
      details: 'Final 64-bit ciphertext block produced'
    }
  ];

  const toggleDetails = (stageId) => {
    setShowDetails(prev => ({
      ...prev,
      [stageId]: !prev[stageId]
    }));
  };

  return (
    <Card className="w-full max-w-4xl bg-white">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Triple DES (3DES) Encryption Process</CardTitle>
        <div className="flex justify-center space-x-4 mt-4">
          {stages.map((stage) => (
            <button
              key={stage.id}
              onClick={() => setActiveStage(stage.id)}
              className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                activeStage === stage.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Stage {stage.id}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="p-6">
          <div className="flex flex-col items-center space-y-8">
            {/* Input data section */}
            <div className={`flex items-center justify-center w-full space-x-4 transition-all duration-500 ${
              activeStage >= 0 ? 'opacity-100' : 'opacity-40'
            }`}>
              <div className="flex items-center justify-center w-24 h-24 bg-blue-100 rounded-lg">
                <Unlock className={`w-12 h-12 text-blue-600 transition-transform duration-500 ${
                  activeStage > 0 ? 'rotate-180' : ''
                }`} />
              </div>
              <div className="text-lg font-medium">
                Plaintext
                <button
                  onClick={() => toggleDetails(0)}
                  className="ml-2 p-1 rounded-full hover:bg-gray-100"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>
            </div>
            {showDetails[0] && (
              <div className="bg-blue-50 p-4 rounded-lg text-sm w-full">
                <h4 className="font-bold">Input Block Details:</h4>
                <ul className="list-disc pl-4 mt-2">
                  <li>64-bit input block size</li>
                  <li>Divided into 32-bit left and right halves</li>
                  <li>Padding applied if input isn't multiple of 64 bits</li>
                </ul>
              </div>
            )}

            {/* First DES operation */}
            <div className={`flex items-center justify-center w-full space-x-4 transition-all duration-500 ${
              activeStage >= 1 ? 'opacity-100' : 'opacity-40'
            }`}>
              <ArrowRight className={`w-6 h-6 text-gray-400 transition-transform duration-500 ${
                activeStage >= 1 ? 'translate-x-0' : '-translate-x-4'
              }`} />
              <div className="flex items-center space-x-2">
                <Key className={`w-6 h-6 text-green-600 transition-transform duration-500 ${
                  activeStage >= 1 ? 'rotate-90' : ''
                }`} />
                <span className="text-sm font-medium">Key 1</span>
              </div>
              <div 
                className="flex flex-col items-center justify-center w-32 h-20 bg-green-100 rounded-lg cursor-pointer hover:bg-green-200 transition-colors"
                onClick={() => toggleDetails(1)}
              >
                <div className="text-sm font-medium">DES</div>
                <div className="text-xs text-gray-600">Encryption</div>
              </div>
            </div>
            {showDetails[1] && (
              <div className="bg-green-50 p-4 rounded-lg text-sm w-full">
                <h4 className="font-bold">First Encryption Stage:</h4>
                <ul className="list-disc pl-4 mt-2">
                  <li>Initial permutation (IP)</li>
                  <li>16 rounds of Feistel network</li>
                  <li>Key schedule generates 16 48-bit subkeys</li>
                  <li>Each round includes: expansion, key mixing, S-box substitution, permutation</li>
                </ul>
              </div>
            )}

            {/* Second DES operation */}
            <div className={`flex items-center justify-center w-full space-x-4 transition-all duration-500 ${
              activeStage >= 2 ? 'opacity-100' : 'opacity-40'
            }`}>
              <ArrowRight className={`w-6 h-6 text-gray-400 transition-transform duration-500 ${
                activeStage >= 2 ? 'translate-x-0' : '-translate-x-4'
              }`} />
              <div className="flex items-center space-x-2">
                <Key className={`w-6 h-6 text-yellow-600 transition-transform duration-500 ${
                  activeStage >= 2 ? 'rotate-90' : ''
                }`} />
                <span className="text-sm font-medium">Key 2</span>
              </div>
              <div 
                className="flex flex-col items-center justify-center w-32 h-20 bg-yellow-100 rounded-lg cursor-pointer hover:bg-yellow-200 transition-colors"
                onClick={() => toggleDetails(2)}
              >
                <div className="text-sm font-medium">DES</div>
                <div className="text-xs text-gray-600">Decryption</div>
              </div>
            </div>
            {showDetails[2] && (
              <div className="bg-yellow-50 p-4 rounded-lg text-sm w-full">
                <h4 className="font-bold">Second Decryption Stage:</h4>
                <ul className="list-disc pl-4 mt-2">
                  <li>Reverses the first encryption</li>
                  <li>Uses subkeys in reverse order</li>
                  <li>Provides additional security against meet-in-the-middle attacks</li>
                  <li>Maintains backward compatibility with single DES</li>
                </ul>
              </div>
            )}

            {/* Third DES operation */}
            <div className={`flex items-center justify-center w-full space-x-4 transition-all duration-500 ${
              activeStage >= 3 ? 'opacity-100' : 'opacity-40'
            }`}>
              <ArrowRight className={`w-6 h-6 text-gray-400 transition-transform duration-500 ${
                activeStage >= 3 ? 'translate-x-0' : '-translate-x-4'
              }`} />
              <div className="flex items-center space-x-2">
                <Key className={`w-6 h-6 text-red-600 transition-transform duration-500 ${
                  activeStage >= 3 ? 'rotate-90' : ''
                }`} />
                <span className="text-sm font-medium">Key 3</span>
              </div>
              <div 
                className="flex flex-col items-center justify-center w-32 h-20 bg-red-100 rounded-lg cursor-pointer hover:bg-red-200 transition-colors"
                onClick={() => toggleDetails(3)}
              >
                <div className="text-sm font-medium">DES</div>
                <div className="text-xs text-gray-600">Encryption</div>
              </div>
            </div>
            {showDetails[3] && (
              <div className="bg-red-50 p-4 rounded-lg text-sm w-full">
                <h4 className="font-bold">Final Encryption Stage:</h4>
                <ul className="list-disc pl-4 mt-2">
                  <li>Final DES encryption operation</li>
                  <li>Inverse initial permutation (IP⁻¹)</li>
                  <li>Produces final 64-bit ciphertext block</li>
                  <li>Total effective key length: 168 bits</li>
                </ul>
              </div>
            )}

            {/* Output data section */}
            <div className={`flex items-center justify-center w-full space-x-4 transition-all duration-500 ${
              activeStage >= 4 ? 'opacity-100' : 'opacity-40'
            }`}>
              <ArrowRight className={`w-6 h-6 text-gray-400 transition-transform duration-500 ${
                activeStage >= 4 ? 'translate-x-0' : '-translate-x-4'
              }`} />
              <div className="flex items-center justify-center w-24 h-24 bg-purple-100 rounded-lg">
                <Lock className={`w-12 h-12 text-purple-600 transition-transform duration-500 ${
                  activeStage >= 4 ? 'scale-110' : ''
                }`} />
              </div>
              <div className="text-lg font-medium">
                Ciphertext
                <button
                  onClick={() => toggleDetails(4)}
                  className="ml-2 p-1 rounded-full hover:bg-gray-100"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>
            </div>
            {showDetails[4] && (
              <div className="bg-purple-50 p-4 rounded-lg text-sm w-full">
                <h4 className="font-bold">Output Details:</h4>
                <ul className="list-disc pl-4 mt-2">
                  <li>64-bit output block</li>
                  <li>Triple encryption complete</li>
                  <li>Resistant to brute force attacks (compared to single DES)</li>
                  <li>Used in legacy systems but being phased out in favor of AES</li>
                </ul>
              </div>
            )}
          </div>

          {/* Key information */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Security Details:</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span>Key 1: 56-bit effective length</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                <span>Key 2: 56-bit effective length</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                <span>Key 3: 56-bit effective length</span>
              </li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              Combined security: 168-bit key space (three unique keys) or 112-bit key space (when K1 = K3)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TripleDESVisualization;
