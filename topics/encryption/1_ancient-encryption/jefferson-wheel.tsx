import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { RotateCw } from 'lucide-react';

const WheelRow = ({ index, rotation }) => {
  // Create a randomized alphabet for each wheel
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')
    .sort(() => Math.random() - 0.5)
    .join('');

  return (
    <div 
      className="flex items-center justify-center h-8 border-b border-gray-200 relative"
      style={{
        transform: `translateX(${rotation}px)`,
        transition: 'transform 0.3s ease-in-out'
      }}
    >
      <div className="flex absolute whitespace-nowrap font-mono">
        {/* Repeat alphabet twice for continuous scrolling effect */}
        {`${alphabet}${alphabet}`.split('').map((char, i) => (
          <span key={i} className="w-8 text-center">{char}</span>
        ))}
      </div>
    </div>
  );
};

const JeffersonWheelCipher = () => {
  const [rotations, setRotations] = useState(Array(36).fill(0));
  
  const handleRotate = (index) => {
    const newRotations = [...rotations];
    newRotations[index] = newRotations[index] - 32; // Move one character left
    if (newRotations[index] <= -256) { // Reset after full rotation
      newRotations[index] = 0;
    }
    setRotations(newRotations);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <RotateCw className="w-6 h-6 text-blue-500" />
            <CardTitle>Jefferson's Wheel Cipher (1795)</CardTitle>
          </div>
          <CardDescription>
            A mechanical encryption device consisting of 36 wheels on an axle,
            each with a randomized alphabet. Used by the American military until the 1940s.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="flex gap-6">
        {/* Cylinder Visualization */}
        <div className="relative">
          {/* Axle */}
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-gray-400 rounded-full" />
          
          {/* Wheels */}
          <div className="relative border-2 border-gray-400 rounded-lg overflow-hidden bg-white">
            <div className="w-64">
              {Array.from({ length: 36 }, (_, i) => (
                <div 
                  key={i}
                  className="flex items-center cursor-pointer hover:bg-blue-50"
                  onClick={() => handleRotate(i)}
                >
                  {/* Wheel number */}
                  <div className="w-8 text-center text-xs text-gray-500">
                    {(i + 1).toString().padStart(2, '0')}
                  </div>
                  
                  {/* Wheel characters */}
                  <div className="flex-1 overflow-hidden">
                    <WheelRow index={i} rotation={rotations[i]} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Each wheel contains a randomized alphabet</li>
              <li>• Click any row to rotate that wheel</li>
              <li>• Align wheels to encode/decode messages</li>
              <li>• Reading down any column creates cipher text</li>
              <li>• Recipient arranges wheels in agreed order</li>
              <li>• Original message appears in one of the columns</li>
            </ul>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold mb-2">Historical Significance</h4>
              <ul className="space-y-2 text-sm">
                <li>• Invented by Thomas Jefferson around 1795</li>
                <li>• Independently reinvented by Étienne Bazeries in 1891</li>
                <li>• Used by US military through World War II</li>
                <li>• Known as M-94 in military cryptographic devices</li>
                <li>• Could produce 36! possible wheel arrangements</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JeffersonWheelCipher;
