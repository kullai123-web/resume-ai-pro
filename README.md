# ResumeAI Pro - Smart Resume Builder & AI Analyzer

A comprehensive resume building and analysis platform with AI-powered insights, ATS optimization, and professional templates.

## Features

- 🚀 **ATS-Optimized Builder** - Create resumes that pass through Applicant Tracking Systems
- 🤖 **AI-Powered Analysis** - Get detailed insights and improvement suggestions
- 📊 **Job Description Matching** - Compare resumes against job requirements
- 🎨 **Professional Templates** - Multiple ATS-friendly design options
- 📱 **Responsive Design** - Works perfectly on all devices
- 🔐 **User Authentication** - Secure login with Google and GitHub
- 💾 **Cloud Storage** - Save and manage multiple resumes

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Authentication**: NextAuth.js
- **Database**: MongoDB with Mongoose
- **AI Services**: OpenAI GPT-4, Google Gemini
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database
- OpenAI API key (optional)
- Google Gemini API key (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ats-resume-builder-ai-analyzer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your environment variables in `.env.local`:
   - `MONGODB_URI` - Your MongoDB connection string
   - `NEXTAUTH_SECRET` - Random secret for NextAuth
   - `NEXTAUTH_URL` - Your app URL (http://localhost:3000 for development)
   - OAuth provider credentials (Google, GitHub)
   - AI API keys (OpenAI, Gemini)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment to Vercel

### 1. Prepare Your Repository

Ensure your code is committed and pushed to GitHub:
```bash
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

### 2. Deploy to Vercel

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository

2. **Configure Environment Variables**
   In your Vercel project settings, add these environment variables:
   ```
   MONGODB_URI=your-mongodb-connection-string
   NEXTAUTH_SECRET=your-nextauth-secret
   NEXTAUTH_URL=https://your-domain.vercel.app
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   OPENAI_API_KEY=your-openai-api-key
   GEMINI_API_KEY=your-gemini-api-key
   NODE_ENV=production
   ```

### 3. Build Configuration

The project includes optimized build settings for Vercel:
- `vercel.json` - Vercel-specific configuration
- `next.config.js` - Next.js optimizations for production
- Middleware for security headers and CORS
- Error boundaries for better error handling

### 4. Post-Deployment

After deployment:
1. Test all functionality on your live site
2. Verify environment variables are working
3. Check that authentication flows work correctly
4. Test resume building and analysis features

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Ensure all dependencies are installed
   - Check TypeScript compilation with `npm run type-check`
   - Verify environment variables are set

2. **Authentication Issues**
   - Verify OAuth provider credentials
   - Check `NEXTAUTH_URL` matches your domain
   - Ensure `NEXTAUTH_SECRET` is set

3. **Database Connection**
   - Verify MongoDB connection string
   - Check network access to MongoDB
   - Ensure database user has proper permissions

4. **AI Service Errors**
   - Verify API keys are valid
   - Check API rate limits
   - Ensure proper error handling

### Performance Optimization

- Images are optimized for web delivery
- Code splitting for better load times
- Caching strategies for static assets
- Bundle analysis and optimization

## Project Structure

```
ats-resume-builder-ai-analyzer/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes
│   ├── analyzer/          # Resume analysis page
│   ├── builder/           # Resume builder page
│   ├── dashboard/         # User dashboard
│   └── layout.tsx         # Root layout
├── components/             # Reusable components
│   ├── ui/                # UI components
│   └── providers/         # Context providers
├── lib/                    # Utility functions
├── models/                 # Database models
├── public/                 # Static assets
└── middleware.ts           # Edge middleware
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue on GitHub
- Check the troubleshooting section
- Review the deployment checklist

---

**Built with ❤️ using Next.js, React, and modern web technologies**
