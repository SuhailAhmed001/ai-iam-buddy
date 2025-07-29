import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatbotInterface } from "./ChatbotInterface";
import { AccessPortal } from "./AccessPortal";
import { PolicyEngine } from "./PolicyEngine";
import { AuditDashboard } from "./AuditDashboard";
import { ContextualAuth } from "./ContextualAuth";
import { RoleAssignment } from "./RoleAssignment";
import { 
  Shield, 
  Bot, 
  Users, 
  FileText, 
  Activity, 
  Lock,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp
} from "lucide-react";

export function Dashboard() {
  const [activeModule, setActiveModule] = useState("overview");

  const systemStats = {
    totalUsers: 1247,
    activeRequests: 23,
    securityAlerts: 3,
    complianceScore: 96,
    automatedDecisions: 847,
    riskReductions: 73
  };

  const recentActivities = [
    { id: 1, type: "success", message: "Auto-approved access request for John Doe", time: "2 minutes ago" },
    { id: 2, type: "warning", message: "Unusual login from Singapore detected", time: "5 minutes ago" },
    { id: 3, type: "info", message: "Weekly compliance scan completed", time: "1 hour ago" },
    { id: 4, type: "success", message: "Role assignment for 3 new employees", time: "3 hours ago" }
  ];

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              AI-Powered IAM
            </h1>
            <p className="text-muted-foreground mt-2">
              Intelligent Identity & Access Management System
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="bg-success/10 text-success border-success">
              System Healthy
            </Badge>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary animate-pulse-glow">
              AI Active
            </Badge>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-success">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStats.activeRequests}</div>
              <p className="text-xs text-muted-foreground">Processing automatically</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{systemStats.securityAlerts}</div>
              <p className="text-xs text-muted-foreground">Requires attention</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{systemStats.complianceScore}%</div>
              <p className="text-xs text-success">Excellent compliance</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Decisions Today</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{systemStats.automatedDecisions}</div>
              <p className="text-xs text-muted-foreground">85% automation rate</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk Reduction</CardTitle>
              <Shield className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{systemStats.riskReductions}%</div>
              <p className="text-xs text-muted-foreground">vs. traditional IAM</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeModule} onValueChange={setActiveModule} className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 bg-secondary/50">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="chatbot" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <span className="hidden sm:inline">AI Assistant</span>
            </TabsTrigger>
            <TabsTrigger value="portal" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Access Portal</span>
            </TabsTrigger>
            <TabsTrigger value="policies" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Policies</span>
            </TabsTrigger>
            <TabsTrigger value="auth" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span className="hidden sm:inline">Auth</span>
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Audit</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>Latest system events and decisions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/20">
                      {activity.type === "success" && <CheckCircle className="h-4 w-4 text-success mt-1" />}
                      {activity.type === "warning" && <AlertTriangle className="h-4 w-4 text-warning mt-1" />}
                      {activity.type === "info" && <Activity className="h-4 w-4 text-primary mt-1" />}
                      <div className="flex-1">
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start bg-primary/5 border-primary/20 hover:bg-primary/10"
                    onClick={() => setActiveModule("chatbot")}
                  >
                    <Bot className="mr-2 h-4 w-4" />
                    Ask AI Assistant
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start bg-accent/5 border-accent/20 hover:bg-accent/10"
                    onClick={() => setActiveModule("portal")}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Review Access Requests
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start bg-warning/5 border-warning/20 hover:bg-warning/10"
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Run Security Scan
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start bg-success/5 border-success/20 hover:bg-success/10"
                    onClick={() => setActiveModule("audit")}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Compliance Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="chatbot" className="mt-6">
            <ChatbotInterface />
          </TabsContent>

          <TabsContent value="portal" className="mt-6">
            <AccessPortal />
          </TabsContent>

          <TabsContent value="policies" className="mt-6">
            <PolicyEngine />
          </TabsContent>

          <TabsContent value="auth" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ContextualAuth />
              <RoleAssignment />
            </div>
          </TabsContent>

          <TabsContent value="audit" className="mt-6">
            <AuditDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}