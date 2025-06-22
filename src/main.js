import "./assets/main.css"
import { createApp } from "vue"
import App from "./App.vue"
import router from "./js/router.js"
import { provideStoreToApp } from "@reduxjs/vue-redux"
import store from "./js/store.js"

const app = createApp(App)
provideStoreToApp(app, { store })
app.use(router).mount("#app")
