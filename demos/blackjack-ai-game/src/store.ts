import { generateShoe, shuffle } from '@/cards'
import type { GameState, HandResult, Player } from './types'
import { computed, nextTick, reactive } from 'vue'
import { Sounds, playSound } from './sound'
import { Hand } from './types'
import type { ModelConfig } from '@/services/aiService'
import { sessionService } from '@/services/sessionService'
import { balanceTracker, type BalanceEvent } from '@/services/balanceTracker'
import type { QuirkyMessage } from '@/services/notificationTool'
import { createNotificationTool, type BalanceNotificationContext } from '@/services/notificationTool'

const MINIMUM_BET = 1
const STARTING_BANK = 20
const NUMBER_OF_DECKS = 6
/** Reshuffle once less than 25% of the cards are left */
const SHUFFLE_THRESHOLD = 0.25
const INITIAL_PLAYERS: Player[] = [
  { isDealer: false, bank: STARTING_BANK, hands: [new Hand()] },
  { isDealer: true, bank: 0, hands: [new Hand()] },
]

export const state = reactive<GameState>({
  shoe: generateShoe(NUMBER_OF_DECKS),
  cardsPlayed: 0,
  players: INITIAL_PLAYERS,
  activePlayer: null,
  activeHand: null,
  isDealing: true,
  showDealerHoleCard: false,
  isGameOver: false,
  isMuted: localStorage.getItem('isMuted') === 'true',
  soundLoadProgress: 0,
  // AI-related state
  aiRecommendation: null,
  isAiLoading: false,
  showAiRecommendation: false,
  aiPerformanceMetrics: [],
  currentAiModel: null,
  showPerformanceOverlay: false,
  // Balance notification state  
  balanceNotificationsEnabled: localStorage.getItem('balanceNotificationsEnabled') !== 'false', // Default to true
  recentBalanceMessages: [] as QuirkyMessage[],
  isSendingBalanceNotification: false,
})

// Initialize notification tool
const notificationTool = createNotificationTool()

// Initialize balance tracker and connect to notifications
balanceTracker.reset(STARTING_BANK)
balanceTracker.addListener((event: BalanceEvent) => {
  if (!state.balanceNotificationsEnabled) return
  
  const currentSession = sessionService.getCurrentSession()
  const shouldNotify = balanceTracker.shouldNotifyForEvent(event)
  
  if (shouldNotify && currentSession) {
    const context = balanceTracker.createBalanceNotificationContext({
      gamesPlayed: currentSession.gamesPlayed,
      totalWinnings: currentSession.totalWon,
      totalBets: currentSession.totalBet
    })
    
    // Send notification async without blocking game flow
    notificationTool.sendNotification(context).then(success => {
      if (success) {
        console.log('[Store] Balance notification sent successfully')
        state.recentBalanceMessages = notificationTool.getRecentMessages()
      }
    }).catch(error => {
      console.error('[Store] Failed to send balance notification:', error)
    })
  }
})

// Computed Properties

export const dealer = computed(() => state.players[state.players.length - 1])

const dealerHasBlackjack = computed(() => {
  return dealer.value.hands[0].isBlackjack
})

const dealerTotal = computed(() => dealer.value.hands[0].total)

const nextPlayer = computed(() => {
  if (!state.activePlayer || state.activePlayer === dealer.value) return null
  return state.players[state.players.indexOf(state.activePlayer) + 1]
})

export const canDoubleDown = computed(() => {
  if (state.isDealing) return false
  if ((state.activePlayer?.bank ?? 0) < (state.activeHand?.bet ?? 0)) return false
  return state.activeHand?.cards.length === 2 && state.activePlayer?.hands.length === 1
})

export const canSplit = computed(() => {
  if (state.isDealing) return false
  if ((state.activePlayer?.bank ?? 0) < (state.activeHand?.bet ?? 0)) return false
  return (
    state.activeHand?.cards.length === 2 &&
    state.activePlayer?.hands.length === 1 &&
    state.activeHand?.cards[0].rank === state.activeHand!.cards[1].rank
  )
})

export const resetBank = () => {
  state.players.forEach((p) => (p.bank = STARTING_BANK))
}

// Functions

/** Play a round of blackjack.  Reset hands, reshuffle, place bets, deal cards, and play the first turn. */
export async function playRound() {
  if (checkForGameOver()) return
  clearAiRecommendation() // Clear AI recommendation at start of new round
  
  // Initialize session if it doesn't exist
  if (!sessionService.getCurrentSession()) {
    sessionService.createSession()
  }
  
  state.players.forEach((p) => (p.hands = [new Hand()]))
  state.showDealerHoleCard = false
  await placeBet(state.players[0], state.players[0].hands[0], MINIMUM_BET)
  await dealRound()
  if (dealerHasBlackjack.value) return endRound()
  playTurn(state.players[0])
  
  // Track game played
  sessionService.incrementGamePlayed()
}

/** If the player is bankrupt, end the game. */
function checkForGameOver(): boolean {
  if (state.players[0].bank < MINIMUM_BET) {
    playSound(Sounds.GameOver)
    state.isGameOver = true
    return true
  }
  return false
}

/** Draw a card from the shoe. */
function drawCard() {
  reshuffleIfNeeded()
  state.cardsPlayed++
  return state.shoe.shift()
}

/** Reshuffle the shoe if less than 25% of the cards are left. */
function reshuffleIfNeeded() {
  const remainingPercentage = 1 - state.cardsPlayed / (NUMBER_OF_DECKS * 52)
  if (remainingPercentage > SHUFFLE_THRESHOLD) return
  state.shoe = shuffle(state.shoe)
  state.cardsPlayed = 0
}

/** Deal two cards to each player */
async function dealRound() {
  for (let i = 0; i < 2; i++) {
    for (const player of state.players) {
      player.hands[0].cards.push(drawCard()!)
      playSound(Sounds.Deal)
      await sleep(600)
    }
  }
}

/** Place a bet for the player. */
async function placeBet(player: Player, hand: Hand, amount: number) {
  state.isDealing = true
  await nextTick()
  const oldBank = player.bank
  player.bank -= amount
  hand.bet += amount
  playSound(Sounds.Bet)
  
  // Track betting in session
  sessionService.addBet(amount)
  
  // Track balance change for notifications
  if (!player.isDealer) {
    balanceTracker.updateBalance(player.bank, 'loss', amount)
  }
  
  await sleep()
}

/** Start a player's turn by making them the active player and starting their first hand. */
function playTurn(player: Player) {
  state.activePlayer = player
  if (player.isDealer) return playDealerHand(player.hands[0])
  playHand(player.hands[0])
}

/** Set a hand as the active hand. End immediately if the player has blackjack. Deal additional cards to split hands. */
async function playHand(hand: Hand): Promise<void> {
  state.isDealing = true
  state.activeHand = hand
  if (await checkForBlackjack(hand)) return
  if (hand.cards.length === 1) {
    // Newly split hand
    await hit()
    if (hand.cards[0].rank === 'A') return endHand() // Player cannot hit after splitting aces
  }
  state.isDealing = false
}

/** Check if the player has blackjack. If so, award the player and end the hand. */
async function checkForBlackjack(hand: Hand): Promise<boolean> {
  if (hand.isBlackjack) {
    hand.result = 'blackjack'
    await sleep(100)
    playSound(Sounds.BlackjackBoom)
    await sleep(500)
    playSound(Sounds.Blackjack)
    await sleep(1200)
    const oldBet = hand.bet
    hand.bet *= 3
    
    // Track blackjack for balance notifications
    if (!state.activePlayer?.isDealer) {
      const winnings = hand.bet - oldBet
      balanceTracker.updateBalance(state.players[0].bank + hand.bet, 'blackjack', winnings)
    }
    
    endHand()
    return true
  }
  return false
}

/** Play the dealer's hand. */
async function playDealerHand(hand: Hand) {
  state.isDealing = true
  state.activeHand = hand
  await revealDealerHoleCard()
  const allPlayersDone = state.players.every(
    (p) => p.isDealer || p.hands.every((h: Hand) => !!h.result),
  )
  if (allPlayersDone) return endRound()
  if (dealerTotal.value < 17) {
    await hit()
    if (!dealer.value.hands[0].result) return playDealerHand(hand)
  }
  endRound()
}

/** Deal one more card to the active hand, and check for 21 or a bust. */
export async function hit() {
  state.isDealing = true
  state.activeHand!.cards.push(drawCard()!)
  playSound(Sounds.Deal)
  if (await checkForTwentyOne(state.activeHand!)) return
  if (await checkForBust(state.activeHand!)) return
  await sleep()
  if (!state.activePlayer?.isDealer) state.isDealing = false
}

/** Check if the player has 21.  If so, end the hand. */
async function checkForTwentyOne(hand: Hand): Promise<boolean> {
  if (hand.total === 21) {
    if (!state.activePlayer?.isDealer) playSound(Sounds.GoodHit)
    await sleep()
    endHand()
    return true
  }
  return false
}

/** Check if the player has busted.  If so, end the hand. */
async function checkForBust(hand: Hand): Promise<boolean> {
  if (hand.isBust) {
    if (!state.activePlayer?.isDealer) playSound(Sounds.BadHit)
    await sleep()
    state.activeHand = null
    await sleep(300)
    hand.result = 'bust'
    if (!state.activePlayer?.isDealer) {
      playSound(Sounds.Bust)
      // Track bust for balance notifications
      balanceTracker.updateBalance(state.players[0].bank, 'bust', 0)
    }
    endHand()
    return true
  }
  return false
}

/** Split the active hand into two hands, and restart the player's turn. */
export async function split(): Promise<void> {
  if (!canSplit.value) return
  state.isDealing = true
  const bet = state.activeHand!.bet
  const splitHands = [new Hand(bet), new Hand(0)]
  splitHands[0].cards = state.activeHand!.cards.slice(0, 1)
  splitHands[1].cards = state.activeHand!.cards.slice(1)
  state.activeHand = null
  await sleep()
  state.activePlayer!.hands = splitHands
  await placeBet(state.activePlayer!, state.activePlayer!.hands[1], bet)
  playTurn(state.activePlayer!)
}

/** Double the bet for the active hand, and hit only once. */
export async function doubleDown(): Promise<void> {
  if (!canDoubleDown.value) return
  await placeBet(state.activePlayer!, state.activeHand!, state.activeHand!.bet)
  await hit()
  endHand()
}

/** Advance to the next hand or player. */
export async function endHand() {
  clearAiRecommendation() // Clear AI recommendation when hand ends
  const isSplit = state.activePlayer && state.activePlayer.hands.length > 1
  if (isSplit && state.activePlayer?.hands[1].cards.length === 1) {
    return playHand(state.activePlayer?.hands[1])
  }
  if (nextPlayer.value) playTurn(nextPlayer.value)
}

/** Determine any remaining results, settle bets, collect winnings, and reset hands before starting a new round. */
async function endRound() {
  state.isDealing = true
  if (!state.showDealerHoleCard) await revealDealerHoleCard()
  if (dealerHasBlackjack.value) playSound(Sounds.DealerBlackjack)
  state.activeHand = null
  state.activePlayer = null
  await determineResults()
  await settleBets()
  await collectWinnings()
  await resetHands()
  playRound()
}

/** Reveal the dealer's hole card. */
async function revealDealerHoleCard() {
  if (state.showDealerHoleCard) return
  await sleep()
  playSound(Sounds.Deal)
  state.showDealerHoleCard = true
  await sleep()
}

/** Determine the result for each hand (e.g. win, lose, push, blackjack, bust). */
async function determineResults() {
  for (const player of state.players) {
    if (player.isDealer) continue
    for (const hand of player.hands) {
      if (hand.result) continue
      if (dealerTotal.value > 21) hand.result = 'win'
      else if (dealerTotal.value === hand.total) hand.result = 'push'
      else if (dealerTotal.value < hand.total) hand.result = 'win'
      else hand.result = 'lose'
      playSoundForResult(hand.result)
      await sleep()
    }
  }
}

/** Play a sound for the result of a hand. */
function playSoundForResult(result: HandResult) {
  if (result === 'win') {
    playSound(Sounds.Win)
  } else if (result === 'push') {
    playSound(Sounds.Push)
  } else if (!dealerHasBlackjack.value) {
    playSound(Sounds.Lose)
  }
}

/** Add each hand's winnings to the hand's bet amount (so it can be collected later).*/
async function settleBets() {
  let total = 0
  for (const player of state.players) {
    if (player.isDealer) continue
    for (const hand of player.hands) {
      // Blackjack is paid out immediately, so it is not handled here
      if (hand.result === 'win') hand.bet *= 2
      if (['lose', 'bust'].includes(hand.result!)) hand.bet = 0
      total += hand.bet
    }
  }
  playSound(total > 1 ? Sounds.ChipUp : Sounds.ChipDown)
  await sleep()
}

/** Collect the total winnings (from each hand's bet) and add it to the player's bank. */
async function collectWinnings() {
  for (const player of state.players) {
    if (player.isDealer) continue
    
    const oldBank = player.bank
    const total = player.hands.reduce((acc: number, hand: Hand) => acc + hand.bet, 0)
    player.bank += total
    
    if (total > 0) {
      playSound(Sounds.Bank)
      // Track winnings in session
      sessionService.addWinnings(total)
      
      // Determine action based on hand results
      const handResults = player.hands.map(h => h.result).filter(Boolean)
      let action: 'win' | 'loss' | 'blackjack' | 'bust' | 'push' = 'win'
      
      if (handResults.includes('blackjack')) {
        action = 'blackjack'
      } else if (handResults.includes('bust')) {
        action = 'bust'  
      } else if (handResults.every(r => r === 'push')) {
        action = 'push'
      } else if (handResults.includes('win')) {
        action = 'win'
      } else {
        action = 'loss'
      }
      
      // Track balance change for notifications
      balanceTracker.updateBalance(player.bank, action, total - (oldBank === player.bank ? 0 : oldBank))
    }
    
    for (const hand of player.hands) hand.bet = 0
  }
  await sleep(300)
}

/** Reset all hands to an initial state. */
async function resetHands() {
  for (const player of state.players) {
    for (const hand of player.hands) {
      state.shoe.push(...hand.cards)
      hand.reset()
    }
  }
  await sleep()
}

/** Sleep for a given number of milliseconds. This paces the game and gives time for animations and sounds. */
function sleep(ms: number = 900) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// AI Functions

/** Get AI recommendation for the current game state */
export async function getAiRecommendation() {
  if (!state.activePlayer || state.activePlayer.isDealer || !state.activeHand) return
  
  state.isAiLoading = true
  state.aiRecommendation = null
  
  try {
    const { aiService } = await import('@/services/aiService')
    
    // Convert game state to AI service format
    const gameState = {
      playerCards: state.activeHand.cards.map(card => card.rank),
      dealerUpCard: dealer.value.hands[0].cards[0]?.rank || '',
      playerTotal: state.activeHand.total,
      canSplit: canSplit.value,
      canDoubleDown: canDoubleDown.value
    }
    
    const recommendation = await aiService.getRecommendation(gameState)
    
    state.aiRecommendation = recommendation
    state.showAiRecommendation = true
    state.currentAiModel = aiService.getCurrentModel()
    
    // Update performance metrics
    const metrics = aiService.getPerformanceHistory()
    state.aiPerformanceMetrics = metrics
    
    // Track AI request in session
    sessionService.incrementAiRequest()
    
    playSound(Sounds.GoodHit) // Play a sound when AI recommendation is ready
  } catch (error) {
    console.error('Failed to get AI recommendation:', error)
    state.aiRecommendation = {
      action: 'stand',
      confidence: 0,
      reasoning: 'AI service temporarily unavailable',
      responseTime: 0
    }
    state.showAiRecommendation = true
  } finally {
    state.isAiLoading = false
  }
}

/** Clear the current AI recommendation */
export function clearAiRecommendation() {
  state.aiRecommendation = null
  state.showAiRecommendation = false
}

/** Toggle the performance overlay */
export function togglePerformanceOverlay() {
  state.showPerformanceOverlay = !state.showPerformanceOverlay
}

/** Switch AI model */
export async function switchAiModel(modelConfig: ModelConfig) {
  const { aiService } = await import('@/services/aiService')
  aiService.setModel(modelConfig)
  state.currentAiModel = modelConfig
  clearAiRecommendation() // Clear current recommendation when switching models
  
  // Update session preference
  sessionService.setPreferredModel(modelConfig.type)
}

// Session Functions

/** Get current session data */
export function getCurrentSession() {
  return sessionService.getCurrentSession()
}

/** Get session statistics */
export function getSessionStats() {
  return sessionService.getSessionStats()
}

/** End current session */
export function endSession() {
  sessionService.endSession()
}
