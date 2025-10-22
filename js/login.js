let users = [];

const loginSection = document.getElementById('loginSection');
const signupSection = document.getElementById('signupSection');
const dashboard = document.getElementById('dashboard');
const showSignupBtn = document.getElementById('showSignup');
const showLoginBtn = document.getElementById('showLogin');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const logoutBtn = document.getElementById('logoutBtn');

showSignupBtn.addEventListener('click', () => {
    loginSection.style.display = 'none';
    signupSection.style.display = 'block';
    clearErrors();
});

showLoginBtn.addEventListener('click', () => {
    signupSection.style.display = 'none';
    loginSection.style.display = 'block';
    clearErrors();
});

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(el => {
        el.classList.remove('show');
        el.textContent = '';
    });
    document.querySelectorAll('input').forEach(input => {
        input.classList.remove('error');
    });
    document.querySelectorAll('.success-message').forEach(el => {
        el.classList.remove('show');
    });
}

function showError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    input.classList.add('error');
    error.textContent = message;
    error.classList.add('show');
}

const newPasswordInput = document.getElementById('newPassword');
const passwordStrength = document.getElementById('passwordStrength');
const passwordStrengthBar = document.getElementById('passwordStrengthBar');

newPasswordInput.addEventListener('input', (e) => {
    const password = e.target.value;
    if (password.length === 0) {
        passwordStrength.classList.remove('show');
        return;
    }

    passwordStrength.classList.add('show');
    let strength = 0;

    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    passwordStrengthBar.className = 'login-modal__strength-bar';

    if (strength <= 2) {
        passwordStrengthBar.classList.add('strength-weak');
    } else if (strength <= 4) {
        passwordStrengthBar.classList.add('strength-medium');
    } else {
        passwordStrengthBar.classList.add('strength-strong');
    }
});

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    const username = document.getElementById('newUsername').value.trim();
    const email = document.getElementById('newEmail').value.trim();
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    let hasError = false;

    if (username.length < 3) {
        showError('newUsername', 'newUsernameError', 'Tên đăng nhập phải có ít nhất 3 ký tự');
        hasError = true;
    } else if (users.some(user => user.username.toLowerCase() === username.toLowerCase())) {
        showError('newUsername', 'newUsernameError', 'Tên đăng nhập đã tồn tại');
        hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('newEmail', 'newEmailError', 'Email không hợp lệ');
        hasError = true;
    } else if (users.some(user => user.email.toLowerCase() === email.toLowerCase())) {
        showError('newEmail', 'newEmailError', 'Email đã được sử dụng');
        hasError = true;
    }

    if (password.length < 6) {
        showError('newPassword', 'newPasswordError', 'Mật khẩu phải có ít nhất 6 ký tự');
        hasError = true;
    }

    if (password !== confirmPassword) {
        showError('confirmPassword', 'confirmPasswordError', 'Mật khẩu xác nhận không khớp');
        hasError = true;
    }

    if (hasError) return;

    const newUser = {
        username: username,
        email: email,
        password: password,
        registeredDate: new Date().toLocaleDateString('vi-VN')
    };
    users.push(newUser);

    const successMsg = document.getElementById('signupSuccess');
    successMsg.textContent = '✅ Đăng ký thành công! Chuyển đến trang đăng nhập...';
    successMsg.classList.add('show');

    signupForm.reset();
    passwordStrength.classList.remove('show');

    setTimeout(() => {
        signupSection.style.display = 'none';
        loginSection.style.display = 'block';
        successMsg.classList.remove('show');
                
        document.getElementById('username').value = username;
    }, 2000);
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    const usernameOrEmail = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    const user = users.find(u => (u.username.toLowerCase() === usernameOrEmail.toLowerCase() || u.email.toLowerCase() === usernameOrEmail.toLowerCase()) &&u.password === password);

    if (!user) {
        showError('username', 'usernameError', 'Tên đăng nhập hoặc mật khẩu không đúng');
        showError('password', 'passwordError', ' ');
        return;
    }

    showSuccessModal(user.username);

    loginForm.reset();
});

logoutBtn.addEventListener('click', () => {
    dashboard.style.display = 'none';
    loginSection.style.display = 'block';
    clearErrors();
});

users.push({
    username: 'admin',
    email: 'admin@storet.com',
    password: '123456',
    registeredDate: new Date().toLocaleDateString('vi-VN')
});

console.log('Tài khoản demo: username: admin | email: admin@storet.com | password: 123456');

function showSuccessModal(username) {
    const modal = document.getElementById('successModal');
    const modalUsername = document.getElementById('modalUsername');
    const continueBtn = document.getElementById('continueBtn');
            
    modalUsername.textContent = username;
    modal.classList.add('show');

    const redirectTimer = setTimeout(() => {
        redirectToIndex();
    }, 3000);

    continueBtn.onclick = () => {
        clearTimeout(redirectTimer);
        redirectToIndex();
    };
}


function redirectToIndex() {
    loginSection.style.display = 'none';
    signupSection.style.display = 'none';
    dashboard.style.display = 'block';
}


const loginModal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');

function openLoginModal() {
  loginModal.style.display = 'flex';
}

closeModal.onclick = () => loginModal.style.display = 'none';
window.onclick = (e) => { if (e.target === loginModal) loginModal.style.display = 'none'; };
