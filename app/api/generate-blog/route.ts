import { NextRequest, NextResponse } from 'next/server'
import { createAIProvider, getAvailableProviders } from '@/lib/ai/providers'

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const { prompt, provider: requestedProvider, category } = body

    // Validate input
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: 'Prompt is required and cannot be empty' },
        { status: 400 }
      )
    }

    if (prompt.length > 500) {
      return NextResponse.json(
        { error: 'Prompt must be less than 500 characters' },
        { status: 400 }
      )
    }

    // Check available providers
    const availableProviders = getAvailableProviders()
    if (availableProviders.length === 0) {
      return NextResponse.json(
        { error: 'No AI providers configured. Please set up API keys.' },
        { status: 503 }
      )
    }

    // Select provider (use requested if available, otherwise default)
    const providerName = requestedProvider && availableProviders.includes(requestedProvider)
      ? requestedProvider
      : availableProviders[0]

    // Create provider instance
    const provider = createAIProvider(providerName)

    // Generate content
    console.log(`Generating blog content with ${providerName} for topic: ${prompt}`)
    const startTime = Date.now()
    
    const generatedContent = await provider.generateBlogContent(
      prompt.trim(),
      category || 'Health Education'
    )

    const duration = Date.now() - startTime
    console.log(`Content generated successfully in ${duration}ms`)

    return NextResponse.json({
      success: true,
      provider: providerName,
      generated: generatedContent,
      metadata: {
        prompt: prompt.trim(),
        category: category || 'Health Education',
        generationTime: duration,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error: any) {
    console.error('Error generating blog content:', error)
    
    // Handle specific error types
    if (error.message?.includes('API key')) {
      return NextResponse.json(
        { error: 'AI provider authentication failed. Please check API keys.' },
        { status: 401 }
      )
    }
    
    if (error.message?.includes('rate limit') || error.message?.includes('Rate limit')) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again in a moment.' },
        { status: 429 }
      )
    }

    if (error.message?.includes('parse') || error.message?.includes('JSON')) {
      return NextResponse.json(
        { error: 'Failed to parse AI response. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: error?.message || 'Failed to generate content' },
      { status: 500 }
    )
  }
}

// GET endpoint to check available providers
export async function GET() {
  const providers = getAvailableProviders()
  return NextResponse.json({
    available: providers,
    default: providers[0] || null,
    configured: providers.length > 0
  })
}
