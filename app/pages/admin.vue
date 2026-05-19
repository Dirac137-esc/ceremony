<script setup lang="ts">
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

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleString('mn-MN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  fetchAll()
})
</script>

<template>
  <div class="min-h-screen py-10 px-4">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-10">
        <h1 class="text-3xl font-bold text-pink-800 mb-2" style="font-family: 'Cormorant Garamond', serif;">
          🐰 Админ Хэсэг
        </h1>
        <p class="text-pink-400">
          Гэгээгийн Үсний Найр • Зочдын удирдлага
        </p>
        <NuxtLink to="/" class="inline-block mt-3 text-pink-500 hover:text-pink-700 text-sm underline">
          ← Урилга руу буцах
        </NuxtLink>
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
      <div class="flex justify-center gap-3 mb-8">
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
    </div>
  </div>
</template>
