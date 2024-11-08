import React, { useState, useEffect, useCallback } from 'react';
import { ArrowUp, HardDrive, Zap, RefreshCw, Server, Database, AlertCircle, Check, X, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const NFSv3Visual = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [writeMode, setWriteMode] = useState('sync');
  const [writeBuffer, setWriteBuffer] = useState([]);
  const [isCommitting, setIsCommitting] = useState(false);
  const [cacheStatus, setCacheStatus] = useState({
    client1: { modified: false, timestamp: Date.now() },
    client2: { modified: false, timestamp: Date.now() }
  });

  // File Size Demonstration Component
  const FileSizeDemo = () => {
    const [currentSize, setCurrentSize] = useState(0);
    const maxSize = 1024; // 1TB for demonstration

    return (
      <div className="space-y-4">
        <div className="relative h-24 bg-gray-100 rounded-lg overflow-hidden">
          <div 
            className="absolute h-full bg-blue-500 transition-all duration-500"
            style={{ width: `${(currentSize / maxSize) * 100}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center text-sm">
            Current file size: {currentSize}GB
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[2, 10, 100, 1000].map(size => (
            <button
              key={size}
              className="p-2 bg-blue-100 rounded hover:bg-blue-200"
              onClick={() => setCurrentSize(size)}
            >
              {size}GB File
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Write Operation Simulation
  const WriteOperationDemo = () => {
    const addWriteOperation = () => {
      const newWrite = {
        id: Date.now(),
        size: Math.random() * 100 + 50,
        status: 'pending'
      };
      setWriteBuffer(prev => [...prev, newWrite]);

      if (writeMode === 'async' && writeBuffer.length >= 3) {
        commitWrites();
      }
    };

    const commitWrites = useCallback(() => {
      setIsCommitting(true);
      setTimeout(() => {
        setWriteBuffer([]);
        setIsCommitting(false);
      }, 1500);
    }, []);

    return (
      <div className="space-y-4">
        <div className="flex gap-4 mb-4">
          <button
            className={`flex-1 p-2 rounded ${writeMode === 'sync' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            onClick={() => setWriteMode('sync')}
          >
            Synchronous Mode
          </button>
          <button
            className={`flex-1 p-2 rounded ${writeMode === 'async' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            onClick={() => setWriteMode('async')}
          >
            Asynchronous Mode
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Write Buffer:</span>
            {writeMode === 'async' && (
              <button
                className="px-3 py-1 bg-green-500 text-white rounded disabled:bg-gray-300"
                onClick={commitWrites}
                disabled={writeBuffer.length === 0 || isCommitting}
              >
                COMMIT
              </button>
            )}
          </div>
          <div className="h-32 bg-gray-100 rounded-lg p-2 overflow-y-auto">
            {writeBuffer.map(write => (
              <div key={write.id} className="flex items-center gap-2 mb-1">
                <div className="w-full bg-blue-200 rounded p-1">
                  Write Operation ({Math.round(write.size)}KB)
                </div>
              </div>
            ))}
            {isCommitting && (
              <div className="text-green-500 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Committing writes...
              </div>
            )}
          </div>
        </div>

        <button
          className="w-full p-2 bg-blue-100 rounded hover:bg-blue-200"
          onClick={addWriteOperation}
          disabled={isCommitting}
        >
          Add Write Operation
        </button>
      </div>
    );
  };

  // Cache Consistency Demo
  const CacheConsistencyDemo = () => {
    const updateFile = (clientId) => {
      setCacheStatus(prev => ({
        ...prev,
        [clientId]: { modified: true, timestamp: Date.now() }
      }));
      
      // Simulate cache update notification
      setTimeout(() => {
        setCacheStatus(prev => ({
          ...prev,
          [clientId === 'client1' ? 'client2' : 'client1']: {
            modified: false,
            timestamp: Date.now()
          }
        }));
      }, 1000);
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {['client1', 'client2'].map(clientId => (
            <Card key={clientId}>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Client {clientId.slice(-1)}</h3>
                <div className="space-y-2">
                  <div className={`p-2 rounded ${
                    cacheStatus[clientId].modified ? 'bg-yellow-100' : 'bg-green-100'
                  }`}>
                    Cache Status: {cacheStatus[clientId].modified ? 'Modified' : 'Current'}
                  </div>
                  <button
                    className="w-full p-2 bg-blue-100 rounded hover:bg-blue-200"
                    onClick={() => updateFile(clientId)}
                  >
                    Modify File
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ArrowUp className="w-6 h-6" />
          <CardTitle>NFS Version 3 Improvements</CardTitle>
        </div>
        <CardDescription>
          Interactive exploration of key enhancements and new features in NFS Version 3
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid grid-cols-4 gap-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="filesize">64-bit Files</TabsTrigger>
            <TabsTrigger value="writes">Write Operations</TabsTrigger>
            <TabsTrigger value="cache">Cache Consistency</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Alert>
                    <AlertCircle className="w-4 h-4" />
                    <AlertDescription>
                      NFS Version 3 introduces significant improvements over V2, including support for larger files,
                      improved write operations, better cache management, and enhanced error reporting.
                    </AlertDescription>
                  </Alert>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        icon: <HardDrive className="w-6 h-6" />,
                        title: "64-bit File Support",
                        description: "Handle files larger than 2GB"
                      },
                      {
                        icon: <Zap className="w-6 h-6" />,
                        title: "Async Writes",
                        description: "Improved write performance"
                      },
                      {
                        icon: <RefreshCw className="w-6 h-6" />,
                        title: "Cache Consistency",
                        description: "Better cache management"
                      },
                      {
                        icon: <AlertCircle className="w-6 h-6" />,
                        title: "Error Reporting",
                        description: "Enhanced error handling"
                      }
                    ].map((feature, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg flex gap-3">
                        {feature.icon}
                        <div>
                          <h3 className="font-semibold">{feature.title}</h3>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="filesize">
            <Card>
              <CardContent className="p-6">
                <FileSizeDemo />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="writes">
            <Card>
              <CardContent className="p-6">
                <WriteOperationDemo />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cache">
            <Card>
              <CardContent className="p-6">
                <CacheConsistencyDemo />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NFSv3Visual;
