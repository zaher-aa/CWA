# 🚀 CWA Tab Generator - Deployment Guide

## What is Lambda?

**AWS Lambda** is a "serverless" computing service that runs your code without you managing servers. For Assignment 2, Lambda functions serve your APIs automatically:

- **Automatic scaling** - Handles traffic spikes
- **Pay per use** - Only charged when code runs
- **No server management** - AWS handles everything
- **Perfect for APIs** - Your CRUD operations become Lambda functions

## Deployment Options

### Option 1: Vercel (Easiest - Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

3. **Features:**
   - ✅ Automatic Lambda functions for API routes
   - ✅ CDN for static files
   - ✅ Database works out of the box
   - ✅ HTTPS enabled
   - ✅ Free tier available

### Option 2: AWS Lambda (Advanced)

1. **Prerequisites:**
   - AWS account with configured credentials
   - Serverless Framework: `npm install -g serverless`

2. **Deploy:**
   ```bash
   ./deploy.sh
   ```

3. **Features:**
   - ✅ Full AWS ecosystem
   - ✅ RDS database option
   - ✅ Custom domains
   - ✅ More control

### Option 3: Docker (Local/Cloud)

1. **Local Testing:**
   ```bash
   docker-compose up --build
   ```

2. **Cloud Deploy:**
   - Push to Docker Hub
   - Deploy to AWS ECS, Google Cloud Run, or Azure Container Instances

## Lambda Functions Created

Your app automatically creates these Lambda functions:

1. **`/api/tabs`** - Tab CRUD operations
   - GET: List all saved tab configurations
   - POST: Save new tab configuration
   - DELETE: Remove tab configuration

2. **`/api/court-room`** - Court Room game data
   - GET: Retrieve game sessions
   - POST: Save game results

3. **Static Site** - Your React/Next.js frontend
   - Served from CDN
   - Optimized for performance

## Why Lambda for Assignment 2?

- **Meets "Cloud Deployment" requirement** ✅
- **Demonstrates modern serverless architecture** ✅  
- **Shows understanding of scalable web apps** ✅
- **Easy to explain in assignment documentation** ✅

## Quick Start (Recommended)

```bash
# 1. Install Vercel
npm install -g vercel

# 2. Deploy (follow prompts)
vercel

# 3. Production deploy
vercel --prod
```

Your app will be live at `https://your-app-name.vercel.app` with Lambda functions handling all API calls!