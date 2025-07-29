import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Shield, 
  MapPin, 
  Smartphone, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Settings,
  Brain
} from "lucide-react";

interface SecurityContext {
  location: {
    country: string;
    city: string;
    trusted: boolean;
  };
  device: {
    type: string;
    trusted: boolean;
    lastSeen: Date;
  };
  behavior: {
    riskScore: number;
    patterns: string[];
    anomalies: string[];
  };
  authentication: {
    method: string;
    required: string[];
    recommended: string[];
  };
}

interface RiskFactor {
  name: string;
  level: "low" | "medium" | "high";
  description: string;
  weight: number;
}

export function ContextualAuth() {
  const [contextData] = useState<SecurityContext>({
    location: {
      country: "United States",
      city: "San Francisco, CA",
      trusted: true
    },
    device: {
      type: "MacBook Pro",
      trusted: true,
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    behavior: {
      riskScore: 2.4,
      patterns: ["Regular working hours", "Consistent IP range", "Normal application usage"],
      anomalies: []
    },
    authentication: {
      method: "Password + MFA",
      required: ["Password", "MFA"],
      recommended: ["Biometric", "Hardware Key"]
    }
  });

  const [riskFactors] = useState<RiskFactor[]>([
    {
      name: "Unknown Device",
      level: "low",
      description: "Device registered 6 months ago",
      weight: 0.5
    },
    {
      name: "Trusted Location",
      level: "low", 
      description: "Office network in San Francisco",
      weight: 0.2
    },
    {
      name: "Normal Behavior",
      level: "low",
      description: "Activity matches user patterns",
      weight: 0.3
    },
    {
      name: "Recent Login",
      level: "low",
      description: "Last successful login 2 hours ago",
      weight: 0.1
    }
  ]);

  const [authSettings, setAuthSettings] = useState({
    adaptiveAuth: true,
    locationBased: true,
    deviceTrust: true,
    behaviorAnalysis: true,
    riskBasedMFA: true
  });

  const getTotalRiskScore = () => {
    return riskFactors.reduce((total, factor) => {
      const multiplier = factor.level === "high" ? 3 : factor.level === "medium" ? 2 : 1;
      return total + (factor.weight * multiplier);
    }, 0);
  };

  const getRiskLevel = (score: number) => {
    if (score <= 1) return { level: "low", color: "text-success", bg: "bg-success/10", border: "border-success" };
    if (score <= 3) return { level: "medium", color: "text-warning", bg: "bg-warning/10", border: "border-warning" };
    return { level: "high", color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive" };
  };

  const getRiskFactorColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-success/10 text-success border-success";
      case "medium":
        return "bg-warning/10 text-warning border-warning";
      case "high":
        return "bg-destructive/10 text-destructive border-destructive";
      default:
        return "bg-muted/10 text-muted-foreground border-muted";
    }
  };

  const totalRisk = getTotalRiskScore();
  const riskInfo = getRiskLevel(totalRisk);

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          Contextual Authentication
        </CardTitle>
        <CardDescription>
          AI-driven risk assessment and adaptive authentication
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Risk Assessment */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Current Risk Level</h4>
            <Badge variant="outline" className={`${riskInfo.bg} ${riskInfo.color} ${riskInfo.border}`}>
              {riskInfo.level.toUpperCase()} RISK
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Risk Score: {totalRisk.toFixed(1)}/10</span>
              <span className={riskInfo.color}>
                {riskInfo.level === "low" && "Authentication simplified"}
                {riskInfo.level === "medium" && "Standard authentication"}
                {riskInfo.level === "high" && "Enhanced verification required"}
              </span>
            </div>
            <Progress value={(totalRisk / 10) * 100} className="h-2" />
          </div>
        </div>

        {/* Context Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location Context
            </h4>
            <div className="p-3 rounded-lg bg-secondary/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">{contextData.location.city}</span>
                <Badge variant="outline" className="bg-success/10 text-success border-success">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Trusted
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">Office network detected</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              Device Context
            </h4>
            <div className="p-3 rounded-lg bg-secondary/20 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">{contextData.device.type}</span>
                <Badge variant="outline" className="bg-success/10 text-success border-success">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Trusted
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Last seen: {contextData.device.lastSeen.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Risk Factors */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Brain className="h-4 w-4" />
            AI Risk Analysis
          </h4>
          <div className="space-y-2">
            {riskFactors.map((factor, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/20">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{factor.name}</span>
                    <Badge variant="outline" className={getRiskFactorColor(factor.level)}>
                      {factor.level}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{factor.description}</p>
                </div>
                <span className="text-xs text-muted-foreground">Weight: {factor.weight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Authentication Requirements */}
        <div className="space-y-3">
          <h4 className="font-medium">Current Requirements</h4>
          <div className="grid grid-cols-1 gap-3">
            <div className="p-3 rounded-lg bg-secondary/20">
              <h5 className="text-sm font-medium mb-2">Required Authentication</h5>
              <div className="flex flex-wrap gap-2">
                {contextData.authentication.required.map((method, index) => (
                  <Badge key={index} variant="outline" className="bg-primary/10 text-primary border-primary">
                    {method}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="p-3 rounded-lg bg-secondary/20">
              <h5 className="text-sm font-medium mb-2">AI Recommendations</h5>
              <div className="flex flex-wrap gap-2">
                {contextData.authentication.recommended.map((method, index) => (
                  <Badge key={index} variant="outline" className="bg-accent/10 text-accent border-accent">
                    {method}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Adaptive Settings
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="adaptive-auth" className="text-sm font-medium">
                  Adaptive Authentication
                </Label>
                <p className="text-xs text-muted-foreground">Adjust requirements based on risk</p>
              </div>
              <Switch 
                id="adaptive-auth"
                checked={authSettings.adaptiveAuth}
                onCheckedChange={(checked) => setAuthSettings(prev => ({...prev, adaptiveAuth: checked}))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="location-based" className="text-sm font-medium">
                  Location-Based Rules
                </Label>
                <p className="text-xs text-muted-foreground">Consider geographic location</p>
              </div>
              <Switch 
                id="location-based"
                checked={authSettings.locationBased}
                onCheckedChange={(checked) => setAuthSettings(prev => ({...prev, locationBased: checked}))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="device-trust" className="text-sm font-medium">
                  Device Trust Analysis
                </Label>
                <p className="text-xs text-muted-foreground">Factor in device history</p>
              </div>
              <Switch 
                id="device-trust"
                checked={authSettings.deviceTrust}
                onCheckedChange={(checked) => setAuthSettings(prev => ({...prev, deviceTrust: checked}))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="behavior-analysis" className="text-sm font-medium">
                  Behavior Analysis
                </Label>
                <p className="text-xs text-muted-foreground">Monitor user patterns</p>
              </div>
              <Switch 
                id="behavior-analysis"
                checked={authSettings.behaviorAnalysis}
                onCheckedChange={(checked) => setAuthSettings(prev => ({...prev, behaviorAnalysis: checked}))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="risk-based-mfa" className="text-sm font-medium">
                  Risk-Based MFA
                </Label>
                <p className="text-xs text-muted-foreground">Dynamic MFA requirements</p>
              </div>
              <Switch 
                id="risk-based-mfa"
                checked={authSettings.riskBasedMFA}
                onCheckedChange={(checked) => setAuthSettings(prev => ({...prev, riskBasedMFA: checked}))}
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Button className="w-full bg-gradient-primary">
            <Shield className="h-4 w-4 mr-2" />
            Update Authentication Policy
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}