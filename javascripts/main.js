function loadTab(event, tabId) {
    // Hide all sections
    document.querySelectorAll('.tab-content').forEach(section => {
        section.classList.remove('active');
    });

    // Show the one that matches the button pressed
    const target = document.getElementById(tabId);
    if (target) {
        target.classList.add('active');
    }

    document.querySelectorAll('.sidebar button').forEach(btn => {
        btn.classList.remove('active');
    });

    event.currentTarget.classList.add('active');
}

let currentSticker = null;

// Set reward text
function setReward() {
    const rewardInput = document.getElementById("reward-input").value;
    document.getElementById("reward-text").textContent = rewardInput || "________";
    document.getElementById("completion-message").textContent = "";
}

function allowDrop(event) {
    event.preventDefault();
    event.currentTarget.classList.add("drag-over");
}

function drag(event) {
    event.dataTransfer.setData("stickerId", event.target.id);
}

function drop(event) {
    event.preventDefault();
    let stickerId = event.dataTransfer.getData("stickerId");
    let sticker = document.getElementById(stickerId).cloneNode(true);
    sticker.removeAttribute("id");

    sticker.addEventListener("click", () => {
        sticker.parentNode.innerHTML = "";
        document.getElementById("completion-message").textContent = "";
    });

    let slot = event.currentTarget;
    slot.innerHTML = "";
    slot.appendChild(sticker);
    slot.classList.remove("drag-over")

    checkCompletion();
}

function checkCompletion() {
    const slots = document.querySelectorAll('.slot');
    let allFilled = true;

    slots.forEach(slot => {
        if (slot.children.length === 0) {
            allFilled = false;
        }
    });

    if (allFilled) {
        const reward = document.getElementById("reward-text").textContent || "your reward";
        //alert(`Congratulations! You earned: ${reward}`); <- Alerts through a web notification like errors
        showCompletionMessage(`Congratulations! You earned: ${reward}`);
    }
}

function showCompletionMessage(text) {
    const messageEl = document.getElementById("completion-message");
    messageEl.innerHTML = ""; // clear previous message

    // Wrap each character in a span
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement("span");
        span.textContent = text[i];
        span.style.animationDelay = `${i * 0.1}s`; // stagger each letter
        messageEl.appendChild(span);
    }
}

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
    console.log(currentColor +', '+ backgroundColor);
    const hexColor = e.target.value;
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const rgbaColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
    tempColor = rgbaColor;
    currentColor = penType? rgbaColor: backgroundColor;
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