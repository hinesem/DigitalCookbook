import { takeEvery, put } from 'redux-saga/effects';

function* getDishesFunction() {
  console.log('getDishesSaga working');
  try {
    const response = yield fetch('/api/dishes/getDishes');
    const dishes = yield response.json();
    yield put({type: 'SET_DISHES', payload: dishes}); //SET_DISHES makes a call to our store
  } catch (error) {
    console.log('fetching dishes failed: ', error);
  }
}

function* getDishesSaga() {
  yield takeEvery('GET_DISHES', getDishesFunction); //calls function on line 3
}

export default getDishesSaga;