var $body = $('body');
var $clock = $('#clock');
var $color = $('#color');

const ABS_FACTOR = 16777215 / 86400;

var colorMode = 0; //0 = exact; 1 = subdivided; 2 = absolute

function doUpdate() {
    var time = formatTime();
    var color = calcColor(colorMode, time);

    $clock.text(time.hours + " : " + time.mins + " : " + time.secs);
    $color.text(color);
    
    $body.css('background-color', color);
}

function calcColor(mode, time) {
    if (mode != 0 && mode != 1 && mode != 2) {mode = 0;}
    switch (mode) {
        case 0: //exact
            return '#' + time.hours.toString() + time.mins.toString() + time.secs.toString();
            break;
        case 1: //subdivided, hms individually scale from 0-255
            return '#' + Math.round(time.hours * 10.625).toString(16) + Math.round(time.mins * 4.25).toString(16) + Math.round(time.secs * 4.25).toString(16);
            break;
        case 2: //absolute, color is based on seconds since midnight
            return '#' + Math.round(time.abs * ABS_FACTOR).toString(16);
            break;
    }
}

function formatTime() {
    var d = new Date();
    var hours = d.getHours();
    var mins = d.getMinutes();
    var secs = d.getSeconds();

    if (hours < 10) {hours = "0" + hours};
    if (mins < 10)  {mins = "0" + mins};
    if (secs < 10)  {secs = "0" + secs};

    secSinceMidnight = (d.getTime() - d.setHours(0, 0, 0, 0)) / 1000;

    return {
        'hours': hours,
        'mins': mins,
        'secs': secs,
        'abs': secSinceMidnight
    };
}
