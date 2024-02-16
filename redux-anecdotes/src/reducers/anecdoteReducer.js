import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action) {
      return state.map(a => a.id !== action.payload ? a : {
        ...a,
        votes: a.votes + 1
      })
    },
    create(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, create, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(create(newAnecdote))
  }
}

export const voteAnecdote = (anecdoteId) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.voteForAnecdote(anecdoteId)
    dispatch(vote(updatedAnecdote.id))
  }
}

export default anecdoteSlice.reducer