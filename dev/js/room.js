$(function() {
    var $room = $(".room");
    var $desktop = $(".desktop");
    var $apps = $(".apps");
    var $login = $(".login-overlay");
    var $grid = $(".screenGrid");
    var $wallpaper = $(".wallpaper");
    var $info = $(".info");
    var $gif = $(".room-gif");
    var $wrap = $('.interactive-wrap');
    var $monitor = $(".monitor");
    var $noise = $(".noise");
    var resize = false;

    $apps.hide()
    $login.hide()
    $info.hide()
    $wallpaper.hide()

    $monitor.on("click", function() {
        var $this = $(this);
        $(".fa-hand-o-down").fadeOut(1000)
        $desktop.show()
        $room.addClass("zoom-out");
        $grid.fadeIn(500)
        $apps.fadeIn(500)
        $info.fadeIn(500)
        $noise.fadeIn(500)
        $desktop.addClass("zoom")
    });

    function resizeRoom() {
        if (!window.jqueryResizeActive && detectIE()) {
            $room.css("height", window.innerHeight);
            $room.css("width", window.innerWidth);

            if ($room[0].clientHeight > window.innerHeight) {
                $gif.addClass("overflow");
            }
            else {
                $gif.removeClass("overflow");
            }

            $wrap.css("width", $gif.width());
            $wrap.css("height", $gif.height());
        }
    }

    function detectIE() {
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    }

    resizeRoom();

    if (detectIE()) {
        $(".room").addClass("ie")
        resizeRoom();
    }
    else {
        $(".room-gif").addClass("scale-me")
        $(".monitor-svg").addClass("scale-me")
    }

    $(window).bind('resize', function() {
        resizeRoom();
    });
})

$(window).on("load", function() {
    setTimeout(function() {
        $(".logo-overlay").fadeOut(1500)
        $(".tcf-logo").addClass("fade-out")
        $(".page-state").removeClass("pulse").fadeOut(1000)
    }, 1000)
})