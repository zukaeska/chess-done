var number;
window.onload = function(){
    // var gameObject = JSON.parse(gamesInfo);
    var mainObject = JSON.parse(startingPosition);
    // var page = window.location.href.split("-")[2].substr(0,7);
    // var gameNumber = window.location.href.split(";")[1].substr(0,1);
    // var object = gameObject[page].games[gameNumber].style;
    // if(object == "black"){
    //     boardChange();
    // }
    positioning(mainObject);
}
function positioning(object){
    var quantity = object.positions.quantity;
    for(number = 0; number < quantity; number++){
        var pieceName = object.positions.pieces[number].name;
        var piecePosition = object.positions.pieces[number].position;
        var parent = document.getElementById(piecePosition);
        var child = document.createElement("img");
        child.src = "../images/" + pieceName +".png";
        child.className = pieceName;
        parent.appendChild(child);
   }
}
function boardChange(){
    for(index = 1; index < 9; index++){
        for(secondIndex = 1; secondIndex < 9;secondIndex++){
            var letter = String.fromCharCode(64+index);
            var changeLetter = String.fromCharCode(64 + 8 - index + 1);
            var changeNumber = 8 - secondIndex + 1;
            var piece = document.getElementById(letter + "_" + secondIndex);
            piece.id = changeLetter + "_" + changeNumber;
            console.log(letter, secondIndex, changeLetter, changeNumber, piece)
            // piece.id = changeLetter + "_" + changeNumber;
            // console.log(piece);
        }
    }
}