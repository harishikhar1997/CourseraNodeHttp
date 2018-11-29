const MongoClient=require('mongodb').MongoClient;
const assert =require('assert');
const dboper=require('./operations');

const url='mongodb://localhost:27017';
const dbname='conFusion';

MongoClient.connect(url).then((client)=>{

    console.log('Connected properly to the server');

    const db=client.db(dbname);

    //Now using operations page to access the mongoDB instead of below
    //mentioned code.............

    dboper.insertDocument(db,{name:"Hari",description:"try"},'dishes')
   .then((result)=>{

        console.log('insert document:\n',result.ops);

       return dboper.findDocuments(db,'dishes');
   })
        .then((docs)=>{
            console.log('Find documents: \n',docs);

            return dboper.updateDocument(db,{name:'Hari'},{description:'Updated try'},'dishes');
        })
        .then((result)=>{

             console.log('Updated document:\n',result.result);
             
             return dboper.findDocuments(db,'dishes');
        })
        .then((docs)=>{
                console.log('Found Documents:\n',docs);

               return db.dropCollection('dishes');
        })
        .then((result)=>{
                   console.log('Dropped Collection: ',result); 
                   return client.close();
                })
                .catch((err)=> console.log(err));



    // const collection=db.collection('dishes');

    // collection.insertOne({"name": "Uthappizza","description":"test"},(err,result)=>{

    //     assert.equal(err,null);

    //     console.log("After insert: \n");
    //     console.log(result.ops);

    //     collection.find({}).toArray((err,docs)=>{

    //       assert.equal(err,null);
          
    //       console.log('Found: \n');
    //       console.log(docs);

    //       db.dropCollection('dishes',(err,result)=>{

    //         assert.equal(err,null);
    //         client.close();
    //       });
    //     });
    // });

})
.catch((err)=> console.log(err));