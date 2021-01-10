const Docker = require('dockerode');
const path = require('path');

const docker = new Docker();

const executeCode = async (folderName) => {
    const buffer = Buffer.alloc(1024);

    const containerOutput = await docker.run(
        'frolvlad/alpine-gxx',
        ['/bin/sh','-c',`cd ${folderName}; g++ main.cpp -o main >& output.txt; ./main < input.txt >> output.txt`],
        process.stdout,
        {
            HostConfig:{
                Binds: [`${__dirname}/${folderName}:/${folderName}`],
                AutoRemove: true
            }
        }
    );

    console.log(`Output from container: ${containerOutput}`)
    return containerOutput;
}

module.exports = {executeCode};