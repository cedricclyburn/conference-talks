import type { BalanceNotificationContext } from './notificationTool'

export interface BalanceEvent {
  oldBalance: number
  newBalance: number
  change: number
  action: 'win' | 'loss' | 'blackjack' | 'bust' | 'push' | 'game_start'
  winAmount?: number
  timestamp: number
}

export interface SessionContext {
  gamesPlayed: number
  totalWinnings: number
  totalBets: number
}

export type BalanceEventListener = (event: BalanceEvent) => void

class BalanceTracker {
  private currentBalance = 0
  private previousBalance = 0
  private lastNotificationTime = 0
  private listeners: BalanceEventListener[] = []
  private eventHistory: BalanceEvent[] = []
  private readonly SIGNIFICANT_CHANGE_THRESHOLD = 5
  private readonly NOTIFICATION_COOLDOWN = 30000 // 30 seconds

  constructor() {
    this.reset(20) // Default starting balance
  }

  /**
   * Reset the balance tracker to initial state
   */
  reset(initialBalance: number) {
    this.currentBalance = initialBalance
    this.previousBalance = initialBalance
    this.lastNotificationTime = 0
    this.eventHistory = []
  }

  /**
   * Update the balance and trigger events
   */
  updateBalance(newBalance: number, action: BalanceEvent['action'], winAmount?: number) {
    this.previousBalance = this.currentBalance
    this.currentBalance = newBalance
    
    const event: BalanceEvent = {
      oldBalance: this.previousBalance,
      newBalance: this.currentBalance,
      change: this.currentBalance - this.previousBalance,
      action,
      winAmount,
      timestamp: Date.now()
    }

    this.eventHistory.push(event)
    if (this.eventHistory.length > 50) {
      this.eventHistory = this.eventHistory.slice(-50) // Keep last 50 events
    }

    // Notify listeners
    this.listeners.forEach(listener => {
      try {
        listener(event)
      } catch (error) {
        console.error('[Balance Tracker] Error in event listener:', error)
      }
    })
  }

  /**
   * Add a listener for balance events
   */
  addListener(listener: BalanceEventListener) {
    this.listeners.push(listener)
  }

  /**
   * Remove a listener
   */
  removeListener(listener: BalanceEventListener) {
    const index = this.listeners.indexOf(listener)
    if (index > -1) {
      this.listeners.splice(index, 1)
    }
  }

  /**
   * Check if we should notify for this event
   */
  shouldNotifyForEvent(event: BalanceEvent): boolean {
    const now = Date.now()
    
    // Check cooldown
    if (now - this.lastNotificationTime < this.NOTIFICATION_COOLDOWN) {
      return false
    }

    // Always notify for special events
    if (event.action === 'blackjack' || event.action === 'bust') {
      this.lastNotificationTime = now
      return true
    }

    // Notify for significant changes
    if (Math.abs(event.change) >= this.SIGNIFICANT_CHANGE_THRESHOLD) {
      this.lastNotificationTime = now
      return true
    }

    // Notify for low balance warnings
    if (event.newBalance <= 5 && event.oldBalance > 5) {
      this.lastNotificationTime = now
      return true
    }

    return false
  }

  /**
   * Create notification context from current state
   */
  createBalanceNotificationContext(sessionContext: SessionContext): BalanceNotificationContext {
    const lastEvent = this.eventHistory[this.eventHistory.length - 1]
    
    return {
      currentBalance: this.currentBalance,
      previousBalance: this.previousBalance,
      lastAction: lastEvent?.action || 'game_start',
      winAmount: lastEvent?.winAmount,
      sessionStats: sessionContext
    }
  }

  /**
   * Get current balance
   */
  getCurrentBalance(): number {
    return this.currentBalance
  }

  /**
   * Get previous balance
   */
  getPreviousBalance(): number {
    return this.previousBalance
  }

  /**
   * Get event history
   */
  getEventHistory(): BalanceEvent[] {
    return [...this.eventHistory]
  }

  /**
   * Get recent significant events
   */
  getRecentSignificantEvents(count = 10): BalanceEvent[] {
    return this.eventHistory
      .filter(event => 
        event.action === 'blackjack' || 
        event.action === 'bust' || 
        Math.abs(event.change) >= this.SIGNIFICANT_CHANGE_THRESHOLD
      )
      .slice(-count)
  }

  /**
   * Get balance statistics
   */
  getBalanceStats() {
    const events = this.eventHistory
    const wins = events.filter(e => e.change > 0)
    const losses = events.filter(e => e.change < 0)
    
    return {
      totalGains: wins.reduce((sum, e) => sum + e.change, 0),
      totalLosses: losses.reduce((sum, e) => sum + Math.abs(e.change), 0),
      netChange: this.currentBalance - (this.eventHistory[0]?.oldBalance || this.currentBalance),
      biggestWin: Math.max(...events.map(e => e.change), 0),
      biggestLoss: Math.min(...events.map(e => e.change), 0),
      winStreaks: this.calculateStreaks(events, e => e.change > 0),
      lossStreaks: this.calculateStreaks(events, e => e.change < 0)
    }
  }

  /**
   * Calculate win/loss streaks
   */
  private calculateStreaks(events: BalanceEvent[], condition: (event: BalanceEvent) => boolean): number[] {
    const streaks: number[] = []
    let currentStreak = 0
    
    events.forEach(event => {
      if (condition(event)) {
        currentStreak++
      } else {
        if (currentStreak > 0) {
          streaks.push(currentStreak)
        }
        currentStreak = 0
      }
    })
    
    if (currentStreak > 0) {
      streaks.push(currentStreak)
    }
    
    return streaks
  }
}

// Export singleton instance
export const balanceTracker = new BalanceTracker()