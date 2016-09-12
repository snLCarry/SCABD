/// <reference path="~/GeneratedArtifacts/viewModel.js" />

myapp.ViewDisciplina.Details_postRender = function (element, contentItem) {
    // Write code here.
    var name = contentItem.screen.Disciplina.details.getModel()[':@SummaryProperty'].property.name;
    contentItem.dataBind("screen.Disciplina." + name, function (value) {
        contentItem.screen.details.displayName = value;
    });
}

