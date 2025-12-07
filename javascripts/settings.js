//debug color
function setColor(property, color) {
    document.documentElement.style.setProperty(property, color);
}

//debug ui scale
function setUiScale(property, value) {
    const scale = Math.max(0.5, Math.min(value, 3));
    document.documentElement.style.setProperty(property, scale.toString());
}

// Apply the Settings Selected
document.addEventListener("DOMContentLoaded", () => {
    const uiSlider = document.getElementById("ui-scale-slider-s");
    const tabSlider = document.getElementById("sidebar-scale-slider-s");
    const fontColor = document.getElementById("fontColor-s");
    const bgColor = document.getElementById("backgroundColor-s");
    const sbColor = document.getElementById("sidebarColor-s");
    const sbBtnColor = document.getElementById("sidebarButtonColor-s");
    const sbBtnCorrectColor = document.getElementById("sidebarButtonCorrectColor-s");
    const sbBtnFontColor = document.getElementById("sidebarButtonFontColor-s");
    tabSlider.addEventListener("input", e => console.log("Moved!", e.target.value));

    if (uiSlider) {
        uiSlider.addEventListener("input", () => {
            console.log("Slider value:", uiSlider.value);
            setUiScale("--ui-scale", uiSlider.value);
        });
    }
    if (tabSlider) {
        tabSlider.addEventListener("input", () => {
            console.log("Slider value:", tabSlider.value);
            setUiScale("--sidebar-scale", tabSlider.value);
        });
    }
    if (fontColor) {
        fontColor.addEventListener("input", () => {
            setColor("--fontColor", fontColor.value);
        });
    }
    if (bgColor) {
        bgColor.addEventListener("input", () => {
            setColor("--backgroundColor", bgColor.value);
        });
    }
    if (sbColor) {
        sbColor.addEventListener("input", () => {
            setColor("--sidebarColor", sbColor.value);
        });
    }
    if (sbBtnFontColor) {
        sbBtnFontColor.addEventListener("input", () => {
            setColor("--sidebarButtonFontColor", sbBtnFontColor.value);
        });
    }
    if (sbBtnCorrectColor) {
        sbBtnCorrectColor.addEventListener("input", () => {
            setColor("--sidebarButtonCorrectColor", sbBtnCorrectColor.value);
        });
    }
    if (sbBtnColor) {
        sbBtnColor.addEventListener("input", () => {
            setColor("--sidebarButtonColor", sbBtnColor.value);

        });
    }
});

// function setFontColor(color) {
//   document.documentElement.style.setProperty("--ui-font-color", color);
// }

// // Optional: hook to a color input element
// document.addEventListener("DOMContentLoaded", () => {
//   const picker = document.getElementById("ui-font-color-picker");
//   if (picker) {
//     picker.addEventListener("input", () => {
//       setFontColor(picker.value);
//     });
//   }
// });