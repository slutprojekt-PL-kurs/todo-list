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
};``
firebase.initializeApp(firebaseConfig);

let database = firebase.database();
// Initialize Firebase
let ref = database.ref("todos");


document.addEventListener("DOMContentLoaded", function () {
  let todoBtn = document.getElementById("add-todo");
  todoBtn.addEventListener("click", addTodo);

  loadMarkedTodoIds(); // återställa markerade todos från localStorage

  displayTodoList();
});

function addTodo() {
  let titleInput = document.getElementById("todo-title").value;
  let description = document.getElementById("todo-desc").value;
  let date = document.getElementById("todo-date").value;

  if (titleInput === "" || description === "" || date === "") {
    alert("Var vänlig fyll i alla fält");
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
      todoContent.id = key;
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

      // ===== Varning när slutdatum närnar sig =====

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

      updateButton.addEventListener("click", updateTodo);
      /* updateButton.addEventListener("click", function () {
        updateTodo(key);
      }); */

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

    loadMarkedTodoIds(); // återställa markerade todos från localStorage
    updateTodoDisplay(); // uppdatera visningen av markerade todos
  });
}



function deleteTodo(todoId) {
  // ta bort todo från databasen
  database.ref("todos/" + todoId).remove();

  // kontrollera om todo-id:t finns i markedTodoIds arrayen
  const index = markedTodoIds.indexOf(todoId);
  if (index >= 0) {
    // ta bort id:t från markedTodoIds arrayen
    markedTodoIds.splice(index, 1);

    // uppdatera localStorage med den uppdaterade arrayen
    localStorage.setItem("markedTodoIds", JSON.stringify(markedTodoIds));
  }
}

let markedTodoIds = [];

function doneTodo() {
  let parentElement = this.parentElement;
  let todoId = parentElement.querySelector(".done-checkbox").getAttribute("data-todo-id");
  console.log(todoId);

  if (this.checked) {
    database.ref("todos/" + todoId).update({ done: true });
    console.log("Uppgiften är markerad som klar");
    markedTodoIds.push(todoId); // lägg till id i markerade todos
  } else {
    database.ref("todos/" + todoId).update({ done: false });
    console.log("Uppgiften är inte markerad som klar");
    const index = markedTodoIds.indexOf(todoId);
    if (index !== -1) {
      markedTodoIds.splice(index, 1); // ta bort id från markerade todos
    }
  }

  updateTodoDisplay(); // uppdatera visningen av markerade todos
  saveMarkedTodoIds(); // spara i localStorage
}

function updateTodoDisplay() {
  const checkboxes = document.querySelectorAll(".done-checkbox");

  checkboxes.forEach((checkbox) => {
    const todoId = checkbox.getAttribute("data-todo-id");
    checkbox.checked = markedTodoIds.includes(todoId); // markera checkboxen om id finns i markerade todos
  });
}

function saveMarkedTodoIds() {
  localStorage.setItem("markedTodoIds", JSON.stringify(markedTodoIds));
}

function loadMarkedTodoIds() {
  const savedMarkedTodoIds = localStorage.getItem("markedTodoIds");
  if (savedMarkedTodoIds) {
    markedTodoIds = JSON.parse(savedMarkedTodoIds);
    updateTodoDisplay();

  }
}


function updateTodo(event) {
  const parent = event.target.parentNode;
  const docId = parent.id;
  const updateRef = firebase.database().ref("todos/" + docId);

  const currentTitle = document.querySelector(
    `#${docId} p:nth-of-type(1)`
  ).innerText;
  const currentDescription = document.querySelector(
    `#${docId} p:nth-of-type(2)`
  ).innerText;
  const currentEndDate = document.querySelector(
    `#${docId} p:nth-of-type(3)`
  ).innerText;

  //Modal
  const modal = document.getElementById("updateModal");
  modal.style.display = "block";
  const modalContent = document.getElementsByClassName("modal-content")[0];
  modalContent.innerHTML = "";
  const titleInput = document.createElement("input");
  const descriptionInput = document.createElement("textarea");
  const datePicker = document.createElement("input");
  const updateBtn = document.createElement("button");
  const cancelBtn = document.createElement("button");
  updateBtn.innerText = "Update Changes";
  cancelBtn.innerText = "Cancel";
  titleInput.type = "text";
  datePicker.type = "date";
  titleInput.value = currentTitle;
  descriptionInput.value = currentDescription;
  datePicker.value = currentEndDate;
  modalContent.appendChild(titleInput);
  modalContent.appendChild(descriptionInput);
  modalContent.appendChild(datePicker);
  modalContent.appendChild(updateBtn);
  modalContent.appendChild(cancelBtn);
  cancelBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
  updateBtn.addEventListener("click", () => {
    console.log(docId);

    updateRef.once("value").then((snapshot) => {
      const data = snapshot.val();

      updateRef
        .update({
          title: titleInput.value,
          description: descriptionInput.value,
          endDate: datePicker.value,
        })
        .then(() => {
          console.log("Document updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating document:", error);
        });
      modal.style.display = "none";
      displayTodoList();
    });
  });
}