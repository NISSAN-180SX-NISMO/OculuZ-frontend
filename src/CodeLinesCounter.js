const fs = require('fs');
const path = require('path');

function countLinesInDirectory(directory) {
    let totalLines = 0;

    const files = fs.readdirSync(directory);

    for (const file of files) {
        const filePath = path.join(directory, file);

        if (fs.statSync(filePath).isDirectory()) {
            totalLines += countLinesInDirectory(filePath);
        } else {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            totalLines += fileContent.split('\n').length;
        }
    }

    return totalLines;
}

const frontLines = countLinesInDirectory('C:\\Users\\User\\Desktop\\OculuZ\\frontend\\src');
const backLines = countLinesInDirectory('C:\\Users\\User\\Desktop\\OculuZ\\backend\\src\\main\\java\\com\\zuluco\\oculuz');
console.log(`Total lines in C:\\Users\\User\\Desktop\\OculuZ\\frontend\\src directory: ${frontLines}`);
console.log(`Total lines in C:\\Users\\User\\Desktop\\OculuZ\\backend\\src\\main\\java\\com\\zuluco\\oculuz directory: ${backLines}`);