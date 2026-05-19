<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" fill="none" class="ceremony-icon">
    <defs>
      <linearGradient id="sc-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F9A8D4" />
        <stop offset="50%" stop-color="#EC4899" />
        <stop offset="100%" stop-color="#BE185D" />
      </linearGradient>
      <linearGradient id="sc-gold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#D4A574" />
        <stop offset="100%" stop-color="#C9A96E" />
      </linearGradient>
    </defs>

    <!-- Left blade -->
    <path
      d="M30 36 C28 28 20 18 14 16 C10 14.5 6 16 5.5 20 C5 24 8 28 14 28 C18 28 24 30 28 34"
      stroke="url(#sc-grad)" stroke-width="2" fill="none" stroke-linecap="round"
    />
    <!-- Right blade -->
    <path
      d="M30 44 C28 52 20 62 14 64 C10 65.5 6 64 5.5 60 C5 56 8 52 14 52 C18 52 24 50 28 46"
      stroke="url(#sc-grad)" stroke-width="2" fill="none" stroke-linecap="round"
    />

    <!-- Left finger ring -->
    <ellipse cx="10" cy="20" rx="5.5" ry="5" stroke="url(#sc-grad)" stroke-width="2" fill="none" />
    <ellipse cx="10" cy="20" rx="2.5" ry="2" fill="#FBCFE8" opacity="0.3" />

    <!-- Right finger ring -->
    <ellipse cx="10" cy="60" rx="5.5" ry="5" stroke="url(#sc-grad)" stroke-width="2" fill="none" />
    <ellipse cx="10" cy="60" rx="2.5" ry="2" fill="#FBCFE8" opacity="0.3" />

    <!-- Pivot screw — gold accent -->
    <circle cx="30" cy="40" r="3.5" fill="url(#sc-gold)" />
    <circle cx="30" cy="40" r="1.5" fill="white" opacity="0.5" />

    <!-- Cutting blades extending right -->
    <path
      d="M32 37 L68 22"
      stroke="url(#sc-grad)" stroke-width="2.2" stroke-linecap="round"
    />
    <path
      d="M32 43 L68 58"
      stroke="url(#sc-grad)" stroke-width="2.2" stroke-linecap="round"
    />

    <!-- Blade edge shine -->
    <path d="M36 38.5 L64 24.5" stroke="#FBCFE8" stroke-width="0.8" opacity="0.4" stroke-linecap="round" />
    <path d="M36 41.5 L64 55.5" stroke="#FBCFE8" stroke-width="0.8" opacity="0.4" stroke-linecap="round" />

    <!-- Hair strand being cut -->
    <path d="M56 32 Q60 40 56 48" stroke="url(#sc-gold)" stroke-width="1.2" fill="none" opacity="0.5" stroke-linecap="round" />
    <path d="M60 30 Q64 40 60 50" stroke="url(#sc-gold)" stroke-width="1" fill="none" opacity="0.35" stroke-linecap="round" />

    <!-- Sparkle accents -->
    <circle cx="70" cy="18" r="1.5" fill="#F9A8D4" opacity="0.6" />
    <circle cx="74" cy="24" r="1" fill="#FBCFE8" opacity="0.4" />
    <circle cx="72" cy="60" r="1.2" fill="#F9A8D4" opacity="0.5" />
  </svg>
</template>
