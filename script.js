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
            publicKey: 'YOUR_PUBLIC_KEY_HERE'
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

            const formData = new FormData(postcardForm);
            const name = String(formData.get('name') || '').trim();
            const email = String(formData.get('email') || '').trim();
            const message = String(formData.get('message') || '').trim();

            try {
                if (!window.emailjs) {
                    throw new Error('EmailJS is not loaded.');
                }

                await emailjs.send(
                    'service_xxxxxxxx',
                    'template_xxxxxxxx',
                    {
                        from_name: name,
                        from_email: email,
                        message: message,
                        recipient_email: 'cruzkyle.0523@gmail.com'
                    }
                );

                postcardForm.reset();
                closeContactModal();
                alert('Thank you! Your postcard has been sent.');
            } catch (error) {
                console.error('Postcard send error:', error);
                alert('Failed to send your postcard. Please check your email service configuration.');
            } finally {
                if (submitBtn) {
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                }
            }
        });
    }
});
