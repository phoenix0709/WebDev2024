const taskModal = document.getElementById('taskModal');
const addTaskBtn = document.getElementById('addTaskBtn');
const closeModalBtn = document.getElementsByClassName('close')[0];
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

// Open modal
addTaskBtn.onclick = function() {
    taskModal.style.display = 'block';
}

// Close modal
closeModalBtn.onclick = function() {
    taskModal.style.display = 'none';
}

// Close modal if user clicks outside the modal
window.onclick = function(event) {
    if (event.target == taskModal) {
        taskModal.style.display = 'none';
    }
}

// Save task to LocalStorage(can be used for storage on the device when used offline)
function saveTaskToStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from LocalStorage and display them
function getTasksFromStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTaskToList(task));
}

// Remove task from LocalStorage
function removeTaskFromStorage(taskTitle) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.title !== taskTitle);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update task in LocalStorage
function updateTaskInStorage(updatedTask) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => task.title === updatedTask.title ? updatedTask : task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add task 
function addTaskToList(task) {
    const taskItem = document.createElement('div');
    taskItem.className = 'task-item';

    taskItem.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p><strong>Deadline:</strong> ${task.deadline}</p>
        <p><strong>Priority:</strong> ${task.priority}</p>
        <button class="deleteTaskBtn">Delete</button>
    `;

    taskList.appendChild(taskItem);

    //delete button
    taskItem.querySelector('.deleteTaskBtn').addEventListener('click', function() {
        taskItem.remove();
        removeTaskFromStorage(task.title);
    });

    //edit task on title or description click
    taskItem.querySelector('h3').addEventListener('click', function() {
        editTask(taskItem, task);
    });
    taskItem.querySelector('p').addEventListener('click', function() {
        editTask(taskItem, task);
    });
}

// Open modal with task data for editing
function editTask(taskItem, task) {
    taskModal.style.display = 'block';

    document.getElementById('title').value = task.title;
    document.getElementById('description').value = task.description;
    document.getElementById('deadline').value = task.deadline;
    document.getElementById('priority').value = task.priority;

    // task on submit
    taskForm.onsubmit = function(e) {
        e.preventDefault();

        task.title = document.getElementById('title').value;
        task.description = document.getElementById('description').value;
        task.deadline = document.getElementById('deadline').value;
        task.priority = document.getElementById('priority').value;

        taskItem.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p><strong>Deadline:</strong> ${task.deadline}</p>
            <p><strong>Priority:</strong> ${task.priority}</p>
            <button class="deleteTaskBtn">Delete</button>
        `;

        taskModal.style.display = 'none';
        taskForm.reset();

        // delete button after editing
        taskItem.querySelector('.deleteTaskBtn').addEventListener('click', function() {
            taskItem.remove();
            removeTaskFromStorage(task.title);
        });

        updateTaskInStorage(task);
    };
}

// Add task
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const deadline = document.getElementById('deadline').value;
    const priority = document.getElementById('priority').value;

    const task = {
        title,
        description,
        deadline,
        priority
    };

    addTaskToList(task);
    saveTaskToStorage(task);  // Save to LocalStorage
    taskModal.style.display = 'none';
    taskForm.reset();
});

// Load tasks when the page loads
window.onload = function() {
    getTasksFromStorage();
}
