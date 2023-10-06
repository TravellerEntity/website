const OWM_API_KEY = "edb242698957a35b1f39f68c33c417ad";
var ampm;
var temperature;
var locationName;
var lat;
var lon;
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
    navigator.geolocation.getCurrentPosition(setWeather, showErrorIcon);
  } else {
    showErrorIcon();
  }
}
async function setWeather(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  const reqUrl = constructRequestUrl();
  const req = new Request(reqUrl);
  const res = await fetch(req);
  const weatherData = await res.json();
  temperature = Math.floor(weatherData["main"]["temp"]);
  locationName = weatherData["name"];
  var weatherString = temperature+"°F in "+locationName;
  var weatherTemp = document.getElementById("weather-temp");
  weatherTemp.innerText = weatherString;
}
function showErrorIcon() {
  var weatherIcon = document.getElementById("weather-icon");
  var weatherTemp = document.getElementById("weather-temp");
  weatherTemp.innerText = "No location";
  weatherIcon.className = "";
  weatherIcon.classList.add("fa-solid");
  weatherIcon.classList.add("fa-question");
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
function updateTime() {
  var timeHeader = document.getElementById("time-header");
  var amPmIndicator = document.getElementById("ampm-indicator");
  var date = new Date();
  var hour = date.getHours();
  var minute = date.getMinutes();
  timeHeader.innerText = formatTime(hour, minute);
  amPmIndicator.innerText = ampm;
}
updateTime();
updateWeather();
setInterval(updateTime, 1000);
setInterval(updateWeather, 120000);