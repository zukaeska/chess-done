function freeMove(id){
    if(document.getElementById(id).style.backgroundColor == green){
        var rookPiece;
        var rookPlace;
        var kingXNumber =  parseInt(moveId.substr(0,1).charCodeAt(0)-64);
        var xNumber = parseInt(id.substr(0,1).charCodeAt(0)-64);
        var yNumber = parseInt(id.substr(2,1));
        var pieceName = document.getElementById(moveId).firstChild.className.substr(6);
        var movingPiece = document.getElementById(moveId).firstChild;
        var endPlace = document.getElementById(id);
        animate(moveId, id, movingPiece);
        if(pieceName == "king" && (xNumber == 2 || xNumber == 7) && Math.abs(kingXNumber - xNumber) > 1){
            if(xNumber == 2){
                    rookPiece = document.getElementById("A_" + yNumber).firstChild;
                    rookPlace = document.getElementById("C_" + yNumber);
            }
            else{
                rookPiece = document.getElementById("H_" + yNumber).firstChild;
                rookPlace = document.getElementById("F_" + yNumber);
            }
            rookPiece.remove();
            rookPlace.append(rookPiece);
        } 
        turnIndex++;   
    }
    if(document.getElementById(id).style.backgroundColor == blue){
        var movingPiece = document.getElementById(moveId).firstChild;
        var endPlace = document.getElementById(id);
        var endPiece = document.getElementById(id).firstChild;
        animate(moveId, id, movingPiece);
        endPiece.remove();
        turnIndex++;
    }
}