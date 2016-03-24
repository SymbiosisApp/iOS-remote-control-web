const express  = require('express')

exports.static = function initServer (server) {
  server.use(express.static('dist'))
}

exports.socket = function useSocket (server) {
  var http = require('http').Server(server);
  var io = require('socket.io')(http);

  io.on('connection', function (socket) {
    socket.on('SET_ME_POSITION', function (data) {
      io.emit('UPDATE_ME_POSITION', data)
    });
    socket.on('STOP_ALL_MOVE', function () {
      socket.broadcast.emit('STOP_MOVE')
    });
  });

  return http
} // end useSocket
