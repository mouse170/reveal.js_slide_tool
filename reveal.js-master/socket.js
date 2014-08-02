var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');
var socket = io.connect('http://localhost:8124', {'force new connection': true});
var currentSlide = document.getElementById('slide_control');

Reveal.addEventListener('slidechanged', function(event) {
    // alert(event.indexh);  //X軸頁數
    // alert(event.indexv);  //Y軸頁數
    socket.on('slidedata', function(data) {
        currentSlide.contentWindow.Reveal.slide(data.indexh, data.indexv);

    });

    ctx.clearRect(0, 0, cvs.width, cvs.height);
});



Reveal.addEventListener('fragmentshown', function(event) {
    socket.on('fragmentdata', function(data) {
        if (data.fragment === 'next') {
            currentSlide.contentWindow.Reveal.nextFragment();
        } else if (data.fragment === 'previous') {
            currentSlide.contentWindow.Reveal.prevFragment();
        }
    });
    // event.fragment = the fragment DOM element
    // alert("偵測到按下");
});
Reveal.addEventListener('fragmenthidden', function(event) {
    socket.on('fragmentdata', function(data) {
        if (data.fragment === 'next') {
            currentSlide.contentWindow.Reveal.nextFragment();
        } else if (data.fragment === 'previous') {
            currentSlide.contentWindow.Reveal.prevFragment();
        }
    });
    // event.fragment = the fragment DOM element
    // alert("偵測到按上");
});
