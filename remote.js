var socket = io.connect('http://localhost:8124');

function slideUp(){
	socket.emit('Remote',"up");
}

function slideDown(){
	socket.emit('Remote',"down");
}

function slideLeft(){
	socket.emit('Remote',"left");
}

function slideRight(){
	socket.emit('Remote',"right");
}