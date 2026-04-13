import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Shield } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate login delay
    setTimeout(() => {
      if (username === "admin" && password === "admin") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
        setLocation("/dashboard");
      } else {
        setError("Invalid username or password. Use admin/admin");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-10 h-10 text-blue-700" />
            <h1 className="text-3xl font-bold text-blue-900">CMMC Dashboard</h1>
          </div>
          <p className="text-gray-600">Cybersecurity Maturity Model Certification Compliance Tracker</p>
        </div>

        {/* Login Card */}
        <Card className="border-0 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Login
            </CardTitle>
            <CardDescription className="text-blue-100">
              Enter your credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <Input
                  type="text"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  className="w-full"
                />
              </div>

              <Button
                type="submit"
                disabled={loading || !username || !password}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2"
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>


          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <p>Created by <strong>Muhammad Bilal</strong></p>
          <p className="mt-2 text-xs text-gray-500">CMMC Level 2 Compliance Tracker v1.0</p>
        </div>
      </div>
    </div>
  );
}
