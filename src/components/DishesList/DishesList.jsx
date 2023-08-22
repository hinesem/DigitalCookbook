import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DishesListItem from '../DishesListItem/DishesListItem';

function DishesList() {
  const dispatch = useDispatch();
  let dishes = useSelector(store => store.getDishesReducer);
  console.log(dishes);
  useEffect(() => {
    console.log('useEffect DishesList');
    const action = { type: 'GET_DISHES' };
    dispatch(action);
  }, []);

  return (
    <>
      {dishes.map((dish, i) => {
        return <DishesListItem key={i} dish={dish}/>;//dish is prop for dishes.router.js object info
        
      })} 
    </>
  );
}

export default DishesList;

//component of ingred list and and pulling 
// initial get req for dishes. I'd get dishes and all ingred in one GET
//when select dish item in right panel. map thur array of ingr and list them all
// in that list have an edit, and this will allow you editing the array.
// input box to add ing and when clicking it, have put req to update entire dish
//w new array of ingredients