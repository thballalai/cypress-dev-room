<template>
  <div class="flex flex-col h-full w-full p-4">
    <form @submit.prevent="searchGoogle" class="flex gap-2 mb-3">
      <input
        v-model="query"
        type="text"
        placeholder="Pesquisar no Google..."
        class="flex-1 px-3 py-2 rounded bg-gray-800 text-gray-100 border border-gray-700 focus:outline-none"
      />
      <button
        type="submit"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
      >
        Buscar
      </button>
    </form>
    
  </div>
</template>

<script setup>
import { ref } from 'vue'

const query = ref('')
const iframeUrl = ref('')

function searchGoogle() {
  if (query.value.trim() !== '') {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query.value)}`, '_blank')
  }
}
</script>