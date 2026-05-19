<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" class="ceremony-icon">
    <defs>
      <linearGradient id="letter-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F9A8D4" />
        <stop offset="100%" stop-color="#EC4899" />
      </linearGradient>
    </defs>
    <!-- Paper -->
    <rect x="12" y="6" width="40" height="46" rx="4" stroke="url(#letter-grad)" stroke-width="2.5" fill="none" />
    <!-- Lines of text -->
    <line x1="20" y1="18" x2="44" y2="18" stroke="#FBCFE8" stroke-width="2" stroke-linecap="round" />
    <line x1="20" y1="26" x2="38" y2="26" stroke="#FBCFE8" stroke-width="2" stroke-linecap="round" />
    <line x1="20" y1="34" x2="42" y2="34" stroke="#FBCFE8" stroke-width="2" stroke-linecap="round" />
    <!-- Heart at bottom -->
    <path d="M32 48 C32 48 25 43 25 40 C25 38 27 37 28.5 38 C29.5 38.5 31 39.5 32 40.5 C33 39.5 34.5 38.5 35.5 38 C37 37 39 38 39 40 C39 43 32 48 32 48Z" fill="url(#letter-grad)" opacity="0.8" />
    <!-- Sparkle -->
    <circle cx="48" cy="10" r="2" fill="#F9A8D4" opacity="0.6" />
    <circle cx="52" cy="16" r="1.2" fill="#FBCFE8" opacity="0.4" />
  </svg>
</template>
