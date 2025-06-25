import { createSlice } from "@reduxjs/toolkit"

const initialState = JSON.parse(localStorage.getItem("cart")) ?? {
    container: []
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
            localStorage.setItem("cart", JSON.stringify(state))
        },
        remove: (state, action) => {
            state.container.splice(action.payload)
            localStorage.setItem("cart", JSON.stringify(state))
        }
    }
})

export const { add, remove } = cartSlice.actions
export default cartSlice.reducer
