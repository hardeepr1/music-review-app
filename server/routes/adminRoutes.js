const express = require('express');
const {MongoClient} = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();

function router() {
  adminRouter.route('/')
    .get((req,res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'musicReviewApp';
      
      (async function mongo(){
        let client;
        try{
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);
          const response = await db.collection('songs').insertMany({'name': 'sidhu', 'title':'dear mama'});
          res.json(response);
        } catch(err){
          debug(err.stack);
        }
        client.close();
      }());
      res.send('inserting songs');
    })
  return adminRouter;
}


module.exports = router;