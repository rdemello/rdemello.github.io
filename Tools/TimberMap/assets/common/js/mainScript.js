var formattedData = [];
var map;
var selectedId = null;
var normHardness = [];
var normRupture = [];
var normElastic = [];
var normCrushing = [];
var searchList = [];
var performanceChart;
var show = false;

Array.max = function( array ){
    return Math.max.apply( Math, array );
};

Array.prototype.findCriteria = function(search,needle,criteria){

    for (var i = 0; i < this.length; i++){
        var name = this[i][search];
        
        if (needle===name)
            return this[i][criteria];
    }
    return null;
};

Array.prototype.findPosition = function(search,needle){

    for (var i = 0; i < this.length; i++){
        var name = this[i][search];
        
        if (needle===name)
            return this [i];
    }
    return null;
};

function setupData(){
    for(i=0;i<timberData.length;i++){
        var locationArray = timberData[i].location.split(", ");
        formattedData.push({id:timberData[i].id, name:timberData[i].name, location:locationArray})
    }
    normaliseData(normHardness,"hardness")
    normaliseData(normCrushing,"crushing")
    normaliseData(normElastic,"elastic")
    normaliseData(normRupture,"rupture")
};

function normaliseData(array,target){
    var newArray =[];
    for(var i=0; i<timberData.length; i++){
        var parse = parseFloat(timberData[i][target].replace(/,/g, "")) || 0
        newArray.push(parse)
    }
    var f =  Math.max.apply(Math, newArray)
    for(var j=0;j<newArray.length;j++){
        array.push(((newArray[j])/f)*10)
    }
};

var running = false;

function populateResults(array){

    var target = document.getElementById("countrySpeciesWrap")
    target.innerHTML=""

    var j=0

    function delay(){
        console.log(running)
        setTimeout(function(){
            var result = document.createElement("div")
            result.className = "result hidden"
            setTimeout(function(){
                result.className = "result"
                if(result.id==selectedId){
                    result.className = "result selected"
                }
            },25)
            result.innerHTML = array[j].name
            result.id = array[j].id

            target.appendChild(result)
            j++
            if(j<array.length){
                // if(running){
                    delay();                
                // }
            }
        },50)
    }
    delay();

    if(array.length==0){
        var result = document.createElement("div")
        result.className = "result selected"
        result.innerHTML = "No results found"
        target.appendChild(result)
    }
}

function createSearchList(){
    for(i=0;i<timberData.length;i++){
        var entry = {
            id:timberData[i].id,
            name:timberData[i].name
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
        "name"
    ]
}

var fuse = new Fuse (searchList, searchOptions)

function newSearch(){
    var entry = document.getElementById("search").value.toString();
    results = fuse.search(entry)
    populateResults(results);
}

function intGraph(){
    var ctx=document.getElementById("performanceChart").getContext("2d")

    performanceChart = new Chart(ctx, {
        type: 'bar',
        data:{
            labels: ["Hardness", "MoR", "MoE", "Crushing"],
            datasets:[{
                label: "Performance",
                backgroundColor:[
                    'rgba(102, 217, 255,.9)',
                    'rgba(102, 179, 255,.9)',
                    'rgba(77,136,255,.9)',
                    'rgba(140, 102, 255,.9)'
                ],
                data:[]
            }]
        },
        options:{
            maintainAspectRatio:false,
            legend:{
                display:false
            },
            reactive:true,
            scales:{
                yAxes:[{
                    gridLines:{
						color:"rgba(250,250,250,.5)",
						zeroLineColor:"rgba(250,250,250,1)"
					},
                    scaleLabel:{
                        display:false,
                        labelString: "kg CO2e"
                    },
                    ticks:{
                        fontColor:"#fff",
                        fontSize:12,
                        beginAtZero:true,
                        max:10
                    }
                }],
                xAxes:[{
                    ticks:{
                        fontColor:"#fff",
                        fontSize:12
                    }
                }]
            },
            tooltips:{
                display:false
            }
        }
    })
}

function mapboxstart(){
   mapboxgl.accessToken = 'pk.eyJ1IjoiYXNzZXRtYW5hZ2VtZW50IiwiYSI6IlFKOUloLUUifQ.wUF2RB2uBINRin0x1T36AA';

    var bounds = [
        [-90,-90],
        [90,90]
    ]

    map = new mapboxgl.Map({
        container: 'map', 
        style: 'mapbox://styles/assetmanagement/cj1f3a6ga00iz2smk2updx9cd',
        // center: [-74.50, 40], 
        zoom: 2,
        logoPosition:"top-right",
        attributionControl: false,
        // maxBounds: bounds,
        zoomControls:false
    });

    map.on('load',function(){
        map.addSource("countries",{
            "type":"geojson",
            "data":"assets/common/js/Countries.geo.json"
        })

        map.addLayer({
            "id":"country-fill",
            "type":"fill",
            "source":"countries",
            "paint":{
                "fill-color":"#5b7",
                "fill-opacity":0
            }
        })

        map.addLayer({
            "id":"country-fill-search",
            "type":"fill",
            "source":"countries",
            "paint":{
                "fill-color":"#ffcc80",
                "fill-opacity":0.5
            },
            "filter": ["==", "name", ""]
        },"water")

        map.addLayer({
            "id":"country-fill-select",
            "type":"fill",
            "source":"countries",
            "paint":{
                "fill-color":"#ffc266",
                "fill-opacity":0.1
            },
            "filter": ["==", "name", ""]
        })

        map.addLayer({
            "id":"country-fill-line-select",
            "type":"line",
            "source":"countries",
            "paint":{
                "line-color": "#ffc266",
                "line-width": 3
            },
            "filter": ["==", "name", ""]
        })

        // map.on("mousemove","country-fill",function(e){
        //     var features = map.queryRenderedFeatures(e.point, {layers:["country-fill"]});

        //     if(features.length){
        //         map.setFilter("country-fill-hover", ["==","loc",features[0].properties.loc])
        //         map.setFilter("country-fill-hover-line", ["==","loc",features[0].properties.loc])
        //     } 
        // })

        // map.on("mouseleave", "country-fill", function() {
        //     map.setFilter("country-fill-hover", ["==", "loc", ""]);
        //     map.setFilter("country-fill-hover-line", ["==", "loc", ""])
        // });

        map.on("click", function(e) {
            var features = map.queryRenderedFeatures(e.point, {layers:["country-fill"]});
            if(features.length){
                var selected = features[0].properties.loc
                var species = [];
                for(i=0;i<formattedData.length;i++){
                    for(j=0;j<formattedData[i].location.length;j++){
                        if(selected==formattedData[i].location[j]){
                            species.push({id:timberData[i].id, name:timberData[i].name})
                        }
                    }
                }
                populateResults(species)
            }

            if(features.length){
                map.setFilter("country-fill-line-select", ["==","loc",features[0].properties.loc])
            } 

        });

    });   

}

function updateGraph(id){
    var results = [normHardness[id], normRupture[id], normElastic[id], normCrushing[id]];
    performanceChart.data.datasets[0].data = results;
    performanceChart.update();
}

function loadTimber(y){

    document.getElementById("timberInfo").className = "timberInfo"

    var id = parseInt(y)-1
    var list = formattedData[id].location;
    var filters = [];
    for(i=0;i<list.length;i++){
        filters.push(["==","loc",list[i]])
    }
    map.setFilter("country-fill-search", ["any"].concat(filters))

    document.getElementById("timberTitle").innerHTML = timberData[id].name
    document.getElementById("scientific").innerHTML = timberData[id].scientific
    document.getElementById("density").innerHTML = timberData[id].density
    document.getElementById("hardness").innerHTML = timberData[id].hardness
    document.getElementById("rupture").innerHTML = timberData[id].rupture
    document.getElementById("elastic").innerHTML = timberData[id].elastic
    document.getElementById("crushing").innerHTML = timberData[id].crushing
    document.getElementById("sustStatus").innerHTML = timberData[id].sustainable

    if(show==false){
        intGraph();
        updateGraph(id);
        show=true;
    } else {
        updateGraph(id)
    }

}

window.onload = function(){
    mapboxstart();
    setupData();
    intGraph();
    createSearchList();

    $('.overlay').on('click','.result',function(){
        loadTimber($(this).attr('id'))
        $(this).addClass("selected")
        $(this).siblings('.result').removeClass('selected')
        selectedId = $(this).attr('id')
    });

    $(".infoButton").click(function(){
        var target = document.getElementById(($(this).attr("switch")))
        $(this).addClass("active")
        $(this).siblings().removeClass('active')
        $(target).toggleClass("open")
        $(target).siblings().addClass("closed")
        $(target).toggleClass("closed")
    });

    $('#search').keyup(function(e){
        if(e.which==13){
            newSearch();
        }
    });

    $('.searchButton').on('click', function(){
        $(this).addClass('open')
        $('.search').addClass('open')
    });

    $('.closeIcon').on('click', function(){
        $('.timberInfo').addClass('hidden')
        map.setFilter("country-fill-search", ["==","loc",""])
        $(".result").removeClass("selected")
    });
 
}