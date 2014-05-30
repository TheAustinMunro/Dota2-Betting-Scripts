// ==UserScript==
// @name       Dota2FindLines
// @version    0.1
// @description Find the dota2 percentages and convert them to moneylines
// @match      *dota2lounge.com/match*
// ==/UserScript==

$(document).ready(function(){
  $.each($(".Value"), function(i, val) {
    var value = val.parentNode.innerHTML.split("<br>"); value = value[1].split(" for ");
    var decimal = parseFloat(value[0]) + parseFloat(value[1]);
    if (decimal > 2) {var moneyLine = (decimal-1)*100; }
    if (decimal < 2) {var moneyLine = (-100)/(decimal-1); }
    val.innerHTML = val.innerHTML + '<br/>' + moneyLine;
  });
});