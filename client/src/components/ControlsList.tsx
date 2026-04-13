import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CMMCControl } from "@/lib/cmmc-data";
import { Search, Filter } from "lucide-react";

interface ControlsListProps {
  controls: CMMCControl[];
  onToggle: (id: string) => void;
}

export default function ControlsList({ controls, onToggle }: ControlsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("id");

  const filtered = controls.filter(control => {
    const matchesSearch = 
      control.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      control.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = filterDifficulty === "all" || control.difficulty === filterDifficulty;
    const matchesCategory = filterCategory === "all" || control.category === filterCategory;
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case "difficulty":
        const diffOrder = { Easy: 0, Moderate: 1, Hard: 2 };
        return diffOrder[a.difficulty as keyof typeof diffOrder] - diffOrder[b.difficulty as keyof typeof diffOrder];
      case "category":
        return a.category.localeCompare(b.category);
      case "status":
        return (b.completed ? 1 : 0) - (a.completed ? 1 : 0);
      default:
        return a.id.localeCompare(b.id);
    }
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Moderate":
        return "bg-yellow-100 text-yellow-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
            <Search className="w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search by ID or title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-0 bg-transparent focus-visible:ring-0"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Levels</option>
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="Active Directory">Active Directory</option>
                <option value="Network">Network</option>
                <option value="Physical">Physical</option>
                <option value="Mobile">Mobile</option>
                <option value="Policy">Policy</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="id">ID</option>
                <option value="difficulty">Difficulty</option>
                <option value="category">Category</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Showing {sorted.length} of {controls.length} controls
          </div>
        </CardContent>
      </Card>

      {/* Controls List */}
      <div className="space-y-3">
        {sorted.map((control) => (
          <Card key={control.id} className={control.completed ? "bg-green-50 border-green-200" : ""}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Checkbox
                  checked={control.completed}
                  onCheckedChange={() => onToggle(control.id)}
                  className="mt-1"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className={`font-semibold ${control.completed ? "line-through text-gray-500" : "text-gray-900"}`}>
                        {control.id}
                      </h3>
                      <p className={`text-sm ${control.completed ? "text-gray-500" : "text-gray-700"}`}>
                        {control.title}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(control.difficulty)}`}>
                      {control.difficulty}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 font-medium">
                      {control.category}
                    </span>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-medium">
                      {control.domain}
                    </span>
                    {control.completed && (
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 font-medium">
                        ✓ Completed
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-2">{control.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sorted.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center text-gray-500">
            No controls found matching your filters.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
