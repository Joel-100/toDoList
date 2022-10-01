/* eslint-disable arrow-body-style */
import './style.css';

// Grabbing the DOM element for the task container
const activities = document.querySelector('.activities');

// Getting the form input to add a task
const input = document.querySelector('.tsk');

// Getting a form element
const form = document.querySelector('#addForm');

// getting clear button
const clearBtn = document.querySelector('.clearBtn');

// Declaring the array to hold the various tasks
let tasks = JSON.parse(localStorage.getItem('data')) || [];

// Add toDo to the local storage
const addToDo = () => {
  form.addEventListener('submit', () => {
    const toDo = {
      description: input.value,
      completed: false,
      index: tasks.length + 1,
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
    task += `<div class="list" key="${item.index}">
  <div class="input">
    <input class="tsk checkInput" type="checkbox" ${item.completed ? 'checked' : ''}/>
    <input class="tsk list-input ${item.completed ? 'strikethrough' : ''}" type="text" value="${item.description}" />
  </div>
  <i class="fa-solid fa-ellipsis-vertical dots"></i>
  <i class="fa-solid fa-trash delete"></i>
</div>
`;
    // Inserting the items in the activities section
    activities.innerHTML = task;
  });
};

// Edit an item in the array
const edit = () => {
// Grabbing all the input fields in the various items
  const listInputs = document.querySelectorAll('.list-input');
  listInputs.forEach((item, inputIndex) => {
    // Traverse the DOM to get the parent of the item
    item.addEventListener('focus', () => {
      item.parentElement.parentElement.style.background = 'rgb(255, 255, 193)';
      item.parentElement.nextElementSibling.style.display = 'none';
      item.parentElement.parentElement.lastElementChild.style.display = 'block';
    });

    item.addEventListener('blur', () => {
      item.parentElement.parentElement.style.background = 'white';
      item.parentElement.nextElementSibling.style.display = 'block';
      item.parentElement.parentElement.lastElementChild.style.display = 'none';
    });

    item.addEventListener('change', () => {
      const newValue = item.value;
      tasks.forEach((item, index) => {
        if (inputIndex === index) {
          item.description = newValue;
          const convertedTasks = JSON.stringify(tasks);
          localStorage.setItem('data', convertedTasks);
        }
      });
    });
  });
};

// Check Completed value
const markCompleted = () => {
  let completedValue = false;
  const checkInputs = document.querySelectorAll('.checkInput');
  checkInputs.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
      /* eslint-disable no-unused-expressions */
      checkbox.checked ? completedValue = true : completedValue = false;
      const key = checkbox.parentElement.parentElement.getAttribute('key');
      const result = tasks.find((task) => {
        return String(key) === String(task.index);
      });
      // result.description = result.description;
      result.completed = completedValue;
      const convertedTasks = JSON.stringify(tasks);
      localStorage.setItem('data', convertedTasks);
      window.location.reload();
    });
  });
};

// Clear All Completed Tasks
clearBtn.addEventListener('click', () => {
  const uncompletedTasks = tasks.filter((item) => item.completed === false);

  tasks = uncompletedTasks;
  if (uncompletedTasks.length) {
    localStorage.setItem('data', JSON.stringify(uncompletedTasks));
  } else {
    localStorage.clear();
  }
  window.location.reload();
});

// Remove Section
const remove = () => {
  const deleteButtons = document.querySelectorAll('.delete');
  deleteButtons.forEach((item) => {
    item.addEventListener('mousedown', () => {
      const key = item.parentElement.getAttribute('key');
      const results = tasks.filter((task) => String(task.index) !== String(key));

      // Update the index of the remaining items and return them
      const updatedTasks = results.map((task, oldIndex) => {
        return {
          ...task,
          index: oldIndex + 1,
        };
      });
      // console.log(updatedTasks)
      tasks = updatedTasks;
      item.parentElement.remove();
      // Updating LocalStorage
      const convertedTasks = JSON.stringify(tasks);
      localStorage.setItem('data', convertedTasks);
      window.location.reload();
    });
  });
};

addToDo();
displayToDos();
edit();
markCompleted();
remove();
