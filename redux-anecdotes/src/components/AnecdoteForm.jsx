import { useDispatch, useSelector } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  const addAnecdote = async (event) => {
    event.preventDefault()
    const timeoutID = notification[1]
    
    if (timeoutID !== null) {
      console.log("clearing old notification timeout")
      clearTimeout(timeoutID)
    }
    
    dispatch(setNotification({ message: `You created ${event.target.anecdote.value}`,
      timeoutID: setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)  
    }))

    try {
      const anecdoteObj = await anecdoteService.createNew(event.target.anecdote.value)
      dispatch(create(anecdoteObj))
      event.target.anecdote.value = ''
    } catch (error) {
      console.log(error)
    }
    
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