const OWM_API_KEY = "edb242698957a35b1f39f68c33c417ad";
//API key for OpenWeatherMap (free version)
const imageFormat = "webp";
//Change this if background images are converted for
//some reason
const numBackgrounds = 6; 
//Change this if more backgrounds are added, otherwise
//the random background selector will not work properly

var ampm;
var temperature;
var locationName;
var icon;
var lat;
var lon;

function constructBackgroundElement(num) {
  if (typeof(num) === "number" && num > 0 && num <= numBackgrounds) {
    var backgroundContainer = document.getElementById("background-container");
    backgroundContainer.innerHTML="";
    var imagePath = "res/" + num + "." + imageFormat;
    var imageToAdd = document.createElement("img");
    imageToAdd.setAttribute("src", imagePath);
    imageToAdd.setAttribute("id", "background");
    backgroundContainer.appendChild(imageToAdd);
  }
}
function setRandomBackground() {
  var backgroundSelector = document.getElementById("background-selector");
  var random = Math.floor(Math.random() * (numBackgrounds - 1 + 1)) + 1;
  constructBackgroundElement(random);
  backgroundSelector.value = random;
}
function setSelectedBackground() {
  var backgroundSelector = document.getElementById("background-selector");
  var value = backgroundSelector.value;
  constructBackgroundElement(value);
  backgroundSelector.value = value;
}
function setWeatherDisplay() {
  var weatherText = document.getElementById("weather-text");
  var weatherSelector = document.getElementById("weather-disp-selector");
  var value = weatherSelector.value;
  if (value == "hide") {
    weatherText.style.display = "none";
  } else {
    weatherText.style.display = "block";
  }
}
function setSecondsDisplay() {
  var secondsIndicator = document.getElementById("seconds-indicator");
  var secondsSelector = document.getElementById("seconds-disp-selector");
  var value = secondsSelector.value;
  if (value == "hide") {
    secondsIndicator.style.display = "none";
  } else {
    secondsIndicator.style.display = "block";
  }
}
function setAmPmDisplay() {
  var amPmIndicator = document.getElementById("ampm-indicator");
  var amPmSelector = document.getElementById("ampm-disp-selector");
  var value = amPmSelector.value;
  if (value == "hide") {
    amPmIndicator.style.display = "none";
  } else {
    amPmIndicator.style.display = "block";
  }
}
function constructRequestUrl() {
  var url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial&appid=" +
    OWM_API_KEY;
  return url;
}
function updateWeather() {
  if (navigator.geolocation) {
    var options = { enableHighAccuracy: false };
    navigator.geolocation.getCurrentPosition(
      setWeather,
      showErrorIcon,
      options
    );
  } else {
    showErrorIcon();
  }
}
async function setWeather(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  const weatherTemp = document.getElementById("weather-temp");
  const weatherIcon = document.getElementById("weather-icon");
  const req = new Request(constructRequestUrl());
  const res = await fetch(req);
  const weatherData = await res.json();
  temperature = Math.floor(weatherData["main"]["temp"]);
  icon = weatherData["weather"][0]["icon"];
  locationName = weatherData["name"];
  var weatherString = temperature + "°F - " + locationName;
  weatherTemp.innerText = weatherString;
  weatherIcon.setAttribute("data", "res/" + icon + ".svg");
}
function showErrorIcon() {
  var weatherIcon = document.getElementById("weather-icon");
  var weatherTemp = document.getElementById("weather-temp");
  weatherTemp.innerText = "Location error";
  weatherIcon.setAttribute("data", "res/circle-xmark.svg");
}
function formatTime(hour, minute) {
  var time;
  if (hour > 12) {
    ampm = "pm";
    hour -= 12;
  } else {
    ampm = "am";
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  time = hour + ":" + minute;
  return time;
}
function formatSeconds(second) {
  if (second < 10) {
    second = "0" + second;
  }
  return second;
}
function updateTime() {
  var timeHeader = document.getElementById("time-header");
  var amPmIndicator = document.getElementById("ampm-indicator");
  var secondsIndicator = document.getElementById("seconds-indicator");
  var date = new Date();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  timeHeader.innerText = formatTime(hour, minute);
  amPmIndicator.innerText = ampm;
  secondsIndicator.innerText = formatSeconds(second);
}
function showDialog() {
  var dialog = document.getElementById("dialog");
  dialog.showModal();
}
function hideDialog() {
  var dialog = document.getElementById("dialog");
  dialog.close();
}
document.getElementById("options-button").addEventListener("click", showDialog);
document.getElementById("close-button").addEventListener("click", hideDialog);
setRandomBackground();
updateTime();
updateWeather();
setInterval(updateTime, 1000);
setInterval(updateWeather, 120000);
