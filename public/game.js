var ctx, startX, startY, interval, moveScalar = 1;
var relX = 0, relY = 0;
var scrollStart, scrollScalar = 1;
var leftDown, rightDown, scrolling;
var toDraw = [];
var outpost_width = 50;
var outpost_height = 50;
var totalWidth, totalHeight;

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


//TODO: replace 1200 with a expression for the total size of the system ***COMPLETE***
//      create all the Y axis versions of these statements.

function getAvgWidth(array) {
    var maxX = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i].x > maxX) {
            maxX = array[i].x;
        }
    }
    var avgDist = maxX / (array.length - 1);
    return maxX + avgDist;
}
function getAvgHeight(array) {
    var maxY = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i].y > maxY) {
            maxY = array[i].y;
        }
    }
    var avgDist = maxY / (array.length - 1);
    return maxY + avgDist;
}


function getAvgHeightAndWidth(array) {
    // Assuming grid like distribution I guess
    var distances = [];
    for (var i = 0; i < array.length; i++) {
        for (var j = i + 1; j < array.length; j++) {
            distances.push((Math.sqrt((array[i].x - array[j].x)*(array[i].x - array[j].x) + (array[i].y - array[j].y)*(array[i].y - array[j].y))))
        }
    }
    var temp = 0;
    for (var i = 0; i < distances.length; i++) {
        temp += distances[i];
    }
    //temp /= distances.length;
    //temp /= array.length
    return temp;
}


function draw() {
    totalWidth = getAvgWidth(toDraw);
    totalHeight = getAvgHeight(toDraw);
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (var i = 0; i < toDraw.length; i++) {
        var X = toDraw[i].x + relX;
        if (relX < 0) {
            while (X < 0) {
                X += totalWidth;
            }
        } else if (relX > 0) {
            while (X > canvas.width) {
                X -= totalWidth;
            }
        }
        var Y = toDraw[i].y + relY;
        if (relY < 0) {
            while (Y < 0) {
                Y += totalHeight;
            }
        }
        if (relY > 0) {
            while (Y < 0) {
                Y -= totalHeight;
            }
        }
        ctx.fillStyle = toDraw[i].color;
        ctx.fillRect(X, Y, outpost_width, outpost_height)
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
    for (var i = 0; i < 8; i++) {
        toDraw.push({ x: i * 200, y: 300, w: outpost_width, h: outpost_height, color: "#" + (i) + "00000" })
    }
}


function buildGrid() {
    toDraw = [];
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++)
            toDraw.push({ x: i * 200, y: j * 200, w: outpost_width, h: outpost_height, color: "#" + (i) + "0" + j + "000" })
    }
}


  