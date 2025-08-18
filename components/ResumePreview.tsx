'use client'

import { motion } from 'framer-motion'
import { Download, Eye, FileText } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useRef } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { saveAs } from 'file-saver'

interface ResumeData {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    location: string
    linkedin: string
    summary: string
  }
  education: Array<{
    id: string
    institution: string
    degree: string
    field: string
    startDate: string
    endDate: string
    gpa: string
    description: string
  }>
  experience: Array<{
    id: string
    company: string
    position: string
    location: string
    startDate: string
    endDate: string
    current: boolean
    description: string
    achievements: string[]
  }>
  skills: Array<{
    id: string
    name: string
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  }>
  projects: Array<{
    id: string
    name: string
    description: string
    technologies: string
    link: string
    startDate: string
    endDate: string
  }>
  certifications: Array<{
    id: string
    name: string
    issuer: string
    date: string
    link: string
  }>
}

interface ResumePreviewProps {
  data: ResumeData
  template: string
}

export function ResumePreview({ data, template }: ResumePreviewProps) {
  const resumeRef = useRef<HTMLDivElement>(null)

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  const hasExperienceContent = (exp: {
    company: string
    position: string
    description: string
  }) => {
    return (
      (exp.position && exp.position.trim().length > 0) ||
      (exp.company && exp.company.trim().length > 0) ||
      (exp.description && exp.description.trim().length > 0)
    )
  }

  const filteredExperiences = Array.isArray(data.experience)
    ? data.experience.filter(hasExperienceContent)
    : []

  const exportToPDF = async () => {
    if (!resumeRef.current) return
    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pageWidth = 210
      const pageHeight = 297
      const margin = 10
      const imgWidth = pageWidth - margin * 2
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      const finalHeight = Math.min(imgHeight, pageHeight - margin * 2)
      const x = (pageWidth - imgWidth) / 2
      const y = (pageHeight - finalHeight) / 2
      pdf.addImage(imgData, 'PNG', x, y, imgWidth, finalHeight)
      const fileName = `${data.personalInfo.firstName}_${data.personalInfo.lastName}_Resume.pdf`
      pdf.save(fileName)
    } catch (error) {
      console.error('Error exporting to PDF:', error)
      alert('Error exporting to PDF. Please try again.')
    }
  }

  const exportToDOCX = async () => {
    try {
      // Create a simple text-based DOCX content
      const content = `
${data.personalInfo.firstName} ${data.personalInfo.lastName}
${data.personalInfo.email} | ${data.personalInfo.phone} | ${data.personalInfo.location}

SUMMARY
${data.personalInfo.summary}

EXPERIENCE
${data.experience.map(exp => `
${exp.position} at ${exp.company}
${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}
${exp.description}
`).join('\n')}

EDUCATION
${data.education.map(edu => `
${edu.degree} in ${edu.field}
${edu.institution}
${formatDate(edu.startDate)} - ${formatDate(edu.endDate)}
`).join('\n')}

SKILLS
${data.skills.map(skill => skill.name).join(', ')}

PROJECTS
${data.projects.map(project => `
${project.name}
${project.technologies}
${project.description}
`).join('\n')}
      `.trim()

      const blob = new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
      const fileName = `${data.personalInfo.firstName}_${data.personalInfo.lastName}_Resume.docx`
      saveAs(blob, fileName)
    } catch (error) {
      console.error('Error exporting to DOCX:', error)
      alert('Error exporting to DOCX. Please try again.')
    }
  }

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-red-200 text-red-800'
      case 'intermediate': return 'bg-yellow-200 text-yellow-800'
      case 'advanced': return 'bg-blue-200 text-blue-800'
      case 'expert': return 'bg-green-200 text-green-800'
      default: return 'bg-gray-200 text-gray-800'
    }
  }

  const renderModernTemplate = () => (
    <div
      ref={resumeRef}
      className="bg-white border border-gray-200 rounded-lg p-6 mx-auto"
      style={{ width: '523pt', minHeight: '751pt' }}
    >
      {/* Header */}
      <div className="border-b-2 border-blue-600 pb-3 mb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <p className="text-sm text-gray-600 mb-2">{data.personalInfo.summary}</p>
        <div className="flex flex-wrap gap-3 text-xs text-gray-600">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
          {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
        </div>
      </div>

      {/* Experience */}
      {filteredExperiences.length > 0 && (
        <section className="mb-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            Professional Experience
          </h2>
          {filteredExperiences.slice(0, 3).map((exp, index) => (
            <div key={exp.id} className="mb-3">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-base font-semibold text-gray-900">{exp.position}</h3>
                <span className="text-xs text-gray-600">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
              <p className="text-blue-600 font-medium text-sm mb-1">{exp.company}</p>
              <p className="text-xs text-gray-600 mb-1">{exp.location}</p>
              <p className="text-gray-700 text-sm">{exp.description.substring(0, 150)}...</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
            Education
          </h2>
          {data.education.map((edu, index) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                <span className="text-sm text-gray-600">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </span>
              </div>
              <p className="text-blue-600 font-medium mb-1">{edu.institution}</p>
              {edu.gpa && <p className="text-sm text-gray-600 mb-2">GPA: {edu.gpa}</p>}
              <p className="text-gray-700">{edu.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill) => (
              <span
                key={skill.id}
                className={`px-3 py-1 rounded-full text-sm font-medium ${getSkillLevelColor(skill.level)}`}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
            Projects
          </h2>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                <span className="text-sm text-gray-600">
                  {formatDate(project.startDate)} - {formatDate(project.endDate)}
                </span>
              </div>
              <p className="text-blue-600 font-medium mb-1">{project.technologies}</p>
              <p className="text-gray-700 mb-2">{project.description}</p>
              {project.link && (
                <a href={project.link} className="text-blue-600 hover:underline text-sm">
                  View Project →
                </a>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
            Certifications
          </h2>
          {data.certifications.map((cert) => (
            <div key={cert.id} className="mb-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{cert.name}</h3>
                <span className="text-sm text-gray-600">{formatDate(cert.date)}</span>
              </div>
              <p className="text-blue-600 font-medium mb-1">{cert.issuer}</p>
              {cert.link && (
                <a href={cert.link} className="text-blue-600 hover:underline text-sm">
                  Verify Certificate →
                </a>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  )

  const renderClassicTemplate = () => (
    <div
      ref={resumeRef}
      className="bg-white border border-gray-200 rounded-lg p-8 mx-auto"
      style={{ width: '523pt', minHeight: '751pt' }}
    >
      {/* Header */}
      <div className="text-center border-b-2 border-gray-300 pb-6 mb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <div className="flex justify-center flex-wrap gap-4 text-gray-600 mb-3">
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
        </div>
        {data.personalInfo.linkedin && (
          <p className="text-blue-600">{data.personalInfo.linkedin}</p>
        )}
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{data.personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {filteredExperiences.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Professional Experience</h2>
          {filteredExperiences.map((exp) => (
            <div key={exp.id} className="mb-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                <span className="text-sm text-gray-600">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
              <p className="text-gray-700 font-medium mb-1">{exp.company}, {exp.location}</p>
              <p className="text-gray-700 leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                <span className="text-sm text-gray-600">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </span>
              </div>
              <p className="text-gray-700 font-medium mb-1">{edu.institution}</p>
              {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
              {edu.description && <p className="text-gray-700 mt-2">{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Technical Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.skills.map((skill) => (
              <div key={skill.id} className="flex justify-between items-center">
                <span className="text-gray-700">{skill.name}</span>
                <span className="text-sm text-gray-500 capitalize">{skill.level}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Projects</h2>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{project.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{project.technologies}</p>
              <p className="text-gray-700 mb-2">{project.description}</p>
              {project.link && (
                <a href={project.link} className="text-blue-600 hover:underline text-sm">
                  View Project
                </a>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Certifications</h2>
          {data.certifications.map((cert) => (
            <div key={cert.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{cert.name}</h3>
                  <p className="text-gray-600">{cert.issuer}</p>
                </div>
                <span className="text-sm text-gray-600">{formatDate(cert.date)}</span>
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  )

  const renderMinimalTemplate = () => (
    <div
      ref={resumeRef}
      className="bg-white border border-gray-200 rounded-lg p-6 mx-auto"
      style={{ width: '523pt', minHeight: '751pt' }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-light text-gray-900 mb-2">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        <div className="text-gray-600 space-y-1">
          {data.personalInfo.email && <p>{data.personalInfo.email}</p>}
          {data.personalInfo.phone && <p>{data.personalInfo.phone}</p>}
          {data.personalInfo.location && <p>{data.personalInfo.location}</p>}
          {data.personalInfo.linkedin && <p>{data.personalInfo.linkedin}</p>}
        </div>
      </div>

      {/* Summary */}
      {data.personalInfo.summary && (
        <section className="mb-8">
          <p className="text-gray-700 text-center leading-relaxed max-w-2xl mx-auto">
            {data.personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {filteredExperiences.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4 text-center">Experience</h2>
          {filteredExperiences.map((exp) => (
            <div key={exp.id} className="mb-6 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-1">{exp.position}</h3>
              <p className="text-gray-600 mb-1">{exp.company}</p>
              <p className="text-sm text-gray-500 mb-2">
                {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
              </p>
              <p className="text-gray-700 max-w-2xl mx-auto">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4 text-center">Education</h2>
          {data.education.map((edu) => (
            <div key={edu.id} className="mb-4 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-1">{edu.degree} in {edu.field}</h3>
              <p className="text-gray-600 mb-1">{edu.institution}</p>
              <p className="text-sm text-gray-500">
                {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4 text-center">Skills</h2>
          <div className="flex justify-center flex-wrap gap-3">
            {data.skills.map((skill) => (
              <span key={skill.id} className="text-gray-700">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section>
          <h2 className="text-lg font-medium text-gray-900 mb-4 text-center">Projects</h2>
          {data.projects.map((project) => (
            <div key={project.id} className="mb-4 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-1">{project.name}</h3>
              <p className="text-gray-600 mb-2">{project.technologies}</p>
              <p className="text-gray-700 max-w-2xl mx-auto">{project.description}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  )

  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return renderModernTemplate()
      case 'classic':
        return renderClassicTemplate()
      case 'minimal':
        return renderMinimalTemplate()
      // 'ats' removed
      default:
        return renderModernTemplate()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Resume Preview</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button size="sm" onClick={exportToPDF}>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm" onClick={exportToDOCX}>
            <FileText className="w-4 h-4 mr-2" />
            Export DOCX
          </Button>
        </div>
      </div>
      
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {renderTemplate()}
      </div>
    </motion.div>
  )
}
