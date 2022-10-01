/* eslint-disable arrow-body-style */
/* eslint-disable import/no-cycle */
import { tasks } from '../index.js';

const clearBtn = document.querySelector('.clearBtn');

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
const clearCompleted = () => {
  clearBtn.addEventListener('click', () => {
    const uncompletedTasks = tasks.filter((item) => item.completed === false);
    // Update the index of the remaining items and return them
    const updatedTasks = uncompletedTasks.map((task, oldIndex) => {
      return {
        ...task,
        index: oldIndex + 1,
      };
    });
    if (updatedTasks.length) {
      localStorage.setItem('data', JSON.stringify(updatedTasks));
    } else {
      localStorage.clear();
    }
    window.location.reload();
  });
};

export { markCompleted, clearCompleted };