<script setup lang="ts">
import { state, togglePerformanceOverlay, switchAiModel, getCurrentSession, getSessionStats } from '@/store'
import { computed, ref } from 'vue'
import type { ModelConfig } from '@/services/aiService'

const availableModels = ref<ModelConfig[]>([
  {
    name: 'Llama 3.2 1B (llama.cpp)',
    endpoint: import.meta.env.VITE_LOCAL_AI_ENDPOINT || 'http://localhost:8080',
    model: 'llama-3.2-1b',
    type: 'local'
  },
  {
    name: 'Llama 3.2 3B (vLLM)',
    endpoint: import.meta.env.VITE_REMOTE_AI_ENDPOINT || 'https://llama-3-2-3b-maas-apicast-production.apps.prod.rhoai.rh-aiservices-bu.com:443',
    apiKey: import.meta.env.VITE_REMOTE_AI_KEY,
    model: 'llama-3-2-3b',
    type: 'remote'
  }
])

const recentMetrics = computed(() => {
  return state.aiPerformanceMetrics.slice(-10).reverse()
})

const averageResponseTime = computed(() => {
  const successfulMetrics = state.aiPerformanceMetrics.filter(m => m.success)
  if (successfulMetrics.length === 0) return 0
  
  const total = successfulMetrics.reduce((sum, m) => sum + m.responseTime, 0)
  return Math.round(total / successfulMetrics.length)
})

const llamaCppAverageTime = computed(() => {
  const localMetrics = state.aiPerformanceMetrics.filter(m => m.success && m.modelType === 'local')
  if (localMetrics.length === 0) return 0
  
  const total = localMetrics.reduce((sum, m) => sum + m.responseTime, 0)
  return Math.round(total / localMetrics.length)
})

const vllmAverageTime = computed(() => {
  const remoteMetrics = state.aiPerformanceMetrics.filter(m => m.success && m.modelType === 'remote')
  if (remoteMetrics.length === 0) return 0
  
  const total = remoteMetrics.reduce((sum, m) => sum + m.responseTime, 0)
  return Math.round(total / remoteMetrics.length)
})

const successRate = computed(() => {
  if (state.aiPerformanceMetrics.length === 0) return 100
  
  const successful = state.aiPerformanceMetrics.filter(m => m.success).length
  return Math.round((successful / state.aiPerformanceMetrics.length) * 100)
})

const currentSession = computed(() => getCurrentSession())
const sessionStats = computed(() => getSessionStats())

async function handleModelSwitch(model: ModelConfig) {
  await switchAiModel(model)
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString()
}

function getStatusColor(success: boolean): string {
  return success ? '#22c55e' : '#ef4444'
}

function getModelTypeColor(type: 'local' | 'remote'): string {
  return type === 'local' ? '#3b82f6' : '#8b5cf6'
}
</script>

<template>
  <div v-if="state.showPerformanceOverlay" class="performance-sidebar">
    <div class="overlay-header">
      <h2>🔬 AI Performance Monitor</h2>
      <button @click="togglePerformanceOverlay" class="close-btn">✕</button>
    </div>

    <div class="overlay-content">
      <!-- Current Model & Quick Switch -->
      <div class="current-model-section">
        <h3>Current AI Model</h3>
        <div class="model-info">
          <span class="model-name">
            {{ state.currentAiModel?.name || 'No model selected' }}
          </span>
          <span 
            v-if="state.currentAiModel" 
            class="model-type"
            :style="{ backgroundColor: getModelTypeColor(state.currentAiModel.type) }"
          >
            {{ state.currentAiModel.type }}
          </span>
        </div>
        
        <div class="model-switch">
          <h4>Quick Switch:</h4>
          <div class="model-buttons">
            <button 
              v-for="model in availableModels" 
              :key="model.name"
              @click="handleModelSwitch(model)"
              :class="{ 
                active: state.currentAiModel?.name === model.name,
                local: model.type === 'local',
                remote: model.type === 'remote'
              }"
              class="model-btn"
            >
              {{ model.type === 'local' ? '🖥️' : '☁️' }} {{ model.name }}
            </button>
          </div>
        </div>
      </div>

      <!-- Performance Stats -->
      <div class="stats-section">
        <h3>Performance Statistics</h3>
        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-label">Overall Avg</span>
            <span class="stat-value">{{ averageResponseTime }}ms</span>
          </div>
          <div class="stat-card local">
            <span class="stat-label">🖥️ llama.cpp Avg</span>
            <span class="stat-value">{{ llamaCppAverageTime }}ms</span>
          </div>
          <div class="stat-card remote">
            <span class="stat-label">☁️ vLLM Avg</span>
            <span class="stat-value">{{ vllmAverageTime }}ms</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Success Rate</span>
            <span class="stat-value">{{ successRate }}%</span>
          </div>
        </div>
      </div>

      <!-- Recent Requests -->
      <div class="recent-requests">
        <h3>Recent AI Requests</h3>
        <div class="requests-list">
          <div 
            v-for="(metric, index) in recentMetrics" 
            :key="index"
            class="request-item"
          >
            <div class="request-info">
              <span 
                class="status-indicator"
                :style="{ backgroundColor: getStatusColor(metric.success) }"
              ></span>
              <span class="request-time">{{ formatTime(metric.timestamp) }}</span>
              <span 
                class="request-type"
                :style="{ color: getModelTypeColor(metric.modelType) }"
              >
                {{ metric.modelType }}
              </span>
            </div>
            <div class="request-stats">
              <span v-if="metric.success" class="response-time">
                {{ metric.responseTime }}ms
              </span>
              <span v-else class="error-text" :title="metric.error">
                Error
              </span>
            </div>
          </div>
          <div v-if="recentMetrics.length === 0" class="no-requests">
            No AI requests yet. Click "What does the book say?" to start!
          </div>
        </div>
      </div>

      <!-- Performance Comparison -->
      <div v-if="llamaCppAverageTime > 0 && vllmAverageTime > 0" class="comparison-section">
        <h3>📊 llama.cpp vs vLLM Comparison</h3>
        <div class="comparison-bar">
          <div class="comparison-item">
            <span class="comparison-label">🖥️ llama.cpp</span>
            <div class="comparison-bar-track">
              <div 
                class="comparison-bar-fill local"
                :style="{ width: `${Math.min(100, (llamaCppAverageTime / Math.max(llamaCppAverageTime, vllmAverageTime)) * 100)}%` }"
              ></div>
            </div>
            <span class="comparison-value">{{ llamaCppAverageTime }}ms</span>
          </div>
          <div class="comparison-item">
            <span class="comparison-label">☁️ vLLM</span>
            <div class="comparison-bar-track">
              <div 
                class="comparison-bar-fill remote"
                :style="{ width: `${Math.min(100, (vllmAverageTime / Math.max(llamaCppAverageTime, vllmAverageTime)) * 100)}%` }"
              ></div>
            </div>
            <span class="comparison-value">{{ vllmAverageTime }}ms</span>
          </div>
        </div>
        <p class="comparison-insight">
          {{ llamaCppAverageTime < vllmAverageTime 
              ? `🖥️ llama.cpp is ${Math.round((vllmAverageTime - llamaCppAverageTime) / llamaCppAverageTime * 100)}% faster` 
              : `☁️ vLLM is ${Math.round((llamaCppAverageTime - vllmAverageTime) / vllmAverageTime * 100)}% faster`
          }}
        </p>
      </div>

      <!-- Session Information -->
      <div class="session-section">
        <h3>📊 Session & Global Stats</h3>
        <div v-if="currentSession" class="session-info">
          <div class="session-card">
            <h4>Current Session</h4>
            <div class="session-stats">
              <div class="session-stat">
                <span class="stat-label">Player:</span>
                <span class="stat-value">{{ currentSession.playerName }}</span>
              </div>
              <div class="session-stat">
                <span class="stat-label">Games:</span>
                <span class="stat-value">{{ currentSession.gamesPlayed }}</span>
              </div>
              <div class="session-stat">
                <span class="stat-label">AI Requests:</span>
                <span class="stat-value">{{ currentSession.aiRequestCount }}</span>
              </div>
              <div class="session-stat">
                <span class="stat-label">Total Bet:</span>
                <span class="stat-value">${{ currentSession.totalBet }}</span>
              </div>
              <div class="session-stat">
                <span class="stat-label">Total Won:</span>
                <span class="stat-value">${{ currentSession.totalWon }}</span>
              </div>
              <div class="session-stat">
                <span class="stat-label">Net:</span>
                <span 
                  class="stat-value"
                  :style="{ 
                    color: (currentSession.totalWon - currentSession.totalBet) >= 0 ? '#22c55e' : '#ef4444' 
                  }"
                >
                  ${{ currentSession.totalWon - currentSession.totalBet }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="global-stats">
          <h4>Global Statistics</h4>
          <div class="global-stats-grid">
            <div class="global-stat">
              <span class="stat-label">Active Sessions:</span>
              <span class="stat-value">{{ sessionStats.activeSessions }}</span>
            </div>
            <div class="global-stat">
              <span class="stat-label">Total Sessions:</span>
              <span class="stat-value">{{ sessionStats.totalSessions }}</span>
            </div>
            <div class="global-stat">
              <span class="stat-label">Avg Session Time:</span>
              <span class="stat-value">{{ Math.round(sessionStats.averageSessionTime / 60000) }}m</span>
            </div>
            <div class="global-stat">
              <span class="stat-label">Popular Model:</span>
              <span class="stat-value">{{ sessionStats.mostPopularModel }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.performance-sidebar {
  width: 400px;
  min-width: 400px;
  height: 100vh;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: -2px 0 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
}

.overlay-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.overlay-header h2 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.overlay-content {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.current-model-section,
.stats-section,
.recent-requests,
.comparison-section {
  margin-bottom: 2rem;
}

.current-model-section h3,
.stats-section h3,
.recent-requests h3,
.comparison-section h3 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  color: #374151;
}

.model-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.model-name {
  font-weight: 600;
  color: #111827;
}

.model-type {
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.model-switch h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  color: #6b7280;
}

.model-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.model-btn {
  padding: 0.5rem 0.75rem;
  border: 2px solid #e5e7eb;
  background: white;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  font-size: 0.85rem;
}

.model-btn:hover {
  border-color: #d1d5db;
}

.model-btn.active {
  border-color: #667eea;
  background: #f0f4ff;
}

.model-btn.local.active {
  border-color: #3b82f6;
  background: #eff6ff;
}

.model-btn.remote.active {
  border-color: #8b5cf6;
  background: #f5f3ff;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.stat-card {
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 8px;
  text-align: center;
}

.stat-card.local {
  background: #eff6ff;
}

.stat-card.remote {
  background: #f5f3ff;
}

.stat-label {
  display: block;
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.stat-value {
  display: block;
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
}

.requests-list {
  max-height: 200px;
  overflow-y: auto;
}

.request-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.request-item:last-child {
  border-bottom: none;
}

.request-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.request-time {
  font-size: 0.8rem;
  color: #6b7280;
}

.request-type {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.response-time {
  font-size: 0.8rem;
  font-weight: 600;
  color: #059669;
}

.error-text {
  font-size: 0.8rem;
  font-weight: 600;
  color: #dc2626;
}

.no-requests {
  text-align: center;
  color: #6b7280;
  font-style: italic;
  padding: 1rem;
}

.comparison-bar {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.comparison-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.comparison-label {
  min-width: 60px;
  font-size: 0.85rem;
  font-weight: 600;
}

.comparison-bar-track {
  flex: 1;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.comparison-bar-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.comparison-bar-fill.local {
  background: #3b82f6;
}

.comparison-bar-fill.remote {
  background: #8b5cf6;
}

.comparison-value {
  min-width: 60px;
  text-align: right;
  font-size: 0.85rem;
  font-weight: 600;
}

.comparison-insight {
  margin: 1rem 0 0 0;
  padding: 0.75rem;
  background: #f0f9ff;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #0c4a6e;
}

.session-section h3,
.session-section h4 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  color: #374151;
}

.session-section h4 {
  font-size: 1rem;
  margin-bottom: 0.75rem;
}

.session-card {
  background: #f8fafc;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.session-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.session-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
}

.global-stats {
  background: #f1f5f9;
  border-radius: 8px;
  padding: 1rem;
}

.global-stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.global-stat {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.25rem 0;
}

/* Mobile responsiveness */
@media (max-width: 1024px) {
  .performance-sidebar {
    width: 100%;
    min-width: 100%;
    height: 30vh;
    border-left: none;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.1);
  }
  
  .overlay-content {
    padding: 1rem;
  }
  
  .current-model-section,
  .stats-section,
  .recent-requests,
  .comparison-section,
  .session-section {
    margin-bottom: 1rem;
  }
}

@media (max-width: 768px) {
  .performance-sidebar {
    height: 40vh;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .comparison-item {
    flex-direction: column;
    align-items: stretch;
    gap: 0.25rem;
  }
  
  .comparison-label,
  .comparison-value {
    text-align: center;
  }
  
  .session-stats,
  .global-stats-grid {
    grid-template-columns: 1fr;
  }
  
  .overlay-header h2 {
    font-size: 1rem;
  }
}
</style>