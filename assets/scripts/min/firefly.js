$(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
        $('.menu').css('opacity',1)
    }
    else {
        $('.menu').css('opacity',0)
    }
});

$(document).ready(function(){

    setColor(220,75,75);
    color(220,75,75,15)
    
    colourChange();
    window.setInterval(function(){
        colourChange();
    }, 500);

    $('.headerPage').parallax({imageSrc: '../../assets/media/big/firefly.jpg'});

})