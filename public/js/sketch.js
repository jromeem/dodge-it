console.log("this is loading! yay! happy halloween!");

var theta = 0;

var socket = io();
// var canvasWidth = window.innerWidth;
// var canvasHeight = window.innerHeight;
var canvasWidth = 1000;
var canvasHeight = 700;
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

function Corn(x, y, w, h) {
    // this.v = createVector(x, y);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    this.frames = 0;
    this.animating = false;
}

Corn.prototype.display = function() {
    // fill(102);
    if (this.animating) {
        this.frames+=4;
        rect(this.x, this.y + this.frames, this.w, this.h); // hardset on width and height
        if (this.frames >= canvasHeight) {
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

function keyPressed() {
    
    // for the ghost keys
    if (keyCode === LEFT_ARROW) {
        console.log("pressed left");
        drawRect();
    } else if (keyCode === RIGHT_ARROW) {
        console.log("pressed up");
        drawRect();
    } else if (keyCode === UP_ARROW) {
        console.log("pressed up");
    } else if (keyCode === DOWN_ARROW) {
        console.log("pressed down");
        var newCorn = new Corn(random(0, 1000), 0, 100);
        newCorn.drop();
        corns.push(newCorn);
    } else {
        console.log("pressed other");
    }

    // wow do it for her
    // for the corn keys
    var newCorn;

    if (key.toLowerCase() == 'q') {
        console.log('Q');
        newCorn = new Corn(5, 0, 90, 90);
    } else if (key.toLowerCase() == 'w') {
        console.log('W');
        newCorn = new Corn(105, 0, 90, 90);
    } else if (key.toLowerCase() == 'e') {
        console.log('E');
        newCorn = new Corn(205, 0, 90, 90);
    } else if (key.toLowerCase() == 'r') {
        console.log('R');
        newCorn = new Corn(305, 0, 90, 90);
    } else if (key.toLowerCase() == 't') {
        console.log('T');
        newCorn = new Corn(405, 0, 90, 90);
    } else if (key.toLowerCase() == 'y') {
        console.log('Y');
        newCorn = new Corn(505, 0, 90, 90);
    } else if (key.toLowerCase() == 'u') {
        console.log('U');
        newCorn = new Corn(605, 0, 90, 90);
    } else if (key.toLowerCase() == 'i') {
        console.log('I');
        newCorn = new Corn(705, 0, 90, 90);
    } else if (key.toLowerCase() == 'o') {
        console.log('O');
        newCorn = new Corn(805, 0, 90, 90);
    } else if (key.toLowerCase() == 'p') {
        console.log('P');
        newCorn = new Corn(905, 0, 90, 90);
    } else {
        console.log('pressed other');
    }

    if (corns.length < 10) {
        newCorn.drop();
        corns.push(newCorn);    
    }

}

function setup() {
    console.log(canvasWidth, canvasHeight);
    var canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("p5Canvas");

    background(255);
    noStroke();
    fill(102);
}

function draw() {
    background(255);
    // for each corn made -- draw it out
    for (var i = 0; i < corns.length; i++) {
        if (!corns[i].isAnimating()) {
            console.log("corn length: ", corns.length);
            corns.splice(0, i);
            // if reduced to 1 after splice -- restart the corns
            if (corns.length == 1) {
                corns = [];
            }
        } else {
            corns[i].display();
        }
    };

    // theta++;
}