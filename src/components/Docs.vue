<template>
  <div class="flex flex-col items-center justify-center mx-auto p-6 min-w-[320px] max-w-[400px] w-full sm:items-start sm:justify-start">
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
          <li>Abra ferramentas pelo dock na parte inferior da tela (desktop) ou pelo menu lateral (mobile).</li>
          <li>No desktop, arraste e organize as janelas conforme sua preferência. No mobile, navegue entre as ferramentas pelo menu.</li>
          <li>Personalize o ambiente com temas e extensões.</li>
          <li>Gerencie tarefas, notas, timers, pomodoro, snippets, checklist de deploy, lembretes de água, player de música, gerador de dados e muito mais em um só lugar.</li>
          <li>Seu progresso e configurações são salvos automaticamente no navegador.</li>
        </ul>
      </div>
      <div v-else-if="currentTab === 'Janelas'">
        <ul class="list-disc ml-5">
          <li>
            <b>Timer:</b> Cronômetro simples para medir tempo de atividades. Permite iniciar, pausar e resetar. O timer continua mesmo se a janela for fechada.
          </li>
          <li>
            <b>To-Do List:</b> Lista de tarefas com salvamento automático no seu navegador. Marque tarefas como concluídas ou exclua-as.
          </li>
          <li>
            <b>Notas Rápidas:</b> Bloco para anotações rápidas, ideias ou lembretes.
          </li>
          <li>
            <b>Snippets de Código:</b> Salve e consulte trechos de código úteis. Integração opcional com Gists do GitHub.
          </li>
          <li>
            <b>Checklist de Deploy:</b> Lista de verificação para garantir um deploy seguro. Personalize e salve seus próprios itens.
          </li>
          <li>
            <b>Pomodoro:</b> Técnica de produtividade baseada em ciclos de foco e pausa. O ciclo continua mesmo se a janela for fechada.
          </li>
          <li>
            <b>Lembrete de Água:</b> Defina intervalos para ser lembrado de beber água. O lembrete continua funcionando mesmo se a janela for fechada.
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
          <li>
            <b>Gerador de Dados:</b> Gere dados fake para testes de desenvolvimento.
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
        <div class="mt-4 flex flex-col gap-2 text-pink-300 text-sm">
          <a href="https://github.com/Lucas19Alves" target="_blank" class="hover:underline hover:text-pink-400">
            <font-awesome-icon icon="fa-brands fa-github" class="mr-1" />
            Meu GitHub
          </a>
          <a href="https://portifolio-2-0.vercel.app/" target="_blank" class="hover:underline hover:text-pink-400">
            <font-awesome-icon icon="fa-solid fa-globe" class="mr-1" />
            Meu Portfólio
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tabs = ['Introdução', 'Janelas', 'Sobre']
const currentTab = ref('Introdução')
</script>