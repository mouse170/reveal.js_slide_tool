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


var onoff=0;
var candraw = false;
var cursor = "C";
var addTextX=0;
var addTextY=0;
cvs.addEventListener('mouseup',mouseUpHandle,false);
cvs.addEventListener('mousedown',mouseDownHandle,false);
cvs.addEventListener('mousemove',mouseMoveHandle,false);

addText.addEventListener('keydown',addin,false);

window.onload = function(){
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
window.onresize = function(){
	var s = document.body.getBoundingClientRect();
	cvs.width = s.width;
	cvs.height = s.height;
	cvs_cursor.width = s.width;
	cvs_cursor.height = s.height;   
}

function mouseUpHandle(e){
	candraw=false;
}

function mouseDownHandle(e){
	buttonM.classList.add('moveoutX');
	buttonC.classList.add('moveoutY');
	buttonT.classList.add('moveoutXY');
	buttonM.classList.remove('moveinX');
	buttonC.classList.remove('moveinY');
	buttonT.classList.remove('moveinXY');
	onoff=0;

	if(cursor=="T"){
		textbg.style.display="inline-block";
		addTextX = e.clientX;
		addTextY = e.clientY;
		console.log(addText);
		addText.style.top=addTextY+'px';
		addText.style.left=addTextX+'px';
	}
	else{
		candraw=true;
		var x = e.clientX;
		var y = e.clientY;
		ctx.beginPath();
		ctx.lineTo(x+5,y+43);
		ctx.stroke();
	}
}

function mouseMoveHandle(e){
		if (cursor=="M"&&candraw==true){
			console.log('draw');
			var x = e.clientX;
			var y = e.clientY;
			ctx_cursor.clearRect(0,0,cvs_cursor.width,cvs_cursor.height);
			ctx_cursor.drawImage(image,x,y);
			ctx.lineWidth='7px';
			ctx.strokeStyle="#ffcc33";
			ctx.lineTo(x+5,y+43);
			ctx.stroke();
		}
		else if(cursor=="E"&&candraw==true){
			console.log('clear part');
			var x = e.clientX;
			var y = e.clientY;
			ctx_cursor.clearRect(0,0,cvs_cursor.width,cvs_cursor.height);
			ctx_cursor.drawImage(image,x,y);
			ctx.globalCompositeOperation = "destination-out";
			ctx.arc(x+5, y+43, 10, 0, Math.PI * 2);
			ctx.strokeStyle = "rgba(250,250,250,0)";//使用颜色值为白色，透明为0的颜色填充
			ctx.fill();
			ctx.globalCompositeOperation = "source-over"
		}
		else{
			var x = e.clientX;
			var y = e.clientY;
			ctx_cursor.clearRect(0,0,cvs_cursor.width,cvs_cursor.height);
			ctx_cursor.drawImage(image,x,y);
		}
}

function mouseLeaveHandle(e){
	ctx_cursor.clearRect(0,0,cvs_cursor.width,cvs_cursor.height);
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
function addin(e){	
	if(e.keyCode==13){
		var str = addText.value;
		text("#fff",str,addTextX,addTextY,"20pt");
		addText.value='';
		textbg.style.display="none";
		addText.focus();
	}
// >>>>>>> ab8ec468afce16199c37247d2c170425409b14b8
}



function expandTool(){
	if(onoff==0){
		console.log("tools");
		buttonM.style.display="inline-block";
		buttonC.style.display="inline-block";
		buttonT.style.display="inline-block";
		buttonM.classList.remove('moveoutX');
		buttonC.classList.remove('moveoutY');
		buttonT.classList.remove('moveoutXY');
		buttonM.classList.add('moveinX');
		buttonC.classList.add('moveinY');
		buttonT.classList.add('moveinXY');
		onoff=1;
	}
	else{
		buttonM.classList.add('moveoutX');
		buttonC.classList.add('moveoutY');
		buttonT.classList.add('moveoutXY');
		buttonM.classList.remove('moveinX');
		buttonC.classList.remove('moveinY');
		buttonT.classList.remove('moveinXY');
		onoff=0;
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
	onoff=0;
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
	onoff=0;
}

function useEraser(){
	cursor="E";
	image.src = "../image/eraser.png";
	console.log("in eraser");
	cvs.style.zIndex = 1;
}


function useText(){	
	cursor="T";
	console.log("in Text");
	cvs.style.zIndex = 1;
	image.src = "../image/nyan_cat.gif";
	buttonM.classList.add('moveoutX');
	buttonC.classList.add('moveoutY');
	buttonT.classList.add('moveoutXY');
	buttonM.classList.remove('moveinX');
	buttonC.classList.remove('moveinY');
	buttonT.classList.remove('moveinXY');
	onoff=0;
}

function canvasClear(){
	ctx.clearRect(0,0,cvs.width,cvs.height);
}

function text(color,str,x,y,size){
    ctx.fillStyle=color;
    ctx.font=size+" bold 'arial'";
    ctx.fillText(str,x,y);
}

function useAddText(){
	if(isAdding)
		isAdding=false;
	else
		isAdding=true;
	console.log("in AddText");
}
