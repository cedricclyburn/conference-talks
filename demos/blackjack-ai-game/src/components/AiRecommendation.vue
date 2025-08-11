<script setup lang="ts">
import { state, getAiRecommendation, clearAiRecommendation } from '@/store'
import { computed } from 'vue'

const canAskAi = computed(() => {
  return !state.isDealing && 
         state.activePlayer && 
         !state.activePlayer.isDealer && 
         state.activeHand && 
         !state.aiRecommendation &&
         !state.isAiLoading
})

const actionEmoji = computed(() => {
  if (!state.aiRecommendation) return '🤔'
  
  switch (state.aiRecommendation.action) {
    case 'hit': return '👊'
    case 'stand': return '✋'
    case 'double': return '💰'
    case 'split': return '✂️'
    default: return '🤔'
  }
})

const actionText = computed(() => {
  if (!state.aiRecommendation) return ''
  
  switch (state.aiRecommendation.action) {
    case 'hit': return 'Hit'
    case 'stand': return 'Stand'
    case 'double': return 'Double Down'
    case 'split': return 'Split'
    default: return 'Unknown'
  }
})

const confidenceColor = computed(() => {
  if (!state.aiRecommendation) return 'gray'
  
  const confidence = state.aiRecommendation.confidence
  if (confidence >= 0.8) return '#22c55e' // green
  if (confidence >= 0.6) return '#eab308' // yellow
  return '#ef4444' // red
})

function handleAskAi() {
  getAiRecommendation()
}

function handleDismiss() {
  clearAiRecommendation()
}
</script>

<template>
  <div class="ai-recommendation">
    <!-- Ask AI Button -->
    <button 
      v-if="canAskAi" 
      @click="handleAskAi"
      class="ask-ai-btn"
      :disabled="state.isAiLoading"
    >
      🧠 What does the book say?
    </button>

    <!-- Loading State -->
    <div v-if="state.isAiLoading" class="ai-loading">
      <div class="spinner"></div>
      <p>Consulting the AI advisor...</p>
      <small v-if="state.currentAiModel">
        Using {{ state.currentAiModel.name }}
      </small>
    </div>

    <!-- AI Recommendation Display -->
    <div v-if="state.showAiRecommendation && state.aiRecommendation" class="ai-advice">
      <div class="advice-header">
        <h3>{{ actionEmoji }} AI Recommends: {{ actionText }}</h3>
        <button @click="handleDismiss" class="dismiss-btn" title="Dismiss">✕</button>
      </div>
      
      <div class="advice-content">
        <div class="confidence-bar">
          <span class="confidence-label">Confidence:</span>
          <div class="confidence-track">
            <div 
              class="confidence-fill" 
              :style="{ 
                width: `${(state.aiRecommendation.confidence * 100)}%`,
                backgroundColor: confidenceColor
              }"
            ></div>
          </div>
          <span class="confidence-value">
            {{ Math.round(state.aiRecommendation.confidence * 100) }}%
          </span>
        </div>
        
        <p class="reasoning">{{ state.aiRecommendation.reasoning }}</p>
        
        <div class="advice-footer">
          <small v-if="state.currentAiModel" class="model-info">
            {{ state.currentAiModel.name }} 
            <span v-if="state.aiRecommendation.responseTime > 0">
              ({{ state.aiRecommendation.responseTime }}ms)
            </span>
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ai-recommendation {
  position: relative;
  z-index: 10;
}

.ask-ai-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.ask-ai-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.ask-ai-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.ai-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e2e8f0;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.ai-advice {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  min-width: 300px;
  max-width: 400px;
}

.advice-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.advice-header h3 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.dismiss-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.dismiss-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.advice-content {
  padding: 1.5rem;
}

.confidence-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.confidence-label {
  font-weight: 600;
  color: #374151;
}

.confidence-track {
  flex: 1;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.confidence-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.confidence-value {
  font-weight: 600;
  color: #374151;
  min-width: 45px;
}

.reasoning {
  color: #4b5563;
  line-height: 1.5;
  margin: 0 0 1rem 0;
  font-size: 0.95rem;
}

.advice-footer {
  padding-top: 0.75rem;
  border-top: 1px solid #e5e7eb;
}

.model-info {
  color: #6b7280;
  font-size: 0.85rem;
}

/* Mobile responsiveness */
@media (max-width: 640px) {
  .ai-advice {
    min-width: 280px;
    max-width: 90vw;
  }
  
  .advice-header h3 {
    font-size: 1.1rem;
  }
  
  .ask-ai-btn {
    font-size: 1rem;
    padding: 0.6rem 1.2rem;
  }
}
</style>