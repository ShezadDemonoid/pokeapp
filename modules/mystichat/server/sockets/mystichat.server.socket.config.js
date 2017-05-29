'use strict';

// Create the mystichat configuration
module.exports = function (io, socket) {
  // Emit the status event when a new socket client is connected
  io.emit('MystichatMessage', {
    type: 'status',
    text: 'Is now connected',
    created: Date.now(),
    profileImageURL: socket.request.user.profileImageURL,
    username: socket.request.user.username
  });

  // Send a mystichat messages to all connected sockets when a message is received
  socket.on('MystichatMessage', function (message) {
    message.type = 'message';
    message.created = Date.now();
    message.profileImageURL = socket.request.user.profileImageURL;
    message.username = socket.request.user.username;

    // Emit the 'MystichatMessage' event
    io.emit('MystichatMessage', message);
  });

  // Emit the status event when a socket client is disconnected
  socket.on('disconnect', function () {
    io.emit('MystichatMessage', {
      type: 'status',
      text: 'disconnected',
      created: Date.now(),
      profileImageURL: socket.request.user.profileImageURL,
      username: socket.request.user.username
    });
  });
};
