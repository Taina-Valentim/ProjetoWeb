<template>
    <div>
      <b-list-group>
        <b-list-group-item
          v-for="project in projects"
          :key="project.id"
        >
          {{ project.nome }} - {{ project.descricao }}
        </b-list-group-item>
      </b-list-group>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      projects: {
        type: Array,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  /* Adicione estilos aqui */
  </style>
  