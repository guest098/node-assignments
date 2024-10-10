const fs=require('fs');
const path=require('path');
const http=require('http');
const port=80;
const server=http.createServer((req,res)=>{
      if(req.url==='/'){
        const filepath=path.join(__dirname,'lib','users.txt');
        fs.readFile(filepath,'utf-8',(err,data)=>{
           if(err){
            res.writeHead(500,{'Content-Type':'text/plain'});
            res.end('Internal server error');
            return;
           } 
           const lines=data.split('\n').map(line=>line.trim()).filter(line=>line.length>0);
           const headers=lines[0].split('|').map(header=>header.trim());
           const rows=lines.slice(1).map(line=>line.split('|').map(value=>value.trim()));
           let table='<table border="1"><tr>';
           headers.forEach(header=>{
               table+=`<th>${header}</th>`;
           });
           table+='</tr>'
           rows.forEach(row=>{
            table+='<tr>';
            row.forEach(cell=>{
                table+=`<td>${cell}</td>`;
            });
            table+='</tr>';
            });
            table+='</table>';
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(table);
        });
      }
      else{
        res.writeHead(404,{'Content-Type':'text/plain'});
        res.end('Not found');
      }
});
server.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
    console.log(`click here:${'http://localhost:80'}`);
});
