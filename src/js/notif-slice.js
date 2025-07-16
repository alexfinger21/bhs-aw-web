import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    visible: false,
    success: true,
    message: ""
}

let lastTick = 0

export const notifSlice = createSlice({
    name: "notif",
    initialState: initialState,
    reducers: {
        send: (state, action) => {
            state.visible = true
            state.message = action.payload.message
            state.success = action.payload.success
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
