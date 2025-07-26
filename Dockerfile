FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Clean install to avoid platform issues
RUN rm -rf package-lock.json node_modules 2>/dev/null || true
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Verify dist exists and has content
RUN test -d /app/dist && test "$(ls -A /app/dist)" || (echo "Build failed - dist folder empty or missing" && exit 1)

# Production stage  
FROM nginx:alpine AS production

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]