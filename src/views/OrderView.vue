<template>
  <div class="products-page">
    <Section :imageUrl="url1">
        <h1>Our Handcrafted Collection 🪵</h1>
        <div class="txt-block">
            <p>This is where you can order our handmade wooden cutting boards, coasters, etc bla bla bla baboom web words a loit more words and things</p>
        </div>
    </Section>
    <Divider/>
    
    <div v-if="products" class="product-grid">
      <div 
        v-for="product in products" 
        :key="product.id" 
        class="product-card"
        @click="viewProduct(product.id)"
      >
        <div class="product-image"></div>
        <div class="product-details">
          <h3 class="product-title">{{ product.name }}</h3>
          <p class="product-price">From ${{ product.starting_p + Object.values(product.sizes).slice().sort((a, b) => a - b)[0]}}</p>
          <button class="btn" @click.stop="viewProduct(product.id)">View Options</button>
        </div>
      </div>
    </div>
    <div v-else>
        <h4>Hmm... no products found - Check your internet connection or report a bug</h4>
    </div>
  </div>
</template>

<script setup>
import "@/assets/order.css"
import { useRouter } from "vue-router"
import Section from "@/components/Section.vue"
import Divider from "@/components/Divider.vue"
import axios from "axios"
import {ref, onMounted} from "vue"

const router = useRouter()

defineProps({
    url1: {
        type: String,
        default: String(new URL("../assets/imgs/bg-1.jpg", import.meta.url).href)
    }
})

const products = ref({}) 
onMounted(async () => {
    try {
        const res = await axios.get("http://localhost:3001/api/products")
        res.data = res.data.filter(e => e.name != "test")
        products.value = res.data 
    } catch (err) {
        console.warn("NET ERR", err)
        products.value = null
    }
})

const viewProduct = (id) => {
  router.push(`/details/${id}`)
}
</script>

