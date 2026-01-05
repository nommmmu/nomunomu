<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

// 多言語対応
const { t, locale, availableLocales } = useI18n()

// ダークモード/ライトモードの切り替え
const isDarkMode = ref(true)

// テーマカラーの算出プロパティ
const themeColors = computed(() => {
  if (isDarkMode.value) {
    return {
      background: '#1a1a2e',
      text: '#b794f6',
      cardBg: '#242442',
      buttonBg: '#1a1a2e',
      buttonBorder: '#b794f6',
      buttonText: '#b794f6',
      accent: '#9b72f2'
    }
  } else {
    return {
      background: '#f8f7fc',
      text: '#6b46c1',
      cardBg: '#ffffff',
      buttonBg: 'rgba(107, 70, 193, 0.1)',
      buttonBorder: '#6b46c1',
      buttonText: '#6b46c1',
      accent: '#8b5cf6'
    }
  }
})

// モード切り替え関数
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
}

// 言語切り替え関数
const switchLocale = () => {
  const locales = ['ja', 'en', 'zh', 'ko']
  const currentIndex = locales.indexOf(locale.value)
  const nextIndex = (currentIndex + 1) % locales.length
  locale.value = locales[nextIndex]
}

// 言語名の表示
const localeName = computed(() => {
  const names = {
    ja: '日本語',
    en: 'English',
    zh: '中文',
    ko: '한국어'
  }
  return names[locale.value] || locale.value
})
</script>

<template>
  <div 
    class="kaimono-container" 
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

    <button 
      class="language-toggle" 
      @click="switchLocale"
      :style="{
        backgroundColor: themeColors.buttonBg,
        borderColor: themeColors.buttonBorder,
        color: themeColors.buttonText
      }"
    >
      <span class="locale-text">{{ localeName }}</span>
    </button>

    <div class="content">
      <div class="header">
        <img 
          src="../assets/kaimono_ios_icon.png" 
          alt="買い物メモアプリアイコン" 
          class="app-icon"
        />
        <h1>{{ t('kaimonomemo.title') }}</h1>
        <p class="subtitle">{{ t('kaimonomemo.subtitle') }}</p>
      </div>

      <div 
        class="app-info"
        :style="{ 
          backgroundColor: themeColors.cardBg,
          color: themeColors.text
        }"
      >
        <h2>{{ t('kaimonomemo.about.title') }}</h2>
        <p>
          {{ t('kaimonomemo.about.description') }}
        </p>
        
        <h3>{{ t('kaimonomemo.about.featuresTitle') }}</h3>
        <ul class="features-list">
          <li>🛒 {{ t('kaimonomemo.about.features.list') }}</li>
          <li>✓ {{ t('kaimonomemo.about.features.checkbox') }}</li>
          <li>📝 {{ t('kaimonomemo.about.features.edit') }}</li>
          <li>💾 {{ t('kaimonomemo.about.features.save') }}</li>
          <li>🎨 {{ t('kaimonomemo.about.features.design') }}</li>
        </ul>
      </div>

      <div class="screenshots">
        <h2>{{ t('kaimonomemo.screenshots.title') }}</h2>
        <div class="screenshot-gallery">
          <img 
            src="../assets/kaimono_ios_01.png" 
            alt="買い物メモアプリの画面" 
            class="screenshot"
          />
        </div>
      </div>

      <div 
        class="download-section"
        :style="{ 
          backgroundColor: themeColors.cardBg,
          color: themeColors.text
        }"
      >
        <h2>{{ t('kaimonomemo.download.title') }}</h2>
        <p>{{ t('kaimonomemo.download.description') }}</p>
        <div class="store-badges">
          <a href="#" class="store-link">
            <div 
              class="store-badge"
              :style="{
                borderColor: themeColors.buttonBorder,
                color: themeColors.buttonText
              }"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              {{ t('kaimonomemo.download.appStore') }}
            </div>
          </a>
        </div>
      </div>

      <div 
        class="contact-section"
        :style="{ 
          backgroundColor: themeColors.cardBg,
          color: themeColors.text
        }"
      >
        <h2>{{ t('kaimonomemo.contact.title') }}</h2>
        <p>{{ t('kaimonomemo.contact.description') }}</p>
        <div class="contact-info">
          <a 
            href="mailto:support@nomunomu.dev" 
            class="email-link"
            :style="{
              color: themeColors.accent
            }"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            support@nomunomu.dev
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kaimono-container {
  min-height: 100vh;
  padding: 2rem;
  transition: all 0.3s ease;
  position: relative;
}

.theme-toggle {
  position: fixed;
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
  z-index: 100;
}

.language-toggle {
  position: fixed;
  top: 2rem;
  right: 6rem;
  padding: 0.5rem 1rem;
  border: 2px solid;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  font-size: 0.9rem;
  font-weight: 600;
}

.language-toggle:hover,
.theme-toggle:hover {
  transform: scale(1.1);
  opacity: 0.8;
}

.locale-text {
  white-space: nowrap;
}

.theme-toggle .icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  max-width: 900px;
  margin: 0 auto;
  padding-top: 2rem;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.app-icon {
  width: 120px;
  height: 120px;
  border-radius: 20px;
  margin-bottom: 1.5rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.header h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  font-family: 'Courier New', Courier, monospace;
}

.subtitle {
  font-size: 1.2rem;
  opacity: 0.8;
}

.app-info,
.download-section,
.contact-section {
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.app-info h2,
.download-section h2,
.contact-section h2,
.screenshots h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  font-family: 'Courier New', Courier, monospace;
}

.app-info h3 {
  font-size: 1.4rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-family: 'Courier New', Courier, monospace;
}

.app-info p,
.download-section p,
.contact-section p {
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.features-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.features-list li {
  padding: 0.75rem 0;
  font-size: 1.1rem;
  line-height: 1.6;
}

.screenshots {
  margin-bottom: 2rem;
}

.screenshot-gallery {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.screenshot {
  max-width: 300px;
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
}

.screenshot:hover {
  transform: scale(1.05);
}

.download-section,
.contact-section {
  text-align: center;
}

.store-badges {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.contact-info {
  margin-top: 1.5rem;
}

.email-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.email-link:hover {
  transform: translateY(-2px);
  opacity: 0.8;
}

.store-link {
  text-decoration: none;
}

.store-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border: 2px solid;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  transition: all 0.3s ease;
  cursor: pointer;
}

.store-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .kaimono-container {
    padding: 1rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .app-icon {
    width: 100px;
    height: 100px;
  }

  .app-info,
  .download-section,
  .contact-section {
    padding: 1.5rem;
  }

  .screenshot {
    max-width: 100%;
  }

  .email-link {
    font-size: 1rem;
  }

  .language-toggle {
    right: 1rem;
    top: 6rem;
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }

  .theme-toggle {
    top: 1rem;
    right: 1rem;
  }
}
</style>
