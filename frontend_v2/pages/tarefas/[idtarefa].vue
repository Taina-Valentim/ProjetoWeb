<template>
    <div>
      <h2>Atualizar Tarefa</h2>
      <button @click="excluirTarefa" style="float: right; background-color: red; color: white;">EXCLUIR TAREFA</button>
      <form @submit.prevent="atualizarTarefa">
        <div>
          <label>Tipo</label>
          <input v-model="task.tipo" />
        </div>
        <div>
          <label>Status</label>
          <select v-model="task.status">
            <option value="false">Não Concluída</option>
            <option value="true">Concluída</option>
          </select>
        </div>
        <div>
          <label>Descrição</label>
          <textarea v-model="task.descricao"></textarea>
        </div>
        <button type="submit">Atualizar Tarefa</button>
        <button @click.prevent="cancelar" type="button">Não Mudar Nada</button>
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
    status: false,
    descricao: ''
  });
  
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
        router.push(`/tarefas/${taskId}`); // Redirecionar após a atualização
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
        router.push(`/projetos/${route.params.id}`); // Redirecionar após a exclusão
      }
    } catch (err) {
      console.error('Erro ao excluir a tarefa:', err);
    }
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

.tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.tabs button {
    padding: 10px;
    border: none;
    background: #ddd;
    cursor: pointer;
    margin: 0 10px;
}

.tabs .active {
    background: #007bff;
    color: #fff;
}

.form-container {
    display: flex;
    flex-direction: column;
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

.voltar {
    background: rgb(255, 179, 0);
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>
