//TODO: fix ID!

var main = function () {
    "use strict";

    var addMessages = function (todos) {
        console.log("Loading todos from server");

        for (var key in messagesserver) {

            var newMessage = new message(messages[key].ID,
                messagesserver[key].title,
                messagesserver[key].date,
                messagesserver[key].sender);

            messages.push(newMessage);
        }
    };

     var getServerMessages = function(){
         if (messages.length>0){

             $.getJSON("../messagesserver?from=" messages.length + , addMessages)
                 .error(function (jqXHR, textStatus, errorThrown) {
                     console.log("error " + textStatus);
                     console.log("incoming Text " + jqXHR.responseText);
                 });
         }else{
             messages = [];
             $.getJSON("../messagesserver?from=''", addMessages)
                 .error(function (jqXHR, textStatus, errorThrown) {
                     console.log("error " + textStatus);
                     console.log("incoming Text " + jqXHR.responseText);
                 });
         }

     };

    getServerMessages();

    var messages = [];

    //todo constructor
    function message(Id, Text, Date, Sender) {
        this.ID = Id;
        this.text = Text;
        this.date = Date;
        this.sender = Sender;
    }

    loadFilters();

    //reads the user input and creates an todo object
    var addTodo = function () {
        if ($(".todo-input input").val() !== "") {
            var e = document.getElementById("filterSelector");
            $Index = $Index + 1;

            toDos.push(addTodo);



            $.get("../addtodo?title=" + $( ".todo-input #todoTitle").val() + "&date=" +  $(".todo-input #todoDate").val() +
                "&priority=" + $(".todo-input #priorityCheck").is(':checked') +
            "&completed=false&filter=" + e.options[e.selectedIndex].text, function() {
                getServertodos();
            });




            $(".todo-input #todoTitle").val("");
            $(".todo-input #todoDate").val("");

            console.log(addTodo)

        }

    }

    //if the add button is pushed, add.
    $(".todo-input button").on("click", function (event) {
        addTodo();
    });

    //if the enter key is pressed, add.
    $(".todo-input input").on("keypress", function (event) {
        if (event.keyCode == 13) {
            addTodo();
        }
    });

    $(".addFilter #newFilter").on("keypress", function (event) {
        if (event.keyCode == 13) {
            filters.push($(".addFilter #newFilter").val())
            console.log("enter")

            var $filterlist = $("<ul>");
            $filterlist.append($("<li class='option'>").text($(".addFilter #newFilter").val()));
            $(".listOverView").append($filterlist);

            var e = document.getElementById("filterSelector");

            var opt = document.createElement('option');
            opt.id = "filteroption";
            opt.value = $(".addFilter #newFilter").val();
            opt.innerHTML = $(".addFilter #newFilter").val();
            e.appendChild(opt);
        }
    });

    //show the lists if in a certain tab, or the add menu if in the add tab
    $(".lists a span").toArray().forEach(function (element) {
        $(element).on("click", function () {
            var $element = $(element), $content;
            $add.hide();

            $(".lists a span").removeClass("active");
            $(element).addClass("active");
            $("main .content").empty();

            if ($element.parent().is(":nth-child(1)")) {
                $content = $("<ul>");
                toDos.forEach(function (todo) {
                    if (todo.completed == false) {
                        if (todo.filter == currentFilter || currentFilter == "No Filter") {
                            var listitem = $("<li class='item' id=" + todo.ID + ">").text(todo.title);
                            $content.append(listitem);
                        }

                    }
                });
                $("main .content").append($content);
            }
            else if ($element.parent().is(":nth-child(2)")) {
                $content = $("<ul>");
                toDos.forEach(function (todo) {
                    if (todo.completed == true) {
                        $content.append($("<li class='completed'>").text(todo.title));

                    }
                });
                $("main .content").append($content);
            }
            else if ($element.parent().is(":nth-child(3)")) {

                $add.show();
            }
            return false;
        })

    });

    //moves a todo item from the todos to the completed tabs and their respective arrays
    $(document).on('click', 'li.item', function () {
        var idval = $(this).attr("id");
        console.log(idval);
        $(this).toggleClass('strike').fadeOut('slow');
        $.get("../setcomplete?id=" + idval, function() {
            getServertodos();
        });




    });

    $(document).on('click', 'li.option', function () {
        console.log("filter");
        var $text = $(this).text();
        currentFilter = $text;
        console.log($text);
        $(".lists a:first-child span").trigger("click");
    });


    //so that the app starts on the first tab
    $(".lists a:first-child span").trigger("click");
};

$(document).ready(main);

