<template>
    <div class="container">
        <div class="tabs">
            <!-- Botões das Etapas -->
            <button :class="{ active: etapa === 1 }" @click="etapa = 1">Etapa 1</button>
            <button 
                :class="{ active: etapa === 2 }" 
                @click="etapa = 2" 
                :disabled="!etapa1Completa">
                Etapa 2
            </button>
        </div>

        <!-- Conteúdo da Etapa 1 -->
        <div v-if="etapa === 1" class="etapa1">
            <h2>Informações Básicas da Tarefa</h2>
            <div class="form-container">
                <div class="form-group">
                    <label>Tarefa</label>
                    <input type="text" v-model="tipo" maxlength="50" />
                    <p>{{ 50 - tipo.length }} caracteres restantes</p>
                </div>

                <div class="form-group">
                    <label>Status</label>
                    <select v-model="status">
                        <option :value="false">Não Concluída</option>
                        <option :value="true">Concluída</option>
                    </select>
                </div>

                <textarea v-model="descricao" placeholder="Adicione aqui a descrição da tarefa"></textarea>

                <!-- Botões de Ação -->
                <div class="buttons">
                    <button @click="voltarParaProjeto" class="cancelar">Não criar tarefa</button>
                    <button @click="etapa = 2" class="continuar">Continuar para etapa 2</button>
                </div>
            </div>
        </div>

        <!-- Conteúdo da Etapa 2 -->
        <div v-if="etapa === 2" class="etapa2">
            <h2>Detalhes da Tarefa</h2>
            <div class="form-container">
                <!-- Campos do formulário da Etapa 2 -->
                <div class="form-group">
                    <label>Data de Início</label>
                    <input type="date" v-model="dataInicio" />
                </div>
                <div class="form-group">
                    <label>Data de Entrega</label>
                    <input type="date" v-model="dataEntrega" />
                </div>

                <div class="form-group">
                    <label>Responsável</label>
                    <input type="text" v-model="responsavel" />
                </div>

                <!-- Botões de Ação -->
                <div class="buttons">
                    <button @click="etapa = 1" class="voltar">Voltar pra etapa 1</button>

                    <!-- Botão "Criar Tarefa" -->
                    <button @click="criarTarefa" class="criar">Criar Tarefa</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useFetch, useRoute, useRouter } from '#app';

const etapa = ref(1);
const etapa1Completa = ref(false);

const tipo = ref('');
const status = ref(false); // Inicialmente falso
const descricao = ref('');
const dataInicio = ref('');
const dataEntrega = ref('');
const responsavel = ref('');

const route = useRoute();
const router = useRouter();
const projetoId = ref(route.query.projetoId);

const criarTarefa = async () => {
    const novaTarefa = {
        tipo: tipo.value,
        status: status.value, // Aqui, `status` é um booleano
        descricao: descricao.value,
        dataInicio: dataInicio.value,
        dataEntrega: dataEntrega.value,
        responsavel: responsavel.value,
        projetoId: projetoId.value
    };

    try {
        const response = await useFetch('http://localhost:8081/tarefas', {
            method: 'POST',
            body: JSON.stringify(novaTarefa),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.error) {
            console.error('Erro ao criar tarefa:', response.error);
        } else {
            console.log('Tarefa criada com sucesso:', response.data);
            //router.push(`/GerenciarProjeto/${task.value.projetoId}`); // Redirecionar após a atualização
            //router.push(`/projetos/${projetoId.value}`);
            //voltarParaProjeto; //nem assim foi.
            //Mano, não tá funcionando aqui, mas no outro botão funciona.
            router.push(`/GerenciarProjeto/${projetoId.value}`);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
};

const voltarParaProjeto = () => {
    // Redirecionar para a página do projeto
    //router.push(`/projetos/${projetoId.value}`);
    router.push(`/GerenciarProjeto/${projetoId.value}`);
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
    background: red;
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
