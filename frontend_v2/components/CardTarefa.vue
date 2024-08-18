<template>
  <div class="card-tarefa">
    <div class="tipo-status">
      <span class="tipo">{{ task.tipo }}: </span>
      <span class="statusDesc">{{ task.statusDesc }}</span>
      <span class="status">{{ task.status ? 'Concluída' : 'Não Concluída' }}</span>
    </div>
    <div class="responsavel">Responsável: {{ task.responsavel }}</div>
    <div class="descricao">{{ task.descricao }}</div>

    <!-- Link para a página de atualização da tarefa -->
    <NuxtLink v-bind:to="{ path: `/UpdateTarefa/${task.id}` }">
      <div class="editar">
        <i>✏️</i>
      </div>
    </NuxtLink>

    <div class="datas">
      <div>Restam: {{ tempoRestante }}</div>
      <div>De {{ formatDate(task.dataInicio) }} a {{ formatDate(task.dataEntrega) }}</div>
    </div>
    <div class="updated-at">Atualizada em: {{ task.updatedAt }}</div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { formatDate } from '@/utils/formatDate';

// Define as propriedades esperadas
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
});

// Se você tiver uma função para calcular o tempo restante, descomente o código abaixo
// import { timeLeft } from '@/utils/timeLeft';
// const tempoRestante = timeLeft(props.task.dataEntrega);
</script>

<style scoped>
.card-tarefa {
  border: 1px solid #ddd;
  padding: 1px;
  margin: 2px 1px;
  border-radius: 4px;
  background: #f9f9f9;
  position: relative;
}

.header {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.tipo-status {
  font-weight: bold;
  display: flex;
}

.statusDesc {
  font-weight: normal;
}

.status {
  text-align: right;
  position: absolute;
  right: 100px;
}

.updated-at {
  font-size: 10px;
  margin-top: 1px;
}

.responsavel {
  font-style: italic;
  font-size: 10px;
  margin-top: 1px;
}

.descricao {
  padding-top: 5px;
  padding-left: 10px;
  padding-bottom: 5px;
  font-size: 14px;
  margin-top: 1px;
}

.datas {
  font-size: 10px;
  margin-top: 1px;
  display: flex;
  justify-content: space-between;
}

.editar {
  position: absolute;
  top: 1px;
  right: 1px;
}

.editar i {
  font-size: 10px;
  cursor: pointer;
}
</style>
