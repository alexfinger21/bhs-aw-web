import { createWebHashHistory, createRouter } from "vue-router"

import HomeView from "../views/HomeView.vue"
import ProductView from "../views/ProductView.vue"
import OrderView from "../views/OrderView.vue"
import CartView from "../views/CartView.vue"
import AdminView from "../views/admin/RootView.vue"
import AdminOrderView from "../views/admin/OrderView.vue"

const routes = [
  { path: "/", component: HomeView },
  { path: "/order", component: OrderView },
  { path: "/details/:id", component: ProductView },
  { path: "/cart", component: CartView },
  { path: "/admin", component: AdminView },
  { path: "/admin/orders", component: AdminOrderView },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
