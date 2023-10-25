let counter = 0;
document.getElementById("counter").innerText = counter;

function resetCounter(e) {
  e.stopImmediatePropagation();
  counter = 0;
  document.getElementById("counter").innerText = counter;
}

function checkSpacebar(e) {
  e.preventDefault();
  if (e.repeat) return;
  if (e.code === "Space") {
    counter++;
    document.getElementById("counter").innerText = counter;
  }
}

function checkClick(e) {
  e.preventDefault();
  if (e.button === 0) {
    counter++;
    document.getElementById("counter").innerText = counter;
  }
}
document.addEventListener("keydown", checkSpacebar);

document.addEventListener("mousedown", checkClick);

document.getElementById("reset-button").addEventListener("mousedown", resetCounter);
