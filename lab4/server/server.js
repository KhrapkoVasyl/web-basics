import { Server } from 'socket.io';

const activeUsers = {};
const websocketServer = new Server(8080, { cors: { origin: '*' } });

websocketServer.on('connection', (socket) => {
  const id = socket.id;
  const { username } = socket.handshake.query;
  activeUsers[id] = username;

  socket.on('message', ({ message, username }) => {
    socket.broadcast.emit('message', { message, username });
  });

  socket.on('disconnect', () => {
    delete activeUsers[id];
  });
});
