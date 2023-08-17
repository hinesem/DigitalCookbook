import { takeEvery, put } from 'redux-saga/effects';

function* postDishesFunction(action) {
  try {
    const response = yield fetch('/api/dishes/addDish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dishName: action.payload })
    });
    put({ type: 'GET_DISHES' })//getDishes.saga.js
    console.log('successful POST', response);
  } catch (error) {
    console.log(`fetching feedback failed ${error}`)
  }
}

function* postDishesSaga() {
  yield takeEvery('POST_DISHES', postDishesFunction)
}

export default postDishesSaga;