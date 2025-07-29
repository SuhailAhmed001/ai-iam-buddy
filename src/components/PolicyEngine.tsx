import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Brain, 
  Search, 
  CheckCircle, 
  AlertTriangle,
  Users,
  Shield,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Policy {
  id: string;
  name: string;
  description: string;
  type: "access" | "security" | "compliance";
  status: "active" | "draft" | "deprecated";
  confidence: number;
  lastUpdated: Date;
}

interface PolicyAnalysis {
  policy: string;
  explanation: string;
  recommendations: string[];
  riskLevel: "low" | "medium" | "high";
  compliance: string[];
}

export function PolicyEngine() {
  const { toast } = useToast();
  const [selectedPolicy, setSelectedPolicy] = useState<string>("");
  const [analysisQuery, setAnalysisQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [policies] = useState<Policy[]>([
    {
      id: "1",
      name: "Database Access Policy",
      description: "Defines access levels for production databases based on role and seniority",
      type: "access",
      status: "active",
      confidence: 96,
      lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: "2",
      name: "Multi-Factor Authentication Policy", 
      description: "Requires MFA for all privileged access and sensitive operations",
      type: "security",
      status: "active",
      confidence: 98,
      lastUpdated: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)
    },
    {
      id: "3",
      name: "GDPR Compliance Policy",
      description: "Data handling and privacy requirements for EU customers",
      type: "compliance",
      status: "active",
      confidence: 94,
      lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: "4",
      name: "Remote Access Policy",
      description: "VPN and remote work access requirements and monitoring",
      type: "access",
      status: "draft",
      confidence: 87,
      lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  ]);

  const [mockAnalysis] = useState<PolicyAnalysis>({
    policy: "Database Access Policy",
    explanation: "This policy implements a role-based access control (RBAC) system for production databases. It automatically grants read-only access to developers and requires manager approval for write access. The policy includes time-based restrictions during maintenance windows and geographic restrictions for sensitive data.",
    recommendations: [
      "Consider implementing just-in-time (JIT) access for write operations",
      "Add automatic access revocation after 90 days of inactivity", 
      "Include break-glass procedures for emergency access",
      "Implement session recording for privileged database access"
    ],
    riskLevel: "low",
    compliance: ["SOC2", "ISO 27001", "PCI DSS"]
  });

  const handleAnalyzePolicy = async () => {
    if (!analysisQuery.trim()) {
      toast({
        title: "Query Required",
        description: "Please enter a policy question or scenario to analyze",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Analysis Complete",
      description: "AI has analyzed the policy against your query. Check the results below.",
    });
    
    setIsAnalyzing(false);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "access":
        return "bg-primary/10 text-primary border-primary";
      case "security":
        return "bg-destructive/10 text-destructive border-destructive";
      case "compliance":
        return "bg-success/10 text-success border-success";
      default:
        return "bg-muted/10 text-muted-foreground border-muted";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-success/10 text-success border-success";
      case "draft":
        return "bg-warning/10 text-warning border-warning";
      case "deprecated":
        return "bg-destructive/10 text-destructive border-destructive";
      default:
        return "bg-muted/10 text-muted-foreground border-muted";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-success";
      case "medium":
        return "text-warning";
      case "high":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">GenAI Policy Engine</h2>
          <p className="text-muted-foreground">AI-powered policy interpretation and compliance analysis</p>
        </div>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary animate-pulse-glow">
          <Brain className="h-3 w-3 mr-1" />
          AI Powered
        </Badge>
      </div>

      <Tabs defaultValue="analyze" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-secondary/50">
          <TabsTrigger value="analyze" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Analysis
          </TabsTrigger>
          <TabsTrigger value="policies" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Policy Library
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Insights
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analyze" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Query Interface */}
            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  Policy Query
                </CardTitle>
                <CardDescription>
                  Ask natural language questions about policies and access rules
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="query">Enter your question or scenario</Label>
                  <Textarea
                    id="query"
                    placeholder="e.g., 'Can a junior developer access production database on weekends?' or 'What are the MFA requirements for admin access?'"
                    value={analysisQuery}
                    onChange={(e) => setAnalysisQuery(e.target.value)}
                    className="min-h-24"
                  />
                </div>
                
                <Button 
                  onClick={handleAnalyzePolicy}
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-primary"
                >
                  {isAnalyzing ? (
                    <>
                      <Brain className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="mr-2 h-4 w-4" />
                      Analyze with AI
                    </>
                  )}
                </Button>

                <div className="pt-4 space-y-2">
                  <h4 className="text-sm font-medium">Quick Examples:</h4>
                  <div className="space-y-1">
                    {[
                      "Database access for contractors",
                      "Emergency access procedures", 
                      "Compliance with SOC2 requirements"
                    ].map((example, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className="justify-start w-full text-xs"
                        onClick={() => setAnalysisQuery(example)}
                      >
                        {example}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Analysis Results */}
            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI Analysis Results
                </CardTitle>
                <CardDescription>
                  Intelligent policy interpretation and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Policy: {mockAnalysis.policy}</h4>
                    <p className="text-sm text-muted-foreground">{mockAnalysis.explanation}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      Risk Assessment 
                      <Badge variant="outline" className={getRiskColor(mockAnalysis.riskLevel)}>
                        {mockAnalysis.riskLevel.toUpperCase()}
                      </Badge>
                    </h4>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Compliance Standards</h4>
                    <div className="flex flex-wrap gap-2">
                      {mockAnalysis.compliance.map((standard, index) => (
                        <Badge key={index} variant="outline" className="bg-success/10 text-success border-success">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {standard}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">AI Recommendations</h4>
                    <div className="space-y-2">
                      {mockAnalysis.recommendations.map((rec, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <Zap className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="policies" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Policy Library
              </CardTitle>
              <CardDescription>All organizational policies with AI confidence scores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {policies.map((policy) => (
                  <div key={policy.id} className="p-4 rounded-lg border border-border/50 bg-secondary/20">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{policy.name}</h4>
                          <Badge variant="outline" className={getTypeColor(policy.type)}>
                            {policy.type}
                          </Badge>
                          <Badge variant="outline" className={getStatusColor(policy.status)}>
                            {policy.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{policy.description}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">AI Confidence:</span>
                            <Progress value={policy.confidence} className="w-20 h-2" />
                            <span className="text-xs font-medium">{policy.confidence}%</span>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            Updated: {policy.lastUpdated.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
              <CardHeader>
                <CardTitle className="text-lg">Policy Coverage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Access Policies</span>
                    <span className="text-sm font-medium">12/15</span>
                  </div>
                  <Progress value={80} className="h-2" />
                  <p className="text-xs text-muted-foreground">3 policies need review</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
              <CardHeader>
                <CardTitle className="text-lg">Compliance Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-2xl font-bold text-success">96%</div>
                  <Progress value={96} className="h-2" />
                  <p className="text-xs text-muted-foreground">Above industry average</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
              <CardHeader>
                <CardTitle className="text-lg">AI Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-2xl font-bold text-primary">94.7%</div>
                  <Progress value={94.7} className="h-2" />
                  <p className="text-xs text-muted-foreground">Policy interpretation accuracy</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Policy Recommendations
              </CardTitle>
              <CardDescription>AI-generated suggestions for policy improvements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                    <div>
                      <h4 className="font-medium">Update Remote Access Policy</h4>
                      <p className="text-sm text-muted-foreground">
                        Consider adding location-based restrictions for sensitive data access
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-start gap-2">
                    <Brain className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium">Implement Zero Trust Principles</h4>
                      <p className="text-sm text-muted-foreground">
                        AI detected opportunities to strengthen access controls with zero trust architecture
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}