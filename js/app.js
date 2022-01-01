/**
 * Create new task
 */
function createTask() 
{
   const task = document.querySelector('#task');
   const priority = document.querySelector('#priority');
   // check if task already exists
  if(taskNameExists(task.value)) 
  {
    return confirm('Task name already exists')
  }
  // Check if task empty
   if (task.value === "") 
   {
       task.classList.add('error');
       return;
   }
   task.classList.remove('error');
   // Add to local storage
   let taskObject =  { 
        name: task.value,
        color: priority.value
    }
    data.push(taskObject);
    localStorage.setItem('tasks', JSON.stringify(data));
   task.value = "";

   window.location.reload()
}
/**
 * Display Task name from local storage
 */
function getTaskName()
{
    if (!localStorage.length > 0) return;
    let tasks = localStorage.getItem('tasks');
    let taskObj = JSON.parse(tasks);
    for(let index in taskObj) 
    {
        // create li tags
        const li = document.createElement('li');
        // add color priority
        li.style.borderLeft = "3px solid " + taskObj[index].color;

        // create span task name tags
        const spanTaskName = document.createElement('span');
        spanTaskName.textContent = taskObj[index].name;

        // create span delete task name tags
        const spanDelete = document.createElement('span');
        spanDelete.classList.add('fa');
        spanDelete.classList.add('fa-trash');
        spanDelete.id = index;

        // add span to li
        li.appendChild(spanTaskName);
        li.appendChild(spanDelete);

        // add li to taskBody
        taskBody.appendChild(li);
    }
    

}
/**
 *  Delete Task name
 * @event value after click
 */
function deleteTask(event)
{
    let id = event.target.id;
    if(event.target.className === "fa fa-trash")
    {
        let isDelete = window.confirm('Are you sure you want to delete');
        if(isDelete) 
        {
            event.target.parentElement.remove();
            if (id > -1) 
            {
                data.splice(id, 1);
            }
            localStorage.setItem('tasks', JSON.stringify(data));
        }
    }
}

/**
 * Search Task
 */
function searchTask()
{
    let text = search.value.toLowerCase();
    let tasks = document.querySelectorAll('li');
    for (let task of tasks)
    {
        let taskTitle = task.firstElementChild.textContent.toLowerCase();
        if (taskTitle.indexOf(text) === -1)
        {
            task.style.display = "none";
        }else {
            task.style.display = "flex";
        }
    }
}
/**
 * Task name already exists
 * @name string
 */
function taskNameExists(name)
{
    let tasks = document.querySelectorAll('li');
    for (let task of tasks)
    {
        let taskTitle = task.firstElementChild.textContent.toLowerCase();
        console.log(taskTitle)
        if (taskTitle === name.toLowerCase()) 
        {
            return true;
        }
        
    }
    return false;
}
// Main
const btnAdd = document.querySelector('button');
const taskBody = document.querySelector('ul');
const search = document.querySelector('#search');
let data = [];
// Call function
btnAdd.addEventListener('click', createTask);
taskBody.addEventListener('click', deleteTask);
search.addEventListener('keyup', searchTask);

// if localStorage are not empty
if (localStorage.length > 0) {
    data = JSON.parse(localStorage.getItem('tasks'));
}

// call display list​ of task
getTaskName();

// Press enter key to create a new task
document.addEventListener('keydown', event => {
    if(event.key === "Enter")
    {
        createTask();
    }
});

