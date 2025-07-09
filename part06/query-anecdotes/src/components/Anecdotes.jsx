import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateAnecdote } from "../requests"



const Anecdotes = (anecdotes) => {
    const queryClient = useQueryClient()

    const updateAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
        },
    })

    const handleVote = (anecdote) => {
        console.log('vote for: ', anecdote)
        updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
        //notify(`Voted for '${anecdote.content}'`)
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