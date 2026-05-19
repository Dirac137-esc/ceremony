<script setup lang="ts">
const props = defineProps<{
  targetDate: string
}>()

const timeLeft = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 })
const isExpired = ref(false)

function updateCountdown() {
  const now = new Date().getTime()
  const target = new Date(props.targetDate).getTime()
  const diff = target - now

  if (diff <= 0) {
    isExpired.value = true
    return
  }

  timeLeft.value = {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000)
  }
}

let interval: ReturnType<typeof setInterval>

onMounted(() => {
  updateCountdown()
  interval = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})

function padNumber(num: number): string {
  return num.toString().padStart(2, '0')
}
</script>

<template>
  <div v-if="!isExpired" class="flex items-center justify-center gap-2 sm:gap-4">
    <div class="countdown-box animate-pulse-glow">
      <div class="countdown-number">
        {{ padNumber(timeLeft.days) }}
      </div>
      <div class="countdown-label">
        Өдөр
      </div>
    </div>
    <span class="countdown-colon">:</span>
    <div class="countdown-box animate-pulse-glow">
      <div class="countdown-number">
        {{ padNumber(timeLeft.hours) }}
      </div>
      <div class="countdown-label">
        Цаг
      </div>
    </div>
    <span class="countdown-colon">:</span>
    <div class="countdown-box animate-pulse-glow">
      <div class="countdown-number">
        {{ padNumber(timeLeft.minutes) }}
      </div>
      <div class="countdown-label">
        Минут
      </div>
    </div>
    <span class="countdown-colon">:</span>
    <div class="countdown-box animate-pulse-glow">
      <div class="countdown-number">
        {{ padNumber(timeLeft.seconds) }}
      </div>
      <div class="countdown-label">
        Секунд
      </div>
    </div>
  </div>
  <div v-else class="text-center">
    <p class="text-2xl font-bold text-pink-600">
      🎉 Баяр болж байна! 🎉
    </p>
  </div>
</template>

<style scoped>
.countdown-colon {
  font-size: 1.25rem;
  color: #fda4b5;
  font-weight: 300;
  animation: bounceSoft 2s ease-in-out infinite;
}

@media (min-width: 640px) {
  .countdown-colon {
    font-size: 1.5rem;
  }
}

@keyframes bounceSoft {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
</style>
