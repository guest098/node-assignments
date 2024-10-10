const express=require('express');
const fs=require('fs');
const path=require('path');
const app=express();
app.use(express.static('public'));
app.get('/buddylist',(req,res)=>{
    fs.readFile(path.join(__dirname,'data','buddy-list.json'),'utf-8',(err,data)=>{
            if(err){
                console.log(err);
                res.status(500).json({error:'Internal server error'});
            }
            else{
                res.status(200).json(JSON.parse(data));
            }
    });
});
app.listen(8080,()=>{
    console.log('Server listening on port 8080');
});
