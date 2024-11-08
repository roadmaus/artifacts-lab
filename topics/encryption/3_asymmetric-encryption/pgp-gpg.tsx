import React, { useState } from "react";
import { Key, Users, Globe, Terminal, Shield, Check, AlertCircle, RefreshCw, Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

const TrustNode = ({ name, trustLevel, x, y, isSelected, onClick }) => (
  <div
    className={`absolute cursor-pointer transition-all duration-300 ${
      isSelected ? "scale-110" : ""
    }`}
    style={{ left: `${x}%`, top: `${y}%` }}
    onClick={onClick}
  >
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
      trustLevel === "ultimate" ? "bg-green-500" :
      trustLevel === "full" ? "bg-blue-500" :
      trustLevel === "marginal" ? "bg-yellow-500" : "bg-gray-300"
    } text-white mb-2`}>
      <Users className="w-6 h-6" />
    </div>
    <div className="text-center text-sm font-medium whitespace-nowrap">{name}</div>
  </div>
);

const CommandExample = ({ command, output }) => (
  <div className="font-mono text-sm bg-gray-900 text-white p-4 rounded-lg">
    <div className="flex items-center gap-2 text-green-400">
      <Terminal className="w-4 h-4" />
      <span>$ {command}</span>
    </div>
    {output && (
      <div className="mt-2 text-gray-300 whitespace-pre-line">
        {output}
      </div>
    )}
  </div>
);

// Update the TrustLine component
const TrustLine = ({ startX, startY, endX, endY, trustLevel }) => (
  <svg
    className="absolute top-0 left-0 w-full h-full"
    style={{ 
      position: 'absolute',
      pointerEvents: 'none',
      zIndex: 0
    }}
  >
    <line
      x1={`${startX}%`}
      y1={`${startY}%`}
      x2={`${endX}%`}
      y2={`${endY}%`}
      stroke={
        trustLevel === "full" ? "#3B82F6" :
        trustLevel === "marginal" ? "#EAB308" :
        "#D1D5DB"
      }
      strokeWidth="2"
      strokeDasharray={trustLevel === "marginal" ? "4 4" : "none"}
    />
  </svg>
);

const PGPVisualizer = () => {
  const [activeTab, setActiveTab] = useState("keys");
  const [selectedNode, setSelectedNode] = useState(null);

  const tabs = {
    keys: {
      title: "Key Management",
      icon: <Key className="text-blue-500" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Key className="text-blue-500 w-4 h-4" />
                Generate Key Pair
              </h3>
              <CommandExample
                command="gpg --full-generate-key"
                output="gpg (GnuPG) 2.2.27
Please select what kind of key you want:
   (1) RSA and RSA (default)
   (2) DSA and Elgamal
   (3) DSA (sign only)
   (4) RSA (sign only)"
              />
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Shield className="text-green-500 w-4 h-4" />
                List Keys
              </h3>
              <CommandExample
                command="gpg --list-keys"
                output="/home/user/.gnupg/pubring.kbx
------------------------
pub   rsa4096 2024-01-15 [SC]
      ABC123DEF456GHI789
uid           [ultimate] User Name <user@example.com>
sub   rsa4096 2024-01-15 [E]"
              />
            </div>
          </div>
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Always keep your private key secure and never share it. Back up your keys in a safe location.
            </AlertDescription>
          </Alert>
        </div>
      )
    },
    trust: {
      title: "Web of Trust",
      icon: <Users className="text-yellow-500" />,
      content: (
        <div className="relative h-96 bg-gray-50 rounded-lg p-4">
          <div className="absolute inset-0" style={{ zIndex: 1 }}>
            {/* First render all lines */}
            <TrustLine startX={50} startY={20} endX={20} endY={50} trustLevel="full" />
            <TrustLine startX={50} startY={20} endX={80} endY={50} trustLevel="full" />
            <TrustLine startX={20} startY={50} endX={35} endY={80} trustLevel="marginal" />
            <TrustLine startX={80} startY={50} endX={65} endY={80} trustLevel="marginal" />
          </div>
          
          <div className="absolute inset-0" style={{ zIndex: 2 }}>
            {/* Then render all nodes */}
            <TrustNode name="You" trustLevel="ultimate" x={50} y={20} 
              isSelected={selectedNode === "you"}
              onClick={() => setSelectedNode("you")}
            />
            <TrustNode name="Alice" trustLevel="full" x={20} y={50}
              isSelected={selectedNode === "alice"}
              onClick={() => setSelectedNode("alice")}
            />
            <TrustNode name="Bob" trustLevel="full" x={80} y={50}
              isSelected={selectedNode === "bob"}
              onClick={() => setSelectedNode("bob")}
            />
            <TrustNode name="Carol" trustLevel="marginal" x={35} y={80}
              isSelected={selectedNode === "carol"}
              onClick={() => setSelectedNode("carol")}
            />
            <TrustNode name="Dave" trustLevel="marginal" x={65} y={80}
              isSelected={selectedNode === "dave"}
              onClick={() => setSelectedNode("dave")}
            />
          </div>

          {selectedNode && (
            <div className="absolute bottom-4 left-4 right-4 p-4 bg-white rounded-lg shadow-lg border border-gray-300">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Trust Details
              </h4>
              <div className="text-sm space-y-2">
                {selectedNode === "you" && (
                  <>
                    <div className="font-medium text-green-600">Ultimate Trust Level</div>
                    <div>Your key is the root of your trust network. All trust relationships stem from here.</div>
                  </>
                )}
                {selectedNode === "alice" && (
                  <>
                    <div className="font-medium text-blue-600">Full Trust Level</div>
                    <div>You have personally verified Alice's identity and trust her to verify others.</div>
                  </>
                )}
                {selectedNode === "bob" && (
                  <>
                    <div className="font-medium text-blue-600">Full Trust Level</div>
                    <div>You have personally verified Bob's identity and trust him to verify others.</div>
                  </>
                )}
                {selectedNode === "carol" && (
                  <>
                    <div className="font-medium text-yellow-600">Marginal Trust Level</div>
                    <div>Carol's key is trusted through Alice's verification. This creates a chain of trust.</div>
                  </>
                )}
                {selectedNode === "dave" && (
                  <>
                    <div className="font-medium text-yellow-600">Marginal Trust Level</div>
                    <div>Dave's key is trusted through Bob's verification. This creates a chain of trust.</div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )
    },
    servers: {
      title: "Key Servers",
      icon: <Globe className="text-purple-500" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Search className="text-blue-500 w-4 h-4" />
                Search Keys
              </h3>
              <CommandExample
                command="gpg --keyserver keys.gnupg.net --search-keys user@example.com"
                output='gpg: searching for "user@example.com" from hkp server keys.gnupg.net
(1)  User Name <user@example.com>
      Created: 2024-01-15  Expires: never       Usage: SC  
      Trust: Unknown       Validity: Unknown'
              />
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <RefreshCw className="text-green-500 w-4 h-4" />
                Upload Key
              </h3>
              <CommandExample
                command="gpg --keyserver keys.gnupg.net --send-keys ABC123DEF456GHI789"
                output="gpg: sending key ABC123DEF456GHI789 to hkp://keys.gnupg.net"
              />
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">Popular Key Servers</h3>
            <ul className="space-y-2 text-sm">
              <li>• keys.gnupg.net</li>
              <li>• keyserver.ubuntu.com</li>
              <li>• pgp.mit.edu</li>
            </ul>
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
          PGP/GPG Implementation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            PGP (Pretty Good Privacy) and its free implementation GPG provide strong encryption for emails and files.
          </AlertDescription>
        </Alert>

        <div className="flex gap-4 mb-6">
          {Object.entries(tabs).map(([key, tab]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 p-4 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors
                ${activeTab === key ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"}`}
            >
              {tab.icon}
              <span>{tab.title}</span>
            </button>
          ))}
        </div>

        {tabs[activeTab].content}
      </CardContent>
    </Card>
  );
};

export default PGPVisualizer;
