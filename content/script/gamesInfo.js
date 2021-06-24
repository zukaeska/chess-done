$(document).ready(function () {
    var gamesObject = JSON.parse(gamesInfo);
    var page = window.location.href.split("=")[1];
    var object = gamesObject[page].games;
    for(var index = 0; index < 2; index++){
        var gameDate = object[index].date;
        var gameId = object[index].game_id;
        var firstPlayer = object[index].players[0];
        var secondPlayer = object[index].players[1];
        var list = document.createElement("li");
        var date = $("<p id='date'></p>").text("date : " + gameDate);
        var player = $("<p id='players'></p>").text("players : " + firstPlayer + " - " + secondPlayer);
        list.id = gameId;
        $(list).append("<button></button>");
        $("#list").append(list);
        var button = list.firstChild;
        button.className = "button";
        var link = document.createElement("a");
        $(button).append(link);
        button.firstChild.textContent = gameId;
        button.firstChild.href = "../games/gamesPlay.html?playerId-" + page + ";" + index + ";gameId=" + gameId;
        button.firstChild.className = "link";
        $("#" + gameId).append(date, player);
        
    }
});