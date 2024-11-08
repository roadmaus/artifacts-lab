import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { ArrowRight, RotateCcw, Lock, Unlock } from 'lucide-react';

const CaesarCipher = () => {
  const [input, setInput] = useState('HELLO');
  const [shift, setShift] = useState([3]);
  
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  const encrypt = (text) => {
    return text
      .toUpperCase()
      .split('')
      .map(char => {
        if (!char.match(/[A-Z]/)) return char;
        const currentIndex = alphabet.indexOf(char);
        const newIndex = (currentIndex + shift[0]) % 26;
        return alphabet[newIndex];
      })
      .join('');
  };

  const getShiftedLetter = (letter) => {
    if (!letter.match(/[A-Z]/)) return letter;
    const currentIndex = alphabet.indexOf(letter);
    const newIndex = (currentIndex + shift[0]) % 26;
    return alphabet[newIndex];
  };

  const reset = () => {
    setInput('HELLO');
    setShift([3]);
  };

  return (
    <div className="p-4">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Caesar Cipher</h2>
            <button 
              onClick={reset}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          {/* Input and Controls */}
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value.toUpperCase())}
                maxLength={12}
                className="w-full p-3 border rounded-lg text-lg text-center uppercase"
                placeholder="Enter text..."
              />
              <Unlock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Shift Amount:</span>
                <span className="font-mono">ROT-{shift[0]}</span>
              </div>
              <Slider
                value={shift}
                onValueChange={setShift}
                max={25}
                min={0}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          {/* Letter Mapping Visualization */}
          <div className="overflow-x-auto">
            <div className="flex justify-center min-w-max p-4">
              {input.split('').map((char, i) => (
                <div key={i} className="flex flex-col items-center mx-2">
                  {/* Original Letter */}
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 font-mono text-lg">
                    {char}
                  </div>
                  
                  {/* Arrow and Shift Amount */}
                  <div className="my-2 flex flex-col items-center">
                    <ArrowRight className="text-blue-500 w-4 h-4" />
                    <span className="text-xs text-gray-500">+{shift[0]}</span>
                  </div>
                  
                  {/* Encrypted Letter */}
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-500 text-white font-mono text-lg">
                    {getShiftedLetter(char)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alphabet Reference */}
          <div className="bg-gray-100 rounded-lg p-4 overflow-x-auto">
            <div className="flex justify-center min-w-max space-x-1">
              {alphabet.map((letter, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="text-sm text-gray-600">{letter}</div>
                  <div className="h-4 border-l border-gray-300"></div>
                  <div className="text-sm text-blue-600">
                    {alphabet[(i + shift[0]) % 26]}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Result */}
          <div className="relative">
            <input
              type="text"
              value={encrypt(input)}
              readOnly
              className="w-full p-3 bg-gray-100 border rounded-lg text-lg text-center uppercase"
            />
            <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaesarCipher;
