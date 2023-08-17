const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

/**
 * GET route template
 */
router.get('/getDishes', (req, res) => {
  let readDishesQuery = 'SELECT dish_name, id FROM "dishes";';
  pool.query(readDishesQuery)
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((error) => {
      console.log('Error with request', error);
    });
});


/**
 * POST route template
 */
router.post('/addDish', (req, res) => {
  const dishName = req.body;
  const addDishQuery = ` 
  INSERT INTO "dishes" ("dish_name") VALUES ($1);
  `;
  pool.query(addDishQuery, [dishName.dishName])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log(`Error making query ${addDishQuery}`, err);
      res.sendStatus(500);
    });
});

/**
 * DELETE route template
 */
router.delete('/:id', (req, res) => {
  let deleteDish = req.params.id;
  console.log('Delete dish for id ', deleteDish);
  const deleteDishQuery = `DELETE FROM dishes WHERE id=$1`;
  pool.query(deleteDishQuery, [deleteDish])
    .then((result) => {
      console.log('dish deleted');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error making delete query ${deleteDishQuery}`, error);
      res.sendStatus(500);
    })
})



module.exports = router;

/////////why does this not work?

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
