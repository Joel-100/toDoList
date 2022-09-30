import './style.css';

// Grabbing the DOM element for the task container
const activities = document.querySelector('.activities');

// Getting the form input to add a task
const input = document.querySelector('.tsk');

// Getting a form element
const form = document.querySelector('#addForm');

// Declaring the array to hold the various tasks
const tasks = JSON.parse(localStorage.getItem('data')) || [];

// Add toDo to the local storage
const addToDo = () => {
  form.addEventListener('submit', (e) => {
    const toDo = {
      description: input.value,
      completed: false,
      index: tasks.length + 1
    };
    tasks.push(toDo);
    const convertedTasks = JSON.stringify(tasks);
    localStorage.setItem('data', convertedTasks);
  });
  return tasks;
};

// We are displaying the tasks in the browser
const displayToDos = () => {
// sorting array in ascending order using the index property
  const sortedTasks = tasks.sort((a, b) => a.index - b.index);
  let task = '';
  sortedTasks.forEach((item) => {
// Append HTML code for various tasks
  task += `<div class="list">
  <div class="input">
    <input class="tsk" type="checkbox" />
    <input class="tsk" type="text" value="${item.description}" />
  </div>
  <i class="fa-solid fa-ellipsis-vertical"></i>
</div>
`;
// Inserting the items in the activities section
activities.innerHTML = task;
  });
};

addToDo();
displayToDos();
