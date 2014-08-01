var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');
var buttonM = document.getElementById('marker');
var buttonC = document.getElementById('cursors');
var buttonE = document.getElementById('eraser');
var buttonCc = document.getElementById('clear');
var buttonT = document.getElementById('keyfont');
var addText = document.getElementById('addText');
var textbg = document.getElementById('textbg');

var onoff=0;
var candraw = false;
var cursor = "";
var addTextX=0;
var addTextY=0;

var isServer=false;


var socket = io.connect('http://localhost:8124');

cvs.addEventListener('mouseup',mouseUpHandle,false);
cvs.addEventListener('mousedown',mouseDownHandle,false);
cvs.addEventListener('mousemove',mouseMoveHandle,false);
addText.addEventListener('keydown',addin,false);

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
		addTextY = e.clientY+5;
		console.log(addText);
		addText.style.top=addTextY+'px';
		addText.style.left=addTextX+'px';
	}
	else{
		candraw=true;
		var x = event.clientX+5;
		var y = event.clientY+45;
		ctx.beginPath();
		ctx.lineTo(x,y);
		ctx.stroke();
	}
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
		text("#fff",str,addTextX,addTextY,"1.5em");
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
	console.log("in marker");
	cvs.style.cursor="url('../image/marker.png'),default"; 
	cvs.style.zIndex = 5;
	buttonM.classList.add('moveoutX');
	buttonC.classList.add('moveoutY');
	buttonT.classList.add('moveoutXY');
	buttonM.classList.remove('moveinX');
	buttonC.classList.remove('moveinY');
	buttonT.classList.remove('moveinXY');
	onoff=0;
	if(isServer){
		socket.emit('Draw',"M");
	}

}

function useCursor(){
	cursor="C";
	console.log("in cursor");
	cvs.style.cursor="url('../image/micky.png'),default";
	cvs.style.zIndex = -1;
	buttonM.classList.add('moveoutX');
	buttonC.classList.add('moveoutY');
	buttonT.classList.add('moveoutXY');
	buttonM.classList.remove('moveinX');
	buttonC.classList.remove('moveinY');
	buttonT.classList.remove('moveinXY');
	onoff=0;
	if(isServer){
		socket.emit('Draw',"C");
	}
}

function useEraser(){
	cursor="E";
	console.log("in eraser");
	cvs.style.cursor="url('../image/eraser.png'),default";
	cvs.style.zIndex = 5;
	if(isServer){
		socket.emit('Draw',"E");
	}
}


function useText(){	
	cursor="T";
	console.log("in Text");
	cvs.style.cursor="text";
	cvs.style.zIndex = 5;
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
	if(isServer){
		socket.emit('Draw',"AllClear");
	}
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

function setServer(){
	if(!isServer)
		isServer=true;
	else
		isServer=false;
	console.log("isServer="+ isServer);
}

socket.on('useMarker',function(a){
	if(a && !isServer)
		useMarker();
});

socket.on('useCursor',function(a){
	if(a && !isServer)
		useCursor();
});

socket.on('useEraser',function(a){
	if(a && !isServer)
		useEraser();
});

socket.on('canvasClear',function(a){
	if(a && !isServer)
		canvasClear();
});
// socket.on(''); 
