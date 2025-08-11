<script setup lang="ts">
import { canDoubleDown, canSplit, state, doubleDown, endHand, hit, split, getAiRecommendation } from '@/store'
import PlayerBank from '@/components/PlayerBank.vue'
import { computed } from 'vue'

const canAskAi = computed(() => {
  return !state.isDealing && 
         state.activePlayer && 
         !state.activePlayer.isDealer && 
         state.activeHand && 
         !state.isAiLoading
})

function handleAskAi() {
  getAiRecommendation()
}
</script>

<template>
  <div class="player-toolbar">
    <!-- AI Recommendation Display -->
    <div v-if="state.showAiRecommendation && state.aiRecommendation" class="ai-advice-card">
      <div class="ai-advice-header">
        <span class="ai-icon">🧠</span>
        <span class="ai-text">{{ state.aiRecommendation.action.toUpperCase() }}</span>
        <span class="ai-confidence">{{ Math.round(state.aiRecommendation.confidence * 100) }}%</span>
      </div>
      <div class="ai-reasoning">
        {{ state.aiRecommendation.reasoning }}
      </div>
    </div>
    
    <PlayerBank />
    <div role="toolbar">
      <button :disabled="!canDoubleDown" @click="doubleDown">Double<br />Down</button>
      <button :disabled="!canSplit" @click="split">Split</button>
      <button 
        :disabled="!canAskAi" 
        @click="handleAskAi"
        class="ai-btn"
        title="What does the book say?"
      >
        <span v-if="state.isAiLoading" class="ai-loading">⏳</span>
        <span v-else>🧠</span>
      </button>
      <button :disabled="state.isDealing" @click="endHand">Stand</button>
      <button :disabled="state.isDealing" @click="hit">Hit</button>
    </div>
  </div>
</template>

<style scoped>
.player-toolbar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  order: -1;
}

[role='toolbar'] {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem;
  width: max-content;
  margin: 0 auto;
}

[role='toolbar'] button:first-of-type {
  font-size: 2rem;
}

.ai-btn {
  background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%) !important;
  color: white !important;
  font-size: 1.5rem !important;
  border: 2px solid rgba(139, 92, 246, 0.5) !important;
  transition: all 0.3s ease !important;
}

.ai-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #7c3aed 0%, #9333ea 100%) !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
}

.ai-btn:disabled {
  background: #6b7280 !important;
  border-color: #6b7280 !important;
  opacity: 0.5;
}

.ai-loading {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.ai-advice-card {
  background: linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%);
  color: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.3);
  max-width: 400px;
  margin: 0 auto;
}

.ai-advice-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.9rem;
  font-weight: 600;
}

.ai-reasoning {
  font-size: 0.85rem;
  line-height: 1.4;
  opacity: 0.95;
  font-style: italic;
}

.ai-icon {
  font-size: 1.1rem;
}

.ai-text {
  font-weight: 700;
  letter-spacing: 0.5px;
}

.ai-confidence {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

/* Mobile responsive adjustments */
@media (max-width: 640px) {
  .player-toolbar {
    gap: 0.75rem;
  }
  
  [role='toolbar'] {
    grid-template-columns: repeat(5, minmax(50px, 1fr));
    gap: 0.25rem;
    max-width: 95vw;
  }
  
  .ai-advice-card {
    max-width: 90vw;
    padding: 0.75rem;
  }
  
  .ai-advice-header {
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
  }
  
  .ai-reasoning {
    font-size: 0.75rem;
  }
  
  .ai-btn {
    font-size: 1.2rem !important;
  }
  
  [role='toolbar'] button:first-of-type {
    font-size: 1.5rem;
  }
}
</style>
