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

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log("message:" + msg)
  });
});

/*
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

/*
var currentid = 0;
var messages = [];
var users = [];

//message constructor
function message(Id, Text, Date, Sender) {
    this.ID = Id;
    this.text = Text;
    this.date = Date;
    this.sender = Sender;
}

//clients requests messages
app.get("/messagesserver", function (req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var from = query["from"];
    var messagestosend = messages.slice(from);

	console.log("messages requested!");
	res.json(messagestosend);

});

//clients requests users
app.get("/users", function (req, res) {
    console.log("users requested!");
    res.json(users);
});

//send new message
app.get("/send", function (req, res) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;
	
	if(query["text"]!==undefined) {
		var tx = { ID: currentid,

            text: query["text"],
            date:  query["date"],
            sender: query["sender"]  == "true",
		};

        ++currentid;

		messages.push(tx);
		console.log("Added " + tx);
		res.end("messages added successfully");
	}
	else {
		res.end("Error: missing message parameter");
	}
});
*/
