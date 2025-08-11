<script setup lang="ts">
import { state } from '@/store'
import { onMounted } from 'vue'
import GameHand from '@/components/GameHand.vue'
import SvgSprite from '@/components/SvgSprite.vue'
import AnimatedBackground from '@/components/AnimatedBackground.vue'
import { playSound, Sounds, initSound } from '@/sound'
import PlayerToolbar from '@/components/PlayerToolbar.vue'
import TitleScreen from '@/components/TitleScreen.vue'
import GameHeader from '@/components/GameHeader.vue'
import PerformanceOverlay from '@/components/PerformanceOverlay.vue'

onMounted(() => {
  initSound()
})

function onClickCapture(e: MouseEvent) {
  const target = e.target as HTMLButtonElement
  if (target?.tagName === 'BUTTON' && !target?.disabled) {
    playSound(Sounds.Click)
  }
}
</script>

<template>
  <div class="app-layout">
    <SvgSprite />
    <AnimatedBackground />
    <GameHeader />
    
    <div class="main-content" @click.capture="onClickCapture">
      <main class="game-area">
        <section
          class="player"
          v-for="(player, p) in state.players"
          :key="p"
          :class="{ dealer: player.isDealer }"
        >
          <GameHand v-for="hand in player.hands" :hand="hand" :player="player" :key="hand.id" />
        </section>
        <PlayerToolbar />
      </main>
      
      <PerformanceOverlay />
    </div>
    
    <TitleScreen />
  </div>
</template>

<style scoped>
.app-layout {
  height: 100vh;
  width: 100vw;
  position: relative;
}

.main-content {
  display: flex;
  height: 100vh;
  width: 100%;
}

.game-area {
  flex: 1;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 8rem;
  padding-bottom: 8rem;
  height: 100%;
  padding: 2rem 1rem 1rem 1rem;
  overflow: hidden;
}

section.player {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 8rem;
  min-height: 11.2rem;
}

section.player:not(.dealer) {
  flex-grow: 1;
}

section.player.dealer {
  z-index: -1;
}

/* Mobile responsive - hide sidebar on small screens */
@media (max-width: 1024px) {
  .main-content {
    flex-direction: column;
  }
  
  .game-area {
    flex: 1;
    min-height: 70vh;
  }
}

@media (max-width: 768px) {
  .game-area {
    gap: 4rem;
    padding: 1rem 0.5rem;
  }
  
  section.player {
    gap: 4rem;
  }
}
</style>
