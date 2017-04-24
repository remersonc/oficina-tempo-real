# Referência do Socket.IO

Documentação: [socket.IO Docs](https://socket.io/docs/)

## Enviar para o cliente

`socket.emit('hello', 'can you hear me?', 1, 2, 'abc');`

## Enviar para todos os clientes exceto o remetente

`socket.broadcast.emit('broadcast', 'hello friends!');`

## Inscrever-se em uma sala

`socket.join('some room');`

## Sair de uma sala

`socket.leave('some room');`

## Enviar para todos os clientes na sala 'game' exceto o remetente

`socket.to('game').emit('nice game', "let's play a game");`

## Enviar para todos os clientes em 'game1' e/ou 'game2' exceto o remetente

`socket.to('game1').to('game2').emit('nice game', "let's play a game (too)");`

## Enviar para uma socketid específica (mensagem privada)

`socket.to(<socketid>).emit('hey', 'I just met you');`

## Enviar para todos os clientes

`io.emit('hi', 'my lovely babies');`

## Enviar para todos os clientes em 'game' incluindo o remetente

`io.in('game').emit('big-announcement', 'the game will start soon');`

## Acessar os clientes da sala 'game'

`io.in('game').clients((error, clients) => {});`

## Eventos com nomes reservados

- `error`
- `connect`
- `disconnect`
- `disconnecting`
- `newListener`
- `removeListener`
- `ping`
- `pong`