const fs=require('fs');
const path=require('path');
function copyFile(fileName,newFile){
    const filepath=path.join(__dirname,fileName);
    const newpath=path.join(__dirname,newFile);
    fs.copyFile(filepath,newpath,(err)=>{
        if(err){
            console.log(`error to copy file from ${fileName} to ${newFile}`,err);
        }
        else{
            console.log(`file copied from ${fileName} to ${newFile}`);
        }
    });
}
copyFile('lib/copy.txt','lib/cop2.txt');