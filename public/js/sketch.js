console.log("this is loading! yay! happy halloween!");

var theta = 0;

var socket = io();
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var animating = false;

// the corns to animate

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

// probably wont need this
function dropCorn() {
    rect(150, i, 100, 100); // drop a 100x100 block down
}

///////////////////////////
// register socket calls //
///////////////////////////

socket.on('someone draws', function (data) {
    console.log("did you get here?");
    rect(data.x, data.y, data.width, data.height);
});

/////////////////////
// the corn object //
/////////////////////

function Corn(x, y, key) {
    // this.v = createVector(x, y);
    this.x = x;
    this.y = y;
    this.key = key;

    this.frames = 0;
    this.animating = false;
}

Corn.prototype.display = function() {
    // fill(102);
    if (this.animating) {
        this.frames+=4;
        rect(this.x, this.y + this.frames, 100, 100); // hardset on width and height
        if (this.frames >= windowHeight) {
            this.frames = 0;
            this.animating = false;
        }
    }
};

Corn.prototype.drop = function() {
    this.frames = 0;
    this.animating = true;
};

Corn.prototype.isAnimating = function() {
    return this.animating;
};

//////////////////////
// processing stuff //
//////////////////////

var corns = [];

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("p5Canvas");

    background(255);
    noStroke();
    fill(102);

    // for (var i = 0; i < 5; i++) {
    //     corns.push(new Corn(120*i, 0, 100, 100));
    // };
}

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
        
        var newCorn = new Corn(random(0, 500), 0, 100);
        newCorn.drop();
        corns.push(newCorn);
        // cornu.drop();
        // socket.emit('chat message', "down");
    } else {
        console.log("pressed other");
        // socket.emit('chat message', "other");
    }
}

function draw() {
    background(255);
    // for each corn made -- draw it out
    for (var i = 0; i < corns.length; i++) {
        if (!corns[i].isAnimating()) {
            console.log("corn length: ", corns.length);
            corns.splice(0, i);
        } else {
            corns[i].display();
        }
    };
    // theta++;
}