// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Toggle Menu on mobile
    function toggleMenu() {
        const navbar = document.querySelector('.navbar');
        navbar.classList.toggle('active');
    }

    // Add event listener for the menu toggle button
    const menuToggleButton = document.querySelector('.menu-toggle');
    if (menuToggleButton) {
        menuToggleButton.addEventListener('click', toggleMenu);
    }

    // Disable autocomplete for specific input fields
    function disableAutocomplete() {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.setAttribute('autocomplete', 'off');
        });
    }

    // Call the function to disable autocomplete
    disableAutocomplete();

    // Toggle password visibility
    function setupPasswordToggle(inputId, toggleId) {
        const passwordInput = document.getElementById(inputId);
        const toggleIcon = document.getElementById(toggleId);

        if (passwordInput && toggleIcon) {
            toggleIcon.addEventListener('click', function () {
                const isPasswordHidden = passwordInput.type === 'password';
                passwordInput.type = isPasswordHidden ? 'text' : 'password';
                toggleIcon.src = isPasswordHidden ? '../image/show.png' : '../image/hide.png';
            });
        }
    }

    // Initialize the toggle for the login password field
    setupPasswordToggle('loginPassword', 'togglePassword');
    setupPasswordToggle('password', 'togglePassword');
    setupPasswordToggle('confirmPassword', 'toggleConfirmPassword');

    // Handle login form submission
    function handleLogin(event) {
        event.preventDefault();

        // Get user credentials from the form
        const loginId = document.getElementById('loginId').value.trim();
        const loginPassword = document.getElementById('loginPassword').value.trim();

        // Basic validation
        if (loginId === "" || loginPassword === "") {
            alert("Please enter both your ID and password.");
            return;
        }

        // Fetch user data from local storage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === loginId && u.password === loginPassword);

        if (user) {
            alert(`Welcome back, ${user.fullName}!`);
            // Redirect to the dashboard or home page
            window.location.href = "../index.html"; // Replace with your desired redirect page
        } else {
            alert("Invalid email or password. Please try again.");
        }
    }

    // Add event listener for the login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Handle registration form submission
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            const confirmPassword = document.getElementById('confirmPassword').value.trim();
            const userType = document.getElementById('userType').value === "user" ? "patient" : document.getElementById('userType').value;

            // Check if passwords match
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            // Fetch existing users from local storage
            let users = JSON.parse(localStorage.getItem('users')) || [];

            // Check for duplicate email within the same user type
            const existingEmailUser = users.find(user => user.email === email && user.userType === userType);
            if (existingEmailUser) {
                alert(`This email ID is already registered as a ${userType}.`);
                return;
            }

            // Check for duplicate full name within the same user type
            const existingNameUser = users.find(user => user.fullName === fullName && user.userType === userType);
            if (existingNameUser) {
                alert(`This name is already taken by a ${userType}.`);
                return;
            }

            // Use the email ID as the permanent ID
            const permanentID = email;

            // Create an object to store user details
            const userData = {
                permanentID,
                fullName,
                email,
                password,
                userType,
            };

            // Add the new user to the list and store it back in local storage
            users.push(userData);
            localStorage.setItem('users', JSON.stringify(users));

            // Display the ID and password to the user and redirect on confirmation
            if (alert(`Registration Successful!\nYour Login ID: ${email}\nPassword: ${password}\nPlease save these credentials for future logins.`)) {
                window.location.href = "../html/login.html"; // Redirect to the login page
            } else {
                window.location.href = "../html/login.html"; // Ensure redirection even without explicit user action
            }
        });
    }

    // Function to fetch user data from local storage (for verification or display)
    function fetchUsers() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        console.log('Registered Users:', users);
    }

    // Form Handling (login and registration switching)
    function switchToSignup() {
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("registerForm").style.display = "block";
        document.getElementById("form-title").textContent = "Sign Up";
        document.getElementById("toggle-text").style.display = "none";
        document.getElementById("toggle-text-login").style.display = "block";
    }

    function switchToLogin() {
        document.getElementById("loginForm").style.display = "block";
        document.getElementById("registerForm").style.display = "none";
        document.getElementById("form-title").textContent = "Login";
        document.getElementById("toggle-text").style.display = "block";
        document.getElementById("toggle-text-login").style.display = "none";
    }
});
