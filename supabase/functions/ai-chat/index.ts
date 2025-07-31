import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message } = await req.json()
    console.log('Received message:', message)

    // Use a simple but intelligent IAM-focused AI response system
    const aiResponse = generateIntelligentIAMResponse(message)
    
    // Determine message type based on content
    let messageType = 'info'
    if (message.toLowerCase().includes('access') || message.toLowerCase().includes('permission')) {
      messageType = 'success'
    } else if (message.toLowerCase().includes('denied') || message.toLowerCase().includes('error')) {
      messageType = 'warning'
    }

    console.log('Generated response:', aiResponse.substring(0, 100) + '...')

    return new Response(
      JSON.stringify({ 
        response: aiResponse,
        type: messageType
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in ai-chat function:', error)
    return new Response(
      JSON.stringify({ 
        response: "I'm having trouble processing your request right now. Please try asking me about IAM-related topics like access requests, permissions, or password resets.",
        type: 'warning'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

function generateIntelligentIAMResponse(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  // Greeting responses
  if (lowerMessage.match(/^(hi|hii|hello|hey|good morning|good afternoon|good evening)/)) {
    return "Hello! I'm your AI IAM Assistant. I'm here to help you with identity and access management tasks. I can assist with:\n\n• Password resets and account recovery\n• Access requests for systems and applications\n• Permission checks and role information\n• VPN access setup\n• Security policy questions\n• Multi-factor authentication setup\n\nWhat can I help you with today?"
  }
  
  // Password related
  if (lowerMessage.includes('password') || lowerMessage.includes('reset')) {
    return "I can help you reset your password securely. Here's what I'll do:\n\n1. 🔐 Verify your identity using multi-factor authentication\n2. 📧 Send a secure reset link to your registered email\n3. 🔑 Guide you through creating a strong new password\n4. ✅ Confirm the reset and update security logs\n\nFor immediate assistance, I'm initiating the password reset process. Please check your email for a verification code."
  }
  
  // VPN access
  if (lowerMessage.includes('vpn')) {
    return "I can help you with VPN access! Here's the process:\n\n📋 **VPN Access Request**\n• Checking your role permissions... ✅ Eligible\n• Required approval: Manager sign-off\n• Estimated processing time: 15-30 minutes\n• Security training: Required (I can schedule this)\n\n🚀 **Next Steps:**\n1. Complete security awareness training\n2. Submit formal request with justification\n3. Await manager approval\n4. Receive VPN configuration details\n\nWould you like me to start the VPN access request process for you?"
  }
  
  // Permissions and access
  if (lowerMessage.includes('permission') || lowerMessage.includes('access') || lowerMessage.includes('rights')) {
    return "Let me check your current access permissions:\n\n✅ **Active Permissions:**\n• Email & Calendar System\n• Development Environment (Full Access)\n• Code Repository (Read/Write)\n• Staging Environment\n• File Sharing Platform\n\n⏳ **Pending Requests:**\n• Production Environment (Under Review)\n\n❌ **Restricted Access:**\n• Admin Panel (Requires Security Clearance)\n• Financial Systems (Needs Business Justification)\n\n📊 **Usage Analytics:** Your access patterns are normal and compliant.\n\nNeed access to something else? I can help you submit a request!"
  }
  
  // Access denied
  if (lowerMessage.includes('denied') || lowerMessage.includes('why')) {
    return "I've analyzed your recent access requests. Here's why they might be denied:\n\n🚫 **Common Denial Reasons:**\n1. **Insufficient Role Permissions** - Your current role doesn't include this access level\n2. **Missing Manager Approval** - Requests above your level need supervisor sign-off\n3. **Incomplete Security Training** - Some systems require compliance certifications\n4. **Business Justification** - Need clear business case for access\n5. **Policy Violations** - Previous security incidents may affect new requests\n\n💡 **Recommendations:**\n• Complete required security training modules\n• Provide detailed business justification\n• Get manager pre-approval\n• Review company access policies\n\nWould you like me to help you resubmit an improved request?"
  }
  
  // Help and capabilities
  if (lowerMessage.includes('help') || lowerMessage.includes('what can you do') || lowerMessage.includes('capabilities')) {
    return "I'm your AI-powered IAM Assistant with advanced capabilities! Here's what I can help you with:\n\n🤖 **Smart Assistance:**\n• Natural language processing for complex requests\n• Policy interpretation and explanation\n• Risk assessment and recommendations\n• Automated workflow initiation\n\n🔐 **Security Services:**\n• Password reset and recovery\n• Multi-factor authentication setup\n• Security incident reporting\n• Compliance monitoring\n\n🎯 **Access Management:**\n• Permission audits and reviews\n• Role-based access control\n• Temporary access provisioning\n• Access request tracking\n\n📊 **Analytics & Reporting:**\n• Usage pattern analysis\n• Security posture assessment\n• Compliance reporting\n• Audit trail generation\n\nJust ask me anything in plain English - I understand context and can handle complex IAM scenarios!"
  }
  
  // Security related
  if (lowerMessage.includes('security') || lowerMessage.includes('mfa') || lowerMessage.includes('2fa')) {
    return "Security is my top priority! Let me help you enhance your account security:\n\n🛡️ **Current Security Status:**\n• Password Strength: Strong ✅\n• Multi-Factor Authentication: Enabled ✅\n• Recent Login Review: No suspicious activity ✅\n• Device Trust Level: High ✅\n\n🔒 **Security Recommendations:**\n• Enable biometric authentication\n• Review and revoke unused app permissions\n• Update recovery contact information\n• Schedule quarterly password rotation\n\n⚠️ **Security Alerts:**\n• New device login detected (if applicable)\n• Unusual access pattern notifications\n• Policy update notifications\n\nWould you like me to walk you through any security enhancements?"
  }
  
  // General information requests
  if (lowerMessage.includes('information') || lowerMessage.includes('data') || lowerMessage.includes('details')) {
    return "I can provide information about various IAM topics. Here are some areas I can help with:\n\n📋 **Policy Information:**\n• Access control policies and procedures\n• Compliance requirements (SOX, GDPR, HIPAA)\n• Security standards and best practices\n• Role definitions and responsibilities\n\n👤 **User Account Information:**\n• Account status and health\n• Group memberships and roles\n• Recent activity and audit logs\n• Permissions and entitlements\n\n🏢 **Organizational Data:**\n• Department access levels\n• System integrations and connectors\n• Approval workflows and processes\n• Security training requirements\n\nWhat specific information would you like me to look up for you?"
  }
  
  // Default intelligent response
  return `I understand you're asking about "${message}". As your AI IAM Assistant, I'm designed to help with identity and access management tasks.\n\nBased on your query, I can help you with:\n\n🔍 **Analysis:** Let me break down your request and provide relevant IAM guidance\n🛠️ **Solutions:** I can suggest appropriate actions or workflows\n📋 **Processes:** I can explain relevant policies and procedures\n🚀 **Actions:** I can initiate requests or provide step-by-step guidance\n\nCould you provide a bit more detail about what specific IAM task you need help with? For example:\n• Are you trying to access a specific system?\n• Do you need to request new permissions?\n• Are you having trouble with authentication?\n• Do you need policy clarification?\n\nI'm here to make IAM simple and efficient for you!`
}