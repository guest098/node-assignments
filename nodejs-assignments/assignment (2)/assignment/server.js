const express=require('express');
const mysql=require('mysql');
const multer=require('multer');
const path=require('path');
const { error } = require('console');
const upload=multer();
const app=express();
const PORT=8080;
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
      console.log('Error Occured while connecting to the database');
    }
    console.log('Successfully connected to the database');
});
app.get('/api/users',(req,res)=>{
  db.query('select * from users',(error,results)=>{
      if(error){
          res.status(500).send(error);
          return;
      }
      else if(results.length===0){
          res.status(404).send('Data not found');
          return;
      }
      res.status(200).json(results);
  });
});
app.get('/api/users/:id',(req,res)=>{
  const id=req.params.id;
  db.query('select * from users where id=?',[id],(error,results)=>{
      if(error){
          res.status(500).send(error);
          return;
      }
      else if(results.length===0){
          res.status(404).send('Data not found');
          return;
      }
      res.status(200).json(results);
  });
});
app.post('/api/users/create',async (req,res)=>{
     const {username,password,role}=req.body;
     const query='INSERT INTO users(username,password,role)values(?,?,?)';
     db.query(query,[username,password,role],(error,results)=>{
            if(error){
              res.status(500).send(error);
              return;
            }
            res.status(201).json({message:'User Created Succesfully',results});
      });
});
app.put('/api/users/update/:id',async (req,res)=>{
  const {id}=req.params;
  const {username,password,role}=req.body;
  let query='update users set username=?,password=?,role=? where id=?';
  db.query(query,[username,password,role,id],(error,results)=>{
      if(error){
          res.status(500).send(error);
          return;
      }
      else if(results.affectedRows===0){
          res.status(404).send('Data not found');
          return;
      }
      res.status(200).json({message:'user updated successfully'});
  });
});
app.delete('/api/users/delete/:id',(req,res)=>{
  const {id}=req.params;
  db.query('delete from users where id=?',[id],(error,results)=>{
      if(error){
          res.status(500).send(error);
          return;
      }
      else if(results.affectedRows===0){
          res.status(404).send('Data not found');
          return;
      }
      res.status(200).json({message:'user marked as inactive'});
  });
});
app.get('/api/roles',(req,res)=>{
  db.query('select * from roles',(error,results)=>{
      if(error){
          res.status(500).send(error);
          return;
      }
      else if(results.length===0){
          res.status(404).send('Data not found');
          return;
      }
      res.status(200).json(results);
  });
});
app.get('/api/roles/:id',(req,res)=>{
  const id=req.params.id;
  db.query('select * from roles where id=?',[id],(error,results)=>{
      if(error){
          res.status(500).send(error);
          return;
      }
      else if(results.length===0){
          res.status(404).send('Data not found');
          return;
      }
      res.status(200).json(results);
  });
});
app.post('/api/roles/create',(req,res)=>{
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
app.put('/api/roles/update/:id',(req,res)=>{
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
app.delete('/api/roles/delete/:id',(req,res)=>{
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
app.post('/admin/login',(req,res)=>{
      const {email,password}=req.body;
      db.query('select * from users where email=? && password=? && role=?',[email,password,'admin'],(error,results)=>{
            if(error){
              res.status(500).send(error);
              return;
            }
            else if(results.length>0){
              res.status(200).send({message:'Login Successful'});
              return;
            }
            else{
              res.json({message:'Login Unsuccessful'});
            }
      });
});
app.post('/admin/signup',(req,res)=>{
      const {username,email,password}=req.body;
      if(!username||!email||!password){
        return res.json({success:false,message:'All fields are required'});
      }
      db.query('insert into users(username,email,password,role) values(?,?,?,?)',[username,email,password,'admin'],(error,results)=>{
        if(error){
          res.status(500).send({error,message:'Registration Failed'});
          return;
        }
        res.status(200).send({success:true});
      });
});
app.post('/user/login',(req,res)=>{
  const {email,password}=req.body;
  db.query('select * from users where email=? && password=? && role=?',[email,password,'user'],(error,results)=>{
        if(error){
          res.status(500).send(error);
          return;
        }
        else if(results.length>0){
          res.status(200).send({message:'Login Successful'});
          return;
        }
        else{
          res.json({message:'Login Unsuccessful'});
        }
  });
});
app.post('/user/signup',(req,res)=>{
  const {username,email,password}=req.body;
  if(!username||!email||!password){
    return res.json({success:false,message:'All fields are required'});
  }
  db.query('insert into users(username,email,password,role) values(?,?,?,?)',[username,email,password,'user'],(error,results)=>{
    if(error){
      res.status(500).send({error,message:'Registration Failed'});
      return;
    }
    res.status(200).send({success:true});
  });
});

app.get('/admin/roles/overview', (req, res) => {
  const totalRolesQuery=`SELECT COUNT(*) AS totalRoles FROM roles`;
  const departmentsQuery=`SELECT department, COUNT(*) AS departmentCount FROM roles GROUP BY department`;
  const avgSalaryQuery=`SELECT AVG(salary) AS avgSalary FROM roles`;
  db.query(totalRolesQuery, (err, totalRoles)=>{
      if(err)return res.status(500).json({message:`${err}`});
      db.query(departmentsQuery, (err, departments)=>{
          if(err) return res.status(500).json({message:`${err}`});
          db.query(avgSalaryQuery,(err,avgSalary)=>{
              if(err) return res.status(500).json({message:`${err}`});
              return res.status(200).json({
                  totalRoles:totalRoles[0].totalRoles,
                  departments:departments,
                  avgSalary:avgSalary[0].avgSalary.toFixed(2)
              });
          });
      });
  });
});
app.get('/admin/roles-audit-trail',(req,res)=>{
  const query=`
      SELECT 
          at.id, 
          at.role_name, 
          at.action, 
          at.created_at, 
          u.username AS admin_name
      FROM 
          audit_trail_roles at
      JOIN 
          users u ON at.user_id = u.id
      ORDER BY at.created_at DESC`;
  db.query(query,(err,data)=>{
      if(err){
          console.error('Error executing query:', err);
          return res.status(500).json({ message: 'Internal server error' });
      }
      res.status(200).json(data);
  });
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
  console.log(`Server is listening at http://localhost:${PORT}`);
})