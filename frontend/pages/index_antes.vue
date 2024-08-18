<!-- pages/projetos/index.vue -->

<template>
    <!-- DIV é obrigatória -->
    <div class="container">
        <nav class="menu">
            <NuxtLink to="/">Home</NuxtLink>
            <NuxtLink to="/criar">Criar Projeto</NuxtLink>
            <NuxtLink to="/sobre">Sobre</NuxtLink>
        </nav>
        
        <h1>Lista de Projetos</h1>
        
        <div class="project-list">
            <div v-for="projeto in listaProjetos" :key="projeto.id">
                <NuxtLink v-bind:to="`/projeto/${projeto.id}`">
                    <div class="imagem">
                        <!-- Substitua por uma imagem relevante se necessário -->
                        <img v-bind:src="projeto.imagemURL" alt="Imagem do Projeto">
                    </div>
                </NuxtLink>

                <span>{{ projeto.nome }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const response = await useFetch("http://localhost:8081/projetos");
    const listaProjetos = ref(response.data);

    console.log(listaProjetos.value);
</script>

<style scoped>
.menu {
    display: flex;
    justify-content: space-between;
    max-width: 200px;
    margin: 0 auto;
}

.container {
    text-align: center;
}

.project-list {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
}

.imagem {
    width: 250px;
}

.imagem img {
    width: 100%;
}
</style>
