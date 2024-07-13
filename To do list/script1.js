function addTask(year) {
  const taskInput = document.querySelector(`#year${year} input`);
  const taskList = document.querySelector(`#year${year} .task-list`);
  const taskText = taskInput.value;

  if (taskText.trim() === '') {
      alert('Please enter a task.');
      return;
  }

  const listItem = document.createElement('li');
  
  const taskSpan = document.createElement('span');
  taskSpan.textContent = taskText;

  const actionsDiv = document.createElement('div');
  actionsDiv.classList.add('actions');

  const completeButton = document.createElement('button');
  completeButton.textContent = 'Completed';
  completeButton.classList.add('complete-task');
  completeButton.onclick = () => {
      listItem.classList.linethrough('completed');
  };

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.classList.add('remove-task');
  removeButton.onclick = () => taskList.removeChild(listItem);

  actionsDiv.appendChild(removeButton);
  actionsDiv.appendChild(completeButton);
  taskList.appendChild(listItem);
  listItem.appendChild(actionsDiv);

}

