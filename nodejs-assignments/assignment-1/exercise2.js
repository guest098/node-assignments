const fs=require('fs')
const path=require('path')
function generatingrandomwords(n){
    const characters="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let res="";
    for(let i=0;i<n;i++){
        const randomIndex=Math.floor(Math.random()*characters.length);
        res+=characters.charAt(randomIndex);
    }
    return res;
}
const n=100;
const word=10;
const words=[];
for(let i=0;i<n;i++){
    words.push(generatingrandomwords(word));
}
const filepath=path.join(__dirname,'random-words.txt');
fs.writeFileSync(filepath,words.join('\n'),'utf-8');
console.log('The 100 words have successfully generated');