//canvas
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

//position and size
var strokeWidth = 5;
var insideRadius = 15 - strokeWidth;
var ballRadius = insideRadius + strokeWidth + 1;
var x = ballRadius;
var y = ballRadius;

//change in coords
var dx = 0;
var dy = 0;

//event on key pressed, movement function
var plyrmv = 5;
function keyDownHandler(e) {
    //ascii values for a d w s
    //right and left
    if(e.keyCode == 65) {
        plyrmv = 4;
    }
    else if(e.keyCode == 68) {
        plyrmv = 6;
    }
    //up and down
    else if(e.keyCode == 87) {
        plyrmv = 8;
    }
    else if(e.keyCode == 83) {
        plyrmv = 2;
    }
}

//event on key released
function keyUpHandler(e) {
    if(e.keyCode == 65) {
        plyrmv = 5;
    }
    else if(e.keyCode == 68) {
        plyrmv = 5;
    }
    else if(e.keyCode == 87) {
        plyrmv = 5;
    }
    else if(e.keyCode == 83) {
        plyrmv = 5;
    }
}

//draw player controllable object
function drawBall(insideColor = "rgb(0,100,150)") {
    ctx.beginPath();
    ctx.arc(x, y, insideRadius, 0, Math.PI*2);
    ctx.fillStyle = insideColor;
    ctx.stroke();
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = "rgb(0,0,0)";
    ctx.fill();
    ctx.closePath();
}

//draw game
function draw() {
    //clear frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();

    //player move
    switch (plyrmv) {
        case 4:
            dx -= 1;
            break;
        case 6:
            dx += 1;
            break;
        case 8:
            dy -= 1;
            break;
        case 2:
            dy += 1;
            break;
        default:
            dx = 0;
            dy = 0;
    }

    //restrict movements inside area
    if (x + dx > canvas.width-ballRadius || x + dx  < ballRadius) {
        drawBall("rgb(200,20,20)");
        dx = -dx;
    }
    else if (y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        drawBall("rgb(200,20,20)");
        dy = -dy;
    }

    //movement
    x += dx;
    y += dy;
}

//event listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//start drawing
setInterval(draw, 10);


