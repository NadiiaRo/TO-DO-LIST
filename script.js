//Selectors:

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");
const selectElement = document.querySelector('.select');

//Event Listeners:

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo)

//Functions:

function addTodo(event) {
    //Prevent form from submitting
    event.preventDefault();

    //To do div
    // !!!!!!! CHANGE LI INSIDE UL AND DIV INSIDE LI
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //li
    const newTodo = document.createElement('li');

    // trim input value for test case
    const todoItemValue = todoInput.value.trim();

    if (todoItemValue === '') {
        alert('Please, provide text')
        return;
    }

    newTodo.innerText = todoItemValue;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    //Add to do to local storage
    saveLocalTodos(todoItemValue);

    //Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa-solid fa-circle-check fa-2xl"></i>';
    completedButton.classList.add('completed-btn');
    todoDiv.appendChild(completedButton);

    //Check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fa-solid fa-trash fa-xl"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //Append to list
    todoList.appendChild(todoDiv);

    //Clear to do input value
    todoInput.value = "";

}

function deleteCheck(e) {
    const item = e.target;
    console.log(item)
    const todo = item.parentElement;

    //Delete To do
    if (item.classList[0] === "trash-btn") {
        todo.remove();
    }

    //Check mark
    if (item.classList[0] === "completed-btn") {
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });

    if (selectElement) {
        selectElement.classList.toggle('rotate');
    }
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
