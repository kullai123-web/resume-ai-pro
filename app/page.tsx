'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Brain, 
  TrendingUp, 
  CheckCircle, 
  Star,
  ArrowRight,
  Download,
  Upload,
  Search,
  Users,
  Zap
} from 'lucide-react'

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const [gsapLoaded, setGsapLoaded] = useState(false)

  useEffect(() => {
    // Remove heavy GSAP animations to improve load times
    setGsapLoaded(true)
  }, [])

  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'ATS-Optimized Builder',
      description: 'Create resumes that pass through Applicant Tracking Systems with our intelligent formatting and keyword optimization.'
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI-Powered Analysis',
      description: 'Get detailed insights on your resume with AI analysis covering ATS score, keyword matching, and improvement suggestions.'
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Job Description Matching',
      description: 'Compare your resume against job descriptions to identify missing keywords and get tailored improvement recommendations.'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Professional Templates',
      description: 'Choose from multiple professional templates designed to impress hiring managers and ATS systems.'
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: 'Multiple Export Formats',
      description: 'Export your resume in PDF, DOCX, or other formats with perfect formatting preserved.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'User Accounts',
      description: 'Save multiple resumes, track your analysis history, and access your data across devices.'
    }
  ]

  const stats = [
    { number: '95%', label: 'ATS Success Rate' },
    { number: '10K+', label: 'Resumes Created' },
    { number: '50+', label: 'Professional Templates' },
    { number: '4.9★', label: 'User Rating' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section ref={heroRef} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
                     <div className="text-center">
             <motion.div
               className="flex justify-center mb-6"
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.6, ease: 'easeOut' }}
             >
               <img src="/logo.svg" alt="ResumeAI Pro Logo" className="h-16 w-16" />
             </motion.div>
             <motion.h1 
               className="hero-title text-5xl md:text-7xl font-bold text-gray-900 mb-6"
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1, ease: 'easeOut' }}
             >
               Build & Analyze Your
               <span className="gradient-text block"> Resume with AI</span>
             </motion.h1>
            
            <motion.p 
              className="hero-subtitle text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Create ATS-friendly resumes that get you noticed. Get AI-powered insights to improve your chances of landing your dream job.
            </motion.p>
            
            <motion.div 
              className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href="/builder" className="btn-primary flex items-center gap-2 group">
                <FileText className="w-5 h-5" />
                Create Resume
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link href="/analyzer" className="btn-secondary flex items-center gap-2 group">
                <Brain className="w-5 h-5" />
                Analyze Resume
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
          
          {/* Hero Image/Illustration */}
          <motion.div 
            className="hero-image mt-16 flex justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          >
            <div className="relative">
              <div className="floating absolute -top-4 -left-4 bg-blue-100 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div className="floating absolute -top-4 -right-4 bg-purple-100 p-3 rounded-full">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <div className="floating absolute -bottom-4 -left-4 bg-green-100 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="floating absolute -bottom-4 -right-4 bg-orange-100 p-3 rounded-full">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              
              <div className="bg-white rounded-2xl shadow-2xl p-6 border border-gray-100">
                <div className="w-80 h-96 bg-white rounded-lg overflow-hidden">
                  {/* Resume Template Preview */}
                  <div className="p-4 border-b-2 border-blue-600">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">John Doe</h3>
                    <p className="text-sm text-gray-600 mb-2">Senior Software Engineer</p>
                    <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                      <span>john.doe@email.com</span>
                      <span>•</span>
                      <span>+1 (555) 123-4567</span>
                      <span>•</span>
                      <span>San Francisco, CA</span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="mb-3">
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">Experience</h4>
                      <div className="text-xs text-gray-600">
                        <p className="font-medium">Senior Developer • Tech Corp</p>
                        <p className="text-gray-500">2020 - Present</p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">React</span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Node.js</span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">TypeScript</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">Education</h4>
                      <div className="text-xs text-gray-600">
                        <p className="font-medium">BS Computer Science</p>
                        <p className="text-gray-500">Stanford University • 2018</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Template Showcase Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Professional <span className="gradient-text">Templates</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our collection of ATS-optimized templates designed to help you stand out from the competition.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Modern Template */}
            <motion.div
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-transparent group-hover:border-blue-500 transition-all duration-300">
                <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg mb-4 p-4">
                  <div className="border-b-2 border-blue-600 pb-2 mb-3">
                    <h4 className="text-lg font-bold text-gray-900">John Doe</h4>
                    <p className="text-sm text-gray-600">Software Engineer</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-blue-200 rounded"></div>
                    <div className="h-2 bg-blue-200 rounded w-3/4"></div>
                    <div className="h-2 bg-blue-200 rounded w-1/2"></div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Modern</h3>
                <p className="text-gray-600 text-sm">Clean and professional design with modern typography</p>
              </div>
            </motion.div>

            {/* Classic Template */}
            <motion.div
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-transparent group-hover:border-purple-500 transition-all duration-300">
                <div className="w-full h-48 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg mb-4 p-4">
                  <div className="text-center border-b-2 border-purple-300 pb-2 mb-3">
                    <h4 className="text-lg font-bold text-gray-900">John Doe</h4>
                    <p className="text-sm text-gray-600">Software Engineer</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-purple-200 rounded"></div>
                    <div className="h-2 bg-purple-200 rounded w-4/5"></div>
                    <div className="h-2 bg-purple-200 rounded w-2/3"></div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Classic</h3>
                <p className="text-gray-600 text-sm">Traditional layout with timeless appeal</p>
              </div>
            </motion.div>

            {/* Minimal Template */}
            <motion.div
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-transparent group-hover:border-green-500 transition-all duration-300">
                <div className="w-full h-48 bg-gradient-to-br from-green-50 to-green-100 rounded-lg mb-4 p-4">
                  <div className="text-center mb-3">
                    <h4 className="text-lg font-light text-gray-900">John Doe</h4>
                    <p className="text-sm text-gray-600">Software Engineer</p>
                  </div>
                  <div className="space-y-2">
                    <div className="h-1 bg-green-200 rounded"></div>
                    <div className="h-1 bg-green-200 rounded w-5/6"></div>
                    <div className="h-1 bg-green-200 rounded w-3/4"></div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Minimal</h3>
                <p className="text-gray-600 text-sm">Simple and elegant design for maximum readability</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to
              <span className="gradient-text"> Succeed</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive suite of tools helps you create professional resumes and get AI-powered insights to improve your job applications.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card card group hover:scale-105"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Build Your
            <span className="block">Perfect Resume?</span>
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who have landed their dream jobs with our AI-powered resume tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/builder" className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors">
              Start Building Now
            </Link>
            <Link href="/analyzer" className="border-2 border-white text-white font-semibold py-4 px-8 rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
              Analyze Your Resume
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
