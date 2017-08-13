$(document).ready(function(){
    // color(238,85,85);

    setColor(50,50,50)
    color(50,50,50);

    colourChange();
    window.setInterval(function(){
        colourChange();
    }, 500);
})