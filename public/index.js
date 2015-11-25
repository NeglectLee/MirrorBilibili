function a() {
    $('iframe').addClass('mirror_ifrom');
    setTimeout(function() {
        $('iframe').attr('src', 'bilibili')
    }, 1500)
};
function boom(){
    var pwd = $('#pwd').val();
    $.ajax({
        url: '/boom',
        type: 'POST',
        data: {
            pwd: pwd
        },
    })
    .done(function(data) {
        if(data == '2233')
        {
            $('.boom').hide();
            window.localStorage.show == 1
            a();
        }
        else
        {
            $('#pwd').val("");
        }
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
}
$('#boom').click(function(event) {
    boom();
});

if (window.localStorage.show == 1) {
     $('.boom').hide();
     a();
}