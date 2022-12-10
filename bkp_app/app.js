

const tabOpening = (data) => {
    return $.each(data.TabList, (i, f) => {
        var TabList = "<li class='nav-item'>" +
            "<a href='#" + f.tabName + "' class='nav-link active'>" + f.tabName + "</a>" +
            "</li>";
        var ContentList = "<div class='tab-pane fade show active' id=" + f.tabName + ">" +
            "<h4 class='mt-2'>Home tab content</h4>" +
            "<p>" + f.tabContent + "</p>" +
            "</div>" +
            $("#myTab").append(TabList);
        $("#tabContent").append(ContentList);
    });
};
const tableSet = (data) => {
    return $.each(data.TableSet, (i, f) => {
        var tblRow = "<tr>" + "<td>" + f.firstName + "</td>" +
            "<td>" + f.lastName + "</td>" + "<td>" + f.email + "</td>" + "<td>" + f.roll + "</td>" + "</tr>"
        $(tblRow).appendTo("#userdata tbody");
    });
};
function dataSet(data) {
    return $.each(data.ButtonSet, (i, k) => {
        var dynamic_btn = "<button style='background-color:" + k.buttonColor + "'>" + k.buttonName + "</button>";
        $("#button_wrapper").append(dynamic_btn)
    })
}

$(function () {

    var people = [];
    $.getJSON('data.json', (data) => {
        console.log("mydata", data)
        tableSet(data);
        dataSet(data);
        tabOpening(data);
    });
});