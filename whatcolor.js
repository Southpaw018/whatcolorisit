var $body = $('body');
var $clock = $('#clock');
var $color = $('#color');

const ABS_FACTOR = 16777215/86400; //Counting 0x000000 to 0xffffff, divided into 86400 equal units of ~194.18
const HOUR_FACTOR = 255/24; //Counting 00 to FF, divided into 24 equal units of 10.625
const MIN_SEC_FACTOR = 255/60; //Counting 00 to FF, divided into 60 equal units of 4.25

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
            var returnHours   = Math.round(time.hours * HOUR_FACTOR).toString(16);
            var returnMinutes = Math.round(time.mins * MIN_SEC_FACTOR).toString(16);
            var returnSeconds = Math.round(time.secs * MIN_SEC_FACTOR).toString(16);
            return '#' + padNumericString(returnHours, 2) + padNumericString(returnMinutes, 2) + padNumericString(returnSeconds, 2);
            break;
        case 2: //absolute, color is based on seconds since midnight
            var returnColor = Math.round(Math.floor(time.abs) * ABS_FACTOR).toString(16);
            return '#' + padNumericString(returnColor, 6);
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
};

function padNumericString(string, length) { 
  return (length <= string.length) ? string : padNumericString("0" + string, length);
}
