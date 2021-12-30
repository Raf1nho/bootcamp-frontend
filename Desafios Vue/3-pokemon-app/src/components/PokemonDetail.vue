<template>
  <loader v-if="isLoading" />
  <div v-if="info">
    <div class="div-row">
      <img :src="image" :alt="info.name" />
      <h1>{{ info.name }}</h1>
    </div>
    <div class="div-row">
      <h4>Experiência:</h4>
      {{ info.base_experience }}
    </div>
    <div class="div-row">
      <h4>Peso:</h4>
      {{ info.weight }}
    </div>
    <div class="div-row">
      <h4>Altura:</h4>
      {{ info.height }}
    </div>
    <div class="div-row">
      <h4>Imagens:</h4>
      <button @click='showImages = true' v-if='!showImages'>Ver</button>
      <button @click='showImages = false' v-if='showImages'>Esconder</button>
    </div>
    <div v-if='showImages' class="div-images">
      <div v-for="(value, key, index) in info.sprites" :key="index">
        <img
          v-if="value && typeof value === 'string'"
          :src="value"
          :alt="info.name"
        />
      </div>
    </div>
  </div>
  <button class="btn-voltar" @click="back">Voltar</button>
</template>

<script>
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getPokemon, getPokemonImageUrl } from "../service/pokemon-service.js";
import Loader from "./Loader.vue";

export default {
  components: {
    Loader,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const info = ref(null);
    const isLoading = ref(false);
    const showImages = ref(false) 

    // método executado ao montar o componente
    onMounted(() => {
      isLoading.value = true;
      getPokemon(route.params.id)
        .then((resp) => {
          info.value = resp;
        })
        .finally(() => {
          isLoading.value = false;
        });
    });

    // método que altera o valor do router para o path original
    // ou seja, quando executada leva o usuário à página inicial
    const back = () => router.replace("/");

    const image = computed(() => getPokemonImageUrl(info.value.id));

    return { isLoading, info, image, back, showImages };
  },
};
</script>

<style scoped>
.div-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.btn-voltar {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  border-radius: 3px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  width: 100%;
  font-weight: bold;
  margin-top: 0.7rem;
}

h4 {
  margin: 0.4rem;
}
.div-images {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>