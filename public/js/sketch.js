console.log("this is loading! yay! happy halloween!");

var socket = io();
var canvasWidth = 1000;
var canvasHeight = 700;
var animating = false;



///////////////////////////
// register socket calls //
///////////////////////////

socket.on('someone draws', function (data) {
    console.log("did you get here?");
    rect(data.x, data.y, data.width, data.height);
});

///////////////////////
// character classes //
///////////////////////

// sprite class
function Sprite(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
}

// draw sprite here
Sprite.prototype.display = function() {
    rect(this.x, this.y, this.w, this.h);
};

//////////////////////
// processing stuff //
//////////////////////

var player;
var victor = new Sprite(100, 100, 40, 40);
var nathan = new Sprite(800, 500, 40, 40);

function keyPressed() {
    if (keyCode == UP_ARROW || key.toLowerCase() == 'w') {
        console.log('up');
        if (player == 1) {
            victor.y -= 20;
            if (victor.y < -10) {
                victor.y = canvasHeight;
            }
        } else {
            nathan.y -= 20;
            if (nathan.y < -10) {
                nathan.y = canvasHeight;
            }
        }
    } else if (keyCode == DOWN_ARROW || key.toLowerCase() == 's') {
        console.log('down');
        if (player == 1) {
            victor.y += 20;
            victor.y %= canvasHeight;
        } else {
            nathan.y += 20;
            nathan.y %= canvasHeight;
        }
    } else if (keyCode == LEFT_ARROW || key.toLowerCase() == 'a') {
        console.log('left');
        if (player == 1) {
            victor.x -= 20;
            if (victor.x < -10) {
                victor.x = canvasWidth;
            }
        } else {
            nathan.x -= 20;
            if (nathan.x < -10) {
                nathan.x = canvasWidth;
            }
        }
    } else if (keyCode == RIGHT_ARROW || key.toLowerCase() == 'd') {
        console.log('right');
        if (player == 1) {
            victor.x += 20;
            victor.x %= canvasWidth;
        } else {
            nathan.x += 20;
            nathan.x %= canvasWidth;
        }
    } else {
        console.log('hmm');
    }
}

function setup() {
    var canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("p5Canvas");

    background(255);
    noStroke();
    fill(102);

    player = parseInt(random(2));
    console.log(player);
}

function draw() {
    background(255);
    fill(255,0,0);
    victor.display();
    fill(0,0,255);
    nathan.display();
}