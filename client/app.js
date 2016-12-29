//TODO: fix ID!

var main = function () {
    "use strict";

    $('.pickusernamemodal').modal('toggle')

    var messages = [];
    var username = "";
    var counter = 0;
    var socket = io();
    var sendMessage = function (msg) {
        console.log("sumbit pressed " + msg.text + " by user: " + msg.sender);
        socket.emit('chat message', msg);
        $('#message').val('');
        return false;
    }

    var createMessage = function () {
        var msg = new message(
            $('#message').val(),
            username);
        sendMessage(msg);
    }

    $( "#pickusername" ).submit(function( event ) {
        username=$('#username').val();
        var $onlineuserli = $('<button type="button" class="list-group-item"><p class="list-group-item-text">');
        $onlineuserli.text(username);
        $onlineuserli.insertBefore("#pickuserbutton");
        console.log(username);
        event.preventDefault();
        $('.pickusernamemodal').modal('toggle')
    });

    $( "#sendform" ).submit(function( event ) {
        createMessage();
        event.preventDefault();
    });

    socket.on('chat message', function(msg){
        console.log(msg.sender + " " + username);
        if(msg.sender==username){
            $('#chat-log-list').append($('<li class="bubble-own">').text(msg.text));
        }
        else{
            $('#chat-log-list').append($('<li class="bubble-other">').html("<b>" + msg.sender + ": </b><br>" + msg.text));
        }
        console.log(msg.sender);
        $('#chat-log').scrollTop(10000);



    });

    //message constructor
    function message(Text, Sender) {
        this.text = Text;
        this.sender = Sender;
    };

};

$(document).ready(main);

