import { React } from 'react';
import { useDispatch } from 'react-redux';

// let props = {   
//   dishes: dishes,
//   dish: dish,
// }  
// <-- when calling dishesListItem calling this component and passing sth we pass props, which is an object (props is the object) every time

function DishesListItem({ dish }) { //this is an object, and we can pass more than just taco, so long as we give it a name in return disheslist.jsx
  //each property is the name of a prop
  //function DishesListItem({taco, burger})  <-- destructuring object
  // const [dishList, setDishList] = useState([]);
  // const [dishName, setDishName] = useState('');
  // let dishItem = {dishName: dishName}
  console.log('DishesListItem:', dish);
  const dispatch = useDispatch();

  // useEffect(() => {

  // })

  function getDish() {
    return fetch('/api/dishes/getDishes')
      .then(response => response.json())
      .catch((error) => {
        console.error('error', error);
      });
  }

  function deleteDish(id) {
    return fetch(`/api/dishes/${id}`, {
      method: 'DELETE'
    }).then((response) => {
      console.log(response);
      dispatch({ type: 'GET_DISHES' })
      // getDish().then(dishes => {
      //   console.log(dishes)
      //   setDishList(dishes)
      // });
    }).catch((error) => {
      console.error(error);
    })
  }

  return (
    <>
      <div>{dish.dish_name}
        <button type="button" classname="deleteBtn" onClick={() => deleteDish(dish.id)}>delete</button>
      </div>
    </>
  );
}

export default DishesListItem;
