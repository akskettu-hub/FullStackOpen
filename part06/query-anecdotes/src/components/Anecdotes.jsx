import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateAnecdote } from "../requests"
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const Anecdotes = ({ anecdotes }) => {
    const queryClient = useQueryClient()

    const [notify, dispatch] = useContext(NotificationContext)

    const updateAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
        },
    })

    const handleVote = (anecdote) => {
        console.log('vote for: ', anecdote)
        updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})

        dispatch({type: 'SET', message: `Voted anecdote '${anecdote.content}'`})

        setTimeout(() => {
        dispatch({ type: 'CLR' })
        }, 5000)
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>                
            )}
        </div>
    )
}

export default Anecdotes