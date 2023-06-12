/* Firebase */
const firebaseConfig = {
  apiKey: "AIzaSyA41vqCO9CIDICVD_YUAzwknHZ-0gzDByA",
  authDomain: "slutuppgift-cd6fc.firebaseapp.com",
  databaseURL:
    "https://slutuppgift-cd6fc-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "slutuppgift-cd6fc",
  storageBucket: "slutuppgift-cd6fc.appspot.com",
  messagingSenderId: "1089764169541",
  appId: "1:1089764169541:web:824a50162eab726448502c",
  measurementId: "G-ZHC77BMQQE",
};
firebase.initializeApp(firebaseConfig);

let database = firebase.database();
// Initialize Firebase
let ref = database.ref("todos");


document.addEventListener("DOMContentLoaded", function () {
  let todoBtn = document.getElementById("add-todo");
  todoBtn.addEventListener("click", addTodo);

  displayTodoList();
});

function addTodo() {
  let titleInput = document.getElementById("todo-title").value;
  let description = document.getElementById("todo-desc").value;
  let date = document.getElementById("todo-date").value;

  if (titleInput === "" || description === "" || date === "") {
    console.log("Var vänlig fyll i alla fält");
    return;
  }

  let newTodo = ref.push();
  let todoId = newTodo.key;

  let todoData = {
    title: titleInput,
    description: description,
    endDate: date,
    done: false,
  };

  newTodo.set(todoData);

  document.getElementById("todo-title").value = "";
  document.getElementById("todo-desc").value = "";
  document.getElementById("todo-date").value = "";

  // let todoTitle = document.createElement("li");
  // todoTitle.innerText = titleInput;
  // //todoTitle.addEventListener("click", onClickTodoItem);
  // const todoList = document.getElementById("todo-list");
  // todoList.append(todoTitle);
  // console.log(todoList);
}

function displayTodoList() {
  let displayList = document.querySelector(".display-todo");

  ref.on("value", function (snapshot) {
    let data = snapshot.val();
    displayList.innerHTML = "";

    for (let key in data) {
      let todo = data[key];

      let todoElement = document.createElement("div");
      todoElement.classList.add("display-things");

      let todoContent = document.createElement("div");
      todoContent.classList.add("todoDiv");

      let titleHeading = document.createElement("h4");
      titleHeading.innerText = "Title:";
      let titleParagraph = document.createElement("p");
      titleParagraph.classList.add("header-display");
      titleParagraph.innerText = todo.title;

      let descriptionHeading = document.createElement("h4");
      descriptionHeading.innerText = "Description:";
      let descriptionParagraph = document.createElement("p");
      descriptionParagraph.classList.add("header-display");
      descriptionParagraph.innerText = todo.description;

      let dateHeading = document.createElement("h4");
      dateHeading.innerText = "Date:";
      let dateParagraph = document.createElement("p");
      dateParagraph.classList.add("header-display");
      dateParagraph.innerText = todo.endDate;

      // ===== testar att lägga till varning när slutdatum närnar sig =====

      let currentDate = new Date();
      let endDate = new Date(todo.endDate);
      let timeDifference = endDate.getTime() - currentDate.getTime();
      let daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

      if (daysDifference < 3) {
        let warningMessage = document.createElement("p");
        warningMessage.classList.add("warning-message");
        warningMessage.innerText = "Slutdatum närmar sig!";
        warningMessage.style.color = "orange";
        dateParagraph.appendChild(warningMessage);
      }

      // ===== ===== =====

      let deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-button");
      deleteButton.innerText = "Delete";
      deleteButton.addEventListener("click", function () {
        deleteTodo(key);
      });

      let doneCheckbox = document.createElement("input");
      doneCheckbox.setAttribute("type", "checkbox");
      doneCheckbox.classList.add("done-checkbox");
      doneCheckbox.addEventListener("change", doneTodo);
      doneCheckbox.setAttribute("data-todo-id", key);

      let updateButton = document.createElement("button");
      updateButton.classList.add("update-button");
      updateButton.innerText = "Update";
      // updateButton.addEventListener("click", function () {
      //   updateTodo(key);
      // });

      todoContent.appendChild(titleHeading);
      todoContent.appendChild(titleParagraph);
      todoContent.appendChild(descriptionHeading);
      todoContent.appendChild(descriptionParagraph);
      todoContent.appendChild(dateHeading);
      todoContent.appendChild(dateParagraph);
      todoContent.appendChild(deleteButton);
      todoContent.appendChild(doneCheckbox);
      todoContent.appendChild(updateButton);

      todoElement.appendChild(todoContent);
      displayList.appendChild(todoElement);
    }
  });
}

function deleteTodo(todoId) {
  database.ref("todos/" + todoId).remove();
}

function doneTodo() {
  let parentElement = this.parentElement;
  let todoId = parentElement.querySelector(".done-checkbox").getAttribute("data-todo-id");
  console.log(todoId);

  if (this.checked) {
    database.ref("todos/" + todoId).update({ done: true });
    console.log("Uppgiften är markerad som klar");
  } else {
    database.ref("todos/" + todoId).update({ done: false });
    console.log("Uppgiften är inte markerad som klar");
  }
}

