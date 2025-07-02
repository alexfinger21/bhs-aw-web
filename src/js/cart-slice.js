import { createSlice } from "@reduxjs/toolkit"

const initialState = JSON.parse(localStorage.getItem("cart")) ?? {
    container: []
}

const updateCartIds = (container) => {
    for (const i in container) {
        container[i].cart_id = i
    }
}

export const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        add: (state, action) => {
            let f_idx = -1
            for (const idx in state.container) {
                let f = false
                for (const prop in action.payload) {
                    if (action.payload[prop] != state.container[idx][prop]) {
                        f = true
                        break
                    }
                }

                if (!f) {
                    f_idx = idx
                    break
                }
            }
            if (f_idx == -1) {
                state.container.push(Object.assign(action.payload, {quantity: 1}))
            } else {
                ++state.container[f_idx].quantity
            }
            updateCartIds(state.container)
            localStorage.setItem("cart", JSON.stringify(state))
        },
        remove: (state, action) => {
            state.container.splice(action.payload)
            updateCartIds(state.container)
            localStorage.setItem("cart", JSON.stringify(state))
        },
        clear: (state, action) => {
            state.container = []
            localStorage.removeItem("cart")
        }
    }
})

export const { add, remove, clear } = cartSlice.actions
export default cartSlice.reducer
