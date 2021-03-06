import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios"
import store from './store'
import 'bootstrap'
// axios.defaults.baseURL = "http://localhost:8000"

axios.defaults.baseURL = "https://vietdevshop-be.herokuapp.com/"
createApp(App).use(store).use(router, axios).mount('#app')