# Blackjack AI Game ♠️♥️♣️♦️ 🧠

> An AI-enhanced blackjack game for demonstrating local vs remote AI model performance

## 🎯 Overview

This is a Vue 3 blackjack game enhanced with AI capabilities that demonstrates the performance differences between local and remote AI models. The game features an AI advisor that tells players what "the book says" - providing optimal blackjack basic strategy recommendations.

### Key Features

- 🎮 **Full Blackjack Game**: Complete implementation with betting, splitting, doubling down
- 🧠 **AI Strategy Advisor**: Get recommendations from AI models using basic strategy
- ⚡ **Performance Comparison**: Real-time monitoring of local vs remote AI response times
- 🖥️ **Local AI**: Llama 3.2 1B running locally with Ramalama
- ☁️ **Remote AI**: Llama 3.2 3B running on vLLM remote endpoint
- 📊 **Session Tracking**: Multi-player session support with statistics
- 🔬 **Performance Monitoring**: Detailed metrics overlay for model comparison
- 🚀 **OpenShift Ready**: Complete deployment configurations included

![Screenshot](./public/screenshot.png)

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blackjack-ai-game
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment** (copy and modify as needed)
   ```bash
   cp .env.example .env.local
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

### With Local AI (Ramalama)

1. **Start with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Access the game**
   - Frontend: http://localhost:3000
   - Ramalama API: http://localhost:8080

## 🛠️ Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_USE_LOCAL_AI` | Use local Ramalama model | `true` |
| `VITE_LOCAL_AI_ENDPOINT` | Local AI endpoint URL | `http://localhost:8080` |
| `VITE_REMOTE_AI_ENDPOINT` | Remote vLLM endpoint URL | `https://llama-3-2-3b-maas-apicast-production.apps.prod.rhoai.rh-aiservices-bu.com:443` |
| `VITE_REMOTE_AI_KEY` | API key for remote endpoint | `your_api_key_here` |
| `VITE_SHOW_PERFORMANCE_MONITOR` | Show performance overlay by default | `false` |

### Model Configuration

The game supports two AI models:

1. **Local Model (Ramalama)**
   - Model: Llama 3.2 1B Instruct
   - Runs locally in Docker container
   - Faster inference but smaller model
   - Perfect for development and demos

2. **Remote Model (vLLM)**
   - Model: Llama 3.2 3B Instruct
   - Hosted remote endpoint
   - Higher latency but more capable model
   - Production-ready scaling

## 🎮 How to Play

1. **Start the game** - A new session begins automatically
2. **Place your bet** - Game starts with a $1 minimum bet
3. **Get your cards** - Two cards dealt to you, one to dealer
4. **Ask the AI** - Click "🧠 What does the book say?" for strategy advice
5. **Make your move** - Hit, Stand, Double Down, or Split based on AI recommendation
6. **Compare performance** - Toggle the performance monitor (🔬) to see AI metrics

### AI Strategy Advisor

The AI advisor uses basic blackjack strategy to recommend optimal plays:
- **Hit**: Take another card
- **Stand**: Keep current hand
- **Double Down**: Double bet and take exactly one more card
- **Split**: Split pairs into two hands

## 📊 Performance Monitoring

Click the 🔬 icon to view:
- Real-time response times for both models
- Success rates and error tracking
- Session statistics and global usage metrics
- Model switching capabilities
- Performance comparison charts

## 🐳 Docker Deployment

### Local Development with Ramalama

```bash
# Start all services
docker-compose up --build

# Production deployment (remote AI only)
docker-compose -f docker-compose.prod.yml up --build
```

### Custom Configuration

```bash
# Override environment variables
VITE_USE_LOCAL_AI=false docker-compose up
```

## ☁️ OpenShift Deployment

### Prerequisites

- OpenShift cluster access
- `oc` CLI tool installed
- Container registry access

### Deployment Steps

1. **Apply configurations**
   ```bash
   oc apply -k openshift/
   ```

2. **Build the application**
   ```bash
   oc start-build blackjack-ai-game
   ```

3. **Monitor deployment**
   ```bash
   oc get pods -n blackjack-ai-demo
   oc logs -f deployment/blackjack-frontend
   ```

4. **Get the route URL**
   ```bash
   oc get route blackjack-frontend-route -n blackjack-ai-demo
   ```

### Manual Deployment

```bash
# Create namespace
oc apply -f openshift/namespace.yaml

# Deploy components
oc apply -f openshift/configmap.yaml
oc apply -f openshift/secret.yaml
oc apply -f openshift/ramalama-deployment.yaml
oc apply -f openshift/frontend-deployment.yaml
oc apply -f openshift/redis-deployment.yaml
```

### Switching Between Local and Remote AI

To switch from local Ramalama to remote vLLM in OpenShift:

```bash
oc patch deployment blackjack-frontend -n blackjack-ai-demo -p '{"spec":{"template":{"spec":{"containers":[{"name":"blackjack-frontend","env":[{"name":"VITE_USE_LOCAL_AI","value":"false"}]}]}}}}'
```

## 🔧 Development

### Scripts

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Quality
npm run type-check   # TypeScript checking
npm run lint         # ESLint with auto-fix
npm run format       # Prettier formatting

# Testing
npm run test:unit    # Run unit tests
```

### Project Structure

```
src/
├── components/          # Vue components
│   ├── AiRecommendation.vue       # AI advisor UI
│   ├── PerformanceOverlay.vue     # Performance monitoring
│   └── ...
├── services/           # Business logic
│   ├── aiService.ts              # AI API integration
│   └── sessionService.ts         # Session management
├── store.ts           # Game state management
└── types.ts           # TypeScript definitions

openshift/             # OpenShift deployment configs
docker-compose.yml     # Local development setup
Dockerfile            # Container build configuration
```

## 🎯 Demo Scenarios

### 1. Performance Comparison Demo

1. Start the game with performance monitoring enabled
2. Ask AI for recommendations using local model
3. Switch to remote model and compare response times
4. Show real-time metrics in the performance overlay

### 2. Load Testing Demo

1. Open multiple browser tabs/sessions
2. Generate concurrent AI requests
3. Monitor how local vs remote models handle load
4. Observe performance degradation patterns

### 3. Model Quality Comparison

1. Play several hands with each model
2. Compare recommendation quality and consistency
3. Track accuracy using the confidence scores
4. Analyze success rates over time

## 🛡️ Game Rules

- Initial bet: $1 minimum
- 6 decks, reshuffled at 25% remaining
- Blackjack pays 3:2
- Dealer stands on soft 17
- Double down on any two cards
- Split pairs (no re-splitting)
- No insurance available

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📝 License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2025, AI Demo Project

---

Built with ❤️ using Vue 3, TypeScript, and modern AI technologies.
