<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none" class="ceremony-icon">
    <defs>
      <linearGradient id="clock-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F472B6" />
        <stop offset="100%" stop-color="#DB2777" />
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="26" stroke="url(#clock-grad)" stroke-width="2.5" fill="none" />
    <circle cx="32" cy="32" r="22" stroke="#FBCFE8" stroke-width="1" fill="none" opacity="0.4" />
    <!-- Hour hand -->
    <line x1="32" y1="32" x2="32" y2="18" stroke="url(#clock-grad)" stroke-width="2.5" stroke-linecap="round" />
    <!-- Minute hand -->
    <line x1="32" y1="32" x2="44" y2="32" stroke="url(#clock-grad)" stroke-width="2" stroke-linecap="round" />
    <!-- Center dot -->
    <circle cx="32" cy="32" r="2.5" fill="url(#clock-grad)" />
    <!-- Hour markers -->
    <circle cx="32" cy="10" r="1.5" fill="#F9A8D4" />
    <circle cx="54" cy="32" r="1.5" fill="#F9A8D4" />
    <circle cx="32" cy="54" r="1.5" fill="#F9A8D4" />
    <circle cx="10" cy="32" r="1.5" fill="#F9A8D4" />
  </svg>
</template>
