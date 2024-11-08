import React, { useState } from 'react';
import { Calculator, BarChart, PieChart, AlertTriangle, ArrowDown, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const RiskAnalysisVisual = () => {
  // Quantitative Analysis States
  const [assetValue, setAssetValue] = useState('100000');
  const [exposureFactor, setExposureFactor] = useState('0.3');
  const [annualRate, setAnnualRate] = useState('0.25');
  
  // Qualitative Analysis States
  const [selectedLikelihood, setSelectedLikelihood] = useState(null);
  const [selectedImpact, setSelectedImpact] = useState(null);
  const [showRiskRating, setShowRiskRating] = useState(false);

  // Risk Examples State
  const [selectedExample, setSelectedExample] = useState(null);

  const calculateSLE = () => {
    return parseFloat(assetValue) * parseFloat(exposureFactor);
  };

  const calculateALE = () => {
    return calculateSLE() * parseFloat(annualRate);
  };

  const riskMatrix = {
    likelihood: ['Very High', 'High', 'Medium', 'Low', 'Very Low'],
    impact: ['Minimal', 'Minor', 'Moderate', 'Major', 'Severe'],
    getRiskLevel: (likelihood, impact) => {
      const likelihoodIndex = riskMatrix.likelihood.indexOf(likelihood);
      const impactIndex = riskMatrix.impact.indexOf(impact);
      
      if (likelihoodIndex === -1 || impactIndex === -1) return null;
      
      // Risk Level Matrix (5x5)
      const riskLevels = [
        ['Medium', 'Medium', 'High', 'Critical', 'Critical'],
        ['Low', 'Medium', 'High', 'High', 'Critical'],
        ['Low', 'Medium', 'Medium', 'High', 'High'],
        ['Low', 'Low', 'Medium', 'Medium', 'High'],
        ['Low', 'Low', 'Low', 'Medium', 'Medium']
      ];
      
      return riskLevels[likelihoodIndex][impactIndex];
    }
  };

  const realWorldExamples = [
    {
      id: 1,
      title: "Data Breach Risk Analysis",
      scenario: "A financial institution analyzing the risk of a potential data breach",
      quantitative: {
        assetValue: "1000000", // Customer database value
        exposureFactor: "0.4", // 40% of data potentially exposed
        annualRate: "0.15", // 15% chance per year
        explanation: "Analysis of potential customer database breach impact, considering direct costs, regulatory fines, and customer compensation."
      },
      qualitative: {
        likelihood: "Medium",
        impact: "Severe",
        reasoning: "While sophisticated security measures are in place (medium likelihood), the impact would be severe due to regulatory implications and reputational damage."
      }
    },
    {
      id: 2,
      title: "Cloud Service Outage",
      scenario: "E-commerce platform evaluating cloud service disruption risk",
      quantitative: {
        assetValue: "500000", // Daily revenue
        exposureFactor: "0.8", // 80% revenue loss during outage
        annualRate: "0.2", // 20% chance per year
        explanation: "Analysis of potential revenue loss from cloud service disruption, including lost sales and customer compensation."
      },
      qualitative: {
        likelihood: "High",
        impact: "Major",
        reasoning: "Cloud service disruptions are relatively common (high likelihood), with major impact on business operations and revenue."
      }
    }
  ];

  const getRiskColor = (riskLevel) => {
    const colors = {
      'Critical': 'bg-red-100 text-red-800',
      'High': 'bg-orange-100 text-orange-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Low': 'bg-green-100 text-green-800'
    };
    return colors[riskLevel] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Risk Analysis Methodologies</CardTitle>
          <CardDescription>
            Interactive tools for quantitative and qualitative risk analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="quantitative" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="quantitative">
                <Calculator className="w-4 h-4 mr-2" />
                Quantitative Analysis
              </TabsTrigger>
              <TabsTrigger value="qualitative">
                <BarChart className="w-4 h-4 mr-2" />
                Qualitative Analysis
              </TabsTrigger>
            </TabsList>

            <TabsContent value="quantitative" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>ALE Calculator</CardTitle>
                  <CardDescription>
                    Calculate Annual Loss Expectancy (ALE) based on asset value, exposure factor, and annual rate of occurrence
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Asset Value ($)</Label>
                    <Input 
                      type="number"
                      value={assetValue}
                      onChange={(e) => setAssetValue(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Exposure Factor (0-1)</Label>
                    <Input 
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      value={exposureFactor}
                      onChange={(e) => setExposureFactor(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Annual Rate of Occurrence (0-1)</Label>
                    <Input 
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      value={annualRate}
                      onChange={(e) => setAnnualRate(e.target.value)}
                    />
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <span>Single Loss Expectancy (SLE):</span>
                      <span className="font-semibold">${calculateSLE().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Annual Loss Expectancy (ALE):</span>
                      <span className="font-semibold">${calculateALE().toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="qualitative" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Matrix</CardTitle>
                  <CardDescription>
                    Evaluate risks based on likelihood and potential impact
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label className="mb-2 block">Likelihood</Label>
                      <div className="space-y-2">
                        {riskMatrix.likelihood.map((level) => (
                          <Button
                            key={level}
                            variant={selectedLikelihood === level ? 'default' : 'outline'}
                            className="w-full justify-start"
                            onClick={() => {
                              setSelectedLikelihood(level);
                              setShowRiskRating(true);
                            }}
                          >
                            {level}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="mb-2 block">Impact</Label>
                      <div className="space-y-2">
                        {riskMatrix.impact.map((level) => (
                          <Button
                            key={level}
                            variant={selectedImpact === level ? 'default' : 'outline'}
                            className="w-full justify-start"
                            onClick={() => {
                              setSelectedImpact(level);
                              setShowRiskRating(true);
                            }}
                          >
                            {level}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {showRiskRating && selectedLikelihood && selectedImpact && (
                    <Alert className={getRiskColor(riskMatrix.getRiskLevel(selectedLikelihood, selectedImpact))}>
                      <AlertDescription>
                        Risk Rating: {riskMatrix.getRiskLevel(selectedLikelihood, selectedImpact)}
                      </AlertDescription>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Real-World Examples</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {realWorldExamples.map((example) => (
                  <Button
                    key={example.id}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setSelectedExample(selectedExample === example.id ? null : example.id)}
                  >
                    <div className="flex items-center">
                      {selectedExample === example.id ? <ArrowDown className="w-4 h-4 mr-2" /> : <ArrowRight className="w-4 h-4 mr-2" />}
                      {example.title}
                    </div>
                  </Button>
                ))}

                {selectedExample && (
                  <Card className="mt-2">
                    <CardContent className="pt-4">
                      <div className="space-y-4">
                        <h4 className="font-semibold">{realWorldExamples[selectedExample - 1].scenario}</h4>
                        
                        <div className="space-y-2">
                          <h5 className="font-medium">Quantitative Analysis:</h5>
                          <p className="text-sm text-gray-600">
                            {realWorldExamples[selectedExample - 1].quantitative.explanation}
                          </p>
                          <div className="bg-gray-50 p-3 rounded-lg text-sm">
                            <p>Asset Value: ${parseInt(realWorldExamples[selectedExample - 1].quantitative.assetValue).toLocaleString()}</p>
                            <p>Exposure Factor: {parseFloat(realWorldExamples[selectedExample - 1].quantitative.exposureFactor) * 100}%</p>
                            <p>Annual Rate: {parseFloat(realWorldExamples[selectedExample - 1].quantitative.annualRate) * 100}%</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h5 className="font-medium">Qualitative Analysis:</h5>
                          <p className="text-sm text-gray-600">
                            {realWorldExamples[selectedExample - 1].qualitative.reasoning}
                          </p>
                          <div className="bg-gray-50 p-3 rounded-lg text-sm">
                            <p>Likelihood: {realWorldExamples[selectedExample - 1].qualitative.likelihood}</p>
                            <p>Impact: {realWorldExamples[selectedExample - 1].qualitative.impact}</p>
                            <p>Risk Level: {riskMatrix.getRiskLevel(
                              realWorldExamples[selectedExample - 1].qualitative.likelihood,
                              realWorldExamples[selectedExample - 1].qualitative.impact
                            )}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAnalysisVisual;
