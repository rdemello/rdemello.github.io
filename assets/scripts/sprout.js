$(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
        $('.tracker').css('opacity',1)
    }
    else {
        $('.tracker').css('opacity',0)
    }
});

$(document).ready(function(){
    setColor(39,130,62)
    color(39, 130, 62,10);
    
    colourChange();
    window.setInterval(function(){
        colourChange();
    }, 500);
})