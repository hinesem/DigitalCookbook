import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DishesListItem from '../DishesListItem/DishesListItem';

function DishesList() {
  const dispatch = useDispatch();
  let dishes = useSelector(store => store.getDishesReducer);
  
  useEffect(() => {
    console.log('useEffect DishesList');
    const action = { type: 'GET_DISHES' };
    dispatch(action);
  }, []);

  return (
    <>
      {dishes.map((dish, i) => {
        return <DishesListItem key={i} dish={dish}/>;
      })} 
    </>
  );
}

export default DishesList;

