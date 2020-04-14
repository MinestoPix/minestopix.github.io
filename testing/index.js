/*
var url = new URL(location.href);
var message = url.searchParams.get("message");
*/
// https://github.com/KspR/toDOM
(function(a){var b=window[a]=function(a,c){if(!a)return null;if(a.nodeName)return a;if(typeof a=="string")return b({tag:a},c);if(a.length)return b({tag:a[0],children:a[1]},c);var d={},e;if(!a.tag)d.tag="div";else{var f=a.tag.split(/ /),g=f.shift();f.length&&(d.innerHTML=f.join(" ")),a.innerHTML&&(d.innerHTML=a.innerHTML),f=g.split(/\.|#/),d.tag=f.shift()||"div";if(f.length){d.attr=a.attr||{};var h="",i=/\.([^\.$#]*)/g;while(e=i.exec(g))h+=e[1]+" ";h&&(d.attr["class"]=h.slice(0,h.length-1));var j=/#([^\.$]*)/.exec(g);j&&(d.attr.id=j[1])}}d.attr=d.attr||a.attr,d.innerHTML=d.innerHTML||a.innerHTML;var k=document.createElement(d.tag);if(d.attr)for(var l in d.attr)k.setAttribute(l,d.attr[l]);a.as&&(c[a.as]=k),!a.as&&c&&d.attr&&typeof d.attr["class"]=="string"&&!c[e=d.attr["class"].split(" ")[0]]&&(c[e]=k),typeof d.innerHTML!="undefined"&&(k.innerHTML=d.innerHTML);if(a.events)for(var m in a.events)k.addEventListener(m,a.events[m],!1);if(a.style)for(var n in a.style)k.style[n]=a.style[n];if(a.children)for(var o=-1,p=a.children.length;++o<p;)(e=b(a.children[o],c))&&k.appendChild(e);return k}})("toDOM")


// rewrite html to toDOM.js

var main_display = toDOM({
	tag:'div',
	style:{
		fontSize:		'200px',
		color:			'#FFF',
		backgroundColor:	'#000',
		position:		'fixed',
		bottom:			'0px',
		right:			'0px'
	},
	innerHTML:'WARNING! Text doesn\'t change for some reason'
})


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

// var main_display = document.getElementById("main_display");
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
	main_display.innerHTML = msToLocaleString(timeLeft);
	function cntdwn() {
		curTime = Date.now();
		timeLeft = endTime - curTime;
		main_display.innerHTML = msToLocaleString(timeLeft);
	}
	window.setInterval(cntdwn, 1000);
}
