$(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
        $('.tracker').css('opacity',1)
    }
    else {
        $('.tracker').css('opacity',0)
    }
});

$(document).ready(function(){
    // setColor(39,130,62)
    // color(39, 130, 62,10);

    setColor(64,128,187);
    color(64,128,187,8)
    
    colourChange();
    window.setInterval(function(){
        colourChange();
    }, 500);

    $('.tracker').on('click',function(){
        $('html, body').animate({ scrollTop: 0 }, 'bounce');

    })

    $('.headerPage').parallax({imageSrc: '../assets/media/gherkin.jpg'});

})