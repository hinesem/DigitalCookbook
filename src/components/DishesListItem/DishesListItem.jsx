import { React } from 'react';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

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
  const [dishName, setDishName] = useState('')
  const [dishIngredients, setDishIngredients] = useState('');
  const [dishInstructions, setDishInstructions] = useState('');
  const [editDish, setEditDish] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isCurrentlyEditing, setIsCurrentlyEditing] = useState(null);
  


  function updateDish(dishName, dishIngredients, dishInstructions) {
    let dish = { dishName, dishIngredients, dishInstructions }
    return fetch(`/api/dishes${isCurrentlyEditing}`, {
      method: 'PUT',
      body: JSON.stringify(dish),
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      console.log(response);
    })
      .catch((error) => {
        console.error(error);
      });
  }//end updateTask()


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
    }).catch((error) => {
      console.error(error);
    })
  }

  return (
    <div className="container">
      {isCurrentlyEditing !== null ?
          <>
            <form onSubmit={updateDish}>{/* form to display when edit button is clicked  */}
              <h2>editing: {isCurrentlyEditing}</h2>
              <input type="text" placeholder='dishName' value={dishName} onChange={(e) => { setDishName(e.target.value) }}></input>
              <textarea type="text" placeholder='ingredients' value={dishIngredients} onChange={(e) => { setDishIngredients(e.target.value)}}></textarea>
              <textarea type="text" placeholder='instructions' value={dishInstructions} onChange={(e) => { setDishInstructions(e.target.value)}}></textarea>
              <button type="submit" className="submitChangeBtn">save change</button>
              <button className="cancelBtn" onClick={() => setIsCurrentlyEditing(null)}>cancel</button>
            </form>
          </>
          : null}
      <div class="flexbox-container">
        <div class="flexDish">{dish.dish_name}</div>
        <div class="flexIngredients">{dish.ingredients}</div>
        <div class="flexInstructions">{dish.instructions}</div>
        <button type="button" className="deleteBtn" onClick={() => deleteDish(dish.id)}>delete</button>
        <button type="button" className="editBtn" onClick={() => setIsCurrentlyEditing(dish.id)}>edit</button>
      </div>
    </div>
  );

}

export default DishesListItem;
