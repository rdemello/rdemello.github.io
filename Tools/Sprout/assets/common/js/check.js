function getBrowserInfo() {

    var versionPattern = /[0-9]*\.[0-9]*/gi;
    var browserPatterns = [
        {
            description: "Explorer 10 and older",
            browserName: "Internet Explorer",
            patternCascade: [/MSIE [0-9]*\.[0-9]*/gi],
           isExplorer: true
        },
        {
            description: "Explorer 11 and newer",
            browserName: "Internet Explorer",
            patternCascade: [/Trident.*Gecko/gi, /rv:[0-9]*\.[0-9]*/gi], // both the patterns must be true
            isExplorer: true
        },
        {
            description: "Firefox",
            browserName: "Firefox",
            patternCascade: [/firefox\/[0-9]*\.[0-9]*/gi],
            isFirefox: true
        },
        {
            description: "Opera",
            browserName: "Opera",
            patternCascade: [/opr\/[0-9]*\.[0-9]*/gi],
            isOpera: true
        },
        {
            description: "Google Chrome",
            browserName: "Chrome",
            patternCascade: [/chrome\/[0-9]*\.[0-9]*/gi],
            isChrome: true
        }

    ];

    var agent = window.navigator.userAgent;

    try {
        if (agent) {
            for (var i = 0; i < browserPatterns.length; i++) {
                var matchResult = agent;
                var allMatched = false;
                for (var j = 0; j < browserPatterns[i].patternCascade.length; j++) {
                    var pattern = new RegExp(browserPatterns[i].patternCascade[j]);
                    var res = pattern.exec(matchResult);
                    if (res != null) {
                        matchResult = res[0];
                        if (j == (browserPatterns[i].patternCascade.length - 1)) {
                            // all item tested and matched
                            allMatched = true;
                        }
                    } else {
                        break;
                    }
                }

                if (allMatched) {
                    var pattern = new RegExp(versionPattern);
                    var vers = pattern.exec(matchResult);
                    var versInt = 0;
                    if (vers != null && !isNaN(vers[0])) {
                        versInt = parseInt(vers[0], 10);
                    }
                    return {
                        browserName: browserPatterns[i].browserName,
                        version: versInt,
                        isExplorer: browserPatterns[i].isExplorer || false,
                        isChrome: browserPatterns[i].isChrome || false,
                        isOpera: browserPatterns[i].isOpera || false,
                        isFirefox: browserPatterns[i].isFirefox || false
                    };
                }
            }
        }
    } catch (e) {
        console.error(e);
    }

    return {
        browserName: "unknown",
        version: 0,
        isExplorer: false,
        isChrome: false,
        isOpera: false,
        isFirefox: false
    };
}

var browserInfo = getBrowserInfo();
if (browserInfo.isExplorer || browserInfo.isSomethingElse) {
    
    document.getElementById("defaultSheet").setAttribute("href", "assets/common/css/ie.css"); 
    document.body.innerHTML = "";
    
    
    var popup = document.createElement("div");
    popup.className="window";
    document.body.appendChild(popup);
    
    var head = document.createElement("div");
    head.className="head";
    head.innerHTML = ":("
    popup.appendChild(head)
    
    var message = document.createElement("div");
    message.className="message";
    message.innerHTML = "Sorry, but this tool only works in Chrome at the moment"
    popup.appendChild(message)
} else {
    
}
