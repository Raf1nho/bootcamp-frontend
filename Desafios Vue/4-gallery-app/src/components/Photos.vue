<template>
    <h1>Photos</h1>
    <h2>Album: {{albumName}}</h2>
    <Loader v-if="isLoading"></Loader>
    <div class="div-lista-photos">
        <div class="div-photo" v-for="(value, key, index) in list" :key='index'>
            <img :src="value.thumbnailUrl" alt="value.title">
            <p>{{value.title}}</p>
        </div>
    </div>
      <button class="btn-voltar" @click="back">Voltar</button>
</template>

<script>
import {onMounted, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {getPhotos, getAlbumList} from '../service/gallery-service.js'
import Loader from './Loader.vue'

export default {
    components: {
        Loader,
    },
    setup() {
        const router = useRouter()
        const route = useRoute()
        const list = ref(null)
        const albumName = ref('')
        const isLoading = ref(false)

        onMounted(() => {
            isLoading.value = true
            
            getAlbumList().then((resp) => {
                const title = resp[route.params.id - 1] 
                albumName.value =  title.title
            })

            getPhotos(route.params.id).then((resp)=> {
                list.value = resp
            }).finally(() => {
                isLoading.value = false
            })
        })


        const back = () => router.replace('/')

        return {back, list , albumName, isLoading}
    }
    
}
</script>

<style scoped>

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
  cursor: pointer;
}

.div-photo {
    width: 300px;
    margin: 0 1rem;
    text-align: center;
}

.div-lista-photos {
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 auto;
    justify-content: flex-start;
}
</style>