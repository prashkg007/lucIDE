const express = require('express');
const app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const path = require('path');
const {createDirectory, writeCodeToFile} = require('./helper')
const {executeCode} = require('./DockerHandler');

const PORT = 3000 || process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {

    socket.on('codeSubmitted', (data)=>{
        createDirectory('newcode');
        writeCodeToFile('newcode', data.codeContent);
        executeCode('newcode');
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