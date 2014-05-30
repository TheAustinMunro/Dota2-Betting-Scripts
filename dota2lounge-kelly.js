// ==UserScript==
// @name       Dota2LoungeKelly
// @version    0.1
// @description Inject functionality into match page to calculate kelly sized bet.
// @match      *dota2lounge.com/match*
// ==/UserScript==
window.onload = function start(){
	var total = 0;
	var values = document.getElementsByClassName('value');
	for(var x = 0; x < values.length; x++) {
		total += parseFloat(values[x].innerHTML.replace("$ ",""));
	}
	console.log("Total value of items is: "+total.toFixed(2));
	var percent = findPercent();
	console.log("The first percentage is: "+percent);
	var d2lLine = calcLine(findPercent());
	console.log("The vig free line is: "+d2lLine+" / "+-d2lLine);
  $("body").append('<script>function US2Dec (number) {if (number < 0) { return US2DecNeg(number); } if (number > 0) { return US2DecPos(number); } }function US2DecNeg (number) { return (100/(number*-1)); }function US2DecPos (number) { return (number/100); }function ckp (a,b,c) { return ((a*(US2Dec(b)+1)-1)/US2Dec(b)) * c; } function findPercent () { var percent = $(".team").next().next().next(); console.log(percent[0].innerHTML.replace("%","")); }</script>');
}

function findPercent () {
	var percent = $(".team").next().next().next(); 
	return percent[0].innerHTML.replace("%",""); 
}
function calcLine (form) {
	p1 = parseFloat(findPercent());
	if (p1 > 50) {
		v1 = -(p1 * 100) / (100 - p1);
	} 
	else if (p1 < 50) {
		v1 = (((100 - p1) * 100) / (100 - (100 - p1)));
	}
	return v1.toFixed(2);
}