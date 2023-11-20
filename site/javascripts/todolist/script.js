const checkedIcon = "list-item-icon fa-regular fa-circle-check";
const uncheckedIcon = "list-item-icon fa-regular fa-circle";
const deleteIcon = "list-item-icon fa-regular fa-trash-can";
const maxLength = 30;
var deleteMode = false;
var list = [];

function constructItem() {
  item = document.createElement("div");
  toggle = document.createElement("div");
  span = document.createElement("span");
  input = document.createElement("input");
  item.setAttribute("class", "list-item");
  toggle.setAttribute("class", "toggle");
  input.setAttribute("class", "text-input");
  input.setAttribute("placeholder", "Empty");
  input.setAttribute("maxlength", maxLength);
  input.setAttribute("value", "");
  span.setAttribute("class", uncheckedIcon);
  toggle.appendChild(span);
  item.appendChild(toggle);
  item.appendChild(input);
  input.addEventListener("input", saveList);
  toggle.addEventListener("click", handleToggle);
  return item;
}

function newItem() {
  disableDeleteMode();
  list.push([false, ""]);
  document.getElementById("list").appendChild(constructItem());
  saveList();
}

function handleToggle() {
  window.onbeforeunload = function () {
    return true;
  };
  var toggles = document.querySelectorAll(".toggle");
  var listItems = document.querySelectorAll(".list-item");
  this.classList.add("to-toggle");
  for (var i = 0; i < toggles.length; i++) {
    var toggleIcon = toggles[i].querySelector(".list-item-icon");
    var currentListItem = listItems[i];
    if (toggles[i].classList.contains("to-toggle")) {
      toggles[i].classList.remove("to-toggle");
      if (deleteMode == true) {
        listItems[i].remove();
        list.splice(i, 1);
      } else {
        if (list[i][0] == false) {
          list[i][0] = true;
        } else {
          list[i][0] = false;
        }
        if (toggleIcon.classList.contains("fa-circle")) {
          toggleIcon.classList.remove("fa-circle");
          toggleIcon.classList.add("fa-circle-check");
          currentListItem.classList.add("is-checked");
        } else {
          toggleIcon.classList.remove("fa-circle-check");
          toggleIcon.classList.add("fa-circle");
          currentListItem.classList.remove("is-checked");
        }
      }
    }
  }
}
function toggleDeleteMode() {
  var listItems = document.querySelectorAll(".list-item");
  var toggles = document.querySelectorAll(".list-item-icon");
  if (listItems.length > 0) {
    if (deleteMode == false) {
      deleteMode = true;
    } else {
      deleteMode = false;
    }
  } else {
    deleteMode = false;
  }
  if (deleteMode == true) {
    for (var i = 0; i < listItems.length; i++) {
      listItems[i].classList.add("is-delete");
      toggles[i].classList.remove("fa-circle", "fa-circle-check");
      toggles[i].classList.add("fa-trash-can");
    }
  }
  if (deleteMode == false) {
    for (var i = 0; i < listItems.length; i++) {
      listItems[i].classList.remove("is-delete");
      toggles[i].classList.remove("fa-trash-can");
      if (list[i][0] == true) {
        toggles[i].classList.add("fa-circle-check");
      } else {
        toggles[i].classList.add("fa-circle");
      }
    }
  }
  if (listItems.length == 0) {
    disableDeleteMode();
  }
}

function disableDeleteMode() {
  if (deleteMode == true) {
    var listItems = document.querySelectorAll(".list-item");
    var toggles = document.querySelectorAll(".list-item-icon");
    for (var i = 0; i < listItems.length; i++) {
      listItems[i].classList.remove("is-delete");
      toggles[i].classList.remove("fa-trash-can");
      if (list[i][0] == true) {
        toggles[i].classList.add("fa-circle-check");
      } else {
        toggles[i].classList.add("fa-circle");
      }
    }
    deleteMode = false;
  }
}

function saveList() {
  disableDeleteMode();
  var children = document.getElementById("list").getElementsByClassName("text-input");
  var listToSave = [];
  for (var i = 0; i < children.length; i++) {
    listToSave.push([false, children[i].value]);
  }
  list = listToSave;
  window.onbeforeunload = function () {
    return true;
  };
}

function buttonFeedback(elem) {
  var button = document.getElementById(elem);
  var buttonText = button.querySelector(".button-text");
  buttonText.innerHTML = "done";
  setTimeout(function () {
    buttonText.innerHTML = elem;
  }, 750);
}
function saveListToStorage() {
  disableDeleteMode();
  try {
    localStorage.setItem("localList", JSON.stringify(list));
    buttonFeedback("save");
    window.onbeforeunload = null;
  } catch (err) {
    alert("Storage quota exceeded. Delete some items and try again.");
  }
}

function loadList() {
  disableDeleteMode();
  var button = document.getElementById("load");
  list = JSON.parse(localStorage.getItem("localList"));
  document.getElementById("list").innerHTML = "";
  for (var i = 0; i < list.length; i++) {
    item = constructItem();
    input.setAttribute("value", list[i][1]);
    if (list[i][0] == true) {
      span.setAttribute("class", checkedIcon);
      item.classList.add("is-checked");
    } else {
      span.setAttribute("class", uncheckedIcon);
    }
    document.getElementById("list").appendChild(item);
  }
  buttonFeedback("load");
  window.onbeforeunload = null;
}

document.getElementById("new").addEventListener("click", newItem);
document.getElementById("delete").addEventListener("click", toggleDeleteMode);
document.getElementById("save").addEventListener("click", saveListToStorage);
document.getElementById("load").addEventListener("click", loadList);
if (localStorage.getItem("localList") == null) {
  saveListToStorage();
}
