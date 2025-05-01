<template>
  <div class="products-page">
    <Section :imageUrl="url1">
        <h1>Our Handcrafted Collection 🪵</h1>
        <div class="txt-block">
            <p>This is where you can order our handmade wooden cutting boards, coasters, etc bla bla bla baboom web words a loit more words and things</p>
        </div>
    </Section>
    <Divider/>
    
    <div class="product-grid">
      <div 
        v-for="product in products" 
        :key="product.id" 
        class="product-card"
        @click="viewProduct(product.id)"
      >
        <div class="product-image"></div>
        <div class="product-details">
          <h3 class="product-title">{{ product.name }}</h3>
          <p class="product-price">From ${{ product.startingPrice }}</p>
          <button class="btn" @click.stop="viewProduct(product.id)">View Options</button>
        </div>
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

const products = [
  {
    id: 1,
    name: "Artisan Wooden Bowl",
    startingPrice: 45.00,
    image: ""
  },
  {
    id: 2,
    name: "Maple Cutting Board",
    startingPrice: 65.00,
    image: ""
  },
  {
    id: 3,
    name: "Wooden Coaster Set",
    startingPrice: 28.00,
    image: ""
  }
]

const viewProduct = (id) => {
  router.push(`/details/${id}`)
}
</script>

