const Docker = require('dockerode');
const path = require('path');

const docker = new Docker();

const executeCode = async (folderName) => {
    let containerOutput = "";

    try{
        containerOutput = await docker.run(
            'frolvlad/alpine-gxx',
            ['/bin/sh','-c',`cd code; g++ main.cpp -o main >& output.txt; ./main < input.txt >> output.txt`],
            process.stdout,
            {
                HostConfig:{
                    Binds: [`${folderName}:/code`],
                    AutoRemove: true
                }
            }
        );
    }
    catch(e){
        console.log(`error occured while running container: ${e}`);
    }

    console.log(`Output from container: ${containerOutput}`)
    return containerOutput;
}

module.exports = {executeCode};