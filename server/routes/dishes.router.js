const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

/**
 * GET route template
 */
router.get('/getDishes', (req, res) => {
  let readDishesQuery = 'SELECT dish_name FROM "dishes";';
  pool.query(readDishesQuery)
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((error) => {
      console.log('Error with request', error);
    });
});

/////////why does this not work?
/**
 * POST route template
 */
// router.post('/addDish', (req, res) => {
//   const dishName = req.body.dish_name;
//   let createDishesQuery = 'INSERT INTO "dishes" ("dish_name) VALUES ($1)';
//   pool.query(createDishesQuery, [dishName])
// }).then((result) => {
//   res.sendStatus(200);
//   console.log('insert into dishes successful');
// }).catch((error) => {
//   console.log('error GET /api/addDish', error);
//   res.sendStatus(500);
// });


router.post('/addDish', (req, res) => { //route for post request
  const dishName = req.body; //variable "newTreat" for the body information
  const addDishQuery = ` 
  INSERT INTO "dishes" ("dish_name) VALUES ($1);
  `; // SQL statement to add a new item in the respective column names
  pool.query(addDishQuery, [dishName.dish_name])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(`Error making query ${addDishQuery}`, err);
      res.sendStatus(500);
    });
});


module.exports = router;
