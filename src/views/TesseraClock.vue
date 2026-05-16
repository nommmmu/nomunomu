<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

// 多言語対応
const { t, locale } = useI18n()

// ダークモード/ライトモードの切り替え
const isDarkMode = ref(true)

// テーマカラー
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

// TesseraClockの設定
const backgroundColor = ref('#1a1a2e')
const textColor = ref('#b794f6')
const is24Hour = ref(true)
const showSeconds = ref(true)
const selectedTimezone = ref('Asia/Tokyo')
const currentTime = ref('')
const timezoneSearch = ref('')
const showTimezoneDropdown = ref(false)

// タイムゾーン一覧（よく使われるもの + 主要都市）
const allTimezones = [
  'UTC',
  'Asia/Tokyo',
  'Asia/Shanghai',
  'Asia/Hong_Kong',
  'Asia/Singapore',
  'Asia/Bangkok',
  'Asia/Seoul',
  'Asia/Kolkata',
  'Asia/Dubai',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Europe/Moscow',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/Toronto',
  'America/Vancouver',
  'America/Mexico_City',
  'America/Sao_Paulo',
  'Australia/Sydney',
  'Australia/Melbourne',
  'Australia/Brisbane',
  'Pacific/Auckland',
  'Pacific/Fiji',
  'Africa/Cairo',
  'Africa/Johannesburg',
  'Africa/Lagos'
]

// タイムゾーン検索結果
const filteredTimezones = computed(() => {
  if (!timezoneSearch.value) {
    return allTimezones
  }
  return allTimezones.filter(tz =>
    tz.toLowerCase().includes(timezoneSearch.value.toLowerCase())
  )
})

// 時刻更新関数
const updateTime = () => {
  const now = new Date()
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: selectedTimezone.value,
    hour12: !is24Hour.value,
    hour: '2-digit',
    minute: '2-digit',
    second: showSeconds.value ? '2-digit' : undefined
  })

  const parts = formatter.formatToParts(now)
  let timeString = ''

  for (const part of parts) {
    if (part.type !== 'literal' || part.value !== ' ') {
      timeString += part.value
    } else if (showSeconds.value && parts[parts.indexOf(part) - 1]?.type === 'second') {
      break
    } else {
      timeString += part.value
    }
  }

  // 手動で時刻を構築する
  const options = {
    timeZone: selectedTimezone.value,
    hour12: !is24Hour.value,
    hour: '2-digit',
    minute: '2-digit',
  }
  if (showSeconds.value) {
    options.second = '2-digit'
  }

  currentTime.value = new Intl.DateTimeFormat('en-US', options).format(now)
}

// タイムゾーン選択
const selectTimezone = (tz) => {
  selectedTimezone.value = tz
  timezoneSearch.value = ''
  showTimezoneDropdown.value = false
  updateTime()
}

// タイマー処理
let updateInterval

onMounted(() => {
  updateTime()
  // 秒単位で更新（または秒表示がない場合は分単位）
  const interval = showSeconds.value ? 1000 : 60000
  updateInterval = setInterval(updateTime, interval)
})

onUnmounted(() => {
  if (updateInterval) {
    clearInterval(updateInterval)
  }
})

// 設定変更時の処理
const onConfigChange = () => {
  clearInterval(updateInterval)
  const interval = showSeconds.value ? 1000 : 60000
  updateInterval = setInterval(updateTime, interval)
  updateTime()
}
</script>

<template>
  <div 
    class="tessera-container" 
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
        <h1>🕐 TesseraClock</h1>
        <p class="subtitle">{{ t('tessera.subtitle', 'シンプルで自由なカスタマイズができるクロックウィジェット') }}</p>
      </div>

      <!-- クロックプレビュー -->
      <div 
        class="clock-preview"
        :style="{ 
          backgroundColor: backgroundColor,
          color: textColor,
          borderColor: textColor
        }"
      >
        <div class="clock-display">
          <div class="time-text">{{ currentTime }}</div>
          <div class="timezone-text">{{ selectedTimezone }}</div>
        </div>
      </div>

      <!-- カスタマイズセクション -->
      <div 
        class="customize-section"
        :style="{ 
          backgroundColor: themeColors.cardBg,
          color: themeColors.text
        }"
      >
        <h2>{{ t('tessera.customize.title', 'カスタマイズ') }}</h2>

        <!-- 背景色選択 -->
        <div class="setting-group">
          <label for="bg-color">{{ t('tessera.customize.bgColor', '背景色') }}</label>
          <div class="color-input-wrapper">
            <input 
              id="bg-color"
              v-model="backgroundColor" 
              type="color" 
              class="color-picker"
              @input="onConfigChange"
            />
            <span class="color-value">{{ backgroundColor }}</span>
          </div>
        </div>

        <!-- 文字色選択 -->
        <div class="setting-group">
          <label for="text-color">{{ t('tessera.customize.textColor', '文字色') }}</label>
          <div class="color-input-wrapper">
            <input 
              id="text-color"
              v-model="textColor" 
              type="color" 
              class="color-picker"
              @input="onConfigChange"
            />
            <span class="color-value">{{ textColor }}</span>
          </div>
        </div>

        <!-- タイムゾーン選択 -->
        <div class="setting-group">
          <label for="timezone-search">{{ t('tessera.customize.timezone', 'タイムゾーン') }}</label>
          <div class="timezone-search-wrapper">
            <input 
              id="timezone-search"
              v-model="timezoneSearch"
              type="text"
              class="timezone-search"
              :style="{
                borderColor: themeColors.buttonBorder,
                backgroundColor: isDarkMode ? '#1a1a2e' : '#f8f7fc',
                color: themeColors.text
              }"
              :placeholder="t('tessera.customize.timezonePlaceholder', 'タイムゾーンを検索...')"
              @focus="showTimezoneDropdown = true"
            />
            <div 
              v-if="showTimezoneDropdown"
              class="timezone-dropdown"
              :style="{
                backgroundColor: themeColors.cardBg,
                borderColor: themeColors.buttonBorder,
                color: themeColors.text
              }"
            >
              <div
                v-for="tz in filteredTimezones"
                :key="tz"
                class="timezone-option"
                :class="{ selected: tz === selectedTimezone }"
                @click="selectTimezone(tz)"
                :style="{
                  backgroundColor: tz === selectedTimezone ? themeColors.accent : 'transparent',
                  color: tz === selectedTimezone ? '#ffffff' : themeColors.text
                }"
              >
                {{ tz }}
              </div>
            </div>
          </div>
          <div class="selected-timezone">{{ t('tessera.customize.current', '現在:') }} {{ selectedTimezone }}</div>
        </div>

        <!-- 表示形式選択 -->
        <div class="setting-group">
          <label>{{ t('tessera.customize.format', '表示形式') }}</label>
          <div class="toggle-group">
            <button 
              class="toggle-button"
              :class="{ active: is24Hour }"
              @click="() => { is24Hour = true; onConfigChange() }"
              :style="{
                backgroundColor: is24Hour ? themeColors.accent : themeColors.buttonBg,
                borderColor: themeColors.buttonBorder,
                color: is24Hour ? '#ffffff' : themeColors.buttonText
              }"
            >
              24{{ t('tessera.customize.hour', '時間') }}
            </button>
            <button 
              class="toggle-button"
              :class="{ active: !is24Hour }"
              @click="() => { is24Hour = false; onConfigChange() }"
              :style="{
                backgroundColor: !is24Hour ? themeColors.accent : themeColors.buttonBg,
                borderColor: themeColors.buttonBorder,
                color: !is24Hour ? '#ffffff' : themeColors.buttonText
              }"
            >
              12{{ t('tessera.customize.hour', '時間') }}
            </button>
          </div>
        </div>

        <!-- 秒の表示/非表示 -->
        <div class="setting-group">
          <label>{{ t('tessera.customize.seconds', '秒') }}</label>
          <div class="toggle-group">
            <button 
              class="toggle-button"
              :class="{ active: showSeconds }"
              @click="() => { showSeconds = true; onConfigChange() }"
              :style="{
                backgroundColor: showSeconds ? themeColors.accent : themeColors.buttonBg,
                borderColor: themeColors.buttonBorder,
                color: showSeconds ? '#ffffff' : themeColors.buttonText
              }"
            >
              {{ t('tessera.customize.show', '表示') }}
            </button>
            <button 
              class="toggle-button"
              :class="{ active: !showSeconds }"
              @click="() => { showSeconds = false; onConfigChange() }"
              :style="{
                backgroundColor: !showSeconds ? themeColors.accent : themeColors.buttonBg,
                borderColor: themeColors.buttonBorder,
                color: !showSeconds ? '#ffffff' : themeColors.buttonText
              }"
            >
              {{ t('tessera.customize.hide', '非表示') }}
            </button>
          </div>
        </div>
      </div>

      <!-- アプリ説明セクション -->
      <div 
        class="app-info"
        :style="{ 
          backgroundColor: themeColors.cardBg,
          color: themeColors.text
        }"
      >
        <h2>{{ t('tessera.about.title', 'TesseraClockについて') }}</h2>
        <p>{{ t('tessera.about.description', 'シンプルさと自由なカスタマイズを両立したクロックウィジェットアプリです。') }}</p>

        <h3>{{ t('tessera.about.features.title', '主な機能') }}</h3>
        <ul class="features-list">
          <li>🎨 {{ t('tessera.about.features.colors', '背景色・文字色をカラーピッカーで自由に選択') }}</li>
          <li>🌍 {{ t('tessera.about.features.timezone', 'タイムゾーンを世界中から検索して設定') }}</li>
          <li>⏰ {{ t('tessera.about.features.format', '24時間表示 / AM-PM表示を選択') }}</li>
          <li>⏱️ {{ t('tessera.about.features.seconds', '秒の表示 / 非表示を切り替え') }}</li>
          <li>🔋 {{ t('tessera.about.features.battery', 'バッテリーに配慮した設計') }}</li>
        </ul>

        <h3>{{ t('tessera.about.widget.title', '豊富なウィジェットサイズ') }}</h3>
        <ul class="features-list">
          <li>📱 {{ t('tessera.about.widget.home', 'ホーム画面の小・中・大') }}</li>
          <li>🔒 {{ t('tessera.about.widget.lock', 'ロック画面の円形・横長・インライン') }}</li>
          <li>🎬 {{ t('tessera.about.widget.standby', 'iOS 17のスタンバイモード') }}</li>
        </ul>
      </div>

      <!-- 技術情報セクション -->
      <div 
        class="tech-info"
        :style="{ 
          backgroundColor: themeColors.cardBg,
          color: themeColors.text
        }"
      >
        <h2>{{ t('tessera.tech.title', '技術情報') }}</h2>
        <h3>{{ t('tessera.tech.battery.title', 'バッテリー最適化') }}</h3>
        <p>{{ t('tessera.tech.battery.description', '秒の更新はシステムの仕組みを活用し、従来のタイマー駆動より消費電力を抑えた実装を採用しています。') }}</p>
      </div>

      <!-- お問い合わせセクション -->
      <div 
        class="contact-section"
        :style="{ 
          backgroundColor: themeColors.cardBg,
          color: themeColors.text
        }"
      >
        <h2>{{ t('tessera.contact.title', 'お問い合わせ') }}</h2>
        <p>{{ t('tessera.contact.description', 'ご質問やサポートが必要な場合は、お気軽にお問い合わせください。') }}</p>
        <div class="contact-info">
          <a 
            href="mailto:support@nomunomu.dev" 
            class="email-link"
            :style="{ color: themeColors.accent }"
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
.tessera-container {
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

.subtitle {
  font-size: 1.2rem;
  opacity: 0.8;
}

/* クロックプレビュー */
.clock-preview {
  padding: 3rem 2rem;
  border-radius: 16px;
  border: 3px solid;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.clock-display {
  text-align: center;
}

.time-text {
  font-size: 4rem;
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
}

.timezone-text {
  font-size: 1.2rem;
  opacity: 0.8;
}

/* カスタマイズセクション */
.customize-section,
.app-info,
.tech-info {
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.customize-section h2,
.app-info h2,
.tech-info h2 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  font-family: 'Courier New', Courier, monospace;
}

.customize-section h3,
.app-info h3,
.tech-info h3 {
  font-size: 1.4rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-family: 'Courier New', Courier, monospace;
}

.app-info p,
.tech-info p {
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.setting-group {
  margin-bottom: 2rem;
}

.setting-group label {
  display: block;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.color-input-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.color-picker {
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.color-value {
  font-family: 'Courier New', Courier, monospace;
  font-size: 1rem;
  opacity: 0.8;
}

/* タイムゾーン検索 */
.timezone-search-wrapper {
  position: relative;
  margin-bottom: 0.5rem;
}

.timezone-search {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.timezone-search:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(155, 114, 242, 0.1);
}

.timezone-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 250px;
  overflow-y: auto;
  border: 2px solid;
  border-top: none;
  border-radius: 0 0 8px 8px;
  z-index: 50;
  margin-top: -2px;
}

.timezone-option {
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.timezone-option:hover {
  opacity: 0.9;
}

.timezone-option.selected {
  font-weight: 600;
}

.selected-timezone {
  font-size: 0.9rem;
  opacity: 0.7;
  margin-top: 0.5rem;
}

/* トグルボタン */
.toggle-group {
  display: flex;
  gap: 1rem;
}

.toggle-button {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.toggle-button:hover {
  transform: translateY(-2px);
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

.contact-section {
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  text-align: center;
}

.contact-section h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  font-family: 'Courier New', Courier, monospace;
}

.contact-section p {
  line-height: 1.8;
  font-size: 1.1rem;
  margin-bottom: 1rem;
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

@media (max-width: 768px) {
  .tessera-container {
    padding: 1rem;
  }

  .header h1 {
    font-size: 2rem;
  }

  .time-text {
    font-size: 2.5rem;
  }

  .clock-preview {
    min-height: 150px;
    padding: 2rem 1rem;
  }

  .customize-section,
  .app-info,
  .tech-info {
    padding: 1.5rem;
  }

  .language-toggle {
    right: 1rem;
    top: 6rem;
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }

  .theme-toggle {
    right: 1rem;
    top: 2rem;
  }

  .color-input-wrapper {
    flex-direction: column;
    align-items: flex-start;
  }

  .toggle-group {
    flex-direction: column;
  }
}
</style>
