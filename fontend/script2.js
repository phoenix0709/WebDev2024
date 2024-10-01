// Hàm cập nhật thời gian theo thời gian của máy tính
function updateTime() {
    const currentTimeElement = document.getElementById('current-time');
    const now = new Date();
    const formattedTime = now.toLocaleTimeString();
    currentTimeElement.textContent = `Giờ hiện tại: ${formattedTime}`;
}

// Gọi hàm updateTime mỗi giây
setInterval(updateTime, 1000);

// Hàm thêm công việc vào danh sách
function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value;

    if (taskText === '') {
        alert('Vui lòng nhập công việc!');
        return;
    }

    const taskList = document.getElementById('task-list');

    const li = document.createElement('li');
    li.textContent = taskText;

    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('task-button');
    
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Hoàn thành';
    completeButton.onclick = function() {
        li.classList.toggle('completed');
    };

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Xóa';
    removeButton.classList.add('remove');
    removeButton.onclick = function() {
        taskList.removeChild(li);
    };

    buttonsDiv.appendChild(completeButton);
    buttonsDiv.appendChild(removeButton)

    li.appendChild(buttonsDiv);
    taskList.appendChild(li);

    taskList.appendChild(li);
    taskInput.value = '';
}
