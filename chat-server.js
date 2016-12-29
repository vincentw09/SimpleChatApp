/* global Buffer */
/* global __dirname */

var express = require('express');
var http = require('http');
var url = require("url");

var port = 3000;
var app = express();

app.use(express.static(__dirname + "/client"));

var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(port);

var users = [];

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log("message:" + msg)
  });
  socket.on('user connected',function (user) {
	  users.push(user);
	  io.emit('users', users);
  });
    socket.on('disconnect', function(){
		users = [];
		io.emit('request user');
	});


});
