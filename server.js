var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs');
app.listen(8124);

var Nowindexh,Nowindexv;

function handler(req, res) {
    fs.readFile(__dirname + '/slides.html', function(err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading slides.html');
        }
        res.writeHead(200);
        res.end(data);
    });
    fs.readFile(__dirname + '/reveal.js-master/index.html', function(err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading reveal.js');
        }
        res.writeHead(200);
        res.end(data);
    });

}
io.sockets.on('connection', function(socket) {
    socket.on('addme', function(username) {
        socket.username = username;
        socket.emit('chat', 'SERVER', 'You have connected');
        // socket.broadcast.emit('chat', 'SERVER', username + ' is on deck');
        io.sockets.emit('slide',Nowindexh,Nowindexv);
    });
    socket.on('sendchat', function(data) {
        io.sockets.emit('chat', socket.username, data);
    });

    socket.on('disconnect', function() {
        io.sockets.emit('chat', 'SERVER', socket.username + ' has left the building');
    });

    socket.on('Draw',function(type){
        if(type=='M')
            io.sockets.emit('useMarker',true);
        else if(type=='C')
            io.sockets.emit('useCursor',true);
        else if(type=='E')
            io.sockets.emit('useEraser',true);
        else if(type=='AllClear')
            io.sockets.emit('canvasClear',true);
    });

    socket.on('mouse',function(type,type2,x,y,oldW,oldH){
        if(type=='mouseDown'){
            io.sockets.emit('mouseDown',x,y,oldW,oldH);
        }
        else if(type=='mouseMove'){
            if(type2=='M'){
                io.sockets.emit('mouseMoveM',x,y,oldW,oldH);
            }else if (type2=='E'){
                io.sockets.emit('mouseMoveE',x,y,oldW,oldH);
            }
        }else if(type=='mousePic'){
             io.sockets.emit('mouseMovePic',x,y,oldW,oldH);
        }
    });

    socket.on('Text',function(color, str, x, y, size,oldW,oldH){
         io.sockets.emit('addText',color, str, x, y, size,oldW,oldH);
    });

    socket.on('isslide',function(indexh,indexv){
         Nowindexh=indexh;
         Nowindexv=indexv;
         io.sockets.emit('slide',indexh,indexv);
    });

    socket.on('isslideFragment',function(type){
         if(type=="next")
            io.sockets.emit('next');
        else if(type=="prev")
            io.sockets.emit('prev');

    });

    socket.on('PlayVideo',function(video){
            io.sockets.emit('PlayCanvas',video);
    });

});