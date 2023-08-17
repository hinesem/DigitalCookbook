import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function CreateNewIngredient() {
  const [ingredientName, setIngredientName] = useState('');
  const [ingredentList, setIngredientList] = useState([]);

  useEffect(() => {
    console.log('fetching ingredient');
    getIngredient()
    .then(ingredients => {
      console.log(ingredients)
      setIngredientList(ingredients)
    });
  }, []);

  function getIngredient() {
    return fetch('/ingredients')
    .then(response => response.json())
    .catch((error) => {
      console.log(error);
    });
  }

  
}