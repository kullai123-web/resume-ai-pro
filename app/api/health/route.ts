import { NextResponse } from 'next/server'
import { createSuccessResponse } from '../lib/errorHandler'

export async function GET() {
  try {
    const healthCheck = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      services: {
        database: 'unknown',
        ai: 'unknown'
      }
    }

    // Check database connection if MongoDB URI is available
    if (process.env.MONGODB_URI) {
      try {
        const { dbConnect } = await import('@/lib/mongodb')
        await dbConnect()
        healthCheck.services.database = 'connected'
      } catch (error) {
        healthCheck.services.database = 'disconnected'
        console.error('Database health check failed:', error)
      }
    }

    // Check AI services
    if (process.env.OPENAI_API_KEY) {
      healthCheck.services.ai = 'available'
    } else if (process.env.GEMINI_API_KEY) {
      healthCheck.services.ai = 'available'
    } else {
      healthCheck.services.ai = 'unavailable'
    }

    return createSuccessResponse(healthCheck, 'Health check completed')
  } catch (error) {
    console.error('Health check error:', error)
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: 'Health check failed',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
