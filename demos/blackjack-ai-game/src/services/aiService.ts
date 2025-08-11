export interface ModelConfig {
  name: string
  endpoint: string
  apiKey?: string
  model: string
  type: 'local' | 'remote'
}

export interface BlackjackGameState {
  playerCards: string[]
  dealerUpCard: string
  playerTotal: number
  canSplit: boolean
  canDoubleDown: boolean
}

export interface AIRecommendation {
  action: 'hit' | 'stand' | 'double' | 'split'
  confidence: number
  reasoning: string
  responseTime: number
}

export interface PerformanceMetrics {
  responseTime: number
  timestamp: number
  modelType: 'local' | 'remote'
  success: boolean
  error?: string
}

class AIService {
  private currentModel: ModelConfig
  private performanceHistory: PerformanceMetrics[] = []

  constructor() {
    this.currentModel = this.getDefaultModel()
  }

  private getDefaultModel(): ModelConfig {
    const useLocal = import.meta.env.VITE_USE_LOCAL_AI === 'true'
    
    if (useLocal) {
      return {
        name: 'Llama 3.2 1B (llama.cpp)',
        endpoint: import.meta.env.VITE_LOCAL_AI_ENDPOINT || 'http://localhost:8080',
        model: 'llama3.2:1b',
        type: 'local'
      }
    } else {
      return {
        name: 'Llama 3.2 3B (vLLM)',
        endpoint: import.meta.env.VITE_REMOTE_AI_ENDPOINT || 'https://llama-3-2-3b-maas-apicast-production.apps.prod.rhoai.rh-aiservices-bu.com:443',
        apiKey: import.meta.env.VITE_REMOTE_AI_KEY,
        model: 'llama-3-2-3b',
        type: 'remote'
      }
    }
  }

  setModel(config: ModelConfig) {
    this.currentModel = config
  }

  getCurrentModel(): ModelConfig {
    return this.currentModel
  }

  getPerformanceHistory(): PerformanceMetrics[] {
    return this.performanceHistory.slice(-20) // Keep last 20 requests
  }

  async checkHealth(): Promise<{ healthy: boolean; responseTime: number; error?: string }> {
    const startTime = Date.now()
    const controller = new AbortController()
    const healthTimeout = this.currentModel.type === 'local' ? 5000 : 5000 // 5s for both local and remote
    const timeoutId = setTimeout(() => controller.abort(), healthTimeout)
    
    try {
      let healthEndpoint: string
      
      if (this.currentModel.type === 'local') {
        healthEndpoint = `${this.currentModel.endpoint}/health`
      } else {
        // For remote endpoints, we'll just try a simple models list request
        const endpoint = this.currentModel.endpoint.endsWith('/v1') 
          ? this.currentModel.endpoint 
          : `${this.currentModel.endpoint}/v1`
        healthEndpoint = `${endpoint}/models`
      }
      
      const response = await fetch(healthEndpoint, {
        method: 'GET',
        headers: this.currentModel.type === 'remote' ? {
          'Authorization': `Bearer ${this.currentModel.apiKey}`
        } : {},
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      const responseTime = Date.now() - startTime
      
      return {
        healthy: response.ok,
        responseTime,
        error: response.ok ? undefined : `HTTP ${response.status}: ${response.statusText}`
      }
    } catch (error) {
      clearTimeout(timeoutId)
      const responseTime = Date.now() - startTime
      
      let errorMessage = 'Unknown error'
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = `Health check timeout (${healthTimeout / 1000}s)`
        } else {
          errorMessage = error.message
        }
      }
      
      return {
        healthy: false,
        responseTime,
        error: errorMessage
      }
    }
  }

  private createBlackjackPrompt(gameState: BlackjackGameState): string {
    const { playerCards, dealerUpCard, playerTotal, canSplit, canDoubleDown } = gameState
    
    return `You are a blackjack expert. Based on basic strategy, what should the player do?

Game State:
- Player cards: ${playerCards.join(', ')}
- Player total: ${playerTotal}
- Dealer up card: ${dealerUpCard}
- Can split: ${canSplit}
- Can double down: ${canDoubleDown}

Available actions: ${[
  'hit',
  'stand',
  ...(canDoubleDown ? ['double'] : []),
  ...(canSplit ? ['split'] : [])
].join(', ')}

Respond with ONLY a JSON object in this exact format:
{
  "action": "hit|stand|double|split",
  "confidence": 0.95,
  "reasoning": "Brief explanation of why this is the optimal play according to basic strategy"
}

Do not include any other text outside the JSON.`
  }

  private async makeRequest(prompt: string): Promise<{ data: { choices: Array<{ message: { content: string } }> }; responseTime: number }> {
    const startTime = Date.now()
    
    // Create abort controller with different timeouts for local vs remote
    const controller = new AbortController()
    const timeout = this.currentModel.type === 'local' ? 8000 : 10000 // 8s for local, 10s for remote
    const timeoutId = setTimeout(() => controller.abort(), timeout)
    
    try {
      let response: Response
      
      if (this.currentModel.type === 'local') {
        // Ramalama/local endpoint format - optimized for speed
        response = await fetch(`${this.currentModel.endpoint}/v1/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: this.currentModel.model,
            messages: [
              {
                role: 'system',
                content: 'You are a blackjack expert who follows basic strategy perfectly.'
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            max_tokens: 150, // Reduced for faster inference
            temperature: 0.1,
            top_p: 0.9, // Add top_p for better local model performance
            stream: false // Explicitly disable streaming for faster response
          }),
          signal: controller.signal
        })
      } else {
        // vLLM remote endpoint format
        const endpoint = this.currentModel.endpoint.endsWith('/v1') 
          ? this.currentModel.endpoint 
          : `${this.currentModel.endpoint}/v1`
          
        response = await fetch(`${endpoint}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentModel.apiKey}`
          },
          body: JSON.stringify({
            model: this.currentModel.model,
            messages: [
              {
                role: 'system',
                content: 'You are a blackjack expert who follows basic strategy perfectly.'
              },
              {
                role: 'user',
                content: prompt
              }
            ],
            max_tokens: 200,
            temperature: 0.1
          }),
          signal: controller.signal
        })
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      const responseTime = Date.now() - startTime

      clearTimeout(timeoutId) // Clear timeout since we got a response

      this.recordPerformance({
        responseTime,
        timestamp: Date.now(),
        modelType: this.currentModel.type,
        success: true
      })

      return { data, responseTime }
    } catch (error) {
      clearTimeout(timeoutId) // Clear timeout
      const responseTime = Date.now() - startTime
      
      let errorMessage = 'Unknown error'
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          errorMessage = `Request timeout (${timeout / 1000}s)`
        } else {
          errorMessage = error.message
        }
      }
      
      this.recordPerformance({
        responseTime,
        timestamp: Date.now(),
        modelType: this.currentModel.type,
        success: false,
        error: errorMessage
      })
      
      throw error
    }
  }

  private recordPerformance(metrics: PerformanceMetrics) {
    this.performanceHistory.push(metrics)
    if (this.performanceHistory.length > 50) {
      this.performanceHistory.shift() // Keep max 50 entries
    }
  }

  async getRecommendation(gameState: BlackjackGameState): Promise<AIRecommendation> {
    const prompt = this.createBlackjackPrompt(gameState)
    
    console.log(`[AI Service] Making request to ${this.currentModel.type} model: ${this.currentModel.name}`)
    console.log(`[AI Service] Endpoint: ${this.currentModel.endpoint}`)
    
    try {
      const { data, responseTime } = await this.makeRequest(prompt)
      
      console.log(`[AI Service] Response received in ${responseTime}ms`)
      
      let content = data.choices[0]?.message?.content || ''
      console.log(`[AI Service] Raw content:`, content)
      
      // Clean the content by removing thinking tags and other unwanted elements
      content = this.cleanAiResponse(content)
      console.log(`[AI Service] Cleaned content:`, content)
      
      // Parse JSON response
      let recommendation: { action?: string; confidence?: number; reasoning?: string }
      try {
        // Try to extract JSON from the response
        const jsonMatch = content.match(/\{[\s\S]*?\}/)
        if (jsonMatch) {
          recommendation = JSON.parse(jsonMatch[0])
          console.log(`[AI Service] Parsed recommendation:`, recommendation)
        } else {
          // Try to parse the entire cleaned content as JSON
          recommendation = JSON.parse(content)
          console.log(`[AI Service] Parsed full content as JSON:`, recommendation)
        }
      } catch (parseError) {
        // Try alternative parsing methods
        console.warn('[AI Service] JSON parsing failed, trying alternative methods:', parseError)
        recommendation = this.extractRecommendationFromText(content)
        
        if (!recommendation.action) {
          console.warn('[AI Service] All parsing methods failed, using fallback')
          const fallbackRec = this.getBasicStrategyFallback(gameState)
          return {
            action: fallbackRec.action,
            confidence: 0.6,
            reasoning: `AI response malformed, using basic strategy fallback. Original response: "${content.substring(0, 100)}..."`,
            responseTime
          }
        }
      }

      return {
        action: (recommendation.action as AIRecommendation['action']) || 'stand',
        confidence: recommendation.confidence || 0.8,
        reasoning: recommendation.reasoning || 'AI recommendation',
        responseTime
      }
    } catch (error) {
      console.error('[AI Service] Request failed:', error)
      const fallback = this.getBasicStrategyFallback(gameState)
      // Return fallback recommendation with zero response time since AI wasn't actually used
      return {
        action: fallback.action,
        confidence: 0.5,
        reasoning: `AI service unavailable (${error instanceof Error ? error.message : 'Unknown error'}). Using basic strategy fallback.`,
        responseTime: 0
      }
    }
  }

  private getBasicStrategyFallback(gameState: BlackjackGameState): { action: AIRecommendation['action'] } {
    const { playerTotal, dealerUpCard, canSplit, canDoubleDown } = gameState
    const dealerValue = this.getCardValue(dealerUpCard)
    
    // Simplified basic strategy
    if (canSplit && playerTotal <= 16) {
      const firstCard = gameState.playerCards[0]
      if (firstCard === 'A' || firstCard === '8') {
        return { action: 'split' }
      }
    }
    
    if (canDoubleDown && playerTotal >= 9 && playerTotal <= 11) {
      if (playerTotal === 11 || (playerTotal === 10 && dealerValue <= 9)) {
        return { action: 'double' }
      }
    }
    
    if (playerTotal <= 11) {
      return { action: 'hit' }
    }
    
    if (playerTotal >= 17) {
      return { action: 'stand' }
    }
    
    // For 12-16, hit if dealer shows 7-A, stand if 2-6
    if (dealerValue >= 7 || dealerValue === 1) {
      return { action: 'hit' }
    } else {
      return { action: 'stand' }
    }
  }

  private getCardValue(card: string): number {
    if (card === 'A') return 1 // or 11, but for dealer up card logic, 1 is safer
    if (['J', 'Q', 'K'].includes(card)) return 10
    return parseInt(card) || 10
  }

  private cleanAiResponse(content: string): string {
    // Remove thinking tags and their content
    content = content.replace(/<think>[\s\S]*?<\/think>/gi, '')
    
    // Remove various markdown or formatting elements
    content = content.replace(/```json\s*/gi, '')
    content = content.replace(/```\s*/gi, '')
    content = content.replace(/^#+\s*/gm, '') // Remove markdown headers
    
    // Remove common prefixes
    content = content.replace(/^(Here is|Here's|The recommendation is|I recommend|Based on basic strategy)[\s:]*\s*/i, '')
    
    // Remove trailing explanations after JSON
    const jsonEndMatch = content.match(/\}[\s\S]*$/)
    if (jsonEndMatch) {
      const jsonEndIndex = content.indexOf(jsonEndMatch[0]) + 1
      content = content.substring(0, jsonEndIndex)
    }
    
    return content.trim()
  }

  private extractRecommendationFromText(content: string): { action?: string; confidence?: number; reasoning?: string } {
    const result: { action?: string; confidence?: number; reasoning?: string } = {}
    
    // Try to extract action from common phrases
    const lowerContent = content.toLowerCase()
    
    if (lowerContent.includes('hit') || lowerContent.includes('take another card')) {
      result.action = 'hit'
    } else if (lowerContent.includes('stand') || lowerContent.includes('stay')) {
      result.action = 'stand'
    } else if (lowerContent.includes('double') || lowerContent.includes('double down')) {
      result.action = 'double'
    } else if (lowerContent.includes('split')) {
      result.action = 'split'
    }
    
    // Try to extract confidence percentage
    const confidenceMatch = content.match(/(\d+)%/)
    if (confidenceMatch) {
      result.confidence = parseInt(confidenceMatch[1]) / 100
    }
    
    // Use the content as reasoning if we found an action
    if (result.action) {
      result.reasoning = content.length > 200 ? content.substring(0, 200) + '...' : content
    }
    
    return result
  }
}

export const aiService = new AIService()