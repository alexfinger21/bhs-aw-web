import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    visible: false,
    text: ""
}

let lastTick = 0

export const notifSlice = createSlice({
    name: "notif",
    initialState: initialState,
    reducers: {
        send: (state, action) => {
            state.visible = true
            state.text = action.payload
            lastTick = Date.now()
        },
        close: (state, action) => {
            if (Date.now() - lastTick >= 2499) {
                state.visible = false
            }
        }
    }
})

export const { send, close } = notifSlice.actions
export default notifSlice.reducer
