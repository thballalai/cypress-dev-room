<template>
  <div class="flex flex-col p-6 min-w-[320px] max-w-[520px] h-[400px]">
    <h2 class="text-xl font-bold mb-4 text-pink-300">Documentação</h2>
    <div class="flex gap-2 mb-4">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="currentTab = tab"
        :class="[
          'px-3 py-1 rounded-t font-semibold transition',
          currentTab === tab
            ? 'bg-pink-600 text-white'
            : 'bg-gray-800 text-pink-200 hover:bg-gray-700'
        ]"
      >
        {{ tab }}
      </button>
    </div>
    <div class="bg-gray-800 rounded-b p-4 flex-1 overflow-y-auto text-sm">
      <div v-if="currentTab === 'Introdução'">
        <p>
          Bem-vindo à documentação do <b>Dev Room</b>! Aqui você encontra informações sobre como utilizar cada funcionalidade do sistema para aumentar sua produtividade.
        </p>
        <ul class="list-disc ml-5 mt-2">
          <li>Abra ferramentas pelo dock na parte inferior da tela.</li>
          <li>Arraste e organize as janelas conforme sua preferência.</li>
          <li>Personalize o ambiente com temas e extensões.</li>
          <li>Gerencie tarefas, notas, timers e muito mais em um só lugar.</li>
        </ul>
      </div>
      <div v-else-if="currentTab === 'Janelas'">
        <ul class="list-disc ml-5">
          <li>
            <b>Timer:</b> Cronômetro simples para medir tempo de atividades. Permite iniciar, pausar e resetar.
          </li>
          <li>
            <b>To-Do List:</b> Lista de tarefas com salvamento automático no seu navegador. Marque tarefas como concluídas ou exclua-as.
          </li>
          <li>
            <b>Notas Rápidas:</b> Bloco para anotações rápidas, ideias ou lembretes.
          </li>
          <li>
            <b>Modo Foco:</b> Ambiente minimalista para concentração total.
          </li>
          <li>
            <b>Snippets de Código:</b> Salve e consulte trechos de código úteis.
          </li>
          <li>
            <b>Configurações:</b> Ajuste preferências do ambiente Dev Room.
          </li>
          <li>
            <b>Checklist de Deploy:</b> Lista de verificação para garantir um deploy seguro.
          </li>
          <li>
            <b>Extensões:</b> Adicione funcionalidades extras ao seu ambiente.
          </li>
          <li>
            <b>Pomodoro:</b> Técnica de produtividade baseada em ciclos de foco e pausa.
          </li>
          <li>
            <b>Busca:</b> Pesquise rapidamente entre suas notas, tarefas e códigos.
          </li>
          <li>
            <b>Temas:</b> Personalize as cores e o visual do Dev Room.
          </li>
          <li>
            <b>Player de Música:</b> Ouça músicas para relaxar ou focar durante o trabalho.
          </li>
        </ul>
      </div>
      <div v-else-if="currentTab === 'Sobre'">
        <p class="mb-2">
          <b>Dev Room</b> é um ambiente digital integrado para desenvolvedores, criado para centralizar ferramentas essenciais do dia a dia em um só lugar. O objetivo é proporcionar praticidade, organização e foco, reunindo recursos como listas de tarefas, notas rápidas, timer, pomodoro, snippets de código, personalização de temas e muito mais.
        </p>
        <p class="mb-2">
          O projeto foi desenvolvido utilizando <b>Vue.js</b> e <b>Tailwind CSS</b>, priorizando responsividade, usabilidade e uma experiência moderna.
        </p>
        <hr class="my-2 border-pink-400/30">
        <p>
          <b>Sobre o autor:</b><br>
          Meu nome é Lucas, sou desenvolvedor apaixonado por criar soluções que facilitam a vida de outros devs. Gosto de experimentar novas tecnologias, compartilhar conhecimento e construir ambientes produtivos e agradáveis para todos.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tabs = ['Introdução', 'Janelas', 'Sobre']
const currentTab = ref('Introdução')
</script>