var notificationActive = 0

function show_notification(text, time){
    notificationActive+=1
    $('#notification').text(text)
    $('#notification').fadeIn(300)
    setTimeout(hide_notification, time * 1000)
}

function show_notification_buttons(text, buttons){
    var buttonsCode = ""
    var now = 0

    for (var button of buttons) {
        var classCode = ''
        if (button[1] == 'g'){
            classCode = 'button-gray'
        }
        buttonsCode += `<div class = 'apply-button ${classCode}' id = 'button-tap-${now}'">${button[0]}</div>`
        now += 1
    }

    buttonsCode = `<div class = 'button-handler'>${buttonsCode}</div>`
    $('#notification').html(text + buttonsCode)

    for (var i = 0; i < now; i++){
        var myElement = document.getElementById(`button-tap-${i}`);
        myElement.addEventListener('click', buttons[i][2]);
    }

    $('#notification').fadeIn(300)
}

function hide_notification(){
    notificationActive-=1
    if (notificationActive == 0){
        $('#notification').fadeOut(300)
    }
}

$('#notification').click(function(){
    $('#notification').fadeOut(300)
    notificationActive = 0
})
