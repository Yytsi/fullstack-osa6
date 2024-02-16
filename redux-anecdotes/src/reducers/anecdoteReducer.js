import { createSlice } from '@reduxjs/toolkit'

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
      state.push({
        content: action.payload,
        id: (100000 * Math.random()).toFixed(0),
        votes: 0
      })
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, create, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer