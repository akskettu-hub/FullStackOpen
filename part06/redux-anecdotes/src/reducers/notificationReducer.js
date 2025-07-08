import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'Notification Go here',
    reducers: {
        notificationReducer(state, action) {
            state.push(
                action.payload
            )
        }
    }
})

export default notificationSlice.reducer