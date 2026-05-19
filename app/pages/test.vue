<template>
  <div class="flex items-center gap-4">
    <div v-for="unit in units" :key="unit.label" class="flex flex-col items-center">
      <UCard :ui="{ body: 'p-4 sm:p-6' }">
        <span class="text-4xl font-bold tabular-nums text-primary">
          {{ String(unit.value).padStart(2, '0') }}
        </span>
      </UCard>
      <span class="mt-2 text-sm text-muted">{{ unit.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  target: Date | string
}>()

const targetDate = new Date('2026-07-31')

const timeLeft = ref(getTimeLeft())

function getTimeLeft() {
  const diff = Math.max(0, targetDate.getTime() - Date.now())
  return {
    days:    Math.floor(diff / 1000 / 60 / 60 / 24),
    hours:   Math.floor((diff / 1000 / 60 / 60) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

const units = computed(() => [
  { label: 'Days',    value: timeLeft.value.days },
  { label: 'Hours',   value: timeLeft.value.hours },
  { label: 'Minutes', value: timeLeft.value.minutes },
  { label: 'Seconds', value: timeLeft.value.seconds },
])

let timer: ReturnType<typeof setInterval>

onMounted(() => {
  timer = setInterval(() => {
    timeLeft.value = getTimeLeft()
  }, 1000)
})

onUnmounted(() => clearInterval(timer))
</script>
