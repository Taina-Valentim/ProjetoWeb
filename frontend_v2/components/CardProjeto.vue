<template>
  <NuxtLink v-bind:to="{ path: `/GerenciarProjeto/${project.id}` }">
  <!--
  <NuxtLink  v-bind:to="`/projetos/${project.id}`">
  -->
  <!--uma hora programa a API para ter um path para o treco  de nome certo ali, senão vai ficar confuso-->
  <div  class="card-projeto">
  <!--<div  class="card-projeto" @click="goToProject">-->
    <div class="profile-pic">
      <img :src="project?.profilePic || 'default-profile-pic.png'" alt="Profile Picture" />
    </div>
    <div class="info">
      <div class="nome-projeto">{{ project?.nome || 'Nome do Projeto' }}</div>
      

      <div class="data-requisicao">
        Requisitado em {{ formatDate(project?.dataSolicitacao) || 'Data de Requisição' }}
      </div>
      <div class="responsavel">Responsável: {{ project?.responsavel || 'Responsável' }}</div>
      <div class="solicitante">Solicitante: {{ project?.solicitante || 'Solicitante' }}</div>
    </div>
    <div class="dates">
      de {{ formatDate(project?.dataInicio) || 'Data de Início' }} a {{ formatDate(project?.dataEntrega) || 'Data de Entrega' }}
      <div class="tarefas">
          {{ totalTasks || 0 }} tarefas no total
          <br>
          {{ completedTasks || 0 }} concluídas
      </div>
    </div>
  </div>
</NuxtLink>
</template>

<script setup>
//import { useRouter } from 'vue-router';
import { defineProps } from 'vue';
import { ref, onMounted } from 'vue';
import { useFetch } from '#app';  // Certifique-se de ter essa importação correta

//---------------new begin-------------------

const totalTasks = ref(0);
const completedTasks = ref(0);


// Buscar o número de tarefas e concluir
async function fetchTasks() {
  if (!props.project?.id) return;

  try {
    const { data, error } = await useFetch(`http://localhost:8081/projetos/${props.project.id}/tarefas`);

    if (error.value) {
      console.error('Error fetching tasks:', error.value);
      return;
    }

    const tasks = data.value;
    totalTasks.value = tasks.length;
    completedTasks.value = tasks.filter(task => task.status === true).length;
  } catch (err) {
    console.error('Error:', err);
  }
}

// Chama a função para buscar as tarefas quando o componente é montado
onMounted(() => {
  fetchTasks();
});
// ---------------new end---------------------

// Função para formatar a data
function formatDate(date) {
  if (!date) return null;
  const d = new Date(date);
  // Ajuste para evitar a subtração de um dia devido ao fuso horário
  const utcDay = String(d.getUTCDate()).padStart(2, '0');
  const utcMonth = String(d.getUTCMonth() + 1).padStart(2, '0'); // Janeiro é 0
  const utcYear = d.getUTCFullYear();
  return `${utcDay}/${utcMonth}/${utcYear}`;
}


const props = defineProps({
  project: {
    type: Object,
    required: true
  }
});

/*
const router = useRouter();

function goToProject() {
  if (props.project?.id) {
    router.push(`/gerenciarProjeto/${props.project.id}`);
  }
}
*/
</script>

<style scoped>
.card-projeto {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.card-projeto:hover {
  background-color: #b0cdff; /* Azul claro */
}

.profile-pic {
  width: 64px;
  height: 64px;
}

.profile-pic img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.info {
  flex: 1;
  margin-left: 16px;
}

.nome-projeto {
  font-weight: bold;
  font-size: 15px;
}

.data-requisicao {
  font-size: 10px;
  margin-top: 4px;
}

.responsavel, .solicitante {
  font-size: 10px;
  margin-top: 4px;
}

.dates {
  text-align: right;
}

.tarefas {
  font-size: 12px;
  margin-top: 4px;
}
</style>
