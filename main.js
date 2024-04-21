function colorToText(mm) {
    let colorText = '#';
    let m1 = Math.floor(mm.r * 255 % 16);
    let m2 = Math.floor(mm.r * 255 / 16);
    if      (m1 == 10) { m1 = 'a'; }
    else if (m1 == 11) { m1 = 'b'; }
    else if (m1 == 12) { m1 = 'c'; }
    else if (m1 == 13) { m1 = 'd'; }
    else if (m1 == 14) { m1 = 'e'; }
    else if (m1 == 15) { m1 = 'f'; }
    if      (m2 == 10) { m2 = 'a'; }
    else if (m2 == 11) { m2 = 'b'; }
    else if (m2 == 12) { m2 = 'c'; }
    else if (m2 == 13) { m2 = 'd'; }
    else if (m2 == 14) { m2 = 'e'; }
    else if (m2 >= 15) { m2 = 'f'; }
    colorText += m2 + '' + m1;
    m1 = Math.floor(mm.g * 255 % 16);
    m2 = Math.floor(mm.g * 255 / 16);
    if      (m1 == 10) { m1 = 'a'; }
    else if (m1 == 11) { m1 = 'b'; }
    else if (m1 == 12) { m1 = 'c'; }
    else if (m1 == 13) { m1 = 'd'; }
    else if (m1 == 14) { m1 = 'e'; }
    else if (m1 == 15) { m1 = 'f'; }
    if      (m2 == 10) { m2 = 'a'; }
    else if (m2 == 11) { m2 = 'b'; }
    else if (m2 == 12) { m2 = 'c'; }
    else if (m2 == 13) { m2 = 'd'; }
    else if (m2 == 14) { m2 = 'e'; }
    else if (m2 >= 15) { m2 = 'f'; }
    colorText += m2 + '' + m1;
    m1 = Math.floor(mm.b * 255 % 16);
    m2 = Math.floor(mm.b * 255 / 16);
    if      (m1 == 10) { m1 = 'a'; }
    else if (m1 == 11) { m1 = 'b'; }
    else if (m1 == 12) { m1 = 'c'; }
    else if (m1 == 13) { m1 = 'd'; }
    else if (m1 == 14) { m1 = 'e'; }
    else if (m1 == 15) { m1 = 'f'; }
    if      (m2 == 10) { m2 = 'a'; }
    else if (m2 == 11) { m2 = 'b'; }
    else if (m2 == 12) { m2 = 'c'; }
    else if (m2 == 13) { m2 = 'd'; }
    else if (m2 == 14) { m2 = 'e'; }
    else if (m2 >= 15) { m2 = 'f'; }
    colorText += m2 + '' + m1;
    return colorText;
}  
function textToColorNumber(text) {

}
function paint(ctx, oldColorNumber, newX, newY) {
    if (newX < 0 || newX > MAX - 1 ||
        newY < 0 || newY > MAX - 1 ||
        colorNumber == oldColorNumber) {
        return;
    }
    if (data[undoRedo][newY][newX].m == oldColorNumber) {
        data[undoRedo][newY][newX].m = colorNumber;
        ctx.fillStyle = document.getElementById("color" + colorNumber).value;
        ctx.fillRect(
            newX * SIZE,
            newY * SIZE,
            SIZE,
            SIZE);
        data[undoRedo][newY][newX] = {x: newX, y: newY, m: colorNumber};
    } else {
        return;
    }

    paint(ctx, oldColorNumber, newX + 1, newY);
    paint(ctx, oldColorNumber, newX - 1, newY);
    paint(ctx, oldColorNumber, newX, newY + 1);
    paint(ctx, oldColorNumber, newX, newY - 1);
}


const MODE_PEN = 0;
const MODE_PAINT = 1;
const MODE_ERASE = 2;
var mode = MODE_PEN;
var colorNumber = 1;
var data = [];
var undoRedo = 0;
const MAX = 64;
const SIZE = 16;

window.onload = function() {
    const canvas = document.getElementById("canvas");
    canvas.width = 1024;//window.innerWidth;
    canvas.height = 1024;//window.innerHeight;
    const ctx = canvas.getContext("2d");



    const data2 = [];
    for (let y = 0; y < MAX; ++y) {
        const data1 = [];
        for (let x = 0; x < MAX; ++x) {
            //const color = {r: Math.random(), g: Math.random(), b: Math.random()};
            ctx.fillStyle = "#aaaaaa";
            ctx.fillRect(x * SIZE, y * SIZE, SIZE, SIZE);
            data1.push({x: x, y: y, m: 0});
        }
        data2.push(data1);
    }
    data.push(data2);

    const data3 = [];
    for (let y = 0; y < MAX; ++y) {
        const data1 = [];
        for (let x = 0; x < MAX; ++x) {
            data1.push({x: x, y: y, m: data[undoRedo][y][x].m});
        }
        data3.push(data1);
    }
    data.push(data3);
    undoRedo += 1;


    let isMouseDown = false;
    document.body.addEventListener("mousedown", (e) => {
        const x = Math.floor(e.clientX / SIZE);
        const y = Math.floor(e.clientY / SIZE);
        if (x >= 0 && x <= MAX &&
            y >= 0 && y <= MAX) {
            isMouseDown = true;
            if (mode == MODE_PAINT) {
                const oldColorNumber = data[undoRedo][y][x].m;
                let newX = x;
                let newY = y;
                paint(ctx, oldColorNumber, newX, newY);

                const data2 = [];
                for (let y = 0; y < MAX; ++y) {
                    const data1 = [];
                    for (let x = 0; x < MAX; ++x) {
                        data1.push({x: x, y: y, m: data[undoRedo][y][x].m});
                    }
                    data2.push(data1);
                }
                data.push(data2);


                undoRedo += 1;
            }
        }
    });
    document.body.addEventListener("mouseup", (e) => {
        const x = Math.floor(e.clientX / SIZE);
        const y = Math.floor(e.clientY / SIZE);
        if (x >= 0 && x <= MAX &&
            y >= 0 && y <= MAX) {


            if (isMouseDown) {
                if (mode == MODE_PEN) {

                    const data2 = [];
                    for (let y = 0; y < MAX; ++y) {
                        const data1 = [];
                        for (let x = 0; x < MAX; ++x) {
                            data1.push({x: x, y: y, m:  data[undoRedo][y][x].m});
                        }
                        data2.push(data1);
                    }
                    data.push(data2);
                    undoRedo += 1;
                } else if (mode == MODE_ERASE) {
                    const data2 = [];
                    for (let y = 0; y < MAX; ++y) {
                        const data1 = [];
                        for (let x = 0; x < MAX; ++x) {
                            data1.push({x: x, y: y, m: 0});
                        }
                        data2.push(data1);
                    }
                    data.push(data2);
                    undoRedo += 1;
                }
            }
            isMouseDown = false;
        }
    });

    document.body.addEventListener("mousemove", (e) => {
        if (isMouseDown) {
            if (mode == MODE_PEN) {
//            const color = {r: Math.random(), g: Math.random(), b: Math.random()};
                ctx.fillStyle = document.getElementById("color" + colorNumber).value;//"green";//colorToText(color);
                const x = Math.floor(e.clientX / SIZE);
                const y = Math.floor(e.clientY / SIZE);
                ctx.fillRect(
                    x * SIZE,
                    y * SIZE,
                    SIZE,
                    SIZE);
                data[undoRedo][y][x] = {x: x, y: y, m: colorNumber};
            } else if (mode == MODE_ERASE) {
                ctx.fillStyle = "#aaaaaa";//"green";//colorToText(color);
                const x = Math.floor(e.clientX / SIZE);
                const y = Math.floor(e.clientY / SIZE);
                ctx.fillRect(
                    x * SIZE,
                    y * SIZE,
                    SIZE,
                    SIZE);
                data[undoRedo][y][x] = {x: x, y: y, m: 0};
            }
        }
    });

    document.getElementById("color1").style.background = "red";
    document.getElementById("pen").style.background = "blue";

    for (let i = 9; i <= 16; i++) {
        document.getElementById("color" + i).value = colorToText({r: Math.random(), g: Math.random(), b: Math.random()});
    }
    for (let i = 1; i <= 16; i++) {
        document.getElementById("color" + i).addEventListener("click", (e) => {
            colorNumber = i;
            for (let j = 1; j <= 16; j++) {
                document.getElementById("color" + j).style.background = "white";
            }
            document.getElementById("color" + i).style.background = "red";
        });        
    }
    document.getElementById("pen").addEventListener("click", (e) => {
        mode = MODE_PEN;
        document.getElementById("paint").style.background = "white";
        document.getElementById("erase").style.background = "white";
        document.getElementById("pen").style.background = "blue";
    });
    document.getElementById("paint").addEventListener("click", (e) => {
        mode = MODE_PAINT;
        document.getElementById("pen").style.background = "white";
        document.getElementById("erase").style.background = "white";
        document.getElementById("paint").style.background = "blue";
    });
    document.getElementById("erase").addEventListener("click", (e) => {
        mode = MODE_ERASE;
        document.getElementById("pen").style.background = "white";
        document.getElementById("paint").style.background = "white";
        document.getElementById("erase").style.background = "blue";
    });
    document.getElementById("undo").addEventListener("click", (e) => {
        if (undoRedo > 0) {
            const colorArray = [];
            for (let i = 0; i <= 16; i++) {
                colorArray.push(document.getElementById("color" + i).value);
            }
            undoRedo -= 1;
            for (let y = 0; y < MAX; ++y) {
                for (let x = 0; x < MAX; ++x) {
                    ctx.fillStyle = colorArray[data[undoRedo][y][x].m];
                    ctx.fillRect(x * SIZE, y * SIZE, SIZE, SIZE);
                }
            }
        }    
    });
    document.getElementById("redo").addEventListener("click", (e) => {
        if (undoRedo < data.length - 1) {
            const colorArray = [];
            for (let i = 0; i <= 16; i++) {
                colorArray.push(document.getElementById("color" + i).value);
            }    
            undoRedo += 1;        
            for (let y = 0; y < MAX; ++y) {
                for (let x = 0; x < MAX; ++x) {
                    ctx.fillStyle = colorArray[data[undoRedo][y][x].m];
                    ctx.fillRect(x * SIZE, y * SIZE, SIZE, SIZE);
                }
            }    
        }
    });

}