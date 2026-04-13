import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Menu, X, BookOpen, TrendingUp, CheckCircle2 } from "lucide-react";
import { CMMC_CONTROLS, CMMC_DOMAINS, CMMCControl } from "@/lib/cmmc-data";
import ControlsList from "@/components/ControlsList";
import TableOfContents from "@/components/TableOfContents";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [controls, setControls] = useState<CMMCControl[]>(CMMC_CONTROLS);
  const [activeTab, setActiveTab] = useState("overview");
  const [username, setUsername] = useState("");

  // Load data from localStorage on mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const savedUsername = localStorage.getItem("username");
    const savedControls = localStorage.getItem("cmmcControls");

    if (!isLoggedIn) {
      setLocation("/");
    } else {
      setUsername(savedUsername || "Admin");
      if (savedControls) {
        try {
          setControls(JSON.parse(savedControls));
        } catch (e) {
          console.error("Error loading saved controls:", e);
        }
      }
    }
  }, [setLocation]);

  // Save controls to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cmmcControls", JSON.stringify(controls));
  }, [controls]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    setLocation("/");
  };

  const toggleControl = (id: string) => {
    setControls(controls.map(c => 
      c.id === id ? { ...c, completed: !c.completed } : c
    ));
  };

  const completedCount = controls.filter(c => c.completed).length;
  const completionPercentage = (completedCount / controls.length) * 100;

  const controlsByDomain = Object.keys(CMMC_DOMAINS).reduce((acc, domain) => {
    acc[domain] = controls.filter(c => c.domain === domain);
    return acc;
  }, {} as Record<string, CMMCControl[]>);

  const controlsByDifficulty = {
    Easy: controls.filter(c => c.difficulty === "Easy"),
    Moderate: controls.filter(c => c.difficulty === "Moderate"),
    Hard: controls.filter(c => c.difficulty === "Hard")
  };

  const controlsByCategory = {
    "Active Directory": controls.filter(c => c.category === "Active Directory"),
    "Network": controls.filter(c => c.category === "Network"),
    "Physical": controls.filter(c => c.category === "Physical"),
    "Mobile": controls.filter(c => c.category === "Mobile"),
    "Policy": controls.filter(c => c.category === "Policy")
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-2xl font-bold text-blue-900">CMMC Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, <strong>{username}</strong></span>
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
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden lg:block max-h-[calc(100vh-80px)] overflow-y-auto">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === "overview"
                    ? "bg-blue-100 text-blue-900"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <TrendingUp className="w-4 h-4 inline mr-2" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab("checklist")}
                className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === "checklist"
                    ? "bg-blue-100 text-blue-900"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <CheckCircle2 className="w-4 h-4 inline mr-2" />
                All Controls
              </button>
              <button
                onClick={() => setActiveTab("toc")}
                className={`w-full text-left px-4 py-2 rounded-lg font-medium transition ${
                  activeTab === "toc"
                    ? "bg-blue-100 text-blue-900"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <BookOpen className="w-4 h-4 inline mr-2" />
                Table of Contents
              </button>
              <hr className="my-4" />
              <p className="text-xs font-semibold text-gray-600 mb-2">Advanced Views</p>
              <button
                onClick={() => setLocation("/difficulty")}
                className="w-full text-left px-4 py-2 rounded-lg font-medium transition text-gray-700 hover:bg-gray-100"
              >
                <TrendingUp className="w-4 h-4 inline mr-2" />
                By Difficulty
              </button>
              <button
                onClick={() => setLocation("/category")}
                className="w-full text-left px-4 py-2 rounded-lg font-medium transition text-gray-700 hover:bg-gray-100"
              >
                <BookOpen className="w-4 h-4 inline mr-2" />
                By Category
              </button>
              <button
                onClick={() => setLocation("/implementation")}
                className="w-full text-left px-4 py-2 rounded-lg font-medium transition text-gray-700 hover:bg-gray-100"
              >
                <CheckCircle2 className="w-4 h-4 inline mr-2" />
                Implementation Guide
              </button>
            </nav>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Completion</p>
                  <Progress value={completionPercentage} className="h-2" />
                  <p className="text-xs font-semibold text-gray-700 mt-1">
                    {completedCount} / {controls.length}
                  </p>
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="checklist">All Controls</TabsTrigger>
              <TabsTrigger value="toc">Table of Contents</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Overall Progress</CardTitle>
                  <CardDescription>Track your CMMC Level 2 compliance journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Completion Status</span>
                      <span className="text-sm font-bold text-blue-600">{completionPercentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={completionPercentage} className="h-3" />
                    <p className="text-xs text-gray-500 mt-2">
                      {completedCount} of {controls.length} controls completed
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Easy Controls</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-green-600">
                      {controlsByDifficulty.Easy.filter(c => c.completed).length}/{controlsByDifficulty.Easy.length}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Quick wins</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Moderate Controls</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-yellow-600">
                      {controlsByDifficulty.Moderate.filter(c => c.completed).length}/{controlsByDifficulty.Moderate.length}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Medium effort</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Hard Controls</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-red-600">
                      {controlsByDifficulty.Hard.filter(c => c.completed).length}/{controlsByDifficulty.Hard.length}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Complex tasks</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>By Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(controlsByCategory).map(([category, cats]) => (
                      <div key={category} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-gray-700">{category}</p>
                        <p className="text-sm text-gray-600">
                          {cats.filter(c => c.completed).length}/{cats.length} completed
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Checklist Tab */}
            <TabsContent value="checklist">
              <ControlsList controls={controls} onToggle={toggleControl} />
            </TabsContent>

            {/* Table of Contents Tab */}
            <TabsContent value="toc">
              <TableOfContents domains={controlsByDomain} />
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-6 text-center text-sm text-gray-600">
        <p>Created by <strong>Muhammad Bilal</strong></p>
        <p className="mt-1 text-xs text-gray-500">CMMC Level 2 Compliance Dashboard v1.0</p>
      </footer>
    </div>
  );
}
