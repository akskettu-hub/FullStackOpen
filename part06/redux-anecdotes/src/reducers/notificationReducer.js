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
            const anecdoteVotedFor = action.payload.content
            const notificationType = action.payload.type
            console.log('notification for: ', notificationType, anecdoteVotedFor)
            
            if (notificationType === 'VOTE') {
                return `You voted '${anecdoteVotedFor}'`
            } else if (notificationType === 'ADD') {
                return `You added '${anecdoteVotedFor}'`
            }
            return anecdoteVotedFor
        },
        resetNotification() {
            console.log('resetting notification')
            return ''
        }
    }
})

export const notify = (type, content) => {
    const payload = {type: type, content: content}
    return dispatch => {
        dispatch(setNotification(payload))

        setTimeout(() => {
            dispatch(resetNotification())
        }, 5000 )
    }
}

export const { setNotification, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer