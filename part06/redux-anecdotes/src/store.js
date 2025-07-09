import { configureStore} from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'



const store = configureStore({
    reducer: {
        anecdotes: anecdoteReducer,
        filter: filterReducer,
        notification: notificationReducer
    }
})

//anecdoteService.getAll().then(anecdotes =>
//    store.dispatch(setAnecdotes(anecdotes))
//)

export default store