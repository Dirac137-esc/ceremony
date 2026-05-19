<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Raleway:wght@300;400;500;600;700;800&subset=cyrillic,cyrillic-ext&display=swap' }
  ],
  htmlAttrs: {
    lang: 'mn'
  }
})

const title = 'Гэгээгийн Үсний Найр • Урилга'
const description = 'Шаравжамцийн Гэгээгийн үсний найрын баярын урилга. 2026.05.31 • Ботаник, 10-р хороо'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
