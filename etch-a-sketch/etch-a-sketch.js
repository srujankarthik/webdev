// select the elements on the page - canvas, shake button

const canvas = document.getElementById('etch-a-sketch');
const ctx = canvas.getContext('2d');
const shakebutton = document.querySelector('.shake');
const MOVE_AMOUNT = 10;

// canvas for drawing

// destructuring ( canvas.width, canvas.height ) 
const {width, height} = canvas;
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);
// create a random x and y value on canvas

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;

let hue = 0;

ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
ctx.beginPath(); // start
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

// draw fn
function draw({key}) {
    hue += 1;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
    console.log(key);
    ctx.beginPath();
    ctx.moveTo(x, y);
    // move x, y depending on user
    switch (key) {
        case 'ArrowUp' :
            y -= MOVE_AMOUNT;
            break;
        case 'ArrowRight' :
            x += MOVE_AMOUNT;
            break;
        case 'ArrowDown' :
            y += MOVE_AMOUNT;
            break;
        case 'ArrowLeft' :
            x -= MOVE_AMOUNT;
            break;
        default : 
            break;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
}

// key handler
function keyHandler(e) {
    if (e.key.includes('Arrow')) {
        e.preventDefault();
        draw({ key: e.key})
    }
}

// clear button fn
function clearCanvas() {
    canvas.classList.add('shake');
    ctx.clearRect(0, 0, width, height);
    canvas.addEventListener('animationend', function () {
        canvas.classList.remove('shake')
    }, {once : true})
}

// event listener
window.addEventListener('keydown', keyHandler);
shakebutton.addEventListener('click', clearCanvas);