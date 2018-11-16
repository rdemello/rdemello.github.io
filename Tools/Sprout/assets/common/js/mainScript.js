function concatValues(obj){
    var value ='';
    for (var prop in obj){
        value += obj[prop];
    }
    return value;
}

function loadTiles(){
    var l = dataset.length;

    for(i=0; i<l; i++){
        var newElement = document.createElement('div');
        newElement.className = "card";
        newElement.id = i

        if(dataset[i].flooring === 1){
            newElement.className += " flooring" + " " + dataset[i].type
        }

        if(dataset[i].cladding === 1){
            newElement.className += " cladding" + " " + dataset[i].type
        }

        if(dataset[i].structural === 1){
            newElement.className += " structural" + " " + dataset[i].type
        }

        if(dataset[i].other === 1){
            newElement.className += " other" + " " + dataset[i].type
        }

        document.getElementById("section").appendChild(newElement);

        //DIV SET UPS

        var newEleCont = document.createElement('div')
        newEleCont.className = "cardInfo"
        newEleCont.style.backgroundImage = dataset[i].image
        newElement.appendChild(newEleCont)

        var newOverlay = document.createElement('div')
        newOverlay.className = "overlay"
        newElement.appendChild(newOverlay)

        var newHeader = document.createElement('div')
        // newHeader.className = "header"
        

        if(dataset[i].flooring === 1){
            newHeader.className = " header flborder"
        }

        if(dataset[i].cladding === 1){
            newHeader.className += "header clborder"
        }

        if(dataset[i].structural === 1){
            newHeader.className += "header stborder"
        }

        if(dataset[i].other === 1){
            newHeader.className += "header otborder"
        }

        newElement.appendChild(newHeader)

        var local = document.createElement('div')
        local.className = "distanceBar"
        local.id = "local"
        local.innerHTML = "+ Sourced Locally"
        newElement.appendChild(local)

        var far = document.createElement('div')
        far.className = "distanceBar"
        far.id = "far"
        far.style = "border-radius: 0px 0px 5px 5px"
        far.innerHTML = "+ Sourced Internationally"
        newElement.appendChild(far)
               
        var circle = document.createElement('div')
        circle.className = "addCircle"
        circle.innerHTML = "+"
        newElement.appendChild(circle)

        var content = document.createElement('div')
        content.className = "content";
        newOverlay.appendChild(content)

        //TEXT SET UPS

        var pName = document.createElement('p')
        pName.className = "materialTitle name";
        pName.innerHTML = dataset[i].name
        newHeader.appendChild(pName)

        var pType = document.createElement('p')
        pType.className = "materialInfo type";
        pType.innerHTML = dataset[i].type
        content.appendChild(pType) 

        var pApp = document.createElement('p')
        pApp.className = "materialInfo info";
        pApp.innerHTML = dataset[i].application
        content.appendChild(pApp) 

        var pNote = document.createElement('p')
        pNote.className = "materialInfo info";
        pNote.innerHTML = dataset[i].info
        content.appendChild(pNote)

        var pValue = document.createElement('p')
        pValue.className = "value";
        pValue.innerHTML = ((Math.round(dataset[i].value/1))*1) + " <span class='unit'> kg CO<sub>2</sub>e/m<sup>"+dataset[i].unit+"</sup></span>"
        newHeader.appendChild(pValue)

        // var pUnit = document.createElement('p')
        // pUnit.className = "unit";
        // pUnit.innerHTML = "kg CO<sub>2</sub> e /m<sup>"+dataset[i].unit+"</sup>"
        // newOverlay.appendChild(pUnit)        
    }
}

var local = 321
var far = 9000
var tableData =[];
var myChart;

function warningMessage(){
    var hasStruc = false;
    var hasOther = false;

    for(i=0;i<tableData.length;i++){
        if(tableData[i][1]=="Structural"){
            hasStruc = true
        }

        if(tableData[i][1]!="Structural"){
            hasOther=true
        }
    }

    if(hasStruc===true && hasOther===true){
        $("#warningMessage").addClass("show") 
    } else if(hasStruc===false || hasOther===false){
        $("#warningMessage").removeClass("show") 
    }
}

function calcDist(distance,id){
    var impact
    var thisData = []
    

    if(distance===local){
        impact = (local * 0.00003266 * parseInt(dataset[id].weight)) + parseInt(dataset[id].value)
        thisData = [dataset[id].name, dataset[id].application, "Local", Math.round(impact*100)/100];
    } else {
        impact = (far * 0.00003266 * parseInt(dataset[id].weight)) + parseInt(dataset[id].value)
        thisData = [dataset[id].name, dataset[id].application, "International", Math.round(impact*100)/100];
    }

    tableData.push(thisData)

    warningMessage();
}

function createList(){
    if(tableData.length>1){
        document.getElementById("list").innerHTML = ""
    }

    for(i=0; i<tableData.length; i++){

        var newListItem = document.createElement('div')
        newListItem.className = "listItem";

        if(tableData[i][1]=="Cladding"){
            newListItem.className = "listItem clborder"
        }

        if(tableData[i][1]=="Flooring"){
            newListItem.className = "listItem flborder"
        }

        if(tableData[i][1]=="Structural"){
            newListItem.className = "listItem stborder"
        }

        if(tableData[i][1]=="Other"){
            newListItem.className = "listItem otborder"
        }


        var circle = document.createElement('div')
        circle.className = "remove"
        circle.innerHTML = "+"
        circle.id = i

        var newContent = document.createElement('div')
        newContent.innerHTML = tableData[i][2].substring(0,3)+" "+ tableData[i][0] +"<p class='tableValue'>"+tableData[i][3]+"</p>"

        newContent.className = "listContent"

        newListItem.appendChild(circle)

        newListItem.appendChild(newContent)

        document.getElementById("list").appendChild(newListItem)
    }
}

// var myChart;

// function clearGraph(){
//     myChart.destory();
// }
var dataLabels=[];
var dataSet=[];

var flooringColour="#e55"
var claddingColour="#ff9966"
var otherColour='#888'
var structuralColour="#6e89ff"


function loadGraph(){

    var ctx = document.getElementById("myChart").getContext("2d");
	myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: dataLabels,
			datasets: [{
                label:"Materials",
                backgroundColor:"rgba(80, 120, 160,.9)",
                backgroundColor:"rgba(80, 120, 160,.9)",
                data: dataSet
            }]
		},
        options: {
            maintainAspectRatio:false,
            legend:{
                display:false
            },
            reactive:true,
            scales:{
                yAxes:[{
                    ticks:{
                        beginAtZero:true
                    },
                    gridLines:{
						color:"rgba(50,50,50,.2)",
						zeroLineColor:"rgba(50,50,50,.8)"
					},
                    scaleLabel:{
                        display:true,
                        labelString: "kg CO2e"
                    }
                }],
                xAxes:[{
                    ticks:{
                        fontColor:"#000",
                        fontSize:15
                    }
                }]
            },
            tooltips: {
				yPadding: 10,
				xPadding: 10,
				callbacks:{
					title: function([tooltipItem], data){ 
                        return data.labels[tooltipItem.index];
					},
				
                    label: function(tooltipItem, data){
                        return data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] + " kg CO2e" 
					}
				}
			},
        }
    })
}

function updateGraph(){
    var dataLabels=[];
    var data=[];
    var dataset=[];
    var colours=[];

    for(var i=0;i<tableData.length;i++){
        dataLabels.push(tableData[i][0])
    }

    for(var i=0;i<tableData.length;i++){
        data.push(tableData[i][3])
    }

    function getColour(colour){
        if(colour=="Flooring"){
            return "#e55"
        } else if(colour=="Cladding"){
            return "#ff9966"
        } else if (colour=="Structural"){
            return "#6e89ff"
        } else if (colour=="Other"){
            return '#888'
        }
    }


    for(var i=0;i<tableData.length;i++){
        colours.push(getColour(tableData[i][1]))
    }

    myChart.data.labels=dataLabels
    myChart.data.datasets[0].data = data
    myChart.data.datasets[0].backgroundColor = colours
    myChart.data.datasets[0].hoverBackgroundColor = colours
    myChart.update();
}

var filters =[]; 


window.onload = function(){
    setTimeout(function(){document.getElementById("loadingLogo").src = "assets/common/images/logo/intro.gif"},300)
    setTimeout(function(){
        document.getElementById("loadingLogo").src = "assets/common/images/logo/static.gif";
        document.getElementById("logoContainer").className = "logoContainer move"
    },2150)
    setTimeout(function(){
        document.getElementById("textbox").className = "textBox show"
    },2500)
}

$(document).ready(function(){

	loadTiles();

    $('.extraInfo').click(function(){
        $('.infoBackdrop').toggleClass("show")
        setTimeout(function(){
           $('.infoBackdrop').toggleClass("hidden")
        },100)
    })

    $('.closeInfo').click(function(){
        $('.infoBackdrop').removeClass("hidden")
        setTimeout(function(){
            $('.infoBackdrop').removeClass('show')
        },500)
    })

    var $grid = $('.section').isotope({
        getSortData:{
            name:".name",
            type:".type",
            value: function( itemElem ) {
                var value = $( itemElem ).find('.value').text();
                return parseFloat( value.replace( /[\(\)]/g, '') );
            }
        },
        itemSelector: '.card',
        
    });

    $grid.isotope({ sortBy: "name" }) 

    $('.filterGroup').on('click','.sort', function(){
        var sortByValue=$(this).attr('data-sort-by');
        $grid.isotope({ sortBy: sortByValue })
    })

    $('.filterGroup').on('click','.button', function(){
        
        var $this = $(this)

        var $buttonGroup = $this.parents('.filterGroup');
        var filterGroup= $buttonGroup.attr('data-filter-group');

        filters [filterGroup] = $this.attr('data-filter');

        var filterValue = concatValues(filters);
        $grid.isotope({filter:filterValue});
    });


    // $(function(){
        
    //     var $checkboxes = $('#matType input')

    //     $checkboxes.change(function(){
    //         var filters =[]; 
    //         $checkboxes.filter(':checked').each(function(){
    //             filters.push(this.value)
    //         });

    //         var filterValue = concatValues(filters);
    //         console.log(filterValue)
    //         var filters2 = [];
    //         filters2 = filters.join(', ');
    //         $grid.isotope({filter:filterValue})
    //     })
    // })

    $('.card').on('click', '.show.distanceBar', function(event){
        $(this).siblings(".distanceBar").toggleClass("show")
        $(this).toggleClass("show")
        $(this).siblings(".addCircle").toggleClass("close")
        $(this).siblings(".overlay").toggleClass("open")
        $(this).siblings(".overlay").find(".value").toggleClass("open")
        $(this).siblings(".overlay").find(".content").toggleClass("open")

        if($(this).attr('id')==="local"){
            calcDist(local,$(this).parent().attr('id'))
        } else {
            calcDist(far,$(this).parent().attr('id'))
        }
        createList()
        updateGraph();
    })

    $('.addCircle').on('click', function(){
        $(this).toggleClass("close")
        $(this).siblings(".distanceBar").toggleClass("show")
        $(this).siblings(".overlay").toggleClass("open")
        $(this).siblings(".overlay").find(".value").toggleClass("open")
        $(this).siblings(".overlay").find(".content").toggleClass("open")
        // $grid.isotope( 'layout' )
    })

    $('button').on('click', function(){
        if($(this).hasClass("active")){
            
        }else{
            $(this).toggleClass("active")
            $(this).siblings("button").removeClass("active")
        }
    })

    $('.sidebar').on('click', '.remove',function(e){
        if(tableData.length===1){
            tableData=[];
        } else {
            tableData.splice(parseInt(e.target.id),1)
        }
        $('.list').empty();
        createList();
        warningMessage();
        updateGraph();
    })


    $(window).on('scroll', function () {
        var $w = $(window);
        $('.position-fixed-y').css('top', $w.scrollTop());
    });

    loadGraph();

    $('.filterHeader').click(function(){
        $(this).find(".wrapper").toggleClass('active');
        $(this).next().toggleClass("hidden")
	});  

   
    $(".acceptButton").click(function(){
        document.getElementById("loadingLogo").src = "assets/common/images/logo/outro.gif";
        document.getElementById("textbox").className = "textBox";
        window.scrollTo(0, 0);
        setTimeout(function(){
            document.getElementById("loadingLogo").style.display = "none"
        },2250)
        setTimeout(function(){
            document.getElementById("backdrop").className="backdrop hidden"
        },2300)
        setTimeout(function(){
            document.getElementById("backdrop").style.display="none"
        },3300)
    })
 


})