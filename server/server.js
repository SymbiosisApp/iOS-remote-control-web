const express  = require('express')

exports.static = function initServer (server) {
  server.use(express.static('dist'))
}

exports.socket = function useSocket (server) {
  var http = require('http').Server(server);
  var io = require('socket.io')(http);

  io.on('connection', function (socket) {
    // socket.emit('news', { hello: 'world' });
    socket.on('SET_ME_POSITION', function (data) {
      console.log('SET_ME_POSITION')
      io.emit('UPDATE_ME_POSITION', data)
    });
  });

  return http
} // end useSocket
