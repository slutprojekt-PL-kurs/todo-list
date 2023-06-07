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

function writeUserData(title, description, endDate) {
  ref.set({
    title: title,
    description: description,
    endDate: endDate,
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

function onClickTodoItem() {
  this.classList.toggle("todo-done");
}

function displayTodoList(params) {
  let displayList = document.querySelector(".display-todo");
  // Hämta data från en specifik sökväg i databasen
  ref.on(
    "value",
    function (snapshot) {
      let data = snapshot.val();
      console.log(data);
      for (let key in data) {
        displayList.innerHTML = `<div class="display-things">
        <h4>Email:</h4> <p class="header-display"> ${data["email"]} </p> 
        <h4>Profile_picture: </h4>   <p class="header-display">${data["profile_picture"]}</p>
          <h4>Username: </h4> <p class="header-display">${data["username"]}</p>
          </div>`;
      }
    },
    function (error) {
      console.log("Fel vid hämtning av data: " + error.code);
    }
  );
}
displayTodoList();
