<script setup lang="ts">
definePageMeta({
  layout: false
})

// ── PIN Authentication ──
const PIN = '7321'
const authenticated = ref(false)
const enteredPin = ref('')
const pinError = ref(false)
const pinShake = ref(false)

const dialPad = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['', '0', '⌫']
]

const pressDigit = (digit: string) => {
  if (digit === '⌫') {
    enteredPin.value = enteredPin.value.slice(0, -1)
    pinError.value = false
    return
  }
  if (digit === '' || enteredPin.value.length >= 4) return

  enteredPin.value += digit
  pinError.value = false

  // Auto-submit when 4 digits entered
  if (enteredPin.value.length === 4) {
    setTimeout(() => {
      if (enteredPin.value === PIN) {
        authenticated.value = true
      }
      else {
        pinError.value = true
        pinShake.value = true
        setTimeout(() => {
          pinShake.value = false
          enteredPin.value = ''
        }, 600)
      }
    }, 200)
  }
}

// ── Original Admin Data ──
interface Rsvp {
  id: number
  name: string
  phone: string
  guests: number
  status: string
  message: string
  created_at: string
}

interface Wish {
  id: number
  name: string
  message: string
  created_at: string
}

interface Stats {
  totalRsvps: number
  confirmed: number
  declined: number
  totalGuests: number
  totalWishes: number
}

const stats = ref<Stats>({ totalRsvps: 0, confirmed: 0, declined: 0, totalGuests: 0, totalWishes: 0 })
const rsvps = ref<Rsvp[]>([])
const wishes = ref<Wish[]>([])
const isLoading = ref(true)
const activeTab = ref('rsvps')

// ── Photo Upload ──
const uploading = ref(false)
const uploadMessage = ref('')
const uploadType = ref<'success' | 'error' | ''>('')
const fileInput = ref<HTMLInputElement | null>(null)
const photos = ref<any[]>([])
const loadingPhotos = ref(true)

async function fetchAll() {
  isLoading.value = true
  try {
    const [statsData, rsvpData, wishData] = await Promise.all([
      $fetch<Stats>('/api/stats'),
      $fetch<Rsvp[]>('/api/rsvp'),
      $fetch<Wish[]>('/api/wishes')
    ])
    stats.value = statsData
    rsvps.value = rsvpData
    wishes.value = wishData
  }
  catch (error) {
    console.error('Failed to fetch data:', error)
  }
  finally {
    isLoading.value = false
  }
}

const fetchPhotos = async () => {
  loadingPhotos.value = true
  try {
    const data = await $fetch<any[]>('/api/photos')
    photos.value = data || []
  }
  catch {
    photos.value = []
  }
  finally {
    loadingPhotos.value = false
  }
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleString('mn-MN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const triggerUpload = () => {
  fileInput.value?.click()
}

const handleFileSelect = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const files = input.files
  if (!files || files.length === 0) return

  uploading.value = true
  uploadMessage.value = ''
  uploadType.value = ''

  try {
    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i])
    }

    const result = await $fetch<any>('/api/photos', {
      method: 'POST',
      body: formData
    })

    uploadMessage.value = `✅ ${result.uploaded} зураг амжилттай байршууллаа!`
    uploadType.value = 'success'
    await fetchPhotos()
  }
  catch (error: any) {
    uploadMessage.value = '❌ Байршуулахад алдаа гарлаа'
    uploadType.value = 'error'
  }
  finally {
    uploading.value = false
    if (input) input.value = ''
    setTimeout(() => {
      uploadMessage.value = ''
      uploadType.value = ''
    }, 4000)
  }
}

const deletingKey = ref('')

const deletePhoto = async (key: string) => {
  if (!confirm('Энэ зургийг устгах уу?')) return

  deletingKey.value = key
  try {
    await $fetch('/api/photos', {
      method: 'DELETE',
      body: { key }
    })
    photos.value = photos.value.filter(p => p.key !== key)
  }
  catch (error) {
    console.error('Delete failed:', error)
  }
  finally {
    deletingKey.value = ''
  }
}

// On auth success, load all data
watch(authenticated, (val) => {
  if (val) {
    fetchAll()
    fetchPhotos()
  }
})
</script>

<template>
  <div class="admin-page">
    <!-- PIN SCREEN -->
    <div v-if="!authenticated" class="pin-screen">
      <div class="pin-card">
        <div class="pin-icon">🐰</div>
        <h1 class="pin-title">Админ</h1>
        <p class="pin-subtitle">Нэвтрэх код оруулна уу</p>

        <!-- PIN dots -->
        <div class="pin-dots" :class="{ shake: pinShake }">
          <div
            v-for="i in 4"
            :key="i"
            class="pin-dot"
            :class="{
              filled: enteredPin.length >= i,
              error: pinError
            }"
          />
        </div>

        <p v-if="pinError" class="pin-error-text">
          Буруу код байна
        </p>

        <!-- Dial pad -->
        <div class="dial-pad">
          <div v-for="(row, ri) in dialPad" :key="ri" class="dial-row">
            <button
              v-for="(digit, di) in row"
              :key="di"
              class="dial-btn"
              :class="{
                'dial-btn-empty': digit === '',
                'dial-btn-delete': digit === '⌫'
              }"
              :disabled="digit === ''"
              @click="pressDigit(digit)"
            >
              <span class="dial-digit">{{ digit }}</span>
              <span v-if="digit >= '2' && digit <= '9'" class="dial-letters">
                {{ ['', '', 'ABC', 'DEF', 'GHI', 'JKL', 'MNO', 'PQRS', 'TUV', 'WXYZ'][Number(digit)] }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ADMIN DASHBOARD (original pink theme restored) -->
    <div v-else class="min-h-screen py-10 px-4">
      <div class="max-w-5xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-10">
          <h1 class="text-3xl font-bold text-pink-800 mb-2" style="font-family: 'Cormorant Garamond', serif;">
            🐰 Админ Хэсэг
          </h1>
          <p class="text-pink-400">
            Гэгээгийн Үсний Найр • Зочдын удирдлага
          </p>
          <div class="flex items-center justify-center gap-4 mt-3">
            <NuxtLink to="/" class="text-pink-500 hover:text-pink-700 text-sm underline">
              ← Урилга руу буцах
            </NuxtLink>
            <button class="text-red-400 hover:text-red-600 text-sm underline" @click="authenticated = false; enteredPin = ''">
              Гарах
            </button>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-10">
          <div class="glass-card-strong rounded-2xl p-5 text-center">
            <p class="text-3xl font-bold text-pink-600" style="font-family: 'Cormorant Garamond', serif;">
              {{ stats.totalRsvps }}
            </p>
            <p class="text-xs text-pink-400 mt-1 font-semibold uppercase tracking-wider">
              Нийт бүртгэл
            </p>
          </div>
          <div class="glass-card-strong rounded-2xl p-5 text-center">
            <p class="text-3xl font-bold text-green-600" style="font-family: 'Cormorant Garamond', serif;">
              {{ stats.confirmed }}
            </p>
            <p class="text-xs text-pink-400 mt-1 font-semibold uppercase tracking-wider">
              Ирнэ
            </p>
          </div>
          <div class="glass-card-strong rounded-2xl p-5 text-center">
            <p class="text-3xl font-bold text-red-400" style="font-family: 'Cormorant Garamond', serif;">
              {{ stats.declined }}
            </p>
            <p class="text-xs text-pink-400 mt-1 font-semibold uppercase tracking-wider">
              Ирэхгүй
            </p>
          </div>
          <div class="glass-card-strong rounded-2xl p-5 text-center">
            <p class="text-3xl font-bold text-pink-700" style="font-family: 'Cormorant Garamond', serif;">
              {{ stats.totalGuests }}
            </p>
            <p class="text-xs text-pink-400 mt-1 font-semibold uppercase tracking-wider">
              Нийт зочин
            </p>
          </div>
          <div class="glass-card-strong rounded-2xl p-5 text-center">
            <p class="text-3xl font-bold text-purple-500" style="font-family: 'Cormorant Garamond', serif;">
              {{ stats.totalWishes }}
            </p>
            <p class="text-xs text-pink-400 mt-1 font-semibold uppercase tracking-wider">
              Ерөөл
            </p>
          </div>
        </div>

        <!-- Refresh Button -->
        <div class="text-center mb-6">
          <UButton variant="outline" size="sm" :loading="isLoading" @click="fetchAll">
            🔄 Шинэчлэх
          </UButton>
        </div>

        <!-- Tabs -->
        <div class="flex justify-center gap-3 mb-8 flex-wrap">
          <button
            class="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
            :class="activeTab === 'rsvps'
              ? 'bg-pink-500 text-white shadow-lg shadow-pink-200'
              : 'bg-pink-50 text-pink-600 hover:bg-pink-100'"
            @click="activeTab = 'rsvps'"
          >
            ✉️ Бүртгэлийн жагсаалт ({{ rsvps.length }})
          </button>
          <button
            class="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
            :class="activeTab === 'wishes'
              ? 'bg-pink-500 text-white shadow-lg shadow-pink-200'
              : 'bg-pink-50 text-pink-600 hover:bg-pink-100'"
            @click="activeTab = 'wishes'"
          >
            💌 Ерөөлүүд ({{ wishes.length }})
          </button>
          <button
            class="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
            :class="activeTab === 'photos'
              ? 'bg-pink-500 text-white shadow-lg shadow-pink-200'
              : 'bg-pink-50 text-pink-600 hover:bg-pink-100'"
            @click="activeTab = 'photos'"
          >
            📷 Зураг ({{ photos.length }})
          </button>
        </div>

        <!-- RSVP Table -->
        <div v-if="activeTab === 'rsvps'" class="glass-card-strong rounded-2xl overflow-hidden">
          <div v-if="rsvps.length === 0" class="p-10 text-center text-pink-400">
            Одоогоор бүртгэл байхгүй байна
          </div>
          <div v-else class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="bg-pink-50 text-pink-700">
                  <th class="text-left p-4 font-semibold">
                    #
                  </th>
                  <th class="text-left p-4 font-semibold">
                    Нэр
                  </th>
                  <th class="text-left p-4 font-semibold">
                    Утас
                  </th>
                  <th class="text-center p-4 font-semibold">
                    Зочин
                  </th>
                  <th class="text-center p-4 font-semibold">
                    Статус
                  </th>
                  <th class="text-left p-4 font-semibold">
                    Мессеж
                  </th>
                  <th class="text-left p-4 font-semibold">
                    Огноо
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(rsvp, index) in rsvps"
                  :key="rsvp.id"
                  class="border-t border-pink-100 hover:bg-pink-50/50 transition-colors"
                >
                  <td class="p-4 text-pink-400">
                    {{ index + 1 }}
                  </td>
                  <td class="p-4 font-semibold text-pink-800">
                    {{ rsvp.name }}
                  </td>
                  <td class="p-4 text-pink-600">
                    {{ rsvp.phone || '—' }}
                  </td>
                  <td class="p-4 text-center font-bold text-pink-700">
                    {{ rsvp.guests }}
                  </td>
                  <td class="p-4 text-center">
                    <span
                      class="inline-flex px-3 py-1 rounded-full text-xs font-bold"
                      :class="rsvp.status === 'confirmed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-600'"
                    >
                      {{ rsvp.status === 'confirmed' ? '✅ Ирнэ' : '❌ Ирэхгүй' }}
                    </span>
                  </td>
                  <td class="p-4 text-pink-600 max-w-xs truncate">
                    {{ rsvp.message || '—' }}
                  </td>
                  <td class="p-4 text-pink-400 text-xs whitespace-nowrap">
                    {{ formatDate(rsvp.created_at) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Wishes List -->
        <div v-if="activeTab === 'wishes'" class="space-y-4">
          <div v-if="wishes.length === 0" class="text-center py-10 text-pink-400">
            Одоогоор ерөөл байхгүй байна
          </div>
          <div
            v-for="wish in wishes"
            :key="wish.id"
            class="glass-card-strong rounded-2xl p-6"
          >
            <p class="text-pink-800 mb-3 leading-relaxed">
              "{{ wish.message }}"
            </p>
            <div class="flex items-center justify-between">
              <span class="font-semibold text-pink-600">🐰 {{ wish.name }}</span>
              <span class="text-xs text-pink-300">{{ formatDate(wish.created_at) }}</span>
            </div>
          </div>
        </div>

        <!-- Photos Tab -->
        <div v-if="activeTab === 'photos'">
          <!-- Upload Section -->
          <div class="glass-card-strong rounded-2xl p-8 text-center mb-8">
            <h2 class="text-lg font-bold text-pink-800 mb-2" style="font-family: 'Cormorant Garamond', serif;">
              📷 Зураг байршуулах
            </h2>
            <p class="text-sm text-pink-400 mb-6">
              Энд байршуулсан зурагнууд үндсэн хуудсын галерейд харагдана
            </p>

            <input
              ref="fileInput"
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              multiple
              class="hidden"
              @change="handleFileSelect"
            >

            <button
              class="inline-flex items-center justify-center px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-sm font-bold transition-all duration-300 shadow-lg shadow-pink-200 disabled:opacity-60"
              :disabled="uploading"
              @click="triggerUpload"
            >
              <span v-if="uploading" class="flex items-center gap-2">
                <span class="upload-spinner" />
                Байршуулж байна...
              </span>
              <span v-else>
                📤 Зураг сонгох
              </span>
            </button>

            <div
              v-if="uploadMessage"
              class="mt-4 px-5 py-3 rounded-xl text-sm font-semibold"
              :class="uploadType === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-600 border border-red-200'"
            >
              {{ uploadMessage }}
            </div>
          </div>

          <!-- Photos Grid -->
          <div v-if="loadingPhotos" class="text-center py-10 text-pink-400">
            Ачааллаж байна...
          </div>
          <div v-else-if="photos.length === 0" class="text-center py-10 text-pink-400">
            Одоогоор зураг байршуулаагүй байна
          </div>
          <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <div
              v-for="photo in photos"
              :key="photo.key"
              class="relative glass-card-strong rounded-2xl overflow-hidden group"
            >
              <img
                :src="photo.src"
                :alt="photo.key"
                class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              >
              <!-- Delete button -->
              <button
                class="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500/80 hover:bg-red-600 text-white text-sm font-bold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm shadow-lg"
                :disabled="deletingKey === photo.key"
                @click="deletePhoto(photo.key)"
              >
                <span v-if="deletingKey === photo.key" class="upload-spinner" style="width:14px;height:14px;" />
                <span v-else>✕</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── PIN Screen (dark theme for security feel) ── */
.admin-page .pin-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(160deg, #1a0a1e 0%, #2d1535 50%, #1a0a1e 100%);
}

.pin-card {
  text-align: center;
  max-width: 340px;
  width: 100%;
}

.pin-icon {
  font-size: 3.5rem;
  margin-bottom: 12px;
  animation: bounce 2s ease-in-out infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.pin-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #f9a8d4;
  margin: 0 0 4px;
  font-family: 'Cormorant Garamond', serif;
}

.pin-subtitle {
  font-size: 0.9rem;
  color: #d4a0b9;
  margin: 0 0 32px;
}

.pin-dots {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 12px;
}

.pin-dots.shake {
  animation: shake 0.5s ease-in-out;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-12px); }
  40% { transform: translateX(12px); }
  60% { transform: translateX(-8px); }
  80% { transform: translateX(8px); }
}

.pin-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid #9b5e7a;
  background: transparent;
  transition: all 0.2s ease;
}

.pin-dot.filled {
  background: #f472b6;
  border-color: #f472b6;
  box-shadow: 0 0 12px rgba(244, 114, 182, 0.4);
}

.pin-dot.error {
  background: #ef4444;
  border-color: #ef4444;
  box-shadow: 0 0 12px rgba(239, 68, 68, 0.4);
}

.pin-error-text {
  color: #ef4444;
  font-size: 0.8rem;
  margin: 0 0 16px;
}

.dial-pad {
  margin-top: 24px;
}

.dial-row {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 16px;
}

.dial-btn {
  width: 76px;
  height: 76px;
  border-radius: 50%;
  border: 1.5px solid rgba(244, 114, 182, 0.2);
  background: rgba(244, 114, 182, 0.06);
  color: #fce7f3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
}

.dial-btn:active:not(:disabled) {
  transform: scale(0.92);
  background: rgba(244, 114, 182, 0.2);
  border-color: rgba(244, 114, 182, 0.5);
}

.dial-btn:hover:not(:disabled) {
  background: rgba(244, 114, 182, 0.12);
  border-color: rgba(244, 114, 182, 0.35);
}

.dial-btn-empty {
  opacity: 0;
  cursor: default;
}

.dial-btn-delete {
  border-color: rgba(239, 68, 68, 0.2);
  background: rgba(239, 68, 68, 0.06);
}

.dial-btn-delete:hover:not(:disabled) {
  background: rgba(239, 68, 68, 0.12);
  border-color: rgba(239, 68, 68, 0.35);
}

.dial-digit {
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1;
}

.dial-letters {
  font-size: 0.55rem;
  letter-spacing: 0.15em;
  color: #d4a0b9;
  margin-top: 2px;
}

/* ── Upload spinner ── */
.upload-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  display: inline-block;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.hidden {
  display: none;
}

/* ── Responsive dial ── */
@media (max-width: 480px) {
  .dial-btn {
    width: 68px;
    height: 68px;
  }

  .dial-digit {
    font-size: 1.4rem;
  }

  .dial-row {
    gap: 16px;
    margin-bottom: 12px;
  }
}
</style>
