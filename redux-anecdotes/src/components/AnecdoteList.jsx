import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const notification = useSelector(state => state.notification)

  const voteForAnecdote = (id) => {
    dispatch(vote(id))
    const timeoutID = notification[1]
    if (timeoutID !== null) {
      console.log("clearing old notification timeout")
      clearTimeout(timeoutID)
    }
    
    dispatch(setNotification({message: `You voted for '${anecdotes.find(anecdote => anecdote.id === id).content}'`,
      timeoutID: setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)  
    }))
    
  }

  return (
    <div>
      {[...anecdotes.filter(anecdote => !filter ? true : anecdote.content.toLowerCase().includes(filter.toLowerCase()))]
      .sort((a,b) => b.votes - a.votes).map(anecdote =>
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
    </div>
  )
}

export default AnecdoteList