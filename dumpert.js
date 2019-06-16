var video = "";

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
function refresh() {
    var JSONItems = [];
    $.getJSON(chrome.extension.getURL('lijst.json'), function (data) {
        JSONItems = data;
        random = getRandomInt(data.length);
        video = data[random];
        $("#player").attr('src', video + "?autoplay=1");
    });
}

$('iframe, .togglediv, .randomdiv').hover(function () {
    $('.togglediv, .randomdiv').stop().fadeIn(200);
});

$("iframe, .togglediv, .randomdiv").mouseleave(function () {
    $('.togglediv, .randomdiv').stop().fadeOut(200);
});

$(".togglediv").on("click", function () {
    var player = $("#player");
    player.attr('src', "s");
    var icon = $("#faicon");
    if(icon.hasClass("fa-comments-o")){
        $("iframe").css("background-color", "white");
        icon.addClass("fa-tv").removeClass("fa-comments-o");
        $(".tooltiptext").html("Video weergeven");
        var url = new URL(video);
        var parse = url.pathname.split('/');
        var link = parse[2] + "/" + parse[3] + "/comments/";
        player.attr('src', "https://comments.dumpert.nl/embed/" + link);
    }else{
        icon.removeClass("fa-tv").addClass("fa-comments-o");
        $(".tooltiptext").html("Chat weergeven");
        player.attr('src', video + "?autoplay=1");
        player.load(function(){
            $("iframe").css("background-color", "black");
        });
    }
});

$(".randomdiv").on("click", function () {
    var icon = $("#faicon");
    icon.removeClass("fa-tv").addClass("fa-comments-o");
    $(".tooltiptext").html("Chat weergeven");
    refresh();
});


refresh();