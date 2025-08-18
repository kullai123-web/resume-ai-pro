import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { dbConnect } from '@/lib/mongodb'
import User from '@/models/User'

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string
      email?: string | null
      name?: string | null
      image?: string | null
    }
  }
  
  interface User {
    id?: string
    email?: string | null
    name?: string | null
    image?: string | null
  }
}

// Build providers array only for configured OAuth providers
const providers = []

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  )
}

if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  providers.push(
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })
  )
}

// If no OAuth providers are configured, add a simple credentials provider for development
if (providers.length === 0) {
  console.warn('No OAuth providers configured. Authentication will be limited.')
}

const authOptions: NextAuthOptions = {
  providers,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        const { email, name, image } = user
        try {
          await dbConnect()
          const existingUser = await User.findOne({ email })
          
          if (!existingUser) {
            await User.create({
              email,
              name,
              image,
              resumes: [],
              analysisHistory: [],
            })
          }
        } catch (error) {
          console.error('Error during sign in:', error)
          // Don't fail sign in if database operation fails
          return true
        }
      }
      return true
    },
    async session({ session, token }) {
      if (session.user?.email) {
        try {
          await dbConnect()
          const user = await User.findOne({ email: session.user.email })
          if (user) {
            session.user.id = user._id.toString()
          }
        } catch (error) {
          console.error('Error fetching user session:', error)
          // Don't fail session if database operation fails
        }
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret-for-development',
  // Production optimizations
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // Security settings
  useSecureCookies: process.env.NODE_ENV === 'production',
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
