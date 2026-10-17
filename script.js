const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY_HERE';
const EMAILJS_SERVICE_ID = 'service_xxxxxxxx';
const EMAILJS_TEMPLATE_ID = 'template_xxxxxxxx';

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

            if (document.body.classList.contains('color-mode')) {
                modeToggle.textContent = 'Dark Mode';
            } else {
                modeToggle.textContent = 'Brighter Mode';
            }
        });
    }

    // --- POSTCARD MODAL LOGIC ---
    const contactModal = document.getElementById('contactModal');
    const gmailNavBtn = document.getElementById('gmailNavBtn');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const postcardForm = document.getElementById('postcardForm');

    const openContactModal = () => {
        if (contactModal) {
            contactModal.classList.add('active');
        }
    };

    const closeContactModal = () => {
        if (contactModal) {
            contactModal.classList.remove('active');
        }
    };

    if (gmailNavBtn) {
        gmailNavBtn.addEventListener('click', openContactModal);
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeContactModal);
    }

    if (contactModal) {
        contactModal.addEventListener('click', (e) => {
            if (e.target.id === 'contactModal') {
                closeContactModal();
            }
        });
    }

    if (window.emailjs) {
        emailjs.init({
            publicKey: EMAILJS_PUBLIC_KEY
        });
    }

    if (postcardForm) {
        postcardForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = postcardForm.querySelector('.postcard-btn');
            const originalBtnText = submitBtn ? submitBtn.textContent : 'POST IT';

            if (submitBtn) {
                submitBtn.textContent = 'SENDING...';
                submitBtn.disabled = true;
            }

            try {
                if (!window.emailjs) {
                    throw new Error('EmailJS is not loaded.');
                }

                await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, postcardForm, {
                    publicKey: EMAILJS_PUBLIC_KEY
                });

                postcardForm.reset();
                closeContactModal();
                alert('Thank you! Your postcard has been sent.');
            } catch (error) {
                console.error('Postcard send error:', error);
                alert('Failed to send your postcard. Please check your EmailJS configuration.');
            } finally {
                if (submitBtn) {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }
            }
        });
    }
});
