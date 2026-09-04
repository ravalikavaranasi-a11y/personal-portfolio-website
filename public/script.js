// Dynamic interactivity for portfolio page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');

    // Interactive button demo
    const contactBtn = document.getElementById('contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', () => {
            alert('Thank you for reaching out! I will get back to you soon.');
        });
    }
});
