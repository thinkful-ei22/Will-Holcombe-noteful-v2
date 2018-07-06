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
  
// Get a single item
router.get('/:id', (req, res, next) => {
  const{ id } = req.params;

  knex
    .select('notes.id', 'title', 'content', 'folders.id as folderId', 'folders.name as folderName')

    .from('notes')
    .leftJoin('folders', 'notes.folder_id', 'folders.id') //why second two parameters?
    .modify(queryBuilder => {
      if (id) {
        queryBuilder.where('notes.id', `${id}`);
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
  //get id from params not body
 const id = req.params.id;
  const { title, content, folderId } = req.body;
  const updateItem = {
   
    title,
    content,
    folder_id: folderId
  };
 console.log(updateItem);
//added to title - seems optional
  if (!updateItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  let noteId;
  knex('notes')
  //chase did just id not notes.id - try it
    
    .update(updateItem)
    .where('id', id) 
    /*
   .modify(queryBuilder => {
    if (id) {
      console.log(id);
       queryBuilder.where('notes.id', `${id}`)
         .update({id:`${id}` , title: `${title}`, content:`${content}`});
     }
  })
  */
    .returning('id')
    .then(([id]) => {
      noteId = id;
      return knex.select('notes.id', 'title', 'content', 'folder_id as folderId', 'folders.name as folderName')
        .from('notes')
        .leftJoin('folders', 'notes.folder_id', 'folders.id')
        .where('notes.id', noteId);
    })
    .then(([result]) => {
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => {
      next(err);
    });
});

// Post (insert) an item
router.post('/', (req, res, next) => {
  const { title, content, folderId } = req.body;
  const newObj = { 
    title, 
    content,
    folder_id: folderId //
  };

  if (!title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  let noteId;
  knex.insert(newObj)
    .into('notes')
  /*
 .modify(queryBuilder => {
  if (newObj) {
    queryBuilder.insert(newObj);
  }
})
*/

    .returning('id')
    .then(([id]) => {
      noteId = id;
      // Using the new id, select the new note and the folder
      return knex.select('notes.id', 'title', 'content', 'folder_id as folderId', 'folders.name as folderName')
        .from('notes')
        .leftJoin('folders', 'notes.folder_id', 'folders.id')
        .where('notes.id', noteId);
    })
    .then(([result]) => {
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
  /*
  .then(results=>{
    res.json(results);
    
  })
  */
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
