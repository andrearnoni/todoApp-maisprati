document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTaskButton");
  const taskList = document.getElementById("taskList");

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = "";
    tasks.forEach((task) => addTaskToDOM(task.text, task.completed));
  }

  function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function addTaskToDOM(taskText, completed = false) {
    const li = document.createElement("li");
    li.className = `list-group-item ${
      completed ? "list-group-item-success" : ""
    }`;
    li.innerHTML = `
        <div class="d-flex flex-column align-items-center">
          <span class="${
            completed ? "text-decoration-line-through" : ""
          }">${taskText}</span>
          <div class="mt-2 d-flex justify-content-center">
            <button class="completeTask btn btn-success btn-sm mx-1">Completar</button>
            <button class="editTask btn btn-warning btn-sm mx-1">Editar</button>
            <button class="deleteTask btn btn-danger btn-sm mx-1">Excluir</button>
          </div>
        </div>
      `;
    taskList.appendChild(li);

    li.querySelector(".completeTask").addEventListener("click", () =>
      toggleCompleteTask(li)
    );

    li.querySelector(".editTask").addEventListener("click", () => editTask(li));

    li.querySelector(".deleteTask").addEventListener("click", () =>
      deleteTask(li)
    );
  }

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push({ text: taskText, completed: false });
      saveTasks(tasks);
      addTaskToDOM(taskText);
      taskInput.value = "";
    }
  }

  function editTask(li) {
    const newTaskText = prompt(
      "Edite sua tarefa:",
      li.querySelector("span").innerText
    );
    if (newTaskText !== null && newTaskText.trim() !== "") {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const index = tasks.findIndex(
        (task) => task.text === li.querySelector("span").innerText
      );
      tasks[index].text = newTaskText;
      saveTasks(tasks);
      li.querySelector("span").innerText = newTaskText;
    }
  }

  function deleteTask(li) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const index = tasks.findIndex(
      (task) => task.text === li.querySelector("span").innerText
    );
    tasks.splice(index, 1);
    saveTasks(tasks);
    li.remove();
  }

  function toggleCompleteTask(li) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const index = tasks.findIndex(
      (task) => task.text === li.querySelector("span").innerText
    );
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);

    if (tasks[index].completed) {
      li.querySelector("span").classList.add("text-decoration-line-through");
      li.classList.add("list-group-item-success");
    } else {
      li.querySelector("span").classList.remove("text-decoration-line-through");
      li.classList.remove("list-group-item-success");
    }
  }

  addTaskButton.addEventListener("click", addTask);

  loadTasks();
});
