<script setup lang="ts">
const toast = useToast()

const form = reactive({
  name: '',
  phone: '',
  guests: 1,
  status: 'confirmed',
  message: ''
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)

const statusOptions = [
  { label: '✅ Ирнэ', value: 'confirmed' },
  { label: '❌ Ирэх боломжгүй', value: 'declined' }
]

async function submitRsvp() {
  if (!form.name.trim()) {
    toast.add({ title: 'Нэрээ оруулна уу', color: 'error' })
    return
  }

  isSubmitting.value = true

  try {
    await $fetch('/api/rsvp', {
      method: 'POST',
      body: { ...form }
    })

    isSubmitted.value = true
    toast.add({
      title: form.status === 'confirmed' ? '🎉 Баярлалаа! Манай гэр бүл таныг хүлээн авахдаа баяртай байх болно!' : 'Мэдэгдэл хүлээн авлаа',
      color: 'success'
    })
  }
  catch (error) {
    toast.add({ title: 'Алдаа гарлаа. Дахин оролдоно уу.', color: 'error' })
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="max-w-lg mx-auto">
    <!-- Success State -->
    <div v-if="isSubmitted" class="text-center py-8 animate-fade-in-scale">
      <div class="text-6xl mb-4">
        🐰
      </div>
      <h3 class="text-2xl font-bold text-pink-700 mb-2" style="font-family: 'Cormorant Garamond', serif;">
        {{ form.status === 'confirmed' ? 'Баярлалаа!' : 'Мэдэгдэл хүлээн авлаа' }}
      </h3>
      <p class="text-pink-500">
        {{ form.status === 'confirmed' ? 'Манай гэр бүл таныг хүлээн авахдаа баяртай байх болно 💕' : 'Ирэх боломжгүй гэдгийг ойлгож байна 🙏' }}
      </p>
    </div>

    <!-- Form -->
    <form v-else class="space-y-5" @submit.prevent="submitRsvp">
      <!-- Name -->
      <div>
        <label class="block text-sm font-semibold text-pink-800 mb-1.5">
          Нэр <span class="text-pink-400">*</span>
        </label>
        <input
          v-model="form.name"
          type="text"
          placeholder="Таны нэрийг оруулна уу"
          class="ceremony-input w-full"
          required
        >
      </div>

      <!-- Phone -->
      <div>
        <label class="block text-sm font-semibold text-pink-800 mb-1.5">
          Утасны дугаар
        </label>
        <input
          v-model="form.phone"
          type="tel"
          placeholder="Утасны дугаар"
          class="ceremony-input w-full"
        >
      </div>

      <!-- Guest count -->
      <div>
        <label class="block text-sm font-semibold text-pink-800 mb-1.5">
          Хэдэн хүн ирэх вэ?
        </label>
        <div class="flex items-center gap-3">
          <button
            type="button"
            class="w-10 h-10 rounded-full bg-pink-100 text-pink-600 font-bold text-lg hover:bg-pink-200 transition-colors"
            @click="form.guests = Math.max(1, form.guests - 1)"
          >
            −
          </button>
          <span class="text-2xl font-bold text-pink-700 w-12 text-center" style="font-family: 'Cormorant Garamond', serif;">
            {{ form.guests }}
          </span>
          <button
            type="button"
            class="w-10 h-10 rounded-full bg-pink-100 text-pink-600 font-bold text-lg hover:bg-pink-200 transition-colors"
            @click="form.guests = Math.min(20, form.guests + 1)"
          >
            +
          </button>
          <span class="text-sm text-pink-400 ml-2">хүн</span>
        </div>
      </div>

      <!-- Status -->
      <div>
        <label class="block text-sm font-semibold text-pink-800 mb-1.5">
          Ирэх эсэх
        </label>
        <div class="flex gap-3">
          <button
            v-for="option in statusOptions"
            :key="option.value"
            type="button"
            class="flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-300"
            :class="form.status === option.value
              ? 'bg-pink-500 text-white shadow-lg shadow-pink-200'
              : 'bg-pink-50 text-pink-600 hover:bg-pink-100 border border-pink-200'"
            @click="form.status = option.value"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <!-- Message -->
      <div>
        <label class="block text-sm font-semibold text-pink-800 mb-1.5">
          Мессеж (заавал биш)
        </label>
        <textarea
          v-model="form.message"
          rows="3"
          placeholder="Ерөөлийн үг бичих..."
          class="ceremony-input w-full resize-none"
        />
      </div>

      <!-- Submit -->
      <UButton
        type="submit"
        :loading="isSubmitting"
        block
        size="xl"
        class="!rounded-xl !py-3.5 !text-base !font-bold"
      >
        🐰 Илгээх
      </UButton>
    </form>
  </div>
</template>
