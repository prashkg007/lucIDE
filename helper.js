const fs = require('fs');
const path = require('path');

const createDirectory = (directoryName) => {
    fs.mkdir(path.join(__dirname, `${directoryName}`), (err)=>{
        if(err){
            console.log(`Error creating director for new code: ${err}`);
        }
    })
};

const writeCodeToFile = (directoryName, codeContent) => {
    fs.writeFile(path.join(__dirname, `${directoryName}`, `${directoryName}.cpp`), codeContent, (err) => {
        if(err)
            console.log('something happened');
        console.log('code file created successfully');
    })
};

module.exports = {createDirectory, writeCodeToFile};