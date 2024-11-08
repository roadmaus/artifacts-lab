import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  Lock, Key, FileCode, Shield, CheckCircle2, Users, Eye, 
  EyeOff, ChevronRight, AlertCircle, X, Code2, CircleDollarSign,
  Network, GitFork
} from 'lucide-react';

// Contract templates
const CONTRACT_TEMPLATES = {
  basic: `
contract BasicMultiSig {
    uint public required;
    mapping(address => bool) public isOwner;
    
    constructor(address[] memory _owners, uint _required) {
        require(_required > 0);
        required = _required;
        for(uint i = 0; i < _owners.length; i++) {
            isOwner[_owners[i]] = true;
        }
    }
}`,
  advanced: `
contract AdvancedMultiSig {
    uint public required;
    uint public delay;
    mapping(address => bool) public isOwner;
    mapping(bytes32 => Transaction) public transactions;
    
    struct Transaction {
        bool executed;
        uint confirmations;
        uint timestamp;
        mapping(address => bool) isConfirmed;
    }
    
    constructor(
        address[] memory _owners,
        uint _required,
        uint _delay
    ) {
        required = _required;
        delay = _delay;
        for(uint i = 0; i < _owners.length; i++) {
            isOwner[_owners[i]] = true;
        }
    }
}`,
  timelock: `
contract TimelockMultiSig {
    uint public required;
    uint public delay;
    uint public gracePeriod;
    mapping(address => bool) public isOwner;
    mapping(bytes32 => Transaction) public transactions;
    
    struct Transaction {
        bool executed;
        bool cancelled;
        uint confirmations;
        uint timestamp;
        uint deadline;
        mapping(address => bool) isConfirmed;
    }
    
    constructor(
        address[] memory _owners,
        uint _required,
        uint _delay,
        uint _gracePeriod
    ) {
        required = _required;
        delay = _delay;
        gracePeriod = _gracePeriod;
        for(uint i = 0; i < _owners.length; i++) {
            isOwner[_owners[i]] = true;
        }
    }
}`
};

const AnimatedCode = ({ code, isAnimating }) => {
  const [displayCode, setDisplayCode] = useState('');
  
  useEffect(() => {
    if (isAnimating) {
      let current = '';
      const reveal = setInterval(() => {
        if (current.length < code.length) {
          current += code[current.length];
          setDisplayCode(current);
        } else {
          clearInterval(reveal);
        }
      }, 20);
      return () => clearInterval(reveal);
    } else {
      setDisplayCode(code);
    }
  }, [code, isAnimating]);

  return (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
      <code>{displayCode}</code>
    </pre>
  );
};

const MultiSigVisualizer = ({ requiredSignatures, totalSigners, type }) => {
  const [signatures, setSignatures] = useState([]);
  const [isExecuted, setIsExecuted] = useState(false);
  const [executionDelay, setExecutionDelay] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(null);

  const addSignature = () => {
    if (signatures.length < totalSigners) {
      const newSignatures = [...signatures, `0x${Math.random().toString(16).slice(2, 10)}`];
      setSignatures(newSignatures);
      
      if (newSignatures.length >= requiredSignatures) {
        if (type === 'timelock') {
          setExecutionDelay(24); // 24 hour delay
          setTimeRemaining(24);
          const timer = setInterval(() => {
            setTimeRemaining(prev => {
              if (prev <= 0) {
                clearInterval(timer);
                setIsExecuted(true);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);
        } else {
          setTimeout(() => setIsExecuted(true), 500);
        }
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm font-medium">Required Signatures:</span>
        <div className="flex-1 h-2 bg-gray-200 rounded-full">
          <div 
            className="h-2 bg-blue-500 rounded-full transition-all duration-300"
            style={{ width: `${(signatures.length / requiredSignatures) * 100}%` }}
          />
        </div>
        <span className="text-sm font-medium">{signatures.length}/{requiredSignatures}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: totalSigners }).map((_, i) => (
          <div
            key={i}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              signatures[i] 
                ? 'bg-green-100 border-green-500' 
                : 'hover:border-blue-500 hover:shadow-md'
            }`}
            onClick={() => !signatures[i] && addSignature()}
          >
            <div className="flex items-center gap-2">
              <Users className={`w-5 h-5 ${signatures[i] ? 'text-green-600' : 'text-gray-400'}`} />
              <span className="text-sm font-medium truncate">
                {signatures[i] ? 
                  <span className="font-mono">{signatures[i]}</span> : 
                  'Click to sign'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {timeRemaining > 0 && (
        <div className="p-4 bg-yellow-100 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-yellow-600" />
          <span>Timelock active: {timeRemaining} seconds remaining</span>
        </div>
      )}

      {isExecuted && (
        <div className="p-4 bg-green-100 rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <span className="font-medium">Transaction executed successfully!</span>
        </div>
      )}
    </div>
  );
};

const ZKProofVisualizer = () => {
  const [secret, setSecret] = useState('1234');
  const [isProving, setIsProving] = useState(false);
  const [proofType, setProofType] = useState('simple');
  const [proofGenerated, setProofGenerated] = useState(false);
  const [showSecret, setShowSecret] = useState(false);
  const [proofSteps, setProofSteps] = useState([]);

  const proofTypes = {
    simple: 'Basic ZK Proof',
    range: 'Range Proof (value within range)',
    merkle: 'Merkle Tree Membership'
  };

  const generateProof = () => {
    setIsProving(true);
    setProofSteps([]);
    
    const steps = {
      simple: [
        'Generating random nonce...',
        'Computing hash commitment...',
        'Applying zero-knowledge transformation...',
        'Verifying proof validity...'
      ],
      range: [
        'Decomposing value into bit representation...',
        'Generating range constraints...',
        'Computing multi-range proof...',
        'Verifying range bounds...'
      ],
      merkle: [
        'Computing leaf hash...',
        'Generating Merkle path...',
        'Computing root hash...',
        'Verifying tree membership...'
      ]
    };

    let currentStep = 0;
    const stepInterval = setInterval(() => {
      if (currentStep < steps[proofType].length) {
        setProofSteps(prev => [...prev, steps[proofType][currentStep]]);
        currentStep++;
      } else {
        clearInterval(stepInterval);
        setProofGenerated(true);
        setIsProving(false);
      }
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(proofTypes).map(([type, label]) => (
          <div
            key={type}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              proofType === type 
                ? 'bg-purple-100 border-purple-500' 
                : 'hover:border-purple-500'
            }`}
            onClick={() => setProofType(type)}
          >
            <span className="font-medium">{label}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">Secret Value</label>
          <div className="relative">
            <input
              type={showSecret ? 'text' : 'password'}
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="w-full p-3 border rounded-lg pr-10"
            />
            <button
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowSecret(!showSecret)}
            >
              {showSecret ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
        <button
          onClick={generateProof}
          disabled={isProving}
          className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 
                     transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <Shield className="w-5 h-5" />
          Generate Proof
        </button>
      </div>

      {proofSteps.length > 0 && (
        <div className="space-y-2">
          {proofSteps.map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg"
            >
              <CheckCircle2 className="w-4 h-4 text-purple-500" />
              <span>{step}</span>
            </div>
          ))}
        </div>
      )}

      {proofGenerated && (
        <div className="p-4 bg-purple-100 rounded-lg space-y-3">
          <div className="font-medium flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-600" />
            Zero-Knowledge Proof Generated
          </div>
          <div className="text-sm text-purple-700">
            {proofType === 'range' 
              ? 'Proves value is within valid range without revealing it'
              : proofType === 'merkle'
              ? 'Proves membership in Merkle tree without revealing position'
              : 'Proves knowledge of secret without revealing it'}
          </div>
          <pre className="bg-white p-3 rounded-lg text-sm font-mono">
            proof: 0x{Array.from(secret + proofType).reduce((a, b) => 
              a + b.charCodeAt(0), 0).toString(16).padStart(64, '0')}
          </pre>
        </div>
      )}
    </div>
  );
};

const SmartContractCrypto = () => {
  const [contractType, setContractType] = useState('basic');
  const [isAnimating, setIsAnimating] = useState(false);
  const [deploymentHash, setDeploymentHash] = useState('');
  const [ownerAddress, setOwnerAddress] = useState('0x742d35Cc6634C0532925a3b844Bc454e4438f44e');

  const handleDeploy = () => {
    setIsAnimating(true);
    setDeploymentHash('');
    setTimeout(() => {
      setDeploymentHash(`0x${Math.random().toString(16).slice(2, 64)}`);
      setIsAnimating(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Contract Selection & Deployment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCode className="w-6 h-6" />
            Smart Contract Deployment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries({
                basic: ['Basic MultiSig', 'Simple ownership verification'],
                advanced: ['Advanced MultiSig', 'With execution delay'],
                timelock: ['Timelock MultiSig', 'With cancellation period']
              }).map(([type, [title, desc]]) => (
                <div
                  key={type}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    contractType === type 
                      ? 'bg-blue-50 border-blue-500' 
                      : 'hover:border-blue-500'
                  }`}
                  onClick={() => setContractType(type)}
                >
                  <h3 className="font-medium">{title}</h3>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Contract Code</label>
              <AnimatedCode code={CONTRACT_TEMPLATES[contractType]} isAnimating={isAnimating} />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Owner Address</label>
                <input
                  type="text"
                  value={ownerAddress}
                  onChange={(e) => setOwnerAddress(e.target.value)}
                  className="w-full p-3 border rounded-lg font-mono"
                />
              </div>
              <button
                onClick={handleDeploy}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                         transition-colors flex items-center gap-2"
              >
                <Code2 className="w-5 h-5" />
                Deploy Contract
              </button>
            </div>

            {deploymentHash && (
              <div className="p-4 bg-green-100 rounded-lg space-y-2">
                <div className="font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Contract Deployed Successfully
                </div>
                <div className="text-sm text-green-700">
                  Contract is now live on the network
                </div>
                <div className="font-mono text-sm bg-white p-3 rounded break-all">
                  {deploymentHash}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Multi-Signature Schemes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-6 h-6" />
            Multi-Signature Schemes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">2-of-3 MultiSig</h3>
                <MultiSigVisualizer 
                  requiredSignatures={2} 
                  totalSigners={3} 
                  type="basic"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">3-of-5 with Timelock</h3>
                <MultiSigVisualizer 
                  requiredSignatures={3} 
                  totalSigners={5} 
                  type="timelock"
                />
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-blue-500" />
                Security Features
              </h4>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• Threshold signature schemes prevent single points of failure</li>
                <li>• Timelock delays provide safety period for critical operations</li>
                <li>• Transaction receipts are cryptographically verified</li>
                <li>• Multiple signature verification methods supported</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zero-Knowledge Proofs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Zero-Knowledge Proof Integration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium flex items-center gap-2 mb-2">
                <Lock className="w-5 h-5 text-purple-600" />
                Privacy-Preserving Verification
              </h4>
              <p className="text-sm text-purple-700">
                Zero-knowledge proofs allow verification of conditions without revealing sensitive data.
                Perfect for compliance checks and private transactions.
              </p>
            </div>

            <ZKProofVisualizer />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <Network className="w-5 h-5 text-gray-600" />
                  Network Privacy
                </h4>
                <p className="text-sm text-gray-600">
                  Transactions verified without exposing sensitive details to the network
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <CircleDollarSign className="w-5 h-5 text-gray-600" />
                  Amount Privacy
                </h4>
                <p className="text-sm text-gray-600">
                  Prove transaction validity without revealing actual amounts
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <GitFork className="w-5 h-5 text-gray-600" />
                  Identity Privacy
                </h4>
                <p className="text-sm text-gray-600">
                  Verify identity requirements while maintaining anonymity
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartContractCrypto;
                