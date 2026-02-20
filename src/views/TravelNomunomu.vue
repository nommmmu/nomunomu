<script setup>
import { ref, onMounted } from 'vue'

// クライアントサイド認証ゲート
// ユーザー名: nomunomu / パスワード: fukuoka
const isAuthenticated = ref(false)
const inputUsername = ref('')
const inputPassword = ref('')
const authError = ref(false)

onMounted(() => {
  if (sessionStorage.getItem('travel-nomunomu-auth') === 'ok') {
    isAuthenticated.value = true
  }
})

function login() {
  if (inputUsername.value === 'nomunomu' && inputPassword.value === 'fukuoka') {
    isAuthenticated.value = true
    authError.value = false
    sessionStorage.setItem('travel-nomunomu-auth', 'ok')
  } else {
    authError.value = true
    inputPassword.value = ''
  }
}

function scrollToDay(dayNum) {
  const el = document.getElementById(`day-${dayNum}`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function printPage() {
  window.print()
}
</script>

<template>
  <!-- 認証ゲート -->
  <div v-if="!isAuthenticated" class="auth-overlay">
    <div class="auth-card">
      <div class="auth-cover">
        <div class="auth-cover-ornament">✦ ✦ ✦</div>
        <div class="auth-cover-en">TRAVEL ITINERARY</div>
        <h1 class="auth-title">旅のしおり</h1>
        <p class="auth-dest">福岡の旅 🛫</p>
        <div class="auth-cover-ornament">✦ ✦ ✦</div>
      </div>
      <form @submit.prevent="login" class="auth-form">
        <p class="auth-desc">このページは非公開です</p>
        <div class="auth-field">
          <label for="auth-user">ユーザー名</label>
          <input
            id="auth-user"
            v-model="inputUsername"
            type="text"
            placeholder="ユーザー名を入力"
            autocomplete="username"
          />
        </div>
        <div class="auth-field">
          <label for="auth-pass">パスワード</label>
          <input
            id="auth-pass"
            v-model="inputPassword"
            type="password"
            placeholder="パスワードを入力"
            autocomplete="current-password"
          />
        </div>
        <p v-if="authError" class="auth-error">⚠ ユーザー名またはパスワードが違います</p>
        <button type="submit" class="auth-btn">開く ▶</button>
      </form>
    </div>
  </div>

  <!-- メインコンテンツ -->
  <div v-else class="travel-book">

    <!-- 表紙風ヘッダー -->
    <header class="book-cover">
      <div class="cover-inner">
        <div class="cover-en">FUKUOKA TRIP</div>
        <div class="cover-ornament">── ✈ ──</div>
        <h1 class="cover-title">旅のしおり</h1>
        <div class="cover-subtitle">福岡の旅</div>
        <div class="cover-route">成田 ✈ 福岡</div>
        <div class="cover-rule"></div>
        <div class="cover-days">
          <span>1日目 福岡上陸</span>
          <span>·</span>
          <span>2日目 柳川・太宰府</span>
          <span>·</span>
          <span>3日目 博多</span>
        </div>
      </div>
    </header>

    <!-- 日次ナビ（スティッキー） -->
    <nav class="day-nav">
      <button class="day-nav-btn" @click="scrollToDay(1)">
        <span class="nav-num">1</span>
        <span class="nav-label">福岡上陸</span>
      </button>
      <button class="day-nav-btn" @click="scrollToDay(2)">
        <span class="nav-num">2</span>
        <span class="nav-label">柳川・太宰府</span>
      </button>
      <button class="day-nav-btn" @click="scrollToDay(3)">
        <span class="nav-num">3</span>
        <span class="nav-label">博多</span>
      </button>
    </nav>

    <main class="book-content">

      <!-- ===== 1日目 ===== -->
      <section id="day-1" class="day-section">
        <div class="day-header">
          <div class="day-badge">DAY 1</div>
          <h2 class="day-title">福岡上陸</h2>
          <span class="material-symbols-outlined day-emoji">flight_takeoff</span>
        </div>

        <div class="timeline">

          <div class="tl-row">
            <div class="tl-time">15:00</div>
            <div class="tl-pin">
              <div class="tl-dot dot-orange"></div>
              <div class="tl-line"></div>
            </div>
            <div class="tl-body">
              <div class="event-title">成田空港 第1ターミナル 集合</div>
              <div class="event-note">出発ロビーで集合 ✈</div>
            </div>
          </div>

          <div class="tl-row">
            <div class="tl-time">16:15</div>
            <div class="tl-pin">
              <div class="tl-dot dot-orange"></div>
              <div class="tl-line"></div>
            </div>
            <div class="tl-body">
              <div class="event-title">成田 発 ✈</div>
              <div class="event-note">いってきます！</div>
              <a href="https://manage.flypeach.com/jp/manage/itinerary-confirm" target="_blank" rel="noopener" class="flight-card">
                <div class="flight-card-header">
                  <span class="flight-carrier">Peach Aviation</span>
                  <span class="flight-booking">予約番号: <strong>ENMA1H</strong></span>
                </div>
                <div class="flight-route">
                  <div class="flight-airport">
                    <div class="flight-time">16:15</div>
                    <div class="flight-code">NRT</div>
                    <div class="flight-name">成田国際空港</div>
                    <div class="flight-terminal">Terminal 1</div>
                  </div>
                  <div class="flight-arrow">✈ ─────</div>
                  <div class="flight-airport flight-airport-right">
                    <div class="flight-time">18:35</div>
                    <div class="flight-code">FUK</div>
                    <div class="flight-name">福岡空港</div>
                    <div class="flight-terminal">Terminal D</div>
                  </div>
                </div>
                <div class="flight-date">2026年2月21日（土）▶ 予約確認はこちら</div>
              </a>
            </div>
          </div>

          <div class="tl-row">
            <div class="tl-time">18:35</div>
            <div class="tl-pin">
              <div class="tl-dot dot-red"></div>
              <div class="tl-line"></div>
            </div>
            <div class="tl-body">
              <div class="event-title">福岡 着 🎉</div>
              <div class="event-note">到着後、買い出し</div>
              <div class="transit-card">
                <div class="transit-row">
                  <span class="transit-icon material-symbols-outlined">subway</span>
                  <div class="transit-route">
                    <span class="transit-station">福岡空港</span>
                    <span class="transit-arrow">→</span>
                    <span class="transit-station">祇園</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="tl-row">
            <div class="tl-time">19:30</div>
            <div class="tl-pin">
              <div class="tl-dot dot-blue"></div>
              <div class="tl-line"></div>
            </div>
            <div class="tl-body">
              <div class="event-title">宿舎 着 — 祇園 🏨</div>
              <div class="stay-card">
                <div class="stay-name">ピット壱番館 605号室</div>
                <div class="stay-address">
                  <span class="stay-icon material-symbols-outlined">location_on</span>
                  福岡市博多区御供所町5-21<br>ピット壱番館 6階 605号室
                </div>
                <a href="https://gusk.jp/pit/pit-jp.pdf" target="_blank" rel="noopener" class="stay-checkin-link">
                  <span class="material-symbols-outlined">picture_as_pdf</span> チェックイン方法を確認する
                </a>
              </div>
            </div>
          </div>

          <div class="tl-row">
            <div class="tl-time">20:00</div>
            <div class="tl-pin">
              <div class="tl-dot dot-gold"></div>
              <div class="tl-line"></div>
            </div>
            <div class="tl-body">
              <div class="event-title">中洲・天神エリア 移動</div>
            </div>
          </div>

          <div class="tl-row">
            <div class="tl-time">20:30</div>
            <div class="tl-pin">
              <div class="tl-dot dot-green"></div>
              <div class="tl-line"></div>
            </div>
            <div class="tl-body">
              <div class="event-title">夕食 🐟 ごま鯖！</div>
              <div class="decided-box">
                <div class="decided-label"><span class="material-symbols-outlined">check_circle</span> 決定</div>
                <div class="decided-name">きはるの胡麻鯖や</div>
                <div class="decided-links">
                  <a href="https://tabelog.com/fukuoka/A4001/A400103/40004429/" target="_blank" rel="noopener" class="decided-link"><span class="material-symbols-outlined">open_in_new</span> 食べログ</a>
                  <a href="https://maps.app.goo.gl/D5CPNFKpn2KGZjfk7" target="_blank" rel="noopener" class="decided-link"><span class="material-symbols-outlined">location_on</span> 地図</a>
                </div>
              </div>
              <div class="candidates-box">
                <div class="candidates-label"><span class="material-symbols-outlined">restaurant</span> 候補（もし満席なら）</div>
                <div class="candidate-item">「げん志」</div>
              </div>
            </div>
          </div>

          <div class="tl-row last">
            <div class="tl-time">21:30〜</div>
            <div class="tl-pin">
              <div class="tl-dot dot-dark"></div>
            </div>
            <div class="tl-body">
              <div class="event-title">中洲 屋台散策 🏮</div>
            </div>
          </div>

          <div class="tl-row last">
            <div class="tl-time"></div>
            <div class="tl-pin">
              <div class="dot-dark"></div>
            </div>
            <div class="tl-body">
              <div class="event-title">高橋くん????</div>
            </div>
          </div>

        </div>
      </section>

      <!-- ===== 2日目 ===== -->
      <section id="day-2" class="day-section day-section-alt">
        <div class="day-header">
          <div class="day-badge">DAY 2</div>
          <h2 class="day-title">柳川・太宰府</h2>
          <span class="material-symbols-outlined day-emoji">sailing</span>
        </div>

        <div class="timeline">

          <div class="tl-row">
            <div class="tl-time">朝ごはん</div>
            <div class="tl-pin">
              <div class="tl-dot dot-green"></div>
              <div class="tl-line"></div>
            </div>
            <div class="tl-body">
              <div class="event-title">朝ごはん 🍳</div>
              <div class="event-note tbd">？？？ 未定</div>
            </div>
          </div>

          <div class="tl-row">
            <div class="tl-time">09:30</div>
            <div class="tl-pin">
              <div class="tl-dot dot-gold"></div>
              <div class="tl-line"></div>
            </div>
            <div class="tl-body">
              <div class="event-title">祇園 → 西鉄福岡（天神）駅 移動</div>
              <div class="transit-card">
                <div class="transit-row">
                  <span class="transit-icon material-symbols-outlined">subway</span>
                  <div class="transit-route">
                    <span class="transit-station">祇園</span>
                    <span class="transit-arrow">→</span>
                    <span class="transit-station">西鉄福岡（天神）</span>
                  </div>
                  <span class="transit-label">福岡市地下鉄 空港線</span>
                </div>
              </div>
              <div class="ticket-box">
                <span class="material-symbols-outlined">confirmation_number</span> 「太宰府・柳川観光きっぷ」を利用
                <a href="https://www.ensen24.jp/kippu/1/" target="_blank" rel="noopener" class="ticket-link">公式サイト ▶</a>
              </div>
            </div>
          </div>

          <div class="tl-row">
            <div class="tl-time">10:00〜</div>
            <div class="tl-pin">
              <div class="tl-dot dot-blue"></div>
              <div class="tl-line"></div>
            </div>
            <div class="tl-body">
              <div class="event-title">柳川 到着・散策 ⛵</div>
              <div class="transit-card">
                <div class="transit-row">
                  <span class="transit-icon material-symbols-outlined">train</span>
                  <div class="transit-route">
                    <span class="transit-station">西鉄福岡（天神）</span>
                    <span class="transit-arrow">→</span>
                    <span class="transit-station">西鉄柳川</span>
                  </div>
                  <a href="https://www.nishitetsu.jp/train/rosen/" target="_blank" rel="noopener" class="transit-link">西鉄HP ▶</a>
                </div>
                <div class="transit-sub">特急で約50分 / 駅から乗船場はシャトルバス等で移動</div>
              </div>
              <div class="highlight-box">
                <span class="material-symbols-outlined">directions_boat</span> 川下り（約60〜70分）
                <div class="highlight-desc">お堀をめぐる川下りで城下町の風情を楽しむ</div>
                <a href="https://www.yanagawa-net.com/ohori/" target="_blank" rel="noopener" class="highlight-link">柳川観光公式サイト ▶</a>
              </div>
            </div>
          </div>

          <div class="tl-row">
            <div class="tl-time">12:30〜</div>
            <div class="tl-pin">
              <div class="tl-dot dot-green"></div>
              <div class="tl-line"></div>
            </div>
            <div class="tl-body">
              <div class="event-title">柳川 ランチ 🍱 うなぎ？</div>
              <div class="candidates-box">
                <div class="candidates-label"><span class="material-symbols-outlined">restaurant</span> 候補店</div>
                <div class="candidate-item">「若松屋」</div>
                <div class="candidate-item">「元祖本吉屋」</div>
              </div>
            </div>
          </div>

          <div class="tl-row">
            <div class="tl-time">14:30〜</div>
            <div class="tl-pin">
              <div class="tl-dot dot-gold"></div>
              <div class="tl-line"></div>
            </div>
            <div class="tl-body">
              <div class="event-title">柳川 → 太宰府 移動</div>
              <div class="transit-card">
                <div class="transit-row">
                  <span class="transit-icon material-symbols-outlined">train</span>
                  <div class="transit-route">
                    <span class="transit-station">西鉄柳川</span>
                    <span class="transit-arrow">→</span>
                    <span class="transit-station">太宰府</span>
                  </div>
                  <a href="https://www.nishitetsu.jp/train/rosen/" target="_blank" rel="noopener" class="transit-link">西鉄HP ▶</a>
                </div>
                <div class="transit-sub">約1時間</div>
              </div>
            </div>
          </div>

          <div class="tl-row">
            <div class="tl-time">16:00〜</div>
            <div class="tl-pin">
              <div class="tl-dot dot-purple"></div>
              <div class="tl-line"></div>
            </div>
            <div class="tl-body">
              <div class="event-title">太宰府天満宮 散策 ⛩</div>
              <div class="event-note">参拝 &amp; 食べ歩き</div>
              <a href="https://www.dazaifutenmangu.or.jp/" target="_blank" rel="noopener" class="decided-link" style="margin-top:0.5rem;display:inline-flex;align-items:center;gap:0.2rem"><span class="material-symbols-outlined">temple_buddhist</span> 太宰府天満宮 公式サイト</a>
            </div>
          </div>

          <div class="tl-row">
            <div class="tl-time">17:30〜</div>
            <div class="tl-pin">
              <div class="tl-dot dot-gold"></div>
              <div class="tl-line"></div>
            </div>
            <div class="tl-body">
              <div class="event-title">太宰府 → 祇園 移動</div>
              <div class="transit-card">
                <div class="transit-row">
                  <span class="transit-icon material-symbols-outlined">train</span>
                  <div class="transit-route">
                    <span class="transit-station">太宰府</span>
                    <span class="transit-arrow">→</span>
                    <span class="transit-station">祇園</span>
                  </div>
                </div>
                <div class="transit-sub">約1時間</div>
              </div>
            </div>
          </div>

          <div class="tl-row">
            <div class="tl-time">19:00</div>
            <div class="tl-pin">
              <div class="tl-dot dot-green"></div>
              <div class="tl-line"></div>
            </div>
            <div class="tl-body">
              <div class="event-title">夕食 🍲 もつ鍋！</div>
              <div class="candidates-box">
                <div class="candidates-label"><span class="material-symbols-outlined">restaurant</span> 候補店</div>
                <div class="candidate-item">「もつ鍋 一藤 博多店」</div>
              </div>
            </div>
          </div>

          <div class="tl-row last">
            <div class="tl-time">20:00〜</div>
            <div class="tl-pin">
              <div class="tl-dot dot-dark"></div>
            </div>
            <div class="tl-body">
              <div class="event-title">フリータイム 🌙</div>
            </div>
          </div>

          <div class="tl-row last">
            <div class="tl-time"></div>
            <div class="tl-pin">
              <div class="dot-dark"></div>
            </div>
            <div class="tl-body">
              <div class="event-title">高橋くん????</div>
            </div>
          </div>

        </div>
      </section>

      <!-- ===== 3日目 ===== -->
      <section id="day-3" class="day-section">
        <div class="day-header">
          <div class="day-badge">DAY 3</div>
          <h2 class="day-title">博多</h2>
          <span class="material-symbols-outlined day-emoji">temple_buddhist</span>
        </div>

        <div class="timeline">

          <div class="tl-row">
            <div class="tl-time">朝ごはん</div>
            <div class="tl-pin">
              <div class="tl-dot dot-green"></div>
              <div class="tl-line"></div>
            </div>
            <div class="tl-body">
              <div class="event-title">朝ごはん 🍳</div>
              <div class="event-note tbd">？？？ 未定</div>
            </div>
          </div>

          <div class="tl-row">
            <div class="tl-time">10:00〜</div>
            <div class="tl-pin">
              <div class="tl-dot dot-purple"></div>
              <div class="tl-line"></div>
            </div>
            <div class="tl-body">
              <div class="event-title">博多旧市街 巡り 🗺</div>
              <a href="https://www.crossroadfukuoka.jp/" target="_blank" rel="noopener" class="decided-link" style="margin-top:0.4rem;display:inline-flex;align-items:center;gap:0.2rem"><span class="material-symbols-outlined">map</span> 博多旧市街 公式サイト</a>
              <div class="spot-list">
                <div class="spot-item">
                  <span class="spot-icon material-symbols-outlined">temple_buddhist</span>
                  <div>
                    <strong>櫛田神社</strong>（徒歩5分）
                    <div class="spot-desc">博多のシンボル</div>
                  </div>
                </div>
                <div class="spot-item">
                  <span class="spot-icon material-symbols-outlined">castle</span>
                  <div>
                    <strong>東長寺</strong>（徒歩1分）
                    <div class="spot-desc">祇園駅の目の前</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="tl-row">
            <div class="tl-time">11:30</div>
            <div class="tl-pin">
              <div class="tl-dot dot-green"></div>
              <div class="tl-line"></div>
            </div>
            <div class="tl-body">
              <div class="event-title">川端通商店街 〜 ランチ 🍜</div>
              <div class="event-note">商店街を通り抜けながら</div>
              <div class="candidates-box">
                <div class="candidates-label"><span class="material-symbols-outlined">restaurant</span> 候補</div>
                <div class="candidate-item">老舗の「博多うどん」</div>
                <div class="candidate-item">「長浜ラーメン」</div>
              </div>
            </div>
          </div>

          <!-- 案A / 案B -->
          <div class="tl-row plan-row">
            <div class="tl-time">13:30</div>
            <div class="tl-pin">
              <div class="tl-dot dot-teal"></div>
              <div class="tl-line"></div>
            </div>
            <div class="tl-body">
              <div class="event-title">午後 — どちらにする？🤔</div>
              <div class="plans-grid">

                <div class="plan-card plan-a">
                  <div class="plan-head">
                    <span class="plan-badge plan-badge-a">案 A</span>
                    <div class="plan-name">ベイエリア 絶景＆温泉コース</div>
                    <div class="plan-theme">♨ リラックス重視</div>
                  </div>
                  <div class="plan-items">
                    <div class="plan-item">
                      <span class="plan-time">13:30</span>
                      <span>西鉄バスで「ベイサイドプレイス博多」へ（約15分）</span>
                    </div>
                    <div class="plan-item">
                      <span class="plan-time">14:00</span>
                      <div>
                        博多ポートタワー &amp; アクアリウム
                        <div class="plan-note">無料タワーから博多湾を一望。巨大水槽にはウミガメも 🐢</div>
                      </div>
                    </div>
                    <div class="plan-item">
                      <span class="plan-time">15:00</span>
                      <div>
                        みなと温泉 波葉の湯 ♨
                        <div class="plan-note">露天風呂で旅の疲れを癒やす</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="plan-card plan-b">
                  <div class="plan-head">
                    <span class="plan-badge plan-badge-b">案 B</span>
                    <div class="plan-name">天神・大濠公園 カフェ＆ショッピングコース</div>
                    <div class="plan-theme">🛍 街歩き重視</div>
                  </div>
                  <div class="plan-items">
                    <div class="plan-item">
                      <span class="plan-time">13:30</span>
                      <span>地下鉄で大濠公園駅へ（約7分）</span>
                    </div>
                    <div class="plan-item">
                      <span class="plan-time">14:00</span>
                      <div>
                        大濠公園・福岡市美術館
                        <div class="plan-note">池のほとりのスタバ 、草間彌生の南瓜で写真撮影 📸</div>
                      </div>
                    </div>
                    <div class="plan-item">
                      <span class="plan-time">15:30</span>
                      <div>
                        天神エリアへ移動
                        <div class="plan-note">天神地下街（ヨーロッパ風）でお買い物 🛍</div>
                        <div class="plan-note">岩田屋・福岡三越：高級明太子や限定スイーツをチェック</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div class="tl-row">
            <div class="tl-time">17:30</div>
            <div class="tl-pin">
              <div class="tl-dot dot-blue"></div>
              <div class="tl-line"></div>
            </div>
            <div class="tl-body">
              <div class="event-title">福岡空港 着 🛫</div>
            </div>
          </div>

          <div class="tl-row">
            <div class="tl-time">19:10</div>
            <div class="tl-pin">
              <div class="tl-dot dot-orange"></div>
              <div class="tl-line"></div>
            </div>
            <div class="tl-body">
              <div class="event-title">福岡 発 ✈</div>
              <div class="event-note">ありがとう福岡！またね！👋</div>
              <a href="https://booking.jetstar.com/mmb/#/login?culture=ja-jp&pid=secondarynav:mmb" target="_blank" rel="noopener" class="flight-card">
                <div class="flight-card-header">
                  <span class="flight-carrier">Jetstar GK516</span>
                  <span class="flight-booking">予約番号: <strong>HNNK5G</strong></span>
                </div>
                <div class="flight-route">
                  <div class="flight-airport">
                    <div class="flight-time">19:10</div>
                    <div class="flight-code">FUK</div>
                    <div class="flight-name">福岡空港</div>
                    <div class="flight-terminal">国内線ターミナル</div>
                  </div>
                  <div class="flight-center">
                    <div class="flight-arrow">─── ✈ ───</div>
                    <div class="flight-duration">1時間50分</div>
                  </div>
                  <div class="flight-airport flight-airport-right">
                    <div class="flight-time">21:00</div>
                    <div class="flight-code">NRT</div>
                    <div class="flight-name">成田国際空港</div>
                    <div class="flight-terminal">第3ターミナル</div>
                  </div>
                </div>
                <div class="flight-date">2026年2月23日（月）· Airbus A321neo ▶ 予約確認はこちら</div>
              </a>
            </div>
          </div>

          <div class="tl-row last">
            <div class="tl-time">21:00</div>
            <div class="tl-pin">
              <div class="tl-dot dot-red"></div>
            </div>
            <div class="tl-body">
              <div class="event-title">成田 着 🏠</div>
              <div class="event-note">おつかれさまでした！</div>
            </div>
          </div>

        </div>
      </section>

    </main>

    <footer class="book-footer">
      <div class="footer-stamp">GOOD TRIP !</div>
      <p class="footer-msg">楽しい旅を！🎉</p>
      <div class="footer-ornament">── ✈ ──</div>
      <button class="footer-pdf-btn" @click="printPage">
        <span class="material-symbols-outlined">picture_as_pdf</span> PDF保存
      </button>
    </footer>


  </div>
</template>

<style scoped>
/* ===== Google Fonts ===== */
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0&display=block');

/* ===== リセット & ベース ===== */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ===== 認証ゲート ===== */
.auth-overlay {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(160deg, #8b0000 0%, #c0392b 40%, #8b2635 100%);
  padding: 2rem;
}

.auth-card {
  background: #fdf8f0;
  border-radius: 4px;
  max-width: 420px;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
  border: 1px solid #e8d5b7;
}

.auth-cover {
  background: linear-gradient(180deg, #c0392b 0%, #8b0000 100%);
  color: white;
  padding: 2.5rem 2rem;
  text-align: center;
  border-bottom: 3px double rgba(255, 255, 255, 0.4);
}

.auth-cover-ornament {
  font-size: 0.85rem;
  letter-spacing: 6px;
  opacity: 0.7;
  margin: 0.5rem 0;
}

.auth-cover-en {
  font-size: 0.7rem;
  letter-spacing: 4px;
  opacity: 0.8;
  margin-bottom: 0.5rem;
  font-family: 'Georgia', serif;
}

.auth-title {
  font-size: 2.2rem;
  font-family: 'Noto Serif JP', 'Hiragino Mincho Pro', 'Yu Mincho', serif;
  font-weight: 700;
  letter-spacing: 4px;
  margin: 0.3rem 0;
}

.auth-dest {
  font-size: 1rem;
  opacity: 0.9;
  margin-top: 0.3rem;
}

.auth-form {
  padding: 2rem;
}

.auth-desc {
  text-align: center;
  font-size: 0.85rem;
  color: #7a4f2e;
  margin-bottom: 1.5rem;
  opacity: 0.8;
}

.auth-field {
  margin-bottom: 1.2rem;
}

.auth-field label {
  display: block;
  font-size: 0.8rem;
  font-weight: 700;
  color: #7a4f2e;
  margin-bottom: 0.4rem;
  letter-spacing: 1px;
}

.auth-field input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1.5px solid #e8d5b7;
  border-radius: 4px;
  font-size: 1rem;
  background: #fdfaf6;
  color: #2c1810;
  transition: border-color 0.2s;
  outline: none;
  font-family: inherit;
}

.auth-field input:focus {
  border-color: #c0392b;
}

.auth-error {
  font-size: 0.85rem;
  color: #c0392b;
  margin-bottom: 1rem;
  text-align: center;
}

.auth-btn {
  width: 100%;
  padding: 0.9rem;
  background: #c0392b;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 2px;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  font-family: 'Noto Serif JP', serif;
}

.auth-btn:hover {
  background: #a93226;
}

.auth-btn:active {
  transform: scale(0.98);
}

/* ===== メインコンテンツ ===== */
.travel-book {
  min-height: 100vh;
  background-color: #fdf8f0;
  font-family: 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', 'Yu Gothic', 'Meiryo', sans-serif;
  color: #2c1810;
}

/* ===== 表紙 ===== */
.book-cover {
  background: linear-gradient(180deg, #8b0000 0%, #c0392b 60%, #a93226 100%);
  color: white;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  padding: 4rem 2rem;
}

.book-cover::before {
  content: '';
  position: absolute;
  inset: 16px;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  pointer-events: none;
}

.cover-inner {
  position: relative;
  z-index: 1;
  width: 100%;
}

.cover-en {
  font-size: 0.75rem;
  letter-spacing: 6px;
  opacity: 0.7;
  font-family: 'Georgia', 'Times New Roman', serif;
  margin-bottom: 0.5rem;
}

.cover-ornament {
  font-size: 1.1rem;
  opacity: 0.6;
  margin: 0.5rem 0;
  letter-spacing: 8px;
}

.cover-title {
  font-size: 3.5rem;
  font-family: 'Noto Serif JP', 'Hiragino Mincho Pro', 'Yu Mincho', serif;
  font-weight: 700;
  letter-spacing: 8px;
  margin: 0.5rem 0;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.cover-subtitle {
  font-size: 1.3rem;
  letter-spacing: 4px;
  opacity: 0.9;
  margin: 0.5rem 0;
}

.cover-route {
  font-size: 1rem;
  opacity: 0.75;
  letter-spacing: 2px;
  margin: 0.5rem 0;
}

.cover-rule {
  width: 60px;
  height: 1px;
  background: rgba(255, 255, 255, 0.5);
  margin: 1.5rem auto;
}

.cover-days {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.85rem;
  opacity: 0.8;
  letter-spacing: 1px;
}

/* ===== 日次ナビ ===== */
.day-nav {
  display: flex;
  position: sticky;
  top: 0;
  z-index: 100;
  background: #2c1810;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.day-nav-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem 0.5rem;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  gap: 2px;
}

.day-nav-btn:last-child {
  border-right: none;
}

.day-nav-btn:hover {
  background: rgba(192, 57, 43, 0.5);
  color: white;
}

.nav-num {
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1;
  font-family: 'Georgia', serif;
}

.nav-label {
  font-size: 0.7rem;
  letter-spacing: 0.5px;
}

/* ===== コンテンツ ===== */
.book-content {
  max-width: 860px;
  margin: 0 auto;
}

/* ===== 日セクション ===== */
.day-section {
  padding: 3rem 2rem 2rem;
  border-bottom: 2px dashed #e8d5b7;
}

.day-section-alt {
  background: #f8f3e8;
}

.day-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e8d5b7;
}

.day-badge {
  background: #c0392b;
  color: white;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 2px;
  padding: 0.3rem 0.7rem;
  border-radius: 2px;
  font-family: 'Georgia', serif;
}

.day-title {
  font-size: 1.6rem;
  font-family: 'Noto Serif JP', 'Hiragino Mincho Pro', 'Yu Mincho', serif;
  font-weight: 700;
  color: #2c1810;
  flex: 1;
}

.day-emoji {
  font-size: 1.8rem;
  color: #c0392b;
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
}

/* ===== タイムライン ===== */
.timeline {
  display: flex;
  flex-direction: column;
}

.tl-row {
  display: flex;
  gap: 0;
}

.tl-time {
  width: 75px;
  min-width: 75px;
  text-align: right;
  padding-right: 14px;
  padding-top: 1px;
  font-size: 0.78rem;
  font-weight: 700;
  color: #7a4f2e;
  line-height: 1.2;
  white-space: nowrap;
}

.tl-pin {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20px;
  min-width: 20px;
}

.tl-dot {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  border: 2px solid white;
  flex-shrink: 0;
  margin-top: 2px;
  box-shadow: 0 0 0 1.5px currentColor;
}

.tl-line {
  width: 2px;
  flex: 1;
  background: #d4a017;
  min-height: 16px;
  margin-top: 3px;
  opacity: 0.5;
}

/* ドットカラー */
.dot-red     { background: #c0392b; color: #c0392b; }
.dot-orange  { background: #e67e22; color: #e67e22; }
.dot-blue    { background: #2980b9; color: #2980b9; }
.dot-green   { background: #27ae60; color: #27ae60; }
.dot-gold    { background: #d4a017; color: #d4a017; }
.dot-purple  { background: #8e44ad; color: #8e44ad; }
.dot-dark    { background: #34495e; color: #34495e; }
.dot-teal    { background: #16a085; color: #16a085; }

.tl-body {
  flex: 1;
  padding-left: 14px;
  padding-bottom: 1.5rem;
}

.tl-row.last .tl-body {
  padding-bottom: 0;
}

/* ===== イベントコンテンツ ===== */
.event-title {
  font-size: 1rem;
  font-weight: 700;
  color: #2c1810;
  line-height: 1.4;
  margin-bottom: 0.4rem;
}

.event-note {
  font-size: 0.85rem;
  color: #7a4f2e;
  line-height: 1.6;
  margin-top: 0.2rem;
}

.event-note.tbd {
  color: #c0392b;
  font-style: italic;
}

/* フライトカード */
.flight-card {
  display: block;
  margin-top: 0.7rem;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  color: white;
  transition: transform 0.15s, box-shadow 0.15s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  max-width: 440px;
}

.flight-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
}

.flight-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.55rem 0.9rem;
  background: rgba(255, 255, 255, 0.07);
  font-size: 0.72rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.flight-carrier {
  font-weight: 700;
  letter-spacing: 1px;
  color: #f0a500;
}

.flight-booking {
  color: rgba(255, 255, 255, 0.65);
}

.flight-booking strong {
  color: white;
  letter-spacing: 1px;
}

.flight-route {
  display: flex;
  align-items: center;
  padding: 0.8rem 0.9rem;
  gap: 0.5rem;
}

.flight-airport {
  flex: 1;
}

.flight-airport-right {
  text-align: right;
}

.flight-time {
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1;
  font-family: 'Georgia', serif;
  color: white;
}

.flight-code {
  font-size: 0.9rem;
  font-weight: 700;
  color: #f0a500;
  margin-top: 0.2rem;
  letter-spacing: 1px;
}

.flight-name {
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.55);
  margin-top: 0.1rem;
}

.flight-terminal {
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 0.1rem;
}

.flight-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  gap: 3px;
}

.flight-arrow {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.35);
  flex-shrink: 0;
  letter-spacing: -2px;
}

.flight-duration {
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.45);
  white-space: nowrap;
}

.flight-date {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.45);
  text-align: center;
  padding: 0.4rem 0.9rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
}

/* 決定店ボックス */
.decided-box {
  margin-top: 0.6rem;
  background: #eafaf1;
  border: 1.5px solid #a9dfbf;
  border-radius: 6px;
  padding: 0.65rem 0.9rem;
  max-width: 380px;
  margin-bottom: 0.5rem;
}

.decided-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: #1e8449;
  letter-spacing: 0.5px;
  margin-bottom: 0.25rem;
}

.decided-name {
  font-size: 1rem;
  font-weight: 700;
  color: #1a3c2c;
  margin-bottom: 0.5rem;
}

.decided-links {
  display: flex;
  gap: 0.6rem;
}

.decided-link {
  font-size: 0.78rem;
  font-weight: 600;
  color: #27ae60;
  text-decoration: none;
  background: white;
  border: 1px solid #a9dfbf;
  border-radius: 4px;
  padding: 0.25rem 0.6rem;
  transition: background 0.15s, color 0.15s;
}

.decided-link:hover {
  background: #27ae60;
  color: white;
  border-color: #27ae60;
}

/* 移動カード */
.transit-card {
  margin-top: 0.6rem;
  background: #f4f6f7;
  border: 1.5px solid #d5d8dc;
  border-radius: 6px;
  padding: 0.55rem 0.8rem;
  max-width: 380px;
}

.transit-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.transit-icon {
  font-size: 1.3rem;
  flex-shrink: 0;
  color: #5d6d7e;
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  line-height: 1;
}

.transit-route {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-weight: 700;
  font-size: 0.88rem;
  color: #2c3e50;
}

.transit-station {
  background: white;
  border: 1px solid #aab7b8;
  border-radius: 3px;
  padding: 0.1rem 0.45rem;
  font-size: 0.83rem;
}

.transit-arrow {
  color: #7f8c8d;
  font-size: 0.8rem;
}

.transit-label {
  font-size: 0.72rem;
  color: #7f8c8d;
  margin-left: auto;
}

.transit-link {
  font-size: 0.72rem;
  font-weight: 600;
  color: #2980b9;
  text-decoration: none;
  margin-left: auto;
  white-space: nowrap;
  border-bottom: 1px solid #aed6f1;
  transition: color 0.15s;
}

.transit-link:hover {
  color: #1a5276;
}

.transit-sub {
  font-size: 0.75rem;
  color: #7f8c8d;
  margin-top: 0.35rem;
  padding-top: 0.35rem;
  border-top: 1px solid #e0e0e0;
}

/* 宿泊カード */
.stay-card {
  margin-top: 0.6rem;
  background: #eaf2fb;
  border: 1.5px solid #aed6f1;
  border-radius: 6px;
  padding: 0.75rem 0.9rem;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.stay-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a5276;
}

.stay-address {
  font-size: 0.82rem;
  color: #2c3e50;
  line-height: 1.6;
  display: flex;
  gap: 0.3rem;
}

.stay-icon {
  flex-shrink: 0;
  margin-top: 1px;
}

.stay-checkin-link {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  color: #2980b9;
  text-decoration: none;
  border-top: 1px solid #aed6f1;
  padding-top: 0.45rem;
  transition: color 0.15s;
}

.stay-checkin-link:hover {
  color: #1a5276;
  text-decoration: underline;
}

/* チケットボックス */
.ticket-box {
  display: inline-block;
  font-size: 0.85rem;
  color: #2c1810;
  background: #fff8e1;
  border: 1.5px dashed #d4a017;
  border-radius: 4px;
  padding: 0.5rem 0.8rem;
  margin-top: 0.5rem;
  font-weight: 600;
}

/* チケットリンク */
.ticket-link {
  display: inline-block;
  margin-left: 0.6rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #7a4f2e;
  text-decoration: none;
  border-bottom: 1px solid #d4a017;
  transition: color 0.15s;
}

.ticket-link:hover {
  color: #c0392b;
}

/* ハイライトボックス */
.highlight-box {
  font-size: 0.9rem;
  font-weight: 700;
  color: #1a5276;
  background: #eaf4fb;
  border-left: 3px solid #2980b9;
  padding: 0.6rem 0.8rem;
  margin-top: 0.6rem;
  border-radius: 0 4px 4px 0;
  line-height: 1.4;
}

.highlight-desc {
  font-size: 0.8rem;
  font-weight: 400;
  color: #5d6d7e;
  margin-top: 0.3rem;
}

.highlight-link {
  display: inline-block;
  margin-top: 0.45rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #1a5276;
  text-decoration: none;
  border-bottom: 1px solid #2980b9;
  transition: color 0.15s;
}

.highlight-link:hover {
  color: #2980b9;
}

/* 候補店ボックス */
.candidates-box {
  background: #fffbf0;
  border: 1.5px dashed #d4a017;
  border-radius: 6px;
  padding: 0.6rem 0.9rem;
  margin-top: 0.6rem;
  font-size: 0.88rem;
}

.candidates-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #7a4f2e;
  margin-bottom: 0.35rem;
  letter-spacing: 0.5px;
}

.candidate-item {
  color: #2c1810;
  padding: 0.25rem 0;
  border-bottom: 1px dotted #e8d5b7;
  font-weight: 600;
}

.candidate-item:last-child {
  border-bottom: none;
}

/* スポットリスト */
.spot-list {
  margin-top: 0.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.spot-item {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.88rem;
  background: #f5f0e8;
  padding: 0.5rem 0.7rem;
  border-radius: 4px;
}

.spot-icon {
  font-size: 1.3rem;
  flex-shrink: 0;
  color: #8e44ad;
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  line-height: 1;
}

/* Material Symbols 共通設定 */
.material-symbols-outlined {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  line-height: 1;
  vertical-align: middle;
}

.candidates-label .material-symbols-outlined,
.decided-label .material-symbols-outlined,
.stay-checkin-link .material-symbols-outlined,
.highlight-box .material-symbols-outlined,
.ticket-box .material-symbols-outlined,
.decided-link .material-symbols-outlined {
  font-size: 1em;
}

.stay-icon.material-symbols-outlined {
  font-size: 1.1rem;
  color: #2980b9;
  margin-top: 1px;
}

.spot-desc {
  font-size: 0.78rem;
  color: #7a4f2e;
  margin-top: 0.1rem;
}

/* ===== 案A / 案B ===== */
.plan-row .tl-body {
  padding-bottom: 2rem;
}

.plans-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 0.8rem;
}

.plan-card {
  border-radius: 6px;
  overflow: hidden;
  border: 1.5px solid transparent;
  font-size: 0.85rem;
}

.plan-a {
  border-color: #aed6f1;
  background: #eaf4fb;
}

.plan-b {
  border-color: #a9dfbf;
  background: #eafaf1;
}

.plan-head {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.plan-a .plan-head { background: #d6eaf8; }
.plan-b .plan-head { background: #d5f5e3; }

.plan-badge {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 2px;
  padding: 0.2rem 0.5rem;
  border-radius: 2px;
  color: white;
  margin-bottom: 0.4rem;
  display: inline-block;
}

.plan-badge-a { background: #2980b9; }
.plan-badge-b { background: #27ae60; }

.plan-name {
  font-size: 0.85rem;
  font-weight: 700;
  color: #2c1810;
  line-height: 1.4;
  margin: 0.3rem 0 0.2rem;
}

.plan-theme {
  font-size: 0.75rem;
  color: #7a4f2e;
}

.plan-items {
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.plan-item {
  display: flex;
  gap: 0.5rem;
  line-height: 1.5;
  color: #2c1810;
}

.plan-time {
  font-size: 0.72rem;
  font-weight: 700;
  color: #7a4f2e;
  min-width: 38px;
  flex-shrink: 0;
  padding-top: 1px;
}

.plan-note {
  font-size: 0.78rem;
  color: #5d6d7e;
  margin-top: 0.2rem;
  line-height: 1.5;
}

/* ===== フッター ===== */
.book-footer {
  text-align: center;
  padding: 3rem 2rem 4rem;
  background: #2c1810;
  color: rgba(255, 255, 255, 0.7);
}

.footer-stamp {
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 6px;
  color: white;
  border: 2.5px solid rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  padding: 0.6rem 1.5rem;
  margin-bottom: 1rem;
  font-family: 'Georgia', serif;
  opacity: 0.85;
}

.footer-msg {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.footer-ornament {
  font-size: 0.9rem;
  letter-spacing: 4px;
  opacity: 0.4;
  margin-top: 0.5rem;
}


/* PDF保存ボタン（フッター） */
.footer-pdf-btn {
  margin-top: 1.5rem;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.72rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  letter-spacing: 1px;
  font-family: inherit;
  transition: color 0.2s;
}

.footer-pdf-btn .material-symbols-outlined {
  font-size: 1rem;
}

.footer-pdf-btn:hover {
  color: rgba(255, 255, 255, 0.7);
}

/* ===== 印刷スタイル ===== */
@media print {
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  /* UI要素を非表示 */
  .day-nav,
  .auth-overlay {
    display: none !important;
  }

  /* ベースフォントを小さく */
  .travel-book {
    font-size: 10px;
  }

  /* 表紙を1ページ目に */
  .book-cover {
    min-height: 100vh;
    page-break-after: always;
  }

  /* 各日程を新ページから・余白を最小化 */
  .day-section {
    page-break-before: always;
    page-break-inside: avoid;
    padding: 0.6rem 1rem;
  }

  .day-section-alt {
    background: #f8f3e8 !important;
  }

  /* コンテンツ幅を最大化 */
  .book-content {
    max-width: 100%;
  }

  /* 日ヘッダー */
  .day-header {
    margin-bottom: 0.6rem;
    padding-bottom: 0.4rem;
  }

  .day-title {
    font-size: 1.2rem;
  }

  .day-badge {
    font-size: 0.6rem;
    padding: 0.2rem 0.5rem;
  }

  .day-emoji {
    font-size: 1.3rem;
  }

  /* タイムライン */
  .tl-time {
    width: 52px;
    min-width: 52px;
    font-size: 0.68rem;
    padding-right: 8px;
  }

  .tl-pin {
    width: 16px;
    min-width: 16px;
  }

  .tl-dot {
    width: 10px;
    height: 10px;
    margin-top: 1px;
  }

  .tl-line {
    min-height: 6px;
    margin-top: 2px;
  }

  .tl-body {
    padding-left: 8px;
    padding-bottom: 0.35rem;
  }

  .tl-row.last .tl-body {
    padding-bottom: 0;
  }

  /* イベント本文 */
  .event-title {
    font-size: 0.88rem;
    margin-bottom: 0.15rem;
  }

  .event-note {
    font-size: 0.7rem;
    margin-top: 0.1rem;
  }

  /* 移動カード */
  .transit-card {
    margin-top: 0.25rem;
    padding: 0.28rem 0.5rem;
    max-width: 100%;
  }

  .transit-icon {
    font-size: 1rem;
  }

  .transit-route {
    font-size: 0.72rem;
  }

  .transit-station {
    font-size: 0.68rem;
    padding: 0.05rem 0.3rem;
  }

  .transit-sub {
    font-size: 0.62rem;
    margin-top: 0.15rem;
    padding-top: 0.15rem;
  }

  .transit-link {
    font-size: 0.62rem;
  }

  /* チケットボックス */
  .ticket-box {
    font-size: 0.72rem;
    margin-top: 0.25rem;
    padding: 0.28rem 0.5rem;
  }

  /* ハイライト */
  .highlight-box {
    font-size: 0.75rem;
    padding: 0.28rem 0.5rem;
    margin-top: 0.25rem;
  }

  .highlight-desc {
    font-size: 0.65rem;
    margin-top: 0.15rem;
  }

  .highlight-link {
    font-size: 0.65rem;
    margin-top: 0.2rem;
  }

  /* 候補店ボックス */
  .candidates-box {
    margin-top: 0.25rem;
    padding: 0.28rem 0.5rem;
  }

  .candidates-label {
    font-size: 0.65rem;
    margin-bottom: 0.15rem;
  }

  .candidate-item {
    font-size: 0.7rem;
    padding: 0.12rem 0;
  }

  /* 決定ボックス */
  .decided-box {
    margin-top: 0.25rem;
    padding: 0.35rem 0.6rem;
    max-width: 100%;
  }

  .decided-name {
    font-size: 0.85rem;
    margin-bottom: 0.25rem;
  }

  .decided-label {
    font-size: 0.62rem;
    margin-bottom: 0.15rem;
  }

  .decided-link {
    font-size: 0.65rem;
    padding: 0.15rem 0.4rem;
  }

  /* 宿泊カード */
  .stay-card {
    margin-top: 0.25rem;
    padding: 0.4rem 0.6rem;
    gap: 0.25rem;
    max-width: 100%;
  }

  .stay-name {
    font-size: 0.82rem;
  }

  .stay-address {
    font-size: 0.68rem;
  }

  .stay-checkin-link {
    font-size: 0.68rem;
    padding-top: 0.25rem;
  }

  /* フライトカード */
  .flight-card {
    max-width: 100%;
    margin-top: 0.35rem;
  }

  .flight-time {
    font-size: 1rem;
  }

  .flight-code {
    font-size: 0.72rem;
  }

  .flight-name,
  .flight-terminal,
  .flight-duration,
  .flight-date {
    font-size: 0.6rem;
  }

  .flight-card-header {
    font-size: 0.6rem;
    padding: 0.3rem 0.6rem;
  }

  .flight-route {
    padding: 0.4rem 0.6rem;
  }

  /* スポットリスト */
  .spot-list {
    margin-top: 0.25rem;
    gap: 0.25rem;
  }

  .spot-item {
    font-size: 0.72rem;
    padding: 0.28rem 0.5rem;
  }

  .spot-desc {
    font-size: 0.62rem;
  }

  /* 案A/B */
  .plans-grid {
    margin-top: 0.4rem;
    gap: 0.5rem;
  }

  .plan-head {
    padding: 0.4rem 0.6rem;
  }

  .plan-name {
    font-size: 0.72rem;
  }

  .plan-theme {
    font-size: 0.62rem;
  }

  .plan-items {
    padding: 0.4rem 0.6rem;
    gap: 0.3rem;
  }

  .plan-item {
    font-size: 0.7rem;
  }

  .plan-time {
    font-size: 0.62rem;
    min-width: 32px;
  }

  .plan-note {
    font-size: 0.62rem;
  }

  /* フッター非表示 */
  .book-footer {
    display: none;
  }

  /* リンクのURL表示 */
  a[href^="http"]::after {
    content: " (" attr(href) ")";
    font-size: 0.6em;
    color: #888;
    word-break: break-all;
  }
}

/* ===== レスポンシブ ===== */
@media (max-width: 640px) {
  .cover-title {
    font-size: 3rem;
    letter-spacing: 6px;
  }

  .book-cover {
    padding: 2rem 1.5rem;
  }

  .day-section {
    padding: 2rem 1rem 1.5rem;
  }

  .day-title {
    font-size: 1.3rem;
  }

  .tl-time {
    width: 58px;
    min-width: 58px;
    font-size: 0.72rem;
  }

  .plans-grid {
    grid-template-columns: 1fr;
  }

  .cover-days {
    flex-direction: column;
    gap: 0.3rem;
  }
}
</style>
