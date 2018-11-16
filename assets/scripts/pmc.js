$(document).ready(function(){

    setColor(220,75,75);
    color(220,75,75,15)
    
    colourChange();
    window.setInterval(function(){
        colourChange();
    }, 500);

    $('.headerPage').parallax({imageSrc: '../../assets/media/low/pmc.jpg'});

})