import './style.css';
// Grabbing the DOM element for the task container
const activities = document.querySelector('.activities');

// Declaring the array to hold the various tasks
const tasks = [
  {
    description: 'wash the dishes',
    completed: false,
    index: 2,
  },
  {
    description: 'complete To Do list project',
    completed: false,
    index: 1,
  },
];
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

displayToDos();
