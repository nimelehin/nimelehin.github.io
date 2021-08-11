var isOpened = false
var username = "none"

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

alerts = [
    ["alert-init", "2021/8/11", "By continuing to browse or by clicking Accept, you agree to the storing cookies on your device.", [["Accept", "g", function(){}]]],
]

function checkAlerts() {
    for (var item of alerts) {
        var cookieData = getCookie(item[0])
        if (cookieData === undefined || cookieData != item[1]){
            show_notification_buttons(item[2], item[3])
            setCookie(item[0], item[1], 365);
            return;
        }
    }
}

function header_init(){
    $("header").load("components/header.html"); 
    $(`.page-title[item='${current_page}']`).addClass('active')
    checkAlerts();
}

header_init();

var init_top;
var opened = false;
var ready_to_run = true;

function showMenuItem(obj) {
    return obj.animate({
        opacity: "100%"
    }, 20)
}

function hideMenuItem(obj) {
    return obj.animate({
        opacity: "0%"
    }, 10)
}

function menuShowLogo() {
    showMenuItem($("#menu_item1")).promise().done(function() {
        showMenuItem($("#menu_item2")).promise().done(function() {
            showMenuItem($("#menu_item3")).promise().done(function() {
                showMenuItem($("#menu_item4")).promise().done(function() {
                    
                })
            })
        })
    })
    return $('#menu_log_box').animate({
        opacity: "100%"
    }, 150)
}

function menuHideLogo() {
    hideMenuItem($("#menu_item4")).promise().done(function() {
        hideMenuItem($("#menu_item3")).promise().done(function() {
            hideMenuItem($("#menu_item2")).promise().done(function() {
                hideMenuItem($("#menu_item1")).promise().done(function() {
                    
                })
            })
        })
    })
    return $('#menu_log_box').animate({
        opacity: "0%"
    }, 150)
}

$(window).on('resize', function(){
    $('.hhh').height($(window).height())
    init_top = $(window).height() - 50
});

$('body').on('click', '.logo_box',  function(){
    window.open("/index.html", "_self");
});

function showMenu() {
    $('.hhh').height($(window).height())
    ready_to_run = false
    opened = true
    init_top = $(".menu_hamburger").position().top;
    $('#show-menu-button').removeClass('rotate360').addClass('rotate180');
    $('.menu_hamburger').animate({
            top: "0%"
    }, 150)
    $('.menu_hamburger').promise().done(function(){
        menuShowLogo().promise().done(function() {
            ready_to_run = true;
        })
    });
}

function hideMenu() {
    ready_to_run = false
    opened = false
    $('#show-menu-button').removeClass('rotate180').addClass('rotate360');
    menuHideLogo().promise().done(function(){
        $('.menu_hamburger').animate({
            top: `${init_top}px`
        }, 120).promise().done(function() {
            ready_to_run = true;
        })
    });
}

$('body').on('click', '#show-menu-button', function(){
    if (ready_to_run) {
        if (opened) {
            hideMenu()
        } else {
            showMenu()
        }
    }
})

$('body').on('click', '#hide-menu-button', function(){
    hideMenu()
})

$('#transperent-background').click(function(){
    hideMenu()
})
