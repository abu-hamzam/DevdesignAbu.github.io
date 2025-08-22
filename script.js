// Modal functions (for portfolio page)
function openModal(title, desc, imgSrc) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-desc').textContent = desc;
    document.getElementById('modal-img').src = imgSrc;
    document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}

// Basic form validation (for contact page)
if (document.getElementById('contact-form')) {
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        const name = document.querySelector('input[name="name"]');
        const email = document.querySelector('input[name="email"]');
        if (!name.value || !email.value) {
            e.preventDefault();
            alert('Please fill in all required fields.');
        }
    });
}
