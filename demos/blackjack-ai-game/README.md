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

## 🚀 Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev          # Start at http://localhost:5173
   ```

3. **Development commands**
   ```bash
   npm run build        # Build for production
   npm run test:unit    # Run tests
   npm run lint         # Lint and format code
   npm run type-check   # TypeScript checking
   ```

## ☁️ OpenShift Deployment

### Quick Deploy

Deploy to your current OpenShift project:

```bash
# Apply all configurations
oc apply -f openshift/

# Build and deploy the application
oc new-build --strategy docker --binary --name blackjack-ai-game
oc start-build blackjack-ai-game --from-dir . --follow

# Create the application from built image
oc new-app --image-stream blackjack-ai-game --name blackjack-frontend

# Expose the service
oc expose service blackjack-frontend
```

### Configuration

Update `openshift/secret.yaml` with your actual API keys:
- `VITE_REMOTE_AI_KEY`: Your vLLM API key
- `MAAS_API_KEY`, `MAAS_ENDPOINT`, `MAAS_MODEL`: MAAS service configuration

### Access Your Application

```bash
# Get the application URL
oc get route blackjack-frontend
```

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

## 🛡️ Game Rules

- Initial bet: $1 minimum
- 6 decks, reshuffled at 25% remaining
- Blackjack pays 3:2
- Dealer stands on soft 17
- Double down on any two cards
- Split pairs (no re-splitting)
- No insurance available

## 📝 License

[MIT](http://opensource.org/licenses/MIT)

## 🙏 Acknowledgments

This project is based on the original blackjack game created by [Kevin Lee Drum](https://github.com/kevinleedrum). The AI integration and cloud deployment features have been added to demonstrate modern AI capabilities in gaming applications.


Copyright (c) 2025, AI Demo Project

---

Built with ❤️ using Vue 3, TypeScript, and modern AI technologies.