import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom/cjs/react-router-dom.min';
import LogOutButton from '../LogOutButton/LogOutButton';
import DishesList from '../DishesList/DishesList';



function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  // const [editDish, setEditDish] = useState([])



  return (
    <div className="container" >
      <img className="fit" src="/Users/eric/Documents/assignments/DigitalCookbook/public/ella-olsson-C1Q3qOTlegg-unsplash.jpg"></img>
      
      <Link to="/newDishPage">
        <button>create new dish</button>
      </Link>
      <DishesList />
      
      


    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
