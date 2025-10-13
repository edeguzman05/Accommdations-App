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
