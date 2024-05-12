const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('setName', (name) => {
    console.log(`User set name: ${name}`);
    socket.name = name;
    io.emit('setName', name);
  });

  socket.on('sendMessage', (message) => {
    console.log(`Received message: ${message}`);
    io.emit('receiveMessage', `${socket.name}: ${message}`);
  });
});

const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
