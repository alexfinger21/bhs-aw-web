<template>
  <div class="product-detail">
    <div class="product-gallery">
      <div class="main-image"></div>
    </div>
    
    <div class="product-info">
      <h1 class="artisan-heading">{{ product.name }}</h1>
      <p class="price">${{ selectedPrice || product.startingPrice }}</p>
      <p class="description">{{ product.description }}</p>
      
      <div class="options">
        <div class="option-group">
          <label>Size:</label>
          <select v-model="selectedSize" class="artisan-select">
            <option 
              v-for="size in product.sizes" 
              :value="size"
              :key="size.name"
            >
              {{ size.name }} (+${{ size.priceDelta }})
            </option>
          </select>
        </div>
        
        <div class="option-group">
          <label>Wood Type:</label>
          <select v-model="selectedWood" class="artisan-select">
            <option 
              v-for="wood in product.woodTypes" 
              :value="wood"
              :key="wood.name"
            >
              {{ wood.name }} (+${{ wood.priceDelta }})
            </option>
          </select>
        </div>
        
        <div class="option-group">
          <label>Finish:</label>
          <select v-model="selectedFinish" class="artisan-select">
            <option 
              v-for="finish in product.finishes" 
              :value="finish"
              :key="finish.name"
            >
              {{ finish.name }}
            </option>
          </select>
        </div>
      </div>
      
      <button class="checkout-btn" @click="addToCart">Add to Cart</button>
    </div>
  </div>
</template>

<script setup>
import "@/assets/product.css"
import { ref, computed } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const productId = parseInt(route.params.id)

const products = [
  {
    id: 1,
    name: "Artisan Wooden Bowl",
    startingPrice: 45.00,
    image: "",
    description: "Hand-turned from locally sourced hardwood. Each piece is unique with natural wood grain variations.",
    sizes: [
      { name: "Small (8\")", priceDelta: 0 },
      { name: "Medium (10\")", priceDelta: 15 },
      { name: "Large (12\")", priceDelta: 25 }
    ],
    woodTypes: [
      { name: "Oak", priceDelta: 0 },
      { name: "Walnut", priceDelta: 10 },
      { name: "Cherry", priceDelta: 8 }
    ],
    finishes: [
      { name: "Natural" },
      { name: "Beeswax" },
      { name: "Food-Safe Oil" }
    ]
  }
]

const product = products.find(p => p.id === productId)

const selectedSize = ref(product.sizes[0])
const selectedWood = ref(product.woodTypes[0])
const selectedFinish = ref(product.finishes[0])

const selectedPrice = computed(() => {
  return product.startingPrice + selectedSize.value.priceDelta + selectedWood.value.priceDelta
})

const addToCart = () => {
  console.log("Added to cart:", {
    product: product.name,
    size: selectedSize.value,
    wood: selectedWood.value,
    finish: selectedFinish.value,
    price: selectedPrice.value
  })
}
</script>

