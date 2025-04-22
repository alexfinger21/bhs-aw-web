import { createMemoryHistory, createRouter } from "vue-router"

import HomeView from "./HomeView.vue"
import AboutView from "./AboutView.vue"
import ProductsView from "./ProductsView.vue"
import OrderView from "./OrderView.vue"

const routes = [
  { path: "/", component: HomeView },
  { path: "/about", component: AboutView },
  { path: "/products", component: ProductsView },
  { path: "/order", component: OrderView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
