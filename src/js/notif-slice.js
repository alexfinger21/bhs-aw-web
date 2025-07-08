import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    visible: false,
    text: ""
}

export const notifSlice = createSlice({
    name: "notif",
    initialState: initialState,
    reducers: {
        send: (state, action) => {
            state.visible = true
            state.text = action.payload
        },
        close: (state, action) => {
            state.visible = false
        }
    }
})

export const { send, close } = notifSlice.actions
export default notifSlice.reducer
