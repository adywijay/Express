$(document).ready(function () {

    $(window).on('load', function () {
        $('#loader-wrapper').fadeIn();
        $('#content-list').hide();
        setTimeout(function () {
            $('#loader-wrapper').fadeOut();
            $('#content-list').show();
        }, 950);
    })
});