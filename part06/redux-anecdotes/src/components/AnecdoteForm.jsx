import {  useDispatch } from 'react-redux'
import {  createAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import noteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        console.log('New anecdote:', content)

        const newAnecdote = await noteService.createNew(content)
        dispatch(createAnecdote(newAnecdote))
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
