document.getElementById("editBtn").addEventListener("click", function() {
    document.getElementById("editForm").classList.toggle("hidden");
});

document.getElementById("saveBtn").addEventListener("click", function() {
    var username = document.getElementById("usernameInput").value;
    var email = document.getElementById("emailInput").value;
    var joined = document.getElementById("joinedInput").value;

    document.getElementById("username").textContent = username;
    document.getElementById("email").textContent = email;
    document.getElementById("joined").textContent = new Date(joined).toLocaleDateString();

    document.getElementById("editForm").classList.add("hidden");
});
