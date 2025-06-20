import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./cart-slice.js"

export default configureStore({
    reducer: {
        cart: cartReducer,
    },
})
