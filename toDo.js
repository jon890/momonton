const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];

function deleteToDos(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos() {
    localStorage.setItem("toDos", JSON.stringify(toDos))
}

function paintToDo(text) {
    const li = document.createElement("li");
    const newID = toDos.length + 1;
    li.id = newID;
    const delBtn = document.createElement("button");
    delBtn.addEventListener("click", deleteToDos);
    delBtn.innerHTML = "&times;";
    const span = document.createElement("span");
    span.innerText = text;
    li.appendChild(span);
    li.appendChild(delBtn);
    toDoList.appendChild(li);
    toDoObj = {
        text : text,
        id : newID
    }
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit() {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(todo){
            paintToDo(todo.text);
        });
    }
}

function init() {
    toDoForm.addEventListener("submit", handleSubmit);
    loadToDos();
}

init();