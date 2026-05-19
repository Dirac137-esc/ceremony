<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" class="ceremony-icon">
    <defs>
      <linearGradient id="bunny-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F9A8D4" />
        <stop offset="100%" stop-color="#EC4899" />
      </linearGradient>
    </defs>
    <!-- Left ear -->
    <ellipse cx="22" cy="14" rx="6" ry="14" stroke="url(#bunny-grad)" stroke-width="2.5" fill="none" />
    <ellipse cx="22" cy="14" rx="3" ry="9" fill="#FBCFE8" opacity="0.5" />
    <!-- Right ear -->
    <ellipse cx="42" cy="14" rx="6" ry="14" stroke="url(#bunny-grad)" stroke-width="2.5" fill="none" />
    <ellipse cx="42" cy="14" rx="3" ry="9" fill="#FBCFE8" opacity="0.5" />
    <!-- Head -->
    <circle cx="32" cy="38" r="18" stroke="url(#bunny-grad)" stroke-width="2.5" fill="none" />
    <!-- Eyes -->
    <circle cx="25" cy="35" r="2.5" fill="url(#bunny-grad)" />
    <circle cx="39" cy="35" r="2.5" fill="url(#bunny-grad)" />
    <circle cx="26" cy="34" r="1" fill="white" />
    <circle cx="40" cy="34" r="1" fill="white" />
    <!-- Nose -->
    <ellipse cx="32" cy="41" rx="2.5" ry="2" fill="url(#bunny-grad)" opacity="0.7" />
    <!-- Mouth -->
    <path d="M29 44 Q32 47 35 44" stroke="url(#bunny-grad)" stroke-width="1.5" fill="none" stroke-linecap="round" />
    <!-- Cheeks -->
    <circle cx="20" cy="40" r="3" fill="#FBCFE8" opacity="0.5" />
    <circle cx="44" cy="40" r="3" fill="#FBCFE8" opacity="0.5" />
  </svg>
</template>
