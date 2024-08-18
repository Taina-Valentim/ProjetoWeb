<template>
    <div class="lista-projetos">
      <CardProjeto v-for="project in paginatedProjects" :key="project.id" :project="project" />
      <div class="pagination">
        <button @click="previousPage" :disabled="currentPage === 1">Anterior</button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Próxima</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import CardProjeto from './CardProjeto.vue';
  
  const props = defineProps({
    projects: {
      type: Array,
      default: () => []  // Garantir que projects seja sempre um array
    }
  });
  
  const currentPage = ref(1);
  const itemsPerPage = 10;
  
  const totalPages = computed(() => Math.ceil(props.projects.length / itemsPerPage));
  
  const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
  const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, props.projects.length));
  
  const paginatedProjects = computed(() => {
    return props.projects.slice(startIndex.value, endIndex.value);
  });
  
  function previousPage() {
    if (currentPage.value > 1) {
      currentPage.value -= 1;
    }
  }
  
  function nextPage() {
    if (currentPage.value < totalPages.value) {
      currentPage.value += 1;
    }
  }
  </script>
  
  <style scoped>
  .lista-projetos {
    max-height: calc(100vh - 100px); /* Ajuste conforme necessário */
    overflow-y: auto;
    padding: 16px;
  }
  
  .pagination {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }
  
  button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
  }
  
  button:disabled {
    background-color: #ddd;
    cursor: not-allowed;
  }
  </style>
  