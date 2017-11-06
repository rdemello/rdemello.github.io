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

function color(r,g,b,x){
    selectedColours =[
        'rgb('+r+','+g+','+b+')',
        'rgb('+r+','+parseInt(g+x)+','+b+')',
        'rgb('+r+','+g+','+parseInt(b+x)+')',
        'rgb('+r+','+parseInt(g+x)+','+parseInt(b+x)+')',
        'rgb('+r+','+parseInt(g+x)+','+parseInt(b+2*x)+')',
        'rgb('+r+','+parseInt(g+2*x)+','+parseInt(b+x)+')',
        'rgb('+r+','+parseInt(g+2*x)+','+parseInt(b+2*x)+')'
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

    window.sr = ScrollReveal();
    sr.reveal('.description', { duration: 700, scale:1, viewFactor:0.1 });
    sr.reveal('h1, h2, .tile', { duration: 500, scale:1, viewFactor:0.1  });

    $(".menuItem").hover(function(){
        $(this).next(".selection").toggleClass("hover")
    })

    $('.backToTop').on('click',function(){
        $('html, body').animate({ scrollTop: 0 }, 'ease');
    })

})