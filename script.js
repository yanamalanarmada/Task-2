// CONTACT FORM
const nameField = document.getElementById("name");
const emailField = document.getElementById("email");
const messageField = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const successMessage = document.getElementById("successMessage");

document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    clearErrors();

    let valid = true;

    if (nameField.value.trim() === "") {
        nameError.textContent = "Name required";
        valid = false;
    }

    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (emailField.value.trim() === "") {
        emailError.textContent = "Email required";
        valid = false;
    } else if (!emailField.value.match(pattern)) {
        emailError.textContent = "Invalid email";
        valid = false;
    }

    if (messageField.value.trim() === "") {
        messageError.textContent = "Message required";
        valid = false;
    }

    if (valid) {
        successMessage.textContent = "Message Sent Successfully!";
        document.getElementById("contactForm").reset();
        setTimeout(() => successMessage.textContent = "", 3000);
    }
});

function clearErrors() {
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
}

// TO-DO WITH LOCAL STORAGE
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");

        const span = document.createElement("span");
        span.textContent = task.text;
        span.onclick = () => toggleComplete(index);

        const delBtn = document.createElement("button");
        delBtn.textContent = "X";
        delBtn.onclick = () => deleteTask(index);

        li.appendChild(span);
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();
    if (text === "") return;

    tasks.push({ text, completed: false });
    input.value = "";
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

renderTasks();

// DARK/LIGHT MODE
const toggleBtn = document.getElementById("toggleTheme");

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    toggleBtn.textContent = "☀️";
}

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        toggleBtn.textContent = "☀️";
        localStorage.setItem("theme", "light");
    } else {
        toggleBtn.textContent = "🌙";
        localStorage.setItem("theme", "dark");
    }
});