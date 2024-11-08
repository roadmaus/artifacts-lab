import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { ChevronRight, Lock, Unlock } from 'lucide-react';

const CipherVisualization = () => {
  const [streamPosition, setStreamPosition] = useState(0);
  const [blockIndex, setBlockIndex] = useState(0);

  useEffect(() => {
    const streamInterval = setInterval(() => {
      setStreamPosition(prev => (prev + 1) % 100);
    }, 50);

    const blockInterval = setInterval(() => {
      setBlockIndex(prev => (prev + 1) % 3);
    }, 2000);

    return () => {
      clearInterval(streamInterval);
      clearInterval(blockInterval);
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Types of Symmetric Ciphers
      </h1>

      {/* Block Cipher Section */}
      <Card className="p-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-blue-700">
            <Lock className="h-5 w-5" />
            Block Cipher
          </h2>
          
          <div className="relative">
            <div className="flex gap-4 mb-8">
              {[0, 1, 2].map((i) => (
                <div
                  key={`block-${i}`}
                  className={`w-32 h-24 rounded-lg border-2 transition-all duration-500 flex items-center justify-center font-mono relative overflow-hidden
                    ${i === blockIndex ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                >
                  {i === blockIndex && (
                    <div className="absolute inset-0 bg-blue-200 animate-pulse opacity-30" />
                  )}
                  Block {i + 1}
                </div>
              ))}
            </div>

            <div className="flex justify-center my-4">
              <div className="flex items-center gap-2">
                <ChevronRight className="h-8 w-8 text-blue-500 animate-bounce" />
                <span className="text-sm text-gray-500">Processing blocks sequentially</span>
              </div>
            </div>

            <div className="flex gap-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={`encrypted-${i}`}
                  className={`w-32 h-24 rounded-lg border-2 flex items-center justify-center font-mono
                    ${i <= blockIndex ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}
                >
                  {i <= blockIndex && (
                    <span className="text-green-700">Encrypted</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Stream Cipher Section */}
      <Card className="p-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-orange-700">
            <Lock className="h-5 w-5" />
            Stream Cipher
          </h2>

          <div className="relative h-32 bg-gray-50 rounded-lg overflow-hidden">
            {/* Input Stream */}
            <div 
              className="absolute top-4 left-0 flex transition-transform duration-100"
              style={{ transform: `translateX(-${streamPosition}%)` }}
            >
              {[...Array(20)].map((_, i) => (
                <span
                  key={`bit-${i}`}
                  className="inline-block w-8 text-center font-mono text-sm"
                >
                  {Math.random() > 0.5 ? '1' : '0'}
                </span>
              ))}
            </div>

            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-orange-500 animate-pulse" />

            {/* Output Stream */}
            <div 
              className="absolute bottom-4 left-0 flex transition-transform duration-100"
              style={{ transform: `translateX(-${streamPosition}%)` }}
            >
              {[...Array(20)].map((_, i) => (
                <span
                  key={`encrypted-bit-${i}`}
                  className="inline-block w-8 text-center font-mono text-sm text-orange-600"
                >
                  {Math.random() > 0.5 ? '1' : '0'}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-8 mt-8">
        <div className="space-y-2">
          <h3 className="font-semibold text-blue-700">Block Cipher Characteristics</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>Processes fixed-size blocks of data</li>
            <li>All data in block must be available before processing</li>
            <li>Suitable for large files and stored data</li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-orange-700">Stream Cipher Characteristics</h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            <li>Processes one bit/byte at a time</li>
            <li>Immediate processing of input</li>
            <li>Ideal for real-time data streams</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CipherVisualization;
