const Docker = require('dockerode');
const path = require('path');

const docker = new Docker();

const executeCode = (folderName) => {
    const buffer = Buffer.alloc(1024);
    docker.run(
        'frolvlad/alpine-gxx',
        ['/bin/sh','-c',`cd ${folderName}; g++ ${folderName}.cpp -o main; ./main > output.txt; rm main`],
        process.stdout,
        {
            HostConfig:{
                Binds: [`${__dirname}/${folderName}:/${folderName}`],
                AutoRemove: true
            }
        }
    )
    .then((data) => {
        console.log(data[1].id);
    })
}

module.exports = {executeCode};