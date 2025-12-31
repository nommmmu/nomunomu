<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// ダークモード/ライトモードの切り替え
const isDarkMode = ref(true)

// 花火の配列
const fireworks = ref([])
let fireworkId = 0
let animationInterval = null

// テーマカラーの算出プロパティ
const themeColors = computed(() => {
  if (isDarkMode.value) {
    return {
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
      text: '#ffffff',
      accentText: '#64ffda',
      buttonBg: 'rgba(100, 255, 218, 0.1)',
      buttonBorder: '#64ffda',
      buttonText: '#64ffda'
    }
  } else {
    return {
      background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ffeaa7 100%)',
      text: '#2d3436',
      accentText: '#6c5ce7',
      buttonBg: 'rgba(45, 52, 70, 0.1)',
      buttonBorder: '#6c5ce7',
      buttonText: '#6c5ce7',
      textGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)'
    }
  }
})

// モード切り替え関数
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
}

// 花火を生成する関数
const createFirework = () => {
  const colors = ['#ff006e', '#fb5607', '#ffbe0b', '#8338ec', '#3a86ff', '#06ffa5', '#ff69eb']
  const x = Math.random() * 100
  const y = 20 + Math.random() * 40
  const color = colors[Math.floor(Math.random() * colors.length)]
  const particles = []
  
  // パーティクルを生成
  const particleCount = 30 + Math.floor(Math.random() * 20)
  for (let i = 0; i < particleCount; i++) {
    const angle = (Math.PI * 2 * i) / particleCount
    const velocity = 50 + Math.random() * 50
    particles.push({
      id: Math.random(),
      angle,
      velocity,
      life: 1
    })
  }
  
  fireworks.value.push({
    id: fireworkId++,
    x,
    y,
    color,
    particles,
    createdAt: Date.now()
  })
  
  // 3秒後に花火を削除
  setTimeout(() => {
    fireworks.value = fireworks.value.filter(fw => fw.id !== fireworkId - 1)
  }, 3000)
}

// 定期的に花火を打ち上げる
onMounted(() => {
  animationInterval = setInterval(() => {
    if (Math.random() > 0.3) {
      createFirework()
    }
  }, 800)
})

onUnmounted(() => {
  if (animationInterval) {
    clearInterval(animationInterval)
  }
})
</script>

<template>
  <div 
    class="year-container" 
    :style="{ 
      background: themeColors.background, 
      color: themeColors.text 
    }"
  >
    <!-- 花火アニメーション -->
    <div class="fireworks-container">
      <div 
        v-for="firework in fireworks" 
        :key="firework.id"
        class="firework"
        :style="{ left: firework.x + '%', top: firework.y + '%' }"
      >
        <div 
          v-for="particle in firework.particles"
          :key="particle.id"
          class="particle"
          :style="{
            '--angle': particle.angle + 'rad',
            '--velocity': particle.velocity + 'px',
            backgroundColor: firework.color,
            boxShadow: `0 0 10px ${firework.color}, 0 0 20px ${firework.color}`
          }"
        ></div>
      </div>
    </div>

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
      <h1 class="year-number">2026</h1>
      <div class="year-badge">
        <span class="badge-text">Happy</span>
        <span class="badge-text">New</span>
        <span class="badge-text">Year</span>
      </div>
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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  transition: all 0.5s ease;
  position: relative;
  padding: 2rem;
  overflow: hidden;
}

.fireworks-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.firework {
  position: absolute;
  transform: translate(-50%, -50%);
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  animation: explode 2s ease-out forwards;
}

@keyframes explode {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(
      calc(cos(var(--angle)) * var(--velocity)),
      calc(sin(var(--angle)) * var(--velocity))
    ) scale(0);
    opacity: 0;
  }
}

.theme-toggle {
  position: absolute;
  top: 2rem;
  right: 2rem;
  padding: 0.75rem;
  border: 2px solid;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  z-index: 10;
}

.theme-toggle:hover {
  transform: scale(1.1) rotate(10deg);
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
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
  z-index: 10;
}

.back-link:hover {
  transform: translateX(-4px);
  background: rgba(255, 255, 255, 0.2);
}

.year-display {
  text-align: center;
  z-index: 5;
  animation: fadeInUp 1s ease-out;
}

.year-badge {
  display: inline-flex;
  gap: 0.75rem;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 900;
  letter-spacing: 0.05em;
  padding: 1rem 2rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  margin-top: 2rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
}

.badge-text {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 3s ease infinite, floatBounce 2s ease-in-out infinite;
  filter: drop-shadow(0 2px 8px rgba(102, 126, 234, 0.3));
}

.badge-text:nth-child(1) {
  animation-delay: 0s, 0s;
}

.badge-text:nth-child(2) {
  animation-delay: 0.2s, 0.2s;
}

.badge-text:nth-child(3) {
  animation-delay: 0.4s, 0.4s;
}

@keyframes floatBounce {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  25% {
    transform: translateY(-10px) scale(1.05);
  }
  75% {
    transform: translateY(-5px) scale(1.02);
  }
}

.year-number {
  font-size: clamp(5rem, 15vw, 12rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  margin: 0;
  line-height: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 3s ease infinite, scaleIn 1s ease-out;
  filter: drop-shadow(0 4px 12px rgba(102, 126, 234, 0.4));
}

@keyframes gradientShift {
  0%, 100% {
    filter: hue-rotate(0deg);
  }
  50% {
    filter: hue-rotate(20deg);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.year-description {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  margin-top: 2rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  animation: fadeInUp 1s ease-out 0.3s both;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.year-subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  margin-top: 1rem;
  opacity: 0.8;
  font-weight: 400;
  letter-spacing: 0.1em;
  animation: fadeInUp 1s ease-out 0.5s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .year-badge {
    font-size: clamp(1rem, 3vw, 1.5rem);
    padding: 0.75rem 1.5rem;
    gap: 0.5rem;
    margin-top: 1.5rem;
  }
  
  .year-description {
    margin-top: 1.5rem;
  }
  
  .year-subtitle {
    margin-top: 0.75rem;
  }
  
  .theme-toggle,
  .back-link {
    top: 1rem;
    padding: 0.5rem;
  }
  
  .theme-toggle {
    right: 1rem;
  }
  
  .back-link {
    left: 1rem;
    font-size: 0.875rem;
    padding: 0.5rem 0.75rem;
  }
  
  .back-link span {
    display: none;
  }
}
</style>
