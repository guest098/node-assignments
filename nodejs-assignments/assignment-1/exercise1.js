const fs=require('fs')
const path=require('path')
function getFileContent(file){
    const filecontent=path.join(__dirname,'lib',file);
    try{
        const content=fs.readFileSync(filecontent,'utf-8');
        return content;
    }
    catch(error){
        console.log(`error to read the file:${file}`,error);
        return null;
    }
}
console.log("Read me file content here:")
console.log(getFileContent('readme.txt'));
console.log("csv file content is here:")
console.log(getFileContent('students.csv'));
console.log("html file content is here:")
console.log(getFileContent('index.html'));