const todoList = document.querySelector(".createTodo");

const btn = document.querySelector(".add");
const input = document.querySelector(".input");
btn.addEventListener("click", addTodo);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTodo();
  }
});

function createTodoElement(text, isChecked = false) {
  const createUl = document.createElement("ul");
  createUl.classList.add("todo");
  setTimeout(() => {
    createUl.classList.add("active");
  });

  const creatLi = document.createElement("li");
  creatLi.textContent = text;

  const div = document.createElement("div");
  div.classList.add("buttons");

  const checkBtn = document.createElement("button");
  checkBtn.classList.add("check");
  checkBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i>';

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("trash");
  deleteBtn.innerHTML = '<i class="fa-solid fa-circle-minus"></i>';

  createUl.appendChild(creatLi);
  createUl.appendChild(div);
  div.appendChild(checkBtn);
  div.appendChild(deleteBtn);

  return createUl;
}

function addTodo() {
  if (input.value === "") {
    return;
  }

  const todoElement = createTodoElement(input.value);
  todoList.appendChild(todoElement);

  removeTodo();
  checkTodo();
  saveToLocalStorage();

  input.value = "";
}

function removeTodo() {
  const deleteButtons = document.querySelectorAll(".trash");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove the parent ul when the delete button is clicked
      const ulToRemove = button.closest(".todo");
      ulToRemove.classList.remove("active");
      setTimeout(() => {
        ulToRemove.remove();
        saveToLocalStorage();
      }, 600);
      saveToLocalStorage();
    });
  });
}
removeTodo();

function checkTodo() {
  const checkButton = document.querySelectorAll(".check");
  checkButton.forEach((button) => {
    button.addEventListener("click", () => {
      const ulToCheck = button.closest(".todo");
      ulToCheck.classList.add("checked");
      saveToLocalStorage();
    });
  });
}
checkTodo();
// Function to save to-do list to local storage
function saveToLocalStorage() {
  const todos = document.querySelectorAll(".todo");
  const todosArray = [];

  todos.forEach((todo) => {
    const todoText = todo.querySelector("li").textContent;
    const isChecked = todo.classList.contains("checked");
    todosArray.push({ text: todoText, checked: isChecked });
  });

  localStorage.setItem("todos", JSON.stringify(todosArray));
}

// Function to retrieve to-do list from local storage
function getFromLocalStorage() {
  const todos = localStorage.getItem("todos");

  if (todos) {
    const todosArray = JSON.parse(todos);

    todosArray.forEach((todo) => {
      const todoElement = createTodoElement(todo.text, todo.checked);
      if (todo.checked) {
        todoElement.classList.add("checked");
      }
      todoList.append(todoElement);
    });
  }
  checkTodo();
  removeTodo();
}

// Load to-do list from local storage on page load
getFromLocalStorage();
