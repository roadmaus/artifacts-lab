import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RotateCcw, Lock, Unlock, ArrowRight } from 'lucide-react';

const VigenereCipher = () => {
  const [input, setInput] = useState('HELLO');
  const [key, setKey] = useState('KEY');
  const [activeRow, setActiveRow] = useState(null);
  const [activeCol, setActiveCol] = useState(null);
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  // Create Vigenère tableau
  const createTableau = () => {
    return alphabet.map((_, i) => {
      return alphabet.slice(i).concat(alphabet.slice(0, i));
    });
  };
  
  const tableau = createTableau();
  
  const encrypt = (text, key) => {
    const repeatedKey = key.repeat(Math.ceil(text.length / key.length)).slice(0, text.length);
    return text
      .toUpperCase()
      .split('')
      .map((char, i) => {
        if (!char.match(/[A-Z]/)) return char;
        const row = alphabet.indexOf(repeatedKey[i]);
        const col = alphabet.indexOf(char);
        return tableau[row][col];
      })
      .join('');
  };

  const getRepeatedKey = () => {
    return key.repeat(Math.ceil(input.length / key.length)).slice(0, input.length);
  };

  const reset = () => {
    setInput('HELLO');
    setKey('KEY');
    setActiveRow(null);
    setActiveCol(null);
  };

  const highlightCell = (row, col) => {
    setActiveRow(row);
    setActiveCol(col);
  };

  const clearHighlight = () => {
    setActiveRow(null);
    setActiveCol(null);
  };

  return (
    <div className="p-4">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h2 className="text-xl font-bold">Vigenère Cipher</h2>
              <p className="text-sm text-gray-500">A polyalphabetic substitution cipher</p>
            </div>
            <button 
              onClick={reset}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          {/* Input Controls */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Message:</label>
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
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Key:</label>
              <div className="relative">
                <input
                  type="text"
                  value={key}
                  onChange={(e) => setKey(e.target.value.toUpperCase())}
                  maxLength={12}
                  className="w-full p-3 border rounded-lg text-lg text-center uppercase"
                  placeholder="Enter key..."
                />
                <Unlock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Encryption Process Visualization */}
          <div className="overflow-x-auto">
            <div className="flex justify-center min-w-max p-4">
              {input.split('').map((char, i) => {
                const keyChar = getRepeatedKey()[i];
                const row = alphabet.indexOf(keyChar);
                const col = alphabet.indexOf(char);
                return (
                  <div 
                    key={i} 
                    className="flex flex-col items-center mx-2"
                    onMouseEnter={() => highlightCell(row, col)}
                    onMouseLeave={clearHighlight}
                  >
                    <div className="grid grid-rows-2 gap-2">
                      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 font-mono text-lg">
                        {char}
                      </div>
                      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-green-100 font-mono text-lg">
                        {keyChar}
                      </div>
                    </div>
                    <ArrowRight className="my-2 text-blue-500 w-4 h-4" />
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-blue-500 text-white font-mono text-lg">
                      {tableau[row][col]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tableau Visualization */}
          <div className="overflow-x-auto bg-gray-50 rounded-lg p-4">
            <div className="min-w-max">
              {/* Header row */}
              <div className="flex">
                <div className="w-8 h-8 flex items-center justify-center font-bold">+</div>
                {alphabet.map((letter, i) => (
                  <div 
                    key={i}
                    className={`w-8 h-8 flex items-center justify-center font-mono
                      ${activeCol === i ? 'bg-blue-100' : ''}`}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              {/* Tableau rows */}
              {tableau.map((row, i) => (
                <div key={i} className="flex">
                  <div 
                    className={`w-8 h-8 flex items-center justify-center font-mono
                      ${activeRow === i ? 'bg-green-100' : ''}`}
                  >
                    {alphabet[i]}
                  </div>
                  {row.map((cell, j) => (
                    <div 
                      key={j}
                      className={`w-8 h-8 flex items-center justify-center text-sm
                        ${activeRow === i && activeCol === j ? 'bg-blue-500 text-white' : 
                          (activeRow === i || activeCol === j ? 'bg-gray-100' : '')}`}
                    >
                      {cell}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Result */}
          <div className="relative">
            <input
              type="text"
              value={encrypt(input, key)}
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

export default VigenereCipher;
