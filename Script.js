const addTaskBtnEl = document.getElementById("task-add-btn");
const addTaskBtnText = addTaskBtnEl.innerText;
const addTaskInputEl = document.getElementById("add-task-input");
const tasksListEl = document.querySelector("#tasks-list");

let tasksList = [];

let edit_id = null;
let statements = "";
// this line of code will return string data json format which can be used in our project

tasksList = JSON.parse(localStorage.getItem("tasksList")) || []; // Add the '|| []' part to handle initial loading

tasksList.forEach((task) => {
  task.done = task.done || false; // Add this line to set the default 'done' property to false if it doesn't exist
});

window.addEventListener("resize", () => {
  if (window.innerWidth <= 400) {
    addTaskBtnEl.innerText = "+";
  } else {
    addTaskBtnEl.innerText = addTaskBtnText;
  }
});

displayTask();

addTaskBtnEl.addEventListener("click", handleEvnets);
addTaskInputEl.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    handleEvnets();
  }
});

function handleEvnets() {
  let taskName = addTaskInputEl.value;
  if (taskName === "") {
    alert("Please Enter You Task");
  } else {
    // for Edit or update task
    if (edit_id !== null) {
      tasksList.splice(edit_id, 1, { taskName: taskName });
      edit_id = null;
    } else {
      tasksList.push({ taskName: taskName });
    }

    saveTask(tasksList);
    addTaskBtnEl.innerText = addTaskBtnText;
  }
}

function saveTask(tasksList) {
  // saving task in local storage to use them later on as well
  localStorage.setItem("tasksList", JSON.stringify(tasksList));
  addTaskInputEl.value = "";
  displayTask();
}

function displayTask() {
  statements = "";

  if (tasksList.length === 0) {
    // Array is empty
    // Perform your desired actions here
    // statements = "No tasks found";
    tasksListEl.style = "display: none";
  } else {
    tasksListEl.style = "display: block";
    tasksList.forEach((task, idx) => {
      const checked = task.done ? "checked" : "";
      statements += `
        <li class="flex">
          <input type="checkbox" id="add-task-input" onclick="taskDone(${idx})" ${checked} 
          class="task-done-input"
          />
          <span id="task-name" class="task-names ${checked}">${task.taskName} </span>
          <div>
            <button class="btn" id="btn-delete" onclick="deleteTask(${idx})">X</button>
            <button class="btn" id="btn-edit" onclick="updateTask(${idx})">Edit</button>
          </div>
      `;
    });
  }

  tasksListEl.innerHTML = statements;
}

function updateTask(idx) {
  // update task should show in user input
  edit_id = idx;
  addTaskInputEl.value = tasksList[edit_id].taskName;
  addTaskBtnEl.innerText = `Save Changes`;
}

function deleteTask(idx) {
  tasksList.splice(idx, 1);
  saveTask(tasksList);
}

function taskDone(idx) {
  tasksList[idx].done = !tasksList[idx].done; // Toggle the 'done' property of the task
  saveTask(tasksList);
}

// fucntion resetTask();

function resetTask() {}
// function filterTask();
// fucntion searchTask();