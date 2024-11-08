import React, { useState } from 'react';
import {
  TrendingDown, DollarSign, Clock, Building,
  Users, AlertTriangle, BarChart, Activity,
  TrendingUp, Calendar, Shield, AlertCircle
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ImpactAnalysisVisual = () => {
  const [selectedIncident, setSelectedIncident] = useState('ransomware');
  const [timeframe, setTimeframe] = useState('1year');

  const incidents = {
    ransomware: {
      name: 'Ransomware Attack',
      metrics: {
        directCosts: 6000000,
        mttr: 168, // hours
        downtime: 72, // hours
        marketImpact: -15, // percentage
        customerChurn: 12, // percentage
        revenueImpact: -25, // percentage
      },
      timeline: [
        { day: 0, cost: 0, reputation: 100 },
        { day: 1, cost: 2000000, reputation: 85 },
        { day: 7, cost: 4000000, reputation: 70 },
        { day: 30, cost: 5000000, reputation: 65 },
        { day: 90, cost: 5500000, reputation: 75 },
        { day: 180, cost: 6000000, reputation: 80 },
        { day: 365, cost: 6000000, reputation: 90 }
      ]
    },
    databreach: {
      name: 'Data Breach',
      metrics: {
        directCosts: 4000000,
        mttr: 336, // hours
        downtime: 24, // hours
        marketImpact: -30, // percentage
        customerChurn: 25, // percentage
        revenueImpact: -35, // percentage
      },
      timeline: [
        { day: 0, cost: 0, reputation: 100 },
        { day: 1, cost: 1000000, reputation: 70 },
        { day: 7, cost: 2000000, reputation: 60 },
        { day: 30, cost: 3000000, reputation: 50 },
        { day: 90, cost: 3500000, reputation: 60 },
        { day: 180, cost: 4000000, reputation: 70 },
        { day: 365, cost: 4000000, reputation: 85 }
      ]
    },
    supplychain: {
      name: 'Supply Chain Attack',
      metrics: {
        directCosts: 8000000,
        mttr: 504, // hours
        downtime: 120, // hours
        marketImpact: -20, // percentage
        customerChurn: 18, // percentage
        revenueImpact: -30, // percentage
      },
      timeline: [
        { day: 0, cost: 0, reputation: 100 },
        { day: 1, cost: 3000000, reputation: 80 },
        { day: 7, cost: 5000000, reputation: 65 },
        { day: 30, cost: 6500000, reputation: 60 },
        { day: 90, cost: 7500000, reputation: 70 },
        { day: 180, cost: 8000000, reputation: 75 },
        { day: 365, cost: 8000000, reputation: 85 }
      ]
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const calculateTotalImpact = (incident) => {
    const metrics = incidents[incident].metrics;
    return {
      financial: metrics.directCosts,
      operational: (metrics.downtime * 50000), // Assumed hourly cost
      reputational: (metrics.customerChurn * 100000) // Assumed cost per lost customer
    };
  };

  const ImpactMetric = ({ label, value, icon: Icon, trend }) => (
    <div className="p-4 rounded-lg border bg-white">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-gray-600" />
          <span className="font-medium">{label}</span>
        </div>
        {trend && (
          <span className={`text-sm ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );

  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader className="bg-gradient-to-r from-red-900 to-red-700 text-white">
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-6 w-6" />
            Security Incident Business Impact Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Incident Selection */}
          <div className="flex gap-4 mb-6">
            {Object.entries(incidents).map(([key, incident]) => (
              <button
                key={key}
                className={`px-4 py-2 rounded-lg ${
                  selectedIncident === key 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
                onClick={() => setSelectedIncident(key)}
              >
                {incident.name}
              </button>
            ))}
          </div>

          {/* Impact Overview */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <ImpactMetric
              label="Direct Financial Impact"
              value={formatCurrency(incidents[selectedIncident].metrics.directCosts)}
              icon={DollarSign}
              trend={-incidents[selectedIncident].metrics.revenueImpact}
            />
            <ImpactMetric
              label="Mean Time to Recover"
              value={`${incidents[selectedIncident].metrics.mttr}h`}
              icon={Clock}
            />
            <ImpactMetric
              label="Customer Churn"
              value={`${incidents[selectedIncident].metrics.customerChurn}%`}
              icon={Users}
              trend={-incidents[selectedIncident].metrics.customerChurn}
            />
          </div>

          {/* Impact Timeline */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">Cumulative Impact Over Time</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={incidents[selectedIncident].timeline}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" label={{ value: 'Days', position: 'bottom' }} />
                    <YAxis yAxisId="left" label={{ value: 'Cost ($)', angle: -90, position: 'left' }} />
                    <YAxis yAxisId="right" orientation="right" label={{ value: 'Reputation', angle: 90, position: 'right' }} />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="cost" stroke="#ef4444" name="Cost" />
                    <Line yAxisId="right" type="monotone" dataKey="reputation" stroke="#3b82f6" name="Reputation" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Impact Breakdown */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-red-500" />
                Financial Impact
              </h4>
              <ul className="text-sm space-y-2">
                <li>• Direct Costs: {formatCurrency(incidents[selectedIncident].metrics.directCosts)}</li>
                <li>• Legal Fees: {formatCurrency(incidents[selectedIncident].metrics.directCosts * 0.2)}</li>
                <li>• Recovery Costs: {formatCurrency(incidents[selectedIncident].metrics.directCosts * 0.3)}</li>
              </ul>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Building className="h-4 w-4 text-blue-500" />
                Operational Impact
              </h4>
              <ul className="text-sm space-y-2">
                <li>• Downtime: {incidents[selectedIncident].metrics.downtime}h</li>
                <li>• Recovery Time: {incidents[selectedIncident].metrics.mttr}h</li>
                <li>• Productivity Loss: {Math.round(incidents[selectedIncident].metrics.downtime * 0.8)}h</li>
              </ul>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-500" />
                Reputational Impact
              </h4>
              <ul className="text-sm space-y-2">
                <li>• Market Impact: {incidents[selectedIncident].metrics.marketImpact}%</li>
                <li>• Customer Churn: {incidents[selectedIncident].metrics.customerChurn}%</li>
                <li>• Revenue Impact: {incidents[selectedIncident].metrics.revenueImpact}%</li>
              </ul>
            </Card>
          </div>

          {/* Recovery Recommendations */}
          <Alert className="mt-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <h4 className="font-semibold mb-2">Recovery Priorities</h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <strong>Immediate (0-24h):</strong>
                  <ul className="list-disc list-inside">
                    <li>Incident containment</li>
                    <li>Critical system recovery</li>
                    <li>Stakeholder notification</li>
                  </ul>
                </div>
                <div>
                  <strong>Short-term (1-7d):</strong>
                  <ul className="list-disc list-inside">
                    <li>System restoration</li>
                    <li>Customer communication</li>
                    <li>Evidence preservation</li>
                  </ul>
                </div>
                <div>
                  <strong>Long-term (7d+):</strong>
                  <ul className="list-disc list-inside">
                    <li>Security improvements</li>
                    <li>Process updates</li>
                    <li>Brand recovery</li>
                  </ul>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImpactAnalysisVisual;
