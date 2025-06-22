<template>
    <table class="order-table">
        <thead>
            <tr>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="product in products"
                :key="product.id"
            >
            </tr> 
        </tbody>
    </table>
</template>

<script setup>
    import "@/assets/cart.css"
</script>
