var socket = io.connect('http://localhost:8124');
var isOpen = false;
var isStart = true;

var NowX, NowY, NowW, NowH;
var xTime, yTime;

function slideUp() {
	socket.emit('Remote', "up");
}

function slideDown() {
	socket.emit('Remote', "down");
}

function slideLeft() {
	socket.emit('Remote', "left");
}

function slideRight() {
	socket.emit('Remote', "right");
}

window.addEventListener('devicemotion', test, false);

function openGravity() {
	if (!isOpen) {
		isOpen = true;
		// isStart=true;
		document.getElementById('Gravity').classList.add('Gon');
	}
	else{
		isOpen=false;
		document.getElementById('Gravity').classList.remove('Gon');
	}
}



function test(e) {
	// xTime = window.setTimeout(function() {
	// ctx.drawImage(searchVideo[0], 0, 0, 270, 135)
	if(isOpen){
		if ((e.accelerationIncludingGravity.x * 10) >= 10) {
			NowX -= (e.accelerationIncludingGravity.x * 5);
		} else if ((e.accelerationIncludingGravity.x * 10) <= -10) {
			NowX -= (e.accelerationIncludingGravity.x * 5);
		}
		// }, 100);

		// yTime = window.setTimeout(function() {
		// ctx.drawImage(searchVideo[0], 0, 0, 270, 135)
		if ((e.accelerationIncludingGravity.y * 10) >= 30) {
			NowY += (e.accelerationIncludingGravity.y * 5);
		} else if ((e.accelerationIncludingGravity.y * 10) <= -30) {
			NowY += (e.accelerationIncludingGravity.y * 5);
		}
		// }, 100);
		socket.emit('mouse', 'mousePicAll', 'E', NowX, NowY, NowW, NowH);
	}else
	{
		if(e.accelerationIncludingGravity.x>=5 && isStart){
			slideRight();
			isStart=false;
			setTimeout( function(){
				isStart =true;
			},100);
		}
		else if(e.accelerationIncludingGravity.x<=-7  && isStart){
			slideLeft();
			isStart=false;
			setTimeout( function(){
				isStart =true;
			},100);
		}
	}
	// alert(e.accelerationIncludingGravity.x);
}

function Test2() {
	// alert(e.accelerationIncludingGravity.x);
	socket.emit('mouse', 'mousePicAll', 'E', NowX + 10, NowY + 10, NowW, NowH);
}


socket.on('NowMouseMove', function(x, y, oldW, oldH) {
	NowX = x;
	NowY = y;
	NowW = oldW;
	NowH = oldH;
});