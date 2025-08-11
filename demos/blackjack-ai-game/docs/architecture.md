# Blackjack AI Game Architecture

## Overview

The Blackjack AI Game demonstrates modern AI integration patterns in gaming applications, showcasing performance differences between local and remote AI models through an interactive blackjack experience.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                   User Interface                               │
│                            Vue 3 + TypeScript Frontend                         │
└─────────────────┬───────────────────────────────────────────────┬─────────────┘
                  │                                               │
                  v                                               v
┌─────────────────────────────────────────────┐   ┌───────────────────────────────┐
│             Local AI Model                  │   │        Remote AI Model        │
│          Llama 3.2 1B (Ramalama)           │   │      Llama 3.2 3B (vLLM)     │
│         Fast Response (~2-4s)               │   │    Higher Accuracy (~6-10s)   │
└─────────────────────────────────────────────┘   └───────────────────────────────┘
                  │                                               │
                  v                                               v
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            AI Strategy Service                                 │
│                      Basic Strategy Fallback Logic                             │
└─────────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       v
┌─────────────────────────────────────────────────────────────────────────────────┐
│                          Game State Management                                 │
│                    Vue Reactive Store + Session Tracking                       │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Core Components

### Frontend Layer
- **Vue 3 Application**: Modern reactive framework with composition API
- **TypeScript**: Full type safety across the codebase
- **Performance Monitoring**: Real-time AI model comparison metrics
- **Audio System**: Game sound effects using Howler.js
- **Responsive Design**: Mobile-first UI with smooth animations

### AI Integration Layer
- **Dual Model Support**: Seamless switching between local and remote models
- **Strategy Service**: AI-powered blackjack basic strategy recommendations
- **Fallback Logic**: Automatic fallback to rule-based strategy on AI failure
- **Performance Tracking**: Response time and accuracy monitoring

### Game Logic Layer
- **State Management**: Centralized reactive state using Vue's reactivity system
- **Card Engine**: Complete deck management with proper shuffling algorithms
- **Rules Engine**: Full blackjack implementation (splitting, doubling, etc.)
- **Session Management**: Multi-player session support with statistics

### Infrastructure Layer
- **OpenShift Deployment**: Container orchestration with Kubernetes
- **MCP Integration**: Message Control Protocol for AI model communication
- **Configuration Management**: Environment-based configuration system
- **Health Monitoring**: Readiness and liveness probes

## Data Flow

### Game Turn Flow
1. Player places bet and receives cards
2. UI requests AI recommendation from strategy service
3. AI service calls appropriate model (local/remote) with game state
4. Model returns strategy recommendation (Hit/Stand/Double/Split)
5. Player executes action based on recommendation
6. Game state updates and performance metrics recorded
7. Results displayed with timing information

### AI Model Selection
```typescript
// Automatic model selection based on configuration
const model = useLocalAI ? 'local-llama-3.2-1b' : 'remote-llama-3.2-3b';
const endpoint = useLocalAI ? LOCAL_AI_ENDPOINT : REMOTE_AI_ENDPOINT;
const timeout = useLocalAI ? 8000 : 10000; // Different timeouts
```

### Performance Monitoring
- Response time tracking for each AI call
- Success/failure rate monitoring
- Model comparison metrics
- Session-based statistics aggregation

## Deployment Architecture

### OpenShift Components
- **Frontend Pod**: Vue.js application served via Nginx
- **AI Model Pods**: Separate pods for local and remote model access
- **ConfigMaps**: Environment configuration and feature flags
- **Secrets**: API keys and sensitive configuration
- **Services**: Internal networking between components
- **Routes**: External access to the application

### Networking
```yaml
# Service mesh communication
Frontend Service (8080) → AI Service (Internal)
AI Service → Local Model (Ramalama)
AI Service → Remote Model (vLLM/API)
```

## Security Considerations

### API Security
- API keys stored in OpenShift secrets
- No sensitive data in client-side code
- Environment-based configuration injection

### Model Access
- Local models run in isolated containers
- Remote API calls use secure HTTPS endpoints
- Rate limiting and timeout protection

## Performance Characteristics

### Local Model (Llama 3.2 1B)
- **Response Time**: 2-4 seconds average
- **Resource Usage**: Moderate CPU/Memory
- **Accuracy**: Good for basic strategy
- **Availability**: High (local deployment)

### Remote Model (Llama 3.2 3B)
- **Response Time**: 6-10 seconds average
- **Resource Usage**: Minimal local resources
- **Accuracy**: Superior reasoning capabilities
- **Availability**: Dependent on network connectivity

## Scalability Patterns

### Horizontal Scaling
- Stateless frontend pods can be scaled independently
- AI service calls are isolated and cacheable
- Session state managed client-side for scalability

### Performance Optimization
- AI response caching between hands
- Preloaded sound assets
- Optimized Vue component rendering
- Lazy loading of performance monitoring components

## Future Extensions

### Planned Enhancements
- Multi-model ensemble recommendations
- Machine learning-based strategy optimization
- Real-time multiplayer capabilities
- Advanced performance analytics dashboard
- Integration with additional AI model providers

### Integration Points
- MCP protocol for additional tool integrations
- External analytics and monitoring systems
- Tournament and leaderboard systems
- Advanced AI model comparison frameworks