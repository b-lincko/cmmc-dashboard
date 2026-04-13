import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CMMCControl, CMMC_DOMAINS } from "@/lib/cmmc-data";
import { BookOpen } from "lucide-react";

interface TableOfContentsProps {
  domains: Record<string, CMMCControl[]>;
}

export default function TableOfContents({ domains }: TableOfContentsProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            CMMC Level 2 Controls - Table of Contents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-6">
            Complete list of 110 CMMC Level 2 controls organized by domain. Each domain contains multiple controls that must be implemented for compliance.
          </p>

          <div className="space-y-6">
            {Object.entries(domains).map(([domainKey, controls]) => (
              <div key={domainKey} className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {domainKey}. {CMMC_DOMAINS[domainKey as keyof typeof CMMC_DOMAINS]}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {controls.length} control{controls.length !== 1 ? 's' : ''} in this domain
                </p>
                
                <div className="space-y-2">
                  {controls.map((control) => (
                    <div
                      key={control.id}
                      className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm">{control.id}</p>
                          <p className="text-sm text-gray-700 mt-1">{control.title}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className={`text-xs px-2 py-1 rounded font-medium ${
                              control.difficulty === "Easy" ? "bg-green-100 text-green-800" :
                              control.difficulty === "Moderate" ? "bg-yellow-100 text-yellow-800" :
                              "bg-red-100 text-red-800"
                            }`}>
                              {control.difficulty}
                            </span>
                            <span className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800 font-medium">
                              {control.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Summary Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-600">Total Domains</p>
              <p className="text-2xl font-bold text-blue-900">{Object.keys(domains).length}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm text-gray-600">Total Controls</p>
              <p className="text-2xl font-bold text-purple-900">
                {Object.values(domains).reduce((sum, controls) => sum + controls.length, 0)}
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <h4 className="font-semibold text-amber-900 mb-2">Implementation Approach</h4>
            <p className="text-sm text-amber-800">
              We recommend starting with "Easy" difficulty controls to build momentum, then progressing to "Moderate" and "Hard" controls. 
              Group controls by category (Active Directory, Network, Physical, Mobile, Policy) for efficient implementation.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
