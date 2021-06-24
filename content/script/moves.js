$(document).ready(function(){
    var object = JSON.parse(games);
    var arrayIndex = -1;
    var index = -1;
    var colorIndex = 0;
    var startingPosition;
    var endingPosition;
    var kingStartingPosition
    var kingEndingPosition
    var pieceName;
    var moveType;
    var diedPiece = [];
    var totalMoves;
    var page = window.location.href.split("=")[1];
    document.getElementById("back").className = page;
    document.getElementById("next").className = page;
    $("#next").click(function(){
        var name = this.className;
        var mainObject = object[name];
        totalMoves = mainObject.total_move - 1;
        if (index <= totalMoves){
            if(colorIndex == 0)index++;
            if(index > totalMoves){index = totalMoves}else{          
            moveType = mainObject.move[index].colors[colorIndex].move_type;
            if (moveType != "castling"){
                startingPosition = mainObject.move[index].colors[colorIndex].starting_position;
                endingPosition = mainObject.move[index].colors[colorIndex].ending_position;
                pieceName = mainObject.move[index].colors[colorIndex].color + "_" +  mainObject.move[index].colors[colorIndex].name;
                var movingPiece = document.getElementById(startingPosition).firstChild;
                var endingPlase = document.getElementById(endingPosition);
                var endingPiece;
                if(endingPlase.firstChild !== undefined && endingPlase.firstChild !== null){
                    endingPiece = endingPlase.firstChild;
                    arrayIndex++;
                    diedPiece[arrayIndex] = endingPiece;
                    $(endingPiece).remove();
                }
                animate(startingPosition, endingPosition, movingPiece);
            }
            else {
                kingStartingPosition = mainObject.move[index].colors[colorIndex].pieces[0].starting_position;
                kingEndingPosition = mainObject.move[index].colors[colorIndex].pieces[0].ending_position;
                rookStartingPosition = mainObject.move[index].colors[colorIndex].pieces[1].starting_position;
                rookEndingPosition = mainObject.move[index].colors[colorIndex].pieces[1].ending_position;
                pieceName = mainObject.move[index].colors[colorIndex].color + "_" + mainObject.move[index].colors[colorIndex].pieces[0].name;
                var kingPiece = document.getElementById(kingStartingPosition).firstChild;
                var rookPiece = document.getElementById(rookStartingPosition).firstChild;
                var kingEnding = document.getElementById(kingEndingPosition);
                var rookEnding = document.getElementById(rookEndingPosition);
                $(kingStartingPosition).remove(this.firstChild);
                $(rookStartingPosition).remove(this.firstChild);
                kingEnding.append(kingPiece);
                rookEnding.append(rookPiece);
                }
            if (colorIndex == 0) colorIndex = 1; else colorIndex = 0;
        }
        turnIndex++;
        }     
      }); 
    $("#back").click(function(){
        var name = this.className;
        var mainObject = object[name];
        if (index >= 0){ 
            if (colorIndex == 0) colorIndex = 1; else colorIndex = 0;
            if(index < 0){index = 0}else{
            moveType = mainObject.move[index].colors[colorIndex].move_type;
            if (moveType != "castling"){
                startingPosition = mainObject.move[index].colors[colorIndex].starting_position;
                endingPosition = mainObject.move[index].colors[colorIndex].ending_position;
                pieceName = mainObject.move[index].colors[colorIndex].color + "_" +  mainObject.move[index].colors[colorIndex].name;           
                var movingPiece = document.getElementById(endingPosition).firstChild;
                var endingPlace = document.getElementById(startingPosition);
                $(endingPosition).remove(this.firstChild);
                if(moveType == "kill"){
                    var appendPiece = diedPiece[arrayIndex];
                    animate(endingPosition, startingPosition, movingPiece, moveType, appendPiece);
                    arrayIndex--;
                }
                else{animate(endingPosition, startingPosition, movingPiece);}
                
            }
            else {
                kingStartingPosition = mainObject.move[index].colors[colorIndex].pieces[0].starting_position;
                kingEndingPosition = mainObject.move[index].colors[colorIndex].pieces[0].ending_position;
                rookStartingPosition = mainObject.move[index].colors[colorIndex].pieces[1].starting_position;
                rookEndingPosition = mainObject.move[index].colors[colorIndex].pieces[1].ending_position;
                pieceName = mainObject.move[index].colors[colorIndex].color + "_" + mainObject.move[index].colors[colorIndex].pieces[0].name;
                var kingPiece = document.getElementById(kingEndingPosition).firstChild;
                var rookPiece = document.getElementById(rookEndingPosition).firstChild;
                var kingEnding = document.getElementById(kingStartingPosition);
                var rookEnding = document.getElementById(rookStartingPosition);
                $(kingStartingPosition).remove(this.firstChild);
                $(rookStartingPosition).remove(this.firstChild);
                kingEnding.append(kingPiece);
                rookEnding.append(rookPiece);
                }
            if(colorIndex == 0 )index--;           
        }
        turnIndex--;
        }
    }); 
});
