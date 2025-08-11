export interface NotificationConfig {
  ntfyTopic: string
  ntfyServer: string
  enabled: boolean
}

export interface BalanceNotificationContext {
  currentBalance: number
  previousBalance: number
  lastAction: 'win' | 'loss' | 'blackjack' | 'bust' | 'push' | 'game_start'
  winAmount?: number
  sessionStats?: {
    gamesPlayed: number
    totalWinnings: number
    totalBets: number
  }
}

export interface QuirkyMessage {
  message: string
  context: BalanceNotificationContext
  timestamp: number
}

class NotificationTool {
  private config: NotificationConfig
  private recentMessages: QuirkyMessage[] = []
  private lastNotificationTime = 0
  private static readonly RATE_LIMIT_MS = 30000 // 30 seconds between notifications

  constructor(config: NotificationConfig) {
    this.config = config
  }

  /**
   * Generate a quirky, humorous message about balance changes
   */
  private generateQuirkyMessage(context: BalanceNotificationContext): string {
    const { currentBalance, previousBalance, lastAction, winAmount } = context
    const change = currentBalance - previousBalance
    
    // Fun message templates based on different scenarios
    const templates = {
      bigWin: [
        `🎰 JACKPOT VIBES! Balance: $${currentBalance}. You're on fire! 🔥`,
        `💰 Winner winner! Balance: $${currentBalance}. The chips are flowing like tears of joy! 💸`,
        `🎉 BOOM! Balance: $${currentBalance}. Someone's buying dinner tonight! 🍾`,
        `🚀 TO THE MOON! Balance: $${currentBalance}. Your wallet is doing the happy dance! 💃`
      ],
      win: [
        `✨ Nice! Balance: $${currentBalance}. Lady Luck is smiling! 😊`,
        `🎯 Solid win! Balance: $${currentBalance}. You've got the magic touch! ✋`,
        `💫 Sweet! Balance: $${currentBalance}. Keep that streak alive! 🔥`,
        `🎪 Winner! Balance: $${currentBalance}. The house is slightly concerned! 😅`
      ],
      loss: [
        `😅 Ouch! Balance: $${currentBalance}. The cards are being moody today! 😒`,
        `🎭 Plot twist! Balance: $${currentBalance}. Even Batman has bad days! 🦇`,
        `🌪️ Whoops! Balance: $${currentBalance}. Time to channel your inner comeback kid! 💪`,
        `🎢 Down we go! Balance: $${currentBalance}. What goes down must come up! ⬆️`
      ],
      bigLoss: [
        `😱 YIKES! Balance: $${currentBalance}. The cards just declared war! ⚔️`,
        `💥 OOOF! Balance: $${currentBalance}. Time to sacrifice a lucky penny! 🪙`,
        `🌊 Tsunami alert! Balance: $${currentBalance}. Even the dealer winced! 😬`,
        `🎲 Brutal! Balance: $${currentBalance}. The RNG gods are having a laugh! 😂`
      ],
      blackjack: [
        `🃏 BLACKJACK! Balance: $${currentBalance}. You just schooled the dealer! 🎓`,
        `⚡ 21! Balance: $${currentBalance}. Perfection in card form! 💯`,
        `🏆 BLACKJACK BABY! Balance: $${currentBalance}. The cards bowed to your greatness! 👑`,
        `🎯 BULLS-EYE! Balance: $${currentBalance}. 21 never felt so good! 😎`
      ],
      bust: [
        `💥 BUST! Balance: $${currentBalance}. The cards got greedy! 😤`,
        `🤯 Boom! Balance: $${currentBalance}. Sometimes 22 just isn't as fun as 21! 🎭`,
        `🎪 BUST-ED! Balance: $${currentBalance}. The deck just played a prank! 🃏`,
        `💣 Kaboom! Balance: $${currentBalance}. Next hand will be the revenge! 👊`
      ],
      lowFunds: [
        `⚠️ Running low! Balance: $${currentBalance}. Time to activate lucky mode! 🍀`,
        `🚨 Alert! Balance: $${currentBalance}. Your wallet is feeling light! 💨`,
        `📉 Getting thin! Balance: $${currentBalance}. Comeback story loading... ⏳`,
        `🎯 Crunch time! Balance: $${currentBalance}. This is where legends are made! ⭐`
      ]
    }

    // Determine message category
    let category: keyof typeof templates
    
    if (lastAction === 'blackjack') {
      category = 'blackjack'
    } else if (lastAction === 'bust') {
      category = 'bust'
    } else if (currentBalance <= 5) {
      category = 'lowFunds'
    } else if (change >= 15) {
      category = 'bigWin'
    } else if (change > 0) {
      category = 'win'
    } else if (change <= -15) {
      category = 'bigLoss'
    } else {
      category = 'loss'
    }

    // Pick a random message from the category
    const messages = templates[category]
    return messages[Math.floor(Math.random() * messages.length)]
  }

  /**
   * Send notification via ntfy
   */
  async sendNotification(context: BalanceNotificationContext): Promise<boolean> {
    if (!this.config.enabled) {
      console.log('[Notification Tool] Notifications disabled')
      return false
    }

    // Rate limiting
    const now = Date.now()
    if (now - this.lastNotificationTime < NotificationTool.RATE_LIMIT_MS) {
      console.log('[Notification Tool] Rate limited, skipping notification')
      return false
    }

    try {
      const message = this.generateQuirkyMessage(context)
      
      // Store the message
      const quirkyMessage: QuirkyMessage = {
        message,
        context,
        timestamp: now
      }
      
      this.recentMessages.unshift(quirkyMessage)
      if (this.recentMessages.length > 10) {
        this.recentMessages = this.recentMessages.slice(0, 10)
      }

      // Send directly to ntfy.sh (simplified approach)
      const ntfyServer = this.config.ntfyServer
      const ntfyTopic = this.config.ntfyTopic
      
      const notificationData = {
        message: message,
        title: `🎰 Blackjack Balance Update: $${context.currentBalance}`,
        priority: 3,
        tags: ['game', 'casino', 'balance']
      }
      
      const response = await fetch(`${ntfyServer}/${ntfyTopic}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(notificationData)
      })

      if (response.ok) {
        this.lastNotificationTime = now
        console.log('[Notification Tool] Notification sent successfully:', message)
        return true
      } else {
        console.error('[Notification Tool] Failed to send notification:', await response.text())
        return false
      }
    } catch (error) {
      console.error('[Notification Tool] Error sending notification:', error)
      return false
    }
  }

  /**
   * Get recent messages for display
   */
  getRecentMessages(): QuirkyMessage[] {
    return [...this.recentMessages]
  }

  /**
   * Clear message history
   */
  clearMessages(): void {
    this.recentMessages = []
  }

  /**
   * Get tool definition for MCP integration
   */
  getToolDefinition() {
    return {
      name: 'send_balance_notification',
      description: 'Send push notifications about balance changes via ntfy',
      parameters: {
        message: { type: 'string', description: 'Notification message content' },
        balance: { type: 'number', description: 'Current balance' },
        context: { type: 'string', description: 'Game context' }
      }
    }
  }

  /**
   * Update configuration
   */
  updateConfig(newConfig: Partial<NotificationConfig>): void {
    this.config = { ...this.config, ...newConfig }
  }

  /**
   * Check if notifications are enabled and properly configured
   */
  isConfigured(): boolean {
    return this.config.enabled && 
           Boolean(this.config.ntfyTopic) && 
           Boolean(this.config.ntfyServer)
  }
}

/**
 * Create notification tool with environment configuration
 */
export function createNotificationTool(): NotificationTool {
  // Helper function to get environment variable with runtime fallback
  const getEnvVar = (key: string, defaultValue?: string) => {
    // First try import.meta.env (build-time)
    const buildTimeValue = import.meta.env[key]
    if (buildTimeValue !== undefined) return buildTimeValue
    
    // Then try window.__ENV__ (runtime injection)
    const runtimeValue = (window as any)?.__ENV__?.[key]
    if (runtimeValue !== undefined && runtimeValue !== `\${${key}}`) return runtimeValue
    
    // Finally use default
    return defaultValue
  }

  const ntfyTopic = getEnvVar('VITE_NTFY_TOPIC', 'blackjack-ai-balance-notifications')
  const ntfyServer = getEnvVar('VITE_NTFY_SERVER', 'https://ntfy.sh')
  const enabledValue = getEnvVar('VITE_ENABLE_BALANCE_NOTIFICATIONS')
  
  const config: NotificationConfig = {
    ntfyTopic,
    ntfyServer,
    enabled: enabledValue === 'true' || enabledValue === undefined // Default to true if undefined
  }

  // Debug logging
  console.log('[Notification Tool] Configuration:', {
    topic: config.ntfyTopic,
    server: config.ntfyServer, 
    enabled: config.enabled,
    envVars: {
      buildTime: {
        VITE_NTFY_TOPIC: import.meta.env.VITE_NTFY_TOPIC,
        VITE_NTFY_SERVER: import.meta.env.VITE_NTFY_SERVER,
        VITE_ENABLE_BALANCE_NOTIFICATIONS: import.meta.env.VITE_ENABLE_BALANCE_NOTIFICATIONS
      },
      runtime: (window as any)?.__ENV__,
      resolved: {
        VITE_NTFY_TOPIC: ntfyTopic,
        VITE_NTFY_SERVER: ntfyServer,
        VITE_ENABLE_BALANCE_NOTIFICATIONS: enabledValue
      }
    }
  })

  return new NotificationTool(config)
}