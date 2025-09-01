<template>
  <div class="admin-page">
    <Section :imageUrl="url1">
        <h1>Admin Dashboard 🔧</h1>
        <div class="txt-block">
            <p>Manage products, view orders, and update your handcrafted collection</p>
        </div>
    </Section>
    <Divider :margin="3"/>
    
    <div class="admin-grid">
      <div class="admin-card" @click="navigateTo('/admin/products')">
        <div class="admin-icon">📦</div>
        <h3>Manage Products</h3>
        <p>Add, edit, or remove products from your collection</p>
      </div>
      
      <div class="admin-card" @click="navigateTo('/admin/orders')">
        <div class="admin-icon">📋</div>
        <h3>View Orders</h3>
        <p>See all customer orders and update their status</p>
      </div>
      
      <div class="admin-card" @click="navigateTo('/admin/analytics')">
        <div class="admin-icon">📊</div>
        <h3>Analytics</h3>
        <p>View sales data and performance metrics</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import "@/assets/order.css"
import { useRouter } from "vue-router"
import Section from "@/components/Section.vue"
import Divider from "@/components/Divider.vue"

const router = useRouter()

defineProps({
    url1: {
        type: String,
        default: String(new URL("../assets/imgs/bg-1.jpg", import.meta.url).href)
    }
})

const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.admin-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.admin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.admin-card {
  background: var(--primary-color);
  border: 1px solid var(--primary-lighter);
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.admin-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  background: var(--primary-light);
}

.admin-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.admin-card h3 {
  font-family: var(--web-font);
  color: var(--text-color);
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.admin-card p {
  color: var(--text-secondary);
  line-height: 1.5;
}

@media (max-width: 768px) {
  .admin-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .admin-grid {
    grid-template-columns: 1fr;
  }
}
</style>