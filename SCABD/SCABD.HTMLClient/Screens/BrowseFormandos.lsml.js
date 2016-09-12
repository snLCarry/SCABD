/// <reference path="~/GeneratedArtifacts/viewModel.js" />

var mapDiv;
var current = 0;
var step = 15;

myapp.BrowseFormandos.Formandos_render = function (element, contentItem) {
    // Write code here.

    mapDiv = $('<div />').appendTo($(element));
    $(mapDiv).lightswitchBingMapsControl();

    var visualCollection = contentItem.value;
    if (visualCollection.isLoaded) {
        showItems(current, step, contentItem.screen);
    } else {
        visualCollection.addChangeListener("isLoaded", function () {
            showItems(current, step, contentItem.screen);
        });
        visualCollection.load();
    }
};

function showItems(start, end, screen) {
    $(mapDiv).lightswitchBingMapsControl("resetMap");

    $.each(screen.Formandos.data, function (i, formando) {
        if (i >= start && i <= end) {
            $(mapDiv).lightswitchBingMapsControl("addPinAsync", formando.Address,
                formando.CIty, formando.Country, i + 1, function () {
                    screen.Formandos.selectedItem = formando;
                    screen.showPopup("Details");
                });
        }
    });
};

myapp.BrowseFormandos.FormandoList_postRender = function (element, contentItem) {
    // Write code here.
    $(element).parent().parent().css("background-image", "url('http://3.bp.blogspot.com/_Jzi_D71fKc8/TA0E9AoP1MI/AAAAAAAAAAs/_wd53m5zWXA/s1600/Untitled-2.png')");
    $(element).parent().parent().css("background-repeat", "no-repeat");
    $(element).parent().parent().css("background-attachment", "fixed");
    $(element).parent().parent().css("background-position", "center");
    $(element).parent().parent().css("background-size", "auto");
};