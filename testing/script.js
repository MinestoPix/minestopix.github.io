var FPS = 30;

var ctx;
var testImage;
var wWidth;
var wHeight;
//$("#big_canvas")
$(function() {

	ctx = document.getElementById("big_canvas").getContext("2d");


	wWidth = window.innerWidth;
	wHeight = window.innerHeight;

	ctx.canvas.width  = wWidth;
	ctx.canvas.height = wHeight;


	ctx.fillRect(0,0,wWidth,wHeight);

	testImage = new Image();
	testImage.src = "tilescompressed.png";

	setInterval(run, 1000 / FPS);




});

var lastTime = Date.now();
var currTime;
var frames = 0;
var frameCount = FPS;
var sumTime = 0;
function run(){
	// FPS calculations
	currTime = Date.now();

	sumTime += currTime-lastTime;

	if (sumTime>= 1000){
		frameCount = frames;
		sumTime = 0;
		frames = 0;
	}




	// Reset - Draw background
	ctx.fillStyle = "#000000";
	ctx.fillRect(0,0,wWidth,wHeight);




	// Rendering
	ctx.fillStyle = "#FFFFFF";
	ctx.font = "30px 'Courier New'";
	ctx.fillText("FPS: " + frameCount + "/" + FPS, 10, 40);

	// drawImage(img, source x, y, source w, h, destination x, y, destination w, h)

	// ctx.drawImage(testImage, 16, 0, 16, 16, 10, 200, 64, 64);
	for(var x=0; x<10; x++){

		ctx.drawImage(testImage, 16 + (16*(x%3)), 0, 16, 16, 16*x, 0, 16, 16);

	}




	frames++;

	lastTime = Date.now();
}

window.onresize = function(event){

	wWidth = window.innerWidth;
	wHeight = window.innerHeight;

	ctx.canvas.width  = wWidth;
	ctx.canvas.height = wHeight;

	ctx.fillRect(0,0,wWidth,wHeight);

}
