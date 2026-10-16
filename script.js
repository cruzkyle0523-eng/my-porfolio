document.addEventListener('DOMContentLoaded', () => {
    // Menu tab switching logic
    const menuItems = document.querySelectorAll('.menu-item');
    const contentPanels = document.querySelectorAll('.content-panel');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-target');

            menuItems.forEach(btn => btn.classList.remove('active'));
            item.classList.add('active');

            contentPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetId) {
                    panel.classList.add('active');
                }
            });
        });
    });

    // Dark Mode / Color Mode Toggle logic
    const modeToggle = document.getElementById('modeToggle');
    if (modeToggle) {
        modeToggle.addEventListener('click', () => {
            document.body.classList.toggle('color-mode');
            
            // Switch button text dynamically
            if (document.body.classList.contains('color-mode')) {
                modeToggle.textContent = 'Dark Mode';
            } else {
                modeToggle.textContent = 'Color Mode';
            }
        });
    }
});