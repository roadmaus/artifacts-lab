// auth-flow-visual.tsx

import React, { useState } from 'react';
import { 
  Shield, 
  Key, 
  User, 
  Database, 
  Lock, 
  AlertCircle, 
  CheckCircle2, 
  FileText, 
  Building, 
  UserCog, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

// Types
interface AuthFactor {
  name: string;
  label: string;
  example: string;
  icon: React.ReactNode;
  description: string;
}

interface AuthState {
  password: boolean;
  token: boolean;
  biometric: boolean;
}

interface Example {
  name: string;
  examples: string[];
}

interface System {
  name: string;
  examples: string[];
}

interface UserRole {
  name: string;
  description: string;
  permissions: Example[];
  systems: System[];
}

interface AccessExampleCardProps {
  title: string;
  examples: string[];
}

const SecurityFlowVisual: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>({
    password: false,
    token: false,
    biometric: false
  });
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<number>(1);

  const authFactors: AuthFactor[] = [
    {
      name: 'password',
      label: 'Password',
      example: 'Something you know',
      icon: <Key className="w-6 h-6" />,
      description: 'Traditional passwords or PINs'
    },
    {
      name: 'token',
      label: 'Security Token',
      example: 'Something you have',
      icon: <Shield className="w-6 h-6" />,
      description: 'Physical or digital security tokens'
    },
    {
      name: 'biometric',
      label: 'Biometric',
      example: 'Something you are',
      icon: <User className="w-6 h-6" />,
      description: 'Fingerprint or facial recognition'
    }
  ];

  const userRoles: UserRole[] = [
    {
      name: 'HR Manager',
      description: 'Human Resources Management',
      permissions: [
        {
          name: 'View employee data',
          examples: [
            'Access employee personal information',
            'View salary details',
            'Access performance reviews'
          ]
        },
        {
          name: 'Edit employee records',
          examples: [
            'Update employee contact information',
            'Modify employment status',
            'Adjust compensation details'
          ]
        },
        {
          name: 'Access payroll',
          examples: [
            'Process monthly payroll',
            'Manage tax withholdings',
            'Handle benefit deductions'
          ]
        }
      ],
      systems: [
        {
          name: 'HR Database',
          examples: [
            'Employee management system (Workday)',
            'Performance review platform',
            'Benefits administration portal'
          ]
        },
        {
          name: 'Payroll System',
          examples: [
            'ADP Payroll processing',
            'Time and attendance tracking',
            'Expense management system'
          ]
        }
      ]
    },
    {
      name: 'Marketing',
      description: 'Marketing Department',
      permissions: [
        {
          name: 'View campaigns',
          examples: [
            'Access campaign analytics',
            'View audience metrics',
            'Monitor campaign performance'
          ]
        },
        {
          name: 'Edit content',
          examples: [
            'Update website content',
            'Modify social media posts',
            'Edit email campaigns'
          ]
        },
        {
          name: 'Access analytics',
          examples: [
            'Google Analytics dashboard',
            'Social media insights',
            'Email campaign metrics'
          ]
        }
      ],
      systems: [
        {
          name: 'Marketing Database',
          examples: [
            'HubSpot CRM',
            'Mailchimp email platform',
            'Social media management tools'
          ]
        },
        {
          name: 'Analytics System',
          examples: [
            'Google Analytics',
            'Adobe Analytics',
            'Social media analytics platforms'
          ]
        }
      ]
    },
    {
      name: 'IT Admin',
      description: 'System Administrator',
      permissions: [
        {
          name: 'Full system access',
          examples: [
            'Database management systems',
            'Server infrastructure',
            'Network security tools'
          ]
        },
        {
          name: 'User management',
          examples: [
            'Active Directory administration',
            'Access control systems',
            'User permission management'
          ]
        },
        {
          name: 'Security controls',
          examples: [
            'Firewall configuration',
            'Security monitoring tools',
            'Incident response systems'
          ]
        }
      ],
      systems: [
        {
          name: 'All Systems',
          examples: [
            'AWS Console',
            'Azure Admin Portal',
            'Network monitoring tools'
          ]
        }
      ]
    }
  ];

  const handleFactorClick = (factor: string) => {
    setAuthState(prev => ({
      ...prev,
      [factor]: !prev[factor]
    }));
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (currentStep === 1 && isAuthenticated) {
      setCurrentStep(2);
    } else if (currentStep === 2 && selectedRole) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const completedFactors = Object.values(authState).filter(Boolean).length;
  const isAuthenticated = completedFactors >= 2;
  const progressPercentage = Math.min((completedFactors / 2) * 100, 100);

  const AccessExampleCard: React.FC<AccessExampleCardProps> = ({ title, examples }) => (
    <Card className="bg-gray-50">
      <CardContent className="p-4">
        <h4 className="font-medium text-sm mb-2 text-blue-600">{title}</h4>
        <ul className="space-y-2">
          {examples.map((example, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
              <ChevronRight className="w-4 h-4 mt-0.5 text-gray-400" />
              {example}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Progress Steps */}
      <div className="flex justify-between mb-6 p-4 bg-gray-100 rounded-lg">
        <div className={`flex items-center gap-2 ${currentStep === 1 ? 'text-blue-600 font-bold' : ''}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep === 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'
          }`}>1</div>
          Authentication
        </div>
        <div className="w-8 h-px bg-gray-300 self-center" />
        <div className={`flex items-center gap-2 ${currentStep === 2 ? 'text-blue-600 font-bold' : ''}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep === 2 ? 'bg-blue-600 text-white' : 'bg-gray-300'
          }`}>2</div>
          Role Selection
        </div>
        <div className="w-8 h-px bg-gray-300 self-center" />
        <div className={`flex items-center gap-2 ${currentStep === 3 ? 'text-blue-600 font-bold' : ''}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            currentStep === 3 ? 'bg-blue-600 text-white' : 'bg-gray-300'
          }`}>3</div>
          Access Control
        </div>
      </div>

      <Card className="border-2 border-gray-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              {currentStep === 1 && <Key className="w-8 h-8 text-blue-600" />}
              {currentStep === 2 && <Shield className="w-8 h-8 text-blue-600" />}
              {currentStep === 3 && <Lock className="w-8 h-8 text-blue-600" />}
            </div>
            {currentStep === 1 && 'Multi-Factor Authentication (MFA)'}
            {currentStep === 2 && 'Role-Based Access Control (RBAC)'}
            {currentStep === 3 && 'Access Permissions'}
          </CardTitle>
          <CardDescription className="text-base mt-1">
            {currentStep === 1 && 'Complete at least two factors to authenticate'}
            {currentStep === 2 && 'Select your role to determine access rights'}
            {currentStep === 3 && 'View your access permissions based on role'}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {currentStep === 1 && (
            <>
              {/* Progress Bar */}
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${progressPercentage}%`,
                    backgroundColor: isAuthenticated ? '#22c55e' : '#3b82f6'
                  }}
                />
              </div>

              {/* Authentication Factors */}
              <div className="grid grid-cols-3 gap-6">
                {authFactors.map((factor) => (
                  <Card
                    key={factor.name}
                    className={`
                      cursor-pointer transition-all duration-300
                      ${authState[factor.name as keyof AuthState] 
                        ? 'border-2 border-green-500 bg-green-50 shadow-md' 
                        : 'hover:border-blue-200 hover:shadow-md border-2 border-transparent'
                      }
                    `}
                    onClick={() => handleFactorClick(factor.name)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-2 rounded-lg ${
                          authState[factor.name as keyof AuthState] ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          {factor.icon}
                        </div>
                        {authState[factor.name as keyof AuthState] && (
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                        )}
                      </div>
                      <h3 className="text-lg font-medium mb-2">{factor.label}</h3>
                      <p className="text-sm text-gray-600 mb-2">{factor.example}</p>
                      <p className="text-xs text-gray-500">{factor.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {currentStep === 2 && (
            <div className="grid grid-cols-3 gap-6">
              {userRoles.map((role) => (
                <Card
                  key={role.name}
                  className={`
                    cursor-pointer transition-all duration-300
                    ${selectedRole === role.name 
                      ? 'border-2 border-blue-500 bg-blue-50 shadow-md' 
                      : 'hover:border-blue-200 hover:shadow-md border-2 border-transparent'
                    }
                  `}
                  onClick={() => handleRoleSelect(role.name)}
                >
                  <CardContent className="p-6">
                    <h3 className="text-lg font-medium mb-2">{role.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">{role.description}</p>
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-gray-500">Permissions:</p>
                      {role.permissions.map((permission, idx) => (
                        <div key={idx} className="text-xs text-gray-600 flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                          {permission.name}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <Alert className="bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <AlertDescription className="text-green-700">
                  Access granted as: {selectedRole}
                </AlertDescription>
              </Alert>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Granted Permissions & Real-World Examples</h3>
                  <div className="space-y-4">
                    {userRoles.find(role => role.name === selectedRole)?.permissions.map((permission, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          <h4 className="font-medium">{permission.name}</h4>
                        </div>
                        <AccessExampleCard title="What you can do:" examples={permission.examples} />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Accessible Systems</h3>
                  <div className="space-y-4">
                    {userRoles.find(role => role.name === selectedRole)?.systems.map((system, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Database className="w-5 h-5 text-blue-500" />
                          <h4 className="font-medium">{system.name}</h4>
                        </div>
                        <AccessExampleCard title="Available Tools:" examples={system.examples} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            {currentStep > 1 && (
              <Button 
                onClick={handleBack}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
            )}
            
            {currentStep === 1 && (
              <Button
                onClick={handleContinue}
                disabled={!isAuthenticated}
                className={`ml-auto flex items-center gap-2 ${
                  !isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
            
            {currentStep === 2 && (
              <Button
                onClick={handleContinue}
                disabled={!selectedRole}
                className={`ml-auto flex items-center gap-2 ${
                  !selectedRole ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                View Access
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityFlowVisual;