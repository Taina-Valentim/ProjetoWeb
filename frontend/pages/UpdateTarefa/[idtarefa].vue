<template>
  <div class="container">
    <h2>Atualizar Tarefa</h2>
    <button @click="excluirTarefa" style="float: right; background-color: red; color: white;">EXCLUIR TAREFA</button>

    <form @submit.prevent="atualizarTarefa">
      <div v-if="etapa === 1">
        <h3>Etapa 1: </h3>
        <div class="form-group">
          <label for="tipo">Tipo</label>
          <input v-model="task.tipo" id="tipo" />
        </div>

        <h3>Etapa 2: Descrição</h3>
        <div class="form-group">
          <label for="descricao">Descrição</label>
          <textarea v-model="task.descricao" id="descricao"></textarea>
        </div>

        <div class="form-group">
          <label for="status">Status</label>
          <select v-model="task.status" id="status">
            <option value="false">Não Concluída</option>
            <option value="true">Concluída</option>
          </select>
        </div>
        <div class="buttons">
          <button @click.prevent="cancelar" type="button" class="cancelar">Não Mudar Nada</button>
          <button type="button" @click="proximaEtapa" class="continuar">Próxima Etapa</button>
        </div>
      </div>

      <div v-if="etapa === 2">

        
        <div class="form-group">
          <label for="dataInicio">Data de Início</label>
          <input type="date" v-model="task.dataInicio" id="dataInicio" />
        </div>
        <div class="form-group">
          <label for="dataEntrega">Data de Entrega</label>
          <input type="date" v-model="task.dataEntrega" id="dataEntrega" />
        </div>
        <div class="form-group">
          <label for="responsavel">Responsável</label>
          <input v-model="task.responsavel" id="responsavel" />
        </div>

        <div class="buttons">
          
          <button @click="voltarEtapa" type="button" class="cancelar">Voltar</button>

          <button type="submit" class="continuar">Atualizar Tarefa</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from '#app';

const route = useRoute();
const router = useRouter();
const taskId = route.params.idtarefa;

const task = ref({
  tipo: '',
  descricao: '',
  dataInicio: '',
  dataEntrega: '',
  responsavel: '',
  status: false,
  createdAt: '',
  updatedAt: ''
});

const etapa = ref(1); // Controle de etapa

// Carregar dados da tarefa existente
onMounted(async () => {
  try {
    const { data } = await useFetch(`http://localhost:8081/tarefas/${taskId}`);
    task.value = data.value;
  } catch (err) {
    console.error('Erro ao carregar a tarefa:', err);
  }
});

// Atualizar tarefa
const atualizarTarefa = async () => {
  try {
    const response = await useFetch(`http://localhost:8081/tarefas/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(task.value),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.error.value) {
      console.error('Erro ao atualizar a tarefa:', response.error.value);
    } else {
      console.log('Tarefa atualizada com sucesso:', response.data);
      router.push(`/GerenciarProjeto/${task.value.projetoId}`); // Redirecionar após a atualização
    }
  } catch (err) {
    console.error('Erro:', err);
  }
};

// Excluir tarefa
const excluirTarefa = async () => {
  try {
    const response = await useFetch(`http://localhost:8081/tarefas/${taskId}`, {
      method: 'DELETE'
    });

    if (response.error.value) {
      console.error('Erro ao excluir a tarefa:', response.error.value);
    } else {
      console.log('Tarefa excluída com sucesso');
      router.push(`/projetos/${task.value.projetoId}`); // Redirecionar após a exclusão
    }
  } catch (err) {
    console.error('Erro ao excluir a tarefa:', err);
  }
};

// Navegar para a próxima etapa
const proximaEtapa = () => {
  etapa.value = 2;
};

// Voltar para a etapa anterior
const voltarEtapa = () => {
  etapa.value = 1;
};

// Cancelar edição
const cancelar = () => {
  router.back();
};
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

textarea, input[type="date"], select, input {
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
}

textarea {
  margin: 20px 0;
  height: 100px;
}

input[disabled] {
  background: #e9ecef;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.continuar, .cancelar {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.continuar {
  background: green;
  color: white;
}

.cancelar {
  background: rgb(255, 179, 0);
  color: white;
}
</style>
