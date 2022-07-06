const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const clearBtn = document.querySelector('.clear-tasks');
const tasklist = document.querySelector('.collection');

// load all event listeners
loadEventlisteners();

// load all event listeners
function loadEventlisteners() {
  // Dom load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // add task event
  form.addEventListener('submit', addtask);

  // remove task event
  tasklist.addEventListener('click', removeTask);
  // clear task events
  clearBtn.addEventListener('click', clearTask);
  // filter tasks event
  filter.addEventListener('keyup', filterTask);
}

// get tasks from ls
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task) {
    // create li element
    const li = document.createElement('li');
    // add class
    li.className = 'collection-item';

    // create textnode and append to li
    li.appendChild(document.createTextNode(task));

    // create new link element
    const link = document.createElement('a');

    // add class
    link.className = 'delete-item secondary-content';

    // add icon html
    link.innerHTML = '<i class = "fa fa-remove"></i>';

    // append the link to li
    li.appendChild(link);

    // append li to ul
    tasklist.appendChild(li);

  });
}





// add task
function addtask(e) {

  if (taskInput.value === '') {
    alert('add a task');
  }
  // create li element
  const li = document.createElement('li');
  // add class
  li.className = 'collection-item';

  // create textnode and append to li
  li.appendChild(document.createTextNode(taskInput.value));

  // create new link element
  const link = document.createElement('a');

  // add class
  link.className = 'delete-item secondary-content';

  // add icon html
  link.innerHTML = '<i class = "fa fa-remove"></i>';

  // append the link to li
  li.appendChild(link);
  // append li to ul
  tasklist.appendChild(li);
  // store in ls
  storeTaskinLocalStorage(taskInput.value);
  // clear Input
  taskInput.value = '';
  e.preventDefault();
}
// store task
function storeTaskinLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

}
// remove task
function removeTask(e) {

  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure')) {
      e.target.parentElement.parentElement.remove();


      // remove from ls
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}
// remove from ls
function removeTaskFromLocalStorage(taskItems) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task, index) {
    if (taskItems.textContent === task) {
      tasks.splice(index, 1);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));

  });

}

// clear tasks

function clearTask() {

  tasklist.innerHTML = '';

  // while (tasklist.firstChild) {

  //   tasklist.removeChild(tasklist.firstChild);

  // }
  clearTaskFromLocalStorage();

}
// clear from local storage
function clearTaskFromLocalStorage() {
  localStorage.clear();
}
// filter tasks
function filterTask(e) {

  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach
    (function (task) {

      const item = task.firstChild.textContent;

      if (item.toLowerCase().indexOf(text) != -1) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    });
}


























