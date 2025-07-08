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
                <tr v-for="product in products" :key="product.cart_id">
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
                        <button class="cart-remove" :c_id="product.cart_id" @click="removeFromCart">
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

            <label v-if="nextStep" id="email-label" for="input-email">Email:</label>
            <input v-if="nextStep" name="email" type="email" autocomplete="email" id="input-email" :value="txt" @input="event => txt = event.target.value"></input>

            <button class="checkout-button" :disabled="!products.length" :class="{'grey-out': !(products.length && (!nextStep || verifiedEmail))}" @click="PlaceOrder">{{products.length ? (nextStep ? "Place Order" : "Continue") : "Your cart is empty"}} </button>
        </div>
    </div>
</template>

<script setup>
    import "@/assets/cart.css"
    import { useSelector, useDispatch } from "@reduxjs/vue-redux"
    import { add as cartAdd, remove as cartRemove, clear as cartClear } from "../js/cart-slice.js"
    import { computed, ref, nextTick, onMounted } from "vue"
    import { send as notifSend, close as notifClose } from "../js/notif-slice.js"

    const dispatch = useDispatch()
    const txt = ref("")
    const nextStep = ref(false)
    const checkoutPanel = ref(null)
    const emailRegex = /.+@.+\..+/

    onMounted(() => {
        setHeight()
    })

    const setHeight = async () => {
        await nextTick()
        const height = checkoutPanel.value.scrollHeight

        checkoutPanel.value.style.height = `${height}px`
    }

    const removeFromCart = (e) => {
        dispatch(cartRemove(e.target.getAttribute("c_id")))
    }

    const products = useSelector(state => {
        return state.cart.container
    })

    const subtotal = computed(() => {
        return products.value.reduce((sum, p) => sum + p.price * p.quantity, 0)
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

    const PlaceOrder = () => {
        if (!products.value.length) return
        if (!nextStep.value) {
            nextStep.value = true
            setHeight()
        } else {
            dispatch(notifSend("Order placed succesfully!"))            
            setTimeout(()=> {
                dispatch(notifClose())            
            }, 2500)

            dispatch(cartClear())
        }
    }

</script>
