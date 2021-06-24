var brownCell , whiteCell;
var moves;
var rowIndex, columnIndex;
const brown = "brown" , white = "white" , yellow = "yellow" , green = "green" , blue = "blue" , black = "black"; //colors
const knightMoves = [[1, 2],[2, 1],[2, -1],[1, -2],[-1, -2],[-2, -1],[-2, 1],[-1, 2]];
const char64 = "@";
const king = "king", rook = "rook", bishop = "bishop", queen = "queen", pawn = "pawn", knight = "knight";
brownCell = document.getElementsByClassName(brown);
whiteCell = document.getElementsByClassName(white);
const diagonal = "diagonal";
const horizontal = "horizontal";
var kingArray = [];
var moveID;
var turnIndex  = 0;

//jQuery functions
$("td.free").click(function(){
    freeMove(this.id);
    });
$("td.tray").click(function(){
    posibleMoves(this.id);
    });




//functions
function turn(){
   if (turnIndex % 2 == 0) {return white;}
   else {return black} 
}
function changeColor (first, second, color) { //changes background color
    if(document.getElementById(first + "_" + second) !== null)
    document.getElementById(first + "_" + second).style.backgroundColor = color ;
}
function charToCode (secondChar, secondNumber) { //gets number from char
    return secondChar.charCodeAt(secondNumber);
}
function numberToChar (firstChar, charNumber, firstNumber) { // gets string from number
   return String.fromCharCode(charToCode (firstChar, charNumber) + firstNumber);
}
function check (x,y) { //checks is cell free or not
    if(document.getElementById(x + "_" + y) !== undefined && document.getElementById(x + "_" + y) !== null){
    return  document.getElementById(x + "_" + y).childNodes.length;    
    }
}
function checkColor (x,y,color) { // cheks piece color
    if(document.getElementById(x + "_" + y) !== undefined && document.getElementById(x + "_" + y) !== null){
    return document.getElementById(x + "_" + y).childNodes.length && 
    document.getElementById(x + "_" + y).firstChild.className.substr(0,5) == color;
    }
}
function pieceType (name, type) { //cheks piece type
    if(name == king) {return true};
    if(name == rook) {if(type == diagonal)return false; else return true};
    if(name == bishop) {if(type == diagonal)return true; else return false};
    if(name == queen) {return true};
}
function pawnType (color) {
    if(color == white) return  moves = [1, 2, 2];else  return moves = [-1, -2, 7];
}
function adressCell (indexNumber) {
    return numberToChar (char64, 0, indexNumber);
}
resetArray();
function resetArray(){
    for(rowIndex = 1; rowIndex < 9; rowIndex++){ //double array push
        kingArray[rowIndex] = [];
        for(columnIndex = 1; columnIndex <= 9; columnIndex++)
        kingArray[rowIndex].push(0);
    }
}
function checkRook(letter, number){
    if(document.getElementById(letter + "_" + number).firstChild !== null){
        if(document.getElementById(letter + "_" + number).firstChild.className.substr(6) == rook){
            return true; 
        }
        else{
            return false; 
        }
    }
}


    function posibleMoves (idName) { //onclick function
        moveId = idName;
        for( rowIndex = 0; rowIndex < brownCell.length; rowIndex++){
            brownCell[rowIndex].style.backgroundColor = brown;
            whiteCell[rowIndex].style.backgroundColor = white;
        }
        if(document.getElementById(idName).firstChild !== undefined && document.getElementById(idName).firstChild !== null){
            document.getElementById(idName).style.backgroundColor = yellow;
        //frequently used variables and functions
        var piece = document.getElementById(idName).firstChild.className; 
        var pieceClass = piece.substr(6);
        var pieceColor = piece.substr(0,5);
        if(turn() != pieceColor){
           return;
        }
        var letter = idName.slice(0, 1);
        var numberY = parseInt (idName.slice(2));
        var numberX = parseInt (letter.charCodeAt(0)-64);
        function coordinate (number) {
            return numberY + number;
        }
        var idAdress1 = numberToChar (letter, 0, 1);
        var idAdress2 = numberToChar (letter, 0, -1);
        function adress (indexNumber) {
            return numberToChar (letter, 0, knightMoves[indexNumber][0]);
        }
        function detectColor () {
            if(pieceColor == white) return black;
            else return white;
        }


        if(pieceClass == "pawn") pawn();
            function pawn(){ //pawn 
            pawnType(pieceColor);
                if(!check (letter, coordinate(moves[0]))){
                    changeColor(letter, coordinate(moves[0]), green);

            }
                if(!check (letter, coordinate(moves[0])) && !check (letter, coordinate(moves[1])) && numberY == moves[2]){
                    changeColor (letter, coordinate (moves[1]), green);
            }
            if(numberX < 8 && numberY < 8){
                if(checkColor (idAdress1, coordinate (moves[0]), detectColor())){
                    changeColor (idAdress1, coordinate (moves[0]), blue);
                }
            }
            if(numberX > 1 && numberY > 1){
                if(checkColor(idAdress2, coordinate (moves[0]), detectColor())){
                    changeColor(idAdress2, coordinate (moves[0]), blue);
                }
            }
        }
        if(pieceClass == "knight") knight();
        function knight() { // knight
            for( rowIndex = 0; rowIndex < 8; rowIndex++){
                if(numberX + knightMoves[rowIndex][0] > 0 && numberX + knightMoves[rowIndex][0] < 9 && 
                    numberY + knightMoves[rowIndex][1] > 0 && numberY + knightMoves[rowIndex][1] < 9){
                    if(!check (adress (rowIndex),numberY + knightMoves[rowIndex][1])){
                        changeColor (adress (rowIndex),(numberY + knightMoves[rowIndex][1]), green);
                    }
                    if(checkColor (adress (rowIndex),numberY + knightMoves[rowIndex][1], detectColor())){
                        changeColor ( adress(rowIndex),(numberY + knightMoves[rowIndex][1]), blue);
                    }
                }
            }
        }
        if(pieceClass != "pawn" && pieceClass != "knight") fourPieces();
        function fourPieces(){ //king,queen,bishop,rook
            for( rowIndex = numberX - 1, columnIndex = numberY - 1; rowIndex > 0 && columnIndex > 0; rowIndex--, columnIndex--){
                if(!pieceType (pieceClass, diagonal)) break;
                if(!check (adressCell (rowIndex), columnIndex)){
                    changeColor (adressCell (rowIndex) , columnIndex, green);
                    if(pieceClass == king){kingArray[rowIndex][columnIndex] = 1};
                }
                if(checkColor (adressCell (rowIndex), columnIndex, detectColor())){
                    changeColor (adressCell (rowIndex), columnIndex, blue);
                    if(pieceClass == king){kingArray[rowIndex][columnIndex] = 1}
                    break ;
                }
                if(checkColor (adressCell (rowIndex), columnIndex, pieceColor)){
                    break ;
                }
                if(pieceClass == king) {break;}
            }
            for( rowIndex = numberX + 1, columnIndex = numberY - 1;rowIndex < 9 && columnIndex > 0;rowIndex++, columnIndex--){
                if(!pieceType (pieceClass, diagonal)) break;
                if(!check (adressCell (rowIndex), columnIndex)){
                    changeColor (adressCell (rowIndex) , columnIndex, green);
                    if(pieceClass == king){kingArray[rowIndex][columnIndex] = 1};
                }
                if(checkColor (adressCell (rowIndex), columnIndex, detectColor())){
                    changeColor (adressCell (rowIndex) , columnIndex, blue);
                    if(pieceClass == king){kingArray[rowIndex][columnIndex] = 1}
                    break ;
                }
                if(checkColor (adressCell (rowIndex), columnIndex, pieceColor)){
                    break ;
                }
                if(pieceClass == king) break;
            }
            for( rowIndex = numberX + 1,columnIndex = numberY + 1;rowIndex < 9 && columnIndex < 9;rowIndex++, columnIndex++){
                if(!pieceType(pieceClass, diagonal)) break;
                if(!check(adressCell(rowIndex),columnIndex)){
                    changeColor (adressCell(rowIndex) , columnIndex, green);
                    if(pieceClass == king){kingArray[rowIndex][columnIndex] = 1};
                }
                if(checkColor(adressCell(rowIndex),columnIndex,detectColor())){
                    changeColor (adressCell(rowIndex) , columnIndex, blue);
                    if(pieceClass == king){kingArray[rowIndex][columnIndex] = 1}
                    break ;
                }
                if(checkColor(adressCell(rowIndex),columnIndex,pieceColor)){
                    break ;
                }
                if(pieceClass == king) break;
            }
            for( rowIndex = numberX - 1,columnIndex = numberY + 1;rowIndex > 0 && columnIndex < 9;rowIndex--, columnIndex++){
                if(!pieceType(pieceClass, diagonal)) break;
                if(!check (adressCell (rowIndex), columnIndex)){
                    changeColor (adressCell(rowIndex) , columnIndex, green);
                    if(pieceClass == king){kingArray[rowIndex][columnIndex] = 1};
                }
                if(checkColor (adressCell (rowIndex), columnIndex, detectColor())){
                    changeColor (adressCell(rowIndex) , columnIndex, blue);
                    if(pieceClass == king){kingArray[rowIndex][columnIndex] = 1}
                    break ;
                }
                if(checkColor (adressCell (rowIndex), columnIndex, pieceColor)){
                    break ;
                }
                if(pieceClass == king) break;
            }
            for( rowIndex = numberX - 1 , columnIndex = numberY;rowIndex > 0;rowIndex--){
                if(!pieceType (pieceClass, horizontal)) break;
                if(!check (adressCell (rowIndex),columnIndex)){
                    changeColor (adressCell(rowIndex) , columnIndex, green);
                    if(pieceClass == king){kingArray[rowIndex][columnIndex] = 1};
                }
                if(checkColor(adressCell(rowIndex),columnIndex,detectColor())){
                    changeColor (adressCell(rowIndex) , columnIndex, blue);
                    if(pieceClass == king){kingArray[rowIndex][columnIndex] = 1}
                    break ;
                }
                if(checkColor (adressCell(rowIndex), columnIndex, pieceColor)){
                    break ;
                }
                if(pieceClass == king) break;
            }
            for( rowIndex = numberX + 1 , columnIndex = numberY;rowIndex < 9;rowIndex++){
                if(!pieceType (pieceClass, horizontal)) break;
                if(!check (adressCell (rowIndex), columnIndex)){
                    changeColor (adressCell (rowIndex) , columnIndex, green);
                    if(pieceClass == king){kingArray[rowIndex][columnIndex] = 1};
                }
                if(checkColor (adressCell (rowIndex), columnIndex, detectColor())){
                    changeColor (adressCell (rowIndex) , columnIndex, blue);
                    if(pieceClass == king){kingArray[rowIndex][columnIndex] = 1}
                    break ;
                }
                if(checkColor (adressCell (rowIndex), columnIndex, pieceColor)){
                    break ;
                }
                if(pieceClass == king) break;
            }
            for( rowIndex = numberX , columnIndex = numberY + 1;columnIndex < 9;columnIndex++){
                if(!pieceType (pieceClass, horizontal)) break;
                if(!check (adressCell (rowIndex), columnIndex)){
                    changeColor (adressCell (rowIndex) , columnIndex, green);
                    if(pieceClass == king){kingArray[rowIndex][columnIndex] = 1};
                }
                if(checkColor (adressCell(rowIndex),columnIndex,detectColor())){
                    changeColor (adressCell(rowIndex) , columnIndex, blue);
                    if(pieceClass == king){kingArray[rowIndex][columnIndex] = 1}
                    break ;
                }
                if(checkColor (adressCell (rowIndex), columnIndex, pieceColor)){
                    break ;
                }
                if(pieceClass == king) break;
            }
            for( rowIndex = numberX , columnIndex = numberY - 1;columnIndex > 0;columnIndex--){
                if(!pieceType (pieceClass, horizontal)) break;
                if(!check (adressCell (rowIndex), columnIndex)){
                    changeColor (adressCell(rowIndex) , columnIndex, green);
                    if(pieceClass == king){kingArray[rowIndex][columnIndex] = 1};
                }
                if(checkColor (adressCell (rowIndex), columnIndex, detectColor())){
                    changeColor (adressCell(rowIndex) , columnIndex, blue);
                    if(pieceClass == king){kingArray[rowIndex][columnIndex] = 1}
                    break ;
                }
                if(checkColor (adressCell (rowIndex), columnIndex, pieceColor)){
                    break ;
                }
                if(pieceClass == king) break;
            }
 
        }
        if (pieceClass == king && (numberY == 1 || numberY == 8) && (numberX == 5 || numberX == 4)){
            for (index = numberX - 1; index > 1; index--){
                if(!checkRook(adressCell(1), numberY)){
                    break;
                }
                if(check(adressCell(index), numberY)){
                    break;
                }
            }
            if(index == 1){
                changeColor(adressCell(2), numberY, green);
                kingArray[2][numberY] = 1;
            }
            for (index = numberX + 1; index < 8; index++){
                if(!checkRook(adressCell(8), numberY)){
                    break;
                }
                if(check(adressCell(index), numberY)){
                    break;
                }
            }
            if(index == 8){
                changeColor(adressCell(7), numberY, green);
                kingArray[7][numberY] = 1;
            }
        }
        if (pieceClass == king){
           kingDanger(pieceColor,kingArray,knightMoves);
        }
        resetArray();
    }
}







