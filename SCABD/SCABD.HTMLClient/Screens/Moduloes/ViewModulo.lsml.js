/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewModulo.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.Modulo.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.Modulo." + name, function (value) {
        contentItem.screen.details.displayName = value;
    });
}

