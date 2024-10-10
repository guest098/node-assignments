const express=require('express');
const mysql=require('mysql');
const bodyparser=require('body-parser');
const path=require('path');
const { error } = require('console');
const app=express();
const PORT=8080;
app.use(express.json());
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname,'public')));
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'roles'
});
db.connect((error)=>{
    if(error){
        console.log('Error occured while connecting to db',error);
    }
    console.log('Connected Succesfully to the database');
});
app.get('/roles',(req,res)=>{
    db.query('select * from roles',(error,results)=>{
        if(error){
            res.status(500).send(error);
            return;
        }
        res.status(200).json(results);
    });
});
app.get('/roles/:id',(req,res)=>{
    const id=req.params.id;
    db.query('select * from roles where id=?',[id],(error,results)=>{
        if(error){
            res.status(500).send(error);
            return;
        }
        else if(results.length===0){
            res.status(404).send('Data Not Found');
            return;
        }
        res.status(200).json(results);
    });
});
app.post('/roles',(req,res)=>{
    const {role_name,department,responsibilities,qualifications,salary}=req.body;
    db.query('insert into roles(role_name,department,responsibilities,qualifications,salary) values(?,?,?,?,?)',[role_name,department,responsibilities,qualifications,salary],(error,results)=>{
        if(error){
            res.status(500).send(error);
            return;
        }
        else if(results.affectedRows===0){
            res.status(404).send('Data Not Found');
            return;
        }
        res.status(201).json({message:'succesfully new user added',results});
    });
});
app.put('/roles/:id',(req,res)=>{
    const id=req.params.id;
    const {role_name,department,responsibilities,qualifications,salary}=req.body;
    db.query('update roles set role_name=?,department=?,responsibilities=?,qualifications=?,salary=? where id=?',[role_name,department,responsibilities,qualifications,salary,id],(error,results)=>{
        if(error){
            res.status(500).send(error);
            return;
        }
        else if(results.affectedRows===0){
            res.status(404).send('Data Not Found');
            return;
        }
        res.status(201).json({message:'Successfully user Updated'});
    });
});
app.delete('/roles/:id',(req,res)=>{
    const id=req.params.id;
    db.query('delete from roles where id=?',[id],(error,results)=>{
        if(error){
            res.status(500).send(error);
            return;
        }
        else if(results.affectedRows===0){
            res.status(404).send('Data Not Found');
            return;
        }
        res.status(200).json({message:'Succesfully Deleted the user',results});
    });
});
app.listen(PORT,()=>{
    console.log(`Running at the http://localhost:${PORT}`);
}); 