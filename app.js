const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const {runCodeReturnOutput} = require('./helper')

const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {

    socket.on('codeSubmitted', async (data)=>{
        const codeOutput = await runCodeReturnOutput(data);
        socket.emit('outputGenerated', {codeOutput});
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