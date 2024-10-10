const fs=require('fs');
const path=require('path');
function getformatedtime(){
    const date=new Date();
    const options={year:'numeric',month:'short',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:true}
    return date.toLocaleString('en-US',options).replace(/,/g,' ');
}
function addTimeStamptolog(fileName){
    const filePath=path.join(__dirname,fileName);
    const newpath=path.join(__dirname,'debug.log');
    try{
        const content=fs.readFileSync(filePath,'utf-8');
        const lines=content.split('\n');
        const timed=lines.map(line=>`${getformatedtime()}${line}`);
        fs.writeFileSync(newpath,timed.join('\n'),'utf-8');
        console.log('Timestamp added');
    }
    catch(error){
        console.log(`error reading or writring file:`,error);
    }
}
addTimeStamptolog('debug.log');