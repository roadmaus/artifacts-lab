import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RotateCcw, Lock, Unlock, ArrowRight, ArrowDown } from 'lucide-react';

const AutokeyCipher = () => {
  const [input, setInput] = useState('HELLO');
  const [key, setKey] = useState('KEY');
  const [activeRow, setActiveRow] = useState(null);
  const [activeCol, setActiveCol] = useState(null);
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  // Create Vigenère tableau for Autokey
  const createTableau = () => {
    return alphabet.map((_, i) => {
      return alphabet.slice(i).concat(alphabet.slice(0, i));
    });
  };
  
  const tableau = createTableau();
  
  const getFullKey = (text, initialKey) => {
    const cleanText = text.replace(/[^A-Z]/g, '');
    const cleanKey = initialKey.replace(/[^A-Z]/g, '');
    return (cleanKey + cleanText).slice(0, cleanText.length);
  };

  const encrypt = (text, initialKey) => {
    const fullKey = getFullKey(text, initialKey);
    return text
      .toUpperCase()
      .split('')
      .map((char, i) => {
        if (!char.match(/[A-Z]/)) return char;
        const row = alphabet.indexOf(fullKey[i]);
        const col = alphabet.indexOf(char);
        return tableau[row][col];
      })
      .join('');
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

  const getKeyGeneration = () => {
    const initialKeyArray = key.split('');
    const inputArray = input.split('');
    const fullKeyArray = getFullKey(input, key).split('');
    
    return fullKeyArray.map((char, i) => ({
      isFromInitialKey: i < key.length,
      plaintext: inputArray[i],
      keyChar: char,
      result: encrypt(input, key)[i]
    }));
  };

  return (
    <div className="p-4">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <h2 className="text-xl font-bold">Autokey Cipher</h2>
              <p className="text-sm text-gray-500">Key is extended using the plaintext itself</p>
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
              <label className="text-sm font-medium">Plaintext:</label>
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
              <label className="text-sm font-medium">Initial Key:</label>
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

          {/* Key Generation Visualization */}
          <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto">
            <div className="flex justify-center min-w-max space-x-4">
              {getKeyGeneration().map((item, i) => (
                <div 
                  key={i}
                  className="flex flex-col items-center space-y-2"
                  onMouseEnter={() => highlightCell(alphabet.indexOf(item.keyChar), alphabet.indexOf(item.plaintext))}
                  onMouseLeave={clearHighlight}
                >
                  {/* Plaintext */}
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 font-mono text-lg">
                    {item.plaintext}
                  </div>
                  
                  {/* Key Generation */}
                  <div className={`w-12 h-12 flex items-center justify-center rounded-lg font-mono text-lg
                    ${item.isFromInitialKey ? 'bg-green-100' : 'bg-blue-100'}`}>
                    {item.keyChar}
                    {!item.isFromInitialKey && (
                      <div className="absolute -left-4">
                        <ArrowLeft className="w-4 h-4 text-blue-400" />
                      </div>
                    )}
                  </div>
                  
                  {/* Result */}
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-purple-500 text-white font-mono text-lg">
                    {item.result}
                  </div>
                </div>
              ))}
            </div>

            {/* Key Generation Legend */}
            <div className="flex justify-center mt-4 space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-100 rounded mr-2"></div>
                <span>Initial Key</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-100 rounded mr-2"></div>
                <span>Generated from Plaintext</span>
              </div>
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
                        ${activeRow === i && activeCol === j ? 'bg-purple-500 text-white' : 
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

const ArrowLeft = ({ className }) => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14M5 12l6-6M5 12l6 6"/>
  </svg>
);

export default AutokeyCipher;
