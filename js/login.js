let users = JSON.parse(localStorage.getItem('users')) || [];

if (!users.some(u => u.username === 'admin')) {
    users.push({
        username: 'admin',
        email: 'admin@storet.com',
        password: '123456',
        registeredDate: new Date().toLocaleDateString('vi-VN')
    });
    localStorage.setItem('users', JSON.stringify(users));
}

const loginSection = document.getElementById('loginSection');
const signupSection = document.getElementById('signupSection');
const showSignupBtn = document.getElementById('showSignup');
const showLoginBtn = document.getElementById('showLogin');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

const newPasswordInput = document.getElementById('newPassword');
const passwordStrengthBar = document.getElementById('passwordStrengthBar');

const loginModal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');

showSignupBtn.addEventListener('click', () => {
    loginSection.classList.remove('login-modal__section--active');
    signupSection.classList.add('login-modal__section--active');
});

showLoginBtn.addEventListener('click', () => {
    signupSection.classList.remove('login-modal__section--active');
    loginSection.classList.add('login-modal__section--active');
});

closeModal.onclick = () => loginModal.style.display = 'none';
window.onclick = (e) => { if (e.target === loginModal) loginModal.style.display = 'none'; };

function openLoginModal() {
    loginModal.style.display = 'flex';
}

newPasswordInput.addEventListener('input', e => {
    const password = e.target.value;
    if (!password) {
        passwordStrengthBar.style.width = '0%';
        passwordStrengthBar.style.backgroundColor = '#ccc';
        return;
    }

    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    let width = (strength / 5) * 100 + '%';
    passwordStrengthBar.style.width = width;

    if (strength <= 2) passwordStrengthBar.style.backgroundColor = 'red';
    else if (strength <= 4) passwordStrengthBar.style.backgroundColor = 'orange';
    else passwordStrengthBar.style.backgroundColor = 'green';
});

signupForm.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors();

    const username = document.getElementById('newUsername').value.trim();
    const email = document.getElementById('newEmail').value.trim();
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    let hasError = false;

    if (username.length < 3) { showError('newUsername', 'newUsernameError', 'Tên đăng nhập ≥3 ký tự'); hasError = true; }
    else if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) { showError('newUsername', 'newUsernameError', 'Tên đăng nhập đã tồn tại'); hasError = true; }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) { showError('newEmail', 'newEmailError', 'Email không hợp lệ'); hasError = true; }
    else if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) { showError('newEmail', 'newEmailError', 'Email đã được sử dụng'); hasError = true; }

    if (password.length < 6) { showError('newPassword', 'newPasswordError', 'Mật khẩu ≥6 ký tự'); hasError = true; }
    if (password !== confirmPassword) { showError('confirmPassword', 'confirmPasswordError', 'Mật khẩu xác nhận không khớp'); hasError = true; }

    if (hasError) return;

    const newUser = { username, email, password, registeredDate: new Date().toLocaleDateString('vi-VN') };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    document.getElementById('signupSuccess').textContent = '✅ Đăng ký thành công!';
    signupForm.reset();
    passwordStrengthBar.style.width = '0%';

    setTimeout(() => {
        signupSection.classList.remove('login-modal__section--active');
        loginSection.classList.add('login-modal__section--active');
        document.getElementById('username').value = username;
        document.getElementById('signupSuccess').textContent = '';
    }, 1000);
});

loginForm.addEventListener('submit', e => {
    e.preventDefault();
    clearErrors();

    const usernameOrEmail = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    const user = users.find(u =>
        (u.username.toLowerCase() === usernameOrEmail.toLowerCase() ||
         u.email.toLowerCase() === usernameOrEmail.toLowerCase()) &&
        u.password === password
    );

    if (!user) {
        showError('username', 'usernameError', 'Tên đăng nhập hoặc mật khẩu không đúng');
        showError('password', 'passwordError', ' ');
        return;
    }

    window.location.href = 'index.html';
});

function showError(inputId, errorId, message) {
    document.getElementById(inputId).classList.add('error');
    const errorEl = document.getElementById(errorId);
    errorEl.textContent = message;
    errorEl.classList.add('show');
}

function clearErrors() {
    document.querySelectorAll('.login-modal__error').forEach(el => { el.textContent = ''; el.classList.remove('show'); });
    document.querySelectorAll('input').forEach(inp => inp.classList.remove('error'));
}
