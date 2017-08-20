$(document).ready(function(){
    setColor(250,250,250)
    color(245, 245, 245,5);
    
    colourChange();
    window.setInterval(function(){
        colourChange();
    }, 500);
})