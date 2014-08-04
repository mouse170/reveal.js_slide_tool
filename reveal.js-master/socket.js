var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');

Reveal.addEventListener('slidechanged', function(event) {
    // alert(event.indexh);  //X軸頁數
    // alert(event.indexv);  //Y軸頁數
	ctx.clearRect(0,0,cvs.width,cvs.height);
	var searchpresent = document.getElementsByClassName("present");
	var searchVideo = searchpresent[0].getElementsByClassName("stretch");
	if(searchVideo.length!=0){
		alert("發現影片");
	}
	// alert(isServer);
	if(isServer){
		socket.emit('isslide',event.indexh,event.indexv);
	}
});



Reveal.addEventListener('fragmentshown', function(event) {
    // event.fragment = the fragment DOM element
    // alert("偵測到按下");
    // alert(event.indexf);  //Y軸頁數
    if(isServer){
		socket.emit('isslideFragment',"next");
	}
});


Reveal.addEventListener( 'fragmenthidden', function( event ) {
    // event.fragment = the fragment DOM element
    // alert("偵測到按上");
    // alert(event.indexf);  //Y軸頁數
    if(isServer){
		socket.emit('isslideFragment',"prev");
	}
});


socket.on('slide',function(indexh,indexv){
	if(!isServer)
		Reveal.slide( indexh, indexv);
});

socket.on('next',function(){
	if(!isServer)
		Reveal.nextFragment();
});

socket.on('prev',function(){
	if(!isServer)
		Reveal.prevFragment();
});
