'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Brain, 
  Plus, 
  Download, 
  Edit, 
  Trash2,
  TrendingUp,
  BarChart3,
  Calendar,
  User
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

interface Resume {
  id: string
  name: string
  template: string
  createdAt: string
  updatedAt: string
}

interface Analysis {
  id: string
  resumeId: string
  analysis: any
  createdAt: string
}

export default function Dashboard() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [analysisHistory, setAnalysisHistory] = useState<Analysis[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      // Fetch user's resumes and analysis history
      // This would be replaced with actual API calls
      const mockResumes: Resume[] = [
        {
          id: '1',
          name: 'Software Engineer Resume',
          template: 'modern',
          createdAt: '2024-01-15',
          updatedAt: '2024-01-20'
        },
        {
          id: '2',
          name: 'Frontend Developer Resume',
          template: 'classic',
          createdAt: '2024-01-10',
          updatedAt: '2024-01-18'
        }
      ]

      const mockAnalysis: Analysis[] = [
        {
          id: '1',
          resumeId: '1',
          analysis: { atsScore: 85, overallScore: 78 },
          createdAt: '2024-01-20'
        },
        {
          id: '2',
          resumeId: '2',
          analysis: { atsScore: 72, overallScore: 75 },
          createdAt: '2024-01-18'
        }
      ]

      setResumes(mockResumes)
      setAnalysisHistory(mockAnalysis)
    } catch (error) {
      console.error('Error fetching user data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  // Unauthenticated public dashboard for now

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <motion.h1 
            className="text-3xl font-bold text-gray-900 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Your Dashboard
          </motion.h1>
          <motion.p 
            className="text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Manage your resumes and track your analysis history
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{resumes.length}</p>
                <p className="text-gray-600">Resumes</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <Brain className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{analysisHistory.length}</p>
                <p className="text-gray-600">Analyses</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {analysisHistory.length > 0 
                    ? Math.round(analysisHistory.reduce((acc, curr) => acc + curr.analysis.atsScore, 0) / analysisHistory.length)
                    : 0
                  }
                </p>
                <p className="text-gray-600">Avg ATS Score</p>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {resumes.length > 0 
                    ? new Date(Math.max(...resumes.map(r => new Date(r.updatedAt).getTime()))).toLocaleDateString()
                    : 'N/A'
                  }
                </p>
                <p className="text-gray-600">Last Updated</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resumes Section */}
          <motion.div 
            className="card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Your Resumes</h2>
              <Link href="/builder">
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New
                </Button>
              </Link>
            </div>

            {resumes.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No resumes yet</p>
                <Link href="/builder">
                  <Button>Create Your First Resume</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {resumes.map((resume) => (
                  <div key={resume.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{resume.name}</h3>
                        <p className="text-sm text-gray-600 capitalize">{resume.template} template</p>
                        <p className="text-xs text-gray-500">
                          Updated {new Date(resume.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Analysis History */}
          <motion.div 
            className="card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Analysis History</h2>
              <Link href="/analyzer">
                <Button size="sm">
                  <Brain className="w-4 h-4 mr-2" />
                  New Analysis
                </Button>
              </Link>
            </div>

            {analysisHistory.length === 0 ? (
              <div className="text-center py-8">
                <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">No analyses yet</p>
                <Link href="/analyzer">
                  <Button>Analyze Your Resume</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {analysisHistory.map((analysis) => (
                  <div key={analysis.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Resume Analysis #{analysis.id}
                        </h3>
                        <p className="text-sm text-gray-600">
                          ATS Score: {analysis.analysis.atsScore}/100
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(analysis.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <BarChart3 className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/builder">
                <Button className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Resume
                </Button>
              </Link>
              <Link href="/analyzer">
                <Button className="w-full">
                  <Brain className="w-4 h-4 mr-2" />
                  Analyze Resume
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full">
                  <User className="w-4 h-4 mr-2" />
                  View Templates
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
