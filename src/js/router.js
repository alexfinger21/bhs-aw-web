import { createWebHashHistory, createRouter } from "vue-router"

import HomeView from "../views/HomeView.vue"
import ProductView from "../views/ProductView.vue"
import StoreView from "../views/StoreView.vue"
import CartView from "../views/CartView.vue"

const routes = [
  { path: "/", component: HomeView },
  { path: "/store", component: StoreView },
  { path: "/details/:id", component: ProductView },
  { path: "/likes", component: CartView }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//test

export default router
