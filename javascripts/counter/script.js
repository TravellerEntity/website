let counter = 0;
document.getElementById("counter").innerText = counter;
function resetCounter(e) {
  e.preventDefault();
  e.stopImmediatePropagation();
  counter = 0;
  document.getElementById("counter").innerText = counter;
}

function checkInput(e) {
  e.preventDefault();
  e.stopImmediatePropagation();
  if (e.repeat) return;
  if (e.code === "Space") {
    counter++;
    document.getElementById("counter").innerText = counter;
  } 
  if (e.button === 0) {
    counter++;
    document.getElementById("counter").innerText = counter;
  }
}

document.addEventListener("keydown", checkInput);
document.addEventListener("mousedown", checkInput);
document.getElementById("reset-button").addEventListener("click", resetCounter);


