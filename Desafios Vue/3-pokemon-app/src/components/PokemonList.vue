<template>
  <h1>Pokémon App</h1>
  <loader v-if="isLoading" />
  <div
    class="div-pokemon"
    v-for="(pokemon, index) in list"
    :key="index"
    @click="selectPokemon(getPokemonId(pokemon.url))"
  >
    <img :src="getPokemonImage(getPokemonId(pokemon.url))" alt="" />
    {{ pokemon.name }}
  </div>
</template>

<script>
import {
  getPokemonList,
  getPokemonImageUrl,
} from "../service/pokemon-service.js";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Loader from "./Loader";

export default {
  components: {
    Loader,
  },
  setup() {
    const list = ref([]);
    const router = useRouter();
    const isLoading = ref(false);

    // executando função no onMounted porque a partir dele temos acesso ao DOM e podemos exibir um loading
    onMounted(() => {
      isLoading.value = true;
      getPokemonList()
        .then((resp) => {
          list.value = resp.results;
        })
        .finally(() => {
          isLoading.value = false;
        });
    });

    // método que extrai id do pokemon da URL
    const getPokemonId = (url) =>
      url.replace("https://pokeapi.co/api/v2/pokemon/", "").replace("/", "");

    // método que recebe a imagem do pokemon
    const getPokemonImage = (id) => getPokemonImageUrl(id);

    // método que obtem o pokemon selecionado
    const selectPokemon = (id) =>
      router.push({ name: "pokemon", params: { id: id } });

    return { list, getPokemonImage, getPokemonId, selectPokemon, isLoading };
  },
};
</script>

<style scoped>
.div-pokemon {
  border: 1px solid lightgray;
  border-radius: 0.2rem;
  margin: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  font-weight: bold;
}
</style>