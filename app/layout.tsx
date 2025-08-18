import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { Suspense } from 'react'
import { Navbar } from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ResumeAI Pro - Smart Resume Builder & AI Analyzer',
  description: 'Create ATS-optimized resumes with AI-powered analysis. Professional templates, keyword matching, and career insights.',
  keywords: 'resume builder, ATS, AI resume analyzer, job application, career tools, professional resume',
  authors: [{ name: 'ResumeAI Pro Team' }],
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  icons: {
    icon: [
      { url: '/resume-icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'ResumeAI Pro - Smart Resume Builder & AI Analyzer',
    description: 'Create ATS-optimized resumes with AI-powered analysis. Professional templates, keyword matching, and career insights.',
    type: 'website',
    images: [
      {
        url: '/logo.svg',
        width: 48,
        height: 48,
        alt: 'ResumeAI Pro Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'ResumeAI Pro - Smart Resume Builder & AI Analyzer',
    description: 'Create ATS-optimized resumes with AI-powered analysis.',
    images: ['/logo.svg'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              {/* Header with Navbar */}
              <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <Navbar />
                </div>
              </header>
              <main className="flex-1">
                <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
                  {children}
                </Suspense>
              </main>
              <footer className="bg-gray-900 text-white py-8 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center">
                    <p className="text-lg font-semibold mb-2">
                      Created by <span className="text-blue-400">Kullay</span>
                    </p>
                    <p className="text-gray-400 italic text-sm">
                      "Crafting digital excellence, one resume at a time. Your success story begins here."
                    </p>
                    <div className="mt-4 flex justify-center space-x-6">
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        Privacy Policy
                      </a>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        Terms of Service
                      </a>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors">
                        Contact
                      </a>
                    </div>
                    <p className="text-gray-500 text-xs mt-4">
                      © 2024 ResumeAI Pro. All rights reserved.
                    </p>
                  </div>
                </div>
              </footer>
            </div>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  )
}
