const express=require('express');
const employees=require('./employees');
const app=express();
const port=8080;
function getEmployees(){
    return employees.map(employee=>({
        ...employee,
        tier:employee.salary>50000?1:2
    }));
}
function getEmployeeByCity(city){
    return getEmployees().filter(employee=>employee.city===city);
}
function getTotalSalary(){
    return getEmployees().reduce((total,employee)=>total+employee.salary,0);
}
function getTotalSalaryofHyderabad(){
    return getEmployeeByCity('Hyderabad').reduce((total,employee)=>total+employee.salary,0);
}
function getTotalSalaryOfTier1(){
    return getEmployees().filter(employee=>employee.tier===1)
        .reduce((total,employee)=>total+employee.salary,0);
}
app.get('/employees',(req,res)=>{
    res.json(getEmployees());
});
app.get('/employees/city/:city',(req,res)=>{
    const city=req.params.city;
    res.json(getEmployeeByCity(city));
});
app.get('/total-salary',(req,res)=>{
    res.json({totalSalary:getTotalSalary()});
});
app.get('/total-salary/hyderabad',(req,res)=>{
    res.json({totalSalaryOfHyderabad:getTotalSalaryofHyderabad()});
});
app.get('/total-salary/tier1',(req,res)=>{
    res.json({totalSalaryOfTier1:getTotalSalaryOfTier1()});
});
app.listen(port,()=>{
    console.log(`Get Employees- http://localhost:${port}/employees`);
    console.log(`Get Employees by city- http://localhost:${port}/employees/city/Hyderabad`);
    console.log(`Get Total Salary- http://localhost:${port}/total-salary`);
    console.log(`Get Total Salary Hyderabad- http://localhost:${port}/total-salary/Hyderabad`);
    console.log(`Get Total Salary of Tier- http://localhost:${port}/total-salary/tier1`);
});