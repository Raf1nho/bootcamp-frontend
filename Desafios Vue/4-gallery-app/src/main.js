import { createApp } from 'vue'
import App from './App.vue'

import {createRouter, createWebHistory} from 'vue-router'
import Album from './components/Album.vue'
import Photos from './components/Photos.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/' , component: Album },
        { path: '/albums', component: Album},
        { path: '/albums/:id', name: 'photos' , component: Photos}

    ]
})


const app = createApp(App)
app.use(router)
app.mount('#app')
