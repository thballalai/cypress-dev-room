<script setup>
import Timer from './components/Timer.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import TodoList from './components/TodoList.vue'
import Docs from './components/Docs.vue'
import QuickNotes from './components/QuickNotes.vue'
import CodeSnippets from './components/CodeSnippets.vue'
import DeployChecklist from './components/DeployChecklist.vue'
import Pomodoro from './components/Pomodoro.vue'
import Search from './components/Search.vue'
import Themes from './components/Themes.vue'
import Window from './components/Window.vue'
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const NOME_KEY = 'dev-room-nome'
const THEME_KEY = 'dev-room-theme'
const nome = ref('')

// Função para alterar o nome via prompt
function getUserInfo() {
  const novoNome = prompt('Digite seu nome:', nome.value)
  if (novoNome !== null && novoNome.trim() !== '') {
    nome.value = novoNome.trim()
    localStorage.setItem(NOME_KEY, nome.value)
  }
}

// Controle de tema
const currentTheme = ref('theme-default')
function applyTheme(theme) {
  currentTheme.value = theme
  document.documentElement.className = theme
  localStorage.setItem(THEME_KEY, theme)
}

onMounted(() => {
  // Nome
  const salvo = localStorage.getItem(NOME_KEY)
  if (salvo && salvo.trim() !== '') {
    nome.value = salvo
  } else {
    getUserInfo()
  }
  // Tema
  const savedTheme = localStorage.getItem(THEME_KEY)
  if (savedTheme) {
    applyTheme(savedTheme)
  } else {
    applyTheme('theme-default')
  }
  intervalId = setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})

// Relógio com data e hora atual
const now = ref(new Date())
let intervalId = null

// Função para formatar data
function formatDate(date) {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

// Função para formatar hora
function formatTime(date) {
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

const windowComponents = {
  Timer,
  MusicPlayer,
  TodoList,
  Docs,
  QuickNotes,
  CodeSnippets,
  DeployChecklist,
  Pomodoro,
  Search,
  Themes,
}

let zIndexCounter = 10
const openWindows = reactive([])

function openWindow(type) {
  const titleMap = {
    Timer: 'Timer',
    MusicPlayer: 'Player de Música',
    TodoList: 'To-Do List',
    Docs: 'Documentação',
    QuickNotes: 'Notas Rápidas',
    CodeSnippets: 'Snippets de Código',
    DeployChecklist: 'Checklist de Deploy',
    Pomodoro: 'Pomodoro',
    Search: 'Busca',
    Themes: 'Temas'
  }
  // Tamanhos padrão por tipo de janela (ajuste conforme desejar)
  const defaultSizes = {
    Timer: { width: 320, height: 260 },
    MusicPlayer: { width: 340, height: 520 },
    TodoList: { width: 340, height: 540 },
    Docs: { width: 480, height: 500 },
    QuickNotes: { width: 620, height: 600 },
    CodeSnippets: { width: 600, height: 680 },
    DeployChecklist: { width: 340, height: 520 },
    Pomodoro: { width: 400, height: 420 },
    Search: { width: 640, height: 120 },
    Themes: { width: 340, height: 560 }
  }
  const { width, height } = defaultSizes[type] || { width: 340, height: 220 }
  openWindows.push({
    id: Date.now() + Math.random(),
    type,
    x: 120 + openWindows.length * 30,
    y: 120 + openWindows.length * 30,
    zIndex: ++zIndexCounter,
    title: titleMap[type],
    width,
    height
  })
}

function closeWindow(id) {
  const idx = openWindows.findIndex(w => w.id === id)
  if (idx !== -1) openWindows.splice(idx, 1)
}

function updateWindowPosition(id, pos) {
  const win = openWindows.find(w => w.id === id)
  if (win) {
    win.x = pos.x
    win.y = pos.y
  }
}

function updateWindowSize(id, size) {
  const win = openWindows.find(w => w.id === id)
  if (win) {
    win.width = size.width
    win.height = size.height
  }
}

function bringToFront(id) {
  zIndexCounter++
  const win = openWindows.find(w => w.id === id)
  if (win) win.zIndex = zIndexCounter
}
</script>

<template>
  <div class="h-screen text-gray-100 relative overflow-hidden" :style="{ background: 'var(--bg-main)', color: 'var(--text-main)' }">
    <div id="statusBar" class="bg-gray-800 text-blue-200 p-4 flex flex-row justify-between items-center shadow" :style="{ background: 'var(--bg-panel)' }">
      <div>
        <font-awesome-icon icon="fa-solid fa-user" class="text-blue-300 hover:text-blue-500 cursor-pointer"
          @click="getUserInfo" />
      </div>
      <div>
        <h1>Olá, dev <span class="text-blue-400 font-semibold">{{ nome }}!</span></h1>
      </div>
      <div class="flex flex-row gap-4 items-center">
        <h1 class="flex flex-row items-center gap-2">
          {{ formatTime(now) }}
          <font-awesome-icon icon="fa-solid fa-clock" class="text-blue-300" />
        </h1>
      </div>
    </div>

    <div id="roomContent" class="relative w-full h-[calc(100vh-200px)]">
      <template v-for="win in openWindows" :key="win.id">
        <Window
          :title="win.title"
          :x="win.x"
          :y="win.y"
          :zIndex="win.zIndex"
          :width="win.width"
          :height="win.height"
          @close="closeWindow(win.id)"
          @update:position="pos => updateWindowPosition(win.id, pos)"
          @update:size="size => updateWindowSize(win.id, size)"
          @bringToFront="bringToFront(win.id)"
        >
          <!-- Passa a função de troca de tema para o componente Themes -->
          <component
            :is="win.type === 'Themes' ? Themes : windowComponents[win.type]"
            v-bind="win.type === 'Themes' ? { setTheme: applyTheme, currentTheme } : {}"
          />
        </Window>
      </template>
    </div>

    <div
      id="dock"
      class="p-4 flex flex-wrap justify-center items-center rounded-xl shadow-2xl fixed left-1/2 -translate-x-1/2 bottom-6 w-[90vw] max-w-6xl border"
      :style="{
        background: 'var(--bg-panel)',
        color: 'var(--text-main)',
        borderColor: 'var(--accent)'
      }"
    >
      <div class="flex flex-wrap gap-3 justify-center items-center w-full max-w-6xl">
        <div class="flex flex-col items-center group cursor-pointer w-16" @click="openWindow('Timer')">
          <font-awesome-icon icon="fa-solid fa-stopwatch" class="text-blue-400 text-2xl hover:text-blue-200" />
        </div>
        <div class="flex flex-col items-center group cursor-pointer w-16" @click="openWindow('MusicPlayer')">
          <font-awesome-icon icon="fa-solid fa-music" class="text-green-400 text-2xl hover:text-green-200" />
        </div>
        <div class="flex flex-col items-center group cursor-pointer w-16" @click="openWindow('TodoList')">
          <font-awesome-icon icon="fa-solid fa-list-check" class="text-yellow-400 text-2xl hover:text-yellow-200" />
        </div>
        <div class="flex flex-col items-center group cursor-pointer w-16" @click="openWindow('Docs')">
          <font-awesome-icon icon="fa-solid fa-book" class="text-pink-400 text-2xl hover:text-pink-200" />
        </div>
        <div class="flex flex-col items-center group cursor-pointer w-16" @click="openWindow('QuickNotes')">
          <font-awesome-icon icon="fa-solid fa-sticky-note" class="text-orange-400 text-2xl hover:text-orange-200" />
        </div>
        <div class="flex flex-col items-center group cursor-pointer w-16" @click="openWindow('CodeSnippets')">
          <font-awesome-icon icon="fa-solid fa-code" class="text-blue-400 text-2xl hover:text-blue-200" />
        </div>
        <div class="flex flex-col items-center group cursor-pointer w-16" @click="openWindow('DeployChecklist')">
          <font-awesome-icon icon="fa-solid fa-rocket" class="text-green-400 text-2xl hover:text-green-200" />
        </div>
        <div class="flex flex-col items-center group cursor-pointer w-16" @click="openWindow('Pomodoro')">
          <font-awesome-icon icon="fa-solid fa-clock" class="text-red-400 text-2xl hover:text-red-200" />
        </div>
        <div class="flex flex-col items-center group cursor-pointer w-16" @click="openWindow('Search')">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" class="text-blue-400 text-2xl hover:text-blue-200" />
        </div>
        <div class="flex flex-col items-center group cursor-pointer w-16" @click="openWindow('Themes')">
          <font-awesome-icon icon="fa-solid fa-palette" class="text-blue-400 text-2xl hover:text-blue-200" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#roomContent {
  padding-bottom: 120px;
  /* espaço para o dock */
}
</style>
