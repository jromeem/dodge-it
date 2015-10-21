
// initialize application
var express = require('express');
var app = express();

// setting socketio configs
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 5000));

// using static files for sketches and p5 library
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// routes
app.get('/', function(request, response) {
  response.render('pages/index');
});

// socket.io connections!
io.on('connection', function(socket){
    console.log('a user connected');
    // recieving socket
    socket.on('chat message', function(msg){
        io.emit('someone draws', msg);
        console.log("someone draws", msg);
    });
});

// listen to sockets
http.listen(app.get('port'), function() {
  console.log('app running on port', app.get('port'));
});


