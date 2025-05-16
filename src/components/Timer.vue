<template>
  <div class="flex flex-col items-center justify-center p-6 min-w-[260px]">
    <h2 class="text-xl font-bold mb-4 text-blue-300">Timer</h2>
    <div class="text-5xl font-mono mb-6 text-blue-200 select-none">
      {{ formattedTime }}
    </div>
    <div class="flex gap-4">
      <button
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        @click="toggleTimer"
      >
        {{ running ? 'Pausar' : (elapsed > 0 ? 'Continuar' : 'Iniciar') }}
      </button>
      <button
        class="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded transition"
        @click="resetTimer"
        :disabled="elapsed === 0"
      >
        Resetar
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

const elapsed = ref(0)
const running = ref(false)
let intervalId = null

const formattedTime = computed(() => {
  const min = String(Math.floor(elapsed.value / 60)).padStart(2, '0')
  const sec = String(elapsed.value % 60).padStart(2, '0')
  return `${min}:${sec}`
})

function startTimer() {
  if (!running.value) {
    running.value = true
    intervalId = setInterval(() => {
      elapsed.value++
    }, 1000)
  }
}

function pauseTimer() {
  running.value = false
  clearInterval(intervalId)
}

function resetTimer() {
  pauseTimer()
  elapsed.value = 0
}

function toggleTimer() {
  if (running.value) {
    pauseTimer()
  } else {
    startTimer()
  }
}

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>

</style>