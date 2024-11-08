import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RotateCcw, Lock, Unlock, RefreshCw } from 'lucide-react';

const AtbashCipher = () => {
  const [input, setInput] = useState('HELLO');
  
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const reverseAlphabet = [...alphabet].reverse();
  
  const encrypt = (text) => {
    return text
      .toUpperCase()
      .split('')
      .map(char => {
        if (!char.match(/[A-Z]/)) return char;
        const index = alphabet.indexOf(char);
        return reverseAlphabet[index];
      })
      .join('');
  };

  const getShiftedLetter = (letter) => {
    if (!letter.match(/[A-Z]/)) return letter;
    const index = alphabet.indexOf(letter);
    return reverseAlphabet[index];
  };

  const reset = () => {
    setInput('HELLO');
  };

  return (
    <div className="p-4">
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h2 className="text-xl font-bold">Atbash Cipher</h2>
              <p className="text-sm text-gray-500">A ↔ Z, B ↔ Y, C ↔ X, ...</p>
            </div>
            <button 
              onClick={reset}
              className="p-2 hover:bg-gray-100 rounded-full"
              title="Reset"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          {/* Input */}
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

          {/* Letter Mapping Visualization */}
          <div className="overflow-x-auto">
            <div className="flex justify-center min-w-max p-4">
              {input.split('').map((char, i) => (
                <div key={i} className="flex flex-col items-center mx-2">
                  {/* Original Letter */}
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 font-mono text-lg">
                    {char}
                  </div>
                  
                  {/* Mirror Animation */}
                  <div className="my-2 flex flex-col items-center">
                    <RefreshCw className="text-purple-500 w-4 h-4" />
                    <span className="text-xs text-gray-500">mirror</span>
                  </div>
                  
                  {/* Encrypted Letter */}
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-purple-500 text-white font-mono text-lg">
                    {getShiftedLetter(char)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alphabet Reference */}
          <div className="bg-gray-100 rounded-lg p-4 overflow-x-auto">
            <div className="flex flex-col space-y-2">
              {/* Forward alphabet */}
              <div className="flex justify-center min-w-max space-x-1">
                {alphabet.map((letter, i) => (
                  <div key={i} className="w-6 text-center">
                    <div className="text-sm text-gray-600">{letter}</div>
                  </div>
                ))}
              </div>
              
              {/* Mirror line */}
              <div className="flex justify-center">
                <div className="w-full border-b border-dashed border-purple-300"></div>
              </div>
              
              {/* Reverse alphabet */}
              <div className="flex justify-center min-w-max space-x-1">
                {reverseAlphabet.map((letter, i) => (
                  <div key={i} className="w-6 text-center">
                    <div className="text-sm text-purple-600">{letter}</div>
                  </div>
                ))}
              </div>
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

          {/* Key Fact */}
          <div className="text-center text-sm text-gray-500">
            Fun fact: Atbash is its own inverse - encoding twice returns the original text!
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AtbashCipher;
