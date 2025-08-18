import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.warn('MONGODB_URI is not set. Database functionality will be limited.')
}

interface ConnectionCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

const cached: ConnectionCache = {
  conn: null,
  promise: null,
}

export async function dbConnect() {
  if (!MONGODB_URI) {
    console.warn('Cannot connect to MongoDB: MONGODB_URI not configured')
    return null
  }

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4, // Use IPv4, skip trying IPv6
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('MongoDB connected successfully')
      return mongoose
    }).catch((error) => {
      console.error('MongoDB connection error:', error)
      cached.promise = null
      throw error
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    console.error('Failed to establish MongoDB connection:', e)
    throw e
  }

  return cached.conn
}

// Graceful shutdown
process.on('SIGINT', async () => {
  if (cached.conn) {
    await cached.conn.disconnect()
    console.log('MongoDB connection closed through app termination')
    process.exit(0)
  }
})
