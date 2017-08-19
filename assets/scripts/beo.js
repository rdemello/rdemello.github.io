$(document).ready(function(){
    setColor(250,250,250)
    color(230, 235, 230,5);
    
    colourChange();
    window.setInterval(function(){
        colourChange();
    }, 500);
})