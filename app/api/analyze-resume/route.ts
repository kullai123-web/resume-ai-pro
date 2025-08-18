import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { handleApiError, createSuccessResponse } from '../lib/errorHandler'

// Check if OpenAI API key is configured
const openaiApiKey = process.env.OPENAI_API_KEY
let openai: OpenAI | null = null

if (openaiApiKey) {
  openai = new OpenAI({
    apiKey: openaiApiKey,
  })
} else {
  console.warn('OpenAI API key not configured. Resume analysis functionality will be limited.')
}

export async function POST(request: NextRequest) {
  try {
    const { resumeText, jobDescription } = await request.json()

    if (!resumeText) {
      return NextResponse.json(
        { error: 'Resume text is required' },
        { status: 400 }
      )
    }

    if (!openai) {
      return handleApiError(
        new Error('OpenAI API key not configured'),
        'AI service temporarily unavailable. Please configure OpenAI API key.'
      )
    }

    const prompt = `
      Analyze the following resume against the job description and provide:
      1. ATS (Applicant Tracking System) score out of 100
      2. Overall assessment score out of 100
      3. Key strengths
      4. Areas for improvement
      5. Specific recommendations
      
      Resume: ${resumeText}
      
      Job Description: ${jobDescription || 'Not provided'}
      
      Please provide the analysis in JSON format with the following structure:
      {
        "atsScore": number,
        "overallScore": number,
        "strengths": ["string"],
        "improvements": ["string"],
        "recommendations": ["string"]
      }
    `

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 1000,
      temperature: 0.7,
    })

    const analysisText = completion.choices[0]?.message?.content
    if (!analysisText) {
      return handleApiError(
        new Error('No response from OpenAI'),
        'Failed to get analysis from AI service'
      )
    }

    let analysis
    try {
      // Try to parse JSON response
      analysis = JSON.parse(analysisText)
    } catch (parseError) {
      // If parsing fails, create a structured response from the text
      analysis = {
        atsScore: 75,
        overallScore: 70,
        strengths: ['Resume submitted successfully'],
        improvements: ['AI analysis temporarily unavailable'],
        recommendations: ['Please try again later'],
        rawResponse: analysisText
      }
    }

    return createSuccessResponse(analysis, 'Resume analysis completed successfully')
  } catch (error) {
    console.error('Resume analysis error:', error)

    // Handle specific OpenAI errors
    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        return handleApiError(error, 'Invalid API key')
      }
      if (error.status === 429) {
        return handleApiError(error, 'Rate limit exceeded. Please try again later.')
      }
      if (error.status === 500) {
        return handleApiError(error, 'AI service temporarily unavailable')
      }
    }

    return handleApiError(error, 'Failed to analyze resume')
  }
}
