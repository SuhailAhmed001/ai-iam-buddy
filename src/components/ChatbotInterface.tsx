import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, User, Send, Loader2, Shield, AlertCircle, CheckCircle } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  type?: "success" | "warning" | "info";
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  query: string;
}

export function ChatbotInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI IAM Assistant. I can help you with access requests, policy questions, password resets, and security inquiries. How can I assist you today?",
      timestamp: new Date(),
      type: "info"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const quickActions: QuickAction[] = [
    {
      id: "1",
      label: "Reset Password",
      icon: <Shield className="h-4 w-4" />,
      query: "I need to reset my password"
    },
    {
      id: "2",
      label: "Request VPN Access",
      icon: <AlertCircle className="h-4 w-4" />,
      query: "How do I request VPN access?"
    },
    {
      id: "3",
      label: "Check My Permissions",
      icon: <CheckCircle className="h-4 w-4" />,
      query: "What are my current access permissions?"
    },
    {
      id: "4",
      label: "Access Denied Help",
      icon: <AlertCircle className="h-4 w-4" />,
      query: "Why was my access request denied?"
    }
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const simulateAIResponse = async (userMessage: string): Promise<Message> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Simple response generation based on keywords
    let response = "";
    let messageType: "success" | "warning" | "info" = "info";

    if (userMessage.toLowerCase().includes("password") || userMessage.toLowerCase().includes("reset")) {
      response = "I can help you reset your password. For security reasons, I'll need to verify your identity first. I'm sending a verification code to your registered email address. Please check your email and provide the code to proceed with the password reset.";
      messageType = "info";
    } else if (userMessage.toLowerCase().includes("vpn") || userMessage.toLowerCase().includes("access")) {
      response = "To request VPN access, you'll need to submit a formal access request. Based on your role as a Software Engineer, you're eligible for VPN access. I'm automatically generating an access request for you. Expected approval time: 15 minutes. You'll receive an email notification once approved.";
      messageType = "success";
    } else if (userMessage.toLowerCase().includes("permission") || userMessage.toLowerCase().includes("rights")) {
      response = "Here are your current access permissions:\n\n✅ Email & Calendar\n✅ Development Environment\n✅ Code Repository (Read/Write)\n✅ Staging Environment\n❌ Production Environment (Requires approval)\n❌ Admin Panel\n\nIf you need additional permissions, I can help you submit a request.";
      messageType = "info";
    } else if (userMessage.toLowerCase().includes("denied") || userMessage.toLowerCase().includes("why")) {
      response = "I've analyzed your recent access request. It was denied because:\n\n1. The requested resource requires manager approval\n2. Your current role doesn't include production access\n3. You haven't completed the required security training\n\nI recommend completing the security training first, then resubmitting your request with manager approval.";
      messageType = "warning";
    } else {
      response = "I understand your request. Let me analyze this using our AI policy engine... Based on your current permissions and role, I can help you with this request. Would you like me to check your eligibility or submit a formal request on your behalf?";
      messageType = "info";
    }

    return {
      id: Date.now().toString(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
      type: messageType
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const aiResponse = await simulateAIResponse(inputValue);
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "I apologize, but I'm experiencing some technical difficulties. Please try again in a moment or contact your system administrator.",
        timestamp: new Date(),
        type: "warning"
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action: QuickAction) => {
    setInputValue(action.query);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Chat Interface */}
      <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-border shadow-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI IAM Assistant
          </CardTitle>
          <CardDescription>
            Natural language interface powered by LLM technology
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Messages */}
          <ScrollArea className="h-96 w-full rounded-md border border-border/50 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${
                    message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === "user" 
                      ? "bg-accent" 
                      : "bg-primary"
                  }`}>
                    {message.role === "user" ? (
                      <User className="h-4 w-4 text-accent-foreground" />
                    ) : (
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    )}
                  </div>
                  <div className={`flex-1 max-w-xs lg:max-w-md ${
                    message.role === "user" ? "text-right" : ""
                  }`}>
                    <div className={`rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-accent text-accent-foreground"
                        : message.type === "success"
                        ? "bg-success/10 border border-success/20"
                        : message.type === "warning"
                        ? "bg-warning/10 border border-warning/20"
                        : "bg-secondary"
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="bg-secondary rounded-lg p-3">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about access requests, policies, or security..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={isLoading || !inputValue.trim()}
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-card/50 backdrop-blur-sm border-border shadow-elegant">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common IAM tasks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              className="w-full justify-start bg-secondary/50 hover:bg-secondary"
              onClick={() => handleQuickAction(action)}
            >
              {action.icon}
              <span className="ml-2">{action.label}</span>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}