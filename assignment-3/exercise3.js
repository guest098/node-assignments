const fs=require('fs');
const path=require('path');
const http=require('http');
const port=80;
const server=http.createServer((req,res)=>{
     let filepath='';
     if(req.url==='/home'){
        filepath=path.join(__dirname,'lib','home.html');
     }
     else if(req.url==='/about'){
        filepath=path.join(__dirname,'lib','about.html');
     }
     else if(req.url==='/contact'){
        filepath=path.join(__dirname,'lib','contact.html');
     }
     else{
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.end('Not Found');
        return;
     }
     fs.readFile(filepath,'utf-8',(err,data)=>{
        if(err){
            res.writeHead(500,{'Content-Type':'text/plain'});
            res.end('Internal server');
            return;
        }
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
     });
});
server.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
    console.log(`click here:${'http://localhost:80/'}`);
    console.log(`home page:${'http://localhost:80/home'}`);
    console.log(`about page:${'http://localhost:80/about'}`);
    console.log(`contact page:${'http://localhost:80/contact'}`);
});
