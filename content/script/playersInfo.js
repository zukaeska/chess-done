$(document).ready(function () {
    var playersObject = JSON.parse(playersInfo);
    for (var index = 0; index < 3; index++){
        var object = {};
        object = playersObject.players[index];
        var playerId = object.player_id;
        var playerName = object.name;
        var playerNation = object.nation;
        var playerBirthdate = object.birthdate;
        var playerTitles = object.world_titles;
        var playerScore = object.Peak_rating;
        var heading = $("<p id='name'></p>").text("Player : " + playerName);
        var nation = $("<p id='nation'></p>").text("Nation : " + playerNation);
        var birthdate = $("<p id='birth'></p>").text("Birthdate : " + playerBirthdate);
        var titles = $("<p id='title'></p>").text("World titles : " + playerTitles);
        var score = $("<p id='score'></p>").text("Chess high score : " + playerScore);
        var img = document.createElement("img");
        img.src = "./content/images/" + playerName + ".jpg";
        var link = document.getElementById(playerId).parentElement;
        link.href = "./content/games/gamesinfo.html?playerId=" + playerId;
        link.className = "link";
        $("#" + playerId).append(heading, nation, birthdate, titles, score, img);
    }
});