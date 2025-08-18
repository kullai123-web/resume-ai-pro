'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm, useFieldArray } from 'react-hook-form'
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Code, 
  Award, 
  FileText,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Save
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import dynamic from 'next/dynamic'

// Lazy load the ResumePreview component for better performance
const ResumePreview = dynamic(() => import('@/components/ResumePreview').then(mod => ({ default: mod.ResumePreview })), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg flex items-center justify-center">
    <div className="text-gray-500">Loading preview...</div>
  </div>,
  ssr: false
})


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

const steps = [
  { id: 1, title: 'Personal Info', icon: User },
  { id: 2, title: 'Education', icon: GraduationCap },
  { id: 3, title: 'Experience', icon: Briefcase },
  { id: 4, title: 'Skills', icon: Code },
  { id: 5, title: 'Projects', icon: FileText },
  { id: 6, title: 'Certifications', icon: Award },
]

export default function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState('modern')
  const [showPreview, setShowPreview] = useState(false)

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResumeData>({
    defaultValues: {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        summary: '',
      },
      education: [{ id: '1', institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '', description: '' }],
      experience: [{ id: '1', company: '', position: '', location: '', startDate: '', endDate: '', current: false, description: '', achievements: [] }],
      skills: [{ id: '1', name: '', level: 'intermediate' }],
      projects: [{ id: '1', name: '', description: '', technologies: '', link: '', startDate: '', endDate: '' }],
      certifications: [{ id: '1', name: '', issuer: '', date: '', link: '' }],
    },
  })

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: 'education',
  })

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control,
    name: 'experience',
  })

  const { fields: skillsFields, append: appendSkill, remove: removeSkill } = useFieldArray({
    control,
    name: 'skills',
  })

  const { fields: projectsFields, append: appendProject, remove: removeProject } = useFieldArray({
    control,
    name: 'projects',
  })

  const { fields: certificationsFields, append: appendCertification, remove: removeCertification } = useFieldArray({
    control,
    name: 'certifications',
  })

  const watchedData = watch()

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = (data: ResumeData) => {
    console.log('Resume data:', data)
    // Handle form submission
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  {...register('personalInfo.firstName', { required: 'First name is required' })}
                  className="input-field"
                  placeholder="John"
                />
                {errors.personalInfo?.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.personalInfo.firstName.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  {...register('personalInfo.lastName', { required: 'Last name is required' })}
                  className="input-field"
                  placeholder="Doe"
                />
                {errors.personalInfo?.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.personalInfo.lastName.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  {...register('personalInfo.email', { 
                    required: 'Email is required',
                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' }
                  })}
                  type="email"
                  className="input-field"
                  placeholder="john.doe@example.com"
                />
                {errors.personalInfo?.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.personalInfo.email.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  {...register('personalInfo.phone')}
                  className="input-field"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  {...register('personalInfo.location')}
                  className="input-field"
                  placeholder="San Francisco, CA"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                <input
                  {...register('personalInfo.linkedin')}
                  className="input-field"
                  placeholder="linkedin.com/in/johndoe"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Professional Summary</label>
              <textarea
                {...register('personalInfo.summary')}
                rows={4}
                className="input-field"
                placeholder="A brief summary of your professional background and career objectives..."
              />
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">Education</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => appendEducation({ 
                  id: Date.now().toString(), 
                  institution: '', 
                  degree: '', 
                  field: '', 
                  startDate: '', 
                  endDate: '', 
                  gpa: '', 
                  description: '' 
                })}
              >
                Add Education
              </Button>
            </div>
            {educationFields.map((field, index) => (
              <div key={field.id} className="card">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-semibold">Education #{index + 1}</h4>
                  {educationFields.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEducation(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Institution</label>
                    <input
                      {...register(`education.${index}.institution`)}
                      className="input-field"
                      placeholder="University of California"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                    <input
                      {...register(`education.${index}.degree`)}
                      className="input-field"
                      placeholder="Bachelor of Science"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study</label>
                    <input
                      {...register(`education.${index}.field`)}
                      className="input-field"
                      placeholder="Computer Science"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">GPA</label>
                    <input
                      {...register(`education.${index}.gpa`)}
                      className="input-field"
                      placeholder="3.8"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      {...register(`education.${index}.startDate`)}
                      type="date"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                      {...register(`education.${index}.endDate`)}
                      type="date"
                      className="input-field"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    {...register(`education.${index}.description`)}
                    rows={3}
                    className="input-field"
                    placeholder="Relevant coursework, achievements, or activities..."
                  />
                </div>
              </div>
            ))}
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">Work Experience</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => appendExperience({ 
                  id: Date.now().toString(), 
                  company: '', 
                  position: '', 
                  location: '', 
                  startDate: '', 
                  endDate: '', 
                  current: false, 
                  description: '', 
                  achievements: [] 
                })}
              >
                Add Experience
              </Button>
            </div>
            {experienceFields.map((field, index) => (
              <div key={field.id} className="card">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-semibold">Experience #{index + 1}</h4>
                  {experienceFields.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExperience(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                    <input
                      {...register(`experience.${index}.company`)}
                      className="input-field"
                      placeholder="Google Inc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                    <input
                      {...register(`experience.${index}.position`)}
                      className="input-field"
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      {...register(`experience.${index}.location`)}
                      className="input-field"
                      placeholder="Mountain View, CA"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                      <input
                        {...register(`experience.${index}.startDate`)}
                        type="date"
                        className="input-field"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                      <input
                        {...register(`experience.${index}.endDate`)}
                        type="date"
                        className="input-field"
                        disabled={watch(`experience.${index}.current`)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="flex items-center space-x-2">
                    <input
                      {...register(`experience.${index}.current`)}
                      type="checkbox"
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm font-medium text-gray-700">I currently work here</span>
                  </label>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    {...register(`experience.${index}.description`)}
                    rows={4}
                    className="input-field"
                    placeholder="Describe your responsibilities and achievements..."
                  />
                </div>
              </div>
            ))}
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">Skills</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => appendSkill({ 
                  id: Date.now().toString(), 
                  name: '', 
                  level: 'intermediate' 
                })}
              >
                Add Skill
              </Button>
            </div>
            {skillsFields.map((field, index) => (
              <div key={field.id} className="card">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-semibold">Skill #{index + 1}</h4>
                  {skillsFields.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSkill(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Skill Name</label>
                    <input
                      {...register(`skills.${index}.name`)}
                      className="input-field"
                      placeholder="JavaScript"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Proficiency Level</label>
                    <select
                      {...register(`skills.${index}.level`)}
                      className="input-field"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">Projects</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => appendProject({ 
                  id: Date.now().toString(), 
                  name: '', 
                  description: '', 
                  technologies: '', 
                  link: '', 
                  startDate: '', 
                  endDate: '' 
                })}
              >
                Add Project
              </Button>
            </div>
            {projectsFields.map((field, index) => (
              <div key={field.id} className="card">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-semibold">Project #{index + 1}</h4>
                  {projectsFields.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeProject(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                    <input
                      {...register(`projects.${index}.name`)}
                      className="input-field"
                      placeholder="E-commerce Platform"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Technologies</label>
                    <input
                      {...register(`projects.${index}.technologies`)}
                      className="input-field"
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                    <input
                      {...register(`projects.${index}.startDate`)}
                      type="date"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                    <input
                      {...register(`projects.${index}.endDate`)}
                      type="date"
                      className="input-field"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Project Link</label>
                    <input
                      {...register(`projects.${index}.link`)}
                      className="input-field"
                      placeholder="https://github.com/username/project"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    {...register(`projects.${index}.description`)}
                    rows={3}
                    className="input-field"
                    placeholder="Describe the project, your role, and key achievements..."
                  />
                </div>
              </div>
            ))}
          </motion.div>
        )

      case 6:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">Certifications</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => appendCertification({ 
                  id: Date.now().toString(), 
                  name: '', 
                  issuer: '', 
                  date: '', 
                  link: '' 
                })}
              >
                Add Certification
              </Button>
            </div>
            {certificationsFields.map((field, index) => (
              <div key={field.id} className="card">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-semibold">Certification #{index + 1}</h4>
                  {certificationsFields.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCertification(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Certification Name</label>
                    <input
                      {...register(`certifications.${index}.name`)}
                      className="input-field"
                      placeholder="AWS Certified Solutions Architect"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Issuing Organization</label>
                    <input
                      {...register(`certifications.${index}.issuer`)}
                      className="input-field"
                      placeholder="Amazon Web Services"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Earned</label>
                    <input
                      {...register(`certifications.${index}.date`)}
                      type="date"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Verification Link</label>
                    <input
                      {...register(`certifications.${index}.link`)}
                      className="input-field"
                      placeholder="https://credly.com/badges/..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                        currentStep >= step.id 
                          ? 'bg-primary-600 border-primary-600 text-white' 
                          : 'border-gray-300 text-gray-500'
                      }`}>
                        <step.icon className="w-5 h-5" />
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`w-16 h-0.5 mx-2 ${
                          currentStep > step.id ? 'bg-primary-600' : 'bg-gray-300'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {steps[currentStep - 1].title}
                  </h2>
                  <p className="text-gray-600">Step {currentStep} of {steps.length}</p>
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <AnimatePresence mode="wait">
                  {renderStepContent()}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>

                  {currentStep < steps.length ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-2"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  ) : (
                    <div className="flex gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowPreview(!showPreview)}
                        className="flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Preview
                      </Button>
                      <Button
                        type="submit"
                        className="flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Save Resume
                      </Button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPreview(!showPreview)}
                  >
                    {showPreview ? 'Hide' : 'Show'} Full Preview
                  </Button>
                </div>
                
                {showPreview ? (
                  <ResumePreview data={watchedData} template={selectedTemplate} />
                ) : (
                  <div className="space-y-4">
                    <div className="text-center py-8">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm">Preview will appear here</p>
                    </div>
                    
                    {/* Template Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Template</label>
                      <select
                        value={selectedTemplate}
                        onChange={(e) => setSelectedTemplate(e.target.value)}
                        className="input-field"
                      >
                        <option value="modern">Modern</option>
                        <option value="classic">Classic</option>
                        <option value="minimal">Minimal</option>
                        
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
