<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" class="ceremony-icon">
    <defs>
      <linearGradient id="cal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F472B6" />
        <stop offset="100%" stop-color="#DB2777" />
      </linearGradient>
    </defs>
    <rect x="8" y="14" width="48" height="42" rx="6" stroke="url(#cal-grad)" stroke-width="2.5" fill="none" />
    <line x1="8" y1="26" x2="56" y2="26" stroke="url(#cal-grad)" stroke-width="2" />
    <line x1="20" y1="8" x2="20" y2="18" stroke="url(#cal-grad)" stroke-width="2.5" stroke-linecap="round" />
    <line x1="44" y1="8" x2="44" y2="18" stroke="url(#cal-grad)" stroke-width="2.5" stroke-linecap="round" />
    <!-- Heart in calendar -->
    <path d="M32 48 C32 48 22 40 22 35 C22 31.5 25 29 28 30.5 C30 31.5 31.5 33 32 34 C32.5 33 34 31.5 36 30.5 C39 29 42 31.5 42 35 C42 40 32 48 32 48Z" fill="url(#cal-grad)" opacity="0.85" />
  </svg>
</template>
