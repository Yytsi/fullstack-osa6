import { createContext, useReducer, useEffect, useRef } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const setNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    data: message
  }
}

export const NotificationProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  const timeoutID = useRef(null)

  useEffect(() => {
    if (timeoutID.current) {
      clearTimeout(timeoutID.current)
    }

    if (notification) {
      timeoutID.current = setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }

    return () => {
      if (timeoutID.current) {
        clearTimeout(timeoutID.current)
      }
    }
  }, [notification])

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch, setNotification]}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext