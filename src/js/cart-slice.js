import { createSlice } from "@reduxjs/toolkit"

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        container: []
    },
    reducers: {
        add: (state, action) => {
            state.container.push(action.payload)
        },
        remove: (state, action) => {
            state.container.splice(action.payload)
        }
    }
})

export const { add, remove } = cartSlice.actions
export default cartSlice.reducer
