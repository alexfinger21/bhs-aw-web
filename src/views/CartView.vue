<template>
    <div class="cart-container">
        <table class="order-table">
            <thead>
                <tr>
                    <th scope="col" style="width: 10%">Image</th>
                    <th scope="col" style="width: 30%">Product</th>
                    <th scope="col" style="width: 20%">Price</th>
                    <th scope="col" style="width: 20%">Quantity</th>
                    <th scope="col" style="width: 20%">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.cart_id">
                    <td class="product-image-cell">
                        <div class="product-image-wrapper">
                            <img 
                                v-if="product.image" 
                                :src="product.image" 
                                :alt="product.product" 
                                class="product-thumbnail"
                            />
                            <div v-else class="image-placeholder">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                    <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                    <polyline points="21 15 16 10 5 21"></polyline>
                                </svg>
                            </div>
                        </div>
                    </td>
                    <th scope="row">{{ (product.image.search(/^blob/) != -1 ? "Custom " : "") + product.product }} - {{ product.size }}</th>
                    <td>${{ product.price.toFixed(2) }}</td>
                    <td>{{ product.quantity }}</td>
                    <td>${{ (product.quantity * product.price).toFixed(2) }}</td>
                </tr> 
            </tbody>
        </table>

         <div class="checkout-panel">
            <h3>Order Summary</h3>
            <div class="summary-row">
                <span>Subtotal</span>
                <span>${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="summary-row">
                <span>Estimated Tax</span>
                <span>${{ tax.toFixed(2) }}</span>
            </div>
            <div class="summary-row total">
                <span>Total</span>
                <span>${{ total.toFixed(2) }}</span>
            </div>
            <button class="checkout-button" :disabled="!products.length" :class="{'grey-out': !products.length}" @click="PlaceOrder">{{products.length ? "Email Order" : "Your cart is empty"}} </button>
        </div>
    </div>
</template>

<script setup>
    import "@/assets/cart.css"
    import { useSelector, useDispatch } from "@reduxjs/vue-redux"
    import { add as cartAdd, remove as cartRemove, clear as cartClear } from "../js/cart-slice.js"
    import { computed } from "vue"

    const dispatch = useDispatch()

    const products = useSelector(state => {
        return state.cart.container
    })

    const subtotal = computed(() => {
        return products.value.reduce((sum, p) => sum + p.price * p.quantity, 0)
    })


    const tax = computed(() => {
        return subtotal.value * 0.08
    }) 

    const total = computed(() => {
        return subtotal.value + tax.value
    })

    const PlaceOrder = () => {
        if (products.value.length) {
            dispatch(cartClear())
        }
    }

</script>
