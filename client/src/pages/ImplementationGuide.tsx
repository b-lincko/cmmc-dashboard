import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, ArrowLeft, Copy, Check } from "lucide-react";
import { CMMC_CONTROLS_ENHANCED, CMMCControlEnhanced } from "@/lib/cmmc-data-enhanced";

export default function ImplementationGuide() {
  const [, setLocation] = useLocation();
  const [selectedControl, setSelectedControl] = useState<CMMCControlEnhanced | null>(CMMC_CONTROLS_ENHANCED[0]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      setLocation("/");
    }
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setLocation("/");
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const renderCommandBlock = (commands: string[], platform: string) => {
    return (
      <div className="space-y-3">
        {commands.map((command, idx) => (
          <div key={idx}>
            {command.startsWith("#") ? (
              <p className="text-sm text-gray-500 italic mb-2">{command}</p>
            ) : command === "" ? (
              <div className="h-2" />
            ) : (
              <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-xs overflow-x-auto relative group">
                <code>{command}</code>
                <button
                  onClick={() => copyToClipboard(command, idx)}
                  className="absolute top-2 right-2 p-1 bg-gray-700 hover:bg-gray-600 rounded opacity-0 group-hover:opacity-100 transition"
                  title="Copy to clipboard"
                >
                  {copiedIndex === idx ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  if (!selectedControl) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setLocation("/dashboard")}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold text-blue-900">Implementation Guide</h1>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Control List Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-4 max-h-[calc(100vh-200px)] overflow-y-auto sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Controls</h3>
              <div className="space-y-2">
                {CMMC_CONTROLS_ENHANCED.map((control) => (
                  <button
                    key={control.id}
                    onClick={() => setSelectedControl(control)}
                    className={`w-full text-left px-3 py-2 rounded text-sm transition ${
                      selectedControl.id === control.id
                        ? "bg-blue-100 text-blue-900 font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {control.id}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Control Details */}
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{selectedControl.id}</CardTitle>
                <p className="text-lg text-gray-700 mt-2">{selectedControl.title}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-700">{selectedControl.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Domain</p>
                    <p className="text-gray-900">{selectedControl.domain}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Difficulty</p>
                    <p className={`font-semibold ${
                      selectedControl.difficulty === "Easy" ? "text-green-600" :
                      selectedControl.difficulty === "Moderate" ? "text-yellow-600" :
                      "text-red-600"
                    }`}>
                      {selectedControl.difficulty}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Category</p>
                    <p className="text-gray-900">{selectedControl.category}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Time Estimate</p>
                    <p className="text-gray-900">{selectedControl.timeEstimate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prerequisites */}
            <Card>
              <CardHeader>
                <CardTitle>Prerequisites</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {selectedControl.prerequisites.map((prereq, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">•</span>
                      <span className="text-gray-700">{prereq}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Tools Required */}
            <Card>
              <CardHeader>
                <CardTitle>Tools Required</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {selectedControl.tools.map((tool, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {tool}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Implementation Commands */}
            <Card>
              <CardHeader>
                <CardTitle>Implementation Commands</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="windows" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="windows">Windows</TabsTrigger>
                    <TabsTrigger value="linux">Linux</TabsTrigger>
                    <TabsTrigger value="mac">macOS</TabsTrigger>
                  </TabsList>

                  <TabsContent value="windows" className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">PowerShell Commands</h4>
                      {renderCommandBlock(selectedControl.windowsCommands.powershell, "PowerShell")}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 mt-6">Group Policy</h4>
                      {renderCommandBlock(selectedControl.windowsCommands.groupPolicy, "Group Policy")}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 mt-6">Registry</h4>
                      {renderCommandBlock(selectedControl.windowsCommands.registry, "Registry")}
                    </div>
                  </TabsContent>

                  <TabsContent value="linux">
                    <h4 className="font-semibold text-gray-900 mb-3">Linux Commands</h4>
                    {renderCommandBlock(selectedControl.linuxCommands, "Linux")}
                  </TabsContent>

                  <TabsContent value="mac">
                    <h4 className="font-semibold text-gray-900 mb-3">macOS Commands</h4>
                    {renderCommandBlock(selectedControl.macCommands, "macOS")}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Verification Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Verification Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 list-decimal list-inside">
                  {selectedControl.verification.map((step, idx) => (
                    <li key={idx} className="text-gray-700">{step}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* Best Practices */}
            <Card>
              <CardHeader>
                <CardTitle>Best Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {selectedControl.bestPractices.map((practice, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span className="text-gray-700">{practice}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Risks */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-900">Potential Risks</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {selectedControl.risks.map((risk, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-red-600 font-bold">⚠</span>
                      <span className="text-red-800">{risk}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* References */}
            <Card>
              <CardHeader>
                <CardTitle>References</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {selectedControl.references.map((ref, idx) => (
                    <li key={idx} className="text-blue-600 hover:underline cursor-pointer">
                      {ref}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-6 text-center text-sm text-gray-600">
        <p>Created by <strong>Muhammad Bilal</strong></p>
        <p className="mt-1 text-xs text-gray-500">CMMC Level 2 Compliance Dashboard v2.0</p>
      </footer>
    </div>
  );
}
