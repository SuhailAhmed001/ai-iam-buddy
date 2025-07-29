import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Shield, 
  FileText, 
  Download, 
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Activity,
  Users,
  Lock,
  Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuditEvent {
  id: string;
  timestamp: Date;
  user: string;
  action: string;
  resource: string;
  result: "success" | "failure" | "warning";
  ip: string;
  userAgent: string;
  riskScore: number;
}

interface ComplianceMetric {
  name: string;
  current: number;
  target: number;
  trend: "up" | "down" | "stable";
  status: "compliant" | "warning" | "critical";
}

export function AuditDashboard() {
  const { toast } = useToast();
  const [selectedTimeframe, setSelectedTimeframe] = useState("7d");
  const [selectedCompliance, setSelectedCompliance] = useState("soc2");

  const [auditEvents] = useState<AuditEvent[]>([
    {
      id: "1",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      user: "john.doe@company.com",
      action: "Database Access Granted",
      resource: "Production DB",
      result: "success",
      ip: "192.168.1.100",
      userAgent: "Mozilla/5.0 (Chrome)",
      riskScore: 2
    },
    {
      id: "2", 
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      user: "jane.smith@company.com",
      action: "Failed Login Attempt",
      resource: "Admin Panel",
      result: "failure",
      ip: "203.0.113.1",
      userAgent: "Mozilla/5.0 (Firefox)",
      riskScore: 8
    },
    {
      id: "3",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      user: "mike.johnson@company.com",
      action: "Permission Modified",
      resource: "AWS S3 Bucket",
      result: "success",
      ip: "192.168.1.105",
      userAgent: "AWS CLI",
      riskScore: 4
    },
    {
      id: "4",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      user: "ai-policy-engine",
      action: "Automated Role Assignment",
      resource: "Development Environment",
      result: "success",
      ip: "10.0.0.1",
      userAgent: "AI-IAM-System",
      riskScore: 1
    }
  ]);

  const [complianceMetrics] = useState<ComplianceMetric[]>([
    {
      name: "Access Reviews Completed",
      current: 94,
      target: 95,
      trend: "up",
      status: "warning"
    },
    {
      name: "Privileged Account Monitoring",
      current: 100,
      target: 100,
      trend: "stable",
      status: "compliant"
    },
    {
      name: "Password Policy Compliance",
      current: 98,
      target: 100,
      trend: "up",
      status: "compliant"
    },
    {
      name: "MFA Adoption Rate",
      current: 87,
      target: 90,
      trend: "up",
      status: "warning"
    },
    {
      name: "Inactive Account Cleanup",
      current: 92,
      target: 95,
      trend: "down",
      status: "warning"
    }
  ]);

  const generateReport = (type: string) => {
    toast({
      title: "Report Generated",
      description: `${type} compliance report has been generated and will be downloaded shortly.`,
    });
    
    // Simulate report generation
    setTimeout(() => {
      const element = document.createElement("a");
      const file = new Blob([`${type} Compliance Report - Generated on ${new Date().toISOString()}`], 
        {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `${type.toLowerCase()}-compliance-report-${Date.now()}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1000);
  };

  const getResultIcon = (result: string) => {
    switch (result) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "failure":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getResultBadge = (result: string) => {
    switch (result) {
      case "success":
        return <Badge variant="outline" className="bg-success/10 text-success border-success">Success</Badge>;
      case "failure":
        return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive">Failed</Badge>;
      case "warning":
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning">Warning</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getRiskBadge = (score: number) => {
    if (score <= 3) {
      return <Badge variant="outline" className="bg-success/10 text-success border-success">Low</Badge>;
    } else if (score <= 6) {
      return <Badge variant="outline" className="bg-warning/10 text-warning border-warning">Medium</Badge>;
    } else {
      return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive">High</Badge>;
    }
  };

  const getComplianceStatus = (metric: ComplianceMetric) => {
    switch (metric.status) {
      case "compliant":
        return "bg-success/10 text-success border-success";
      case "warning":
        return "bg-warning/10 text-warning border-warning";
      case "critical":
        return "bg-destructive/10 text-destructive border-destructive";
      default:
        return "bg-muted/10 text-muted-foreground border-muted";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      case "stable":
        return <Activity className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Audit Dashboard & Compliance</h2>
          <p className="text-muted-foreground">SOC2, ISO 27001, and GDPR ready documentation</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-secondary/50">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="events" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Audit Trail
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Compliance
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,847</div>
                <p className="text-xs text-success">+12% from last week</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
                <AlertTriangle className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">7</div>
                <p className="text-xs text-muted-foreground">Requires attention</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
                <CheckCircle className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">96%</div>
                <p className="text-xs text-success">Above target</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Decisions</CardTitle>
                <Lock className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">1,247</div>
                <p className="text-xs text-muted-foreground">Automated today</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Audit Summary
              </CardTitle>
              <CardDescription>Key metrics and trends for audit readiness</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium">Risk Distribution</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Low Risk</span>
                      <span className="text-success">78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span>Medium Risk</span>
                      <span className="text-warning">18%</span>
                    </div>
                    <Progress value={18} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span>High Risk</span>
                      <span className="text-destructive">4%</span>
                    </div>
                    <Progress value={4} className="h-2" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Access Patterns</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Normal Access</span>
                      <span className="text-success">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span>Privileged Access</span>
                      <span className="text-warning">6%</span>
                    </div>
                    <Progress value={6} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span>Emergency Access</span>
                      <span className="text-destructive">2%</span>
                    </div>
                    <Progress value={2} className="h-2" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Automation Rate</h4>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">85%</div>
                    <p className="text-sm text-muted-foreground">of decisions automated</p>
                    <p className="text-xs text-success mt-2">↑ 12% improvement</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Audit Trail
              </CardTitle>
              <CardDescription>Complete log of all access decisions and security events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditEvents.map((event) => (
                  <div key={event.id} className="p-4 rounded-lg border border-border/50 bg-secondary/20">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          {getResultIcon(event.result)}
                          <h4 className="font-medium">{event.action}</h4>
                          {getResultBadge(event.result)}
                          {getRiskBadge(event.riskScore)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <p>User: {event.user}</p>
                          <p>Resource: {event.resource}</p>
                          <p>IP: {event.ip}</p>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {event.timestamp.toLocaleString()}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="flex items-center gap-4">
            <Select value={selectedCompliance} onValueChange={setSelectedCompliance}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="soc2">SOC 2 Type II</SelectItem>
                <SelectItem value="iso27001">ISO 27001</SelectItem>
                <SelectItem value="gdpr">GDPR</SelectItem>
                <SelectItem value="pci">PCI DSS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Compliance Metrics
              </CardTitle>
              <CardDescription>Real-time compliance monitoring and scoring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceMetrics.map((metric, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border/50 bg-secondary/20">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{metric.name}</h4>
                          <Badge variant="outline" className={getComplianceStatus(metric)}>
                            {metric.status}
                          </Badge>
                          {getTrendIcon(metric.trend)}
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Current: {metric.current}%</span>
                              <span>Target: {metric.target}%</span>
                            </div>
                            <Progress value={metric.current} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  SOC 2 Report
                </CardTitle>
                <CardDescription>Security, availability, and confidentiality controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-2xl font-bold text-success">96%</div>
                <p className="text-sm text-muted-foreground">Compliance score</p>
                <Button 
                  onClick={() => generateReport("SOC2")} 
                  className="w-full"
                  variant="outline"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  ISO 27001 Report
                </CardTitle>
                <CardDescription>Information security management system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-2xl font-bold text-success">94%</div>
                <p className="text-sm text-muted-foreground">Compliance score</p>
                <Button 
                  onClick={() => generateReport("ISO27001")} 
                  className="w-full"
                  variant="outline"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  GDPR Report
                </CardTitle>
                <CardDescription>Data protection and privacy compliance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-2xl font-bold text-success">98%</div>
                <p className="text-sm text-muted-foreground">Compliance score</p>
                <Button 
                  onClick={() => generateReport("GDPR")} 
                  className="w-full"
                  variant="outline"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Scheduled Reports
              </CardTitle>
              <CardDescription>Automated compliance reporting schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                  <div>
                    <h4 className="font-medium">Weekly Security Summary</h4>
                    <p className="text-sm text-muted-foreground">Next: Every Monday at 9:00 AM</p>
                  </div>
                  <Badge variant="outline" className="bg-success/10 text-success border-success">Active</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                  <div>
                    <h4 className="font-medium">Monthly Compliance Report</h4>
                    <p className="text-sm text-muted-foreground">Next: First Monday of each month</p>
                  </div>
                  <Badge variant="outline" className="bg-success/10 text-success border-success">Active</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                  <div>
                    <h4 className="font-medium">Quarterly Audit Preparation</h4>
                    <p className="text-sm text-muted-foreground">Next: End of quarter</p>
                  </div>
                  <Badge variant="outline" className="bg-success/10 text-success border-success">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}