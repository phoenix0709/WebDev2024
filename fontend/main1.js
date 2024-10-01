function openModal() {
    document.getElementById('taskModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('taskModal').style.display = 'none';
}

function saveTask(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;
    const deadline = document.getElementById('deadline').value;

    // Create the task card (box)
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task-item';

    // Add delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-task';
    deleteButton.onclick = function() {
        deleteTask(taskDiv);
    };

    taskDiv.innerHTML = `
        <h3>${title}</h3>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Deadline:</strong> ${deadline}</p>
        <p><strong>Priority:</strong> ${priority.charAt(0).toUpperCase() + priority.slice(1)}</p>
    `;

    taskDiv.appendChild(deleteButton);

    // Append the task to the task list
    document.getElementById('taskList').appendChild(taskDiv);

    // Close the modal after saving
    closeModal();
}

function deleteTask(taskElement) {
    taskElement.remove();
}

function nextPage() {
    alert("Navigating to the next page!");
}
