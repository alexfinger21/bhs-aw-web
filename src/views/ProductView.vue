<template>
    <!-- Loading state -->
    <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="error-message">
        Failed to load product. Please try again later.
    </div>

    <!-- Loaded state -->
    <div v-else class="product-detail">
        <div class="product-gallery">
            <div class="main-image" v-if="product.image">
                <!-- Image will appear here when loaded -->
            </div>
            <div v-else class="image-placeholder"></div>
        </div>

        <div class="product-info">
            <h1>{{ product?.name || 'Loading...' }}</h1>
            <template v-if="product.sizes">
                <Divider/>
                <p class="price">${{ selectedSize ? product.starting_p + product.sizes[selectedSize] : '--' }}</p>

                <div class="options">
                    <div class="option-group">
                        <label>Size:</label>
                        <select 
                            v-model="selectedSize" 
                            class="artisan-select"
                            v-if="product.sizes"
                            >
                            <option 
                            v-for="[size, price] of Object.entries(product.sizes)" 
                            :value="size"
                            :key="size"
                            >
                            {{ size }} (+${{ price }})
                            </option>
                        </select>
                            <div v-else class="select-placeholder"></div>
                    </div>
                </div>
            </template>

            <button 
                class="checkout-btn" 
                @click="addToCart"
                :disabled="!productLoaded"
                >
                {{ productLoaded ? 'Add to Cart' : 'Loading...' }}
            </button>
        </div>
    </div>
</template>

<script setup>
import "@/assets/product.css"
import { ref, computed, onMounted } from "vue"
import { useRoute } from "vue-router"
import axios from "axios"
import Divider from "../components/Divider.vue"
import { useSelector, useDispatch } from "@reduxjs/vue-redux"
import { add as cartAdd, remove as cartRemove } from "../js/cart-slice.js"

const route = useRoute()
const productId = parseInt(route.params.id)

const product = ref({})
const loading = ref(true)
const error = ref(null)
const selectedSize = ref(null)
const dispatch = useDispatch()
const cart = useSelector(state => {
    return state.cart.container
})

const productLoaded = computed(() => {
    return product.value && Object.keys(product.value).length > 0
})

onMounted(async () => {
    try {
        const res = await axios.get(`http://localhost:3001/api/products/${productId}`)
        console.log(res.data)
        product.value = res.data
        selectedSize.value = Object.keys(res.data.sizes)[0] // Set first size as default
    } catch (err) {
        console.error("Failed to fetch product:", err)
        error.value = err.message
    } finally {
        loading.value = false
    }
})

const addToCart = () => {
    if (!productLoaded.value) return

    dispatch(cartAdd({
        product: product.value.name,
        size: selectedSize.value,
        price: product.value.starting_p + product.value.sizes[selectedSize.value]
    })) 
}

</script>
