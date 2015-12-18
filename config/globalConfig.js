/*
 * Global variabel, DOM selector caching, dan instansiasi JQuery plugin
 */
var appWindow = $('#app-window');
var simulatorWindow = $('#simulation-window');
var registerBoxTemplate = $($('#registerBoxTemplate').html());
var busBox = $('.busBox');
var controlWindow = $('#control-window');
var instructionField = $('#instruction-field');
var registerConnector = $('<div class="connector"><p class="connectorTitle"></p></div>')
var firstDataIndex = 9;
var speedSlider = $('#speedSlider');
String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}
// Jquery Slider plugin
speedSlider.slider({
    min : 500,
    max : 1700,
    step : 100,
    value : 1200,
});
appWindow.height($(window).height() - 25);
$(window).on('resize',function(){
    appWindow.height($(window).height() - 25);
});
