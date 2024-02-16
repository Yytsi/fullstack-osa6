import { createSlice } from '@reduxjs/toolkit'

let timeoutId = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState: 'initial notification',
  reducers: {
    setNotificationAction(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

export const { setNotificationAction, clearNotification } = notificationSlice.actions

export const setNotification = (message, seconds) => {
  return async dispatch => {
    dispatch(setNotificationAction(message))
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer