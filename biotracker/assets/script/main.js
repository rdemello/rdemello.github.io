var rawData;
var bpChart;


var cleanedData =[];
var sysData =[];
var diaData =[];
var bpmData =[];
var boData =[];
var bpm2Data =[];
var weightData =[];
var VO2Data =[];
var caffeineData =[];
var alcoholData =[];
var creatineData =[];
var proteinData =[];
var biotinData =[];
var multiVitData =[];
var dateData =[];

const $key = "1_iwxs8PvmZl01-oBlQWSDS0SRSfjsSWZbfB5Om2rovY",
    $sheetNum = 1,
    $output = document.getElementById('output');
let key,
    sheetNum,
    sheetType;

function readValues() {
    key = "1_iwxs8PvmZl01-oBlQWSDS0SRSfjsSWZbfB5Om2rovY";
    sheetNum = 1;
    sheetType = "raw";
}

function checkSheet(){
        
    readValues();
    let promise;
    switch (sheetType) {
        case 'cols':
            promise = GetSheetDone.labeledCols(key, sheetNum);
            break;
        case 'cols-rows':
            promise = GetSheetDone.labeledColsRows(key, sheetNum);
            break;
        case 'raw':
        default:
            promise = GetSheetDone.raw(key, sheetNum);
            break;
    }
    promise.then((data) => {
        rawData = data["data"]
        console.log(rawData)
        sortData();
        loadUpData();

        // $output.innerHTML = JSON.stringify(data);
    }).catch(err => {
        // console.log('Error');
        // console.log(err);
        // $output.innerHTML = err.message;
    })
}

function sortData(){
    for(i=1;i<rawData.length;i++){
        if(rawData[i].length>15){
            dateData.push(rawData[i][0])
            sysData.push(parseInt(rawData[i][3]))
            diaData.push(parseInt(rawData[i][4]))
            bpmData.push(parseInt(rawData[i][5]))
            boData.push(parseInt(rawData[i][6]))
            bpm2Data.push(parseInt(rawData[i][7]))
            weightData.push(parseInt(rawData[i][8]))
            VO2Data.push(parseInt(rawData[i][9]))
            caffeineData.push(parseInt(rawData[i][10]))
            alcoholData.push(parseInt(rawData[i][11]))
            creatineData.push(parseInt(rawData[i][12]))
            proteinData.push(parseInt(rawData[i][13]))
            biotinData.push(parseInt(rawData[i][14]))
            multiVitData.push(parseInt(rawData[i][15]))
        }
    }
}

function evc(x){
    if(x==null){
        return 0
    } else {
        return x
    }
}

function threeDayAverageCalc(array){
    return Math.round((evc(array[array.length-1]) + evc(array[array.length-2]) + evc(array[array.length-3]))/3)
}

function loadUpData(){
    var latestCoffee = caffeineData.length - caffeineData.lastIndexOf(1) 
    document.getElementById("latestCoffee").innerHTML = latestCoffee

    var latestAlcohol = alcoholData.length - alcoholData.lastIndexOf(1) 
    document.getElementById("latestAlcohol").innerHTML = latestAlcohol

    threeDayAverage();
}

function threeDayAverage(){
    document.getElementById("3dayWeightlb").innerHTML = threeDayAverageCalc(weightData)
    document.getElementById("3dayWeightkg").innerHTML = Math.round( (threeDayAverageCalc(weightData) * 0.453) * 10 ) / 10; 

    document.getElementById("3daySys").innerHTML = threeDayAverageCalc(sysData)
    document.getElementById("3dayDia").innerHTML = threeDayAverageCalc(diaData)
    document.getElementById("3dayVO2").innerHTML = threeDayAverageCalc(VO2Data)
}

function loadChart(){
    var ctx = document.getElementById('bpChart').getContext('2d');
        bpChart = new Chart(ctx, {
        type: 'line',

        data: {
            labels: dateData,
            datasets: [{
                label: "Systolic",
                fill: false,
                borderColor: 'rgb(255, 99, 132)',
                data: sysData,
            },{
                label: "Diastolic",
                fill: false,
                borderColor: 'rgb(109, 164, 232)',
                data: diaData,
            }]
        },

        options: {
            legend: {
                display:false
            },
            tooltips:{
                mode:'index',
                axis: 'x',
                intersect: false
            }
        }
    });
}

function updateChart(){
    bpChart.update();
    bpChart.resize();
}

$(document).ready(function(){
    checkSheet();
    loadChart();
    // updateChart();
})
