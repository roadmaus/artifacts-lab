import React, { useState, useEffect } from 'react';
import { Monitor, Settings, Clock, Database, RefreshCw, AlertTriangle, Check, X, HardDrive } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const NFSMountConfig = () => {
  const [mountConfig, setMountConfig] = useState({
    server: '',
    export: '',
    mountpoint: '',
    version: '4',
    rsize: '32768',
    wsize: '32768',
    timeo: '600',
    mountType: 'hard',
    cacheSettings: {
      ac: true,
      cto: true
    }
  });

  const [mountStatus, setMountStatus] = useState('unmounted');
  const [selectedPreset, setSelectedPreset] = useState(null);

  // Mount Command Builder Component
  const MountCommandBuilder = () => {
    const generateMountCommand = () => {
      const options = [];
      options.push(`vers=${mountConfig.version}`);
      options.push(`rsize=${mountConfig.rsize}`);
      options.push(`wsize=${mountConfig.wsize}`);
      options.push(`timeo=${mountConfig.timeo}`);
      options.push(mountConfig.mountType);
      if (!mountConfig.cacheSettings.ac) options.push('noac');
      if (!mountConfig.cacheSettings.cto) options.push('nocto');

      return `mount -t nfs -o ${options.join(',')} ${mountConfig.server}:${mountConfig.export} ${mountConfig.mountpoint}`;
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Server</label>
            <input
              type="text"
              value={mountConfig.server}
              onChange={(e) => setMountConfig({...mountConfig, server: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="server.domain.com"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Export Path</label>
            <input
              type="text"
              value={mountConfig.export}
              onChange={(e) => setMountConfig({...mountConfig, export: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="/export/path"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Mount Point</label>
          <input
            type="text"
            value={mountConfig.mountpoint}
            onChange={(e) => setMountConfig({...mountConfig, mountpoint: e.target.value})}
            className="w-full p-2 border rounded"
            placeholder="/mnt/data"
          />
        </div>

        <div className="bg-gray-900 text-white p-4 rounded font-mono text-sm overflow-x-auto">
          {generateMountCommand()}
        </div>
      </div>
    );
  };

  // Performance Options Component
  const PerformanceOptions = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Read Size (rsize)</label>
            <select
              value={mountConfig.rsize}
              onChange={(e) => setMountConfig({...mountConfig, rsize: e.target.value})}
              className="w-full p-2 border rounded"
            >
              {['8192', '16384', '32768', '65536'].map(size => (
                <option key={size} value={size}>{size} bytes</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Write Size (wsize)</label>
            <select
              value={mountConfig.wsize}
              onChange={(e) => setMountConfig({...mountConfig, wsize: e.target.value})}
              className="w-full p-2 border rounded"
            >
              {['8192', '16384', '32768', '65536'].map(size => (
                <option key={size} value={size}>{size} bytes</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium">Timeout (timeo)</label>
            <input
              type="number"
              value={mountConfig.timeo}
              onChange={(e) => setMountConfig({...mountConfig, timeo: e.target.value})}
              className="w-full p-2 border rounded"
              min="1"
              max="1000"
            />
          </div>
        </div>
      </div>
    );
  };

  // Cache Management Component
  const CacheManagement = () => {
    const toggleCache = (setting) => {
      setMountConfig({
        ...mountConfig,
        cacheSettings: {
          ...mountConfig.cacheSettings,
          [setting]: !mountConfig.cacheSettings[setting]
        }
      });
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Attribute Caching</h3>
                  <p className="text-sm text-gray-600">Cache file attributes</p>
                </div>
                <button
                  className={`px-4 py-2 rounded ${
                    mountConfig.cacheSettings.ac ? 'bg-green-500 text-white' : 'bg-gray-200'
                  }`}
                  onClick={() => toggleCache('ac')}
                >
                  {mountConfig.cacheSettings.ac ? 'AC' : 'NOAC'}
                </button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">Close-to-Open</h3>
                  <p className="text-sm text-gray-600">Consistency guarantee</p>
                </div>
                <button
                  className={`px-4 py-2 rounded ${
                    mountConfig.cacheSettings.cto ? 'bg-green-500 text-white' : 'bg-gray-200'
                  }`}
                  onClick={() => toggleCache('cto')}
                >
                  {mountConfig.cacheSettings.cto ? 'CTO' : 'NOCTO'}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Alert>
          <AlertDescription>
            Cache settings significantly impact both performance and consistency.
            AC enabled improves performance but may serve stale data.
          </AlertDescription>
        </Alert>
      </div>
    );
  };

  // Recovery Configuration Component
  const RecoveryConfig = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Mount Type</h3>
            <div className="space-y-2">
              <button
                className={`w-full p-4 rounded-lg text-left ${
                  mountConfig.mountType === 'hard' ? 'bg-blue-100 ring-2 ring-blue-500' : 'bg-gray-100'
                }`}
                onClick={() => setMountConfig({...mountConfig, mountType: 'hard'})}
              >
                <div className="font-semibold">Hard Mount</div>
                <div className="text-sm text-gray-600">Retry indefinitely (recommended)</div>
              </button>
              <button
                className={`w-full p-4 rounded-lg text-left ${
                  mountConfig.mountType === 'soft' ? 'bg-blue-100 ring-2 ring-blue-500' : 'bg-gray-100'
                }`}
                onClick={() => setMountConfig({...mountConfig, mountType: 'soft'})}
              >
                <div className="font-semibold">Soft Mount</div>
                <div className="text-sm text-gray-600">Return errors after retries exhausted</div>
              </button>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Recovery Options</h3>
            <div className="space-y-2">
              {mountConfig.mountType === 'soft' && (
                <Alert variant="warning">
                  <AlertTriangle className="w-4 h-4" />
                  <AlertDescription>
                    Soft mounts may lead to data corruption in case of server issues
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Automount Configuration Component
  const AutomountConfig = () => {
    const [fstabEntry, setFstabEntry] = useState('');

    useEffect(() => {
      if (mountConfig.server && mountConfig.export && mountConfig.mountpoint) {
        const options = [
          `vers=${mountConfig.version}`,
          `rsize=${mountConfig.rsize}`,
          `wsize=${mountConfig.wsize}`,
          mountConfig.mountType,
          ...(!mountConfig.cacheSettings.ac ? ['noac'] : []),
          ...(!mountConfig.cacheSettings.cto ? ['nocto'] : [])
        ].join(',');

        setFstabEntry(
          `${mountConfig.server}:${mountConfig.export} ${mountConfig.mountpoint} nfs ${options} 0 0`
        );
      }
    }, [mountConfig]);

    return (
      <div className="space-y-4">
        <div className="bg-gray-900 text-white p-4 rounded font-mono text-sm overflow-x-auto">
          <div className="text-gray-400"># /etc/fstab entry:</div>
          {fstabEntry || '# Configure mount settings to generate fstab entry'}
        </div>

        <Alert>
          <AlertDescription>
            Add this line to /etc/fstab for permanent mounting.
            Use automount for dynamic mounting of multiple shares.
          </AlertDescription>
        </Alert>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Monitor className="w-6 h-6" />
          <CardTitle>Client Mount Configuration</CardTitle>
        </div>
        <CardDescription>
          Configure and manage NFS client mounts with optimal performance and reliability
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList className="grid grid-cols-5 gap-4">
            <TabsTrigger value="basic">Basic Mount</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="cache">Cache</TabsTrigger>
            <TabsTrigger value="recovery">Recovery</TabsTrigger>
            <TabsTrigger value="automount">Automount</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardContent className="p-6">
                <MountCommandBuilder />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardContent className="p-6">
                <PerformanceOptions />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cache">
            <Card>
              <CardContent className="p-6">
                <CacheManagement />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recovery">
            <Card>
              <CardContent className="p-6">
                <RecoveryConfig />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automount">
            <Card>
              <CardContent className="p-6">
                <AutomountConfig />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NFSMountConfig;
