<template>
    <h1>Albuns</h1>
    <div 
    class='div-albumList' 
    v-for="(album, index) in list" :key='index'
    @click='selectAlbum(album.id)'
    >
        <p>{{ album.title }}</p>
    </div>
</template>

<script>

import {getAlbumList} from '../service/gallery-service.js'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
    setup(){
        const list = ref([])
        const router = useRouter()

        onMounted(() => {
            getAlbumList().then((resp) => {
                list.value = resp
            })
        })


        const selectAlbum = (id) => {
            router.push({name: 'photos', params: {id: id} })
        }

        return { list, selectAlbum }
    }
 
}
</script>

<style scoped>

.div-albumList {
    border-bottom: 1px solid lightgray;
    margin-bottom: 1rem;
    cursor: pointer;
}

p:first-letter {
    text-transform:capitalize;
}

</style>