var dangerArray = [];
var movess
function checkClass(pieceId){
    if (document.getElementById(pieceId).className.substr(5,5) == "brown") return brown; else return white;
}
resetDanger();
function resetDanger(){
        for(rowIndex = 1; rowIndex < 9; rowIndex++){ //double array push
        dangerArray[rowIndex] = [];
        for(columnIndex = 1; columnIndex <= 9; columnIndex++)
        dangerArray[rowIndex].push(0);
    }
}
function kingDanger(color,arrayKing,arrayKnight){
    function detect(){
        if (color == black)return white; else return black;
    }
    function pawnMoves(color){
        if (color == black) return movess = [1, -1, -1, -1]; else return movess = [1, 1, -1, 1];
    }
    for (rowIndex = 1; rowIndex < 9; rowIndex++){//main loop
        for (columnIndex = 1; columnIndex < 9; columnIndex++){
        var id = numberToChar(char64, 0, rowIndex) + "_" + columnIndex;
            if (document.getElementById(id).childElementCount !== 0){
                function coordinateY (number) {
                    return numberY + number;
                }
                var letter = id.slice(0, 1);
                var numberY = parseInt (id.slice(2));
                var numberX = parseInt (letter.charCodeAt(0)-64);
                var colorPiece = document.getElementById(id).firstChild.className.substr(0,5);
                var classPiece = document.getElementById(id).firstChild.className.substr(6);
                function detectColors(){
                    if(colorPiece == white) return black;
                        else return white;
                }
                if (colorPiece == detect()){
                    if (classPiece == pawn){//pawn
                        pawnMoves(colorPiece);
                        if(numberX < 8 && numberY < 8){
                                    dangerArray[numberX + movess[0]][coordinateY(movess[1])] = 1;                       
                        }
                        if(numberX > 1 && numberY > 1){                           
                                dangerArray[numberX + movess[2]][coordinateY(movess[3])] = 1; 
                        }
                    }                       
                    if(classPiece == knight){ // knight
                        for( index = 0; index < 8; index++){
                            if(numberX + arrayKnight[index][0] > 0 && numberX + arrayKnight[index][0] < 9 && 
                                numberY + arrayKnight[index][1] > 0 && numberY + arrayKnight[index][1] < 9){
                                        dangerArray[numberX + arrayKnight[index][0]][numberY + arrayKnight[index][1]] = 1;
                            }
                        }
                    }
                    if (classPiece != pawn && classPiece != knight){
                        for ( firstIndex = numberX - 1, secondIndex = numberY - 1; firstIndex > 0 && secondIndex > 0; firstIndex--, secondIndex--){
                            if (!pieceType (classPiece, diagonal)) break;
                            if (!check(adressCell (firstIndex), secondIndex)){
                                dangerArray[firstIndex][secondIndex] = 1;
                            }
                            if(checkColor (adressCell (firstIndex), secondIndex, detect())){
                                dangerArray[firstIndex][secondIndex] = 1;
                                break;
                            }
                            if(checkColor (adressCell (firstIndex), secondIndex, detectColors())){
                                break;
                            }
                            if (classPiece == king) break;
                        }
                        for ( firstIndex = numberX + 1, secondIndex = numberY - 1;firstIndex < 9 && secondIndex > 0;firstIndex++, secondIndex--){
                            if (!pieceType (classPiece, diagonal)) break;
                            if (!check(adressCell (firstIndex), secondIndex)){
                                dangerArray[firstIndex][secondIndex] = 1;
                            }
                            if(checkColor (adressCell (firstIndex), secondIndex, detect())){
                                dangerArray[firstIndex][secondIndex] = 1;
                                break;
                            }
                            if(checkColor (adressCell (firstIndex), secondIndex, detectColors())){
                                break;
                            }
                            if (classPiece == king) break;
                        }
                        for( firstIndex = numberX + 1,secondIndex = numberY + 1;firstIndex < 9 && secondIndex < 9;firstIndex++, secondIndex++){
                            if (!pieceType (classPiece, diagonal)) break;
                            if (!check(adressCell (firstIndex), secondIndex)){
                                dangerArray[firstIndex][secondIndex] = 1;
                            }
                            if(checkColor (adressCell (firstIndex), secondIndex, detect())){
                                dangerArray[firstIndex][secondIndex] = 1;
                                break;
                            }
                            if(checkColor (adressCell (firstIndex), secondIndex, detectColors())){
                                break;
                            }
                            if (classPiece == king) break;
                        }
                        for ( firstIndex = numberX - 1,secondIndex = numberY + 1;firstIndex > 0 && secondIndex < 9;firstIndex--, secondIndex++){
                            if (!pieceType (classPiece, diagonal)) break;
                            if (!check(adressCell (firstIndex), secondIndex)){
                                dangerArray[firstIndex][secondIndex] = 1;
                            }
                            if(checkColor (adressCell (firstIndex), secondIndex, detect())){
                                dangerArray[firstIndex][secondIndex] = 1;
                                break;
                            }
                            if(checkColor (adressCell (firstIndex), secondIndex, detectColors())){
                                break;
                            }
                            if (classPiece == king) break;
                        }
                        for ( firstIndex = numberX - 1 , secondIndex = numberY;firstIndex > 0;firstIndex--){
                            if (!pieceType (classPiece, horizontal)) break;
                            if (!check(adressCell (firstIndex), secondIndex)){
                                dangerArray[firstIndex][secondIndex] = 1;
                            }
                            if(checkColor (adressCell (firstIndex), secondIndex, detect())){
                                dangerArray[firstIndex][secondIndex] = 1;
                                break;
                            }
                            if(checkColor (adressCell (firstIndex), secondIndex, detectColors())){
                                break;
                            }
                            if (classPiece == king) break;
                        }
                        for ( firstIndex = numberX + 1 , secondIndex = numberY;firstIndex < 9;firstIndex++){
                            if (!pieceType (classPiece, horizontal)) break;
                            if (!check(adressCell (firstIndex), secondIndex)){
                                dangerArray[firstIndex][secondIndex] = 1;
                            }
                            if(checkColor (adressCell (firstIndex), secondIndex, detect())){
                                dangerArray[firstIndex][secondIndex] = 1;
                                break;
                            }
                            if(checkColor (adressCell (firstIndex), secondIndex, detectColors())){
                                break;
                            }
                            if (classPiece == king) break;
                        }
                        for ( firstIndex = numberX , secondIndex = numberY + 1;secondIndex < 9;secondIndex++){
                            if (!pieceType (classPiece, horizontal)) break;
                            if (!check(adressCell (firstIndex), secondIndex)){
                                dangerArray[firstIndex][secondIndex] = 1;
                            }
                            if(checkColor (adressCell (firstIndex), secondIndex, detect())){
                                dangerArray[firstIndex][secondIndex] = 1;
                                break;
                            }
                            if(checkColor (adressCell (firstIndex), secondIndex, detectColors())){
                                break;
                            }
                            if (classPiece == king) break;
                        }
                        for ( firstIndex = numberX , secondIndex = numberY - 1;secondIndex > 0;secondIndex--){
                            if (!pieceType (classPiece, horizontal)) break;
                            if (!check(adressCell (firstIndex), secondIndex)){
                                dangerArray[firstIndex][secondIndex] = 1;
                            }
                            if(checkColor (adressCell (firstIndex), secondIndex, detect())){
                                dangerArray[firstIndex][secondIndex] = 1;
                                break;
                            }
                            if(checkColor (adressCell (firstIndex), secondIndex, detectColors())){
                                break;
                            }
                            if (classPiece == king) break;
                        }
                    }
                }
            }
        }
    }

    for (firstIndex = 1; firstIndex < 9; firstIndex++){
        for (secondIndex = 1; secondIndex < 9; secondIndex++){
            if (dangerArray[firstIndex][secondIndex] == arrayKing[firstIndex][secondIndex] && dangerArray[firstIndex][secondIndex] == 1){
                document.getElementById(adressCell(firstIndex) + "_" + secondIndex).style.backgroundColor = checkClass(adressCell(firstIndex) + "_" + secondIndex);
            }
        }
    } 
    resetDanger();
}


