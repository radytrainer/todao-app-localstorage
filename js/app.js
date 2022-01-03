/**
 * Create new task
 */
function createTask() {
  // check if task already exists
  if (taskNameExists(task.value)) {
    return confirm("Task name already exists");
  }
  // Check if task empty
  if (task.value === "") {
    task.classList.add("error");
    return;
  }
  task.classList.remove("error");
  // Add to local storage
  let taskObject = {
    name: task.value,
    color: priority.value,
  };
  data.push(taskObject);
  localStorage.setItem("tasks", JSON.stringify(data));
  task.value = "";
  window.location.reload();
}
/**
 * Display Task name from local storage
 */
function getTaskName() {
  if (!localStorage.length > 0) return;
  let tasks = localStorage.getItem("tasks");
  let taskObj = JSON.parse(tasks);
  for (let index in taskObj) {
    // create li tags
    const li = document.createElement("li");
    // add color priority
    li.style.borderLeft = "3px solid " + taskObj[index].color;

    // create span task name tags
    const spanTaskName = document.createElement("span");
    spanTaskName.textContent = taskObj[index].name;

    // create span delete task name tags
    const spanDelete = document.createElement("span");
    spanDelete.classList.add("fa");
    spanDelete.classList.add("fa-trash");
    spanDelete.id = index;

    // create span task edit task name tags
    const spanEdit = document.createElement("span");
    spanEdit.classList.add("fa");
    spanEdit.classList.add("fa-pencil");
    spanEdit.id = index + "-edit";

    // actiion divider
    const divider = document.createElement("div");
    divider.classList.add("action-div");
    divider.appendChild(spanEdit);
    divider.appendChild(spanDelete);

    // add span to li
    li.appendChild(spanTaskName);
    li.appendChild(divider);

    // add li to taskBody
    taskBody.appendChild(li);
  }
}
/**
 *  Delete Task name
 * @event value after click
 */
function deleteTask(event) {
  let id = event.target.id;
  if (event.target.className === "fa fa-trash") {
    let isDelete = window.confirm("Are you sure you want to delete");
    if (isDelete) {
      event.target.parentElement.remove();
      if (id > -1) {
        data.splice(id, 1);
      }
      localStorage.setItem("tasks", JSON.stringify(data));
    }
    window.location.reload();
  }
}

/**
 * get Task name for edit
 */
function getTaskById(event) {
  id = event.target.id.substring(0, 1);
  btnAdd.classList.add('hide')
  btnEdit.classList.add('show');
  if (event.target.className === "fa fa-pencil") {
    task.value = data[id].name;
    if(data[id].color === "green") {
        priority.selectedIndex = 0;
    }else if(data[id].color === "orange") {
        priority.selectedIndex = 1;
    }else {
        priority.selectedIndex = 2;
    }
  }
}
/**
 * Edit task name
 */
function editTask() {
    data[id].name = task.value;
    data[id].color = priority.value;
    localStorage.setItem("tasks", JSON.stringify(data));
    window.location.reload();
    btnAdd.classList.add('show');
    btnEdit.classList.add('hide');
}
/**
 * Search Task
 */
function searchTask() {
  let text = search.value.toLowerCase();
  let tasks = document.querySelectorAll("li");
  for (let task of tasks) {
    let taskTitle = task.firstElementChild.textContent.toLowerCase();
    if (taskTitle.indexOf(text) === -1) {
      task.style.display = "none";
    } else {
      task.style.display = "flex";
    }
  }
}
/**
 * Task name already exists
 * @name string
 */
function taskNameExists(name) {
  let tasks = document.querySelectorAll("li");
  for (let task of tasks) {
    let taskTitle = task.firstElementChild.textContent.toLowerCase();
    if (taskTitle === name.toLowerCase()) {
      return true;
    }
  }
  return false;
}
// Main
const task = document.querySelector("#task");
const priority = document.querySelector("#priority");
const btnAdd = document.querySelector("#add");
const btnEdit = document.querySelector("#edit");
let taskBody = document.querySelector("ul");
const search = document.querySelector("#search");
const cardText = document.querySelector(".card-text");
let data = [];

// Call function
btnAdd.addEventListener("click", createTask);
btnEdit.addEventListener('click', editTask);
taskBody.addEventListener("click", deleteTask);
search.addEventListener("keyup", searchTask);
cardText.addEventListener("click", getTaskById);

// id for edit
let id = null;

// if localStorage are not empty
if (localStorage.length > 0) {
  data = JSON.parse(localStorage.getItem("tasks"));
}

// call display list​ of task
getTaskName();

// Press enter key to create a new task
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    createTask();
  }
});
