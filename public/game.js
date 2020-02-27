var ctx, startX, startY, interval, moveScalar = 1;
var relX = 0, relY = 0;
var scrollStart, scrollScalar = 1;
var leftDown, rightDown, scrolling;
var toDraw = [];
var outpost_width = 50;
var outpost_height = 50;


function init() {
    buildOutposts(toDraw, 3);
    ctx = canvas.getContext('2d')
    document.addEventListener('mouseup', (e) => {
        if (e.button == 0) {
            leftDown = false;
        }
        if (e.button == 2) {
            rightDown = false;
        }
    })
    canvas.addEventListener('mousedown', (e) => {
        if (e.button == 0) {
            leftDown = true;
            startX = e.x;
            startY = e.y;
        }
        if (e.button == 2) {
            rightDown = true;
        }
    });
    document.addEventListener('mousemove', (e) => {
        if (leftDown) {
            relX -= startX - e.x
            startX = e.x;
            relY -= startY - e.y;
            startY = e.y
        }
        if (rightDown) {

        }
    })
    document.addEventListener('contextmenu', (event) => {
        event.preventDefault()
    })
    //This only works for a trackpad interestingly enough
    //Building support for regular mouse too.
    window.addEventListener("wheel", (e) => {
        e.preventDefault();
        if (Math.abs(e.deltaY) > 1) {
            scrolling = true;
        } else {
            scrolling = false;
        }
        relX += e.deltaX;
        relY += e.deltaY;
    }, { passive: false })
    draw()
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (var i = 0; i < toDraw.length; i++) {
        ctx.fillStyle = toDraw[i].color


        //???????????????????????????????????
        // var xDraw = toDraw[i].x, yDraw = toDraw[i].y;
        // if (relX >= 0) {
        //     xDraw = (xDraw + relX) % canvas.width;
        // } else {
        //     xDraw = (xDraw + relX) % canvas.width + canvas.width;
        // }
        // if (relY >= 0) {
        //     yDraw = (yDraw + relY) % canvas.height;
        // } else {
        //     yDraw = (yDraw + relY) % canvas.height + canvas.height;
        // }
        // ctx.fillRect((xDraw) % canvas.width - outpost_width, yDraw % canvas.height - outpost_height, toDraw[i].w, toDraw[i].h);
        //???????????????????????????????????


        //This is almost right, just gotta make it so the entire length of the x 
        //(ie the gaps between the outposts plus the buffer) is wrapping but not displaying all the way.  
        var X = toDraw[i].x + relX % (canvas.width - 50)

        if (X < 0) {
            X += canvas.width - 50;
        }





        var Y = toDraw[i].y//+relY;
        ctx.fillRect(X % (canvas.width - 50), Y, outpost_width, outpost_height)

    }
    window.requestAnimationFrame(draw)
}




function buildOutposts(array, numbOfPlayers) {
    for (var i = 0; i < numbOfPlayers * 2; i++) {
        for (var j = 0; j < numbOfPlayers * 3; j++) {
            temp = "#" + (i) + "00000"
            array.push({ x: i * 200 + (Math.random() * 250 / 3), y: j * 200 + (Math.random() * 250 / 3), w: 50, h: 50, color: temp })
        }
    }
}

function buildLine() {
    toDraw = [];
    for (var i = 0; i < 4; i++) {
        toDraw.push({ x: i * 200, y: 300, w: outpost_width, h: outpost_height, color: "#" + (2 * i) + "00000" })

    }
}
//Later change it to use theta plus a radius ie polar coordinates



/*
//Not Working
function fixOutposts(array) {
    for (var i = 0; i < array.length; i++) {
        for (var j = i + 1; j < array.length; j++) {
            if (distance(array[i].x, array[j].x, array[i].y, array[j].y) < 100000 || distance(array[i].x, array[j].x, array[i].y, array[j].y) > 200) {
                array.splice(j, 1);
            }
        }
    }
}
function distance(x1, x2, y1, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}
*/

