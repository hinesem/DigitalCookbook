import React from 'react';
// let props = {   
//   dishes: dishes,
//   dish: dish,
// }  
// <-- when calling dishesListItem calling this component and passing sth we pass props, which is an object (props is the object) every time

function DishesListItem({dish}) { //this is an object, and we can pass more than just taco, so long as we give it a name in return disheslist.jsx
  //each property is the name of a prop
  //function DishesListItem({taco, burger})  <-- destructuring object
    console.log('DishesListItem:', dish);
  return (
    <>
      <div>{dish.dish_name}</div>
    </>
  );
}

export default DishesListItem;
