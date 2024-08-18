<template>
    <div>
      <header>
        <nav class="menu">
          <NuxtLink to="/">Home</NuxtLink>
          <NuxtLink to="/criar">Criar Projeto</NuxtLink>
          <NuxtLink to="/sobre">Sobre</NuxtLink>
        </nav>
      </header>
      <main>
        <ListaProjetos :projects="projects" />
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import ListaProjetos from '~/components/ListaProjetos.vue';
  
  const projects = ref([]);
  
  onMounted(async () => {
    try {
      const { data, error } = await useFetch('http://localhost:8081/projetos');
      if (error.value) {
        console.error('Error fetching projects:', error.value);
      } else {
        projects.value = data.value || [];
      }
    } catch (err) {
      console.error('Error:', err);
    }
  });
  </script>
  
  <style scoped>
  header {
    background: #f8f9fa;
    padding: 16px;
  }
  
  .menu {
    display: flex;
    justify-content: space-around;
    padding: 8px;
  }
  
  .menu a {
    text-decoration: none;
    color: #007bff;
  }
  </style>
  