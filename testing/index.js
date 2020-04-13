/*
var url = new URL(location.href);
var message = url.searchParams.get("message");
*/

function msToLocaleString(ms){
	negative = false;
	if (ms < 0) {
		negative = true;
		ms = -ms;
	}
	sec = Math.round(ms / 1000);
	secmod = sec % 60;
	secleft = sec - secmod;
	min = secleft / 60;
	minmod = min % 60;
	minleft = min - minmod;
	hr = minleft / 60;
	sign = negative ? '-' : '';
	str = sign + String(hr).padStart(2, '0') + ':' +
		String(minmod).padStart(2, '0') + ':' +
		String(secmod).padStart(2, '0');
	return str;
}

var main_display = document.getElementById("main_display");
// main_display.innerHTML = location.search;

var params = location.search.split('?')[1].split('&');
parDict = {};
params.forEach(par => {
	var key_value = par.split('=');
	parDict[key_value[0]] = key_value[1] || true;
});


if ( typeof(parDict.js) == "string" && parDict.js.length > 0 ) {
	func = Function(decodeURIComponent(parDict.js));
	func();
}


if (parDict.m == 'cd') {
	var startTime = Date.now(); // Change this to take param for start time
	var time_sec = parDict.t ? parDict.t : 0;
	var endTime = startTime + time_sec * 1000;
	var startDate = new Date(startTime);
	var endDate = new Date(endTime);

	var curTime = Date.now();
	var timeLeft = endTime - curTime;
	function cntdwn() {
		curTime = Date.now();
		timeLeft = endTime - curTime;
		main_display.innerHTML = msToLocaleString(timeLeft);
	}
	window.setInterval(cntdwn, 1000);
}
