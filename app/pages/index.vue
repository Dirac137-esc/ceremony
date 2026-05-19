<script setup lang="ts">
import PhotoGallery from '~/components/PhotoGallery.vue'

// ── Floating petals ──────────────────────────────────────────────────────────
const petals = ref<
  { id: number, left: string, delay: string, duration: string, symbol: string }[]
>([])

onMounted(() => {
  const symbols = ['🌸', '✿', '💗', '✨', '🌷', '♡']
  petals.value = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 12}s`,
    duration: `${10 + Math.random() * 14}s`,
    symbol: symbols[Math.floor(Math.random() * symbols.length)]
  }))

  const observer = new IntersectionObserver(
    entries =>
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('is-visible')
      }),
    { threshold: 0.12 }
  )
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
})

const eventDate = '2026-05-31T11:00:00'
</script>

<template>
  <!-- ── Root ─────────────────────────────────────────────────────────────── -->
  <div class="page-root relative overflow-hidden">
    <!-- ── Floating petals ──────────────────────────────────────────────── -->
    <div
      v-for="p in petals"
      :key="p.id"
      class="petal pointer-events-none select-none"
      :style="{ left: p.left, animationDelay: p.delay, animationDuration: p.duration }"
    >
      {{ p.symbol }}
    </div>

    <!-- ════════════════════════════════════════════════════════════════════
         HERO
    ════════════════════════════════════════════════════════════════════ -->
    <section class="hero-section min-h-screen flex flex-col items-center justify-center px-6 py-20 relative">
      <!-- Ambient orbs -->
      <div class="orb orb-1" />
      <div class="orb orb-2" />
      <div class="orb orb-3" />

      <div class="relative z-10 text-center max-w-xl mx-auto hero-entrance">
        <!-- Ceremony badge -->
        <UBadge
          variant="subtle"
          size="lg"
          class="mb-6 tracking-[0.25em] uppercase font-semibold text-xs px-5 py-2 rounded-full ceremony-badge"
        >
          ✦ Үсний Найрын Урилга ✦
        </UBadge>

        <!-- Name -->
        <h1 class="hero-name mb-3 leading-[1.15]">
          Шаравжамцийн<br>
          <em>Гэгээ</em>
        </h1>

        <!-- Sub-label -->
        <p class="hero-sub mb-10">
          2 нас &nbsp;·&nbsp; 2023.12.10
        </p>

        <!-- Portrait frame -->
        <div class="portrait-frame mx-auto mb-10">
          <div class="portrait-glow" />
          <div class="portrait-ring portrait-ring-outer" />
          <div class="portrait-ring portrait-ring-inner" />
          <img
            src="/bunny.png"
            alt="Гэгээ"
            class="portrait-img"
          >
        </div>

        <!-- Tagline -->
        <p class="tagline mb-10 max-w-sm mx-auto">
          Эрхэм хүндэт зочдоо хүүхдийнхээ
          <span class="tagline-em">үсний найрын баярт</span> урьж байна
        </p>
      </div>
    </section>

    <!-- ════════════════════════════════════════════════════════════════════
         COUNTDOWN
    ════════════════════════════════════════════════════════════════════ -->
    <section
      id="countdown"
      class="section-py reveal"
    >
      <UContainer class="max-w-3xl text-center">
        <div class="section-ornament">
          🌸
        </div>
        <h2 class="section-title">
          Баяр болох хугацаа
        </h2>
        <p class="section-sub mb-10">
          2026 оны 5-р сарын 31
        </p>

        <CountdownTimer :target-date="eventDate" />
      </UContainer>
    </section>

    <!-- ════════════════════════════════════════════════════════════════════
         ABOUT
    ════════════════════════════════════════════════════════════════════ -->
    <section class="section-py reveal">
      <UContainer class="max-w-2xl">
        <UCard
          class="elegant-card text-center"
          :ui="{ body: 'px-8 py-12 sm:px-14 sm:py-14' }"
        >
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-50 border border-rose-200 mb-6">
            <IconsIconScissors class="w-8 h-8 text-rose-400" />
          </div>

          <h2 class="section-title mb-6">
            Үсний Найрын Тухай
          </h2>

          <p class="about-text">
            Үсний найр бол Монголчуудын эртний ёс заншил бөгөөд хүүхдийг <strong>2–5 насанд</strong>
            хүрэхэд анх удаа үсийг нь авах баяр ёслол юм. Энэ нь хүүхдийн эрүүл, аз жаргалтай
            өсөн торнихыг ерөөсөн утга учиртай.
          </p>

          <div class="my-7 flex items-center justify-center gap-4 text-2xl opacity-70">
            🌸 &nbsp; 🐰 &nbsp; 🌸
          </div>

          <p class="about-text">
            Бид <strong>Гэгээгийн</strong> үсний найрын баярыг тэмдэглэж, та бүхнийг
            энэхүү дурсамжит баяр ёслолд оролцохыг урьж байна. 💕
          </p>
        </UCard>
      </UContainer>
    </section>

    <!-- ════════════════════════════════════════════════════════════════════
         GALLERY
    ════════════════════════════════════════════════════════════════════ -->
    <section class="section-py reveal">
      <UContainer class="max-w-5xl">
        <div class="text-center mb-12">
          <div class="section-ornament">
            📸
          </div>
          <h2 class="section-title">
            Манай Гэгээ
          </h2>
          <p class="section-sub">
            Гэгээгийн хамгийн сайхан мөчүүд 🐰
          </p>
        </div>

        <PhotoGallery />
      </UContainer>
    </section>

    <!-- ════════════════════════════════════════════════════════════════════
         EVENT DETAILS
    ════════════════════════════════════════════════════════════════════ -->
    <section
      id="event"
      class="section-py reveal"
    >
      <UContainer class="max-w-3xl">
        <div class="text-center mb-12">
          <div class="section-ornament">
            <IconsIconMapPin class="w-7 h-7 inline-block text-rose-400" />
          </div>
          <h2 class="section-title">
            Арга Хэмжээний Мэдээлэл
          </h2>
        </div>

        <!-- Info cards -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          <UCard
            class="detail-card text-center group"
            :ui="{ body: 'px-5 py-8' }"
          >
            <div class="detail-icon-wrap mx-auto mb-3">
              <IconsIconCalendar class="w-7 h-7" />
            </div>
            <p class="detail-label">
              Огноо
            </p>
            <p class="detail-main">
              2026.05.31
            </p>
            <p class="detail-sub">
              Ням гараг
            </p>
          </UCard>

          <UCard
            class="detail-card text-center group"
            :ui="{ body: 'px-5 py-8' }"
          >
            <div class="detail-icon-wrap mx-auto mb-3">
              <IconsIconClock class="w-7 h-7" />
            </div>
            <p class="detail-label">
              Цаг
            </p>
            <p class="detail-main">
              11:00
            </p>
            <p class="detail-sub">
              Өдрийн
            </p>
          </UCard>

          <UCard
            class="detail-card text-center group"
            :ui="{ body: 'px-5 py-8' }"
          >
            <div class="detail-icon-wrap mx-auto mb-3">
              <IconsIconMapPin class="w-7 h-7" />
            </div>
            <p class="detail-label">
              Хаяг
            </p>
            <p class="detail-main">
              Ботаник
            </p>
            <p class="detail-sub">
              10-р хороо, 1а-56
            </p>
          </UCard>
        </div>

        <!-- Map -->
        <UCard
          class="map-card overflow-hidden"
          :ui="{ body: 'p-0' }"
        >
          <iframe
            src="https://www.google.com/maps?q=47.911833,107.007597&z=17&output=embed"
            width="100%"
            height="340"
            style="border:0; display:block;"
            allowfullscreen
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
        </UCard>

        <p class="map-caption mt-4 text-center">
          <IconsIconMapPin class="w-4 h-4 inline mr-1 text-rose-400" />
          Ботаник, 10-р хороо, 1а-56, Улаанбаатар
        </p>
      </UContainer>
    </section>

    <!-- ════════════════════════════════════════════════════════════════════
         RSVP
    ════════════════════════════════════════════════════════════════════ -->
    <section
      id="rsvp"
      class="section-py reveal"
    >
      <UContainer class="max-w-2xl">
        <div class="text-center mb-10">
          <div class="section-ornament">
            <IconsIconEnvelope class="w-7 h-7 inline-block text-rose-400" />
          </div>
          <h2 class="section-title">
            Ирэх Эсэхээ Мэдэгдэх
          </h2>
          <p class="section-sub">
            Та ирэх эсэхээ доорх хэсэгт бөглөнө үү
          </p>
        </div>

        <UCard
          class="elegant-card"
          :ui="{ body: 'px-8 py-10 sm:px-12' }"
        >
          <RsvpForm />
        </UCard>
      </UContainer>
    </section>

    <!-- ════════════════════════════════════════════════════════════════════
         WISH WALL
    ════════════════════════════════════════════════════════════════════ -->
    <section
      id="wishes"
      class="section-py reveal"
    >
      <UContainer class="max-w-4xl">
        <div class="text-center mb-10">
          <div class="section-ornament">
            <IconsIconLoveLetter class="w-7 h-7 inline-block text-rose-400" />
          </div>
          <h2 class="section-title">
            Ерөөлийн Хана
          </h2>
          <p class="section-sub">
            Гэгээд хандсан сайхан ерөөлүүд 🐰
          </p>
        </div>

        <WishWall />
      </UContainer>
    </section>

    <!-- ════════════════════════════════════════════════════════════════════
         FOOTER
    ════════════════════════════════════════════════════════════════════ -->
    <footer class="py-16 px-6 text-center relative z-10">
      <USeparator class="mb-10">
        <span class="text-2xl">🐰</span>
      </USeparator>

      <p class="footer-name">
        Шаравжамцийн Гэгээ
      </p>
      <p class="footer-sub mt-1">
        Үсний Найрын Баяр &nbsp;·&nbsp; 2026.05.31
      </p>
      <p class="footer-made mt-4 text-xs opacity-50">
        Made with 💕
      </p>
    </footer>
  </div>
</template>

<style scoped>
/* ── Google Fonts ─────────────────────────────────────────────────────────── */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

/* ── Design tokens ────────────────────────────────────────────────────────── */
:root {
  --rose-50:  #fff1f3;
  --rose-100: #ffe4e8;
  --rose-200: #fecdd5;
  --rose-300: #fda4b5;
  --rose-400: #fb7094;
  --rose-500: #f43f6e;
  --rose-600: #e11d55;
  --rose-800: #9f1239;
  --gold:     #c9a84c;
  --gold-lt:  #f5e6c0;
  --ivory:    #fffaf8;
  --text-body:#6b3046;
}

/* ── Base ─────────────────────────────────────────────────────────────────── */
.page-root {
  background: var(--ivory);
  font-family: 'DM Sans', sans-serif;
  color: var(--text-body);
  min-height: 100vh;
}

/* ── Floating petals ──────────────────────────────────────────────────────── */
.petal {
  position: fixed;
  top: -3rem;
  font-size: 1.4rem;
  opacity: 0;
  animation: petalFall linear infinite;
  z-index: 0;
}
@keyframes petalFall {
  0%   { transform: translateY(-5vh) rotate(0deg);   opacity: 0; }
  5%   { opacity: 0.6; }
  95%  { opacity: 0.4; }
  100% { transform: translateY(105vh) rotate(360deg); opacity: 0; }
}

/* ── Ambient orbs ─────────────────────────────────────────────────────────── */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}
.orb-1 { width:520px; height:520px; background:rgba(253,164,181,.28); top:-120px; left:-140px; }
.orb-2 { width:420px; height:420px; background:rgba(245,230,192,.35); bottom:-80px; right:-100px; }
.orb-3 { width:300px; height:300px; background:rgba(254,205,213,.22); top:40%; left:55%; }

/* ── Hero section ─────────────────────────────────────────────────────────── */
.hero-section {
  background: linear-gradient(160deg, #fff5f7 0%, #fffaf5 55%, #fff0f5 100%);
}

.hero-entrance {
  animation: fadeSlideUp .9s cubic-bezier(.22,1,.36,1) both;
}
@keyframes fadeSlideUp {
  from { opacity:0; transform:translateY(36px); }
  to   { opacity:1; transform:translateY(0); }
}

.ceremony-badge {
  background: linear-gradient(135deg, #fde8ef, #fdf6ea) !important;
  color: var(--rose-600) !important;
  border: 1px solid #f9ccd8 !important;
  letter-spacing: .22em;
}

.hero-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.8rem, 9vw, 5.5rem);
  font-weight: 600;
  color: #8b1a3a;
  letter-spacing: -.01em;
  line-height: 1.12;
}
.hero-name em {
  font-style: italic;
  color: var(--gold);
  font-weight: 700;
}

.hero-sub {
  font-size: .95rem;
  color: var(--rose-400);
  letter-spacing: .14em;
  font-weight: 500;
}

/* ── Portrait frame ───────────────────────────────────────────────────────── */
.portrait-frame {
  position: relative;
  width: 220px;
  height: 220px;
}
@media (min-width:640px) { .portrait-frame { width:280px; height:280px; } }

.portrait-glow {
  position: absolute;
  inset: -20px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(254,205,213,.55) 0%, transparent 70%);
  animation: pulseGlow 3.5s ease-in-out infinite;
}
@keyframes pulseGlow {
  0%,100% { transform: scale(1);   opacity:.7; }
  50%      { transform: scale(1.1); opacity:1; }
}

.portrait-ring {
  position: absolute;
  border-radius: 50%;
  border: 2px solid rgba(201,168,76,.45);
  pointer-events: none;
}
.portrait-ring-outer { inset:-12px; border-color: rgba(251,112,148,.3); }
.portrait-ring-inner { inset:-4px;  border-color: rgba(201,168,76,.5); }

.portrait-img {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
  background: linear-gradient(135deg, #fde8ef, #fdf6ea);
  box-shadow: 0 20px 60px rgba(244,63,110,.18), 0 4px 20px rgba(201,168,76,.15);
  animation: floatPortrait 5s ease-in-out infinite;
}
@keyframes floatPortrait {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(-10px); }
}

/* ── Tagline ──────────────────────────────────────────────────────────────── */
.tagline {
  font-size: 1.05rem;
  color: #b0405e;
  line-height: 1.75;
  font-weight: 300;
}
.tagline-em {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 1.15rem;
  font-weight: 600;
  color: #8b1a3a;
}

/* ── Section utilities ────────────────────────────────────────────────────── */
.section-py { padding-top: 6rem; padding-bottom: 6rem; }

.section-ornament {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  gap: .75rem;
  opacity: .8;
}
.section-ornament::before,
.section-ornament::after {
  content: '';
  display: block;
  height: 1px;
  width: 3rem;
  background: linear-gradient(to right, transparent, #fda4b5);
}
.section-ornament::after {
  background: linear-gradient(to left, transparent, #fda4b5);
}

.section-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 600;
  color: #7c1230;
  line-height: 1.2;
  letter-spacing: -.01em;
}

.section-sub {
  font-size: .9rem;
  color: var(--rose-400);
  letter-spacing: .06em;
}

/* ── Reveal animation ────────────────────────────────────────────────────── */
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity .7s ease, transform .7s ease;
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── Cards ───────────────────────────────────────────────────────────────── */
.elegant-card {
  background: linear-gradient(160deg, #fffbfc 0%, #fff8f0 100%) !important;
  border: 1px solid #fce4ea !important;
  box-shadow: 0 8px 48px rgba(244,63,110,.07), 0 2px 12px rgba(201,168,76,.06) !important;
  border-radius: 1.75rem !important;
}

.detail-card {
  background: linear-gradient(160deg, #fffbfc, #fff6f0) !important;
  border: 1px solid #fce4ea !important;
  border-radius: 1.25rem !important;
  transition: transform .3s ease, box-shadow .3s ease;
}
.detail-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 16px 48px rgba(244,63,110,.13) !important;
}

.detail-icon-wrap {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #fde8ef, #fdf6ea);
  border: 1px solid #f9ccd8;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--rose-400);
  transition: background .3s ease;
}
.detail-card:hover .detail-icon-wrap {
  background: linear-gradient(135deg, #ffd6e0, #fcecd5);
}

.detail-label {
  font-size: .72rem;
  text-transform: uppercase;
  letter-spacing: .15em;
  color: var(--rose-400);
  font-weight: 600;
  margin-bottom: .25rem;
}
.detail-main {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.35rem;
  font-weight: 700;
  color: #7c1230;
}
.detail-sub {
  font-size: .8rem;
  color: var(--rose-400);
}

/* ── Map ─────────────────────────────────────────────────────────────────── */
.map-card {
  border-radius: 1.25rem !important;
  overflow: hidden !important;
  border: 1px solid #fce4ea !important;
  box-shadow: 0 8px 32px rgba(244,63,110,.09) !important;
}
.map-caption {
  font-size: .82rem;
  color: var(--rose-400);
  letter-spacing: .04em;
}

/* ── About text ──────────────────────────────────────────────────────────── */
.about-text {
  font-size: 1rem;
  line-height: 1.85;
  color: #9b3350;
  font-weight: 300;
}
.about-text strong { font-weight: 600; color: #7c1230; }

/* ── Footer ──────────────────────────────────────────────────────────────── */
.footer-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.4rem;
  font-weight: 600;
  color: #7c1230;
  font-style: italic;
}
.footer-sub { font-size: .82rem; color: var(--rose-400); letter-spacing: .08em; }
.footer-made { color: var(--rose-300); }
</style>
