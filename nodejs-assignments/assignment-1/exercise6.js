const fs=require('fs');
const path=require('path');
const users=[
    {"name":"Shanmuk","age":22,"gender":"Male","city":"Hyderbad"},
    {"name":"Gnani","age":17,"gender":"Female","city":"Kurnool"}];
function writeintofile(fileName,users){
    const filePath=path.join(__dirname,fileName);
    const lines=users.map(user=>{
        return `${user.name}|${user.age}|${user.gender}|${user.city}`
    });
    const file=lines.join('\n');
    fs.writeFileSync(filePath,file,'utf-8',(err)=>{
        if(err){
            console.log(`Error writing into the file ${fileName}:`,err);
        }
        else{
            console.log(`user details successful written`);
        }
    });
}
writeintofile('users-info.txt', users);