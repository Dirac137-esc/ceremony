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

// Only image items for modal navigation
const imageItems = computed(() => carouselItems.value.filter(i => i.type === 'image'))

// Modal state
const modalOpen = ref(false)
const modalIndex = ref(0)

const modalSrc = computed(() => imageItems.value[modalIndex.value]?.src || '')

const openModal = (src: string) => {
  const idx = imageItems.value.findIndex(i => i.src === src)
  modalIndex.value = idx >= 0 ? idx : 0
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
}

const prevPhoto = () => {
  if (imageItems.value.length <= 1) return
  modalIndex.value = (modalIndex.value - 1 + imageItems.value.length) % imageItems.value.length
}

const nextPhoto = () => {
  if (imageItems.value.length <= 1) return
  modalIndex.value = (modalIndex.value + 1) % imageItems.value.length
}

// Keyboard navigation
if (import.meta.client) {
  onMounted(() => {
    document.addEventListener('keydown', (e) => {
      if (!modalOpen.value) return
      if (e.key === 'Escape') closeModal()
      if (e.key === 'ArrowLeft') prevPhoto()
      if (e.key === 'ArrowRight') nextPhoto()
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
          <!-- Prev Arrow -->
          <button
            v-if="imageItems.length > 1"
            class="modal-arrow modal-arrow-left"
            @click="prevPhoto"
          >
            ‹
          </button>

          <div class="modal-content">
            <button class="modal-close" @click="closeModal">
              ✕
            </button>
            <img
              :src="modalSrc"
              alt="Зураг"
              class="modal-img"
            >
            <!-- Counter -->
            <div class="modal-counter">
              {{ modalIndex + 1 }} / {{ imageItems.length }}
            </div>
          </div>

          <!-- Next Arrow -->
          <button
            v-if="imageItems.length > 1"
            class="modal-arrow modal-arrow-right"
            @click="nextPhoto"
          >
            ›
          </button>
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
  background: rgba(0, 0, 0, 0.88);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-content {
  position: relative;
  max-width: 85vw;
  max-height: 90vh;
}

.modal-img {
  max-width: 85vw;
  max-height: 82vh;
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

/* ── Arrows ── */
.modal-arrow {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: white;
  font-size: 2rem;
  font-weight: 300;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  z-index: 10000;
  line-height: 1;
  padding-bottom: 3px;
}

.modal-arrow:hover {
  background: rgba(255, 255, 255, 0.22);
  transform: translateY(-50%) scale(1.1);
}

.modal-arrow:active {
  transform: translateY(-50%) scale(0.95);
}

.modal-arrow-left {
  left: 16px;
}

.modal-arrow-right {
  right: 16px;
}

/* ── Counter ── */
.modal-counter {
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
  margin-top: 12px;
  font-weight: 500;
  letter-spacing: 0.05em;
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

/* ── Mobile ── */
@media (max-width: 640px) {
  .modal-arrow {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
  }

  .modal-arrow-left {
    left: 8px;
  }

  .modal-arrow-right {
    right: 8px;
  }

  .modal-content {
    max-width: 92vw;
  }

  .modal-img {
    max-width: 92vw;
  }
}
</style>
