<template>
  <div class="flex flex-col items-center justify-center p-6 min-w-[320px] max-w-[400px] h-[320px]">
    <h2 class="text-xl font-bold mb-4 text-red-400">Pomodoro</h2>
    <div class="mb-2 text-lg text-gray-300">
      {{ isBreak ? 'Pausa' : 'Foco' }}
    </div>
    <div class="text-5xl font-mono mb-4 text-red-300 select-none">
      {{ formattedTime }}
    </div>
    <div class="mb-4 text-sm text-gray-400 italic text-center">
      "{{ fraseMotivacional }}"
    </div>
    <div class="flex gap-2 mb-2">
      <button
        class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
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
      <button
        class="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded transition"
        @click="skip"
      >
        Pular
      </button>
    </div>
    <div class="mt-2 text-xs text-gray-400">
      Ciclo: {{ cycle }} / 4
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'

const FOCUS_TIME = 25 * 60 // 25 minutos
const BREAK_TIME = 5 * 60  // 5 minutos

const frases = [
  'Foque no agora!',
  'Você está mais perto do seu objetivo.',
  'Continue, a pausa está chegando!',
  'Cada ciclo é um passo a mais.',
  'Respire fundo e mantenha o ritmo.'
]
const fraseMotivacional = frases[Math.floor(Math.random() * frases.length)]

const elapsed = ref(0)
const running = ref(false)
const isBreak = ref(false)
const cycle = ref(1)
let intervalId = null

const formattedTime = computed(() => {
  const total = isBreak.value ? BREAK_TIME : FOCUS_TIME
  const remaining = total - elapsed.value
  const min = String(Math.floor(remaining / 60)).padStart(2, '0')
  const sec = String(remaining % 60).padStart(2, '0')
  return `${min}:${sec}`
})

function startTimer() {
  if (!running.value) {
    running.value = true
    intervalId = setInterval(() => {
      elapsed.value++
      const total = isBreak.value ? BREAK_TIME : FOCUS_TIME
      if (elapsed.value >= total) {
        nextStage()
      }
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

function nextStage() {
  pauseTimer()
  elapsed.value = 0
  if (!isBreak.value) {
    isBreak.value = true
  } else {
    isBreak.value = false
    cycle.value = cycle.value < 4 ? cycle.value + 1 : 1
  }
  startTimer()
}

function skip() {
  nextStage()
}

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>