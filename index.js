const express=require('express');
const http=require('http');
const morgan =require('morgan');
const bodyParser=require('body-parser');

const dishRouter=require('./routes/dishRouter');

const hostname='localhost';
const port=3000;

const app=express();
app.use(morgan('dev'));
app.use(bodyParser.json());

//        This is done in a better way in dishRouter.js
//         as there we have dishRouter.route('/');

// app.all('/dishes',(req,res,next)=>{
//     res.statusCode=200;
//     res.setHeader('Content-Type','text/plain');
//     next();
// });

// app.get('/dishes',(req,res,next)=>{
//     res.end("WIll send all the dishes to you!");

// });

// app.post('/dishes',(req,res,next)=>{
//     res.end('Will add the dish: '+ req.body.name +'with details: '
//     +req.body.description);
// });

// app.put('/dishes',(req,res,next)=>{
//     res.statusCode=403;
//     res.end('PUT operation not supportes on /dishes');
// });

// app.delete('/dishes',(req,res,next)=>{
//     res.end("Deleting all the dishes!");

// });



// app.get('/dishes/:dishId',(req,res,next)=>{
//     res.end('WIll send details of the dish: ! '
//     + req.params.dishId + ' to you');

// });

// app.post('/dishes/:dishId',(req,res,next)=>{
//     res.statusCode=403;
//     res.end('POST operation not supportes on /dishes/ '
//     + req.params.dishId);
// });

// app.put('/dishes/:dishId',(req,res,next)=>{
//     res.write('Updating th dish '+ req.params.dishId + '\n');
//     res.end('Will update dishe '+req.body.name+ 
//     'with details: '+req.body.description);
// });

// app.delete('/dishes/:dishId',(req,res,next)=>{
//     res.end("Deleting dish: "+req.params.dishId);

// });


// Any request coming at dishes will be handled at dishRouter

app.use('/dishes',dishRouter);
app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{

   
    res.statusCode=200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1> This is an Express Server </h1></body></html>');


});
 
const server=http.createServer(app);

server.listen(port,hostname,()=>{

console.log(`Server running at http://${hostname}:${port}`)
});