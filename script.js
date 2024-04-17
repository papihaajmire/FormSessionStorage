document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.getElementById('registrationForm');
    const loginForm = document.getElementById('loginForm');
    const dashboard = document.getElementById('dashboard');

    // Registration form
        registrationForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const mobileNo = document.getElementById('mobileNo').value;
        const username = document.getElementById('regUsername').value;
        const password = document.getElementById('regPassword').value;

        // Get existing entries or initialize an empty array
        let entries = JSON.parse(sessionStorage.getItem('entries')) || [];

        // Store new entry
        entries.push({ fullName, email, mobileNo, username, password });
        sessionStorage.setItem('entries', JSON.stringify(entries));

        alert('Registration successful! Please login.');
        showLoginForm();
    });

    // Login form
        loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        // Check if username and password match any stored entry
        const entries = JSON.parse(sessionStorage.getItem('entries')) || [];
        const user = entries.find(entry => entry.username === username && entry.password === password);

        if (user) {
            // Set user as logged in
            sessionStorage.setItem('loggedIn', true);
            showDashboard();
            // Display all entries in the dashboard
            displayAllEntries(entries);
        } else {
            alert('Invalid username or password');
        }
    });

    // Logout button
        document.getElementById('logoutBtn').addEventListener('click', function () {
        sessionStorage.removeItem('loggedIn');
        showLoginForm();
    });

    // Show registration form by default
    showRegistrationForm();

    // Function to show registration form
        function showRegistrationForm() {
        registrationForm.style.display = 'block';
        loginForm.style.display = 'none';
        dashboard.style.display = 'none';
        }

    // Function to show login form
        function showLoginForm() {
        registrationForm.style.display = 'none';
        loginForm.style.display = 'block';
        dashboard.style.display = 'none';
        }

    // Function to show dashboard
        function showDashboard() {
        registrationForm.style.display = 'none';
        loginForm.style.display = 'none';
        dashboard.style.display = 'block';
        }

    // Function to display all entries in the dashboard
    // const userDataBody = document.getElementById('userInfo');

    // // Loop through user data and create table rows
    // userInfo.forEach(function(entry) {
    //     const row = document.createElement('tr');
        
    //     const fullNameCell = document.createElement('td');
    //     fullNameCell.textContent = entry.fullName;
        
    //     const emailCell = document.createElement('td');
    //     emailCell.textContent = entry.email;
        
    //     const mobileCell = document.createElement('td');
    //     mobileCell.textContent = entry.mobile;
        
    //     const usernameCell = document.createElement('td');
    //     usernameCell.textContent = entry.username;
        
    //     row.appendChild(fullNameCell);
    //     row.appendChild(emailCell);
    //     row.appendChild(mobileCell);
    //     row.appendChild(usernameCell);
        
    //     userInfo.appendChild(row);
        
    // });

        function displayAllEntries(entries) {
        const userInfoTable = document.getElementById('userInfo');
        userInfoTable.innerHTML = ''; // Clear existing table
        entries.forEach(entry => {
            const row = userInfoTable.insertRow();
            row.insertCell().textContent = entry.fullName;
            row.insertCell().textContent = entry.email;
            row.insertCell().textContent = entry.mobileNo;
            row.insertCell().textContent = entry.username;
            });
        }

    // Switch between registration and login forms
        document.getElementById('registerLink').addEventListener('click', function (event) {
        event.preventDefault();
        showRegistrationForm();
        });

        document.getElementById('loginLink').addEventListener('click', function (event) {
        event.preventDefault();
        showLoginForm();
        });

    // Check if user is already logged in
        if (sessionStorage.getItem('loggedIn')) {
        showDashboard();
        const entries = JSON.parse(sessionStorage.getItem('entries')) || [];
        displayAllEntries(entries);
        }
        });

