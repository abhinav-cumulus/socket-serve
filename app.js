const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const connections = [];

io.on('connection', socket => {
    console.log(`Socket ${socket.id} has connected`);
    connections.push(socket);

    socket.on('message', (message) => {
        console.log(message);
        connections.forEach(s => s.emit('server-message', message))
    });
});

http.listen(4444, () => {
    console.log('Listening on port 4444');
});