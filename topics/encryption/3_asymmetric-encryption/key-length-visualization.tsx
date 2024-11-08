import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Shield, Clock, Zap, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Simulated data for visualization
const getComputeTime = (bits) => {
  // Simplified exponential growth simulation
  return Math.pow(2, (bits - 1024) / 256) * 0.1;
};

const getSecurityYears = (bits) => {
  // Simplified security timeline estimation
  return Math.pow(2, (bits - 1024) / 384) * 5;
};

const generatePerformanceData = (keySize) => {
  return {
    encryptionTime: getComputeTime(keySize),
    decryptionTime: getComputeTime(keySize) * 1.5,
    securityYears: getSecurityYears(keySize),
    storageSize: keySize / 8, // bytes
  };
};

const KeyLengthVisualizer = () => {
  const [selectedKeySize, setSelectedKeySize] = useState(2048);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Generate data points for the security timeline chart
  const timelineData = Array.from({ length: 8 }, (_, i) => {
    const bits = 1024 + (i * 512);
    return {
      bits,
      years: getSecurityYears(bits),
      computeTime: getComputeTime(bits),
    };
  });

  const performance = generatePerformanceData(selectedKeySize);

  const SecurityIndicator = ({ value, max }) => {
    // Ensure the percentage never exceeds 100%
    const percentage = Math.min((value / max) * 100, 100);
    return (
      <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
        <div
          className="bg-blue-500 rounded-full h-2 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    );
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="text-blue-500" />
          RSA Key Length Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Key size of at least 2048 bits is recommended for RSA keys. Larger keys provide better security but require more computational resources.
          </AlertDescription>
        </Alert>

        <div className="mb-8">
          <label className="block text-sm font-medium mb-2">
            Select Key Size (bits):
          </label>
          <input
            type="range"
            min="1024"
            max="4096"
            step="256"
            value={selectedKeySize}
            onChange={(e) => setSelectedKeySize(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-center font-mono mt-2">{selectedKeySize} bits</div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Shield className="text-green-500" />
              Security Analysis
            </h3>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Estimated Security Timeline</span>
                <span>{performance.securityYears.toFixed(1)} years</span>
              </div>
              <SecurityIndicator value={performance.securityYears} max={100} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Relative Strength</span>
                <span>{((selectedKeySize / 2048) * 100).toFixed(0)}%</span>
              </div>
              <SecurityIndicator value={selectedKeySize} max={4096} />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Zap className="text-yellow-500" />
              Performance Impact
            </h3>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Encryption Time</span>
                <span>{performance.encryptionTime.toFixed(2)}ms</span>
              </div>
              <SecurityIndicator value={performance.encryptionTime} max={10} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Key Size</span>
                <span>{performance.storageSize} bytes</span>
              </div>
              <SecurityIndicator value={performance.storageSize} max={512} />
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="mb-4 text-blue-500 hover:text-blue-600 transition-colors"
        >
          {showAdvanced ? "Hide" : "Show"} Advanced Analysis
        </button>

        {showAdvanced && (
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="bits" label={{ value: 'Key Size (bits)', position: 'bottom' }} />
                <YAxis label={{ value: 'Security Timeline (years)', angle: -90, position: 'left' }} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="years" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold flex items-center gap-2 mb-2">
            <Clock className="text-purple-500" />
            Recommendations
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              {selectedKeySize < 2048 ? (
                <span className="text-red-500">Current key size is below recommended minimum of 2048 bits</span>
              ) : (
                <span className="text-green-500">Current key size meets minimum security requirements</span>
              )}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              Expected to remain secure for approximately {performance.securityYears.toFixed(1)} years
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500">•</span>
              {performance.encryptionTime > 1 ? 
                "Consider the performance impact for high-volume operations" :
                "Performance impact is minimal for most applications"}
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyLengthVisualizer;