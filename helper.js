const fs = require('fs');
const path = require('path');
const shortid = require('shortid');
const {executeCode} = require('./DockerHandler'); 

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-');

const createDirectory = (directoryName) => {
    fs.mkdirSync(directoryName);
};

const writeCodeToFile = (directoryName, codeContent, codeInput) => {
    fs.writeFileSync(path.join(directoryName, `main.cpp`), codeContent);
    fs.writeFileSync(path.join(directoryName, `input.txt`), codeInput);
};

const readOutput = (directoryName) => {
    const outputFilePath = path.join(directoryName, `output.txt`);
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
    fs.rmdir(directoryName, {recursive: true}, (err) => {
        if(err){
            console.log(`Error removing directory: ${directoryName}`);
        }
    });
};

const runCodeReturnOutput = async (data) => {
    const folderName = "a" + shortid.generate() + "a";
    const folderPath = path.join(__dirname, `codes`, folderName);

    createDirectory(folderPath);
    writeCodeToFile(folderPath, data.codeContent  , data.codeInput);
    const containerOutput = await executeCode(folderPath);
    const codeOutput = await readOutput(folderPath);
    removeDirectory(folderPath);

    return codeOutput;
}

module.exports = {runCodeReturnOutput};