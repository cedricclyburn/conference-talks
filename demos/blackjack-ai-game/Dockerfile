# Multi-stage build for Vue.js application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage with nginx
FROM nginx:alpine

# OpenShift compatibility - run as non-root user
RUN chgrp -R 0 /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html && \
    chmod -R g=u /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html && \
    chown -R nginx:0 /var/cache/nginx /var/run /var/log/nginx /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Create a script to inject environment variables at runtime
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh && chown nginx:0 /docker-entrypoint.sh

# Expose port 8080 (non-privileged port for OpenShift)
EXPOSE 8080

# Switch to nginx user for OpenShift
USER nginx

# Use custom entrypoint to handle environment variables
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]