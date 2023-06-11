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


// function writeUserData(title, description, endDate) {
//   ref.set({
//     title: title,
//     description: description,
//     endDate: endDate,
//     done: false,
//   });
// }

//  //========

// document.addEventListener("DOMContentLoaded", function () {
//   let todoBtn = document.getElementById("add-todo");
//   todoBtn.addEventListener("click", addTodo);
// });

// function addTodo() {
//   let titleInput = document.getElementById("todo-title").value;
//   let description = document.getElementById("todo-desc").value;
//   let date = document.getElementById("todo-date").value;

//   writeUserData(titleInput, description, date);
//   titleInput = "";
//   description = "";
//   date = "";
//   let todoTitle = titleInput.value;

//   if (todoTitle) {
//     let todoTitle = document.createElement("li");
//     todoTitle.innerText = todoTitle;
//     todoTitle.addEventListener("click", onClickTodoItem);
//     const todoList = document.getElementById("todo-list");
//     todoList.append(todoTitle);
//     console.log(todoList);
//   }
// }


// // === function displayTodoList ===

// function displayTodoList() {
//   //console.log(params);
//   let displayList = document.querySelector(".display-todo");
//   // Hämta data från en specifik sökväg i databasen
//   ref.on(
//     "value",
//     function (snapshot) {
//       let data = snapshot.val();
//       console.log(data);
//       //displayList.innerHtml = "";
      
//        //for (let key in data) {
//         //let todo = data[key];
//         displayList.innerHTML += `<div class="display-things">
//           <div class="todoDiv">
//           <h4>Title:</h4> 
//           <p class="header-display"> ${data["title"]} </p> 
//           <h4>Description: </h4>   
//           <p class="header-display">${data["description"]}</p>
//           <h4>Date: </h4> 
//           <p class="header-display">${data["endDate"]}</p>
          
//           <h4>Markera som klar:</h4>
//           <button class="delete-button">Delete</button>
//           <input type="checkbox" class="done-checkbox">
//           <button class="update-button">Update</button>
//           </div>
//         </div>`;

        
//         //  <button class="done-button">Done</button>
//        //}

// // ===== Delete-knappen/ click =====

//       let deleteButtons = document.getElementsByClassName("delete-button");
//       for (let i = 0; i < deleteButtons.length; i++) {
//         deleteButtons[i].addEventListener("click", deleteTodo);
//       };

// // ===== Done-checkbox/ click =====

//       // let doneButtons = document.getElementsByClassName("done-button");
//       // for (let i = 0; i < doneButtons.length; i++) {
//       //   doneButtons[i].addEventListener("click", doneTodo);
//       // }

//       let doneCheckboxes = document.getElementsByClassName("done-checkbox");
//       for (let i = 0; i < doneCheckboxes.length; i++) {
//         doneCheckboxes[i].addEventListener("change", doneTodo);
//       }

// // // ===== Update-knappen =====



//     },

//     // ...  ...
//   );
// }



// // ===== "delete todo" function =====

// function deleteTodo() {
//   // borttagning av todo
//   console.log("Funktionen deleteTodo körs");

//   // Hämta referensen till förälderelementet som innehåller den klickade delete-knappen
//   let parentElement = this.parentElement;
//   let todoId = parentElement.getAttribute("data-todo-id");

//   // Ta bort hela förälderelementet från DOM
//   parentElement.remove();

//   // Ta bort todo från Firebase
//   database.ref("todos/" + todoId).remove();
// }  

// // ===== "markera/ avmarkera todo som done" function=====

// // ===== function doneTodo med checkboxen =====

// function doneTodo() {
//   let parentElement = this.parentElement;
//   let todoId = parentElement.getAttribute("data-todo-id");
//   console.log(todoId);

//   if (this.checked) {
    
//     database.ref("todos/" + todoId).update({ done: true });
//     console.log("Uppgiften är markerad som klar");
//   } else {
//     database.ref("todos/" + todoId).update({ done: false });
//     console.log("Uppgiften är inte markerad som klar");
//   }
// }


// // ===== "update todo" function =====




// //     },
// //     function (error) {
// //       console.log("Fel vid hämtning av data: " + error.code);
// //     }
// //   );
// // }

// displayTodoList();



// ===== Olga =====


// firebase.initializeApp(firebaseConfig);

// let database = firebase.database();
// let ref = database.ref("todos");

document.addEventListener("DOMContentLoaded", function () {
  let todoBtn = document.getElementById("add-todo");
  todoBtn.addEventListener("click", addTodo);

  displayTodoList();
});

function addTodo() {
  let titleInput = document.getElementById("todo-title").value;
  let description = document.getElementById("todo-desc").value;
  let date = document.getElementById("todo-date").value;

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