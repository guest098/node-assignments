const fs = require('fs');
const path = require('path');
function convertIntoJSON(fileName) {
    const filePath = path.join(__dirname, fileName);
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        const lines = data.split('\n').filter(line => line.trim() !== '');
        const array = lines.map(line => {
            const [name, age, gender, city] = line.split('|').map(field => field.trim());
            return {
                name: name || null,
                age: age || null,
                gender: gender || null,
                city: city || null
            };
        });
        console.log(JSON.stringify(array, null, 2));
    } catch (error) {
        console.error(`Error reading file ${fileName}:`, error);
    }
}
convertIntoJSON('dataset.txt'); 
