// main file for our server
const http=require('http');
const app=require('./app.js');
const port= process.env.PORT||3000;
const server=http.createServer(app);


server.listen(port,()=>{
    console.log(`server listening on ${port}`)
})