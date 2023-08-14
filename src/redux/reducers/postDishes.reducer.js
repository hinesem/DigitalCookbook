function postDishesReducer(state=[], action) {
  if (action.type === 'POST_DISHES') {
    return action.payload;
  }
  return state;
}

export default postDishesReducer;