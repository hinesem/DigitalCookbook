import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function CreateNewDish() {
  const [dishName, setDishName] = useState('');
  console.log(dishName);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = event => {
    event.preventDefault();
    dispatch({
      type: 'POST_DISHES',
      payload: dishName
    });
    history.goBack()
  }

  return (
    <>
      <div>
        <h1>New dish</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='name' value={dishName} onChange={(e) => setDishName(e.target.value)} />
          <button type="submit">save</button>
        </form>
        <Link to="/newIngredientPage">
          <button>ingredients</button>
        </Link>
        <Link to="/newInstructionsPage">
          <button>instructions</button>
        </Link>
      </div>
    </>
  )
}

export default CreateNewDish;