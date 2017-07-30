var colours = [
    "#e55",
    "#e56",
    "#e65",
    "#e66",
    "#e76",
    "#e67",
    "#e77"
]

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
            $(this).css("background-color", colours[Math.floor(Math.random() * 7)]);
        }
    })

}

$(document).ready(function(){
    createGrid(8,8)
    colourChange();
    window.setInterval(function(){
        colourChange();
    }, 500);

    $(".menuItem").hover(function(){
        $(this).next(".selection").toggleClass("hover")
    })


})