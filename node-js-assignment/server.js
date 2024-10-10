const express=require('express');
const bodyparser=require('body-parser');
const mysql=require('mysql');
const path=require('path');
const app=express();
const PORT=8080;
app.use(bodyparser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'roles'
});
db.connect((error)=>{
    if(error){
        console.log('Error occured while connecting to the database',error);
    }
    console.log('Connected the database successfully');
})
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
            res.status(404).send('Data not found');
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
        else if(results.length===0){
            res.status(404).send('Data not found');
           }
        res.status(201).json(results);
    });
});
app.put('/roles/:id',(req,res)=>{
    const {role_name,department,responsibilities,qualifications,salary}=req.body;
    const id=req.params.id;
    db.query('update roles set role_name=?,department=?,responsibilities=?,qualifications=?,salary=? where id=?',[role_name,department,responsibilities,qualifications,salary,id],(error,results)=>{
        if(error){
            res.status(500).send(error);
            return;
        }
        else if(results.affectedRows===0){
            res.status(404).send('No Data Found');
            return;
        }
        res.status(200).json({message:'Successfully updated',results});
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
            res.status(404).send('No Data Found');
            return;
        }
        res.status(200).json({message:'Successfully deleted'})
    });
})
app.listen(PORT,()=>{
    console.log(`listening at the http://localhost:${PORT}`);
});