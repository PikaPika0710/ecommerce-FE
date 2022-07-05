import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"
import store from './store'

axios.defaults.baseURL = "http://localhost:8000"

createApp(App).use(store).use(router, axios).mount('#app')