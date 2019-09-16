// const UI names
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const collection = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');


// add event listener
document.addEventListener('DOMContentLoaded', getTasks);
form.addEventListener('submit', addTask);
collection.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTasks);
filter.addEventListener('click',filterTasks);

function getTasks(e){
  let tasks;
  if (JSON.parse(localStorage.getItem('tasks')) === null){
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(function (task) {
      const li = document.createElement('li');
      li.className = 'collection-item';
      const liText = document.createTextNode(task);
      const link = document.createElement('a');
      link.innerHTML = '<i class="fa fa-remove"></i>';
      link.className = 'delete-item secondary-content';
      li.appendChild(liText);
      li.appendChild(link);
      collection.appendChild(li);

      // default == clear new task
      e.preventDefault();
    });
  }

}


function addTask(e){
  // ul > li > text + a, li => field.value. finish <li> first, finally append li to ul.
  const li = document.createElement('li');
  li.className = 'collection-item';
  const liText = document.createTextNode(taskInput.value);
  const link = document.createElement('a');
  link.innerHTML = '<i class="fa fa-remove"></i>';
  link.className = 'delete-item secondary-content';
  li.appendChild(liText);
  li.appendChild(link);
  collection.appendChild(li);

  storeTaskInLocalStorage(taskInput.value);
  // default == clear new task
  e.preventDefault();
}


function storeTaskInLocalStorage(task) {
  let tasks;
  if (JSON.parse(localStorage.getItem('tasks')) === null){
    tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

}

function removeTask(e){
  if (e.target.classList.contains('fa')){
    if (confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove();
      removeTaskFromLocalStorage(e);
    }
  }
}

function removeTaskFromLocalStorage(e) {
  let task = e.target.parentElement.parentElement.textContent;
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  if (tasks.indexOf(task) > -1) {
    tasks.splice(tasks.indexOf(task), 1);
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks(){
  collection.innerHTML = '';
  let tasks = [];
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function filterTasks(){

  const item = document.querySelectorAll('.collection-item');
  // returns nodeList of added tasks

  item.forEach(function(item){
    console.log(item.textContent);


    // compare filter.value and item, == -1 means not included
    if (item.textContent.indexOf(filter.value) != -1){
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
  // console.log(filter.value);
}
