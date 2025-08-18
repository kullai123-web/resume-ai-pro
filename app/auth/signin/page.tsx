'use client'

import { signIn } from 'next-auth/react'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign in to ResumeAI Pro</h1>
        <div className="space-y-3">
          <button
            onClick={() => signIn('google', { callbackUrl: '/' })}
            className="w-full py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Continue with Google
          </button>
          <button
            onClick={() => signIn('github', { callbackUrl: '/' })}
            className="w-full py-2.5 bg-gray-900 text-white rounded-md hover:bg-black"
          >
            Continue with GitHub
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-4 text-center">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}


