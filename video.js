var isPlay = false;
var socket = io.connect('http://localhost:8124');
var i ;
function Start() {
	var searchpresent = document.getElementsByClassName("present");
	var searchVideo = searchpresent[0].getElementsByClassName("stretch");
	if(isServer && !isPlay){
		searchVideo[0].addEventListener('play', function() {
			i = window.setInterval(function() {
				// ctx.drawImage(searchVideo[0], 0, 0, 270, 135)
				socket.emit('PlayVideo',searchVideo[0].currentTime);
			}, 20);
		}, false);
		searchVideo[0].addEventListener('pause', function() {
			window.clearInterval(i);
		}, false);
	}

	if (!isPlay) {
		searchVideo[0].play();
		isPlay = true;
	} else {
		searchVideo[0].pause();
		isPlay = false;
	}

}


// function PlayVideo() {
// 	if (isServer) {
// 		var searchpresent = document.getElementsByClassName("present");
// 		var searchVideo = searchpresent[0].getElementsByClassName("stretch");
// 		searchVideo.addEventListener('play', function() {
// 			var i = window.setInterval(function() {
// 				ctx.drawImage(searchVideo, 0, 0, 270, 135)
// 			}, 20);
// 		}, false);
// 		searchVideo.addEventListener('pause', function() {
// 			window.clearInterval(i);
// 		}, false);
// 	}
// }


socket.on('PlayCanvas', function(video) {
	if (!isServer) {
		var searchpresent = document.getElementsByClassName("present");
		var searchCanvas = searchpresent[0].getElementsByClassName("stretch");
		searchCanvas[0].currentTime=video;
		console.log("影片播放中");
	}
});