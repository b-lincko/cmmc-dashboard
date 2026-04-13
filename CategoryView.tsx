import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { LogOut, ArrowLeft } from "lucide-react";
import { CMMC_CONTROLS, CMMCControl } from "@/lib/cmmc-data";

export default function CategoryView() {
  const [, setLocation] = useLocation();
  const [controls, setControls] = useState<CMMCControl[]>(CMMC_CONTROLS);
  const [expandedControl, setExpandedControl] = useState<string | null>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      setLocation("/");
    } else {
      const savedControls = localStorage.getItem("cmmcControls");
      if (savedControls) {
        try {
          setControls(JSON.parse(savedControls));
        } catch (e) {
          console.error("Error loading saved controls:", e);
        }
      }
    }
  }, [setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setLocation("/");
  };

  const toggleControl = (id: string) => {
    const updated = controls.map(c => 
      c.id === id ? { ...c, completed: !c.completed } : c
    );
    setControls(updated);
    localStorage.setItem("cmmcControls", JSON.stringify(updated));
  };

  const controlsByCategory = {
    "Active Directory": controls.filter(c => c.category === "Active Directory"),
    "Network": controls.filter(c => c.category === "Network"),
    "Physical": controls.filter(c => c.category === "Physical"),
    "Mobile": controls.filter(c => c.category === "Mobile"),
    "Policy": controls.filter(c => c.category === "Policy")
  };

  const categoryDescriptions: Record<string, { icon: string; description: string; tips: string[] }> = {
    "Active Directory": {
      icon: "👤",
      description: "Controls related to user accounts, authentication, and access management through Active Directory.",
      tips: [
        "Start by auditing current user accounts",
        "Implement strong password policies",
        "Enable MFA for all users",
        "Set up regular access reviews"
      ]
    },
    "Network": {
      icon: "🌐",
      description: "Controls for network security, firewalls, encryption, and communications protection.",
      tips: [
        "Review firewall rules and policies",
        "Implement network segmentation",
        "Enable encryption for all communications",
        "Deploy intrusion detection systems"
      ]
    },
    "Physical": {
      icon: "🏢",
      description: "Controls for physical security of facilities, equipment, and media.",
      tips: [
        "Secure server rooms with access controls",
        "Implement visitor management",
        "Secure media storage and disposal",
        "Monitor physical access logs"
      ]
    },
    "Mobile": {
      icon: "📱",
      description: "Controls for mobile devices, remote work, and portable storage security.",
      tips: [
        "Enable device encryption",
        "Implement mobile device management",
        "Secure remote work environments",
        "Control portable storage usage"
      ]
    },
    "Policy": {
      icon: "📋",
      description: "Controls for security policies, procedures, training, and documentation.",
      tips: [
        "Document security policies",
        "Conduct security awareness training",
        "Establish incident response procedures",
        "Maintain compliance documentation"
      ]
    }
  };

  const renderCategorySection = (category: string, categoryControls: CMMCControl[]) => {
    const categoryInfo = categoryDescriptions[category];
    const colorMap: Record<string, { bg: string; border: string; header: string; headerText: string }> = {
      "Active Directory": { bg: "bg-purple-50", border: "border-purple-200", header: "bg-purple-100", headerText: "text-purple-900" },
      "Network": { bg: "bg-blue-50", border: "border-blue-200", header: "bg-blue-100", headerText: "text-blue-900" },
      "Physical": { bg: "bg-amber-50", border: "border-amber-200", header: "bg-amber-100", headerText: "text-amber-900" },
      "Mobile": { bg: "bg-pink-50", border: "border-pink-200", header: "bg-pink-100", headerText: "text-pink-900" },
      "Policy": { bg: "bg-green-50", border: "border-green-200", header: "bg-green-100", headerText: "text-green-900" }
    };

    const colors = colorMap[category];

    return (
      <Card key={category} className={`${colors.bg} border-2 ${colors.border}`}>
        <CardHeader className={`${colors.header} ${colors.headerText}`}>
          <CardTitle className="text-2xl">
            {categoryInfo.icon} {category}
          </CardTitle>
          <p className="text-sm mt-2 opacity-90">{categoryInfo.description}</p>
          <p className="text-xs mt-2 opacity-75">
            {categoryControls.length} controls • {categoryControls.filter(c => c.completed).length} completed
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          {/* Implementation Tips */}
          <div className="p-4 bg-white rounded-lg border border-gray-200">
            <h5 className="font-semibold text-sm text-gray-900 mb-2">💡 Implementation Tips:</h5>
            <ul className="space-y-1">
              {categoryInfo.tips.map((tip, idx) => (
                <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Controls */}
          <div className="space-y-3">
            {categoryControls.map((control) => (
              <div
                key={control.id}
                className={`p-4 rounded-lg border-2 transition cursor-pointer ${
                  control.completed
                    ? "bg-white border-green-300"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setExpandedControl(expandedControl === control.id ? null : control.id)}
              >
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={control.completed}
                    onCheckedChange={() => toggleControl(control.id)}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-1"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-bold text-sm ${control.completed ? "line-through text-gray-500" : "text-gray-900"}`}>
                      {control.id}
                    </h4>
                    <p className={`text-sm mt-1 ${control.completed ? "text-gray-500" : "text-gray-700"}`}>
                      {control.title}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className={`text-xs px-2 py-1 rounded font-medium ${
                        control.difficulty === "Easy" ? "bg-green-100 text-green-800" :
                        control.difficulty === "Moderate" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {control.difficulty}
                      </span>
                      <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700 font-medium">
                        {control.domain}
                      </span>
                    </div>

                    {expandedControl === control.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                        <div>
                          <h5 className="font-semibold text-sm text-gray-900 mb-2">Description:</h5>
                          <p className="text-sm text-gray-700">{control.description}</p>
                        </div>
                        <div>
                          <h5 className="font-semibold text-sm text-gray-900 mb-2">Step-by-Step Implementation:</h5>
                          <ol className="list-decimal list-inside space-y-2">
                            {control.steps.map((step, idx) => (
                              <li key={idx} className="text-sm text-gray-700">{step}</li>
                            ))}
                          </ol>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

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
            <h1 className="text-2xl font-bold text-blue-900">Controls by Category</h1>
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
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Organize by Implementation Category</h2>
          <p className="text-gray-600">
            Controls are organized by category to help you implement related security measures together. 
            Each category includes implementation tips and step-by-step guides.
          </p>
        </div>

        <div className="space-y-8">
          {Object.entries(controlsByCategory).map(([category, categoryControls]) =>
            renderCategorySection(category, categoryControls)
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-6 text-center text-sm text-gray-600">
        <p>Created by <strong>Muhammad Bilal</strong></p>
        <p className="mt-1 text-xs text-gray-500">CMMC Level 2 Compliance Dashboard v1.0</p>
      </footer>
    </div>
  );
}
