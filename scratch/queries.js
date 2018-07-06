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


router.get('/', (req, res, next) => {
  const { folder_id } = req.query;
_________
let folder_id = 102;
  knex
  .select('notes.id', 'title', 'content')
  .from('notes')
  .modify(queryBuilder => {
    if (folder_id) {
      queryBuilder.where('folder_id', folder_id);

    }
  })
    .then(results => console.log(JSON.stringify(results, null, 2)));

    /*
 
  .then(results => {
    res.json(results);
  })
  .catch(err => {
    next(err);
  });
});

___________
*/
/*

let folder_id = 102;
  knex
  .select('id', 'name')
  .from('folders')
  .modify(queryBuilder => {
    if (folder_id) {
      queryBuilder.where('id', folder_id);

    }
  })
    .then(results => console.log(JSON.stringify(results, null, 2)));




  knex
  .select('id', 'name')
  .from('folders')
    .then(results => console.log(JSON.stringify(results, null, 2)));
    

  const testObj ={id:102, name:'Things Tarrantino Likes'}  ;
  const {id, name} = testObj;
  knex
  .from('folders')
 .modify(queryBuilder => {
  if (id) {
    console.log(id);
     queryBuilder.where('folders.id', `${id}`)
       .update({id:`${id}` , name: `${name}`});
   }
})
 .returning(['id', 'name'])
 .then(results => console.log(JSON.stringify(results, null, 2)));

 
const testObj = {name:'Matrix action scenes'};
//const {name} = testObj;
knex('folders')
 // .from('folders')
  //.modify(queryBuilder => {
   // if (testObj) {
     // console.log(name);
     // queryBuilder.insert(testObj);
 //   }
  //})
  .insert(testObj)
  .returning(['id', 'name'])
  .then(result => console.log(JSON.stringify(result, null, 2)));

*/
let testId = 104;
knex('folders')
   .where('id', testId)
    .del()
    .then( console.log('Deleted!'));
 