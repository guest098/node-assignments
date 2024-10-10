const fs=require('fs');
const path=require('path');
const http=require('http');
const port=8080;
const server=http.createServer((req,res)=>{
     if(req.url==='/'){
        const filepath=path.join(__dirname,'lib','index.html');
        fs.readFile(filepath,(err,data)=>{
            if(err){
                res.writeHead(500,{'Content-Type':'text/plain'});
                res.end('Internal server error');
            }
            else{
                res.writeHead(200,{'Content-Type':'text/html'});
                res.end(data);
            }
        });
     }
     else{
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.end('Not found');
     }
});
server.listen(port,()=>{
     console.log(`server is listening on port ${port}`);
     console.log(`click here:${'http://localhost:8080'}`);
});