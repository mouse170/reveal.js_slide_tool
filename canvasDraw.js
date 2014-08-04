var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');
var cvs_cursor = document.getElementById('canvas_cursor');
var ctx_cursor = cvs_cursor.getContext('2d');

var buttonM = document.getElementById('marker');
var buttonC = document.getElementById('cursors');
var buttonE = document.getElementById('eraser');
var buttonCc = document.getElementById('clear');
var buttonT = document.getElementById('keyfont');
var addText = document.getElementById('addText');
var textbg = document.getElementById('textbg');
var image = new Image();
image.src = "../image/micky.png";


var onoff = 0;
var candraw = false;
var cursor = "";
var addTextX = 0;
var addTextY = 0;

var isServer = false;
var cursor = "C";
var addTextX=0;
var addTextY=0;
cvs.addEventListener('mouseup',mouseUpHandle,false);
cvs.addEventListener('mousedown',mouseDownHandle,false);
cvs.addEventListener('mousemove',mouseMoveHandle,false);

addText.addEventListener('keydown',addin,false);


var socket = io.connect('http://localhost:8124');

cvs.addEventListener('mouseup', mouseUpHandle, false);
cvs.addEventListener('mousedown', mouseDownHandle, false);
cvs.addEventListener('mousemove', mouseMoveHandle, false);
addText.addEventListener('keydown', addin, false);

window.onload = function() {
	var s = document.body.getBoundingClientRect();
	cvs.width = s.width;
	cvs.height = s.height;
	cvs_cursor.width = s.width;
	cvs_cursor.height = s.height;
	cvs_cursor.addEventListener('mouseup',mouseUpHandle,false);
	cvs_cursor.addEventListener('mousedown',mouseDownHandle,false);
	cvs_cursor.addEventListener('mousemove',mouseMoveHandle,false);
	cvs_cursor.addEventListener('mouseleave',mouseLeaveHandle,false);   
}

window.onresize = function() {
	var s = document.body.getBoundingClientRect();
	cvs.width = s.width;
	cvs.height = s.height;
	cvs_cursor.width = s.width;
	cvs_cursor.height = s.height;   
}

function mouseUpHandle(e) {
	candraw = false;
}

function mouseDownHandle(e) {
	buttonM.classList.add('moveoutX');
	buttonC.classList.add('moveoutY');
	buttonT.classList.add('moveoutXY');
	buttonM.classList.remove('moveinX');
	buttonC.classList.remove('moveinY');
	buttonT.classList.remove('moveinXY');
	onoff = 0;

	if (cursor == "T") {
		textbg.style.display = "inline-block";
		addTextX = e.clientX;
		addTextY = e.clientY;
		console.log(addText);
		addText.style.top=addTextY+'px';
		addText.style.left=addTextX+'px';
	} else {
		var winW = window.innerWidth;
		var winH = window.innerHeight;
		var x = e.clientX;
		var y = e.clientY;
<<<<<<< HEAD
		ctx.beginPath();
		ctx.lineTo(x+5,y+43);
		ctx.stroke();
=======
		Draw(x, y,winW,winH);
		if (isServer) {
			socket.emit('mouse','mouseDown','D',x,y,winW,winH);
		}
		// ctx.beginPath();
		// ctx.lineTo(x,y);
		// ctx.stroke();
>>>>>>> f649cf568496902d2fd54c6247a85d82f6ecc1f1
	}
}

function Draw(x, y,oldW,oldH) {
	var NewwinW = window.innerWidth;
	var NewwinH = window.innerHeight;
	candraw = true;
	ctx.beginPath();
	ctx.lineTo((NewwinW/oldW)*(x+5), (NewwinH/oldH)*(y+43));
	ctx.stroke();
}


function mouseMoveHandle(e) {
	if (cursor == "M" && candraw == true) {
		// console.log('draw');
		var x = e.clientX;
		var y = e.clientY;
		var winW = window.innerWidth;
		var winH = window.innerHeight;
		ctx_cursor.clearRect(0,0,cvs_cursor.width,cvs_cursor.height);
		isDraw(x, y,winW,winH);
		if (isServer) {
			socket.emit('mouse','mouseMove','M',x,y,winW,winH);
		}
		// ctx.lineWidth='7px';
		// ctx.strokeStyle="#ffcc33";
		// ctx.lineTo(x,y);
		// ctx.stroke();
	} else if (cursor == "E" && candraw == true) {
		console.log('clear part');
		var x = e.clientX;
		var y = e.clientY;
		var winW = window.innerWidth;
		var winH = window.innerHeight;
		isEraser(x,y,winW,winH);
		if (isServer) {
			socket.emit('mouse','mouseMove','E',x,y,winW,winH);
		}
		// ctx.globalCompositeOperation = "destination-out";
		// ctx.arc(x, y, 10, 0, Math.PI * 2);
		// ctx.strokeStyle = "rgba(250,250,250,0)"; //使用颜色值为白色，透明为0的颜色填充
		// ctx.fill();
		// ctx.globalCompositeOperation = "source-over"
	}
	else{
			var x = e.clientX;
			var y = e.clientY;
<<<<<<< HEAD
			ctx_cursor.clearRect(0,0,cvs_cursor.width,cvs_cursor.height);
			ctx_cursor.drawImage(image,x,y);
		}
}

function mouseLeaveHandle(e){
	ctx_cursor.clearRect(0,0,cvs_cursor.width,cvs_cursor.height);
=======
			var winW = window.innerWidth;
			var winH = window.innerHeight;
			movePic(x,y,winW,winH);
			if (isServer) {
				socket.emit('mouse','mousePic','E',x,y,winW,winH);
			}
	}
}

function isDraw(x, y,oldW,oldH) {
	console.log('draw');
	var NewwinW = window.innerWidth;
	var NewwinH = window.innerHeight;
	ctx_cursor.clearRect(0,0,cvs_cursor.width,cvs_cursor.height);
	ctx_cursor.drawImage(image,(NewwinW/oldW)*x,(NewwinH/oldH)*y);
	ctx.lineWidth = '7px';
	ctx.strokeStyle = "#ffcc33";
	ctx.lineTo((NewwinW/oldW)*(x+5), (NewwinH/oldH)*(y+43));
	ctx.stroke();
}

function isEraser(x,y,oldW,oldH){
	var NewwinW = window.innerWidth;
	var NewwinH = window.innerHeight;
	ctx_cursor.clearRect(0,0,cvs_cursor.width,cvs_cursor.height);
	ctx_cursor.drawImage(image,(NewwinW/oldW)*x, (NewwinH/oldH)*y);
	ctx.globalCompositeOperation = "destination-out";
	ctx.arc((NewwinW/oldW)*(x+5), (NewwinH/oldH)*(y+43), 10, 0, Math.PI * 2);
	ctx.strokeStyle = "rgba(250,250,250,0)"; //使用颜色值为白色，透明为0的颜色填充
	ctx.fill();
	ctx.globalCompositeOperation = "source-over"
}

function movePic(x,y,oldW,oldH){
	var NewwinW = window.innerWidth;
	var NewwinH = window.innerHeight;
	ctx_cursor.clearRect(0,0,cvs_cursor.width,cvs_cursor.height);
	ctx_cursor.drawImage(image,(NewwinW/oldW)*x,(NewwinH/oldH)*y);
>>>>>>> f649cf568496902d2fd54c6247a85d82f6ecc1f1
}

// <<<<<<< HEAD

// function  mouseClickHandle(e){
//   if(isAdding){
//   	var x = e.clientX+5;
// 	var y = e.clientY+45;
// 	addtextarea(x,y);
// 	// alert(x+'+'+y);
// 	// var str=window.prompt("想要輸入的文字");
// 	// text("#fff",str,x,y,20);
//   }
// =======
function addin(e) {
	if (e.keyCode == 13) {
		var str = addText.value;
		var winW = window.innerWidth;
		var winH = window.innerHeight;
		text("#fff", str, addTextX, addTextY, 1.5,winW,winH);
		addText.value = '';
		textbg.style.display = "none";
		addText.focus();
		if(isServer){
			var winW = window.innerWidth;
			var winH = window.innerHeight;
			socket.emit('Text', "#fff", str, addTextX, addTextY, 1.5,winW,winH);
		}
	}
	// >>>>>>> ab8ec468afce16199c37247d2c170425409b14b8
}



function expandTool() {
	if (onoff == 0) {
		console.log("tools");
		buttonM.style.display = "inline-block";
		buttonC.style.display = "inline-block";
		buttonT.style.display = "inline-block";
		buttonM.classList.remove('moveoutX');
		buttonC.classList.remove('moveoutY');
		buttonT.classList.remove('moveoutXY');
		buttonM.classList.add('moveinX');
		buttonC.classList.add('moveinY');
		buttonT.classList.add('moveinXY');
		onoff = 1;
	} else {
		buttonM.classList.add('moveoutX');
		buttonC.classList.add('moveoutY');
		buttonT.classList.add('moveoutXY');
		buttonM.classList.remove('moveinX');
		buttonC.classList.remove('moveinY');
		buttonT.classList.remove('moveinXY');
		onoff = 0;
	}
}

function useMarker(){
	cursor="M";
	image.src = "../image/marker.png";
	console.log("in marker");
	cvs.style.zIndex = 1;
	buttonM.classList.add('moveoutX');
	buttonC.classList.add('moveoutY');
	buttonT.classList.add('moveoutXY');
	buttonM.classList.remove('moveinX');
	buttonC.classList.remove('moveinY');
	buttonT.classList.remove('moveinXY');
	onoff = 0;
	if (isServer) {
		socket.emit('Draw', "M");
	}

}


function useCursor(){
	cursor="C";
	image.src = "../image/micky.png";
	console.log("in cursor");
	cvs.style.zIndex = 1;
	buttonM.classList.add('moveoutX');
	buttonC.classList.add('moveoutY');
	buttonT.classList.add('moveoutXY');
	buttonM.classList.remove('moveinX');
	buttonC.classList.remove('moveinY');
	buttonT.classList.remove('moveinXY');
	onoff = 0;
	if (isServer) {
		socket.emit('Draw', "C");
	}
}

function useEraser() {
	cursor="E";
	image.src = "../image/eraser.png";
	console.log("in eraser");
	cvs.style.zIndex = 1;
	if (isServer) {
		socket.emit('Draw', "E");
	}
}


function useText() {
	cursor = "T";
	console.log("in Text");
	cvs.style.cursor = "text";
	cvs.style.zIndex = 5;
	cvs.style.zIndex = 1;
	image.src = "../image/nyan_cat.gif";
	buttonM.classList.add('moveoutX');
	buttonC.classList.add('moveoutY');
	buttonT.classList.add('moveoutXY');
	buttonM.classList.remove('moveinX');
	buttonC.classList.remove('moveinY');
	buttonT.classList.remove('moveinXY');
	onoff = 0;
}

function canvasClear() {
	ctx.clearRect(0, 0, cvs.width, cvs.height);
	if (isServer) {
		socket.emit('Draw', "AllClear");
	}
}

function text(color, str, x, y, size,oldW,oldH) {
	var NewwinW = window.innerWidth;
	var NewwinH = window.innerHeight;
	ctx.fillStyle = color;
	ctx.font = (NewwinW*NewwinH)/(oldW*oldH)*size+"em" + " bold 'arial'";
	ctx.fillText(str, (NewwinW/oldW)*x, (NewwinH/oldH)*y);
}

function useAddText() {
	if (isAdding)
		isAdding = false;
	else
		isAdding = true;
	console.log("in AddText");
}

function setServer() {
	if (!isServer)
		isServer = true;
	else
		isServer = false;
	console.log("isServer=" + isServer);
}

socket.on('useMarker', function(a) {
	if (a && !isServer) {
		useMarker();
	}
});

socket.on('useCursor', function(a) {
	if (a && !isServer) {
		useCursor();
	}
});

socket.on('useEraser', function(a) {
	if (a && !isServer) {
		useEraser();
	}
});

socket.on('canvasClear', function(a) {
	if (a && !isServer)
		canvasClear();
});


socket.on('mouseDown',function(x,y,oldW,oldH){
	if(!isServer)
		Draw(x,y,oldW,oldH);
});

socket.on('mouseMoveM',function(x,y,oldW,oldH){
	if(!isServer)
		isDraw(x,y,oldW,oldH);
});

socket.on('mouseMoveE',function(x,y,oldW,oldH){
	if(!isServer)
		isEraser(x,y,oldW,oldH);
});

socket.on('mouseMovePic',function(x,y,oldW,oldH){
	if(!isServer)
		movePic(x,y,oldW,oldH);
});

socket.on('addText',function(color, str, x, y, size,oldW,oldH){
	if(!isServer)
		text(color, str, x, y, size,oldW,oldH);
});
