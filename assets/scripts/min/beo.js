$(document).ready(function(){

    setColor(127,176,73);
    color(127,176,73,8);

    
    colourChange();
    window.setInterval(function(){
        colourChange();
    }, 500);

    $('.tracker').on('click',function(){
        $('html, body').animate({ scrollTop: 0 }, 'bounce');

    })

    $('.headerPage').parallax({imageSrc: '../../assets/media/beo/pot front.jpg'});
})