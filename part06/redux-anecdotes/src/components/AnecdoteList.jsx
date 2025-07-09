import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        return state.filter === 'ALL'
            ? state.anecdotes
            : state.anecdotes.filter(a => a.content.includes(state.filter))
    })
    const dispatch = useDispatch()
    
    const vote = ({id, content}) => {
        console.log('vote', id)
        dispatch(voteForAnecdote(id))
        dispatch(notify('VOTE', content))
    }

    console.log(anecdotes)

    return (
        <div>
            {[...anecdotes]
                .sort((a, b) => b.votes - a.votes)
                .map(anecdote =>
                    <div key={anecdote.id}>
                        <div>
                            {anecdote.content}
                        </div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote)}>vote</button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default AnecdoteList