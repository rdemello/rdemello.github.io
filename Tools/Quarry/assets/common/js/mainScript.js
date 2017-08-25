var searchList = [];
var searchResults = [];

function arrayFinishCreator(){
    for(i=0;i<stoneData.length;i++){
        if(stoneData[i].multipleFinishes>1){
            var finishString = stoneData[i].finish

            var finishArray = finishString.split(', ');

            stoneData[i].finishArray = finishArray;

            var imageOptions = [];

            for(j=0;j<finishArray.length;j++){

                var imgURL = "assets/common/media/stones/"+ stoneData[i]["url"]
                imgURL = imgURL.slice(0,-4);
                
                var fullURL = imgURL + "_" + stoneData[i]["finishArray"][j] + ".jpg"

                var object = {type:stoneData[i].finishArray[j], url:fullURL}
                imageOptions.push(object)
            }

            stoneData[i].urls = JSON.stringify(imageOptions)

        }

    }

}

function createSearchList(){
    for(i=0;i<stoneData.length;i++){
        var entry = {
            id:stoneData[i].id,
            type:stoneData[i].type,
            company:stoneData[i].company,
            colour:stoneData[i].colour,
            country:stoneData[i].country,
            name:stoneData[i].name,
            colorType: stoneData[i].colour + " " + stoneData[i].type,
            countryType: stoneData[i].country + " " + stoneData[i].type,
            multipleFinishes: stoneData[i].multipleFinishes,
            urls:stoneData[i].urls,
            url:stoneData[i].url,
            finishArray: stoneData[i].finishArray
        }
        searchList.push(entry);
    }
}

var searchOptions = {
    shouldSort:true,
    threshold: 0.3,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
        "id",
        "type",
        "product",
        "company",
        "colour",
        "country",
        "name",
        "colorType",
        "countryType",
        "multipleFinishes",
        "finishArray",
        "urls",
        "url"
    ]
}

var fuse = new Fuse (searchList, searchOptions)

function newSearch(){
    var entry = $.trim($("#query").val());
    if(entry.length>0){
        searchResults = fuse.search(entry.toString());
    } else {
        // searchResults = stoneData
    }
}

function bgColor(colour){
    if(colour=="Beige"){
        return "rgb(247, 215, 150)"
    } else if (colour=="Black"){
        return "rgb(90,90,90)"
    } else if (colour=="Blue"){
        return "rgb(200,200,230)"
    } else if (colour=="Brown"){
        return "rgb(191, 140, 93)"
    } else if (colour=="Gold"){
        return "rgb(247, 215, 150)"
    } else if (colour=="Green"){
        return "rgb(196, 224, 168)"
    } else if (colour=="Grey"){
        return "rgb(180,180,180)"
    } else if (colour=="Olive"){
        return "rgb(196, 224, 168)"
    } else if (colour=="Pink"){
        return "rgb(237, 194, 230)"
    } else if (colour=="Red"){
        return "rgb(216, 120, 104)"
    } else if (colour=="White"){
        return "rgb(250,250,250)"
    } else if (colour=="Yellow"){
        return "rgb(247, 241, 153)"
    } else {
        return "rgb(250,250,250)"
    }
}

function createCards(array, i){

    var thisID = array[i]["id"];

    var newCard = document.createElement("div");
        
        newCard.id = stoneData[thisID]["id"];

    var newInfo = document.createElement("div");
        newInfo.className = "stoneInfo";
        newCard.appendChild(newInfo);

    var newName = document.createElement("div");
        newName.className = "stoneName";
        newName.innerHTML = stoneData[thisID]["name"];
        newInfo.appendChild(newName);

    var newType = document.createElement("div");
        newType.className = "subInfo";
        newType.innerHTML = stoneData[thisID]["type"];
        newInfo.appendChild(newType);


    var newPic = document.createElement("img");
        if(array[i]["multipleFinishes"]>1){
            
            // var imageOptions = [];
            var newFinish = document.createElement("div");

            for(j=0;j<array[i]["finishArray"].length;j++){

                // var imgURL = "url('assets/common/media/stones/"+ stoneData[thisID]["url"]+"')"
                // imgURL = imgURL.slice(0,-6);
                
                // var fullURL = imgURL + "_" + array[i]["finishArray"][j] + ".jpg')"

                // var object = {type:array[i].finishArray[j], url:fullURL}
                // imageOptions.push(object)
                
                var newIndividualFinish = document.createElement("div");
                    if(j==0){
                    newIndividualFinish.className = "subInfo finishes selected";

                    } else {
                        newIndividualFinish.className = "subInfo finishes";
                    } 

                    newIndividualFinish.innerHTML = array[i]["finishArray"][j];
                    newFinish.appendChild(newIndividualFinish);

            }

            newPic.setAttribute("data-images",array[i]["urls"])

            var bg = JSON.parse(newPic.dataset.images)

            newPic.src = bg[0].url
            
        } 
        
        if(array[i]["multipleFinishes"]==1){
            newPic.src = "assets/common/media/stones/"+ array[i]["url"];
        
            var newFinish = document.createElement("div");
                newFinish.className = "subInfo singleFinish";
                newFinish.innerHTML = stoneData[thisID]["finish"];
        }

        // newPic.style.backgroundColor=bgColor(stoneData[thisID]["colour"]
        

        if($('input[name=sizeSelector]:checked').val()=="large"){
            newCard.className = "bigCard";
            newPic.className = "bigStonePic";
        } else {
            newCard.className = "card";
            newPic.className = "stonePic";
        }


        newCard.appendChild(newPic);

    

    // var newFinish = document.createElement("div");
    //     newFinish.className = "subInfo";
    //     newFinish.innerHTML = stoneData[thisID]["finish"];
        newCard.appendChild(newFinish)
    
    var newSubInfo = document.createElement("div");
        newSubInfo.className = "stoneInfo dark";
        newCard.appendChild(newSubInfo);


    var newCompany = document.createElement("div");
        newCompany.className = "subInfo";
        newCompany.innerHTML = stoneData[thisID]["company"];
        newSubInfo.appendChild(newCompany);


    var newLoc = document.createElement("div");
        newLoc.className = "subInfo";
        newLoc.innerHTML = stoneData[thisID]["location"];
        newSubInfo.appendChild(newLoc);

    var newCountry = document.createElement("div");
        newCountry.className = "subInfo";
        newCountry.innerHTML = stoneData[thisID]["country"];
        newSubInfo.appendChild(newCountry);

    document.getElementById("results").appendChild(newCard)

}

function search(){
    newSearch();
    if(searchResults.length>0){

        document.getElementById("results").innerHTML = "";

        for(var i=0; i<searchResults.length; i++){

                createCards(searchResults, i)

        }

    } else {

        document.getElementById("results").innerHTML = "No Results Found!";

    }

}

var $grid;

function loadIsotope(){
        $grid = $('.results').isotope({
        itemSelector: '.card',
        masonry: { 
            columnWidth : 276
        }
    });
}

$(document).ready(function(){

    arrayFinishCreator();
    createSearchList();
    loadIsotope();

    $('.searchBar').keyup(function(e){
        if(e.which==13){
            search();
            $('.results').isotope( 'reloadItems' ).isotope();
        }
    });
    
    $('.searchButton').on('click',function(){
        search();
    })

    $('.results').on('click','.stonePic, .bigStonePic',function(){
        $(this).toggleClass('open');
        $(this).parent('.card, .bigCard').toggleClass('open')
        $grid.isotope('layout')
    })

    $('#showList').on('click',function(){
        $('.results').toggleClass('split');
        $('.list').toggleClass('open');
        $grid.isotope('layout');
    })

    $('.results').on('click','.finishes',function(){
      
        var array = $(this).closest('.card, .bigCard').find('.stonePic,.bigStonePic').data('images')
        var selected = $(this).html()

        for(i=0;i<array.length;i++){
            if(array[i].type==selected){
                $(this).closest('.card, .bigCard').find('.stonePic, .bigStonePic').attr('src',array[i].url)
            }
        }

        $(this).addClass('selected')
        $(this).siblings().removeClass('selected')

    })

    $('input[name=sizeSelector]').on('change',function(){
        if($('input[name=sizeSelector]:checked').val()=="large"){
            $('.card').removeClass('card').addClass("bigCard");
            $('.stonePic').removeClass('stonePic').addClass("bigStonePic");
            $('.results').isotope({
                masonry:{columnWidth : 376 }
            })
            $grid.isotope('layout')
        } else {
            $('.bigCard').removeClass('bigCard').addClass("card");
            $('.bigStonePic').removeClass('bigStonePic').addClass("stonePic");
            $('.results').isotope({
                masonry:{columnWidth : 276 }
            })
            $grid.isotope('layout')
        }
    })


    $(window).scroll(function() {
        if ($(window).scrollTop() > 10) {
            $('.searchHeader').css('padding',"5px 0px 0px 0px")
        }
        else {
            $('.searchHeader').css('padding',"20px 0px")
        }
    });

})