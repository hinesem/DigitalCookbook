import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';


function CreateNewDish() {
  const [dishName, setDishName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [displayPage, setDisplayPage] = useState('ingredients');

  console.log(dishName);
  console.log(ingredients);
  console.log(instructions);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = event => {
    event.preventDefault();
    dispatch({ //dispatch sends info to the saga
      type: 'POST_DISHES', //posDishes.saga (yield takeEvery(...))
      payload: { dishName, ingredients, instructions }
      
    });
   
    history.goBack()
  }

  return (
    <>
      <div>
        <h1>New dish</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='name' value={dishName} onChange={(e) => setDishName(e.target.value)} />
          {/* <input type="text" placeholder='indgredient' value={ingredientNambe} onChange={} */}
          <Button
          sx={{ margin: 1 }}
          type="submit"
          variant="outlined"
          endIcon={<SaveIcon/>}
          ></Button>
        </form>

        <button onClick={() => setDisplayPage('ingredients')}>ingredients</button>
        <button onClick={() => setDisplayPage('instructions')}>instructions</button>

        {
          displayPage == 'ingredients' && (
            <>
              <h2>Add ingredients</h2>
              <textarea type="text" placeholder='ingredients' value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
            </>
          )
        }
        {
          displayPage == 'instructions' && (
            <>
              <h2>Add instructions</h2>
              <textarea type="text" placeholder='instructions' value={instructions} onChange={(e) => setInstructions(e.target.value)} />
            </>
          )
        }
      </div>
    </>
  )
}

export default CreateNewDish;