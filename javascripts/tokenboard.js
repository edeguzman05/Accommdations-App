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
        playSuccessSound();
    }
}


function playSuccessSound() {
    const audio = new Audio(customSound || "sounds/success.mp3");
    audio.play().catch(e => console.warn("Audio play failed:", e));
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

//Reset Button
function resetBoard() {
    document.querySelectorAll('.slot').forEach(slot => slot.innerHTML = "");
    document.getElementById('completion-message').textContent = "";
}

function createSticker(src, index) {
    const stickers = document.querySelector('.stickers');

    const wrapper = document.createElement("div");
    wrapper.classList.add("sticker-wrapper");
    wrapper.style.position = "relative";
    wrapper.style.display = "inline-block";

    const img = document.createElement("img");
    img.src = src;
    img.id = `sticker${index + 1}`;
    img.draggable = true;
    img.ondragstart = drag;

    const del = document.createElement("button");
    del.textContent = "❌";
    del.classList.add("delete-sticker-btn");
    del.style.position = "absolute";
    del.style.top = 0;
    del.style.right = 0;
    del.style.background = "rgba(0,0,0,0.5)";
    del.style.color = "white";
    del.style.border = "none";
    del.style.borderRadius = "50%"
    del.style.cursor = "pointer";


    del.addEventListener("click", () => {
        wrapper.remove();
        saveStickerstoStorage();
    });

    wrapper.appendChild(img);
    wrapper.appendChild(del);
    stickers.appendChild(wrapper);
}

function setupUploads() {
    // Sticker uploader
    const stickerUpload = document.getElementById('sticker-upload');
    stickerUpload.addEventListener('change', (event) => {
        const files = event.target.files;
        for (const file of files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                createSticker(e.target.result, Date.now());
                saveStickerstoStorage();
            };
            reader.readAsDataURL(file);
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setupUploads();
    loadStickersFromStorage();
});

function loadStickersFromStorage() {
    const saved = localStorage.getItem("customStickers");
    if (!saved) return;

    const stickerSRCS = JSON.parse(saved);
    stickerSRCS.forEach((src, i) => {
        createSticker(src, i);
    });

}

function saveStickerstoStorage() {
    const stickerImgs = document.querySelectorAll('.stickers img');
    const stickerSRCS = Array.from(stickerImgs).map(img => img.src);
    localStorage.setItem("customStickers", JSON.stringify(stickerSRCS));
}