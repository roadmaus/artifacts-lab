import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

const ScytaleCipher = () => {
  const [text, setText] = useState('HELLO');
  const [diameter, setDiameter] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);

  const maxLength = diameter * diameter;

  const encryptedText = text.toUpperCase().padEnd(maxLength, '_')
    .split('')
    .reduce((grid, char, i) => {
      const row = Math.floor(i / diameter);
      const col = i % diameter;
      grid[col] = grid[col] || [];
      grid[col][row] = char;
      return grid;
    }, [])
    .flat()
    .join('');

  const handleTextChange = (e) => {
    const newText = e.target.value.replace(/[^A-Za-z]/g, '').toUpperCase();
    setText(newText.slice(0, maxLength));
    setIsAnimating(true);
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <Label>Message:</Label>
          <Input 
            value={text}
            onChange={handleTextChange}
            maxLength={maxLength}
            className="font-mono"
            placeholder="Enter text..."
          />
        </div>

        <div className="space-y-2">
          <Label>Rod Diameter: {diameter}</Label>
          <Slider
            value={[diameter]}
            onValueChange={(value) => setDiameter(value[0])}
            min={2}
            max={5}
            step={1}
            className="w-full"
          />
        </div>

        <div className="grid gap-4 p-2 text-center">
          <div className={`bg-blue-50 p-2 rounded transition-all duration-500 ${isAnimating ? 'scale-105' : ''}`}>
            <div className="text-sm mb-1">Wrapped on Rod ({diameter}×{diameter})</div>
            <div className={`grid gap-1 transition-all duration-300`} 
                 style={{ gridTemplateColumns: `repeat(${diameter}, minmax(0, 1fr))` }}>
              {text.toUpperCase().padEnd(maxLength, '_').split('').map((char, i) => (
                <div 
                  key={i}
                  className={`w-8 h-8 flex items-center justify-center font-mono border 
                             ${char === '_' ? 'bg-gray-50' : 'bg-white'}
                             transition-all duration-300
                             hover:bg-blue-100 cursor-default`}
                >
                  {char}
                </div>
              ))}
            </div>
          </div>

          <div className={`bg-gray-50 p-2 rounded transition-all duration-500 ${isAnimating ? 'scale-105' : ''}`}>
            <div className="text-sm mb-1">Encrypted Message</div>
            <div className="font-mono break-all">{encryptedText}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScytaleCipher;
