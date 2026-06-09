<template>
  <main class="tessera-page">
    <section class="hero card">
      <img
        src="../assets/tesseraclock_ios_icon.png"
        alt="TesseraClock アイコン"
        class="app-icon"
      />
      <h1>TesseraClock</h1>
      <p class="lead">
        TesseraClock は、シンプルさと自由なカスタマイズを両立したクロックウィジェットアプリです。
        背景色・文字色を自由に選べるので、ホーム画面のテーマに合わせたウィジェットをつくれます。
      </p>
      <a
        class="store-link"
        href="https://apps.apple.com/us/app/tesseraclock/id6770039033"
        target="_blank"
        rel="noopener noreferrer"
      >
        App Store で開く
      </a>
    </section>

    <section class="card">
      <h2>豊富なウィジェットサイズ</h2>
      <p>
        ホーム画面の小・中・大に加え、ロック画面の円形・横長・インライン、さらに iOS 17 のスタンバイモードにも対応。
        すべての画面で時刻を確認できます。
      </p>
    </section>

    <section class="card">
      <h2>自由なカスタマイズ</h2>
      <ul>
        <li>背景色・文字色をカラーピッカーで自由に選択</li>
        <li>タイムゾーンを世界中から検索して設定</li>
        <li>24時間表示 / AM-PM 表示を選択</li>
        <li>秒の表示 / 非表示を切り替え</li>
      </ul>
    </section>

    <section class="card">
      <h2>バッテリーに配慮した設計</h2>
      <p>
        秒の更新はシステムの仕組みを活用し、従来のタイマー駆動より消費電力を抑えた実装を採用しています。
      </p>
    </section>

    <section class="card screenshot-card">
      <h2>スクリーンショット</h2>
      <img
        src="../assets/tesseraclock_ios_01.png"
        alt="TesseraClock スクリーンショット"
        class="screenshot"
      />
    </section>

    <section class="card contact-card">
      <h2>お問い合わせ</h2>
      <p>ご質問やサポートが必要な場合は、お気軽にお問い合わせください。</p>
      <a class="email-link" href="mailto:support@nomunomu.dev">support@nomunomu.dev</a>
    </section>
  </main>
</template>

<style scoped>
.tessera-page {
  min-height: 100vh;
  padding: 24px;
  display: grid;
  gap: 18px;
  background:
    radial-gradient(circle at 15% 10%, rgba(0, 184, 212, 0.18) 0%, transparent 35%),
    radial-gradient(circle at 85% 20%, rgba(255, 171, 64, 0.2) 0%, transparent 30%),
    linear-gradient(140deg, #f7fbff 0%, #edf4ff 58%, #fff8ef 100%);
}

.card {
  width: min(920px, 100%);
  margin: 0 auto;
  padding: 28px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(3px);
  box-shadow: 0 10px 30px rgba(16, 38, 72, 0.12);
}

.hero {
  text-align: center;
}

.app-icon {
  width: 92px;
  height: 92px;
  border-radius: 20px;
  object-fit: cover;
  box-shadow: 0 8px 20px rgba(24, 64, 122, 0.2);
}

h1 {
  margin: 14px 0 10px;
  font-size: clamp(2rem, 4vw, 2.6rem);
  color: #0f2b47;
}

h2 {
  margin: 0 0 12px;
  font-size: clamp(1.25rem, 2.4vw, 1.6rem);
  color: #123858;
}

p,
li {
  margin: 0;
  line-height: 1.8;
  color: #314d67;
  font-size: 1rem;
}

.lead {
  margin-bottom: 18px;
}

ul {
  margin: 0;
  padding-left: 1.2em;
  display: grid;
  gap: 8px;
}

.store-link {
  display: inline-block;
  margin-top: 6px;
  text-decoration: none;
  border-radius: 999px;
  padding: 12px 22px;
  background: #0070c9;
  color: #ffffff;
  font-weight: 700;
  letter-spacing: 0.01em;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease;
}

.store-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(0, 112, 201, 0.3);
  background: #005fa8;
}

.store-link:focus-visible {
  outline: 3px solid #8fd7ff;
  outline-offset: 2px;
}

.screenshot-card {
  text-align: center;
}

.screenshot {
  width: min(420px, 100%);
  border-radius: 20px;
  box-shadow: 0 10px 26px rgba(24, 64, 122, 0.2);
}

.contact-card {
  text-align: center;
}

.email-link {
  display: inline-block;
  margin-top: 12px;
  color: #0070c9;
  font-weight: 700;
  text-decoration: none;
}

.email-link:hover {
  text-decoration: underline;
}

@media (max-width: 640px) {
  .tessera-page {
    padding: 14px;
    gap: 14px;
  }

  .card {
    padding: 20px;
  }

  .app-icon {
    width: 80px;
    height: 80px;
    border-radius: 18px;
  }
}
</style>
