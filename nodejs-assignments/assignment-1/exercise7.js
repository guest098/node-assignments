const fs=require('fs');
const path=require('path');
const xlsx=require('xlsx');
function readExcelToJson(fileName){
    const filePath=path.join(__dirname, fileName);
    const workbook=xlsx.readFile(filePath);
    const sheetName=workbook.SheetNames[0];
    const sheet=workbook.Sheets[sheetName];
    const data=xlsx.utils.sheet_to_json(sheet);
    return data;
}
function writeJsonToFile(fileName,data){
    const filePath=path.join(__dirname,fileName);
    const jsonData=JSON.stringify(data,null,2);
    fs.writeFile(filePath,jsonData,'utf-8',(err)=>{
        if(err){
            console.error(`Error writing to file ${fileName}:`,err);
        } 
        else{
            console.log(`JSON data successfully`);
        }
    });
}
const jsonData=readExcelToJson('marks.xlsx');
writeJsonToFile('data.json',jsonData);
