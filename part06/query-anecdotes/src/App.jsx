import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdote } from './requests'
import { useContext, useReducer } from 'react'
import NotificationContext from './NotificationContext'



const App = () => {
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const [notify, dispatch] = useContext(NotificationContext)

  const handleVote = (anecdote) => {
    console.log('vote for: ', anecdote)
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    dispatch({type: 'SET', message: `Voted anecdote '${anecdote.content}'`})

    setTimeout(() => {
      dispatch({ type: 'CLR' })
    }, 5000)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes 
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>{'Anecdote service is not available due to server problems :('}</div>
  }

  const anecdotes = result.data
  //<Notification />
  //<Anecdotes anecdotes={anecdotes}/>
  
  return (
    
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      
    
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

export default App