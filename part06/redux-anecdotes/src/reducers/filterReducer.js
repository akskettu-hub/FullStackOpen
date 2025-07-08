const filterReducer = (state = 'ALL', action) => {
  console.log('state now: ', state)
  //console.log('ACTION: ', action)
  
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload
        ? action.payload
        : 'ALL'
    default:
      return state
  }
}

export const filterChange = filter => {
    return {
        type: 'SET_FILTER',
        payload: filter
    }
}

export default filterReducer