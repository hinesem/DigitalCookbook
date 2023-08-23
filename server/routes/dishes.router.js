const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

/**
 * GET route template
 */
router.get('/getDishes', (req, res) => {
  let readDishesQuery = 'SELECT id, dish_name, ingredients, instructions FROM "dishes" WHERE user_id = $1;';

  pool.query(readDishesQuery, [req.user.id])
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
  const { dishName, ingredients, instructions } = req.body;
  const addDishQuery = ` 
  INSERT INTO "dishes" ("dish_name", "ingredients", "instructions", "user_id") VALUES ($1,$2,$3,$4);
  `;
  pool.query(addDishQuery, [dishName.dishName, dishName.ingredients, dishName.instructions, req.user.id])
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
  const deleteDishQuery = `DELETE FROM dishes WHERE id = $1`;
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

//PUT route
router.put('/:id', (req, res) => {
  let dish = req.body;
  let id = req.params.id;
  console.log('update dish for id: ', dish);
  const updateDishQuery = 'UPDATE "dishes" SET "dish_name" = $1, "ingredients" = $2, "instructions" = $3 WHERE id = $4;';
  pool.query(updateDishQuery, [dish.dish_name, dish.ingredients, dish.instructions, id]) //disheslistiemn ln 29
    .then((result) => {
      console.log('dish updated');
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});



module.exports = router;

