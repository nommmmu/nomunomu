<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

// 多言語対応
const { t, locale } = useI18n()

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
    class="privacy-container" 
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
        <h1>{{ t('privacy.title') }}</h1>
        <p class="last-updated">{{ t('privacy.lastUpdated') }}: 2026年1月5日</p>
      </div>

      <div 
        class="policy-section"
        :style="{ 
          backgroundColor: themeColors.cardBg,
          color: themeColors.text
        }"
      >
        <h2>{{ t('privacy.overview.title') }}</h2>
        <p>{{ t('privacy.overview.content') }}</p>
      </div>

      <div 
        class="policy-section"
        :style="{ 
          backgroundColor: themeColors.cardBg,
          color: themeColors.text
        }"
      >
        <h2>{{ t('privacy.collection.title') }}</h2>
        <p>{{ t('privacy.collection.intro') }}</p>
        <ul>
          <li>{{ t('privacy.collection.items.usage') }}</li>
          <li>{{ t('privacy.collection.items.device') }}</li>
          <li>{{ t('privacy.collection.items.contact') }}</li>
        </ul>
      </div>

      <div 
        class="policy-section"
        :style="{ 
          backgroundColor: themeColors.cardBg,
          color: themeColors.text
        }"
      >
        <h2>{{ t('privacy.usage.title') }}</h2>
        <ul>
          <li>{{ t('privacy.usage.items.improvement') }}</li>
          <li>{{ t('privacy.usage.items.support') }}</li>
          <li>{{ t('privacy.usage.items.communication') }}</li>
        </ul>
      </div>

      <div 
        class="policy-section"
        :style="{ 
          backgroundColor: themeColors.cardBg,
          color: themeColors.text
        }"
      >
        <h2>{{ t('privacy.storage.title') }}</h2>
        <p>{{ t('privacy.storage.content') }}</p>
      </div>

      <div 
        class="policy-section"
        :style="{ 
          backgroundColor: themeColors.cardBg,
          color: themeColors.text
        }"
      >
        <h2>{{ t('privacy.thirdParty.title') }}</h2>
        <p>{{ t('privacy.thirdParty.content') }}</p>
      </div>

      <div 
        class="policy-section"
        :style="{ 
          backgroundColor: themeColors.cardBg,
          color: themeColors.text
        }"
      >
        <h2>{{ t('privacy.security.title') }}</h2>
        <p>{{ t('privacy.security.content') }}</p>
      </div>

      <div 
        class="policy-section"
        :style="{ 
          backgroundColor: themeColors.cardBg,
          color: themeColors.text
        }"
      >
        <h2>{{ t('privacy.changes.title') }}</h2>
        <p>{{ t('privacy.changes.content') }}</p>
      </div>

      <div 
        class="policy-section"
        :style="{ 
          backgroundColor: themeColors.cardBg,
          color: themeColors.text
        }"
      >
        <h2>{{ t('privacy.contact.title') }}</h2>
        <p>{{ t('privacy.contact.content') }}</p>
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
.privacy-container {
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

.header h1 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
  font-family: 'Courier New', Courier, monospace;
}

.last-updated {
  font-size: 1rem;
  opacity: 0.7;
  margin-top: 1rem;
}

.policy-section {
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.policy-section h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  font-family: 'Courier New', Courier, monospace;
}

.policy-section p {
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.policy-section ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0;
}

.policy-section li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.6;
}

.policy-section li::before {
  content: "•";
  position: absolute;
  left: 0;
  font-weight: bold;
}

.contact-info {
  margin-top: 1.5rem;
  text-align: center;
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

@media (max-width: 768px) {
  .privacy-container {
    padding: 1rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .policy-section {
    padding: 1.5rem;
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
