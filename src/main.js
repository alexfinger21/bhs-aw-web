import "./assets/main.css"
import { createApp } from "vue"
import App from "./App.vue"
import router from "./js/router"
import { provideStoreToApp } from "@reduxjs/vue-redux"

const app = createApp(App)
provideStoreToApp(app)
app.use(router).mount('#app')
    
