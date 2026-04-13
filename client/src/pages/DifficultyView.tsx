import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { LogOut, ArrowLeft } from "lucide-react";
import { CMMC_CONTROLS, CMMCControl } from "@/lib/cmmc-data";

export default function DifficultyView() {
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

  const controlsByDifficulty = {
    Easy: controls.filter(c => c.difficulty === "Easy"),
    Moderate: controls.filter(c => c.difficulty === "Moderate"),
    Hard: controls.filter(c => c.difficulty === "Hard")
  };

  const renderDifficultySection = (difficulty: "Easy" | "Moderate" | "Hard", controls: CMMCControl[]) => {
    const colorClass = difficulty === "Easy" ? "green" : difficulty === "Moderate" ? "yellow" : "red";
    const bgColor = difficulty === "Easy" ? "bg-green-50" : difficulty === "Moderate" ? "bg-yellow-50" : "bg-red-50";
    const borderColor = difficulty === "Easy" ? "border-green-200" : difficulty === "Moderate" ? "border-yellow-200" : "border-red-200";
    const headerBg = difficulty === "Easy" ? "bg-green-100" : difficulty === "Moderate" ? "bg-yellow-100" : "bg-red-100";
    const headerText = difficulty === "Easy" ? "text-green-900" : difficulty === "Moderate" ? "text-yellow-900" : "text-red-900";

    return (
      <Card key={difficulty} className={`${bgColor} border-2 ${borderColor}`}>
        <CardHeader className={`${headerBg} ${headerText}`}>
          <CardTitle className="text-2xl">
            {difficulty === "Easy" ? "🟢" : difficulty === "Moderate" ? "🟡" : "🔴"} {difficulty} Controls
          </CardTitle>
          <p className="text-sm mt-2 opacity-90">
            {controls.length} controls • {controls.filter(c => c.completed).length} completed
          </p>
        </CardHeader>
        <CardContent className="pt-6 space-y-3">
          {controls.map((control) => (
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
                    <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800 font-medium">
                      {control.category}
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
                        <h5 className="font-semibold text-sm text-gray-900 mb-2">Implementation Steps:</h5>
                        <ol className="list-decimal list-inside space-y-1">
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
            <h1 className="text-2xl font-bold text-blue-900">Controls by Difficulty</h1>
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
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Recommended Implementation Order</h2>
          <p className="text-gray-600">
            Start with Easy controls to build momentum and quick wins. Progress to Moderate controls for medium-effort tasks. 
            Finally, tackle Hard controls which require significant planning and resources.
          </p>
        </div>

        <div className="space-y-8">
          {renderDifficultySection("Easy", controlsByDifficulty.Easy)}
          {renderDifficultySection("Moderate", controlsByDifficulty.Moderate)}
          {renderDifficultySection("Hard", controlsByDifficulty.Hard)}
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
