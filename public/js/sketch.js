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
    this.direction = -1; // -1 left, 1 right
}

// draw sprite here
Sprite.prototype.display = function() {
    // rect(this.x, this.y, this.w, this.h);

    // translate(this.x, this.y);
    push();
    translate(this.x, this.y);
    scale(0.025*this.direction, 0.025);
    image(ghostimg, this.w-1000, this.h);
    pop();
    // image(ghostimg, this.x, this.y, this.w, this.h);
};

//////////////////////
// processing stuff //
//////////////////////

var player;

// the two sprite players
var victor = new Sprite(100, 100, 40, 40);
var nathan = new Sprite(800, 500, 40, 40);
var ghostimg;
var chickimg;

function keyPressed() {
    // victor the ghost
    if (player == 1) {
        if (keyCode == UP_ARROW || key.toLowerCase == 'w') {
            victor.y -= 20;
            if (victor.y < -10) {
                victor.y = canvasHeight;
            }
        } else if (keyCode == DOWN_ARROW || key.toLowerCase == 's') {
            victor.y += 20;
            victor.y %= canvasHeight;
        } else if (keyCode == LEFT_ARROW || key.toLowerCase == 'a') {
            victor.x -= 20;
            if (victor.x < -10) {
                victor.x = canvasWidth;
            }
            victor.direction = 1;
        } else if (keyCode == RIGHT_ARROW || key.toLowerCase == 'd') {
            victor.x += 20;
            victor.x %= canvasWidth;
            victor.direction = -1;
        }

    // nathan the chick
    } else {
        if (keyCode == UP_ARROW || key.toLowerCase == 'w') {
            nathan.y -= 20;
            if (nathan.y < -10) {
                nathan.y = canvasHeight;
            }
        } else if (keyCode == DOWN_ARROW || key.toLowerCase == 's') {
            nathan.y += 20;
            nathan.y %= canvasHeight;
        } else if (keyCode == LEFT_ARROW || key.toLowerCase == 'a') {
            nathan.x -= 20;
            if (nathan.x < -10) {
                nathan.x = canvasWidth;
            }
            nathan.direction = 1;
        } else if (keyCode == RIGHT_ARROW || key.toLowerCase == 'd') {
            nathan.x += 20;
            nathan.x %= canvasWidth;
            nathan.direction = -1;
        }
    }
}


function preload() {
    ghostimg = loadImage('../images/ghost.png');
}

function setup() {
    var canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("p5Canvas");

    noStroke();
    fill(102);

    player = parseInt(random(2));
    console.log(player);
}

function draw() {
    background(220);
    fill(255,0,0);
    victor.display();
    fill(0,0,255);
    nathan.display();

    // image(ghostimg, 25, 25, 50, 50);
}