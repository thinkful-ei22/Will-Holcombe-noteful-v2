'use strict';

const express = require('express');

// Create an router instance (aka "mini-app")
const router = express.Router();

// TEMP: Simple In-Memory Database
//const data = require('../db/notes');
//const simDB = require('../db/simDB');
//const notes = simDB.initialize(data);
const knex = require('../knex');
// Get All (and search by query)
router.get('/', (req, res, next) => {
  const { searchTerm } = req.query;
  knex
  .select('notes.id', 'title', 'content')
  .from('notes')
  .modify(queryBuilder => {
    if (searchTerm) {
      queryBuilder.where('title', 'like', `%${searchTerm}%`);
    }
  })
  .orderBy('notes.id')
  .then(results => {
    res.json(results);
  })
  .catch(err => {
    next(err);
  });
});
  
// Get a single item
router.get('/:id', (req, res, next) => {
  const id = req.params.id;

  knex
  .select('notes.id', 'title', 'content')
  .from('notes')
  .modify(queryBuilder => {
    if (id) {
      queryBuilder.where('id', `${id}`);

    }
  })
  .then(result => {
    res.json(result);
  })
  .catch(err => {
    next(err);
  });
});

// Put update an item
router.put('/:id', (req, res, next) => {
 
  const { id, title, content } = req.body;
 

  if (!title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  knex
    .from('notes')
   .modify(queryBuilder => {
    if (id) {
      console.log(id);
       queryBuilder.where('notes.id', `${id}`)
         .update({id:`${id}` , title: `${title}`, content:`${content}`});
     }
  })
   .returning(['id', 'title'])
   .then(results => {
    res.json(results);
  })
   .catch(err => {
     next(err);
   });
  });

// Post (insert) an item
router.post('/', (req, res, next) => {
 const { title, content } = req.body;
const newObj = { title, content };

  if (!title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }


  knex
  .from('notes')
 .modify(queryBuilder => {
  if (newObj) {
    queryBuilder.insert(newObj);
  }
})
  .returning(['id', 'title', 'content'])
  .then(results=>{
    res.json(results);
  })
  .catch(err => {
    next(err);
  });
});
// Delete an item
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  knex
  .from('notes')
  .modify(queryBuilder =>{
    if(id){
      queryBuilder.where('notes.id', id)
      .delete();
    }
  })
  .returning(['id', 'title'])
    .then(results => {
     res.json(results);
   })
  .catch(err => {
    next(err);
  });
 
});

module.exports = router;
