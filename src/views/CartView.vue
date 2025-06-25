<template>
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
</template>

<script setup>
    import "@/assets/cart.css"
    import { useSelector, useDispatch } from "@reduxjs/vue-redux"
    import { add as cartAdd, remove as cartRemove } from "../js/cart-slice.js"

    const products = useSelector(state => {
        return state.cart.container
    })
</script>
