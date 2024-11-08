import React, { useState, useEffect } from 'react';
import {
  BarChart, LineChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Area, AreaChart
} from 'recharts';
import {
  Shield, AlertTriangle, Activity, Search, Clock, Filter,
  ChevronDown, MapPin, Info, Server, Database, NetworkIcon,
  AlertOctagon, Terminal, Play, Pause, Download, Share2,
  Maximize2, MinusCircle, PlusCircle, FolderOpen, Command,
  FileText, Users, Lock, Globe, Zap, Eye, Boxes, X, ChevronRight
} from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

interface LogSource {
  id: string;
  type: string;
  name: string;
  status: 'active' | 'inactive' | 'error';
  lastHeartbeat: Date;
  eventsPerSecond: number;
}

interface CorrelationRule {
  id: string;
  name: string;
  conditions: RuleCondition[];
  timeWindow: number; // in seconds
  threshold: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface RuleCondition {
  field: string;
  operator: 'equals' | 'contains' | 'regex' | 'greater' | 'less';
  value: any;
}

const SIEMDashboard = () => {
  // State definitions first
  const [activeTab, setActiveTab] = useState('dashboard');
  const [timeRange, setTimeRange] = useState('15m');
  const [events, setEvents] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [playback, setPlayback] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showRuleEditor, setShowRuleEditor] = useState(false);
  const [selectedRule, setSelectedRule] = useState(null);
  const [logSources, setLogSources] = useState<LogSource[]>([
    {
      id: 'src-001',
      type: 'Firewall',
      name: 'Perimeter-FW-01',
      status: 'active',
      lastHeartbeat: new Date(),
      eventsPerSecond: 150
    },
    {
      id: 'src-002',
      type: 'IDS',
      name: 'IDS-Core-01',
      status: 'active',
      lastHeartbeat: new Date(),
      eventsPerSecond: 75
    },
    // Add more default sources as needed
  ]);
  const [correlationRules, setCorrelationRules] = useState<CorrelationRule[]>([
    {
      id: 'rule-001',
      name: 'Brute Force Detection',
      conditions: [
        { field: 'type', operator: 'equals', value: 'Authentication Failure' },
        { field: 'source', operator: 'equals', value: 'same' },
        { field: 'count', operator: 'greater', value: 5 }
      ],
      timeWindow: 300, // 5 minutes
      threshold: 5,
      severity: 'high'
    }
    // Add more default rules as needed
  ]);
  const [eventBuffer, setEventBuffer] = useState<any[]>([]);

  // Define handlers before components
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      const newEvent = {
        ...eventTypes[Math.floor(Math.random() * eventTypes.length)],
        timestamp: new Date().toISOString(),
        id: Math.random().toString(36).substr(2, 9),
        source: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        destination: `10.0.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        count: Math.floor(Math.random() * 100)
      };
      setEvents(prev => [...prev, newEvent]);
      setIsRefreshing(false);
    }, 1000);
  };

  const handleExport = () => {
    const exportData = JSON.stringify(events, null, 2);
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'siem-events.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    alert('Share functionality would open here');
  };

  // Enhanced event types
  const eventTypes = [
    {
      type: 'Brute Force Attack',
      severity: 'high',
      category: 'Authentication',
      mitreTactic: 'Initial Access',
      mitreId: 'T1110',
      details: {
        attempts: Math.floor(Math.random() * 100),
        targetUser: 'admin',
        sourceIPs: ['192.168.1.100', '192.168.1.101'],
        timeline: '5 minutes',
        status: 'Blocked'
      }
    },
    {
      type: 'Data Exfiltration',
      severity: 'critical',
      category: 'Data Loss Prevention',
      mitreTactic: 'Exfiltration',
      mitreId: 'T1048',
      details: {
        dataType: 'Customer Records',
        size: '2.5GB',
        destination: 'Unknown External IP',
        protocol: 'HTTPS',
        encryptionDetected: true
      }
    },
    {
      type: 'Ransomware Activity',
      severity: 'critical',
      category: 'Malware',
      mitreTactic: 'Impact',
      mitreId: 'T1486',
      details: {
        strain: 'Unknown',
        affectedSystems: 3,
        encryptionStarted: false,
        detectionMethod: 'File Pattern Analysis',
        status: 'Contained'
      }
    },
    {
      type: 'Privilege Escalation',
      severity: 'high',
      category: 'Access Control',
      mitreTactic: 'Privilege Escalation',
      mitreId: 'T1068',
      details: {
        user: 'system_service',
        technique: 'Local Exploit',
        targetPrivileges: 'SYSTEM',
        status: 'Success'
      }
    },
    {
      type: 'Suspicious PowerShell',
      severity: 'medium',
      category: 'Command and Control',
      mitreTactic: 'Execution',
      mitreId: 'T1059.001',
      details: {
        command: 'Encoded Base64',
        executionPolicy: 'Bypass',
        parentProcess: 'cmd.exe',
        userContext: 'SYSTEM'
      }
    }
  ];

  // Detection rules
  const detectionRules = [
    {
      id: 'RULE-001',
      name: 'Brute Force Detection',
      description: 'Detects multiple failed login attempts',
      condition: 'failed_login_count > 10 && timespan < 5m',
      severity: 'high',
      enabled: true
    },
    {
      id: 'RULE-002',
      name: 'Data Exfiltration Detection',
      description: 'Monitors for large data transfers to external IPs',
      condition: 'data_transfer_size > 1GB && destination_ip !in internal_range',
      severity: 'critical',
      enabled: true
    }
  ];

  // Investigation workflows
  const workflows = [
    {
      id: 'WF-001',
      name: 'Ransomware Investigation',
      steps: [
        'Identify affected systems',
        'Isolate compromised hosts',
        'Collect memory dumps',
        'Analyze malware indicators',
        'Track lateral movement'
      ]
    },
    {
      id: 'WF-002',
      name: 'Data Breach Investigation',
      steps: [
        'Identify data access patterns',
        'Review authentication logs',
        'Track data movement',
        'Identify compromised accounts',
        'Document exposure scope'
      ]
    }
  ];

  // Log source health monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setLogSources(prev => prev.map(source => ({
        ...source,
        lastHeartbeat: new Date(),
        status: Math.random() > 0.95 ? 'error' : 'active',
        eventsPerSecond: Math.floor(Math.random() * 200)
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Simulated real-time events
  useEffect(() => {
    if (!playback) return;

    const generateRealisticEvent = () => {
      const eventBase = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      const source = logSources[Math.floor(Math.random() * logSources.length)];
      
      return {
        ...eventBase,
        id: uuidv4(),
        timestamp: new Date().toISOString(),
        source: source?.name || 'unknown',
        rawLog: generateRawLog(eventBase),
        enrichment: {
          geoip: generateGeoIpData(),
          threatIntel: checkThreatIntel(),
          assetInfo: getAssetInfo()
        }
      };
    };

    const interval = setInterval(() => {
      const newEvent = generateRealisticEvent();
      processEvent(newEvent);
      setEvents(prev => [...prev.slice(-99), newEvent]);
    }, 2000);

    return () => clearInterval(interval);
  }, [playback, logSources, correlationRules]);

  const processEvent = (newEvent) => {
    const updatedBuffer = [...eventBuffer, newEvent].slice(-1000);
    setEventBuffer(updatedBuffer);
    
    // Process correlation rules
    correlationRules.forEach(rule => {
      const relevantEvents = updatedBuffer.filter(event => 
        isEventRelevant(event, newEvent, rule.timeWindow)
      );

      if (checkRuleMatch(relevantEvents, rule)) {
        generateAlert(rule, relevantEvents);
      }
    });
  };

  const isEventRelevant = (event, newEvent, timeWindow) => {
    const eventTime = new Date(event.timestamp).getTime();
    const newEventTime = new Date(newEvent.timestamp).getTime();
    return (newEventTime - eventTime) / 1000 <= timeWindow;
  };

  const checkRuleMatch = (events, rule) => {
    // Group events by source if needed
    const eventGroups = rule.conditions.some(c => c.value === 'same')
      ? groupEventsBySource(events)
      : [events];

    return eventGroups.some(group => 
      rule.conditions.every(condition => checkCondition(group, condition))
    );
  };

  const groupEventsBySource = (events) => {
    return Object.values(
      events.reduce((acc, event) => {
        acc[event.source] = acc[event.source] || [];
        acc[event.source].push(event);
        return acc;
      }, {})
    );
  };

  const checkCondition = (events, condition) => {
    switch (condition.operator) {
      case 'equals':
        return events.every(e => e[condition.field] === condition.value);
      case 'contains':
        return events.every(e => e[condition.field]?.includes(condition.value));
      case 'regex':
        const regex = new RegExp(condition.value);
        return events.every(e => regex.test(e[condition.field]));
      case 'greater':
        return events.length > condition.value;
      case 'less':
        return events.length < condition.value;
      default:
        return false;
    }
  };

  const generateAlert = (rule, matchingEvents) => {
    const alert = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      ruleName: rule.name,
      severity: rule.severity,
      matchingEvents,
      status: 'new'
    };

    setAlerts(prev => [...prev, alert]);
  };

  // Add these helper functions for event enrichment
  const generateRawLog = (event) => {
    const timestamp = new Date().toISOString();
    switch (event.category) {
      case 'Authentication':
        return `${timestamp} auth=LOCAL; user=${event.details.targetUser}; src=${event.source}; result=FAILURE; attempts=${event.details.attempts}`;
      case 'Malware':
        return `${timestamp} alert=MALWARE; type=${event.details.strain}; affected=${event.details.affectedSystems}; status=${event.details.status}`;
      default:
        return `${timestamp} type=${event.type}; severity=${event.severity}; source=${event.source}; category=${event.category}`;
    }
  };

  const generateGeoIpData = () => ({
    country: ['US', 'CN', 'RU', 'GB', 'DE'][Math.floor(Math.random() * 5)],
    city: ['Seattle', 'Beijing', 'Moscow', 'London', 'Berlin'][Math.floor(Math.random() * 5)],
    coordinates: [
      Math.random() * 360 - 180,
      Math.random() * 180 - 90
    ],
    asn: Math.floor(Math.random() * 64000),
    isp: ['Amazon AWS', 'Google Cloud', 'Microsoft Azure', 'Digital Ocean'][Math.floor(Math.random() * 4)],
    threatScore: Math.floor(Math.random() * 100)
  });

  const checkThreatIntel = () => ({
    knownBad: Math.random() > 0.9,
    threatActor: Math.random() > 0.95 ? ['APT29', 'Lazarus', 'Sandworm'][Math.floor(Math.random() * 3)] : null,
    malwareFamily: Math.random() > 0.95 ? ['EMOTET', 'TrickBot', 'Qakbot'][Math.floor(Math.random() * 3)] : null,
    confidence: Math.floor(Math.random() * 100),
    lastSeen: new Date(Date.now() - Math.random() * 7776000000).toISOString() // Within last 90 days
  });

  const getAssetInfo = () => ({
    owner: ['IT Dept', 'HR Dept', 'Finance Dept', 'Engineering'][Math.floor(Math.random() * 4)],
    criticality: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
    patches: Array(Math.floor(Math.random() * 5)).fill(0).map(() => 
      `KB${Math.floor(Math.random() * 1000000)}`
    ),
    lastScan: new Date(Date.now() - Math.random() * 604800000).toISOString(), // Within last week
    compliance: ['PCI-DSS', 'HIPAA', 'SOX', 'GDPR'].filter(() => Math.random() > 0.5)
  });

  const severityColor = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    critical: 'bg-red-100 text-red-800'
  };

  // Navigation Component
  const TopNavigation = () => (
    <div className="bg-gray-900 text-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Shield className="w-6 h-6" />
          <span className="font-bold">Enterprise SIEM</span>
          <div className="flex gap-2 ml-8">
            {['Dashboard', 'Incidents', 'Hunting', 'Rules', 'Reports'].map(tab => (
              <button 
                key={tab}
                className={`px-3 py-1 rounded transition-colors ${
                  activeTab === tab.toLowerCase() 
                    ? 'bg-gray-700 text-white' 
                    : 'hover:bg-gray-800'
                }`}
                onClick={() => setActiveTab(tab.toLowerCase())}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            className="p-1 hover:bg-gray-700 rounded transition-colors"
            onClick={() => setTimeRange('15m')}
          >
            <Clock className="w-5 h-5" />
          </button>
          <button 
            className="p-1 hover:bg-gray-700 rounded transition-colors"
            onClick={() => alert('Filter options would open here')}
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  // Time Controls
  const TimeControls = () => (
    <div className="flex items-center gap-2 p-4 bg-gray-100 border-b">
      <div className="flex items-center gap-2">
        <button 
          className="p-1 rounded hover:bg-gray-200 transition-colors"
          onClick={() => setPlayback(!playback)}
        >
          {playback ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <select 
          className="border rounded px-2 py-1 text-sm"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          <option value="15m">Last 15 minutes</option>
          <option value="1h">Last 1 hour</option>
          <option value="24h">Last 24 hours</option>
          <option value="7d">Last 7 days</option>
        </select>
      </div>
      <div className="flex items-center gap-2 ml-4">
        <button 
          className={`px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors ${
            isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
        <button 
          className="p-1 rounded hover:bg-gray-200 transition-colors"
          onClick={handleExport}
        >
          <Download className="w-4 h-4" />
        </button>
        <button 
          className="p-1 rounded hover:bg-gray-200 transition-colors"
          onClick={handleShare}
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  // Metrics Overview
  const MetricsOverview = () => (
    <div className="grid grid-cols-4 gap-4 p-4">
      <MetricCard
        title="Total Events"
        value={events.length * 157}
        icon={<Activity />}
        chart="line"
        data={events}
      />
      <MetricCard
        title="Critical Alerts"
        value={alerts.filter(a => a.severity === 'critical').length}
        icon={<AlertTriangle />}
        chart="bar"
        data={alerts}
        color="red"
      />
      <MetricCard
        title="Active Sources"
        value={new Set(events.map(e => e.source)).size}
        icon={<Globe />}
        chart="line"
        data={events}
        color="green"
      />
      <MetricCard
        title="Network Traffic"
        value={`${(Math.random() * 100).toFixed(2)} GB/s`}
        icon={<NetworkIcon />}
        chart="area"
        data={events}
        color="blue"
      />
    </div>
  );

  // Metric Card Component
  const MetricCard = ({ title, value, icon, chart, data, color = 'blue' }) => (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-sm text-gray-500">{title}</div>
          <div className="text-2xl font-bold">{value}</div>
        </div>
        <div className={`p-2 rounded-full bg-${color}-50`}>
          {icon}
        </div>
      </div>
      <div className="mt-4 h-16">
        <ResponsiveContainer width="100%" height="100%">
          {chart === 'line' && (
            <LineChart data={data}>
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke={`#${color === 'blue' ? '3B82F6' : color === 'red' ? 'EF4444' : '10B981'}`} 
                strokeWidth={2} 
                dot={false} 
              />
            </LineChart>
          )}
          {chart === 'bar' && (
            <BarChart data={data}>
              <Bar dataKey="count" fill={`#${color === 'red' ? 'EF4444' : '3B82F6'}`} />
            </BarChart>
          )}
          {chart === 'area' && (
            <AreaChart data={data}>
              <Area 
                type="monotone" 
                dataKey="count" 
                stroke="#3B82F6" 
                fill="#93C5FD" 
                fillOpacity={0.2} 
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );

  // Event Analysis Component
  const EventAnalysis = () => (
    <div className="flex-1 overflow-hidden flex">
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <div className="bg-white rounded-lg shadow">
            <div className="px-4 py-3 border-b flex justify-between items-center">
              <h3 className="font-semibold flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Security Events
              </h3>
              <div className="flex items-center gap-2">
                <button className="text-sm text-blue-500">
                  Export
                </button>
                <button className="text-sm text-blue-500">
                  Filter
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Time</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Event</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Category</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">MITRE</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Source</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr 
                      key={event.id} 
                      className="border-t hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <td className="px-4 py-2 text-sm">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </td>
                      <td className="px-4 py-2">
                        <div className="text-sm font-medium">{event.type}</div>
                        <div className="text-xs text-gray-500">{event.details?.status}</div>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
                          {event.category}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                          {event.mitreTactic} ({event.mitreId})
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="text-sm">{event.source}</div>
                        <div className="text-xs text-gray-500">{event.destination}</div>
                      </td>
                      <td className="px-4 py-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${severityColor[event.severity]}`}>
                          {event.details?.status || 'Active'}
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex gap-2">
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Play className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details Panel */}
      {selectedEvent && (
        <div className="fixed inset-y-0 right-0 w-1/3 bg-white shadow-lg border-l overflow-y-auto">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Event Details</h3>
              <button 
                onClick={() => setSelectedEvent(null)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Event Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Type:</span>
                    <span className="text-sm font-medium">{selectedEvent.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Severity:</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${severityColor[selectedEvent.severity]}`}>
                      {selectedEvent.severity}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">MITRE ATT&CK:</span>
                    <span className="text-sm">{selectedEvent.mitreTactic} ({selectedEvent.mitreId})</span>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Technical Details</h4>
                <pre className="text-xs bg-gray-50 p-2 rounded">
                  {JSON.stringify(selectedEvent.details, null, 2)}
                </pre>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Recommended Actions</h4>
                <div className="space-y-2">
                  {getRecommendedActions(selectedEvent).map((action, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <ChevronRight className="w-4 h-4" />
                      <span>{action}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-x-2">
                <button className="px-4 py-2 bg-blue-500 text-white rounded">
                  Start Investigation
                </button>
                <button className="px-4 py-2 border rounded">
                  Add to Case
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alert Rules Editor */}
      {showRuleEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-2/3 max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold">Detection Rule Editor</h3>
              <button 
                onClick={handleCloseRuleEditor}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Rule Name</label>
                  <input 
                    type="text" 
                    className="w-full border rounded px-3 py-2"
                    value={selectedRule?.name || ''}
                    onChange={(e) => setSelectedRule({
                      ...selectedRule,
                      name: e.target.value
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Condition</label>
                  <textarea 
                    className="w-full border rounded px-3 py-2 h-32 font-mono text-sm"
                    value={selectedRule?.condition || ''}
                    onChange={(e) => setSelectedRule({
                      ...selectedRule,
                      condition: e.target.value
                    })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Severity</label>
                  <select 
                    className="w-full border rounded px-3 py-2"
                    value={selectedRule?.severity || 'low'}
                    onChange={(e) => setSelectedRule({
                      ...selectedRule,
                      severity: e.target.value
                    })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-4 border-t bg-gray-50">
              <div className="flex justify-end space-x-2">
                <button 
                  className="px-4 py-2 border rounded"
                  onClick={handleCloseRuleEditor}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={() => {
                    // Handle save logic here
                    handleCloseRuleEditor();
                  }}
                >
                  Save Rule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />
      <TimeControls />
      <MetricsOverview />
      <EventAnalysis />
    </div>
  );
};

// Helper function for recommended actions
const getRecommendedActions = (event) => {
  const commonActions = [
    'Document incident timeline',
    'Collect affected system logs',
    'Identify related events'
  ];

  const severityActions = {
    critical: [
      'Initiate incident response procedure',
      'Notify security team immediately',
      'Consider system isolation'
    ],
    high: [
      'Escalate to security team',
      'Monitor affected systems',
      'Review related security controls'
    ],
    medium: [
      'Monitor for escalation',
      'Review security controls',
      'Update detection rules'
    ],
    low: [
      'Monitor for pattern',
      'Update documentation',
      'Review false positive potential'
    ]
  };

  return [...severityActions[event.severity], ...commonActions];
};

export default SIEMDashboard;