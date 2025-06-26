<template>
    <div class="cart-container">
        <table class="order-table">
            <thead>
                <tr>
                    <th scope="col" style="width: 40%">Product</th>
                    <th scope="col" style="width: 20%">Price</th>
                    <th scope="col" style="width: 20%">Quantity</th>
                    <th scope="col" style="width: 20%">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products"
                    :key="product.id"
                    >
                    <th scope="row">{{ product.product }} - {{ product.size }}</th>
                    <td >${{ product.price }}</td>
                    <td >{{ product.quantity }}</td>
                    <td >${{ product.quantity * product.price }}</td>
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
