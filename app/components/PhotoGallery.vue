<script setup lang="ts">
interface MediaItem {
  src: string
  type: 'image' | 'video'
}

const mediaItems: MediaItem[] = [
  { src: '/photos/IMG_E1637.JPG', type: 'image' },
  { src: '/photos/IMG_E1641.JPG', type: 'image' },
  { src: '/photos/067207d7-c731-4bb9-b9c5-79b9a6caa463.jpg', type: 'image' },
  { src: '/photos/d967ee9c-8b77-4013-affc-e919db2e6287.jpg', type: 'image' }
]

// Separate items for the carousel (all items as carousel entries)
const carouselItems = mediaItems
</script>

<template>
  <div>
    <UCarousel
      v-slot="{ item }"
      loop
      arrows
      dots
      :autoplay="{ delay: 4000 }"
      wheel-gestures
      :items="carouselItems"
      :prev="{ variant: 'solid', color: 'primary' }"
      :next="{ variant: 'solid', color: 'primary' }"
      :ui="{
        item: 'basis-full sm:basis-1/2 lg:basis-1/3 ps-4',
        container: 'ms-[-16px]',
        prev: 'sm:start-4',
        next: 'sm:end-4'
      }"
      class="w-full"
    >
      <div class="p-1">
        <!-- Image -->
        <div
          v-if="item.type === 'image'"
          class="relative overflow-hidden rounded-2xl gallery-card group cursor-pointer"
        >
          <img
            :src="item.src"
            :alt="'Гэгээгийн зураг'"
            class="w-full h-72 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          >
          <div class="absolute inset-0 bg-linear-to-t from-pink-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <!-- Video -->
        <div
          v-else
          class="relative overflow-hidden rounded-2xl gallery-card group"
        >
          <video
            :src="item.src"
            class="w-full h-72 sm:h-80 object-cover"
            autoplay
            loop
            muted
            preload="metadata"
            playsinline
          >
            Таны хөтөч видео тоглуулахыг дэмждэггүй.
          </video>
          <!-- Video badge -->
          <div class="absolute top-3 right-3 bg-pink-500/80 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm font-semibold pointer-events-none">
            🎬 Видео
          </div>
        </div>
      </div>
    </UCarousel>
  </div>
</template>

<style scoped>
.gallery-card {
  border: 2px solid rgba(244, 114, 182, 0.12);
  box-shadow: 0 8px 24px rgba(219, 112, 147, 0.08);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.gallery-card:hover {
  border-color: rgba(244, 114, 182, 0.25);
  box-shadow: 0 16px 40px rgba(219, 112, 147, 0.15);
}
</style>
