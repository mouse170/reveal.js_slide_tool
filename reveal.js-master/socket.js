
Reveal.addEventListener( 'slidechanged', function( event ) {
    // alert(event.indexh);  //X軸頁數
    // alert(event.indexv);  //Y軸頁數
} );



Reveal.addEventListener( 'fragmentshown', function( event ) {
    // event.fragment = the fragment DOM element
    alert("偵測到按下");
} );
Reveal.addEventListener( 'fragmenthidden', function( event ) {
    // event.fragment = the fragment DOM element
    alert("偵測到按上");
} );