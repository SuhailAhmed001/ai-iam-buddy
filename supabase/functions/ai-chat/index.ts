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

    // Using Hugging Face's free inference API with Microsoft DialoGPT
    const response = await fetch(
      'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          inputs: `User: ${message}\nAI IAM Assistant:`,
          parameters: {
            max_new_tokens: 150,
            temperature: 0.7,
            do_sample: true,
            top_p: 0.9,
            repetition_penalty: 1.1
          }
        }),
      }
    )

    if (!response.ok) {
      console.error('Hugging Face API error:', response.status, response.statusText)
      
      // Fallback to a simple IAM-focused response
      const fallbackResponse = generateIAMFallback(message)
      return new Response(
        JSON.stringify({ 
          response: fallbackResponse,
          type: 'info'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const data = await response.json()
    console.log('Hugging Face response:', data)
    
    let aiResponse = ''
    let messageType = 'info'
    
    if (Array.isArray(data) && data.length > 0) {
      aiResponse = data[0].generated_text || ''
      // Clean up the response to remove the input prompt
      aiResponse = aiResponse.replace(`User: ${message}\nAI IAM Assistant:`, '').trim()
    }
    
    // If the response is empty or too short, use IAM-specific fallback
    if (!aiResponse || aiResponse.length < 10) {
      aiResponse = generateIAMFallback(message)
    }
    
    // Determine message type based on content
    if (message.toLowerCase().includes('access') || message.toLowerCase().includes('permission')) {
      messageType = 'success'
    } else if (message.toLowerCase().includes('denied') || message.toLowerCase().includes('error')) {
      messageType = 'warning'
    }

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
        error: 'An unexpected error occurred', 
        details: error.message 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})

function generateIAMFallback(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('password') || lowerMessage.includes('reset')) {
    return "I can help you reset your password. For security reasons, I'll need to verify your identity first. I'm sending a verification code to your registered email address. Please check your email and provide the code to proceed with the password reset."
  } else if (lowerMessage.includes('vpn') || lowerMessage.includes('access request')) {
    return "To request VPN access, you'll need to submit a formal access request. Based on your role, I can help determine your eligibility. Expected approval time is typically 15 minutes for standard requests. You'll receive an email notification once approved."
  } else if (lowerMessage.includes('permission') || lowerMessage.includes('rights')) {
    return "I can help you check your current access permissions. Your permissions include access to development environments, code repositories, and staging systems. If you need additional permissions, I can help you submit a request to your manager."
  } else if (lowerMessage.includes('denied') || lowerMessage.includes('why')) {
    return "Access requests are typically denied due to: insufficient role permissions, missing manager approval, or incomplete security training. I recommend checking these requirements and resubmitting your request."
  } else if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
    return "I'm your AI IAM Assistant! I can help with password resets, access requests, permission checks, policy explanations, and security inquiries. I can also guide you through VPN setup, MFA configuration, and compliance requirements. What would you like help with?"
  } else {
    return "I understand your request. As your AI IAM Assistant, I can help with identity and access management tasks. Could you provide more details about what specific IAM function you need assistance with? I can help with access requests, permissions, security policies, or account management."
  }
}