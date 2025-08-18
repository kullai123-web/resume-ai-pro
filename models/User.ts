import mongoose, { Document, Schema } from 'mongoose'

interface IResume {
  id: string
  name: string
  data: any
  template: string
  createdAt: Date
  updatedAt: Date
}

interface IAnalysisHistory {
  id: string
  resumeId: string
  analysis: any
  createdAt: Date
}

export interface IUser extends Document {
  email: string
  name: string
  image?: string
  resumes: IResume[]
  analysisHistory: IAnalysisHistory[]
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  resumes: [{
    id: String,
    name: String,
    data: Schema.Types.Mixed,
    template: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  }],
  analysisHistory: [{
    id: String,
    resumeId: String,
    analysis: Schema.Types.Mixed,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
}, {
  timestamps: true,
})

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema)
