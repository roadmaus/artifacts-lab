import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Play, Pause, RotateCcw, ChevronRight } from 'lucide-react';

const ChaCha20Visualization = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [currentOperation, setCurrentOperation] = useState(0);
  const [speed, setSpeed] = useState(1000);

  const isColumnRound = Math.floor(currentRound / 2) % 2 === 0;
  
  const operations = [
    { type: 'ADD', description: 'Add a and b' },
    { type: 'XOR', description: 'XOR d with result' },
    { type: 'ROTATE', description: 'Rotate left by 16' },
    { type: 'ADD2', description: 'Add c and new d' }
  ];

  useEffect(() => {
    let timer;
    if (isAnimating) {
      timer = setTimeout(() => {
        setCurrentOperation(prev => {
          if (prev >= operations.length - 1) {
            setCurrentRound(currentRound => {
              if (currentRound >= 19) {
                setIsAnimating(false);
                return 0;
              }
              return currentRound + 1;
            });
            return 0;
          }
          return prev + 1;
        });
      }, speed);
    }
    return () => clearTimeout(timer);
  }, [isAnimating, currentOperation, currentRound, speed]);

  const resetAnimation = () => {
    setIsAnimating(false);
    setCurrentRound(0);
    setCurrentOperation(0);
  };

  const RoundDisplay = () => (
    <div className="text-center mb-8">
      <div className="text-2xl font-bold mb-3">
        Round {Math.floor(currentRound / 2) + 1}/10: {isColumnRound ? "Column" : "Diagonal"}
      </div>
      <div className="text-base text-gray-600">
        Operation {currentOperation + 1}/4: {operations[currentOperation].description}
      </div>
    </div>
  );

  const StateMatrix = () => {
    const getBackgroundColor = (row, col) => {
      if (isColumnRound) {
        return col === currentOperation % 4 ? 'bg-yellow-200' : 'bg-gray-100';
      } else {
        const isDiagonal = (row + currentOperation) % 4 === col;
        return isDiagonal ? 'bg-yellow-200' : 'bg-gray-100';
      }
    };

    return (
      <div className="grid grid-cols-4 gap-3 p-6 bg-white rounded-lg shadow-lg">
        {Array(4).fill().map((_, row) => (
          <div key={row} className="contents">
            {Array(4).fill().map((_, col) => (
              <div
                key={`${row}-${col}`}
                className={`p-3 rounded transition-all duration-300 ${getBackgroundColor(row, col)}`}
              >
                <div className="font-mono text-xs leading-tight text-center break-all">
                  {row === 0 ? (
                    <div className="overflow-hidden text-ellipsis">
                      {col === 0 ? "0x617078" : 
                       col === 1 ? "0x332064" : 
                       col === 2 ? "0x79622d" : 
                       "0x6b2065"}
                    </div>
                  ) : (
                    <div>
                      Word<br />{row * 4 + col}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const QuarterRoundVisualization = () => (
    <div className="mt-6 p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-6">Quarter Round Operation</h3>
      <div className="flex flex-col space-y-3">
        {operations.map((op, idx) => (
          <div
            key={idx}
            className={`flex items-center p-3 rounded ${
              currentOperation === idx ? 'bg-yellow-100' : 'bg-gray-50'
            }`}
          >
            <div className="w-8 text-center font-mono text-sm">{idx + 1}</div>
            <div className={`flex-1 font-mono text-sm px-4 ${
              currentOperation === idx ? 'font-bold' : ''
            }`}>
              {op.type === 'ADD' && 'a = a + b'}
              {op.type === 'XOR' && 'd = d ⊕ a'}
              {op.type === 'ROTATE' && 'd = d <<< 16'}
              {op.type === 'ADD2' && 'c = c + d'}
            </div>
            <ChevronRight className={`w-5 h-5 flex-shrink-0 ${
              currentOperation === idx ? 'text-yellow-500' : 'text-gray-400'
            }`} />
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t">
        <h4 className="font-semibold mb-3">Round Progress:</h4>
        <div className="flex items-center space-x-4">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentRound * 100) / 20}%` }}
            />
          </div>
          <span className="text-sm font-medium w-20 text-right">
            {currentRound}/20 rounds
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-5xl bg-white">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-3xl font-bold">ChaCha20 Round Operations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 p-4">
          {/* Controls */}
          <div className="flex justify-center items-center space-x-8 mb-6">
            <button
              onClick={() => setIsAnimating(!isAnimating)}
              className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
            >
              {isAnimating ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button
              onClick={resetAnimation}
              className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-4">
              <span className="font-medium">Speed:</span>
              <input
                type="range"
                min="200"
                max="2000"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="w-48"
              />
            </div>
          </div>

          <RoundDisplay />
          
          {/* Main visualization */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">State Matrix</h3>
              <StateMatrix />
            </div>
            <div>
              <QuarterRoundVisualization />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChaCha20Visualization;
