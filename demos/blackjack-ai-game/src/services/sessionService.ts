export interface SessionData {
  sessionId: string
  playerName: string
  startTime: number
  lastActivity: number
  gamesPlayed: number
  totalBet: number
  totalWon: number
  aiRequestCount: number
  preferredModel: 'local' | 'remote'
}

export interface SessionStats {
  activeSessions: number
  totalSessions: number
  averageSessionTime: number
  mostPopularModel: 'local' | 'remote'
}

class SessionService {
  private currentSession: SessionData | null = null
  private sessionTimeout: number
  private maxSessions: number

  constructor() {
    this.sessionTimeout = parseInt(import.meta.env.VITE_SESSION_TIMEOUT) || 3600000 // 1 hour
    this.maxSessions = parseInt(import.meta.env.VITE_MAX_CONCURRENT_SESSIONS) || 100
    
    this.loadSession()
    this.startSessionCleanup()
  }

  generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  createSession(playerName?: string): SessionData {
    const sessionId = this.generateSessionId()
    const now = Date.now()
    
    const session: SessionData = {
      sessionId,
      playerName: playerName || `Player_${sessionId.slice(-4)}`,
      startTime: now,
      lastActivity: now,
      gamesPlayed: 0,
      totalBet: 0,
      totalWon: 0,
      aiRequestCount: 0,
      preferredModel: 'local'
    }
    
    this.currentSession = session
    this.saveSession()
    this.saveToGlobalSessions(session)
    
    return session
  }

  getCurrentSession(): SessionData | null {
    return this.currentSession
  }

  updateSession(updates: Partial<SessionData>): void {
    if (!this.currentSession) return
    
    this.currentSession = {
      ...this.currentSession,
      ...updates,
      lastActivity: Date.now()
    }
    
    this.saveSession()
    this.saveToGlobalSessions(this.currentSession)
  }

  incrementGamePlayed(): void {
    this.updateSession({
      gamesPlayed: (this.currentSession?.gamesPlayed || 0) + 1
    })
  }

  addBet(amount: number): void {
    this.updateSession({
      totalBet: (this.currentSession?.totalBet || 0) + amount
    })
  }

  addWinnings(amount: number): void {
    this.updateSession({
      totalWon: (this.currentSession?.totalWon || 0) + amount
    })
  }

  incrementAiRequest(): void {
    this.updateSession({
      aiRequestCount: (this.currentSession?.aiRequestCount || 0) + 1
    })
  }

  setPreferredModel(model: 'local' | 'remote'): void {
    this.updateSession({
      preferredModel: model
    })
  }

  endSession(): void {
    if (this.currentSession) {
      this.removeFromGlobalSessions(this.currentSession.sessionId)
    }
    this.currentSession = null
    localStorage.removeItem('blackjack_session')
  }

  getSessionStats(): SessionStats {
    const sessions = this.getAllSessions()
    const activeSessions = sessions.filter(s => this.isSessionActive(s)).length
    
    const sessionTimes = sessions.map(s => s.lastActivity - s.startTime)
    const averageSessionTime = sessionTimes.length > 0 
      ? sessionTimes.reduce((a, b) => a + b, 0) / sessionTimes.length 
      : 0

    const modelPreferences = sessions.map(s => s.preferredModel)
    const localCount = modelPreferences.filter(m => m === 'local').length
    const remoteCount = modelPreferences.filter(m => m === 'remote').length
    const mostPopularModel = localCount >= remoteCount ? 'local' : 'remote'

    return {
      activeSessions,
      totalSessions: sessions.length,
      averageSessionTime: Math.round(averageSessionTime),
      mostPopularModel
    }
  }

  private loadSession(): void {
    try {
      const sessionData = localStorage.getItem('blackjack_session')
      if (sessionData) {
        const session = JSON.parse(sessionData) as SessionData
        if (this.isSessionActive(session)) {
          this.currentSession = session
          this.updateSession({}) // Update last activity
        } else {
          localStorage.removeItem('blackjack_session')
        }
      }
    } catch (error) {
      console.warn('Failed to load session:', error)
      localStorage.removeItem('blackjack_session')
    }
  }

  private saveSession(): void {
    if (this.currentSession) {
      localStorage.setItem('blackjack_session', JSON.stringify(this.currentSession))
    }
  }

  private saveToGlobalSessions(session: SessionData): void {
    try {
      const sessions = this.getAllSessions()
      const existingIndex = sessions.findIndex(s => s.sessionId === session.sessionId)
      
      if (existingIndex >= 0) {
        sessions[existingIndex] = session
      } else {
        sessions.push(session)
      }
      
      // Keep only the most recent sessions (within limit)
      const sortedSessions = sessions
        .sort((a, b) => b.lastActivity - a.lastActivity)
        .slice(0, this.maxSessions)
      
      localStorage.setItem('blackjack_global_sessions', JSON.stringify(sortedSessions))
    } catch (error) {
      console.warn('Failed to save global sessions:', error)
    }
  }

  private removeFromGlobalSessions(sessionId: string): void {
    try {
      const sessions = this.getAllSessions()
      const filteredSessions = sessions.filter(s => s.sessionId !== sessionId)
      localStorage.setItem('blackjack_global_sessions', JSON.stringify(filteredSessions))
    } catch (error) {
      console.warn('Failed to remove from global sessions:', error)
    }
  }

  private getAllSessions(): SessionData[] {
    try {
      const sessionsData = localStorage.getItem('blackjack_global_sessions')
      return sessionsData ? JSON.parse(sessionsData) : []
    } catch (error) {
      console.warn('Failed to load global sessions:', error)
      return []
    }
  }

  private isSessionActive(session: SessionData): boolean {
    const now = Date.now()
    return (now - session.lastActivity) < this.sessionTimeout
  }

  private startSessionCleanup(): void {
    // Clean up inactive sessions every 5 minutes
    setInterval(() => {
      const sessions = this.getAllSessions()
      const activeSessions = sessions.filter(s => this.isSessionActive(s))
      
      if (activeSessions.length !== sessions.length) {
        localStorage.setItem('blackjack_global_sessions', JSON.stringify(activeSessions))
      }
    }, 5 * 60 * 1000)
  }
}

export const sessionService = new SessionService()