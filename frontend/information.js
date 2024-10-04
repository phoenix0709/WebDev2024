// Show or hide the edit form when the "Edit" button is clicked
document.getElementById("editBtn").addEventListener("click", function() {
    document.getElementById("editForm").classList.toggle("hidden");
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

// Back to Add Task page
document.getElementById("backToTaskBtn").addEventListener("click", function() {
    window.location.href = "Addtask.html"; // Navigate to the Add Task page
});

// Back to Calendar page
document.getElementById("backToCalendarBtn").addEventListener("click", function() {
    window.location.href = "Calendar.html"; // Navigate to the Calendar page
});