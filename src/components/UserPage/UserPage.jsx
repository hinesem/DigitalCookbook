import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom/cjs/react-router-dom.min';
import LogOutButton from '../LogOutButton/LogOutButton';
import DishesList from '../DishesList/DishesList';



function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);




  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
      <DishesList />
      <Link to="/newDishPage">
        <button>create new dish</button>
      </Link>


    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
