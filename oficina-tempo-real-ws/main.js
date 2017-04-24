const socket = io.connect('http://localhost:1234');

socket.on('connected', (numberOfClients) => console.log(`[connect] Clientes: ${numberOfClients}`));
socket.on('disconnected', (numberOfClients) => console.log(`[disconnect] Clientes: ${numberOfClients}`));