<template>
  <main class="support-page">
    <section class="card">
      <h1>TesseraClock Support</h1>
      <p>アプリのダウンロードと詳細はこちらからご確認ください。</p>
      <a
        class="app-link"
        href="https://apps.apple.com/us/app/tesseraclock/id6770039033"
        target="_blank"
        rel="noopener noreferrer"
      >
        App Store で開く
      </a>
    </section>
  </main>
</template>

<style scoped>
.support-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background: linear-gradient(140deg, #f4fbff 0%, #e9f3ff 55%, #fff4ec 100%);
}

.card {
  width: min(680px, 100%);
  padding: 32px;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 14px 40px rgba(20, 35, 70, 0.12);
  text-align: center;
}

h1 {
  margin: 0;
  font-size: clamp(1.75rem, 3vw, 2.2rem);
  color: #13304a;
}

p {
  margin: 14px 0 28px;
  font-size: 1rem;
  line-height: 1.7;
  color: #3c556d;
}

.app-link {
  display: inline-block;
  padding: 12px 22px;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #ffffff;
  background: #0070c9;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease;
}

.app-link:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 20px rgba(0, 112, 201, 0.25);
  background: #005fa8;
}

.app-link:focus-visible {
  outline: 3px solid #8dd2ff;
  outline-offset: 3px;
}

@media (max-width: 640px) {
  .card {
    padding: 24px;
  }
}
</style>
