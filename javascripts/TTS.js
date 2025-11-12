const ttsText = document.getElementById("ttsText");
const speakButton = document.getElementById("speakButton");
const stopButton = document.getElementById("stopButton");
const voiceSelect = document.getElementById("voiceSelect");

let voices = [];

function populateVoices() {
    voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = "";

    voices.forEach((voice, i) => {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

populateVoices();

speechSynthesis.onvoiceschanged = populateVoices;

function speakText() {
    const text = ttsText.value.trim();
    if (!text) return;

    const utter = new SpeechSynthesisUtterance(text);
    const selectedVoice = voices[voiceSelect.value];
    if (selectedVoice) utter.voice = selectedVoice;

    speechSynthesis.cancel();
    speechSynthesis.speak(utter);
}

function stopText() {
    speechSynthesis.cancel();
}

speakButton.addEventListener("click", speakText);
stopButton.addEventListener("click", stopText);