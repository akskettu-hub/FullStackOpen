import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        notificationReducer(state, action) {
            state.push(
                action.payload
            )
        },
        setNotification(state, action) {
            console.log('notification for: ', action.payload)
            
            return action.payload
        },
        resetNotification() {
            console.log('resetting notification')
            return ''
        }
    }
})

export const notify = (notifyText, notifyTimeSeconds) => {
    return dispatch => {
        dispatch(setNotification(notifyText))

        setTimeout(() => {
            dispatch(resetNotification())
        }, notifyTimeSeconds * 1000 )
    }
}

export const { setNotification, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer