function showRegisterForm() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
}

function showLoginForm() {
    document.getElementById("register-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
}

function register(event) {
    event.preventDefault();
    const fullName = document.getElementById('full-name').value;
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    
    // Save user data to localStorage
    const userData = {
        fullName,
        username,
        password
    };
    localStorage.setItem(username, JSON.stringify(userData));
    alert('Registration successful! You can now log in.');
    showLoginForm();
}

function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const storedUserData = JSON.parse(localStorage.getItem(username));
    
    if (storedUserData && storedUserData.password === password) {
        // Redirect to the addtask page
        window.location.href = 'Calendar.html';
    } else {
        alert('Invalid username or password. Please try again.');
    }
}