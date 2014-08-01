var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs');
app.listen(8124);

function handler(req, res) {
    fs.readFile(__dirname + '/slides.html', function(err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading slides.html');
        }
        res.writeHead(200);
        res.end(data);
    });
}
io.sockets.on('connection', function(socket) {
    socket.on('addme', function(username) {
        socket.username = username;
        socket.emit('chat', 'SERVER', 'You have connected');
        socket.broadcast.emit('chat', 'SERVER', username + ' is on deck');
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

    
});