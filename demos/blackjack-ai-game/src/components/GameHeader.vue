<script setup lang="ts">
import { state, togglePerformanceOverlay } from '@/store'

function toggleSound() {
  state.isMuted = !state.isMuted
  localStorage.setItem('isMuted', state.isMuted.toString())
}
</script>

<template>
  <header>
    <div class="branding">
      <span class="created-by">Created by</span>
      <a 
        href="https://developers.redhat.com" 
        target="_blank" 
        rel="noopener noreferrer"
        class="brand-link"
      >
        Red Hat Developer Advocates
      </a>
      <span class="amp">&</span>
      <a 
        href="https://github.com/kevinleedrum" 
        target="_blank" 
        rel="noopener noreferrer"
        class="brand-link"
      >
        kevinleedrum
      </a>
    </div>
    <div class="header-buttons">
      <button @click="togglePerformanceOverlay" aria-label="Toggle performance monitor" class="performance-btn">
        🔬
      </button>
      <button @click="toggleSound" aria-label="Toggle sound">
      <svg
        v-if="!state.isMuted"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"
        />
        <path d="M16 9a5 5 0 0 1 0 6" />
        <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-volume-off"
      >
        <path d="M16 9a5 5 0 0 1 .95 2.293" />
        <path d="M19.364 5.636a9 9 0 0 1 1.889 9.96" />
        <path d="m2 2 20 20" />
        <path
          d="m7 7-.587.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298V11"
        />
        <path d="M9.828 4.172A.686.686 0 0 1 11 4.657v.686" />
      </svg>
      </button>
    </div>
  </header>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  pointer-events: none;
  z-index: 100;
}

.branding {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  pointer-events: auto;
  font-size: 1.1rem;
  color: var(--color-off-white);
  opacity: 0.9;
}

.created-by {
  color: var(--color-off-white);
  opacity: 0.7;
}

.brand-link {
  color: var(--color-off-white);
  text-decoration: none;
  font-weight: 600;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
}

.brand-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.amp {
  color: var(--color-off-white);
  opacity: 0.6;
  font-weight: 300;
}


.header-buttons {
  display: flex;
  gap: 0.5rem;
}

button {
  border-radius: 50%;
  height: 40px;
  width: 40px;
  pointer-events: auto;
  opacity: 0.75;
  color: var(--color-off-white);
}

.performance-btn {
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media (hover: hover) {
  button:hover {
    opacity: 1;
    color: var(--color-black);
  }
}

button {
  padding: 0.625rem;
  background: transparent;
}

button:focus-visible,
button:active {
  color: var(--color-black);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .branding {
    font-size: 0.95rem;
    gap: 0.25rem;
  }
  
  .brand-link {
    padding: 0.15rem 0.3rem;
  }
  
  button {
    height: 35px;
    width: 35px;
  }
  
  .performance-btn {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .branding {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.15rem;
    font-size: 0.85rem;
  }
  
  .created-by {
    display: none; /* Hide "Created by" on very small screens */
  }
  
  header {
    flex-direction: column;
    height: auto;
    padding: 0.5rem;
    gap: 0.5rem;
  }
  
  .header-buttons {
    order: 2;
  }
}
</style>
