/* Firebase */
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyA41vqCO9CIDICVD_YUAzwknHZ-0gzDByA",
    authDomain: "slutuppgift-cd6fc.firebaseapp.com",
    databaseURL: "https://slutuppgift-cd6fc-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "slutuppgift-cd6fc",
    storageBucket: "slutuppgift-cd6fc.appspot.com",
    messagingSenderId: "1089764169541",
    appId: "1:1089764169541:web:824a50162eab726448502c",
    measurementId: "G-ZHC77BMQQE"
  };

const app = initializeApp(firebaseConfig);

document.addEventListener("DOMContentLoaded", function(){
    const addTodoButton = document.getElementById("add-todo")

    addTodoButton.addEventListener("click", addTodo)
}
)


function addTodo(){
  const todoTextInput = document.getElementById("todo-text")
   const todoText = todoTextInput.value
   todoTextInput.value= ""

   console.log(todoText)

   if(todoText){ 
    const todoItem= document.createElement("li")

    todoItem.innerText= todoText
    todoItem.addEventListener("click" , onClickTodoItem)

    const todoList = document.getElementById("todo-list")

    todoList.append(todoItem)
   }
}

function onClickTodoItem(){
   this.classList.toggle("todo-done")

}