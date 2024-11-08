import React, { useState } from 'react';
import { Shield, Lock, Check, AlertCircle, ChevronRight, File, Folder, RefreshCw, Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const CertificateVisualizer = () => {
  const [selectedView, setSelectedView] = useState('structure');
  const [expandedNodes, setExpandedNodes] = useState(['root']);
  const [selectedCert, setSelectedCert] = useState(null);

  const toggleNode = (id) => {
    if (expandedNodes.includes(id)) {
      setExpandedNodes(expandedNodes.filter(nodeId => nodeId !== id));
    } else {
      setExpandedNodes([...expandedNodes, id]);
    }
  };

  const TreeNode = ({ id, label, level = 0, children, icon: Icon, info }) => {
    const isExpanded = expandedNodes.includes(id);
    const isSelected = selectedCert === id;

    return (
      <div className="select-none">
        <div
          className={`flex items-center gap-2 p-2 rounded cursor-pointer transition-colors
            ${isSelected ? 'bg-blue-100' : 'hover:bg-gray-50'}`}
          style={{ paddingLeft: `${level * 20 + 8}px` }}
          onClick={() => {
            toggleNode(id);
            setSelectedCert(id);
          }}
        >
          {children && (
            <ChevronRight 
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
            />
          )}
          {Icon && <Icon className="w-4 h-4 text-blue-500" />}
          <span className="text-sm">{label}</span>
        </div>
        {isExpanded && children && (
          <div className="ml-4">{children}</div>
        )}
      </div>
    );
  };

  const CertificateDetails = ({ cert }) => (
    <div className="p-4 bg-gray-50 rounded-lg">
      <h3 className="font-semibold mb-2">Certificate Details</h3>
      <div className="space-y-2 text-sm">
        <div className="grid grid-cols-3 gap-2">
          <span className="font-medium">Subject:</span>
          <span className="col-span-2">{cert.subject}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <span className="font-medium">Issuer:</span>
          <span className="col-span-2">{cert.issuer}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <span className="font-medium">Valid From:</span>
          <span className="col-span-2">{cert.validFrom}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <span className="font-medium">Valid To:</span>
          <span className="col-span-2">{cert.validTo}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <span className="font-medium">Key Usage:</span>
          <span className="col-span-2">{cert.keyUsage}</span>
        </div>
      </div>
    </div>
  );

  const certData = {
    'root-ca': {
      subject: 'Root CA',
      issuer: 'Self-signed',
      validFrom: '2020-01-01',
      validTo: '2030-01-01',
      keyUsage: 'Certificate Signing, CRL Signing'
    },
    'int-ca-1': {
      subject: 'Intermediate CA 1',
      issuer: 'Root CA',
      validFrom: '2021-01-01',
      validTo: '2026-01-01',
      keyUsage: 'Certificate Signing, CRL Signing'
    },
    'leaf-cert': {
      subject: 'example.com',
      issuer: 'Intermediate CA 1',
      validFrom: '2024-01-01',
      validTo: '2025-01-01',
      keyUsage: 'Digital Signature, Key Encipherment'
    },
  };

  const views = {
    structure: {
      title: 'Certificate Structure',
      icon: <File className="text-blue-500" />,
      content: (
        <div className="space-y-4">
          <TreeNode
            id="root"
            label="X.509 Certificate"
            icon={File}
            level={0}
          >
            <TreeNode id="version" label="Version: v3" level={1} />
            <TreeNode id="serial" label="Serial Number" level={1} />
            <TreeNode id="signature" label="Signature Algorithm" level={1} />
            <TreeNode id="issuer" label="Issuer Information" level={1} />
            <TreeNode id="validity" label="Validity Period" level={1}>
              <TreeNode id="valid-from" label="Not Before" level={2} />
              <TreeNode id="valid-to" label="Not After" level={2} />
            </TreeNode>
            <TreeNode id="subject" label="Subject Information" level={1} />
            <TreeNode id="pubkey" label="Public Key Information" level={1} />
            <TreeNode id="extensions" label="Extensions" level={1}>
              <TreeNode id="key-usage" label="Key Usage" level={2} />
              <TreeNode id="ext-key-usage" label="Extended Key Usage" level={2} />
              <TreeNode id="subject-alt" label="Subject Alternative Names" level={2} />
            </TreeNode>
          </TreeNode>
        </div>
      )
    },
    hierarchy: {
      title: 'CA Hierarchy',
      icon: <Folder className="text-blue-500" />,
      content: (
        <div className="space-y-4">
          <TreeNode
            id="root-ca"
            label="Root CA"
            icon={Shield}
            level={0}
            info={certData['root-ca']}
          >
            <TreeNode
              id="int-ca-1"
              label="Intermediate CA 1"
              icon={Shield}
              level={1}
              info={certData['int-ca-1']}
            >
              <TreeNode
                id="leaf-cert"
                label="example.com"
                icon={Lock}
                level={2}
                info={certData['leaf-cert']}
              />
            </TreeNode>
          </TreeNode>
        </div>
      )
    },
    transparency: {
      title: 'Certificate Transparency',
      icon: <Search className="text-blue-500" />,
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">CT Log Entry</h3>
            <pre className="text-sm bg-white p-2 rounded">
{`{
  "version": "v1",
  "timestamp": "2024-01-15T12:00:00Z",
  "leaf_certificate": "MIIEx...",
  "issuer": "Intermediate CA 1",
  "log_id": "ct.example.com",
  "signature": "SHA256withRSA"
}`}
            </pre>
          </div>
        </div>
      )
    },
    automation: {
      title: "Let's Encrypt Automation",
      icon: <RefreshCw className="text-blue-500" />,
      content: (
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
            <div className="space-y-2">
              <div className="font-semibold">ACME Protocol Flow</div>
              <ol className="list-decimal list-inside text-sm space-y-1">
                <li>Account Registration</li>
                <li>Domain Validation</li>
                <li>Certificate Request</li>
                <li>Challenge Completion</li>
                <li>Certificate Issuance</li>
                <li>Automatic Renewal</li>
              </ol>
            </div>
            <RefreshCw className="w-12 h-12 text-green-500" />
          </div>
        </div>
      )
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="text-blue-500" />
          Certificate Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Explore different aspects of SSL/TLS certificate management including structure, 
            validation, and automation.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-4 gap-2 mb-6">
          {Object.entries(views).map(([key, view]) => (
            <button
              key={key}
              onClick={() => setSelectedView(key)}
              className={`p-3 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors
                ${selectedView === key 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'hover:bg-gray-100'}`}
            >
              {view.icon}
              <span>{view.title}</span>
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            {views[selectedView].content}
          </div>
          <div>
            {selectedCert && certData[selectedCert] && (
              <CertificateDetails cert={certData[selectedCert]} />
            )}
            {selectedView === 'structure' && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-2">Field Descriptions</h3>
                <div className="space-y-2 text-sm">
                  <p>• <strong>Version:</strong> X.509 version number (typically v3)</p>
                  <p>• <strong>Serial Number:</strong> Unique identifier assigned by the CA</p>
                  <p>• <strong>Signature Algorithm:</strong> Algorithm used to sign the certificate</p>
                  <p>• <strong>Extensions:</strong> Additional certificate attributes and constraints</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificateVisualizer;
