import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'
import { createAnecdote } from '../requests'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatch, setNotification] = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const previousAnecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], [ ...previousAnecdotes, newAnecdote ])
      //queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value

    try {
      const res = newAnecdoteMutation.mutate({ content, votes: 0 })
      if (!res) throw Error("error creating anecdote")
      notificationDispatch(setNotification(`new anecdote '${content}' created`))
    } catch (error) {
      if (content.length < 5) {
        notificationDispatch(setNotification('too short anecdote, must have length 5 or more'))
      } else {
        notificationDispatch(setNotification('unknown rror creating anecdote'))
      }
      console.log(error)
    }
    
    event.target.anecdote.value = ''
    console.log('new anecdote')
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
