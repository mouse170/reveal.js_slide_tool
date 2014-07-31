var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');

Reveal.addEventListener( 'slidechanged', function( event ) {
    // alert(event.indexh);  //X軸頁數
    // alert(event.indexv);  //Y軸頁數
	ctx.clearRect(0,0,cvs.width,cvs.height);
} );



Reveal.addEventListener( 'fragmentshown', function( event ) {
    // event.fragment = the fragment DOM element
    alert("偵測到按下");
} );
Reveal.addEventListener( 'fragmenthidden', function( event ) {
    // event.fragment = the fragment DOM element
    alert("偵測到按上");
} );