
// Mobile menu
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");

if (menuButton && navLinks) {
  menuButton.addEventListener("click", function () {
    navLinks.classList.toggle("show");
  });
}

// Current year in footer
const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

// Academic planner
const plannerForm = document.getElementById("plannerForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const noTasks = document.getElementById("noTasks");

let tasks = JSON.parse(localStorage.getItem("elishaStudentTasks")) || [];

function saveTasks() {
  localStorage.setItem("elishaStudentTasks", JSON.stringify(tasks));
}

function displayTasks() {
  if (!taskList) return;

  taskList.innerHTML = "";
  if (noTasks) {
    noTasks.style.display = tasks.length === 0 ? "block" : "none";
  }

  tasks.forEach(function (task) {
    const li = document.createElement("li");
    li.className = task.completed ? "task-item completed" : "task-item";

    const taskName = document.createElement("span");
    taskName.textContent = task.name;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const completeButton = document.createElement("button");
    completeButton.textContent = task.completed ? "Undo" : "Complete";
    completeButton.addEventListener("click", function () {
      task.completed = !task.completed;
      saveTasks();
      displayTasks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      tasks = tasks.filter(function (item) {
        return item.id !== task.id;
      });
      saveTasks();
      displayTasks();
    });

    actions.appendChild(completeButton);
    actions.appendChild(deleteButton);
    li.appendChild(taskName);
    li.appendChild(actions);
    taskList.appendChild(li);
  });
}

if (plannerForm) {
  plannerForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const name = taskInput.value.trim();

    if (name === "") {
      alert("Please enter a task first.");
      return;
    }

    tasks.push({
      id: Date.now(),
      name: name,
      completed: false
    });

    saveTasks();
    displayTasks();
    taskInput.value = "";
  });
}

displayTasks();

// Basic contact form validation
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const feedback = document.getElementById("feedback");

    if (name === "" || email === "" || message === "") {
      feedback.textContent = "Please fill in all the fields.";
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      feedback.textContent = "Please enter a valid email address.";
      return;
    }

    feedback.textContent = "Thanks for contacting me";
    contactForm.reset();
  });
}
