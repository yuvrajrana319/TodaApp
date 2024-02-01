
function addTask() {
    var input = document.getElementById("taskInput");
    var taskText = input.value.trim();
    
    if (taskText !== "") {
        var taskList = document.getElementById("taskList");
        var li = document.createElement("li");
        li.innerHTML = taskText + ' <button class="edit-btn" onclick="editTask(this)">Edit</button><button class="delete-btn" onclick="deleteTask(this)">Delete</button>';
        taskList.appendChild(li);

        saveTaskToLocalStorage(taskText);

        input.value = "";
    } else {
        alert("Please enter a task!");
    }
}

function saveTaskToLocalStorage(task) {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Function to edit a task
function editTask(button) {
    var li = button.parentElement;
    var newText = prompt("Edit task:", li.firstChild.nodeValue);
    if (newText !== null) {
        li.firstChild.nodeValue = newText;
        updateTaskInLocalStorage(li.firstChild.nodeValue, newText);
    }
}

function updateTaskInLocalStorage(oldTask, newTask) {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    var index = tasks.indexOf(oldTask);
    if (index !== -1) {
        tasks[index] = newTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// Function to delete a task
function deleteTask(button) {
    var li = button.parentElement;
    var taskText = li.firstChild.nodeValue;
    li.remove();

    removeTaskFromLocalStorage(taskText);
}

function removeTaskFromLocalStorage(task) {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    var index = tasks.indexOf(task);
    if (index !== -1) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}


window.onload = function() {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    var taskList = document.getElementById("taskList");
    tasks.forEach(function(task) {
        var li = document.createElement("li");
        li.innerHTML = task + ' <button class="edit-btn" onclick="editTask(this)">Edit</button><button class="delete-btn" onclick="deleteTask(this)">Delete</button>';
        taskList.appendChild(li);
    });
};
