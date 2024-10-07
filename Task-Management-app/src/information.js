// Show or hide the edit form when the "Edit" button is clicked
document.getElementById("editBtn").addEventListener("click", function() {
    document.getElementById("editForm").classList.toggle("hidden");
});

// Show or hide the change password popup when the "Change Password" button is clicked
document.getElementById("changePasswordBtn").addEventListener("click", function() {
    document.getElementById("changePasswordPopup").classList.toggle("hidden");
});

// Save user information and display it on the page
document.getElementById("saveBtn").addEventListener("click", function() {
    var fullName = document.getElementById("fullNameInput").value;
    var username = document.getElementById("usernameInput").value;
    var phone = document.getElementById("phoneInput").value;
    var email = document.getElementById("emailInput").value;
    var dob = document.getElementById("dobInput").value;
    var gender = document.getElementById("genderInput").value;

    document.getElementById("fullName").textContent = fullName;
    document.getElementById("username").textContent = username;
    document.getElementById("phone").textContent = phone;
    document.getElementById("email").textContent = email;
    document.getElementById("dob").textContent = new Date(dob).toLocaleDateString();
    document.getElementById("gender").textContent = gender;

    document.getElementById("editForm").classList.add("hidden");
});

// Submit the change password form (add your password validation logic here)
document.getElementById("submitChangePasswordBtn").addEventListener("click", function() {
    var oldPassword = document.getElementById("oldPasswordInput").value;
    var newPassword = document.getElementById("newPasswordInput").value;
    var confirmPassword = document.getElementById("confirmPasswordInput").value;

    // Example validation
    if (newPassword === confirmPassword) {
        alert("Password changed successfully!"); // Replace with your actual password change logic
        document.getElementById("changePasswordPopup").classList.add("hidden");
    } else {
        alert("New passwords do not match!");
    }
});

// Close the change password popup
document.getElementById("closeChangePasswordBtn").addEventListener("click", function() {
    document.getElementById("changePasswordPopup").classList.add("hidden");
});

// Back to Add Task page
document.getElementById("backToTaskBtn").addEventListener("click", function() {
    window.location.href = "Addtask.html"; // Navigate to the Add Task page
});

// Back to Calendar page
document.getElementById("backToCalendarBtn").addEventListener("click", function() {
    window.location.href = "Calendar.html"; // Navigate to the Calendar page
});

// Back to register page
document.getElementById("logoutBtn").addEventListener("click", function() {
    window.location.href = "login_or_register.html"; // Navigate to the register page
});
