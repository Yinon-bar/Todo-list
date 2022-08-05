// מאפיינים גלובלים

let taskName = document.querySelector("#task-name");
let taskDate = document.querySelector("#task-date");
let taskTime = document.querySelector("#task-time");
let noteSection = document.querySelector("#notes_section");

// יצירת מערך גלובלי
let taskArray = [];

// בדיקה האם יש לנו "משימות" בזכרון
// ואם כן, להדפיס אותם לדום
function getTasks(arg) {
  if (localStorage.getItem("tasks")) {
    let arrTask = JSON.parse(localStorage.getItem("tasks"));
    taskArray = [];
    noteSection.innerHTML = "";
    for (task of arrTask) {
      // console.log(task);
      task.id = taskArray.length;
      taskArray.push(task);
      renderElement(task, arg);
    }
  } else {
    noteSection.innerHTML = "";
  }
}

// יצירת משימות חדשות
function createTask() {
  // מניעה של שליחת הטופס
  event.preventDefault();

  // בדיקת נתונים
  function auth() {
    if (taskName.value == "" || taskDate.value == "" || taskTime.value == "") {
      alert("אנא מלא את כל השדות");
      return;
    } else {
      // רק במידה והשדות מלאים ניתן להמשיך
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
      saveToLocal(taskArray);
    }
  }
  auth();
}

function resetForm() {
  let form = document.querySelector("#form");
  form.reset();
}

function manualReset() {
  taskName.value = "";
  taskDate.value = "";
  taskTime.value = "";
}

// שמירת המערך אזורית
function saveToLocal(taskArr) {
  localStorage.setItem("tasks", JSON.stringify(taskArr));
}

function renderElement(obj = "", arg = "") {
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

  // בדיקה האם לבצע את האנימציה
  // הצעה של ירון לעשות קוורי סלקטור לכולם ולא לאחד
  let animDiv = document.querySelector(".anim");
  if (arg) {
    animDiv.classList.remove("anim");
  } else {
    setTimeout(function () {
      animDiv.classList.remove("anim");
      manualReset();
    }, 400);
  }
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
  taskArray.splice(objId, 1);
  console.log(taskArray);
  saveToLocal(taskArray);
  // יש לקרוא לפונקציה שבודקת האם יש משימות ב"זכרון" ולרנדר אותם
  // ןלהכניס לה ארגומנט כדי שהפונקציה תדע שהיא הגיעה מכאן
  getTasks("doNotAnim");
}

function deleteAll() {
  event.preventDefault();
  taskArray = [];
  localStorage.clear();
  getTasks();
}
