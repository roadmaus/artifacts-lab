import React, { useState } from 'react';
import { Activity, AlertTriangle, CheckCircle, TrendingUp, RefreshCw, Bell, Info, Shield, Lock, Bug, Users, Server } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from '@/components/ui/progress';

const RiskMonitoringVisual = () => {
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [timeRange, setTimeRange] = useState('daily');
  const [showGuide, setShowGuide] = useState(true);

  // Complete risk metrics data
  const riskMetrics = [
    {
      name: 'Vulnerability Management',
      icon: Bug,
      current: 85,
      threshold: 80,
      trend: 'up',
      details: 'Average time to patch critical vulnerabilities has improved by 15%',
      tooltip: 'Measures the effectiveness of vulnerability identification and remediation processes',
      submetrics: {
        'Critical Vulnerabilities': '12',
        'Average Patch Time': '48 hours',
        'Scan Coverage': '98%'
      }
    },
    {
      name: 'Security Incidents',
      icon: AlertTriangle,
      current: 65,
      threshold: 75,
      trend: 'down',
      details: 'Monthly security incidents have decreased by 25%',
      tooltip: 'Tracks frequency and severity of security events and incidents',
      submetrics: {
        'Open Incidents': '5',
        'MTTR': '2.5 hours',
        'False Positives': '8%'
      }
    },
    {
      name: 'Control Effectiveness',
      icon: Shield,
      current: 90,
      threshold: 85,
      trend: 'up',
      details: 'Security controls are performing above target levels',
      tooltip: 'Evaluates the performance of implemented security controls',
      submetrics: {
        'Failed Controls': '2',
        'Control Coverage': '95%',
        'Control Testing': '100%'
      }
    },
    {
      name: 'Access Management',
      icon: Lock,
      current: 88,
      threshold: 90,
      trend: 'up',
      details: 'Identity and access controls showing strong compliance',
      tooltip: 'Monitors access control policies and privilege management',
      submetrics: {
        'Privileged Accounts': '45',
        'Failed Logins': '12/day',
        'MFA Coverage': '98%'
      }
    },
    {
      name: 'User Awareness',
      icon: Users,
      current: 78,
      threshold: 85,
      trend: 'up',
      details: 'Security training completion rates improving',
      tooltip: 'Tracks security awareness and training metrics',
      submetrics: {
        'Training Completion': '92%',
        'Phishing Test Score': '85%',
        'Reported Incidents': '24'
      }
    },
    {
      name: 'System Availability',
      icon: Server,
      current: 99.9,
      threshold: 99.9,
      trend: 'stable',
      details: 'Systems maintaining required uptime levels',
      tooltip: 'Monitors system availability and performance metrics',
      submetrics: {
        'Uptime': '99.99%',
        'Response Time': '250ms',
        'Incidents': '1'
      }
    }
  ];

  // Educational guide steps
  const guideSteps = [
    {
      title: 'Welcome to Risk Monitoring',
      content: 'This dashboard helps you understand and monitor various security risks in real-time. Each metric represents a key area of cybersecurity risk management.'
    },
    {
      title: 'Understanding Metrics',
      content: 'Click any metric card to view detailed analysis. The color indicators show risk levels: Green (Good), Yellow (Warning), Red (Critical).'
    },
    {
      title: 'Interactive Features',
      content: 'Use the time range selector to view different periods, and try the Simulate Alert button to see how risk notifications work.'
    },
    {
      title: 'Detailed Analysis',
      content: 'Each metric includes submetrics and trends. Hover over the info icon to learn more about each metric\'s purpose.'
    }
  ];

  const getStatusColor = (current, threshold) => {
    if (current >= threshold) return 'bg-green-500';
    if (current >= threshold - 10) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const simulateAlert = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleRefreshMetrics = () => {
    // Simulate refresh action
    console.log('Refreshing metrics...');
  };

  return (
    <TooltipProvider>
      <div className="space-y-6 p-4">
        {/* Header Section */}
        <div id="dashboard-header" className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Activity className="w-8 h-8 text-blue-500" />
            <h2 className="text-2xl font-bold">Continuous Risk Monitoring Dashboard</h2>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              className="p-2 border rounded-md"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="daily">Daily View</option>
              <option value="weekly">Weekly View</option>
              <option value="monthly">Monthly View</option>
            </select>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setShowGuide(true)}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-full"
                >
                  <Info className="w-5 h-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open guide</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Metrics Grid */}
        <div id="metric-cards" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {riskMetrics.map((metric) => (
            <Card 
              key={metric.name}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedMetric(metric)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <metric.icon className="w-5 h-5 text-blue-500" />
                    <CardTitle className="text-lg">{metric.name}</CardTitle>
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{metric.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">{metric.current}%</div>
                    <div className={`p-2 rounded-full ${getStatusColor(metric.current, metric.threshold)}`}>
                      {metric.current >= metric.threshold ? 
                        <CheckCircle className="w-6 h-6 text-white" /> : 
                        <AlertTriangle className="w-6 h-6 text-white" />
                      }
                    </div>
                  </div>
                  <Progress value={metric.current} max={100} />
                  <div className="text-sm text-gray-500">
                    Threshold: {metric.threshold}%
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Interactive Controls */}
        <div className="flex space-x-4 mt-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => simulateAlert()}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Bell className="w-4 h-4" />
                <span>Simulate Alert</span>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Simulate a risk threshold alert</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={handleRefreshMetrics}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh Metrics</span>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Update all metrics to latest values</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Alert Dialog */}
        {showAlert && (
          <Alert className="mt-4 border-red-500">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <AlertDescription>
              Risk threshold exceeded for Vulnerability Management. Immediate attention required.
            </AlertDescription>
          </Alert>
        )}

        {/* Selected Metric Details */}
        {selectedMetric && (
          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Detailed Analysis: {selectedMetric.name}</CardTitle>
                <button 
                  onClick={() => setSelectedMetric(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className={`w-5 h-5 ${selectedMetric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                  <span>{selectedMetric.details}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {Object.entries(selectedMetric.submetrics).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm text-gray-500">{key}</div>
                      <div className="text-lg font-semibold">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Educational Guide Overlay */}
        {showGuide && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Card className="w-96">
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {guideSteps.map((step, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="font-semibold">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.content}</p>
                    </div>
                  ))}
                  <button
                    onClick={() => setShowGuide(false)}
                    className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Got it!
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default RiskMonitoringVisual;
