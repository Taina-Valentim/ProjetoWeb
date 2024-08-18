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
            <h2>Informações Básicas</h2>
            <div class="form-container">
                <div class="capa-projeto">
                    <img :src="capaUrl" alt="Capa do Projeto" @click="escolherImagem" />
                    <input type="file" ref="inputFile" @change="uploadImagem" style="display:none" />
                    <i class="bi bi-plus-square-fill"></i>
                </div>

                <div class="nome-orcamento">
                    <div class="form-group">
                        <label>Nome do Projeto</label>
                        <input type="text" v-model="nome" maxlength="50" />
                        <p>{{ 50 - nome.length }} caracteres restantes</p>
                    </div>
                    <div class="form-group">
                        <label>Orçamento</label>
                        <input type="text" v-model="orcamento" @input="formatarOrcamento" />
                        <select v-model="currency">
                            <option value="USD">USD$</option>
                            <option value="BRL">R$</option>
                        </select>
                    </div>
                </div>

                <textarea v-model="descricao" placeholder="Adicione aqui a descrição do projeto"></textarea>

                <!-- Botões de Ação -->
                <div class="buttons">
                    <!-- Botão "Não criar projeto" dentro de NuxtLink -->
                    <NuxtLink to="/">
                        <button class="cancelar">Não criar projeto</button>
                    </NuxtLink>
                    <!-- Botão "Continuar para etapa 2" -->
                    <button @click="etapa = 2" class="continuar">Continuar para etapa 2</button>
                </div>
            </div>
        </div>

        <!-- Conteúdo da Etapa 2 -->
        <div v-if="etapa === 2" class="etapa2">
            <h2>Detalhes do Projeto</h2>
            <div class="form-container">
                <!-- Campos do formulário da Etapa 2 -->
                <div class="form-group">
                    <label>Solicitante</label>
                    <input type="text" v-model="solicitante" />
                </div>
                <div class="form-group">
                    <label>Responsável</label>
                    <input type="text" v-model="responsavel" />
                </div>
                <div class="form-group">
                    <label>Data de Solicitação</label>
                    <input type="date" v-model="dataSolicitacao" />
                </div>
                <div class="form-group">
                    <label>Data de Início</label>
                    <input type="date" v-model="dataInicio" />
                </div>
                <div class="form-group">
                    <label>Data de Entrega</label>
                    <input type="date" v-model="dataEntrega" />
                </div>

                <!-- Botões de Ação -->
                <div class="buttons">
                    <!-- Botão "Voltar pra etapa 1" -->
                    <button @click="etapa = 1" class="voltar">Voltar pra etapa 1</button>

                    <!-- Botão "Criar Projeto" dentro de NuxtLink -->
                    <NuxtLink to="/">
                        <button @click="criarProjeto" class="criar">Criar Projeto</button>
                    </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import { useFetch } from '#app';

const etapa = ref(1);
const etapa1Completa = ref(false);

const nome = ref('');
const orcamento = ref('');
const currency = ref('USD');
const descricao = ref('');
const solicitante = ref('');
const responsavel = ref('');
const dataSolicitacao = ref('');
const dataInicio = ref('');
const dataEntrega = ref('');

const capaUrl = ref(''); // Placeholder para a imagem da capa

const escolherImagem = () => {
    const input = this.$refs.inputFile;
    input.click();
};

const uploadImagem = (event) => {
    const file = event.target.files[0];
    if (file) {
        capaUrl.value = URL.createObjectURL(file);
    }
};

const formatarOrcamento = () => {
    orcamento.value = orcamento.value.replace(/[^\d]/g, '').replace(/(\d)(\d{2})$/, '$1,$2');
};

const criarProjeto = async () => {
    const novoProjeto = {
        nome: nome.value,
        orcamento: orcamento.value,
        currency: currency.value,
        descricao: descricao.value,
        solicitante: solicitante.value,
        responsavel: responsavel.value,
        dataSolicitacao: dataSolicitacao.value,
        dataInicio: dataInicio.value,
        dataEntrega: dataEntrega.value,
        capaUrl: capaUrl.value,
    };

    const response = await useFetch('http://localhost:8081/projetos', {
        method: 'POST',
        body: JSON.stringify(novoProjeto),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.error) {
        console.error('Erro ao criar projeto:', response.error);
    } else {
        console.log('Projeto criado com sucesso:', response.data);
    }
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

.capa-projeto {
display: flex;
flex-direction: column;
position: relative;
width: 100px;
height: 100px;
background: #ddd;
border-radius: 8px;
cursor: pointer;
}

.capa-projeto img {
width: 100%;
height: 100%;
border-radius: 8px;
}

.capa-projeto i {
position: absolute;
bottom: 5px;
right: 5px;
font-size: 24px;
color: #007bff;
}

.nome-orcamento {
display: flex;
justify-content: space-between;
width: 100%;
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
  