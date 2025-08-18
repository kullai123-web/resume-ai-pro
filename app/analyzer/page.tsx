'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { 
  Upload, 
  FileText, 
  Brain, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle,
  Star,
  Target,
  Zap,
  Download,
  Search,
  BarChart3
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import dynamic from 'next/dynamic'

// Lazy load components for better performance
const ResumeAnalysis = dynamic(() => import('@/components/ResumeAnalysis').then(mod => ({ default: mod.ResumeAnalysis })), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>,
  ssr: false
})

const JobMatcher = dynamic(() => import('@/components/JobMatcher').then(mod => ({ default: mod.JobMatcher })), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>,
  ssr: false
})

interface AnalysisResult {
  atsScore: number
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
  keywordMatch: {
    matched: string[]
    missing: string[]
  }
  overallScore: number
}

export default function ResumeAnalyzer() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [showJobMatcher, setShowJobMatcher] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setUploadedFile(file)
      setAnalysisResult(null)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc']
    },
    multiple: false
  })

  const analyzeResume = async () => {
    if (!uploadedFile) return

    setIsAnalyzing(true)
    
    try {
      // Simulate AI analysis - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      const mockResult: AnalysisResult = {
        atsScore: 85,
        strengths: [
          'Strong technical skills in JavaScript, React, and Node.js',
          'Clear and concise work experience descriptions',
          'Good use of action verbs and quantifiable achievements',
          'Professional formatting and structure'
        ],
        weaknesses: [
          'Missing industry-specific keywords',
          'Could benefit from more quantifiable metrics',
          'Skills section could be more comprehensive',
          'Summary could be more targeted'
        ],
        suggestions: [
          'Add more industry-specific keywords like "REST APIs", "Microservices", "CI/CD"',
          'Include specific metrics like "Improved performance by 40%"',
          'Add more technical skills like "Docker", "Kubernetes", "AWS"',
          'Tailor summary to target job requirements'
        ],
        keywordMatch: {
          matched: ['JavaScript', 'React', 'Node.js', 'Full-stack', 'API'],
          missing: ['TypeScript', 'Docker', 'Kubernetes', 'AWS', 'Microservices']
        },
        overallScore: 78
      }
      
      setAnalysisResult(mockResult)
    } catch (error) {
      console.error('Analysis failed:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100'
    if (score >= 60) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            AI Resume Analyzer
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Get AI-powered insights to improve your resume's ATS compatibility and overall effectiveness
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <motion.div 
              className="card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Your Resume</h2>
              
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                {isDragActive ? (
                  <p className="text-blue-600 font-medium">Drop your resume here...</p>
                ) : (
                  <div>
                    <p className="text-gray-600 mb-2">
                      Drag & drop your resume here, or <span className="text-blue-600">browse</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports PDF, DOCX, and DOC files
                    </p>
                  </div>
                )}
              </div>

              {uploadedFile && (
                <motion.div 
                  className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <p className="font-medium text-green-800">{uploadedFile.name}</p>
                      <p className="text-sm text-green-600">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="mt-6">
                <Button
                  onClick={analyzeResume}
                  disabled={!uploadedFile || isAnalyzing}
                  className="w-full"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Brain className="w-5 h-5 mr-2" />
                      Analyze Resume
                    </div>
                  )}
                </Button>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div 
              className="card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">What We Analyze</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 mt-1">
                    <Target className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">ATS Compatibility</h4>
                    <p className="text-gray-600 text-sm">Check if your resume passes through Applicant Tracking Systems</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3 mt-1">
                    <Search className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Keyword Optimization</h4>
                    <p className="text-gray-600 text-sm">Identify missing keywords and suggest improvements</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 mt-1">
                    <BarChart3 className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Content Analysis</h4>
                    <p className="text-gray-600 text-sm">Evaluate formatting, structure, and content quality</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3 mt-1">
                    <Zap className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Actionable Suggestions</h4>
                    <p className="text-gray-600 text-sm">Get specific recommendations to improve your resume</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Analysis Results */}
          <div className="space-y-6">
            {analysisResult ? (
              <motion.div 
                className="card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowJobMatcher(!showJobMatcher)}
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Job Matcher
                  </Button>
                </div>

                {/* Overall Score */}
                <div className="mb-6">
                  <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {analysisResult.overallScore}/100
                    </div>
                    <div className="text-lg text-gray-600 mb-4">Overall Score</div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${analysisResult.overallScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* ATS Score */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">ATS Score</h3>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(analysisResult.atsScore)} ${getScoreColor(analysisResult.atsScore)}`}>
                      {analysisResult.atsScore}/100
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        analysisResult.atsScore >= 80 ? 'bg-green-500' :
                        analysisResult.atsScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${analysisResult.atsScore}%` }}
                    ></div>
                  </div>
                </div>

                {/* Keyword Match */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Keyword Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-green-700 mb-2 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Matched Keywords
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.keywordMatch.matched.map((keyword, index) => (
                          <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-red-700 mb-2 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Missing Keywords
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {analysisResult.keywordMatch.missing.map((keyword, index) => (
                          <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Strengths */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                    Strengths
                  </h3>
                  <ul className="space-y-2">
                    {analysisResult.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Suggestions */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-blue-600" />
                    Improvement Suggestions
                  </h3>
                  <ul className="space-y-2">
                    {analysisResult.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <FileText className="w-4 h-4 mr-2" />
                    View Detailed Analysis
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                className="card text-center py-12"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Ready to Analyze</h3>
                <p className="text-gray-600">
                  Upload your resume to get AI-powered insights and recommendations
                </p>
              </motion.div>
            )}

            {/* Job Matcher */}
            <AnimatePresence>
              {showJobMatcher && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="card"
                >
                  <JobMatcher />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
