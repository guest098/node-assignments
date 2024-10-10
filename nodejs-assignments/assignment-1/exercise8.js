const fs=require('fs');
const path=require('path');
const xlsx=require('xlsx');
const jsonData=[
    {"name":"Shanmuk","age":21,"gender":"Male","city":"Hyderabad"},
    {"name":"Gnani","age":20,"gender":"Female","city":"Kurnool"}
];
function writeToExcel(fileName,jsonData){
    const worksheet=xlsx.utils.json_to_sheet(jsonData);
    const workbook=xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const filePath=path.join(__dirname,fileName);
    xlsx.writeFile(workbook,filePath);
    console.log(`JSON data successfully written to ${fileName}`);
}
writeToExcel('data.xlsx',jsonData);
