import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Plus,
  Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AccessRequest {
  id: string;
  requester: string;
  resource: string;
  justification: string;
  status: "pending" | "approved" | "denied";
  requestDate: Date;
  approver?: string;
  priority: "low" | "medium" | "high";
}

interface UserPermission {
  resource: string;
  access: string;
  granted: Date;
  expires?: Date;
}

export function AccessPortal() {
  const { toast } = useToast();
  const [newRequest, setNewRequest] = useState({
    resource: "",
    justification: "",
    priority: "medium"
  });

  const [mockRequests] = useState<AccessRequest[]>([
    {
      id: "1",
      requester: "John Doe",
      resource: "Production Database",
      justification: "Need access to debug customer issue #12345",
      status: "pending",
      requestDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
      priority: "high"
    },
    {
      id: "2", 
      requester: "Jane Smith",
      resource: "AWS S3 Bucket - Analytics",
      justification: "Required for monthly reporting analysis",
      status: "approved",
      requestDate: new Date(Date.now() - 5 * 60 * 60 * 1000),
      approver: "AI Policy Engine",
      priority: "medium"
    },
    {
      id: "3",
      requester: "Mike Johnson",
      resource: "Admin Panel",
      justification: "Need admin access for user management tasks",
      status: "denied",
      requestDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
      approver: "Security Team",
      priority: "low"
    }
  ]);

  const [userPermissions] = useState<UserPermission[]>([
    {
      resource: "Development Environment",
      access: "Read/Write",
      granted: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    },
    {
      resource: "Code Repository",
      access: "Read/Write",
      granted: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000)
    },
    {
      resource: "Staging Environment",
      access: "Read Only",
      granted: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    }
  ]);

  const handleSubmitRequest = () => {
    if (!newRequest.resource || !newRequest.justification) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Simulate AI-powered auto-approval logic
    const isAutoApproved = Math.random() > 0.5; // 50% auto-approval rate
    
    toast({
      title: isAutoApproved ? "Request Auto-Approved!" : "Request Submitted",
      description: isAutoApproved 
        ? "AI Policy Engine automatically approved your request based on your role and history."
        : "Your request is being reviewed. You'll receive an email notification with the decision.",
      variant: isAutoApproved ? "default" : "default"
    });

    setNewRequest({
      resource: "",
      justification: "",
      priority: "medium"
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-warning" />;
      case "approved":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "denied":
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning">Pending</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-success/10 text-success border-success">Approved</Badge>;
      case "denied":
        return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive">Denied</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive">High</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning">Medium</Badge>;
      case "low":
        return <Badge variant="outline" className="bg-success/10 text-success border-success">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Self-Service Access Portal</h2>
          <p className="text-muted-foreground">Request access, view permissions, and track request status</p>
        </div>
      </div>

      <Tabs defaultValue="request" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-secondary/50">
          <TabsTrigger value="request" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Request
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Request History
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            My Permissions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="request" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-primary" />
                Submit Access Request
              </CardTitle>
              <CardDescription>
                AI-powered approval system processes most requests within minutes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="resource">Resource/System</Label>
                  <Select value={newRequest.resource} onValueChange={(value) => setNewRequest(prev => ({ ...prev, resource: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select resource" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="production-db">Production Database</SelectItem>
                      <SelectItem value="admin-panel">Admin Panel</SelectItem>
                      <SelectItem value="aws-s3">AWS S3 Buckets</SelectItem>
                      <SelectItem value="vpn-access">VPN Access</SelectItem>
                      <SelectItem value="monitoring-tools">Monitoring Tools</SelectItem>
                      <SelectItem value="payment-gateway">Payment Gateway</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select value={newRequest.priority} onValueChange={(value) => setNewRequest(prev => ({ ...prev, priority: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Routine Task</SelectItem>
                      <SelectItem value="medium">Medium - Project Work</SelectItem>
                      <SelectItem value="high">High - Critical Issue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="justification">Business Justification</Label>
                <Textarea
                  id="justification"
                  placeholder="Explain why you need this access, including specific business requirements and duration..."
                  value={newRequest.justification}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, justification: e.target.value }))}
                  className="min-h-24"
                />
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="text-sm text-muted-foreground">
                  <AlertCircle className="h-4 w-4 inline mr-1" />
                  AI will analyze your request against security policies
                </div>
                <Button onClick={handleSubmitRequest} className="bg-gradient-primary">
                  Submit Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Request History
              </CardTitle>
              <CardDescription>Track all your access requests and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRequests.map((request) => (
                  <div key={request.id} className="p-4 rounded-lg border border-border/50 bg-secondary/20">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{request.resource}</h4>
                          {getStatusBadge(request.status)}
                          {getPriorityBadge(request.priority)}
                        </div>
                        <p className="text-sm text-muted-foreground">{request.justification}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Requested: {request.requestDate.toLocaleDateString()}</span>
                          {request.approver && <span>Approver: {request.approver}</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(request.status)}
                        <span className="text-xs text-muted-foreground">{request.requester}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Current Permissions
              </CardTitle>
              <CardDescription>View your active access rights and expiration dates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userPermissions.map((permission, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border/50 bg-secondary/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{permission.resource}</h4>
                        <p className="text-sm text-muted-foreground">Access Level: {permission.access}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <span>Granted: {permission.granted.toLocaleDateString()}</span>
                          {permission.expires && (
                            <span className="text-warning">
                              Expires: {permission.expires.toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-success/10 text-success border-success">
                        Active
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}