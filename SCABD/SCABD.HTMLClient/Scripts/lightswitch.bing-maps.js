/// <reference path="jquery-1.7.1.js" />
/// <reference path="jquery.mobile-1.1.1.js" />
/// <reference path="msls-1.0.0.js" />

(function ($) {
    var _credentialsKey = "TL7lm7ZLckhOcgWUXp8y~32VKSweRIDnR151t7tTRmw~Alqxgm4zUKWICCXY9nTlpX09uTdWochz_4SiSvpLPOGnFgzvgNj0Pi703UFqOaXc";

    // load the directions module only once per session
    Microsoft.Maps.loadModule('Microsoft.Maps.Directions');

    $.widget("msls.lightswitchBingMapsControl", {
        options: {
            mapType: Microsoft.Maps.MapTypeId.road,
            zoom: 3,
            showDashboard: false
        },

        _create: function () {
        },

        _init: function () {
            this.createMap();
        },

        destroy: function () {
            this._destroyBingMapsControl();
        },

        createMap: function () {
            this.htmlMapElement = this.element[0];

            // create empty map
            this.map = new Microsoft.Maps.Map(this.htmlMapElement,
                                {
                                    credentials: _credentialsKey,
                                    mapTypeId: this.options.mapType,
                                    zoom: this.options.zoom,
                                    showDashboard: this.options.showDashboard
                                });
        },

        addPinAsync: function (street, city, country, i, callback) {

            var widgetInstance = this;

            // construct a request to the REST geocode service using the widget's
            // optional parameters
            var geocodeRequest = "http://dev.virtualearth.net/REST/v1/Locations/" +
                                 street + "," + city + "," + country +
                                 "?key=" + _credentialsKey;

            // make the ajax request to the Bing Maps geocode REST service
            $.ajax({
                url: geocodeRequest,
                dataType: 'jsonp',
                async: true,
                jsonp: 'jsonp',
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(textStatus + " " + errorThrown);
                },
                success: function (result) {
                    var coordinates = null;

                    if (result && result.resourceSets && (result.resourceSets.length > 0) &&
                        result.resourceSets[0].resources && (result.resourceSets[0].resources.length > 0)) {

                        // create a location based on the geocoded coordinates
                        coordinates = result.resourceSets[0].resources[0].point.coordinates;

                        widgetInstance._createPinFromCoordinates(coordinates, i, callback);
                    }
                }
            });
        },

        _createPinFromCoordinates: function(coordinates, i, callback) {
            var location = new Microsoft.Maps.Location(coordinates[0], coordinates[1]);
            var pin = new Microsoft.Maps.Pushpin(location, { text: '' + i + '' });
            Microsoft.Maps.Events.addHandler(pin, 'click', callback);
            this.map.entities.push(pin);
        },

        resetMap: function () {
            this.map.entities.clear();
        },

        _handleError: function (error) {
            alert("An error occurred.  " + error.message);
        },

        _destroyBingMapsControl: function () {
            if (this.map != null) {
                this.map.dispose();
                this.map = null;
            }
        }
    });
}(jQuery));
