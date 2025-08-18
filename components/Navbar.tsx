'use client'

import Link from 'next/link'

export function Navbar() {
  return (
    <div className="flex justify-between items-center h-16">
      <div className="flex items-center">
        <img src="/logo.svg" alt="ResumeAI Pro Logo" className="h-8 w-8 mr-3" />
        <span className="text-xl font-bold text-gray-900">ResumeAI Pro</span>
      </div>
      <nav className="hidden md:flex space-x-8">
        <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
        <Link href="/builder" className="text-gray-600 hover:text-gray-900 transition-colors">Builder</Link>
        <Link href="/analyzer" className="text-gray-600 hover:text-gray-900 transition-colors">Analyzer</Link>
        <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">Dashboard</Link>
      </nav>
    </div>
  )
}


