const express = require('express');
const pool = require('../modules/pool.js');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  let query = 'SELECT dish_name FROM "dishes";';
  pool.query(query)
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
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
