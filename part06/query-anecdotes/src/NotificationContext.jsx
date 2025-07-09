import { createContext, useContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET":
        return action.message
    case "CLR":
        return ''
    default:
        return state
  }
}

const NotificationContext = createContext()


export const NotificationContextProvider = props => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, 'something')
    return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
        {props.children}
    </NotificationContext.Provider>
    )
}

export default NotificationContext