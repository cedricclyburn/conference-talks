import { CardSuits, CardValue } from '@/cards'
import type { AIRecommendation, ModelConfig, PerformanceMetrics } from './services/aiService'
import type { QuirkyMessage } from './services/notificationTool'

export type CardSuit = (typeof CardSuits)[number]
export type CardRank = keyof typeof CardValue
export type HandResult = 'win' | 'lose' | 'push' | 'blackjack' | 'bust'

export type Card = {
  rank: CardRank
  suit: CardSuit
  index: number
}

export type Player = {
  name?: string
  isDealer: boolean
  bank: number
  /** The player's hands (A player can have two hands after splitting) */
  hands: Hand[]
}

export type GameState = {
  /** The shoe of cards */
  shoe: Card[]
  /** Number of cards played */
  cardsPlayed: number
  /** The players in the game, including the dealer */
  players: Player[]
  /** The player whose turn it is */
  activePlayer: Player | null
  /** The hand that is currently being played */
  activeHand: Hand | null
  /** Whether the dealer is dealing cards (preventing interaction) */
  isDealing: boolean
  /** Whether the dealer's hole card is face up */
  showDealerHoleCard: boolean
  /** Whether the sound is muted */
  isMuted: boolean
  /** Whether the game is over due to bankruptcy */
  isGameOver: boolean
  /** The download progress of the sound files */
  soundLoadProgress: number
  /** AI-related state */
  aiRecommendation: AIRecommendation | null
  /** Whether AI is currently loading a recommendation */
  isAiLoading: boolean
  /** Whether to show the AI recommendation */
  showAiRecommendation: boolean
  /** Performance metrics for AI requests */
  aiPerformanceMetrics: PerformanceMetrics[]
  /** Current AI model configuration */
  currentAiModel: ModelConfig | null
  /** Whether to show the performance overlay */
  showPerformanceOverlay: boolean
  /** Balance notification state */
  balanceNotificationsEnabled: boolean
  /** Recent balance notification messages */
  recentBalanceMessages: QuirkyMessage[]
  /** Whether currently sending a balance notification */
  isSendingBalanceNotification: boolean
}

export class Hand {
  id: number
  cards: Card[]
  bet: number
  result?: 'win' | 'lose' | 'push' | 'bust' | 'blackjack'

  constructor(bet = 0) {
    this.id = new Date().getTime() + Math.random()
    this.cards = []
    this.bet = bet
  }

  get total(): number {
    let total = 0
    let addedHighAce = false
    for (const card of this.cards) {
      total += CardValue[card.rank as CardRank]
      if (card.rank === 'A' && !addedHighAce) {
        total += 10
        addedHighAce = true
      }
    }
    if (total > 21 && addedHighAce) total -= 10
    return total
  }

  get isBust(): boolean {
    return this.total > 21
  }

  get isBlackjack(): boolean {
    return this.total === 21 && this.cards.length === 2
  }

  reset() {
    this.cards = []
    this.bet = 0
    this.result = undefined
  }
}
