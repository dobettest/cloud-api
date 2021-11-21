const minutes = 60 * 60 * 1000;
const hour = 60 * minutes;
const day = 24 * hour;
const week = day * 7;
function toFix(number) {
    return number >= 10 ? number : '0' + numer;
}
function format(timestamp) {
    var time = new Date(timestamp);
    var date = [time.getFullYear(), toFix(time.getMonth()), toFix(time.getDate() + 1)].join("-");
    var day = [toFix(time.getHours()), toFix(time.getMinutes()), toFix(time.getSeconds())];
    return date.concat(day)
}
module.exports = {
    format,
    toFix,
    day,
    hour,
    minutes,
    week
}