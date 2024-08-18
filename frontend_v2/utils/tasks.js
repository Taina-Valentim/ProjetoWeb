import { ref } from 'vue';
import { useFetch } from '#app';

// Referência para armazenar tarefas e contagens
export const tasks = ref([]);
export const totalTasks = ref(0);
export const completedTasks = ref(0);

// Função para buscar tarefas do projeto
export async function fetchTasks(projectId) {
  if (!projectId) return;

  try {
    const { data, error } = await useFetch(`http://localhost:8081/projetos/${projectId}/tarefas`);

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
