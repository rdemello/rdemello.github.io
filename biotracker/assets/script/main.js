

const $key = "1_iwxs8PvmZl01-oBlQWSDS0SRSfjsSWZbfB5Om2rovY",
    $sheetNum = 1,
    $output = document.getElementById('output');
let key,
    sheetNum,
    sheetType;
attachEvents();

function readValues() {
    key = "1_iwxs8PvmZl01-oBlQWSDS0SRSfjsSWZbfB5Om2rovY";
    sheetNum = 1;
    sheetType = "raw";
}
function attachEvents() {
     {
        
        readValues();
        // console.log(key, sheetNum, sheetType);
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
            console.log('Data');
            console.log(data);
            $output.innerHTML = JSON.stringify(data);
        }).catch(err => {
            // console.log('Error');
            // console.log(err);
            // $output.innerHTML = err.message;
        })
    }
}
