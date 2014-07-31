var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');
var buttonM = document.getElementById('marker');
var buttonC = document.getElementById('cursors');
var buttonE = document.getElementById('eraser');
var buttonCc = document.getElementById('clear');
var buttonT = document.getElementById('keyfont');

var candraw = false;
var cursor = "";
cvs.addEventListener('mouseup',mouseUpHandle,false);
cvs.addEventListener('mousedown',mouseDownHandle,false);
cvs.addEventListener('mousemove',mouseMoveHandle,false);

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

var onoff=0;
function expandTool(){
	if(onoff==0){
		cursor="";
		console.log("tools");
		buttonM.style.display="inline-block";
		buttonC.style.display="inline-block";
		buttonT.style.display="inline-block";
		buttonM.classList.add('moveinX');
		buttonC.classList.add('moveinY');
		buttonT.classList.add('moveinXY');
		onoff=1;
	}
	else{
		buttonM.style.display="none";
		buttonC.style.display="none";
		buttonT.style.display="none";
		onoff=0;
	}
	

}

function useMarker(){
	cursor="M";
	console.log("in marker");
	cvs.style.cursor="url('../image/marker.png'),default"; 
	cvs.style.zIndex = 5;
}

function useCursor(){
	cursor="C";
	console.log("in cursor");
	cvs.style.cursor="url('../image/micky.png'),default";
	cvs.style.zIndex = -1;
}

function useEraser(){
	cursor="E";
	console.log("in eraser");
	cvs.style.cursor="url('../image/eraser.png'),default";
	cvs.style.zIndex = 5;
}

function useText(){	
}

function canvasClear(){
	ctx.clearRect(0,0,cvs.width,cvs.height);
}

function text(color,str,x,y,size){
    ctx.fillStyle=color;
    ctx.font=size+" bold 'arial'";
    ctx.fillText(str,x,y);
}