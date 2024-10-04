// Function to navigate back to the calendar
function goToCalendar() {
    window.location.href = "Calendar.html"; // Navigate to the main calendar view
}

// Function to go to the Add Task page
function goToAddTask() {
    window.location.href = "Addtask.html"; // Navigate to the task list view
}

document.addEventListener('DOMContentLoaded', function() {
    checkTasks(); // Call this function when the page loads
});

function checkTasks() {
    const taskList = document.getElementById('taskList');
    const noTasksMsg = document.getElementById('noTasksMsg');

    // Simulating task check. If there are no tasks, show the message
    const tasks = []; // This should be an array of tasks fetched from somewhere
    
    if (tasks.length === 0) {
        noTasksMsg.style.display = 'block'; // Show message if no tasks
    } else {
        noTasksMsg.style.display = 'none'; // Hide message if there are tasks
        
    }
}


