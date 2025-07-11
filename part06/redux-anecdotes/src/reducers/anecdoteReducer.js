import { createSlice} from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import { notify } from './notificationReducer'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    addVote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(a =>
        a.id !== id ? a : changedAnecdote
      )
    },
    appendAnecdote(state, action)  {
      state.push(action.payload)
    },
    setAnecdotes(state, action)  {
      return action.payload
    }
  }
})

export const { addAnecdote, addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    
    dispatch(addAnecdote(newAnecdote))
    dispatch(notify(`You added '${content}'`, 10))
  }
}

export const voteForAnecdote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    console.log('updated anechdote: ', updatedAnecdote)
    const newAnecdote = await anecdoteService.updateVotes(updatedAnecdote, anecdote.id)
    
    dispatch(addVote(newAnecdote.id))
    dispatch(notify(`You voted '${newAnecdote.content}'`, 5))
  }
}

export default anecdoteSlice.reducer