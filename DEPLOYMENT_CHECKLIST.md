# 🚀 Vercel Deployment Checklist

## Pre-Deployment Setup

### 1. Environment Variables
Ensure these environment variables are set in your Vercel project:

```bash
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# NextAuth Configuration
NEXTAUTH_SECRET=your-nextauth-secret-key-here
NEXTAUTH_URL=https://your-domain.vercel.app

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# AI Services
OPENAI_API_KEY=your-openai-api-key
GEMINI_API_KEY=your-gemini-api-key

# Environment
NODE_ENV=production
```

### 2. OAuth Provider Configuration
Update your OAuth provider settings:

#### Google OAuth
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Add your Vercel domain to authorized redirect URIs:
  - `https://your-domain.vercel.app/api/auth/callback/google`

#### GitHub OAuth
- Go to [GitHub Developer Settings](https://github.com/settings/developers)
- Update callback URL to:
  - `https://your-domain.vercel.app/api/auth/callback/github`

### 3. MongoDB Configuration
- Ensure your MongoDB cluster allows connections from Vercel's IP ranges
- Check that your connection string is correct
- Verify database user permissions

## Deployment Steps

### 1. Push Code to GitHub
```bash
git add .
git commit -m "Prepare for production deployment"
git push origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Configure environment variables
6. Click "Deploy"

### 3. Post-Deployment Verification
- [ ] Check build logs for errors
- [ ] Verify all pages load correctly
- [ ] Test authentication flows
- [ ] Check API endpoints
- [ ] Test resume builder functionality
- [ ] Test resume analyzer functionality
- [ ] Verify database connections

## Troubleshooting Common Issues

### Build Failures
```bash
# Clean and rebuild
npm run clean
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 404 Errors
1. Check Vercel build logs
2. Verify environment variables
3. Check API route exports
4. Verify file paths and imports

### Database Connection Issues
1. Check MongoDB connection string
2. Verify IP whitelisting
3. Check user permissions
4. Test connection locally

### Authentication Issues
1. Verify OAuth provider settings
2. Check redirect URIs
3. Verify environment variables
4. Check NextAuth configuration

## Health Check Endpoints

### API Health Check
- **URL**: `/api/health`
- **Method**: GET
- **Purpose**: Verify service status and database connectivity

### Expected Response
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "environment": "production",
    "services": {
      "database": "connected",
      "ai": "available"
    }
  }
}
```

## Performance Monitoring

### Vercel Analytics
- Enable Vercel Analytics in your project settings
- Monitor Core Web Vitals
- Track user experience metrics

### Error Monitoring
- Check Vercel function logs
- Monitor API response times
- Watch for 500 errors

## Security Checklist

- [ ] Environment variables are properly set
- [ ] OAuth providers are configured correctly
- [ ] CORS headers are properly set
- [ ] Security headers are enabled
- [ ] API rate limiting is configured
- [ ] Input validation is implemented

## Rollback Plan

If deployment fails:
1. Check Vercel deployment logs
2. Identify the specific issue
3. Fix the problem locally
4. Test with `npm run build`
5. Redeploy

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)

---

**Last Updated**: January 2024
**Version**: 1.0.0
