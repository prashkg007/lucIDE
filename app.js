const express = require('express');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const path = require('path');
const {createDirectory, writeCodeToFile, readOutput, removeDirectory} = require('./helper')
const {executeCode} = require('./DockerHandler');

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {

    socket.on('codeSubmitted', async (data)=>{
        const fileName = 'newcode';
        createDirectory(fileName);
        writeCodeToFile(fileName, data.codeContent  , data.codeInput);
        const containerOutput = await executeCode(fileName);
        const codeOutput = await readOutput(fileName);
        socket.emit('outputGenerated', {codeOutput: codeOutput});
        removeDirectory(fileName);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
});

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

http.listen(PORT, () => {
    console.log(`listening at ${PORT}`);
});