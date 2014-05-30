// ==UserScript==
// @name       Pinnacle Money Line to Vig Free %
// @version    0.1
// @description Convert pinnacle moneylines to vig free percentages.
// @match      *http://www.pinnaclesports.com/*
// ==/UserScript==
$(function() {
  var tempValue;
  moneyLineArray = findMoneyLines();
  $.each(moneyLineArray, function(i,val) {
    if(i % 2 === 1) {
      calculateVigFreePercent(parseInt(moneyLineArray[i-1]),parseInt(moneyLineArray[i]));
    }
  });
});
function findMoneyLines () {
  var tempArray = [];
  $.each($(".linesMLine"), function(i, val) {
    tempArray.push(val.innerHTML.replace('+',''));
  });
  return tempArray;
}
function calculateVigFreePercent(a,b) {
  if (a > b) { var tempA = a; a = b; b = tempA; }
  var vigA = (a*-1)/((a*-1)+100);
  var vigB = b > 0 ? 100/(b+100): (b*-1)/((b*-1)+100);
  var overRound = (vigA+vigB)/100;
  var vigFreeA = vigA/overRound;
  var vigFreeB = vigB/overRound;
  insertPercentages(a,b,vigFreeA,vigFreeB);
}
function insertPercentages (a,b,vigFreeA,vigFreeB) {
  $.each($(".linesMLine"), function(i, val) {
    if (parseInt(val.innerHTML.replace('+','')) === a) {val.innerHTML += ' ( <span style="color:red;">'+vigFreeA+', '+vigFreeA/100+'</span> )';}
    if (parseInt(val.innerHTML.replace('+','')) === b) {val.innerHTML += ' ( <span style="color:red;">'+vigFreeB+', '+vigFreeB/100+'</span> )';}
  });
}