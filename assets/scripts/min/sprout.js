$(window).scroll(function() {
    if ($(window).scrollTop() > 350) {
        $('#menu').attr("class","menu menuFixed")
        $('.menu').css("background-color","rgb(127,176,73)")
    }
    else {
        $('#menu').attr("class","menu menuMove")
        $('.menu').css("background-color","rgba(127,176,73,0)")
    }
});

$(document).ready(function(){

    setColor(127,176,73);
    color(127,176,73,8);
    // $('.menu').css("background-color","rgb(127,176,73)")


    colourChange();
    window.setInterval(function(){
        colourChange();
    }, 500);

    $('#toTop').on('click',function(){
        $('html, body').animate({ scrollTop: 0 }, 'bounce');
    })

    $('.headerPage').parallax({imageSrc: '../../assets/media/big/sprout.jpg'});
    $('#epdPic').parallax({imageSrc: '../../assets/media/sprout/epd2.JPG'});
})
