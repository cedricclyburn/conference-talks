# Local Deployment Guide

This guide walks you through deploying the Blackjack AI Game locally for development and testing.

## Prerequisites

- Node.js 18+ and npm
- Docker or Podman
- Access to AI models (local or remote)

## Local Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env.local` file with your configuration:

```bash
# AI Model Configuration
VITE_USE_LOCAL_AI=true
VITE_LOCAL_AI_ENDPOINT=http://localhost:8080
VITE_REMOTE_AI_ENDPOINT=https://your-remote-endpoint
VITE_REMOTE_AI_KEY=your-api-key

# Performance Monitoring
VITE_SHOW_PERFORMANCE_MONITOR=true

# MAAS Configuration (optional)
MAAS_API_KEY=your-maas-key
MAAS_ENDPOINT=https://your-maas-endpoint
MAAS_MODEL=your-model-name
```

### 3. Run Local AI Model (Optional)

If using local AI, start a Llama model locally:

```bash
# Using Ollama
ollama run llama3.2:1b

# Or using Ramalama
ramalama serve --model llama3.2:1b --port 8080
```

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Local Container Testing

### Build Container

```bash
docker build -t blackjack-ai-game .
```

### Run Container

```bash
docker run -p 8080:8080 \
  -e VITE_USE_LOCAL_AI=true \
  -e VITE_LOCAL_AI_ENDPOINT=http://host.docker.internal:11434 \
  blackjack-ai-game
```

## Performance Testing

The local deployment includes performance monitoring tools:

1. Enable performance overlay: Set `VITE_SHOW_PERFORMANCE_MONITOR=true`
2. Monitor AI response times in the UI
3. Compare local vs remote model performance

## Troubleshooting

### Common Issues

1. **AI Model Not Responding**
   - Verify your AI endpoint is accessible
   - Check API keys are correctly configured
   - Ensure model is properly loaded

2. **Port Conflicts**
   - Change development port: `npm run dev -- --port 3000`
   - Verify no other services are using port 8080

3. **Environment Variables Not Loading**
   - Restart development server after changing `.env.local`
   - Verify VITE_ prefix for client-side variables

### Debug Mode

Enable debug logging:

```bash
DEBUG=blackjack:* npm run dev
```

## Next Steps

Once local development is working, deploy to OpenShift using the main deployment guide.