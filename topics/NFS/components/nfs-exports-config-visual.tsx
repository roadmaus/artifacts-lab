import React, { useState, useEffect } from 'react';
import { Server, FileText, Settings, AlertTriangle, Check, X, RefreshCw, Shield, Network, HardDrive } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const NFSExportsConfig = () => {
  const [exports, setExports] = useState([]);
  const [configErrors, setConfigErrors] = useState([]);
  const [activeCommand, setActiveCommand] = useState(null);
  const [exportStatus, setExportStatus] = useState('idle');

  // Export Configuration Builder Component
  const ExportBuilder = () => {
    const [path, setPath] = useState('');
    const [client, setClient] = useState('');
    const [options, setOptions] = useState({
      rw: false,
      sync: true,
      root_squash: true,
      subtree_check: false
    });
    
    const validateExport = () => {
      const errors = [];
      if (!path.startsWith('/')) errors.push('Path must start with /');
      if (client.includes(' (')) errors.push('Invalid space before options parentheses');
      return errors;
    };

    const addExport = () => {
      const errors = validateExport();
      if (errors.length === 0) {
        setExports([...exports, {
          path,
          client,
          options: { ...options },
          id: Date.now()
        }]);
        setPath('');
        setClient('');
      }
      setConfigErrors(errors);
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Export Path</label>
            <input
              type="text"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="/path/to/export"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Client Specification</label>
            <input
              type="text"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="client1.domain.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(options).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={value}
                onChange={() => setOptions({ ...options, [key]: !value })}
                id={key}
              />
              <label htmlFor={key} className="text-sm">
                {key.replace('_', ' ')}
              </label>
            </div>
          ))}
        </div>

        <button
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={addExport}
        >
          Add Export
        </button>

        {configErrors.length > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="w-4 h-4" />
            <AlertDescription>
              {configErrors.join(', ')}
            </AlertDescription>
          </Alert>
        )}
      </div>
    );
  };

  // Exports File Viewer Component
  const ExportsFileViewer = () => {
    return (
      <div className="space-y-2">
        <div className="font-mono p-4 bg-gray-900 text-white rounded-lg overflow-x-auto">
          {exports.map((exp, index) => (
            <div key={exp.id} className="flex items-center gap-2">
              <span className="text-gray-400">{index + 1}</span>
              <span>
                {exp.path} {exp.client}(
                {Object.entries(exp.options)
                  .filter(([, value]) => value)
                  .map(([key]) => key)
                  .join(',')})
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Export Administration Component
  const ExportAdmin = () => {
    const runCommand = (command) => {
      setActiveCommand(command);
      setExportStatus('running');
      setTimeout(() => {
        setExportStatus('complete');
        setTimeout(() => {
          setExportStatus('idle');
          setActiveCommand(null);
        }, 1500);
      }, 1500);
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {[
            { cmd: 'exportfs -r', desc: 'Reread /etc/exports' },
            { cmd: 'exportfs -a', desc: 'Export all directories' },
            { cmd: 'exportfs -v', desc: 'Verbose output' },
            { cmd: 'exportfs -ra', desc: 'Reread and export all' }
          ].map((command) => (
            <button
              key={command.cmd}
              className={`p-4 rounded-lg text-left ${
                activeCommand === command.cmd
                  ? 'bg-blue-100 ring-2 ring-blue-500'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => runCommand(command.cmd)}
              disabled={exportStatus !== 'idle'}
            >
              <div className="font-mono text-sm">{command.cmd}</div>
              <div className="text-sm text-gray-600">{command.desc}</div>
            </button>
          ))}
        </div>

        {exportStatus !== 'idle' && (
          <Alert>
            <RefreshCw className={`w-4 h-4 ${exportStatus === 'running' ? 'animate-spin' : ''}`} />
            <AlertDescription>
              {exportStatus === 'running' ? 'Executing command...' : 'Command completed successfully'}
            </AlertDescription>
          </Alert>
        )}
      </div>
    );
  };

  // Security Implications Viewer
  const SecurityImplications = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              title: 'Client Specification',
              icon: <Network className="w-6 h-6" />,
              good: '*.trusted.domain(ro)',
              bad: '*(rw,no_root_squash)'
            },
            {
              title: 'Root Squashing',
              icon: <Shield className="w-6 h-6" />,
              good: 'client1(root_squash)',
              bad: 'client1(no_root_squash)'
            },
            {
              title: 'Write Permissions',
              icon: <FileText className="w-6 h-6" />,
              good: 'client1(ro)',
              bad: 'client1 (rw)'
            },
            {
              title: 'Sync Mode',
              icon: <HardDrive className="w-6 h-6" />,
              good: 'client1(sync)',
              bad: 'client1(async)'
            }
          ].map((item) => (
            <Card key={item.title}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  {item.icon}
                  <h3 className="font-semibold">{item.title}</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="w-4 h-4" />
                    <code className="text-sm">{item.good}</code>
                  </div>
                  <div className="flex items-center gap-2 text-red-600">
                    <X className="w-4 h-4" />
                    <code className="text-sm">{item.bad}</code>
                  </div>
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
          <Server className="w-6 h-6" />
          <CardTitle>Server Export Configuration</CardTitle>
        </div>
        <CardDescription>
          Interactive guide to NFS export configuration and management
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="builder" className="space-y-4">
          <TabsList className="grid grid-cols-4 gap-4">
            <TabsTrigger value="builder">Export Builder</TabsTrigger>
            <TabsTrigger value="file">exports File</TabsTrigger>
            <TabsTrigger value="admin">Administration</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="builder">
            <Card>
              <CardContent className="p-6">
                <ExportBuilder />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="file">
            <Card>
              <CardContent className="p-6">
                <ExportsFileViewer />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin">
            <Card>
              <CardContent className="p-6">
                <ExportAdmin />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardContent className="p-6">
                <SecurityImplications />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NFSExportsConfig;
