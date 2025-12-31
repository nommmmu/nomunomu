<script setup>
import { ref, computed } from 'vue'

// ダークモード/ライトモードの切り替え
const isDarkMode = ref(true)

// テーマカラーの算出プロパティ
const themeColors = computed(() => {
  if (isDarkMode.value) {
    return {
      background: '#121212',
      text: '#65D6AD',
      buttonBg: '#121212',
      buttonBorder: '#65D6AD',
      buttonText: '#65D6AD'
    }
  } else {
    return {
      background: '#f5f5f5',
      text: '#014D40',
      buttonBg: 'rgba(51, 51, 51, 0.1)',
      buttonBorder: '#014D40',
      buttonText: '#014D40'
    }
  }
})

// モード切り替え関数
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
}
</script>

<template>
  <div 
    class="year-container" 
    :style="{ 
      backgroundColor: themeColors.background, 
      color: themeColors.text 
    }"
  >
    <button 
      class="theme-toggle" 
      @click="toggleTheme"
      :style="{
        backgroundColor: themeColors.buttonBg,
        borderColor: themeColors.buttonBorder,
        color: themeColors.buttonText
      }"
    >
      <span class="icon">
        <svg v-if="isDarkMode" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </span>
    </button>
    
    
    <div class="year-display">
      <h1 class="year-number">2025</h1>
    </div>
  </div>
</template>

<style scoped>
.year-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Courier New', Courier, monospace;
  transition: all 0.3s ease;
  position: relative;
  padding: 2rem;
}

.theme-toggle {
  position: absolute;
  top: 2rem;
  right: 2rem;
  padding: 0.75rem;
  border: 2px solid;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  transform: scale(1.1);
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-link {
  position: absolute;
  top: 2rem;
  left: 2rem;
  text-decoration: none;
  font-size: 1rem;
  transition: transform 0.3s ease;
}

.back-link:hover {
  transform: translateX(-4px);
}

.year-display {
  text-align: center;
}

.year-number {
  font-size: 8rem;
  font-weight: bold;
  letter-spacing: 0.1em;
  margin: 0;
  line-height: 1;
  animation: fadeInScale 1s ease-out;
}

.year-description {
  font-size: 1.5rem;
  margin-top: 2rem;
  letter-spacing: 0.15em;
  opacity: 0.8;
  animation: fadeInUp 1s ease-out 0.3s both;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .year-number {
    font-size: 4rem;
  }
  
  .year-description {
    font-size: 1rem;
  }
  
  .theme-toggle,
  .back-link {
    top: 1rem;
  }
  
  .theme-toggle {
    right: 1rem;
  }
  
  .back-link {
    left: 1rem;
  }
}
</style>
