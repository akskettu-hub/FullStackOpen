import {  useDispatch } from 'react-redux'
import {  newAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        console.log('New anecdote:', content)
        dispatch(newAnecdote(content))
        dispatch(notify('ADD', content))
        
    }

    return (
        <div>
            <h2>new anecdote</h2>
            <form onSubmit={addAnecdote}>
                <div><input name='anecdote'/></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm
