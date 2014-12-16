var $body = $('body');
var $clock = $('#clock');
var $color = $('#color');

function dotime() {
    var d = new Date();
    var hours = d.getHours();
    var mins = d.getMinutes();
    var secs = d.getSeconds();
    
    if (hours < 10) {hours = "0" + hours};
    if (mins < 10)  {mins = "0" + mins};
    if (secs < 10)  {secs = "0" + secs};
    
    hours.toString();
    mins.toString();
    secs.toString();
    
    var hex = "#" + hours + mins + secs;
    
    $clock.text(hours + " : " + mins + " : " + secs);
    $color.text(hex);
    
    $body.css('background-color', hex);
}
