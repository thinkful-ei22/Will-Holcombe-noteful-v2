'use strict';

const knex = require('../knex');
/*
let searchTerm = 'gaga';
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
    console.log(JSON.stringify(results, null, 2));
  })
  .catch(err => {
    console.error(err);
  });

  let id = 1001;
  knex
  .select('notes.id', 'title', 'content')
  .from('notes')
  .modify(queryBuilder => {
    if (id) {
      queryBuilder.where('id', `${id}`);

    }
  })
  .then(result => {console.log(JSON.stringify(result, null, 2));
  })
  .catch(err => {
    console.error(err);
  });
 


 let updObj = {id: 1015, title: 'dadsfsaddfsfo', content: null};
 let {id, title, content} = updObj;
 knex
    .from('notes')
   .modify(queryBuilder => {
    if (updObj) {
      console.log(id);
       queryBuilder.where('notes.id', `${id}`)
         .update({id:`${id}` , title: `${title}`, content:`${content}`});
     }
  })
   .returning(['id', 'title'])
   .then(([res]) => {
    console.log(res);
  })
   .catch(err => {
     console.error(err);
   });

let newObj = {title: 'dadsfsaddfsfo', content: 'lamama'};
   knex
    .from('notes')
   .modify(queryBuilder => {
    if (newObj) {
      queryBuilder.insert(newObj);
    }
  })
    .returning(['id', 'title', 'content'])
    .then(([res])=>{
      console.log(res);
    })
    .catch(err => {
      console.error(err);
    });
*/
let id = 1005;
knex
.from('notes')
.modify(queryBuilder =>{
  if(id){
    queryBuilder.where('notes.id', `${id}`)
    .delete();
  }
})
.returning(['id', 'title'])
  .then(([res]) => {
   console.log(res);
 })
.catch(err => {
  console.error(err);
});
