//TODO: fix ID!

var main = function () {
    "use strict";

    var messages = [];
    var socket = io();
    $('#send').click(function(){
      console.log("sumbit pressed " + $('#message').val())
        socket.emit('chat message', $('#message').val());
        $('#message').val('');
        return false;
    });
    socket.on('chat message', function(msg){
        $('#chat-log').append($('<li>').text(msg));
    });

    //todo constructor
    function message(Id, Text, Date, Sender) {
        this.ID = Id;
        this.text = Text;
        this.date = Date;
        this.sender = Sender;
    }

};

$(document).ready(main);

