'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');


router.get('/', (req, res, next) => {
  knex.select('id', 'name')
    .from('folders')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

//get folder by id

router.get('/:id', (req, res, next) => {
  const {id} = req.params;

  knex
    .select('id', 'name')
    .from('folders')
    .modify(queryBuilder => {
      if (id) {
        queryBuilder.where('id', id);

      }
    })
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});


//Update folder by id
router.put('/:id', (req, res, next) => {
  const {id, name} = req.body;
  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  knex
    .from('folders')
    .modify(queryBuilder => {
      if (id) {
        console.log(id);
        queryBuilder.where('id', `${id}`)
          .update({id:`${id}` , name: `${name}`});
      }
    })
    .returning(['id', 'name'])
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});




module.exports = router;
