<template>
    <div class="cart-container">
        <table class="order-table">
            <thead>
                <tr>
                    <th scope="col" style="width: 10%">Design</th>
                    <th scope="col" style="width: 30%">Product</th>
                    <th scope="col" style="width: 20%">Price</th>
                    <th scope="col" style="width: 20%">Qty.</th>
                    <th scope="col" style="width: 20%">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in cart" :key="product.cart_id">
                    <td class="product-image-cell">
                        <div class="product-image-wrapper">
                            <img 
                                :src="product.image" 
                                :alt="product.product" 
                                class="product-thumbnail"
                            />
                        </div>
                    </td>
                    <th scope="row">{{ (product.image.search(/^blob/) != -1 ? "Custom " : "") + product.product }} - {{ product.size }}</th>
                    <td>${{ product.price.toFixed(2) }}</td>
                    <td>{{ product.quantity }}</td>
                    <td class="total-cell">
                        ${{ (product.quantity * product.price).toFixed(2) }}
                        <button class="cart-remove" :c_id="product.cart_id" @click="removeFromCart(product.cart_id)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </td>
                </tr> 
            </tbody>
        </table>

         <div class="checkout-panel" ref="checkoutPanel">
            <h3>Likes Summary</h3>
            <div class="summary-row">
                <span>Subtotal</span>
                <span>${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="summary-row">
                <span>Estimated Tax</span>
                <span>${{ tax.toFixed(2) }}</span>
            </div>
            <div class="summary-row total">
                <span>Estimated total</span>
                <span>${{ total.toFixed(2) }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
    import "@/assets/cart.css"
    import { useSelector, useDispatch } from "@reduxjs/vue-redux"
    import { add as cartAdd, remove as cartRemove, clear as cartClear } from "../js/cart-slice.js"
    import { computed, ref, nextTick, onMounted } from "vue"
    import { send as notifSend, close as notifClose } from "../js/notif-slice.js"
    import axios from "axios"

    const dispatch = useDispatch()
    const txt = ref("")
    const nextStep = ref(false)
    const checkoutPanel = ref(null)
    const emailRegex = /.+@.+\..+/
    let oldHeight = null

    onMounted(() => {
        setHeight()
    })

    const setHeight = async () => {
        if (!oldHeight) {
            oldHeight = checkoutPanel.value.style.height 
            await nextTick()
            const height = checkoutPanel.value.scrollHeight

            checkoutPanel.value.style.height = `${height}px`
        } else {
            checkoutPanel.value.style.height = oldHeight
        }
    }

    const removeFromCart = (id) => {
        dispatch(cartRemove(id))
    }

    const cart = useSelector(state => {
        return state.cart.container
    })

    const subtotal = computed(() => {
        return cart.value.reduce((sum, p) => sum + p.price * p.quantity, 0)
    })

    const tax = computed(() => {
        return subtotal.value * 0.08
    }) 

    const verifiedEmail = computed(() => {
        return emailRegex.test(txt.value)
    })

    const total = computed(() => {
        return subtotal.value + tax.value
    })
</script>
