import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ArrowDown, ArrowRight, Lock, Key, SplitSquareHorizontal, Box, Shuffle, Play, Pause, RotateCcw } from 'lucide-react';

const BlowfishTwofishVisualization = () => {
  const [activeAlgorithm, setActiveAlgorithm] = useState('blowfish');
  const [showFeistel, setShowFeistel] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [inputData, setInputData] = useState("Hello World!");
  const [speed, setSpeed] = useState(1000);
  const [showSubkeys, setShowSubkeys] = useState(false);

  useEffect(() => {
    let timer;
    if (isAnimating && currentRound < 16) {
      timer = setTimeout(() => {
        setCurrentRound(prev => (prev + 1) % 17);
      }, speed);
    }
    return () => clearTimeout(timer);
  }, [isAnimating, currentRound, speed]);

  const resetAnimation = () => {
    setIsAnimating(false);
    setCurrentRound(0);
  };

  const algorithms = {
    blowfish: {
      color: 'blue',
      rounds: 16,
      keySize: '32-448 bits',
      blockSize: '64 bits',
      features: [
        'Fast performance on 32-bit CPUs',
        'Simple structure',
        'Free and unpatented',
        'Key-dependent S-boxes',
      ]
    },
    twofish: {
      color: 'green',
      rounds: 16,
      keySize: '128, 192, or 256 bits',
      blockSize: '128 bits',
      features: [
        'AES finalist',
        'Key-dependent S-boxes',
        'MDS matrices',
        'PHT mixing function',
      ]
    }
  };

  const FeistelNetwork = ({ color }) => {
    const leftData = inputData.slice(0, inputData.length / 2);
    const rightData = inputData.slice(inputData.length / 2);

    return (
    <div className="relative w-full max-w-2xl mx-auto mt-4">
      <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg">
        {/* Animation Controls */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className={`p-2 rounded-full ${color === 'blue' ? 'bg-blue-100 hover:bg-blue-200' : 'bg-green-100 hover:bg-green-200'}`}
          >
            {isAnimating ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          <button
            onClick={resetAnimation}
            className={`p-2 rounded-full ${color === 'blue' ? 'bg-blue-100 hover:bg-blue-200' : 'bg-green-100 hover:bg-green-200'}`}
          >
            <RotateCcw className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-sm">Speed:</span>
            <input
              type="range"
              min="200"
              max="2000"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-32"
            />
          </div>
          <div className="text-sm font-medium">
            Round: {currentRound}/16
          </div>
        </div>

        {/* Input Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Input Data:</label>
          <input
            type="text"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            className="w-full p-2 border rounded"
            maxLength={16}
          />
        </div>

        {/* Feistel Structure */}
        <div className="relative">
          {/* Input Split */}
          <div className="flex justify-center space-x-8 mb-8">
            <div className={`w-24 h-24 bg-${color}-100 rounded-lg flex items-center justify-center 
              transform transition-all duration-500 ${currentRound > 0 ? 'translate-y-4' : ''}`}>
              <div className="text-center">
                <div className="font-mono text-sm">{leftData}</div>
                <div className="text-xs mt-1">Left Half</div>
              </div>
            </div>
            <div className={`w-24 h-24 bg-${color}-100 rounded-lg flex items-center justify-center
              transform transition-all duration-500 ${currentRound > 0 ? 'translate-y-4' : ''}`}>
              <div className="text-center">
                <div className="font-mono text-sm">{rightData}</div>
                <div className="text-xs mt-1">Right Half</div>
              </div>
            </div>
          </div>

          {/* F-function and XOR */}
          <div className={`transform transition-all duration-500 ${
            isAnimating ? 'opacity-100' : 'opacity-50'
          }`}>
            <div className={`w-40 h-32 bg-${color}-200 rounded-lg mx-auto flex flex-col items-center justify-center
              ${isAnimating ? 'animate-pulse' : ''}`}>
              <div className="text-center">
                <div className="font-medium">F Function</div>
                <div className="text-xs mt-1">Round {currentRound}</div>
              </div>
              {showSubkeys && (
                <div className={`mt-2 text-xs bg-${color}-300 rounded px-2 py-1`}>
                  Subkey: K{currentRound}
                </div>
              )}
            </div>
            <div className="flex justify-center mt-4">
              <Shuffle className={`w-6 h-6 text-${color}-600 ${
                isAnimating ? 'animate-spin' : ''
              }`} />
            </div>
          </div>

          {/* Output */}
          <div className="flex justify-center space-x-8 mt-8">
            <div className={`w-24 h-24 bg-${color}-100 rounded-lg flex items-center justify-center
              transform transition-all duration-500 ${isAnimating ? 'scale-105' : ''}`}>
              <div className="text-center">
                <div className="font-mono text-sm">{rightData}</div>
                <div className="text-xs mt-1">New Left</div>
              </div>
            </div>
            <div className={`w-24 h-24 bg-${color}-100 rounded-lg flex items-center justify-center
              transform transition-all duration-500 ${isAnimating ? 'scale-105' : ''}`}>
              <div className="text-center">
                <div className="font-mono text-sm">{leftData}</div>
                <div className="text-xs mt-1">New Right</div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Controls */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowSubkeys(!showSubkeys)}
            className={`px-4 py-2 rounded-lg ${
              color === 'blue' ? 'bg-blue-100 hover:bg-blue-200' : 'bg-green-100 hover:bg-green-200'
            }`}
          >
            {showSubkeys ? 'Hide' : 'Show'} Subkeys
          </button>
        </div>
      </div>
    </div>
  )};

  return (
    <Card className="w-full max-w-4xl bg-white">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Blowfish vs Twofish Comparison</CardTitle>
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={() => {
              setActiveAlgorithm('blowfish');
              resetAnimation();
            }}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              activeAlgorithm === 'blowfish' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Blowfish
          </button>
          <button
            onClick={() => {
              setActiveAlgorithm('twofish');
              resetAnimation();
            }}
            className={`px-4 py-2 rounded-lg transition-all duration-300 ${
              activeAlgorithm === 'twofish' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Twofish
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="p-6">
          {/* Algorithm Details */}
          <div className={`transition-all duration-500 ${
            activeAlgorithm === 'blowfish' ? 'bg-blue-50' : 'bg-green-50'
          } rounded-lg p-6`}>
            <div className="grid grid-cols-2 gap-8">
              {/* Left column - Key details */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Key Characteristics</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Key className={`w-5 h-5 ${
                      activeAlgorithm === 'blowfish' ? 'text-blue-600' : 'text-green-600'
                    }`} />
                    <span>Key Size: {algorithms[activeAlgorithm].keySize}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Box className={`w-5 h-5 ${
                      activeAlgorithm === 'blowfish' ? 'text-blue-600' : 'text-green-600'
                    }`} />
                    <span>Block Size: {algorithms[activeAlgorithm].blockSize}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <SplitSquareHorizontal className={`w-5 h-5 ${
                      activeAlgorithm === 'blowfish' ? 'text-blue-600' : 'text-green-600'
                    }`} />
                    <span>Rounds: {algorithms[activeAlgorithm].rounds}</span>
                  </div>
                </div>
              </div>

              {/* Right column - Features */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {algorithms[activeAlgorithm].features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        activeAlgorithm === 'blowfish' ? 'bg-blue-600' : 'bg-green-600'
                      }`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Feistel Network Visualization */}
            <div className="mt-8">
              <button
                onClick={() => setShowFeistel(!showFeistel)}
                className={`w-full py-2 rounded-lg transition-all duration-300 ${
                  activeAlgorithm === 'blowfish' 
                    ? 'bg-blue-200 hover:bg-blue-300' 
                    : 'bg-green-200 hover:bg-green-300'
                }`}
              >
                {showFeistel ? 'Hide' : 'Show'} Feistel Network Animation
              </button>
              
              {showFeistel && (
                <div className="mt-4 transition-all duration-500">
                  <FeistelNetwork color={activeAlgorithm === 'blowfish' ? 'blue' : 'green'} />
                </div>
              )}
            </div>
          </div>

          {/* Security Comparison */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Security Comparison</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium text-blue-600">Blowfish</h4>
                <ul className="list-disc pl-4">
                  <li>Vulnerable to birthday attacks on 64-bit block</li>
                  <li>Strong against differential cryptanalysis</li>
                  <li>No significant cryptographic weaknesses found</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-green-600">Twofish</h4>
                <ul className="list-disc pl-4">
                  <li>Larger 128-bit block size prevents birthday attacks</li>
                  <li>Advanced key scheduling</li>
                  <li>Extensively analyzed during AES competition</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlowfishTwofishVisualization;
