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