const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const nameInput = document.getElementById('name-input');
const passwordInput = document.getElementById('password-input');

const navbar = document.getElementById('navbar');
const banner = document.getElementById('banner');
const learnSection = document.getElementById('learn-section');
const faqSection = document.getElementById('faq-section');
const wordShowContainer = document.getElementById('word_show_container');

loginBtn.addEventListener('click', function () {
    const name = nameInput.value.trim();
    const password = passwordInput.value.trim();

    // validate name
    if (!name) {
        Swal.fire({
            icon: 'warning',
            title: 'Warning',
            text: 'Please enter your name'
        });
        return;
    }

    // validate password
    if (password !== '123456') {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Incorrect password. Please enter 123456'
        });
        return;
    }

    // successful login
    Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Login successful! Welcome, ' + name
    });

    // hide banner and show other sections
    banner.style.display = 'none';
    navbar.style.display = 'block';
    learnSection.style.display = 'block';
    faqSection.style.display = 'block';
    wordShowContainer.style.display = 'block';
});

logoutBtn.addEventListener('click', function () {

    navbar.style.display = 'none';
    learnSection.style.display = 'none';
    faqSection.style.display = 'none';
    wordShowContainer.style.display = 'none';

    // show banner
    banner.style.display = 'block';

    // clear inputs
    nameInput.value = '';
    passwordInput.value = '';

    Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Logged out successfully'
    });
});