import React, { useState, useEffect } from 'react';
import { 
  Activity,
  Server,
  CloudOff,
  AlertCircle,
  Clock,
  TrendingUp,
  Settings,
  ArrowRightLeft,
  Power,
  Gauge
} from 'lucide-react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

const LoadBalancerSimulation = () => {
  const [servers, setServers] = useState([
    { id: 1, load: 30, status: 'active', health: 100 },
    { id: 2, load: 45, status: 'active', health: 100 },
    { id: 3, load: 0, status: 'standby', health: 100 }
  ]);

  const updateServerLoad = () => {
    setServers(prev => prev.map(server => {
      if (server.status === 'active') {
        const loadChange = Math.floor(Math.random() * 20) - 10;
        const newLoad = Math.max(0, Math.min(100, server.load + loadChange));
        return { ...server, load: newLoad };
      }
      return server;
    }));
  };

  useEffect(() => {
    const interval = setInterval(updateServerLoad, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {servers.map((server) => (
          <div
            key={server.id}
            className={`p-4 rounded-lg border ${
              server.status === 'active' ? 'bg-green-50' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <Server className="h-5 w-5" />
              <span className={`text-sm px-2 py-1 rounded-full ${
                server.status === 'active' ? 'bg-green-100' : 'bg-gray-200'
              }`}>
                {server.status}
              </span>
            </div>
            <div className="space-y-2">
              <div className="h-2 w-full bg-gray-200 rounded">
                <div 
                  className="h-full bg-blue-500 rounded transition-all duration-500"
                  style={{ width: `${server.load}%` }}
                />
              </div>
              <div className="text-sm text-gray-600">
                Load: {server.load}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const DisasterRecoverySimulation = () => {
  const [primarySite, setPrimarySite] = useState({ status: 'active', health: 100 });
  const [drSite, setDrSite] = useState({ status: 'standby', health: 100 });
  const [replicationLag, setReplicationLag] = useState(0);
  const [rto] = useState(4); // Recovery Time Objective in hours
  const [rpo] = useState(15); // Recovery Point Objective in minutes

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-8">
        <div className={`p-4 rounded-lg border ${
          primarySite.status === 'active' ? 'bg-green-50' : 'bg-red-50'
        }`}>
          <h3 className="font-medium mb-2">Primary Site</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Status</span>
              <span className={`px-2 py-1 rounded-full text-sm ${
                primarySite.status === 'active' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {primarySite.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Health</span>
              <span>{primarySite.health}%</span>
            </div>
          </div>
        </div>

        <div className={`p-4 rounded-lg border ${
          drSite.status === 'active' ? 'bg-green-50' : 'bg-gray-50'
        }`}>
          <h3 className="font-medium mb-2">DR Site</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Status</span>
              <span className={`px-2 py-1 rounded-full text-sm ${
                drSite.status === 'active' ? 'bg-green-100' : 'bg-gray-200'
              }`}>
                {drSite.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Replication Lag</span>
              <span>{replicationLag} mins</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-5 w-5" />
            <span className="font-medium">RTO</span>
          </div>
          <div className="text-2xl font-bold">{rto} hours</div>
          <p className="text-sm text-gray-600">Maximum acceptable downtime</p>
        </div>

        <div className="p-4 rounded-lg border">
          <div className="flex items-center gap-2 mb-2">
            <ArrowRightLeft className="h-5 w-5" />
            <span className="font-medium">RPO</span>
          </div>
          <div className="text-2xl font-bold">{rpo} mins</div>
          <p className="text-sm text-gray-600">Maximum acceptable data loss</p>
        </div>
      </div>
    </div>
  );
};

const PerformanceMonitoring = () => {
  const [metrics, setMetrics] = useState({
    cpu: 45,
    memory: 60,
    storage: 75,
    network: 30
  });

  const [sla] = useState({
    availability: 99.99,
    responseTime: 200, // ms
    throughput: 1000 // requests/sec
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpu: Math.min(100, Math.max(0, prev.cpu + (Math.random() * 10 - 5))),
        memory: Math.min(100, Math.max(0, prev.memory + (Math.random() * 10 - 5))),
        storage: Math.min(100, Math.max(0, prev.storage + (Math.random() * 5 - 2))),
        network: Math.min(100, Math.max(0, prev.network + (Math.random() * 15 - 7)))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(metrics).map(([key, value]) => (
          <div key={key} className="p-4 rounded-lg border">
            <div className="flex items-center justify-between mb-2">
              <span className="capitalize font-medium">{key} Usage</span>
              <span className={`px-2 py-1 rounded-full text-sm ${
                value > 80 ? 'bg-red-100' : value > 60 ? 'bg-yellow-100' : 'bg-green-100'
              }`}>
                {Math.round(value)}%
              </span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded">
              <div 
                className={`h-full rounded transition-all duration-500 ${
                  value > 80 ? 'bg-red-500' : value > 60 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Service Level Agreements (SLA)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Availability Target</span>
              <span className="font-mono">{sla.availability}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Response Time Target</span>
              <span className="font-mono">{sla.responseTime}ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Throughput Target</span>
              <span className="font-mono">{sla.throughput} req/s</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AvailabilityVisualization = () => {
  const [activeSection, setActiveSection] = useState('loadBalancing');

  return (
    <div className="w-full max-w-6xl space-y-6 p-4">
      {/* Main Title */}
      <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Activity className="h-8 w-8 text-purple-600" />
            <div>
              <CardTitle>System Availability Management</CardTitle>
              <CardDescription>High availability, disaster recovery, and performance monitoring</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Section Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => setActiveSection('loadBalancing')}
          className={`p-4 rounded-lg border transition-colors ${
            activeSection === 'loadBalancing' ? 'bg-purple-100 border-purple-500' : 'hover:bg-slate-50'
          }`}
        >
          <Server className="h-6 w-6 mb-2" />
          <h3 className="font-semibold">High Availability</h3>
          <p className="text-sm text-gray-600">Load balancing and redundancy</p>
        </button>

        <button
          onClick={() => setActiveSection('disasterRecovery')}
          className={`p-4 rounded-lg border transition-colors ${
            activeSection === 'disasterRecovery' ? 'bg-purple-100 border-purple-500' : 'hover:bg-slate-50'
          }`}
        >
          <CloudOff className="h-6 w-6 mb-2" />
          <h3 className="font-semibold">Disaster Recovery</h3>
          <p className="text-sm text-gray-600">DR sites and failover</p>
        </button>

        <button
          onClick={() => setActiveSection('performance')}
          className={`p-4 rounded-lg border transition-colors ${
            activeSection === 'performance' ? 'bg-purple-100 border-purple-500' : 'hover:bg-slate-50'
          }`}
        >
          <Gauge className="h-6 w-6 mb-2" />
          <h3 className="font-semibold">Performance Monitoring</h3>
          <p className="text-sm text-gray-600">Metrics and SLA tracking</p>
        </button>
      </div>

      {/* Dynamic Content */}
      <Card>
        <CardContent className="p-6">
          {activeSection === 'loadBalancing' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">N+1 Redundancy Demonstration</h3>
              <LoadBalancerSimulation />
              <Alert className="mt-4">
                <AlertTitle>High Availability Design</AlertTitle>
                <AlertDescription>
                  N+1 redundancy ensures system availability by maintaining one more component than the minimum required. 
                  In this example, two active servers handle the load while a third stands ready for immediate failover.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {activeSection === 'disasterRecovery' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Disaster Recovery Simulation</h3>
              <DisasterRecoverySimulation />
              <Alert className="mt-4">
                <AlertTitle>DR Strategy</AlertTitle>
                <AlertDescription>
                  The disaster recovery strategy includes hot site replication with defined RTO and RPO targets.
                  Regular testing and monitoring ensure readiness for failover scenarios.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {activeSection === 'performance' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Real-time Performance Metrics</h3>
              <PerformanceMonitoring />
              <Alert className="mt-4">
                <AlertTitle>Performance Management</AlertTitle>
                <AlertDescription>
                  Continuous monitoring of system metrics helps identify potential issues before they impact availability.
                  SLAs define clear targets for system performance and reliability.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Alert className="bg-purple-50 border-purple-200">
        <AlertTitle>Availability Best Practices</AlertTitle>
        <AlertDescription>
          <ul className="list-disc pl-4 space-y-2 mt-2">
            <li>Implement N+1 redundancy across all critical systems</li>
            <li>Maintain hot/warm DR sites with regular testing</li>
            <li>Monitor performance metrics and set up automated alerts</li>
            <li>Define and track SLAs for all critical services</li>
            <li>Regular capacity planning and scaling exercises</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default AvailabilityVisualization;
