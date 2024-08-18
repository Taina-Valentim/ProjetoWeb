<template>
  <div class="gerenciar-projeto" v-if="project">
    <div class="header">
      <div class="capa-projeto">
        <img :src="project?.capaUrl || 'default-capa-url.png'" alt="Capa do Projeto" />
      </div>
      <div class="info">
        <div class="nome-projeto">{{ project?.nome || 'Nome do Projeto' }}</div>
        <div class="data-requisicao">
          Solicitado em: {{ formatDate(project?.dataSolicitacao) || 'Data de Solicitação' }}
        </div>
        <div class="solicitante">Solicitante: {{ project?.solicitante || 'Solicitante' }}</div>
        <div class="responsavel">Responsável: {{ project?.responsavel || 'Responsável' }}</div>
      </div>
      <div class="tempo-restante">
        <i class="bi bi-calendar"></i>
        {{ calcularTempoRestante(project?.dataEntrega) || 'Tempo Restante' }}
        <div class="periodo">
          De {{ formatDate(project?.dataInicio) || 'Data de Início' }} a {{ formatDate(project?.dataEntrega) || 'Data de Entrega' }}
        </div>
      </div>
    </div>
    
    <div class="tabs">
      <button :class="{ active: activeTab === 'tarefas' }" @click="activeTab = 'tarefas'">Tarefas</button>
      <button :class="{ active: activeTab === 'descricao' }" @click="activeTab = 'descricao'">Descrição</button>
    </div>
    
    <div class="tab-content">
      <div v-if="activeTab === 'tarefas'">
        <!-- Conteúdo da aba Tarefas -->
        <div class="task-controls">
          <div class="completed-tasks">
            <div class="tarefas">
              {{ totalTasks || 0 }} tarefas no total
              <br>
              {{ completedTasks || 0 }} concluídas
          </div>
          </div>
          <input type="text" class="search-tasks" placeholder="🔎 Procurar tarefa" />
          <select class="sort-tasks">
            <option disabled selected>Ordenar Tarefa</option>
            <!-- Opções a serem adicionadas mais tarde -->
          </select>
          <!-- Botão de tarefa -->
          <nuxt-link :to="{ path: '/criarTarefa', query: { projetoId: project.id } }">
            <button class="add-task">
              <i class="bi bi-plus-circle-fill"></i> Adicionar Tarefa
            </button>
          </nuxt-link>
          <!-- Botão de tarefa -->
        </div>
        <div class="task-list">
          <CardTarefa v-for="task in tasks" :key="task.id" :task="task" />
        </div>
      </div>
      
      <div v-if="activeTab === 'descricao'">
        <!-- Conteúdo da aba Descrição -->
        <p>{{ project?.descricao || 'Descrição não disponível' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = ref(route.params.idprojeto);

const project = ref(null);
const activeTab = ref('tarefas');

// Buscar o número de tarefas e concluir
const tasks = ref([]); // Array para armazenar as tarefas
const totalTasks = ref(0);
const completedTasks = ref(0);
//A debaixo é singelamente difernte da do card, então não substitua uma pela outra: rework ambas depois.
async function fetchTasks() {
  if (!project.value?.id) return;

  try {
    const { data, error } = await useFetch(`http://localhost:8081/projetos/${project.value.id}/tarefas`);

    if (error.value) {
      console.error('Error fetching tasks:', error.value);
      return;
    }

    tasks.value = data.value; // Armazena as tarefas retornadas
    totalTasks.value = tasks.value.length;
    completedTasks.value = tasks.value.filter(task => task.status === true).length;
  } catch (err) {
    console.error('Error:', err);
  }
}

import { formatDate } from '@/utils/formatDate';
/*function formatDate(date) {
  if (!date) return 'Data não disponível';
  const d = new Date(date);
  const utcDay = String(d.getUTCDate()).padStart(2, '0');
  const utcMonth = String(d.getUTCMonth() + 1).padStart(2, '0');
  const utcYear = d.getUTCFullYear();
  return `${utcDay}/${utcMonth}/${utcYear}`;
}*/

function calcularTempoRestante(dataEntrega) {
  if (!dataEntrega) return 'Tempo não disponível';
  const hoje = new Date();
  const entrega = new Date(dataEntrega);
  const diff = entrega - hoje;

  const anos = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
  const meses = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
  const dias = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));

  return `${dias} dias, ${meses} meses e ${anos} anos restantes`;
}


onMounted(async () => {
  try {
    const { data, error } = await useFetch(`http://localhost:8081/projetos/${id.value}`);
    if (error.value) {
      console.error('Error fetching project:', error.value);
    } else {
      project.value = data.value;
      fetchTasks();
    }
  } catch (err) {
    console.error('Error:', err);
  }
});
</script>

<style scoped>
.gerenciar-projeto {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background: #f4f4f4;
  border-radius: 8px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.capa-projeto {
  width: 150px;
  height: 150px;
  overflow: hidden;
}

.capa-projeto img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info {
  flex: 1;
  margin-left: 20px;
}

.nome-projeto {
  font-size: 14px;
  font-weight: bold;
}

.data-requisicao, .solicitante, .responsavel {
  font-size: 12px;
}

.tempo-restante {
  font-size: 14px;
  text-align: right;
  font-weight: bold;
}

.periodo {
  font-size: 12px;
  margin-bottom: 20px;
  font-weight: normal;
}

.tabs {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.tabs button {
  padding: 10px;
  border: none;
  background: #ddd;
  cursor: pointer;
}

.tabs .active {
  background: #007bff;
  color: white;
}

.tab-content {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.task-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.completed-tasks {
  font-size: 14px;
  font-weight: bold;
}

.search-tasks {
  padding: 5px;
  font-size: 12px;
  width: 200px;
}

.sort-tasks {
  padding: 5px;
  font-size: 12px;
}

.add-task {
  padding: 5px 10px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.add-task i {
  margin-right: 5px;
}

.task-list {
  border-top: 1px solid #ddd;
  padding-top: 10px;
  max-height: 400px;
  overflow-y: auto;
}
</style>
