//tasks list
let tasks = [];

const userInput = document.getElementById("userInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskContainer = document.getElementById("taskContainer");
const taskCounter = document.getElementById("taskCounter");
const noTasks = document.getElementById("noTasks");

function addTask() {
  const taskText = userInput.value.trim();
  if (!taskText) return;

  // Create task object
  const task = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  // add task to list
  tasks.push(task);

  // clear input field
  userInput.value = "";

  // update display
  renderTasks();
}

// function to display tasks
function renderTasks() {
  taskList.innerHTML = "";
  taskCounter.innerHTML = "";

  // if there are not tasks show noTasks section
  if (tasks.length === 0) {
    noTasks.classList.remove("d-none");
    taskContainer.classList.add("d-none");
    return;
  } else {
    noTasks.classList.add("d-none");
    taskContainer.classList.remove("d-none");
  }

  // render task
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center mb-2 border rounded";

    // appply completed style
    if (task.completed) {
      li.style.textDecoration = "line-through";
      li.style.opacity = "0.6";
      li.style.backgroundColor = "#f1f5f9";
    }

    li.innerHTML = `
      <span class="flex-grow-1">${task.text}</span>
      <div class="btn-group gap-2" role="group">
        <button class="btn btn-sm border rounded-pill border-success ${task.completed ? "btn-secondary" : "btn-success"} complete-btn"  style="color: green; background-color: #d4edda;" data-id="${task.id}">
          <i class="fa-solid fa-check"></i> ${task.completed ? "Undo" : "Complete"}
        </button>
        <button class="btn btn-sm btn-danger delete-btn border rounded-pill border-danger" style="color: red; background-color: #f8d7da" data-id="${task.id}">
          <i class="fa-solid fa-trash"></i> Delete
        </button>
      </div>
    `;

    taskList.appendChild(li);
  });

  // create task counter section
  taskCounter.innerHTML = `
    <div class="m-3 d-flex justify-content-end align-items-center rounded" style="background-color: #ffff;">
      <button id="clearAllBtn"class="btn btn-sm btn-danger delete-btn border rounded-pill border-danger" style="color: red; background-color: #f8d7da">Clear All Tasks</button>
    </div>
  `;

  // add event listeners for complete and delete buttons
  document.querySelectorAll(".complete-btn").forEach((btn) => {
    btn.addEventListener("click", completeTask);
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", deleteTask);
  });

  // add event listener for clear all button
  const clearAllBtn = document.getElementById("clearAllBtn");
  if (clearAllBtn) {
    clearAllBtn.addEventListener("click", clearAllTasks);
  }
}

// complete task function
function completeTask(e) {
  const taskId = parseInt(e.currentTarget.getAttribute("data-id"));
  const task = tasks.find((t) => t.id === taskId);

  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

// delete task function
function deleteTask(e) {
  const taskId = parseInt(e.currentTarget.getAttribute("data-id"));
  tasks = tasks.filter((t) => t.id !== taskId);
  renderTasks();
}

// clear all tasks function
function clearAllTasks() {
  if (tasks.length === 0) return;

  if (confirm("Are you sure you want to clear all tasks?")) {
    tasks = [];
    renderTasks();
  }
}

// event listeners for add btn and enter
addBtn.addEventListener("click", addTask);

userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

renderTasks();
