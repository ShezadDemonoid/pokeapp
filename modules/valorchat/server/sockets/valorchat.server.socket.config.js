'use strict';

// Create the valorchat configuration
module.exports = function (io, socket) {
  // Emit the status event when a new socket client is connected
  io.emit('ValorchatMessage', {
    type: 'status',
    text: 'Is now connected',
    created: Date.now(),
    profileImageURL: socket.request.user.profileImageURL,
    username: socket.request.user.username
  });

  // Send a valorchat messages to all connected sockets when a message is received
  socket.on('ValorchatMessage', function (message) {
    message.type = 'message';
    message.created = Date.now();
    message.profileImageURL = socket.request.user.profileImageURL;
    message.username = socket.request.user.username;

    // Emit the 'ValorchatMessage' event
    io.emit('ValorchatMessage', message);
  });

  // Emit the status event when a socket client is disconnected
  socket.on('disconnect', function () {
    io.emit('ValorchatMessage', {
      type: 'status',
      text: 'disconnected',
      created: Date.now(),
      profileImageURL: socket.request.user.profileImageURL,
      username: socket.request.user.username
    });
  });
};
