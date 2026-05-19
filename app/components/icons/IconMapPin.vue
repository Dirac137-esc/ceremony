<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" class="ceremony-icon">
    <defs>
      <linearGradient id="pin-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#EC4899" />
        <stop offset="100%" stop-color="#BE185D" />
      </linearGradient>
    </defs>
    <!-- Pin body -->
    <path d="M32 58 C32 58 12 36 12 24 C12 13 21 4 32 4 C43 4 52 13 52 24 C52 36 32 58 32 58Z" stroke="url(#pin-grad)" stroke-width="2.5" fill="none" />
    <!-- Inner circle -->
    <circle cx="32" cy="24" r="10" stroke="url(#pin-grad)" stroke-width="2" fill="none" />
    <!-- Heart in center -->
    <path d="M32 30 C32 30 26 26 26 23.5 C26 21.5 28 20 29.5 21 C30.5 21.5 31.5 22.5 32 23 C32.5 22.5 33.5 21.5 34.5 21 C36 20 38 21.5 38 23.5 C38 26 32 30 32 30Z" fill="url(#pin-grad)" opacity="0.8" />
    <!-- Shadow dot -->
    <ellipse cx="32" cy="60" rx="8" ry="2" fill="#F9A8D4" opacity="0.3" />
  </svg>
</template>
