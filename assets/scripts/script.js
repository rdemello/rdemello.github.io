var colours = [
    "#e55",
    "#e56",
    "#e65",
    "#e66",
    "#e76",
    "#e67",
    "#e77"
]

var selectedColours = [];

function color(r,g,b){
    selectedColours =[
        'rgb('+r+','+g+','+b+')',
        'rgb('+r+','+parseInt(g+17)+','+b+')',
        'rgb('+r+','+g+','+parseInt(b+17)+')',
        'rgb('+r+','+parseInt(g+17)+','+parseInt(b+17)+')',
        'rgb('+r+','+parseInt(g+17)+','+parseInt(b+34)+')',
        'rgb('+r+','+parseInt(g+34)+','+parseInt(b+17)+')',
        'rgb('+r+','+parseInt(g+34)+','+parseInt(b+34)+')'
    ];
}

function setColor(r,g,b){
    $('.titleHeader,.pixel,.tracker').css("background-color",'rgb('+r+','+g+','+b+')');
}

function createGrid(x, y){
    for(i=0; i<x; i++){
        var newPixelCol = document.createElement("div")
        newPixelCol.className = "pixelCol"
            for(j=0; j<y;j++){
                var Pixel = document.createElement("div")
                Pixel.className = "pixel"
                newPixelCol.appendChild(Pixel)
            }
        document.getElementById("pixelGrid").appendChild(newPixelCol)
    }
}

function colourChange(){
    $('.pixel').each(function(){
        if(Math.floor(Math.random()*10)>7){
            $(this).css("background-color", selectedColours[Math.floor(Math.random() * 7)]);
        }
    })
}

$(document).ready(function(){
    createGrid(8,8)

    $(".menuItem").hover(function(){
        $(this).next(".selection").toggleClass("hover")
    })


})