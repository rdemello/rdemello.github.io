var rawData;

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


checkSheet();


function loadUpData(){

    var currentWeight = weightData[weightData.length-1];
    document.getElementById("currentWeight").innerHTML = currentWeight

    var latestCoffee = caffeineData.length - caffeineData.lastIndexOf(1) 
    document.getElementById("latestCoffee").innerHTML = latestCoffee

    var latestAlcohol = alcoholData.length - alcoholData.lastIndexOf(1) 
    document.getElementById("latestAlcohol").innerHTML = latestAlcohol

}