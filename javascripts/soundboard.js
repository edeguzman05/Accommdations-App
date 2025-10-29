let customSound = null;
let availableSounds = {}

document.addEventListener("DOMContentLoaded", () => {
    const uploadInput = document.getElementById("sound-upload");
    const soundsButtonContainer = document.getElementById("sound-buttons");

    loadSoundsFromStorage();

    uploadInput.addEventListener("change", (event) => {
        const files = event.target.files;
        for (const file of files) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const soundSrc = e.target.result;
                createSoundButton(file.name, soundSrc);
                saveSoundToStorage(file.name, soundSrc);
                availableSounds[file.name] = soundSrc;
                updateRewardSounds();
            };
            reader.readAsDataURL(file);
        }
    });

    function createSoundButton(name, src) {
        const wrapper = document.createElement("div");
        wrapper.classList.add("sound-wrapper");

        const button = document.createElement("button");
        button.classList.add("sound-btn");
        button.textContent = name.replace(/\.[^/.]+$/, "");

        const del = document.createElement("button");
        del.textContent = "❌";
        del.classList.add("delete-sound-btn");

        const audio = new Audio(src);
        button.addEventListener("click", () => {
            audio.currentTime = 0;
            audio.play();
        });

        del.addEventListener("click", () => {
            wrapper.remove();
            removeSoundFromStorage(name);
        });

        wrapper.appendChild(button);
        wrapper.appendChild(del);
        soundsButtonContainer.appendChild(wrapper);
    }

    function saveSoundToStorage(name, src) {
        const saved = JSON.parse(localStorage.getItem("customSounds") || "[]");
        saved.push({ name, src });
        localStorage.setItem("customSounds", JSON.stringify(saved));
    }

    function removeSoundFromStorage(name) {
        const saved = JSON.parse(localStorage.getItem("customSounds") || "[]");
        const updated = saved.filter(sound => sound.name !== name);
        localStorage.setItem("customSounds", JSON.stringify(updated));

        delete availableSounds[name];

        updateRewardSounds();
    }

    function updateRewardSounds() {
        const select = document.getElementById("reward-sound-select");
        if (!select) return;

        select.innerHTML = '<option value="">None</option>';
        for (const name in availableSounds) {
            const opt = document.createElement("option");
            opt.value = name;
            opt.textContent = name.replace(/\.[^/.]+$/, "");
            select.appendChild(opt);
        }
    }

    function loadSoundsFromStorage() {
        const saved = JSON.parse(localStorage.getItem("customSounds") || "[]");
        saved.forEach(({ name, src }) => {
            createSoundButton(name, src);
            availableSounds[name] = src;
        });
        updateRewardSounds();
    }
});