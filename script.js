// מאפיינים גלובלים

const taskName = document.querySelector("#task-name");
const taskDate = document.querySelector("#task-date");
const taskTime = document.querySelector("#task-time");
const noteSection = document.querySelector("#notes_section");

// יצירת מערך גלובלי
let taskArray = [];

// מונה משימות
// let counter = 0;

// בדיקה האם יש לנו "משימות" בזכרון
// ואם כן, להדפיס אותם לדום
function getTasks() {
  if (localStorage.getItem("tasks")) {
    let arrTask = JSON.parse(localStorage.getItem("tasks"));
    taskArray = [];
    noteSection.innerHTML = "";
    for (task of arrTask) {
      // console.log(task);
      task.id = taskArray.length;
      taskArray.push(task);
      renderElement(task);
      // console.log(task);
      // counter++;
      // console.log(taskArray);
    }
  }
}

function createTask() {
  // מניעה של שליחת הטופס
  event.preventDefault();

  // איסוף של כל המידע לאובייקט אחד
  const taskObj = {
    id: taskArray.length,
    task: taskName.value,
    date: taskDate.value,
    time: taskTime.value,
  };
  console.log(taskObj);
  taskArray.push(taskObj);
  console.log(taskArray);

  renderElement(taskObj);
  // counter++;
  saveToLocal(taskArray);
}

// שמירת המערך אזורית
function saveToLocal(arr) {
  localStorage.setItem("tasks", JSON.stringify(arr));
}

function renderElement(obj) {
  noteSection.innerHTML += `
  <div class="note anim" id="note_${obj.id}" onmouseenter="trashHover(${obj.id})" onmouseleave="trashHover(${obj.id})">
  <div class="task-content">
  <button id="btn_trash_${obj.id}" class="trash_hide" onclick="deleteTask(${obj.id})"><i class="fa-solid fa-trash-can"></i></button>
  <p>
  ${obj.task}
  </p>
  </div>
  <div class="date">${obj.date}</div>
  <div class="time">${obj.time}</div>
  </div>
  `;
  // const noteAnim = document.getElementById(`note_${obj.id}`);
  // noteAnim.classList.add("note");
  // noteAnim.classList.add("anim");

  // resetForm();
  // const noteAnim = document.getElementById(`note_${obj.id}`);
  // // console.log(noteAnim);
  // noteAnim.classList.add("anim");
  // noteAnim.classList.remove("anim");
  // noteAnim.style.animationIterationCount = "1";
}

function resetForm() {
  const form = document.querySelector("#form");
  form.reset();
}

// לחצן מחיקה
function trashHover(arg) {
  // console.log(arg);
  let btn = document.querySelector(`#btn_trash_${arg}`);
  if (btn.classList == "trash_hide") {
    btn.classList.remove("trash_hide");
    btn.classList.add("trash_show");
  } else {
    btn.classList.remove("trash_show");
    btn.classList.add("trash_hide");
  }
}

function deleteTask(objId) {
  // location.reload();
  // localStorage.clear();
  taskArray.splice(objId, 1);
  console.log(taskArray);
  saveToLocal(taskArray);
  getTasks();
}
