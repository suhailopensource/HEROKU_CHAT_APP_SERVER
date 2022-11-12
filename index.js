var PORT = process.env.PORT || 5000;
var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

app.use(express.static('client'));

server.listen(PORT, function() {
  console.log('Chat server running');
});

var io = require('socket.io')(server);

const users = {};

io.on('connection', function(socket) {
  socket.on('new-user-joined', myname => {
    users[socket.id] = myname;
    socket.broadcast.emit('user-joined', myname);
  });

  socket.on('send', message => {
    socket.broadcast.emit('receive', { message: message, myname: users[socket.id] })
  });
  socket.on('disconnect', message => {
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id];
  });
});
