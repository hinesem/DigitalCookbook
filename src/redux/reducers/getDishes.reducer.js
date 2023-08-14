function getDishesReducer(state = [], action) {
  if (action.type === 'SET_DISHES') { //reducer SET_DISHES updates the state with the array of information from the DB
    return action.payload;
  }

  return state;
}

export default getDishesReducer;