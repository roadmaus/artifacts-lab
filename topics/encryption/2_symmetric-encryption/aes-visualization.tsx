import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  RefreshCcw, 
  Grid, 
  Shuffle, 
  RotateCcw, 
  Key 
} from 'lucide-react';

const AESVisualization = () => {
  const [currentRound, setCurrentRound] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [matrix, setMatrix] = useState(generateInitialMatrix());
  
  // Generate a 4x4 matrix of random hex values
  function generateInitialMatrix() {
    return Array(4).fill().map(() => 
      Array(4).fill().map(() => 
        Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
      )
    );
  }

  const stages = ['SubBytes', 'ShiftRows', 'MixColumns', 'AddRoundKey'];

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStage((prev) => {
          if (prev === stages.length - 1) {
            if (currentRound === 9) {
              setIsPlaying(false);
              return 0;
            }
            setCurrentRound(r => r + 1);
            return 0;
          }
          return prev + 1;
        });
      }, 2000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentRound]);

  const handleReset = () => {
    setCurrentRound(0);
    setCurrentStage(0);
    setIsPlaying(false);
    setMatrix(generateInitialMatrix());
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 p-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            AES Encryption Process
          </h1>
          <div className="space-x-2">
            <Button
              variant={isPlaying ? "secondary" : "default"}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? 'Pause' : 'Play'} Animation
            </Button>
            <Button variant="outline" onClick={handleReset}>
              <RefreshCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>

        {/* Round Progress */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-gray-600">Round:</span>
            <span className="text-lg font-bold text-blue-600">{currentRound + 1}/10</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 rounded-full h-2 transition-all duration-300"
              style={{ width: `${((currentRound * 4 + currentStage + 1) / 40) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Grid Visualization */}
        <div className="grid grid-cols-2 gap-8">
          {/* State Matrix */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">Current State Matrix</h3>
            <div className="grid grid-cols-4 gap-2">
              {matrix.map((row, i) => (
                row.map((cell, j) => (
                  <div
                    key={`${i}-${j}`}
                    className={`
                      h-12 w-12 rounded-lg flex items-center justify-center
                      font-mono text-sm border-2 transition-all duration-300
                      ${(i + j) % 2 === 0 ? 'bg-blue-50' : 'bg-blue-100'}
                      ${currentStage === 0 ? 'border-purple-400' :
                        currentStage === 1 ? 'border-green-400' :
                        currentStage === 2 ? 'border-orange-400' :
                        'border-blue-400'}
                    `}
                  >
                    {cell}
                  </div>
                ))
              ))}
            </div>
          </div>

          {/* Current Operation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-700">Current Operation</h3>
            <div className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                {currentStage === 0 && <Grid className="w-5 h-5 text-purple-500" />}
                {currentStage === 1 && <Shuffle className="w-5 h-5 text-green-500" />}
                {currentStage === 2 && <RotateCcw className="w-5 h-5 text-orange-500" />}
                {currentStage === 3 && <Key className="w-5 h-5 text-blue-500" />}
                <span className="font-semibold">
                  {stages[currentStage]}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {currentStage === 0 && "Substituting each byte with a corresponding value from the S-box"}
                {currentStage === 1 && "Cyclically shifting each row by different offsets"}
                {currentStage === 2 && (currentRound !== 9 ? "Mixing columns using matrix multiplication" : "Skipped in final round")}
                {currentStage === 3 && "XORing the state with the round key"}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Information Cards */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="font-semibold text-gray-700 mb-3">Key Features</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              128-bit block size (16 bytes)
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              10 rounds for 128-bit key
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              4 transformations per round
            </li>
          </ul>
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold text-gray-700 mb-3">Round Structure</h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="space-y-2">
              {stages.map((stage, index) => (
                <div 
                  key={stage}
                  className={`flex items-center gap-2 p-2 rounded
                    ${currentStage === index ? 'bg-blue-50' : ''}`}
                >
                  <ArrowRight className="w-4 h-4" />
                  {stage}
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AESVisualization;
