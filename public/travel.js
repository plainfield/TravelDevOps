$(document).ready(function () {
    //Initialize tooltips
    $('.nav-tabs > li a[title]').tooltip();
    
    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);
        console.log("111111");
        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $(".next-step").click(function (e) {
    	console.log("2222");
        var $active = $('.wizard .wizard-inner .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);

    });
    $(".prev-step").click(function (e) {
    	console.log("33333");
        var $active = $('.wizard .nav-tabs li.active');
        prevTab($active);

    });
});

function nextTab(elem) {
	console.log("4444");
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
	console.log("5555");
    $(elem).prev().find('a[data-toggle="tab"]').click();
}