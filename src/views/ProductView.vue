<template>
    <!-- Error state -->
    <div v-if="loading" class="loading-container">
        <div class="loading-spinner"></div>
    </div>

    <div v-else-if="error" class="error-message">
        Failed to load product. Check your internet connection or report a bug
    </div>

    <!-- Loaded state -->
    <div v-else class="product-detail">
        <div class="mobile header">
            <h1>{{ product?.name || 'Loading...' }}</h1>
            <div class="product-meta">
                <span class="product-sku">SKU: {{ product?.id ?? 'N/A' }}</span>
                <span class="product-rating">★★★★★ (reviews coming soon)</span>
            </div>
        </div>
        <div class="product-gallery">
            <div class="image-carousel">
                <button class="carousel-btn prev" @click="prevImage" :disabled="currentImageIndex === 0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                
                <div class="main-image-container">
                    <transition name="fade">
                        <img 
                            :key="currentImageIndex"
                            :src="product.imgs[currentImageIndex]" 
                            :alt="product.name"
                            class="main-image"
                        />
                    </transition>
                </div>
                
                <button class="carousel-btn next" @click="nextImage" :disabled="currentImageIndex === product.imgs.length - 1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
            
            <div class="thumbnail-container">
                <div 
                    v-for="(image, index) in product.imgs" 
                    :key="index"
                    class="thumbnail"
                    :class="{ active: currentImageIndex === index }"
                    @click="currentImageIndex = index"
                >
                    <img :src="image" :alt="`Thumbnail ${index + 1}`" />
                </div>
            </div>
        </div>

        <div class="product-info">
            <div class="desktop header">
                <h1>{{ product?.name || 'Loading...' }}</h1>
                <div class="product-meta">
                    <span class="product-sku">SKU: {{ product?.id ?? 'N/A' }}</span>
                    <span class="product-rating">★★★★★ (reviews coming soon)</span>
                </div>
            </div>
            
            <template v-if="product?.sizes">
                <p class="price">${{ selectedSize ? (product.starting_p + product.sizes[selectedSize]).toFixed(2) : '--' }}</p>
                <p class="product-description">{{ product.description }}</p>

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

            <template v-if="product?.allow_custom">
                <input 
                    type="file"
                    ref="fileInput"
                    accept="image/*"
                    @change="handleFileUpload"
                    class="hidden-input"
                />

                <div class="options">
                    <div class="option-group">
                        <label>Custom design:</label>
                        <button 
                            @click="triggerFileInput"
                            class="upload-button"
                            v-if="!imageUrl"
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
                                <line x1="16" y1="5" x2="22" y2="5"></line>
                                <line x1="19" y1="2" x2="19" y2="8"></line>
                                <circle cx="9" cy="9" r="2"></circle>
                                <path d="M21 15c-3.87-3.87-9-5-9-5s-1.13 4.13-5 9"></path>
                            </svg>
                            Upload Image
                        </button>  
                        <div class="image-preview-container" v-if="imageUrl">
                            <div class="preview-wrapper">
                                <img :src="imageUrl" alt="Preview" class="preview-image" />
                                <button @click="removeImage" class="remove-btn" aria-label="Remove image">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <div class="product-actions">
                <div class="quantity-selector">
                    <button :style="{ color: qty1Color }" class="qty-btn" @click="decrementQuantity">−</button>
                    <span class="quantity">{{ quantity }}</span>
                    <button :style="{ color: qty2Color }" class="qty-btn" @click="incrementQuantity">+</button>
                </div>
                <button 
                    class="checkout-btn" 
                    @click="addToCart"
                    >
                    {{ productLoaded ? 'Add to Cart' : 'Loading...' }}
                </button>
            </div>
            
            <div class="product-details">
                <div class="detail-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    <span>Handcrafted in our workshop</span>
                </div>
                <div class="detail-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
                    </svg>
                    <span>Natural wood variations expected</span>
                </div>
                <div class="detail-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                    <span>Support Beachwood High School</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import "@/assets/product.css"
import { ref, computed, onMounted } from "vue"
import { useRoute } from "vue-router"
import axios from "axios"
import { useSelector, useDispatch } from "@reduxjs/vue-redux"
import { add as cartAdd, remove as cartRemove } from "../js/cart-slice.js"
import { send as notifSend, close as notifClose } from "../js/notif-slice.js"

const route = useRoute()
const productId = parseInt(route.params.id)

const product = ref({
    imgs: [] 
})

const loading = ref(true)
const fileInput = ref(null) 
const error = ref(null)
const selectedSize = ref(null)
const qty1Color = ref("red")
const qty2Color = ref("")
const currentImageIndex = ref(0)
const quantity = ref(1)
const imageUrl = ref(null)
const dispatch = useDispatch()
const MAX_IMAGE_SIZE = 1024*1024*1.5

const cart = useSelector(state => {
    return state.cart.container
})

const MAX_Q = 5

const productLoaded = computed(() => {
    return product.value && Object.keys(product.value).length > 0
})

onMounted(async () => {
    try {
        const res = await axios.get(`http://localhost:3001/api/products/${productId}`)
        product.value = {
            ...res.data,
            imgs: Object.values(res.data.imgs) 
        }
        selectedSize.value = Object.keys(res.data.sizes)[0] 
    } catch (err) {
        console.error("Failed to fetch product:", err)
        error.value = err.message
    } finally {
        loading.value = false
    }
})

const nextImage = () => {
    if (currentImageIndex.value < Object.keys(product.value.imgs).length - 1) {
        ++currentImageIndex.value
    }
}

const prevImage = () => {
    if (currentImageIndex.value > 0) {
        --currentImageIndex.value
    }
}

const removeImage = () => {
    imageUrl.value = null
    product.value.imgs.shift()
    --currentImageIndex.value
    currentImageIndex.value = Math.max(0, Math.min(product.value.imgs.length - 1, currentImageIndex.value))
}

const triggerFileInput = () => {
    fileInput.value.click()
}

const handleFileUpload = (event) => {
    const file = event.target.files?.[0]

    if (file.size > MAX_IMAGE_SIZE) {
        dispatch(notifSend({success: false, message: "Image is too large (>1.5mb)"}))
    }

    if (!file || file.size > MAX_IMAGE_SIZE || file.type.substring(0, 6) != "image/") return;
    const url = URL.createObjectURL(file)

    product.value.imgs.unshift(url)
    imageUrl.value = url

}

const incrementQuantity = () => {
    quantity.value = Math.min(5, quantity.value + 1)
    
    if (qty2Color.value != "red") {
        if (quantity.value == MAX_Q) {
            qty1Color.value = qty2Color.value 
            qty2Color.value = "red" 
        } else {
            qty1Color.value = qty2Color.value 
        }
    }
}

const decrementQuantity = () => {
    quantity.value = Math.max(1, quantity.value - 1)
    if (qty1Color.value != "red") {
        if (quantity.value == 1) {
            qty2Color.value = qty1Color.value 
            qty1Color.value = "red" 
        } else {
            qty2Color.value = qty1Color.value 
        }
    }
}

const asyncRead = async (reader, url_blob) => {
    return new Promise((res, rej) => {
        const evt = reader.addEventListener("load", () => {
            reader.removeEventListener("load", evt)
            return res(reader.result)
        })
        
        reader.readAsDataURL(url_blob)
    }) 
}

const addToCart = async () => {
    const reader = new FileReader()
    for (let i = 0; i<quantity.value; ++i) {
        let fallback = null
        if (imageUrl.value) {
            const blob = await axios.get(imageUrl.value, {responseType: "blob"})
            fallback = await asyncRead(reader, blob.data)
            imageUrl.value = fallback
        }

        dispatch(cartAdd({
            product: product.value.name,
            size: selectedSize.value,
            price: product.value.starting_p + product.value.sizes[selectedSize.value],
            image: fallback ?? product.value.imgs[0],
        })) 
    }

    dispatch(notifSend({success: true, message: "Added to cart successfully!"}))

    setTimeout(() => {
        dispatch(notifClose())
    }, 2500)
}
</script>
