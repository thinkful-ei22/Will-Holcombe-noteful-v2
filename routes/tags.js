'use strict';

const knex = require('../knex');
const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    const { name } = req.body;
  
    
    /**** Never trust users. Validate input *****/
    if (!name) {
      const err = new Error('Missing `name` in request body');
      err.status = 400;
      return next(err);
    }
  
    const newItem = { name };
  
    knex.insert(newItem)
      .into('tags')
      .returning(['id', 'name'])
      .then((results) => {
        // Uses Array index solution to get first item in results array
        const result = results[0];
        res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
      })
      .catch(err => next(err));
  });
  

router.get('/', (req, res, next) => {

knex.select('id', 'name')
      .from('tags')
      .then((results) => {
        // Uses Array index solution to get first item in results array
        const result = results;
        res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
      })
      .catch(err => next(err));
  });


router.get('/:id', (req, res, next) => {

    const{id}= req.params;
    
      knex
      .select('id', 'name')
      .from('folders')
        .where('id', id)
  
      .then((results) => {
        // Uses Array index solution to get first item in results array
        const result = results;
        res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
      })
      .catch(err => next(err));
  });


  router.put('/:id', (req, res, next) => {
    const { name} = req.body;
    const {id} = req.params;
  
    
    /**** Never trust users. Validate input *****/
    if (!name) {
      const err = new Error('Missing `name` in request body');
      err.status = 400;
      return next(err);
    }
  
    const newItem = { name };
  
    knex.insert(newItem)
      .into('tags')
      .where('id', id)
      .returning(['id', 'name'])
      .then((results) => {
        // Uses Array index solution to get first item in results array
        const result = results[0];
        res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
      })
      .catch(err => next(err));
  });

router.delete('/:id', (req, res, next) => {
    const {id}= req.params;
    knex
    .from('tags')
    .where('tags.id', id)
    .delete()
    .returning(['id', 'name'])
    .then((results) => {
        // Uses Array index solution to get first item in results array
        const result = results[0];
        res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
      })
      .catch(err => next(err));
  });

/*
    const { searchTerm, folderId } = req.query;
    knex
      .select('notes.id', 'title', 'content', 'folders.id as folderId', 'folders.name as folderName')
      .from('notes')
      .leftJoin('folders', 'notes.folder_id', 'folders.id')
      .modify(queryBuilder => {
        if (searchTerm) {
          queryBuilder.where('title', 'like', `%${searchTerm}%`);
        }
      })
      .modify(function (queryBuilder) {
        if (folderId) {
          queryBuilder.where('folder_id', folderId);
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
*/

  //router.get('/')
  module.exports = router;