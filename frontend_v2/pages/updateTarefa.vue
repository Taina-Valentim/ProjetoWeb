<template>
    <div class="container">
      <h2>Editar Projeto</h2>
      <form @submit.prevent="atualizarProjeto">
        <div class="form-group">
          <label for="nome">Nome do Projeto</label>
          <input type="text" v-model="project.nome" id="nome" />
        </div>
        <div class="form-group">
          <label for="descricao">Descrição</label>
          <textarea v-model="project.descricao" id="descricao"></textarea>
        </div>
        <div class="form-group">
          <label for="dataInicio">Data de Início</label>
          <input type="date" v-model="project.dataInicio" id="dataInicio" />
        </div>
        <div class="form-group">
          <label for="dataEntrega">Data de Entrega</label>
          <input type="date" v-model="project.dataEntrega" id="dataEntrega" />
        </div>
        <div class="form-group">
          <label for="responsavel">Responsável</label>
          <input type="text" v-model="project.responsavel" id="responsavel" />
        </div>
        <div class="form-group">
          <label for="solicitante">Solicitante</label>
          <input type="text" v-model="project.solicitante" id="solicitante" />
        </div>
        <div class="form-group">
          <label for="orçamento">Orçamento</label>
          <input type="number" v-model="project.orcamento" id="orcamento" />
        </div>
        <!-- Adicione outros campos necessários para o projeto -->
        <div class="buttons">
          <button type="submit" class="continuar">Atualizar Projeto</button>
        </div>
      </form>
      <div class="buttons">
        <button @click="deletarProjeto" class="criar" style="color: red;">EXCLUIR PROJETO</button>
        <button @click="cancelar" class="cancelar">Cancelar</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useFetch } from 'nuxt/app';
  
  const route = useRoute();
  const router = useRouter();
  const projectId = route.params.idprojeto; // Obtém o ID do projeto da URL
  const project = ref({});
  
  // Busca os dados do projeto ao carregar a página
  onMounted(async () => {
    const { data, error } = await useFetch(`http://localhost:8081/projetos/${projectId}`);
    
    if (error.value) {
      console.error('Erro ao carregar o projeto:', error.value);
      return;
    }
  
    project.value = data.value;
  });
  
  async function atualizarProjeto() {
    try {
      const { error } = await useFetch(`http://localhost:8081/projetos/${projectId}`, {
        method: 'PUT',
        body: JSON.stringify(project.value),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (error.value) {
        console.error('Erro ao atualizar o projeto:', error.value);
        return;
      }
  
      router.push(`/GerenciarProjeto/${project.value.id}`); // Redireciona após a atualização
    } catch (err) {
      console.error('Erro ao atualizar o projeto:', err);
    }
  }
  
  async function deletarProjeto() {
    try {
      const { error } = await useFetch(`http://localhost:8081/projetos/${projectId}`, {
        method: 'DELETE'
      });
  
      if (error.value) {
        console.error('Erro ao deletar o projeto:', error.value);
        return;
      }
  
      router.push('/Home'); // Redireciona após a exclusão
    } catch (err) {
      console.error('Erro ao deletar o projeto:', err);
    }
  }
  
  function cancelar() {
    router.back(); // Volta para a página anterior
  }
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    background: #f4f4f4;
    border-radius: 8px;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
  }
  
  textarea {
    margin: 20px 0;
    height: 100px;
    border-radius: 8px;
    padding: 10px;
    font-size: 14px;
  }
  
  input[type="date"] {
    border-radius: 8px;
    padding: 10px;
    font-size: 14px;
  }
  
  .buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .continuar, .criar {
    background: green;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .cancelar {
    background: rgb(255, 179, 0);
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  