$(window).scroll(function() {
    if ($(window).scrollTop() > 300) {
        $('.tracker').css('opacity',1)
    }
    else {
        $('.tracker').css('opacity',0)
    }
});