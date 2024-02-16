import { useDispatch, useSelector } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  const addAnecdote = (event) => {
    event.preventDefault()
    const timeoutID = notification[1]
    
    if (timeoutID !== null) {
      console.log("clearing old notification timeout")
      clearTimeout(timeoutID)
    }
    
    dispatch(setNotification({message: `You created ${event.target.anecdote.value}`,
      timeoutID: setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)  
    }))

    dispatch(create(event.target.anecdote.value))
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm