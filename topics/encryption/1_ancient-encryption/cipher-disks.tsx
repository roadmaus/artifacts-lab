import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { CircleDot } from 'lucide-react';

const CipherDisk = ({ subtitle, description, points }) => {
  return (
    <div className="relative mb-8">
      {/* Outer circle */}
      <div className="w-64 h-64 rounded-full border-4 border-blue-500 relative mx-auto">
        {/* Inner circle */}
        <div className="w-48 h-48 rounded-full border-4 border-blue-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-50">
          {/* Center dot */}
          <div className="w-4 h-4 rounded-full bg-blue-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        
        {/* Sample letters on outer circle */}
        {Array.from('ABCDEFGH').map((letter, i) => (
          <div
            key={letter}
            className="absolute font-mono font-bold"
            style={{
              left: `${32 + 30 * Math.cos(i * Math.PI / 4 - Math.PI / 2)}px`,
              top: `${32 + 30 * Math.sin(i * Math.PI / 4 - Math.PI / 2)}px`
            }}
          >
            {letter}
          </div>
        ))}
        
        {/* Sample numbers on inner circle */}
        {Array.from('12345678').map((num, i) => (
          <div
            key={num}
            className="absolute font-mono font-bold text-blue-600"
            style={{
              left: `${32 + 22 * Math.cos(i * Math.PI / 4 - Math.PI / 2)}px`,
              top: `${32 + 22 * Math.sin(i * Math.PI / 4 - Math.PI / 2)}px`
            }}
          >
            {num}
          </div>
        ))}
      </div>
      
      {/* Description card */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-xl">{subtitle}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc ml-6 space-y-2">
            {points.map((point, index) => (
              <li key={index} className="text-sm text-gray-600">{point}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

const CipherDisksVisualization = () => {
  const cipherData = {
    title: "Cipher Disks",
    icon: "CircleDot",
    sections: [
      {
        subtitle: "Alberti's Cipher Disk",
        description: "Explore the first mechanical polyalphabetic cipher device",
        points: [
          "Invented by Leon Battista Alberti in 1467",
          "Two concentric rotating disks with alphabets",
          "Could change encryption alphabet during message",
          "Introduced the concept of polyalphabetic substitution"
        ]
      },
      {
        subtitle: "The Confederate Cipher Disk",
        description: "Understanding Civil War era encryption technology",
        points: [
          "Used during the American Civil War",
          "Based on Vigenère cipher principles",
          "Portable and faster than manual encryption",
          "Multiple rotating disks for different substitutions"
        ]
      }
    ]
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <CircleDot className="w-6 h-6 text-blue-500" />
        <h1 className="text-2xl font-bold">{cipherData.title}</h1>
      </div>
      
      <div className="space-y-8">
        {cipherData.sections.map((section, index) => (
          <CipherDisk
            key={index}
            subtitle={section.subtitle}
            description={section.description}
            points={section.points}
          />
        ))}
      </div>
    </div>
  );
};

export default CipherDisksVisualization;
