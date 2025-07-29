import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  Brain, 
  Zap, 
  CheckCircle,
  Clock,
  TrendingUp,
  User,
  Briefcase,
  Shield
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  role: string;
  startDate: Date;
  status: "pending" | "provisioned" | "reviewing";
  aiConfidence: number;
  recommendedRoles: string[];
}

interface RoleTemplate {
  id: string;
  name: string;
  department: string;
  permissions: string[];
  usage: number;
  aiOptimized: boolean;
}

interface AnalysisMetric {
  name: string;
  value: number;
  trend: "up" | "down" | "stable";
  description: string;
}

export function RoleAssignment() {
  const { toast } = useToast();
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [newEmployeeData, setNewEmployeeData] = useState({
    name: "",
    email: "",
    department: "",
    role: ""
  });

  const [employees] = useState<Employee[]>([
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice.johnson@company.com",
      department: "Engineering",
      role: "Senior Software Engineer",
      startDate: new Date(),
      status: "pending",
      aiConfidence: 96,
      recommendedRoles: ["Senior Developer", "Tech Lead", "DevOps Engineer"]
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob.smith@company.com", 
      department: "Marketing",
      role: "Marketing Specialist",
      startDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: "provisioned",
      aiConfidence: 89,
      recommendedRoles: ["Marketing Coordinator", "Content Creator"]
    },
    {
      id: "3",
      name: "Carol Williams",
      email: "carol.williams@company.com",
      department: "Finance",
      role: "Financial Analyst",
      startDate: new Date(Date.now() - 48 * 60 * 60 * 1000),
      status: "reviewing",
      aiConfidence: 92,
      recommendedRoles: ["Senior Analyst", "Budget Manager"]
    }
  ]);

  const [roleTemplates] = useState<RoleTemplate[]>([
    {
      id: "1",
      name: "Software Engineer",
      department: "Engineering",
      permissions: ["Code Repository", "Development Environment", "CI/CD Pipeline", "Staging Environment"],
      usage: 45,
      aiOptimized: true
    },
    {
      id: "2",
      name: "Marketing Coordinator", 
      department: "Marketing",
      permissions: ["CRM System", "Analytics Dashboard", "Social Media Tools", "Content Management"],
      usage: 23,
      aiOptimized: true
    },
    {
      id: "3",
      name: "Financial Analyst",
      department: "Finance", 
      permissions: ["Financial System", "Reporting Tools", "Budget Access", "Audit Logs"],
      usage: 18,
      aiOptimized: false
    }
  ]);

  const [analysisMetrics] = useState<AnalysisMetric[]>([
    {
      name: "Automation Rate",
      value: 85,
      trend: "up",
      description: "Percentage of roles assigned automatically"
    },
    {
      name: "Accuracy Score", 
      value: 94,
      trend: "stable",
      description: "AI role recommendation accuracy"
    },
    {
      name: "Time Saved",
      value: 73,
      trend: "up", 
      description: "Reduction in manual provisioning time"
    }
  ]);

  const handleAutoProvision = (employeeId: string) => {
    const employee = employees.find(e => e.id === employeeId);
    if (employee) {
      toast({
        title: "Auto-Provisioning Started",
        description: `AI is analyzing ${employee.name}'s role and provisioning appropriate access. This typically takes 2-3 minutes.`,
      });
      
      // Simulate provisioning process
      setTimeout(() => {
        toast({
          title: "Provisioning Complete",
          description: `${employee.name} has been granted access to ${employee.recommendedRoles[0]} permissions with ${employee.aiConfidence}% confidence.`,
        });
      }, 3000);
    }
  };

  const handleBulkProvision = () => {
    const pendingEmployees = employees.filter(e => e.status === "pending");
    toast({
      title: "Bulk Provisioning Started",
      description: `Processing ${pendingEmployees.length} pending employees. Estimated completion: 5 minutes.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-warning/10 text-warning border-warning";
      case "provisioned":
        return "bg-success/10 text-success border-success";
      case "reviewing":
        return "bg-primary/10 text-primary border-primary";
      default:
        return "bg-muted/10 text-muted-foreground border-muted";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "provisioned":
        return <CheckCircle className="h-4 w-4" />;
      case "reviewing":
        return <Brain className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-success" />;
      case "down":
        return <TrendingUp className="h-4 w-4 text-destructive rotate-180" />;
      case "stable":
        return <TrendingUp className="h-4 w-4 text-muted-foreground rotate-90" />;
      default:
        return <TrendingUp className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Automated Role Assignment
        </CardTitle>
        <CardDescription>
          AI-powered role provisioning using 50+ data points analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {analysisMetrics.map((metric, index) => (
            <div key={index} className="p-4 rounded-lg bg-secondary/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">{metric.name}</h4>
                {getTrendIcon(metric.trend)}
              </div>
              <div className="text-2xl font-bold text-primary">{metric.value}%</div>
              <p className="text-xs text-muted-foreground">{metric.description}</p>
            </div>
          ))}
        </div>

        {/* Pending Employees */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Pending Role Assignments</h4>
            <Button onClick={handleBulkProvision} size="sm" variant="outline">
              <Zap className="h-4 w-4 mr-2" />
              Bulk Provision
            </Button>
          </div>
          
          <div className="space-y-3">
            {employees.map((employee) => (
              <div key={employee.id} className="p-4 rounded-lg border border-border/50 bg-secondary/20">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium">{employee.name}</h5>
                      <Badge variant="outline" className={getStatusColor(employee.status)}>
                        {getStatusIcon(employee.status)}
                        <span className="ml-1">{employee.status}</span>
                      </Badge>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <p>{employee.email}</p>
                      <p>{employee.department} • {employee.role}</p>
                      <p>Start Date: {employee.startDate.toLocaleDateString()}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium">AI Confidence:</span>
                        <Progress value={employee.aiConfidence} className="w-20 h-2" />
                        <span className="text-xs">{employee.aiConfidence}%</span>
                      </div>
                      
                      <div>
                        <span className="text-xs font-medium">Recommended Roles:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {employee.recommendedRoles.map((role, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {role}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    {employee.status === "pending" && (
                      <Button 
                        onClick={() => handleAutoProvision(employee.id)}
                        size="sm"
                        className="bg-gradient-primary"
                      >
                        <Brain className="h-4 w-4 mr-2" />
                        Auto-Provision
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <User className="h-4 w-4 mr-2" />
                      Review
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Role Templates */}
        <div className="space-y-3">
          <h4 className="font-medium">AI-Optimized Role Templates</h4>
          <div className="space-y-3">
            {roleTemplates.map((template) => (
              <div key={template.id} className="p-4 rounded-lg border border-border/50 bg-secondary/20">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <h5 className="font-medium">{template.name}</h5>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
                        {template.department}
                      </Badge>
                      {template.aiOptimized && (
                        <Badge variant="outline" className="bg-accent/10 text-accent border-accent">
                          <Brain className="h-3 w-3 mr-1" />
                          AI Optimized
                        </Badge>
                      )}
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <p>Used by {template.usage} employees</p>
                    </div>

                    <div>
                      <span className="text-xs font-medium">Permissions:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {template.permissions.map((permission, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Edit Template
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Add Employee */}
        <div className="space-y-3">
          <h4 className="font-medium">Quick Add New Employee</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter employee name"
                value={newEmployeeData.name}
                onChange={(e) => setNewEmployeeData(prev => ({...prev, name: e.target.value}))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="employee@company.com"
                value={newEmployeeData.email}
                onChange={(e) => setNewEmployeeData(prev => ({...prev, email: e.target.value}))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select value={newEmployeeData.department} onValueChange={(value) => setNewEmployeeData(prev => ({...prev, department: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Job Title</Label>
              <Input
                id="role"
                placeholder="e.g. Software Engineer"
                value={newEmployeeData.role}
                onChange={(e) => setNewEmployeeData(prev => ({...prev, role: e.target.value}))}
              />
            </div>
          </div>
          
          <Button className="w-full bg-gradient-primary">
            <Brain className="h-4 w-4 mr-2" />
            Add Employee & Auto-Assign Role
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}