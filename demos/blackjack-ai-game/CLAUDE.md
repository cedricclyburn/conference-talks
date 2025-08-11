# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Vue 3 blackjack game with AI integration for demonstrating performance differences between local and remote AI models. The application features:

- Full blackjack implementation with Vue 3 + TypeScript
- AI-powered strategy recommendations using LLaMA models
- Performance monitoring for local vs remote AI endpoints 
- OpenShift deployment support with container orchestration

## Development Commands

### Local Development
```bash
npm install           # Install dependencies
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
```

### Code Quality
```bash
npm run type-check   # TypeScript type checking
npm run lint         # ESLint with auto-fix
npm run format       # Prettier code formatting
npm run test:unit    # Run Vitest unit tests
```


### OpenShift Deployment
```bash
# Apply all configurations
oc apply -f openshift/

# Build and deploy frontend
oc new-build --strategy docker --binary --name blackjack-ai-game
oc start-build blackjack-ai-game --from-dir . --follow
oc new-app --image-stream blackjack-ai-game --name blackjack-frontend
oc expose service blackjack-frontend

# Get application URL
oc get route blackjack-frontend
```

## Architecture Overview

### Core State Management
- **`src/store.ts`**: Central reactive game state using Vue's `reactive()` API
- **`src/types.ts`**: TypeScript definitions for cards, players, hands, and game state
- **`src/cards.ts`**: Card generation, shuffling, and deck management logic

### Key Components
- **Game Logic**: Complete blackjack rules implementation with betting, splitting, doubling down
- **AI Integration**: Dual-model support (local LLaMA 3.2 1B via Ramalama, remote 3B via vLLM)
- **Performance Monitoring**: Real-time metrics tracking for AI response times and accuracy
- **Session Management**: Multi-player session tracking with statistics

### Service Layer
- **`src/services/aiService.ts`**: AI model integration with automatic fallback to basic strategy
- **`src/services/sessionService.ts`**: Session management and statistics tracking
- **`src/sound.ts`**: Audio system using Howler.js for game sound effects

### Component Structure
```
src/components/
├── AiRecommendation.vue      # AI strategy advisor UI
├── PerformanceOverlay.vue    # AI performance metrics display
├── GameHand.vue              # Player/dealer hand display
├── PlayingCard.vue           # Individual card component
└── TitleScreen.vue           # Game start screen
```

## Environment Configuration

The application uses environment variables for AI model configuration:

- `VITE_USE_LOCAL_AI`: Toggle between local/remote AI (default: true)
- `VITE_LOCAL_AI_ENDPOINT`: External Ramalama route (https://ramalama-route-blackjack-ai-demo.apps.prod.rhoai.rh-aiservices-bu.com)
- `VITE_REMOTE_AI_ENDPOINT`: Remote vLLM endpoint
- `VITE_REMOTE_AI_KEY`: API key for remote endpoint
- `VITE_SHOW_PERFORMANCE_MONITOR`: Show performance overlay (default: false)
- `MAAS_API_KEY`, `MAAS_ENDPOINT`, `MAAS_MODEL`: MAAS service configuration

## Development Patterns

### State Updates
- Game state is centralized in `store.ts` using Vue's reactive system
- All game actions (hit, stand, split, double) are async functions with animation timing
- AI recommendations are cached and cleared between hands

### Error Handling
- AI service includes automatic fallback to basic strategy when models fail
- Network timeouts are configured differently for local (8s) vs remote (10s) models
- Performance metrics track both successful and failed AI requests

### OpenShift Deployment Patterns
- Uses external routes for AI service access (enables cross-namespace communication)
- Container runs on port 8080 (non-privileged port for OpenShift)
- ConfigMaps and Secrets for environment variable injection
- ImageStream integration with internal registry

## Testing Strategy

- Unit tests use Vitest with jsdom environment
- AI service includes health check endpoints for deployment validation
- OpenShift deployments include readiness and liveness probes

## Performance Considerations

- Local model (LLaMA 3.2 1B) optimized for speed with reduced token limits
- Card shuffle uses Fisher-Yates algorithm for true randomization
- Sound preloading with progress tracking to prevent audio delays
- Vue component structure minimizes re-renders during game animations