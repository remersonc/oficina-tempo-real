const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('./'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connect', (socket) => {
  io.clients((error, clients) => {
    io.emit('connected', clients.length);
  });

  socket.on('disconnect', (socket) => {
    io.clients((error, clients) => {
      io.emit('disconnected', clients.length);
    });
  });
});

server.listen(1234, console.log('Servidor iniciado em http://localhost:1234'));