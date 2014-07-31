var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');
var buttonM = document.getElementById('marker');
var buttonC = document.getElementById('cursors');
var buttonE = document.getElementById('eraser');
var buttonCc = document.getElementById('clear');

var candraw = false;
var cursor = "";
cvs.addEventListener('mouseup',mouseUpHandle,false);
cvs.addEventListener('mousedown',mouseDownHandle,false);
cvs.addEventListener('mousemove',mouseMoveHandle,false);
// cvs.addEventListener('')

window.onload = function(){
	var s = document.body.getBoundingClientRect();
	cvs.width = s.width;
	cvs.height = s.height;  
}
window.onresize = function(){
	var s = document.body.getBoundingClientRect();
	cvs.width = s.width;
	cvs.height = s.height;  
}

function mouseUpHandle(e){
	candraw=false;
}

function mouseDownHandle(e){
	candraw=true;
	var x = event.clientX+5;
	var y = event.clientY+45;
	ctx.beginPath();
	ctx.lineTo(x,y);
	ctx.stroke();
}

function mouseMoveHandle(e){
		if (cursor=="M"&&candraw==true){
			console.log('draw');
			var x = e.clientX+5;
			var y = e.clientY+45;
			ctx.lineWidth='7px';
			ctx.strokeStyle="#ffcc33";
			ctx.lineTo(x,y);
			ctx.stroke();
		}
		else if(cursor=="E"&&candraw==true){
			console.log('clear part');
			var x = e.clientX+5;
			var y = e.clientY+45;
			ctx.globalCompositeOperation = "destination-out";
			ctx.arc(x, y, 10, 0, Math.PI * 2);
			ctx.strokeStyle = "rgba(250,250,250,0)";//使用颜色值为白色，透明为0的颜色填充
			ctx.fill();
			ctx.globalCompositeOperation = "source-over"
		}
}

function useMarker(){
	cursor="M";
	console.log("in marker");
	cvs.style.cursor="url('../image/marker.png'),default"; 
	buttonC.style.display="inline-block";
	buttonM.style.display="none";
	cvs.style.zIndex = 5;
}

function useCursor(){
	cursor="C";
	console.log("in cursor");
	cvs.style.cursor="url('../image/white.png'),default";
	buttonM.style.display="inline-block";
	buttonC.style.display="none";
	cvs.style.zIndex = 0;
}

function useEraser(){
	cursor="E";
	console.log("in eraser");
	cvs.style.cursor="url('../image/eraser.png'),default";
	buttonM.style.display="inline-block";
	buttonC.style.display="none";
	cvs.style.zIndex = 5;
}

function canvasClear(){
	ctx.clearRect(0,0,cvs.width,cvs.height);
}

function text(color,str,x,y,size){
    ctx.fillStyle=color;
    ctx.font=size+" bold 'arial'";
    ctx.fillText(str,x,y);
}