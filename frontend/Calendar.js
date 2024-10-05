document.addEventListener('DOMContentLoaded', function() {
    setupDateControls();
    loadCalendar(new Date());
    setupTaskModal();
    setupPopupCloseEvent();
    loadIncompleteTasks(); // Load incomplete tasks when the page loads
});

let tasks = {};  // Object to store tasks with date keys

// Initialize date navigation controls
function setupDateControls() {
    const datePicker = document.getElementById('date-picker');
    const today = new Date();
    datePicker.valueAsDate = today;
    
    const prevBtn = document.getElementById('prev-period-btn');
    const nextBtn = document.getElementById('next-period-btn');
    
    prevBtn.addEventListener('click', () => changePeriod(-1));
    nextBtn.addEventListener('click', () => changePeriod(1));
}

// Handle changing period (month view only)
function changePeriod(change) {
    const datePicker = document.getElementById('date-picker');
    let currentDate = new Date(datePicker.value);
    
    currentDate.setMonth(currentDate.getMonth() + change);
    
    datePicker.valueAsDate = currentDate;
    loadCalendar(currentDate);
}

// Load the month view calendar
function loadCalendar(date) {
    const dayLabelsContainer = document.querySelector('.day-labels');
    const calendarGrid = document.querySelector('.calendar-grid');
    dayLabelsContainer.innerHTML = '';  // Clear previous labels
    calendarGrid.innerHTML = '';  // Clear previous calendar days

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Create day labels (Sun, Mon, etc.)
    daysOfWeek.forEach(day => {
        const label = document.createElement('div');
        label.textContent = day;
        dayLabelsContainer.appendChild(label);
    });

    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const today = new Date();  // Get today's date for comparison
    
    // Add empty cells for the days of the previous month
    for (let i = 0; i < firstDayOfWeek; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.classList.add('day');
        calendarGrid.appendChild(emptyCell);
    }

    // Generate day cells for the current month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('day');
        dayCell.innerHTML = `<span class="date-number">${day}</span>`;
        
        const dateKey = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const dayDate = new Date(year, month, day);

        // Mark past days
        if (dayDate < today) {
            dayCell.classList.add('past-day');
        }
        // Mark the current day
        if (dayDate.toDateString() === today.toDateString()) {
            dayCell.classList.add('current-day');
        }

        // Handle task statuses (incomplete or completed)
        if (tasks[dateKey]) {
            const completedTasks = tasks[dateKey].filter(task => task.completed).length;
            const totalTasks = tasks[dateKey].length;

            if (completedTasks === totalTasks && totalTasks > 0) {
                dayCell.classList.add('completed-tasks');
            } else if (completedTasks < totalTasks && totalTasks > 0) {
                dayCell.classList.add('incomplete-tasks');
            }

            tasks[dateKey].forEach(task => {
                const taskDiv = document.createElement('div');
                taskDiv.classList.add('task');
                taskDiv.textContent = task.title;
                dayCell.appendChild(taskDiv);
            });
        }

        dayCell.addEventListener('click', (e) => openDayPopup(e, dateKey, dayCell));
        calendarGrid.appendChild(dayCell);
    }
}

// Function to open the task modal and add tasks
function setupTaskModal() {
    const modal = document.getElementById('task-modal');
    const closeBtn = document.querySelector('.close-btn');
    const taskForm = document.getElementById('task-form');
    const taskDateInput = document.getElementById('task-date');

    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    
    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskDate = taskDateInput.value;
        const taskTitle = document.getElementById('task-title').value;

        if (!tasks[taskDate]) {
            tasks[taskDate] = [];
        }

        tasks[taskDate].push({ title: taskTitle, completed: false });
        modal.style.display = 'none';
        loadCalendar(new Date(taskDate));  // Reload calendar to show updated task
        loadIncompleteTasks();  // Reload incomplete tasks list
    });
}

// Function to load incomplete tasks into the sidebar
function loadIncompleteTasks() {
    const incompleteTasksList = document.getElementById('incomplete-tasks');
    incompleteTasksList.innerHTML = '';  // Clear the list

    for (let dateKey in tasks) {
        tasks[dateKey].forEach(task => {
            if (!task.completed) {  // Check if task is incomplete
                const taskItem = document.createElement('li');
                taskItem.textContent = `${task.title} (${dateKey})`;

                // Add a button to mark as completed
                const completeBtn = document.createElement('button');
                completeBtn.textContent = 'Mark as Complete';
                completeBtn.addEventListener('click', () => {
                    task.completed = true;
                    loadIncompleteTasks();  // Reload incomplete tasks after completion
                    loadCalendar(new Date());  // Refresh calendar
                });

                taskItem.appendChild(completeBtn);
                incompleteTasksList.appendChild(taskItem);
            }
        });
    }
}

// Function to open the day information popup
function openDayPopup(event, dateKey, dayCell) {
    const popup = document.getElementById('day-popup');
    const popupDate = document.getElementById('popup-date');
    const popupTasks = document.getElementById('popup-tasks');
    
    popupDate.textContent = `Tasks for ${dateKey}`;
    popupTasks.innerHTML = '';

    if (tasks[dateKey]) {
        tasks[dateKey].forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.textContent = task.title;
            popupTasks.appendChild(taskItem);

            // Add a button to mark the task as completed
            const completeBtn = document.createElement('button');
            completeBtn.textContent = task.completed ? 'Completed' : 'Mark as Complete';
            completeBtn.addEventListener('click', () => {
                tasks[dateKey][index].completed = !task.completed;  // Toggle completion
                loadCalendar(new Date(dateKey));  // Reload calendar to reflect changes
                loadIncompleteTasks();  // Reload incomplete tasks list
            });
            taskItem.appendChild(completeBtn);
        });
    } else {
        const noTasksItem = document.createElement('li');
        noTasksItem.textContent = 'No tasks for this day';
        popupTasks.appendChild(noTasksItem);
    }

    // Position popup near the clicked day
    const rect = dayCell.getBoundingClientRect();
    popup.style.top = `${rect.top + window.scrollY + 50}px`;
    popup.style.left = `${rect.left + window.scrollX}px`;
    popup.style.display = 'block';
}

// Function to set up the event to close the popup
function setupPopupCloseEvent() {
    const popup = document.getElementById('day-popup');
    const closePopupBtn = document.querySelector('.close-popup');
    closePopupBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });
}
// Function to go back to task list page
function goToTaskPage() {
    window.location.href = "Addtask.html"; // Transition back to task list
}

// Settings button and redirect to account page
document.getElementById('settings-btn').addEventListener('click', function() {
    const settings = document.querySelector('.settings');
    settings.classList.toggle('show');
});

document.getElementById('account-btn').addEventListener('click', function() {
    window.location.href = 'information.html'; // Replace with your desired URL
});

// Ensure the above functions are called after the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Attach event listeners after the DOM has fully loaded
    document.getElementById('create-task-btn').addEventListener('click', goToTaskPage);
});
function goToTodayTasks() {
    window.location.href = "TodayTask.html"; // Redirect to Today's Tasks page
}
