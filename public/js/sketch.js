console.log("this is loading! yay! happy halloween!");

var a = 0;
var socket = io();
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("p5Canvas");

    background(255);
    noStroke();
    fill(102);
}

// draw a rect and emit the correspondind data
function drawRect() {
    console.log('drawing random rect');
    var rand_x = random(0, windowWidth);
    var rand_y = random(0, windowHeight);
    var rand_w = random(0, 100);
    var rand_h = random(0, 100);
    rect(rand_x, rand_y, rand_w, rand_h)

    // emit this data
    var data = {
        'x': rand_x,
        'y': rand_y,
        'width': rand_w,
        'height': rand_h
    }
    socket.emit("chat message", data);
}

socket.on('someone draws', function (data) {
    console.log("did you get here?");
    rect(data.x, data.y, data.width, data.height);
});

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        console.log("pressed left");
        drawRect();
        // socket.emit('chat message', "left");
    } else if (keyCode === RIGHT_ARROW) {
        console.log("pressed up");
        drawRect();
        // socket.emit('chat message', "right");
    } else if (keyCode === UP_ARROW) {
        console.log("pressed up");
        // socket.emit('chat message', "up");
    } else if (keyCode === DOWN_ARROW) {
        console.log("pressed down");
        // socket.emit('chat message', "down");
    } else {
        console.log("pressed other");
        // socket.emit('chat message', "other");
    }
}

function draw() {
    // draw here
}