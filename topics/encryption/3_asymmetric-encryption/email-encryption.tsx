import React, { useState } from 'react';
import { Mail, Lock, Shield, Key, Check, AlertCircle, FileText, User, ArrowRight, RefreshCw } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ProcessVisualizer = ({ process, steps, currentStep, setCurrentStep, showCertDetails, setShowCertDetails }) => (
  <div className="space-y-6">
    <div className="flex justify-between mb-4">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`w-1/4 relative ${index !== steps.length - 1 ? 'after:content-[""] after:absolute after:top-4 after:left-full after:w-full after:h-0.5 after:bg-gray-200' : ''}`}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
            index === currentStep ? 'bg-blue-500 text-white' :
            index < currentStep ? 'bg-green-500 text-white' : 'bg-gray-200'
          }`}>
            {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
          </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-2 gap-6">
      <div className="p-6 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          {steps[currentStep].icon}
          <h3 className="font-semibold">{steps[currentStep].title}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">{steps[currentStep].description}</p>
        <ul className="space-y-2 text-sm">
          {steps[currentStep].details.map((detail, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              {detail}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative h-64">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="flex justify-center items-center gap-8">
              <div className="flex flex-col items-center">
                <User className="w-12 h-12 text-gray-400 mb-2" />
                <span className="text-sm">Sender</span>
              </div>
              <ArrowRight className="w-8 h-8 text-blue-500" />
              <div className="flex flex-col items-center">
                <User className="w-12 h-12 text-gray-400 mb-2" />
                <span className="text-sm">Recipient</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="flex justify-between mt-6">
      <button
        onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
        className="px-4 py-2 text-blue-500 hover:text-blue-600 disabled:opacity-50"
        disabled={currentStep === 0}
      >
        Previous
      </button>
      <button
        onClick={() => setShowCertDetails(!showCertDetails)}
        className="px-4 py-2 text-blue-500 hover:text-blue-600"
      >
        {showCertDetails ? 'Hide' : 'Show'} Certificate Details
      </button>
      <button
        onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
        className="px-4 py-2 text-blue-500 hover:text-blue-600 disabled:opacity-50"
        disabled={currentStep === steps.length - 1}
      >
        Next
      </button>
    </div>
  </div>
);

const CertificateDetails = () => (
  <div className="p-4 bg-gray-50 rounded-lg mt-4">
    <h3 className="font-semibold mb-2 flex items-center gap-2">
      <Shield className="w-4 h-4 text-blue-500" />
      S/MIME Certificate
    </h3>
    <div className="text-sm space-y-2">
      <div className="grid grid-cols-3 gap-2">
        <span className="font-medium">Subject:</span>
        <span className="col-span-2">user@example.com</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <span className="font-medium">Issuer:</span>
        <span className="col-span-2">Example S/MIME CA</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <span className="font-medium">Valid Until:</span>
        <span className="col-span-2">2025-01-15</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <span className="font-medium">Key Usage:</span>
        <span className="col-span-2">Digital Signature, Key Encipherment</span>
      </div>
    </div>
  </div>
);

const SMIMEVisualizer = () => {
  const [activeProcess, setActiveProcess] = useState('sign');
  const [currentStep, setCurrentStep] = useState(0);
  const [showCertDetails, setShowCertDetails] = useState(false);

  const processes = {
    sign: {
      title: 'Digital Signing',
      steps: [
        {
          title: 'Create Message Hash',
          description: 'Calculate hash of email content',
          icon: <FileText className="text-blue-500" />,
          details: [
            'Hash function (e.g., SHA-256) creates message digest',
            'Ensures message integrity',
            'Any changes invalidate the signature'
          ]
        },
        {
          title: 'Sign with Private Key',
          description: "Create digital signature using sender's private key",
          icon: <Key className="text-yellow-500" />,
          details: [
            "Sender's private key encrypts message digest",
            'Creates unique digital signature',
            'Only sender can create valid signature'
          ]
        },
        {
          title: 'Attach Certificate',
          description: "Include sender's digital certificate",
          icon: <Shield className="text-green-500" />,
          details: [
            "Contains sender's public key",
            "Verified by Certificate Authority",
            "Enables signature verification"
          ]
        },
        {
          title: "Send Signed Email",
          description: "Combine original message, signature, and certificate",
          icon: <Mail className="text-purple-500" />,
          details: [
            'Original message remains readable',
            "Signature proves authenticity",
            "Certificate enables verification"
          ]
        }
      ]
    },
    encrypt: {
        title: "Email Encryption",
      steps: [
        {
          title: 'Get Recipient Certificate',
          description: "Obtain recipient's public key certificate",
          icon: <Shield className="text-blue-500" />,
          details: [
            "Look up recipient's certificate",
            'Verify certificate validity',
            'Extract public key'
          ]
        },
        {
          title: 'Generate Session Key',
          description: 'Create random symmetric encryption key',
          icon: <RefreshCw className="text-yellow-500" />,
          details: [
            'Generate random AES key',
            'Used for message encryption',
            'Unique for each message'
          ]
        },
        {
          title: 'Encrypt Message',
          description: 'Encrypt email content with session key',
          icon: <Lock className="text-green-500" />,
          details: [
            'Encrypt message body with AES',
            'Protect attachments',
            'Ensure confidentiality'
          ]
        },
        {
          title: 'Encrypt Session Key',
          description: "Encrypt session key with recipient's public key",
          icon: <Key className="text-purple-500" />,
          details: [
            'Protect session key',
            'Only recipient can decrypt',
            'Enable secure key exchange'
          ]
        }
      ]
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="text-blue-500" />
          S/MIME Protocol Visualization
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            S/MIME provides email authentication and encryption through digital signatures and public key cryptography.
          </AlertDescription>
        </Alert>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => {
              setActiveProcess('sign');
              setCurrentStep(0);
            }}
            className={`flex-1 p-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors
              ${activeProcess === 'sign' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
          >
            <Shield />
            Digital Signing Process
          </button>
          <button
            onClick={() => {
              setActiveProcess('encrypt');
              setCurrentStep(0);
            }}
            className={`flex-1 p-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors
              ${activeProcess === 'encrypt' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
          >
            <Lock />
            Encryption Process
          </button>
        </div>

        <ProcessVisualizer
          process={activeProcess}
          steps={processes[activeProcess].steps}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          showCertDetails={showCertDetails}
          setShowCertDetails={setShowCertDetails}
        />

        {showCertDetails && <CertificateDetails />}
      </CardContent>
    </Card>
  );
};

export default SMIMEVisualizer;
