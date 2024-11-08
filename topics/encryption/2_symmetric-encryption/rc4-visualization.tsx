import React, { useState, useEffect } from 'react';
import { Info, Play, Pause, RotateCcw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const RC4Visualization = () => {
  const [key, setKey] = useState('Key123');
  const [sBox, setSBox] = useState(Array.from({ length: 16 }, (_, i) => i));
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [currentI, setCurrentI] = useState(0);
  const [currentJ, setCurrentJ] = useState(0);

  // Initialize S-box
  const initializeSBox = () => {
    setSBox(Array.from({ length: 16 }, (_, i) => i));
    setStep(0);
    setCurrentI(0);
    setCurrentJ(0);
  };

  // KSA Step
  const performKSAStep = () => {
    if (step >= 16) return;

    setSBox(prev => {
      const newSBox = [...prev];
      const i = step;
      const j = (currentJ + newSBox[i] + key.charCodeAt(i % key.length)) % 16;
      
      // Swap values
      [newSBox[i], newSBox[j]] = [newSBox[j], newSBox[i]];
      
      setCurrentI(i);
      setCurrentJ(j);
      
      return newSBox;
    });
    
    setStep(prev => prev + 1);
  };

  // Animation control
  useEffect(() => {
    let timer;
    if (isPlaying && step < 16) {
      timer = setTimeout(performKSAStep, speed);
    } else if (step >= 16) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, step, speed]);

  // Get cell background color based on state
  const getCellColor = (index) => {
    if (index === currentI) return 'bg-blue-200';
    if (index === currentJ) return 'bg-green-200';
    return 'bg-white';
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header and Controls */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">RC4 Stream Cipher Visualization</h2>
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Historical Context</AlertTitle>
          <AlertDescription>
            RC4 is a historically significant stream cipher that is now considered cryptographically broken.
            This visualization is for educational purposes only.
          </AlertDescription>
        </Alert>
        
        {/* Controls */}
        <div className="flex gap-4 items-center">
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Enter key"
            className="border p-2 rounded"
            maxLength={8}
          />
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <button
            onClick={initializeSBox}
            className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
          <select
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="border p-2 rounded"
          >
            <option value={2000}>Slow</option>
            <option value={1000}>Normal</option>
            <option value={500}>Fast</option>
          </select>
        </div>
      </div>

      {/* S-box Grid */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">S-box State (Step {step}/16)</h3>
        <div className="grid grid-cols-4 gap-2">
          {sBox.map((value, index) => (
            <div
              key={index}
              className={`p-4 border rounded text-center ${getCellColor(index)} transition-colors duration-300`}
            >
              <div className="text-xs text-gray-500">Index {index}</div>
              <div className="text-lg font-mono">{value.toString(16).toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Status and Information */}
      <div className="space-y-2">
        <div className="text-sm">
          <span className="font-semibold">Current i:</span> {currentI}
        </div>
        <div className="text-sm">
          <span className="font-semibold">Current j:</span> {currentJ}
        </div>
        <div className="text-sm">
          <span className="font-semibold">Status:</span>{' '}
          {step >= 16 ? 'KSA Complete' : 'KSA In Progress'}
        </div>
      </div>
    </div>
  );
};

export default RC4Visualization;
