const filterReducer = (state = "", action) => {
  console.log('filter state before this: ', state)
  console.log('filter action', action)

  if (action.type === 'SET_FILTER') {
    return action.payload
  }

  return state
}

const setFilter = (content) => {
  return {
    type: 'SET_FILTER',
    payload: content
  }
}

export default filterReducer
export { setFilter }