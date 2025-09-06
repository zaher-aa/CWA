#!/bin/bash
# Deployment script for CWA Tab Generator

echo "🚀 Starting deployment process..."

# Install serverless framework if not present
if ! command -v serverless &> /dev/null; then
    echo "Installing Serverless Framework..."
    npm install -g serverless
fi

# Install serverless plugins
echo "Installing deployment plugins..."
npm install --save-dev serverless-nextjs-plugin

# Build the application
echo "Building Next.js application..."
npm run build

# Generate Prisma client for production
echo "Generating Prisma client..."
npx prisma generate

# Deploy to AWS Lambda
echo "Deploying to AWS Lambda..."
serverless deploy

echo "✅ Deployment complete!"
echo ""
echo "📋 Post-deployment steps:"
echo "1. Update environment variables in AWS Lambda console"
echo "2. Configure custom domain (if needed)"
echo "3. Set up database connection string"
echo "4. Test API endpoints"
echo ""
echo "🌐 Your app should be available at the Lambda function URL"