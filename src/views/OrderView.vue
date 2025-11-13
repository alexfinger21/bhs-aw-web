<template>
  <div class="products-page">
    <Section :imageUrl="url1">
        <h1>Our Handcrafted Collection 🪵</h1>
        <div class="txt-block">
            <p>From cutting boards to rustic signs — pick your favorite or create something one-of-a-kind.</p>
        </div>
    </Section>
    <Divider :margin="3"/>
    
    <div v-if="products" class="product-grid">
      <div 
        v-for="product in products" 
        :key="product.id" 
        class="product-card"
        @click="viewjjjjjProduct(product.id)"
      >
        <img class="product-image" :src="product.imgThumbnail"/>
        <div class="product-details-o">
          <h3 class="product-title">{{ product.name }}</h3>
          <p class="product-price">From ${{ product.startingPrice}}</p>
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

class Product {
    #starting_p

    constructor(name, imgs = [], id, sizes = {}, starting_p, thumbnail = 0) {
        this.name = name
        this.imgs = imgs
        this.thumbnail = thumbnail 
        this.id = id
        this.sizes = sizes
        this.#starting_p = starting_p
        this.actual_starting_p = starting_p + Object.values(this.sizes).sort()[0]
    }

    get startingPrice() {
        return this.actual_starting_p
    }

    get imgThumbnail() {
        return this.imgs[this.thumbnail]
    }
}

const CuttingBoards = new Product("Cutting Board", [
    "https://avatars.githubusercontent.com/u/61606770?v=4", 
    "https://i.ytimg.com/vi/8p-hs-5tKmM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBIJF1_RtUZ4srWnx40bv2b-fQKsg"],
    0, {"small": 5, "medium": 10, "large": 15}, 15, 0
)


const products = ref({}) 
onMounted(async () => {
    try {
        products.value = [CuttingBoards]
    } catch (err) {
        console.warn("NET ERR", err)
        products.value = null
    }
})

const viewProduct = (id) => {
  router.push(`/details/${id}`)
}
</script>

