import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch({type: 'SET', message: `Added anecdote '${data.content}'`})

      setTimeout(() => {
        dispatch({ type: 'CLR' })
      }, 5000)
    },
    onError: (error) => {
      console.log('error: ', error)

      if (error.response.status === 400) {
        dispatch({type: 'SET', message: 'Anecdote too short, must have length of 5 or more'})

        setTimeout(() => {
          dispatch({ type: 'CLR' })
        }, 5000)
      }
    }
  })

  const [notification, dispatch] = useContext(NotificationContext)

  console.log('anformcontext', notification, dispatch)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote: ', content)
    
    newAnecdoteMutation.mutate({ content, votes: 0})
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm