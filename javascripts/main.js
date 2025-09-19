const tabs = document.querySelectorAll('[data-tab]')
const tabContents = document.querySelectorAll('.tab-content')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'))
            // Add active class to clicked tab
        tab.classList.add('active')

        // Remove active class from all content divs
        tabContents.forEach(tc => tc.classList.remove('active'))

        // Add active class to target content div
        const target = document.querySelector(tab.dataset.tabValue)
        target.classList.add('active')
    })
})