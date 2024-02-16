import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: ['initial notification', null],
  reducers: {
    setNotification(state, action) {
      return [action.payload.message, action.payload.timeoutID]
    },
    clearNotification() {
      return ['', null]
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer