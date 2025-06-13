import { createSlice } from "@reduxjs/toolkit"

const initialState = JSON.parse(localStorage.getItem("cart")) ?? {
    container: []
}

export const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        add: (state, action) => {
            state.container.push(action.payload)
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
