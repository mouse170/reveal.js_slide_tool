var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');
var buttonM = document.getElementById('marker');
var buttonC = document.getElementById('cursors');
var candraw = false;
var cursor = true;
cvs.addEventListener('mouseup',mouseUpHandle,false);
cvs.addEventListener('mousedown',mouseDownHandle,false);
cvs.addEventListener('mousemove',mouseMoveHandle,false);

window.onresize = function(){
	var s = document.body.getBoundingClientRect();
	cvs.width = s.width;
	cvs.height = s.height*0.8;  
}

function mouseUpHandle(e){
	candraw=false;
}

function mouseDownHandle(e){
	candraw=true;
	var x = event.clientX-cvs.offsetLeft;
	var y = event.clientY-cvs.offsetTop+40;
	ctx.beginPath();
	ctx.lineTo(x,y);
	ctx.stroke();
}

function mouseMoveHandle(e){
		if (cursor==false&&candraw==true){
			console.log('draw');
			var x = e.clientX-cvs.offsetLeft;
			var y = e.clientY-cvs.offsetTop+40;
			ctx.lineWidth='7px';
			ctx.strokeStyle="#ffcc33";
			ctx.lineTo(x,y);
			ctx.stroke();
		}
}

function useMarker(){
	cursor=false;
	console.log("in marker");
	cvs.style.cursor="url('image/Marker-icon.png'),default";
	buttonC.style.display="inline-block";
	buttonM.style.display="none";
}

function useCursor(){
	cursor=true;
	console.log("in cursor");
	cvs.style.cursor="url('image/Cursor-icon.png'),default";
	buttonM.style.display="inline-block";
	buttonC.style.display="none";
}

function canvasClear(){
	ctx.clearRect(0,0,cvs.width,cvs.height);
}

function text(color,str,x,y,size){
    ctx.fillStyle=color;
    ctx.font=size+" bold 'arial'";
    ctx.fillText(str,x,y);
}