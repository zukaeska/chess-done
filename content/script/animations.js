function animate(starting, ending, piece, type, diedPiece){
    var endPlace = document.getElementById(ending);
    var startCoordinate = $("#" + starting).offset();
    var endCoordinate = $("#" + ending).offset();
    var lengthTop = endCoordinate.top - startCoordinate.top;
    var lengthLeft = endCoordinate.left - startCoordinate.left
     $(piece).css("position","relative")
     .animate({top:'+=' + lengthTop + 'px',left:'+=' + lengthLeft + 'px'},100,function(){ 
         endPlace.append(piece);
        $(piece).css("position","static");
        $(piece).css({top: 0, left: 0});
        if(type == "kill"){
            $("#" + starting).append(diedPiece);
        }
    });
}