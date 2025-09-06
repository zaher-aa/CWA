# Use the official Node.js 18 image as base
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of the application
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Create database
RUN npx prisma migrate deploy

# Build the application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Create a non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership of the app directory
RUN chown -R nextjs:nodejs /app
USER nextjs

# Start the application
CMD ["npm", "start"]