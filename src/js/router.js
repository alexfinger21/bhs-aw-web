import { createWebHashHistory, createRouter } from "vue-router"

import HomeView from "../views/HomeView.vue"
import AboutView from "../views/AboutView.vue"
import ProductsView from "../views/ProductsView.vue"
import OrderView from "../views/OrderView.vue"

const routes = [
  { path: "/", component: HomeView },
  { path: "/about", component: AboutView },
  { path: "/products", component: ProductsView },
  { path: "/order", component: OrderView },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
