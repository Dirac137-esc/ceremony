<script setup lang="ts">
interface MediaItem {
  src: string
  type: 'image' | 'video'
  key?: string
}

// Fetch S3 photos only
const { data: s3Photos } = await useFetch<MediaItem[]>('/api/photos', {
  default: () => []
})

const carouselItems = computed(() => s3Photos.value || [])

// Modal state
const modalOpen = ref(false)
const modalSrc = ref('')

const openModal = (src: string) => {
  modalSrc.value = src
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
  modalSrc.value = ''
}

// Close on Escape
if (import.meta.client) {
  onMounted(() => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal()
    })
  })
}
</script>

<template>
  <div>
    <!-- Empty state -->
    <div v-if="carouselItems.length === 0" class="text-center py-12 text-pink-300 opacity-60">
      <p class="text-4xl mb-3">📷</p>
      <p class="text-sm">Удахгүй зурагнууд нэмэгдэнэ...</p>
    </div>

    <!-- Carousel -->
    <UCarousel
      v-else
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
          @click="openModal(item.src)"
        >
          <img
            :src="item.src"
            :alt="'Гэгээгийн зураг'"
            class="w-full h-72 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          >
          <div class="absolute inset-0 bg-linear-to-t from-pink-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <!-- Zoom hint -->
          <div class="absolute bottom-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            🔍 Томруулах
          </div>
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
          <div class="absolute top-3 right-3 bg-pink-500/80 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm font-semibold pointer-events-none">
            🎬 Видео
          </div>
        </div>
      </div>
    </UCarousel>

    <!-- Fullscreen Modal -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div
          v-if="modalOpen"
          class="modal-overlay"
          @click.self="closeModal"
        >
          <div class="modal-content">
            <button class="modal-close" @click="closeModal">
              ✕
            </button>
            <img
              :src="modalSrc"
              alt="Зураг"
              class="modal-img"
            >
          </div>
        </div>
      </Transition>
    </Teleport>
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

/* ── Modal ── */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
}

.modal-img {
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
}

.modal-close {
  position: absolute;
  top: -16px;
  right: -16px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  z-index: 10;
}

.modal-close:hover {
  background: rgba(239, 68, 68, 0.6);
  transform: scale(1.1);
}

/* ── Transition ── */
.modal-fade-enter-active {
  transition: opacity 0.25s ease;
}
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
