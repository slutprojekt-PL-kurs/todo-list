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

const database = firebase.database();
// Initialize Firebase

const ref = database.ref("todos");
function writeUserData(title, description, endDate) {
  const newTodo = ref.push();
  //Lägg till .flash funktion för att spara senaste tilllägget
  newTodo.set({
    title: title,
    description: description,
    endDate: endDate,
    done: false,
  });
}

document.addEventListener("DOMContentLoaded", function () {
  let todoBtn = document.getElementById("add-todo");
  todoBtn.addEventListener("click", addTodo);
});

function addTodo() {
  let titleInput = document.getElementById("todo-title").value;
  let description = document.getElementById("todo-desc").value;
  let date = document.getElementById("todo-date").value;

  writeUserData(titleInput, description, date);
  titleInput = "";
  description = "";
  date = "";
  let todoTitle = titleInput.value;

  if (todoTitle) {
    let todoTitle = document.createElement("li");
    todoTitle.innerText = todoTitle;
    todoTitle.addEventListener("click", onClickTodoItem);
    const todoList = document.getElementById("todo-list");
    todoList.append(todoTitle);
  }
}

function displayTodoList() {
  //console.log(params);
  let displayList = document.querySelector(".display-todo");
  // Hämta data från en specifik sökväg i databasen
  displayList.innerHTML = "";
  ref.once(
    "value",
    function (snapshot) {
      Object.keys(snapshot.val()).forEach((key) => {
        let data = snapshot.val()[key];
        console.log(data);

        // for (let key in data) {
        displayList.innerHTML += `<div id="${key}" class="display-things">
          <h4>Title:</h4> 
          <p class="header-display"> ${data["title"]} </p> 
          <h4>Description: </h4>   
          <p class="header-display">${data["description"]}</p>
          <h4>Date: </h4> 
          <p class="header-display">${data["endDate"]}</p>
          <button class="done-button">Done</button>
          <button class="delete-button">Delete</button>
          <button class="update-button">Update</button>
          </div>`;
      });
      // }

      // ===== Delete-knappen/ deleteTodo =====

      let deleteButtons = document.getElementsByClassName("delete-button");
      for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", deleteTodo);
      }

      // ===== Done-knappen/ done =====

      let doneButtons = document.getElementsByClassName("done-button");
      for (let i = 0; i < doneButtons.length; i++) {
        doneButtons[i].addEventListener("click", doneTodo);
      }

      // ===== Update-knappen =====

      let updateButtons = document.getElementsByClassName("update-button");
      for (let i = 0; i < updateButtons.length; i++) {
        updateButtons[i].addEventListener("click", updateTodo);
      }
    }

    // ...  ...
  );
}

// ===== "delete todo" function =====

function deleteTodo() {
  // borttagning av todo
  console.log("Funktionen deleteTodo körs");

  // Hämta referensen till förälderelementet som innehåller den klickade delete-knappen
  let parentElement = this.parentElement;

  // Ta bort hela förälderelementet från DOM
  parentElement.remove();
}

// ===== "markera todo som done" function=====

function doneTodo() {
  // Hämta referensen till förälderelementet som innehåller den klickade done-knappen
  let parentElement = this.parentElement;

  // Uppdatera klassen på "Done"-knappen för att markera uppgiften som klar
  this.classList.add("done");

  // Alternativt: Sätt done-attributet till true i databasen för att markera uppgiften som klar
  let todoId = parentElement.getAttribute("data-todo-id");
  database.ref("todos/" + todoId).update({ done: true });
  console.log(todoId);
}

// ===== "update todo" function =====
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

  //const currentTitle = document.querySelector(`#${docId} p`)[0].innerText;
  //const currentDescription = document.querySelector(`#${docId} p`)[1].innerText;
  //const currentEndDate = document.querySelector(`#${docId} p`)[2].innerText;
  //Modal
  const modal = document.getElementById("updateModal");
  modal.style.display = "block";
  const modalContent = document.getElementsByClassName("modal-content")[0];
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

      //let newtitle = prompt("Enter new title: ", data.title);

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

//     },
//     function (error) {
//       console.log("Fel vid hämtning av data: " + error.code);
//     }
//   );
// }

displayTodoList();
