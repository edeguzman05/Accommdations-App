/* White Board Content */

const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// Set canvas full screen
function resizeCanvas() {
    canvas.width = window.innerWidth - canvas.offsetLeft;
    canvas.height = window.innerHeight - canvas.offsetTop;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Drawing settings
let backgroundColor = 'rgba(255,255,255,1)'; // will need to be changed later on to accomodate for settings
let tempColor = 'rgba(0,0,0,1)';
let drawing = false;
let currentColor = document.getElementById('colorPicker').value;
let currentLineWidth = 3;
let opacity = 1;
let penType = true;

// Press down on canvas
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
});

// Move brush around
canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;
    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = currentLineWidth;
    ctx.lineCap = 'round';
    ctx.stroke();
});

// Lift brush off of canvas
canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.closePath();
});

// Brush goes off of canvas
canvas.addEventListener('mouseleave', () => {
    drawing = false;
    ctx.closePath();
});

// Handle color change
document.getElementById('colorPicker').addEventListener('input', (e) => {
    console.log(currentColor + ', ' + backgroundColor);
    const hexColor = e.target.value;
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const rgbaColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
    tempColor = rgbaColor;
    currentColor = penType ? rgbaColor : backgroundColor;
});

// Change pen size
document.getElementById('penSize').addEventListener('input', (e) => {
    currentLineWidth = e.target.value;
});

// Option for Regular Pen Mode & change color to match
document.getElementById('pen').addEventListener('click', () => {
    penType = true;
    currentColor = tempColor;
});

// Option for Eraser Mode & change color to match
document.getElementById('eraser').addEventListener('click', () => {
    penType = false;
    currentColor = backgroundColor;
});

// Handle opacity change
document.getElementById('opacity').addEventListener('click', (e) => {
    opacity = e.target.value;
    ctx.globalAlpha = opacity;
});

// Clear canvas
document.getElementById('clearBtn').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});