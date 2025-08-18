'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Target, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp,
  BarChart3,
  Lightbulb
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface JobMatchResult {
  matchScore: number
  matchedKeywords: string[]
  missingKeywords: string[]
  suggestions: string[]
  overallFit: 'excellent' | 'good' | 'fair' | 'poor'
}

export function JobMatcher() {
  const [jobDescription, setJobDescription] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [matchResult, setMatchResult] = useState<JobMatchResult | null>(null)

  const analyzeJobMatch = async () => {
    if (!jobDescription.trim()) return

    setIsAnalyzing(true)
    
    try {
      // Simulate AI analysis - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockResult: JobMatchResult = {
        matchScore: 72,
        matchedKeywords: ['JavaScript', 'React', 'Node.js', 'API', 'Git'],
        missingKeywords: ['TypeScript', 'Docker', 'AWS', 'Microservices', 'CI/CD'],
        suggestions: [
          'Add TypeScript experience to your skills section',
          'Include Docker and containerization experience',
          'Mention any cloud platform experience (AWS, Azure, GCP)',
          'Highlight any microservices architecture experience',
          'Add CI/CD pipeline experience if applicable'
        ],
        overallFit: 'good'
      }
      
      setMatchResult(mockResult)
    } catch (error) {
      console.error('Job match analysis failed:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getFitColor = (fit: string) => {
    switch (fit) {
      case 'excellent': return 'text-green-600 bg-green-100'
      case 'good': return 'text-blue-600 bg-blue-100'
      case 'fair': return 'text-yellow-600 bg-yellow-100'
      case 'poor': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getFitIcon = (fit: string) => {
    switch (fit) {
      case 'excellent': return <TrendingUp className="w-4 h-4" />
      case 'good': return <CheckCircle className="w-4 h-4" />
      case 'fair': return <AlertCircle className="w-4 h-4" />
      case 'poor': return <AlertCircle className="w-4 h-4" />
      default: return <BarChart3 className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-5 h-5 text-blue-600" />
        <h3 className="text-xl font-bold text-gray-900">Job Description Matcher</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Paste Job Description
          </label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={6}
            className="input-field"
            placeholder="Paste the job description here to analyze how well your resume matches the requirements..."
          />
        </div>

        <Button
          onClick={analyzeJobMatch}
          disabled={!jobDescription.trim() || isAnalyzing}
          className="w-full"
        >
          {isAnalyzing ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Analyzing Match...
            </div>
          ) : (
            <div className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Analyze Job Match
            </div>
          )}
        </Button>
      </div>

      {matchResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Match Score */}
          <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {matchResult.matchScore}%
            </div>
            <div className="text-lg text-gray-600 mb-4">Match Score</div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${matchResult.matchScore}%` }}
              ></div>
            </div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mt-3 ${getFitColor(matchResult.overallFit)}`}>
              {getFitIcon(matchResult.overallFit)}
              {matchResult.overallFit.charAt(0).toUpperCase() + matchResult.overallFit.slice(1)} Fit
            </div>
          </div>

          {/* Keyword Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-green-700 mb-3 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Matched Keywords
              </h4>
              <div className="flex flex-wrap gap-2">
                {matchResult.matchedKeywords.map((keyword, index) => (
                  <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-red-700 mb-3 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                Missing Keywords
              </h4>
              <div className="flex flex-wrap gap-2">
                {matchResult.missingKeywords.map((keyword, index) => (
                  <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-sm rounded">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Suggestions */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <Lightbulb className="w-4 h-4 mr-2 text-yellow-600" />
              Tailoring Suggestions
            </h4>
            <ul className="space-y-2">
              {matchResult.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              <Search className="w-4 h-4 mr-2" />
              Find Similar Jobs
            </Button>
            <Button className="flex-1">
              <Target className="w-4 h-4 mr-2" />
              Optimize Resume
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
