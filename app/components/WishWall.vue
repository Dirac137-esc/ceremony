<script setup lang="ts">
const toast = useToast()

interface Wish {
  id: number
  name: string
  message: string
  created_at: string
}

const wishes = ref<Wish[]>([])
const newWish = reactive({ name: '', message: '' })
const isSubmitting = ref(false)
const isLoading = ref(true)

async function fetchWishes() {
  try {
    const data = await $fetch<Wish[]>('/api/wishes')
    wishes.value = data
  }
  catch (error) {
    console.error('Failed to fetch wishes:', error)
  }
  finally {
    isLoading.value = false
  }
}

async function submitWish() {
  if (!newWish.name.trim() || !newWish.message.trim()) {
    toast.add({ title: 'Нэр болон мессежээ оруулна уу', color: 'error' })
    return
  }

  isSubmitting.value = true

  try {
    await $fetch('/api/wishes', {
      method: 'POST',
      body: { ...newWish }
    })

    toast.add({ title: '💕 Ерөөл амжилттай нэмэгдлээ!', color: 'success' })
    newWish.name = ''
    newWish.message = ''
    await fetchWishes()
  }
  catch (error) {
    toast.add({ title: 'Алдаа гарлаа', color: 'error' })
  }
  finally {
    isSubmitting.value = false
  }
}

function formatDate(dateStr: string): string {
  // SQLite CURRENT_TIMESTAMP is UTC but lacks 'Z' — append it so JS interprets correctly
  const utcStr = dateStr.endsWith('Z') ? dateStr : dateStr.replace(' ', 'T') + 'Z'
  const date = new Date(utcStr)
  return date.toLocaleDateString('mn-MN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  fetchWishes()
})
</script>

<template>
  <div>
    <!-- Wish Form -->
    <div class="glass-card-strong rounded-2xl p-6 mb-10 max-w-lg mx-auto">
      <h3 class="text-lg font-bold text-pink-700 mb-4 text-center" style="font-family: 'Cormorant Garamond', serif;">
        ✍️ Ерөөлөө бичих
      </h3>
      <form class="space-y-4" @submit.prevent="submitWish">
        <input
          v-model="newWish.name"
          type="text"
          placeholder="Таны нэр"
          class="ceremony-input w-full"
          required
        >
        <textarea
          v-model="newWish.message"
          rows="3"
          placeholder="Гэгээд хандсан ерөөлийн үгээ бичнэ үү..."
          class="ceremony-input w-full resize-none"
          required
        />
        <UButton
          type="submit"
          :loading="isSubmitting"
          block
          size="lg"
          class="!rounded-xl"
        >
          💌 Ерөөл илгээх
        </UButton>
      </form>
    </div>

    <!-- Wishes Grid -->
    <div v-if="isLoading" class="text-center py-8">
      <div class="text-4xl animate-bounce-soft">
        🐰
      </div>
      <p class="text-pink-400 mt-2">
        Ерөөлүүд ачааллаж байна...
      </p>
    </div>

    <div v-else-if="wishes.length === 0" class="text-center py-8">
      <div class="text-4xl mb-3">
        💭
      </div>
      <p class="text-pink-400">
        Одоогоор ерөөл байхгүй байна. Анхны ерөөлөө бичнэ үү!
      </p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div
        v-for="(wish, index) in wishes"
        :key="wish.id"
        class="wish-card animate-fade-in-up"
        :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <p class="text-pink-800 mb-3 pl-6 leading-relaxed text-sm">
          {{ wish.message }}
        </p>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-sm">
              🐰
            </span>
            <span class="font-semibold text-pink-700 text-sm">{{ wish.name }}</span>
          </div>
          <span class="text-xs text-pink-300">{{ formatDate(wish.created_at) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
