
// require on jQuery-1.10.2
var ArcGisGeocoder = function (clientId, secretId, _jQuery) {

    var _instance = this;
    var jQueryVersionWithPromises = "1.6.0";
    var findAddressCandidatesService = "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?singleLine=<QUERY>&maxLocations=<MAX_LOCATIONS>&forStorage=false&token=<AUTH_TOKEN>&f=pjson";
    var generateTokenService = "https://www.arcgis.com/sharing/oauth2/token?client_id=<CLIENT_ID>&grant_type=client_credentials&client_secret=<CLIENT_SECRET>&f=pjson";
    var maxLocations = 5;

    if (!_jQuery) {
        throw 'jQuery is not defined';
    } else {
        var jQueryVersion = getJQueryVersion(_jQuery);
        if (!isAllowedVersion(jQueryVersion))
        {
            var errorMessage = 'jQuery version not supported: \'' + jQueryVersion + '\'. Min version allowed: \'' + jQueryVersionWithPromises + '\'';
            console.error(errorMessage);
            throw errorMessage;
        }
    }
    this.jQueryArcGis = _jQuery;

    this.geocode = function (query) {
        var deferred = new _instance.jQueryArcGis.Deferred();

        _instance.jQueryArcGis.get(getArcGisAuthorizationUrl(), function (arcGisAuthorizationResult) {
            var arcGisAuthorizationObj = getJsonFromString(arcGisAuthorizationResult);
            if (isValidToken(arcGisAuthorizationObj)) {
                _instance.jQueryArcGis.get(getArcGisGeocodeUrl(query, arcGisAuthorizationObj.access_token), function (arcGisResult) {
                    var arcGisObj = getJsonFromString(arcGisResult);
                    var outputArray = getGeocodingResults(arcGisObj);
                    deferred.resolve(outputArray);
                });
            } else {
                var errorMessage = 'Error while retrieving an ArcGIS token: ' + getArcGisAuthorizationErrorMessage(arcGisAuthorizationObj);
                console.error(errorMessage);
                deferred.reject(errorMessage);
            }
        });
        return deferred.promise();
    };

    function getArcGisAuthorizationErrorMessage(arcGisAuthorizationResult) {
        if (arcGisAuthorizationResult && arcGisAuthorizationResult.message) {
            return arcGisAuthorizationResult.message;
        }
        return 'undefined response';
    }

    function isValidToken(arcGisAuthorizationObj) {
        if (arcGisAuthorizationObj && arcGisAuthorizationObj.access_token) {
            return true;
        }
        return false;
    }

    function getArcGisAuthorizationUrl() {
        return generateTokenService.replace("<CLIENT_ID>", clientId).replace("<CLIENT_SECRET>", secretId);
    }

    function getJsonFromString(jsonString) {
        return _instance.jQueryArcGis.parseJSON(jsonString);
    }

    function getGeocodingResults(arcGisObj) {
        var result = [];
        if (isValidArcGisResult(arcGisObj)) {
            result = arcGisObj.candidates.map(mapArcGisResultItems);
        }
        return result.sort(sortByScoreDescending);
    }

    function sortByScoreDescending(a, b) {
        return b.score - a.score;
    }

    function mapArcGisResultItems(arcGisItem) {
        var geocodingItem = {
            'address': arcGisItem.address,
            'location': {
                'lat': arcGisItem.location.y,
                'lng': arcGisItem.location.x
            },
            'score': parseInt(arcGisItem.score, 10)
        };
        return geocodingItem
    }

    function isValidArcGisResult(arcGisObj) {
        return (arcGisObj && arcGisObj.candidates && arcGisObj.candidates.length);
    }

    function getArcGisGeocodeUrl(query, authorizationToken) {
        return findAddressCandidatesService.replace("<QUERY>", encodeURIComponent(query)).replace("<MAX_LOCATIONS>", maxLocations).replace("<AUTH_TOKEN>", authorizationToken);
    }

    function getJQueryVersion(_jQuery) {
        return _jQuery.fn.jquery;
    }

    function isAllowedVersion(version) {
        var currentVersion = getVersionArray(version);
        var allowedMinVersion = getVersionArray(jQueryVersionWithPromises);
        return isVersionGreaterOrEqual(currentVersion, allowedMinVersion);
    }

    function getVersionArray(version) {
        var versionSplits = version.split('.');
        return versionSplits.map(parseStringToInt);
    }

    function parseStringToInt(str) {
        return parseInt(str, 10);
    }

    function isVersionGreaterOrEqual(currentVersion, allowedMinVersion) {
        for (var i = 0; i < currentVersion.length; i++) {
            var current = getSplitValue(currentVersion[i]);
            var allowed = getSplitValue(allowedMinVersion[i]);
            if (current > allowed) {
                return true;
            } else if (current < allowed) {
                return false;
            }
        }
        return true;
    }

    function getSplitValue(value) {
        if (value) {
            return value;
        }
        return 0;
    }

};