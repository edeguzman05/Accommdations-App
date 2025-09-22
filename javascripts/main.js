function loadTab(tabId) {
    // Hide all sections
    document.querySelectorAll('.tab-content').forEach(section => {
        section.classList.remove('active');
    });

    // Show the one that matches the button pressed
    document.getElementById(tabId).classList.add('active');

    document.querySelectorAll('.sidebar button').forEach(btn => {
        btn.classList.remove('active');
    });

    document.target.classList.add('active');
}