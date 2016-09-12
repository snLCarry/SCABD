/// <reference path="~/GeneratedArtifacts/viewModel.js" />
var mapDiv;
var current = 0;
var step = 15;

myapp.ViewFormando.Formandos_render = function (element, contentItem) {
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
                    screen.showPopup("Group");
                });
        }
    });

};

myapp.ViewFormando.Formando_Foto_render = function (element, contentItem) {
    // Write code here.
    createImageUploader(element, contentItem, "max-width: 500px; max-height:300px");
};