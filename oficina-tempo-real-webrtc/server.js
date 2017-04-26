const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('./'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connect', (socket) => {
  io.clients((error, ids) => {
    ids.forEach((id, index) => {
      io.to(id).emit('socket index', index);
    });
  });

  socket.on('enviar oferta', (description) => {
    socket.broadcast.emit('receber oferta', description);
  });

  socket.on('enviar resposta', (description) => {
    socket.broadcast.emit('receber resposta', description);
  });

  socket.on('enviar candidato', (candidate) => {
    socket.broadcast.emit('receber candidato', candidate);
  });

  socket.on('disconnect', () => {
    io.clients((error, ids) => {
      ids.forEach((id, index) => {
        io.to(id).emit('socket index', index);
      });
    });
  });
});

server.listen(4567, console.log('Servidor iniciado em http://localhost:4567'));