// hotspot container
const hotSpot = (data) => {
    var hotspotContent = '';
    var container = $('#hotspotBar');
    $.each(data.hotspots, function (index, data) {
        hotspotContent += '<div class="hotspot">' +
            '<div class="trigger" style="top:' + data.top + '%' + '; left:' + data.left + '%' + '" data-space="' + data.content + '" data-audio="'+data.audioPlayer+'"><a href="javascript:void(0)"><i style="color:#fff" class="' + data.imagename + '"></a></i></div>' +
            '</div>';
        $('#hotspotBar').html(hotspotContent);
        $.each($('.trigger'), function (count, item) {
            $(this).on('click', function () {
                $('#helloContainer').html($(this).attr('data-space'))
                $("#audioBar").html($(this).attr('data-audio'))
                container.find('div').removeClass('activeHotspot');
                var current = $(this).attr('href');
                $('.trigger').removeClass('activeHotspot');
                $(this).addClass('activeHotspot');
                $(this).parent().addClass('activeHotspot');
                $(current).addClass('activeHotspot');
            })
        }).eq(data.active).click().addClass('activeHotspot')
        $('.hotspot:nth-child('+data.active+') .trigger').trigger('click');
    });

}
// tab opening logic
const tabOpening = (data) => {
    var tabs = $('.tabs');
    var container = $('.container');
    var html_tabs = '';
    var html_content = '';
    $.each(data.TabList, function (index, data) {
        const classChecker = data.tabEnabled == "yes" ? "openB" : "closeB";
        html_tabs += '<li class=' + classChecker + '><a href="#tab' + index + '">' + data.tabName + '</a></li>';
        html_content += '<div id="tab' + index + '"><p>' + data.tabContent + '</p></div>';
    });
    tabs.html(html_tabs);
    container.html(html_content);
    $.each($('.tabs li a'), function (count, item) {
        $(this).on('click', function () {
            container.find('div').removeClass('active');
            var current = $(this).attr('href');
            $('.tabs li a').removeClass('active');
            $(this).addClass('active');
            $(this).parents('ul').find('li').removeClass('active');
            $(this).parent().addClass('active');
            $(current).addClass('active');
        });
    }).eq(0).click().addClass('active');
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
    $.getJSON('data.json', (data) => {
        console.log("mydata", data)
        $("#pageHeading").html(data.PageData);
        tableSet(data);
        dataSet(data);
        tabOpening(data);
        hotSpot(data);
    });
});