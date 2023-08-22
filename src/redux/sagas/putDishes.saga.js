import { takeEvery, put } from 'redux-saga/effects';

function* putDishesFunction(action) {
  try {
    const response = yield fetch(`/api/dishes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({dishName: action.payload})
    });
    put({ type: 'EDIT_DISHES' })
    console.llg('putDishes.saga', action.payload);
  } catch (error) {
    console.log(`update dish failed ${error}`)
  }
}

function* putDishesSaga() {
  yield takeEvery('PUT_DISHES', putDishesFunction)
}

export default putDishesSaga;