import React, { useState } from 'react';
import { Database, Shield, Server, UserCircle, Lock, Eye, Files, Trash2, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const DataLifecycleVisual = () => {
  const [activePhase, setActivePhase] = useState(null);

  const dataClassificationLevels = [
    {
      level: 'Restricted',
      color: 'bg-red-500',
      textColor: 'text-red-700',
      borderColor: 'border-red-200',
      bgColor: 'bg-red-50'
    },
    {
      level: 'Confidential',
      color: 'bg-orange-500',
      textColor: 'text-orange-700',
      borderColor: 'border-orange-200',
      bgColor: 'bg-orange-50'
    },
    {
      level: 'Internal',
      color: 'bg-yellow-500',
      textColor: 'text-yellow-700',
      borderColor: 'border-yellow-200',
      bgColor: 'bg-yellow-50'
    },
    {
      level: 'Public',
      color: 'bg-green-500',
      textColor: 'text-green-700',
      borderColor: 'border-green-200',
      bgColor: 'bg-green-50'
    }
  ];

  const lifecyclePhases = [
    {
      id: 'create',
      icon: Files,
      title: 'Create',
      description: 'Data creation and classification',
      controls: {
        'Restricted': [
          'Mandatory classification tags',
          'Creation in secure environment',
          'Strict metadata requirements'
        ],
        'Confidential': [
          'Classification validation',
          'Creator authentication',
          'Secure workspace required'
        ],
        'Internal': [
          'Basic classification tags',
          'Standard workspace allowed',
          'Creator logging'
        ],
        'Public': [
          'Public marking required',
          'Standard creation process',
          'Basic metadata tracking'
        ]
      }
    },
    {
      id: 'store',
      icon: Database,
      title: 'Store',
      description: 'Secure data storage',
      controls: {
        'Restricted': [
          'Hardware encryption required',
          'Secure facility storage',
          'Access logging mandatory'
        ],
        'Confidential': [
          'Encrypted storage',
          'Access controls',
          'Regular backup required'
        ],
        'Internal': [
          'Standard encryption',
          'Department-level access',
          'Regular backups'
        ],
        'Public': [
          'Basic integrity checks',
          'Standard storage',
          'Backup recommended'
        ]
      }
    },
    {
      id: 'use',
      icon: UserCircle,
      title: 'Use',
      description: 'Data usage and processing',
      controls: {
        'Restricted': [
          'Multi-factor authentication',
          'Activity monitoring',
          'Time-limited access'
        ],
        'Confidential': [
          'Role-based access',
          'Usage logging',
          'Need-to-know basis'
        ],
        'Internal': [
          'Department authentication',
          'Basic logging',
          'Standard access controls'
        ],
        'Public': [
          'Basic authentication',
          'Usage tracking',
          'Open access'
        ]
      }
    },
    {
      id: 'share',
      icon: Server,
      title: 'Share',
      description: 'Data transmission',
      controls: {
        'Restricted': [
          'End-to-end encryption',
          'Secure channels only',
          'Recipient verification'
        ],
        'Confidential': [
          'Encrypted transmission',
          'Approved channels',
          'Access logging'
        ],
        'Internal': [
          'Standard encryption',
          'Internal channels',
          'Basic tracking'
        ],
        'Public': [
          'Standard protocols',
          'Public channels allowed',
          'Basic integrity checks'
        ]
      }
    },
    {
      id: 'archive',
      icon: Lock,
      title: 'Archive',
      description: 'Long-term storage',
      controls: {
        'Restricted': [
          'Encrypted archive',
          'Physical security',
          'Access review required'
        ],
        'Confidential': [
          'Secure archive',
          'Retention tracking',
          'Access controls'
        ],
        'Internal': [
          'Standard archive',
          'Basic retention',
          'Department access'
        ],
        'Public': [
          'Basic archival',
          'Standard retention',
          'Open access maintained'
        ]
      }
    },
    {
      id: 'destroy',
      icon: Trash2,
      title: 'Destroy',
      description: 'Secure disposal',
      controls: {
        'Restricted': [
          'Physical destruction',
          'Certified disposal',
          'Destruction verification'
        ],
        'Confidential': [
          'Secure wiping',
          'Disposal logging',
          'Verification required'
        ],
        'Internal': [
          'Standard wiping',
          'Basic logging',
          'Disposal confirmation'
        ],
        'Public': [
          'Standard deletion',
          'Basic tracking',
          'No special requirements'
        ]
      }
    }
  ];

  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader className="flex flex-row items-center space-x-2">
          <Shield className="w-6 h-6 text-blue-500" />
          <CardTitle>Asset Security & Data Protection</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Click on a lifecycle phase to see how security controls vary by classification level
            </AlertDescription>
          </Alert>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {dataClassificationLevels.map((level) => (
              <div
                key={level.level}
                className={`flex items-center space-x-2 px-3 py-1 rounded-full ${level.bgColor} ${level.borderColor} border`}
              >
                <div className={`w-2 h-2 rounded-full ${level.color}`} />
                <span className={`text-sm font-medium ${level.textColor}`}>
                  {level.level}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lifecyclePhases.map((phase) => {
              const Icon = phase.icon;
              return (
                <div
                  key={phase.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all
                    ${activePhase === phase.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'}
                  `}
                  onClick={() => setActivePhase(activePhase === phase.id ? null : phase.id)}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon className="w-5 h-5 text-blue-500" />
                    <h3 className="font-semibold">{phase.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{phase.description}</p>
                  
                  {activePhase === phase.id && (
                    <div className="space-y-3 mt-3">
                      {dataClassificationLevels.map((level) => (
                        <div
                          key={level.level}
                          className={`p-3 rounded-lg ${level.bgColor} ${level.borderColor} border`}
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            <div className={`w-2 h-2 rounded-full ${level.color}`} />
                            <span className={`text-sm font-medium ${level.textColor}`}>
                              {level.level}
                            </span>
                          </div>
                          <ul className={`list-disc pl-4 text-sm ${level.textColor}`}>
                            {phase.controls[level.level].map((control, idx) => (
                              <li key={idx}>{control}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataLifecycleVisual;
