var $grid = $('.content').isotope({
    itemSelector: '.element-item',
    layoutMode: 'masonry'
});

$('.filterBar').on( 'click', 'div', function() {
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({ filter: filterValue });
});


$(document).ready(function(){
    
    $('.tile').hover(function(){
        $(this).toggleClass('hover')
    })

    $('.filter').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    
    })
    
})
