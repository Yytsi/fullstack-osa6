import { useSelector, useDispatch } from 'react-redux'
import { create, vote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const voteForAnecdote = (id) => {
    dispatch(vote(id))
  }

  const createAnecdote = (event) => {
    event.preventDefault()
    dispatch(create(event.target.anecdoteText.value))
    event.target.anecdoteText.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteForAnecdote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name="anecdoteText" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App