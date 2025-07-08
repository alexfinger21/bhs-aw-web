import { configureStore } from "@reduxjs/toolkit"
import cartReducer from "./cart-slice.js"
import notifReducer from "./notif-slice.js"

export default configureStore({
    reducer: {
        cart: cartReducer,
        notif: notifReducer
    },
})
