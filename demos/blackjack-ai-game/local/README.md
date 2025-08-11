# Local Development Environment

This directory contains configuration and scripts for running the Blackjack AI Game locally.

## Quick Start

### 1. Local AI Model Setup

Choose your preferred AI model runtime:

#### Option A: Using Ollama

```bash
# Install and run Llama 3.2 1B
ollama pull llama3.2:1b
ollama serve
```

#### Option B: Using Ramalama

```bash
# Install and run with Ramalama
ramalama serve --model llama3.2:1b --port 8080
```

### 2. Frontend Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Configuration Files

### Environment Variables

Create `.env.local` in the project root:

```bash
# Copy from template
cp .env.example .env.local

# Edit with your settings
VITE_USE_LOCAL_AI=true
VITE_LOCAL_AI_ENDPOINT=http://localhost:11434
VITE_SHOW_PERFORMANCE_MONITOR=true
```

### Local Model Testing

Test your AI model setup:

```bash
# Test local model endpoint
curl -X POST http://localhost:11434/api/generate \
  -H "Content-Type: application/json" \
  -d '{"model": "llama3.2:1b", "prompt": "What is basic blackjack strategy for hard 16 vs dealer 10?", "stream": false}'
```

## Development Workflow

### 1. Model Development
- Test AI prompts and responses
- Optimize model parameters
- Benchmark response times

### 2. Frontend Development  
- Component development with hot reload
- Real-time performance monitoring
- Interactive testing with live models

### 3. Integration Testing
- End-to-end game flow testing
- Model switching validation
- Performance comparison verification

## Debugging

### Enable Debug Logging

```bash
# Frontend debugging
DEBUG=blackjack:* npm run dev

# Model debugging
OLLAMA_DEBUG=1 ollama serve
```

### Common Issues

1. **Model not responding**: Check if model service is running
2. **CORS errors**: Verify AI endpoint configuration
3. **Performance issues**: Monitor browser DevTools network tab

## Performance Profiling

### Frontend Performance
- Use Vue DevTools for component profiling
- Monitor network requests in browser
- Analyze bundle size with `npm run build --analyze`

### AI Model Performance
- Track response times in performance overlay
- Compare local vs remote model speeds
- Monitor resource usage during gameplay

## Container Development

### Local Container Testing

```bash
# Build image
docker build -t blackjack-ai-local .

# Run with local AI
docker run -p 8080:8080 \
  -e VITE_USE_LOCAL_AI=true \
  -e VITE_LOCAL_AI_ENDPOINT=http://host.docker.internal:11434 \
  blackjack-ai-local
```

### Development Compose

Create `docker-compose.dev.yml` for full stack:

```yaml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "8080:8080"
    environment:
      - VITE_USE_LOCAL_AI=true
      - VITE_LOCAL_AI_ENDPOINT=http://ollama:11434
    depends_on:
      - ollama

  ollama:
    image: ollama/ollama
    ports:
      - "11434:11434"
    volumes:
      - ollama_data:/root/.ollama

volumes:
  ollama_data:
```

## Next Steps

Once local development is working, proceed to OpenShift deployment following the main README instructions.