  var express = require('express');
  var app = express();
  var http = require('http');
  var server = http.createServer(app);
  var io = require('socket.io').listen(server, {
      'log': false
  });
  
  server.listen(8888);
  console.log("Server started");
  
  app.use(express.static('public')); // document root
  
  io.sockets.on('connection', function (socket) {
  
      socket.emit('log', log);
      socket.emit('user list', currentUsers);
  
      socket.on('updatelog', function (message) {
          logpush({
              username: username,
              type: 'user',
              text: message,
              timestamp: new Date()
          })
      })
  
      socket.on('disconnect', function () {
          updateUserList('remove', username);
          logpush({
              type: 'disconnect',
              username: username
          });
  
      });
  
      var username = '';
      socket.on('username change', function (user) {
          if (!user) return;
          if (username == '') {
              logpush({
                  type: 'connect',
                  username: user
              });
          } else {
              updateUserList('remove', username);
              logpush({
                  type: 'name change',
                  original: username,
                  newname: user
              });
          }
          username = user;
          updateUserList('add', user);
      });
  
  });
  
  var log = [],
      currentUsers = [];
  
  function logpush(msg) {
      log.push(msg);
      io.sockets.emit('log', msg);
  }
  
  var username = '';
  
  function updateUserList(action, user) {
      if (action == 'add') {
          currentUsers.push(user);
      }
      if (action == 'remove') {
          var index = currentUsers.indexOf(user);
          if (index != -1) {
              currentUsers.splice(index, 1);
          }
      }
      io.sockets.emit('user list', currentUsers);
  }