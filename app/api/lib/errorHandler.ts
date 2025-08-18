import { NextResponse } from 'next/server'

export interface ApiError {
  message: string
  code?: string
  details?: any
}

export function handleApiError(error: any, defaultMessage: string = 'Internal server error'): NextResponse {
  console.error('API Error:', error)

  // Handle different types of errors
  if (error.name === 'ValidationError') {
    return NextResponse.json(
      {
        error: 'Validation Error',
        message: error.message,
        details: error.errors,
        code: 'VALIDATION_ERROR'
      },
      { status: 400 }
    )
  }

  if (error.name === 'MongoError' || error.code === 11000) {
    return NextResponse.json(
      {
        error: 'Database Error',
        message: 'Duplicate entry or database constraint violation',
        code: 'DATABASE_ERROR'
      },
      { status: 409 }
    )
  }

  if (error.name === 'CastError') {
    return NextResponse.json(
      {
        error: 'Invalid Data',
        message: 'Invalid data format or type',
        code: 'INVALID_DATA'
      },
      { status: 400 }
    )
  }

  if (error.status === 401) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
        message: 'Authentication required',
        code: 'UNAUTHORIZED'
      },
      { status: 401 }
    )
  }

  if (error.status === 403) {
    return NextResponse.json(
      {
        error: 'Forbidden',
        message: 'Access denied',
        code: 'FORBIDDEN'
      },
      { status: 403 }
    )
  }

  if (error.status === 404) {
    return NextResponse.json(
      {
        error: 'Not Found',
        message: 'Resource not found',
        code: 'NOT_FOUND'
      },
      { status: 404 }
    )
  }

  if (error.status === 429) {
    return NextResponse.json(
      {
        error: 'Too Many Requests',
        message: 'Rate limit exceeded',
        code: 'RATE_LIMIT_EXCEEDED'
      },
      { status: 429 }
    )
  }

  // Default error response
  return NextResponse.json(
    {
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'production' ? defaultMessage : error.message || defaultMessage,
      code: 'INTERNAL_ERROR',
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    },
    { status: 500 }
  )
}

export function createSuccessResponse(data: any, message?: string): NextResponse {
  return NextResponse.json({
    success: true,
    data,
    message,
    timestamp: new Date().toISOString()
  })
}

export function createValidationError(field: string, message: string): NextResponse {
  return NextResponse.json(
    {
      error: 'Validation Error',
      message: `${field}: ${message}`,
      code: 'VALIDATION_ERROR',
      field
    },
    { status: 400 }
  )
}