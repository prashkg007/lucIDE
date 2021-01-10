const fs = require('fs');
const path = require('path');

const createDirectory = (directoryName) => {
    fs.mkdirSync(path.join(__dirname, `${directoryName}`));
};

const writeCodeToFile = (directoryName, codeContent, codeInput) => {
    fs.writeFileSync(path.join(__dirname, `${directoryName}`, `main.cpp`), codeContent);
    fs.writeFileSync(path.join(__dirname, `${directoryName}`, `input.txt`), codeInput);
};

const readOutput = (directoryName) => {
    const outputFilePath = path.join(__dirname, `${directoryName}`, `output.txt`);
    return new Promise((resolve, reject) => {
        fs.readFile(outputFilePath, (err, data) => {
            if(err)
                reject(err);
            console.log('data');
            resolve(data.toString());
        });
    })
};

const removeDirectory = (directoryName) => {
    fs.rmdir(path.join(__dirname, `${directoryName}`), {recursive: true}, (err) => {
        if(err){
            console.log(`Error removing directory: ${directoryName}`);
        }
    });
};

module.exports = {createDirectory, writeCodeToFile, readOutput, removeDirectory};