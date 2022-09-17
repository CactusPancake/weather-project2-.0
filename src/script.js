//------------------------------- Time -------------------------------
let now = new Date();

let timeElement = document.querySelector("#current-date");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let hours = now.getHours();
let minutes = now.getMinutes();
let day = days[now.getDay()];

if (minutes < 9) {
  minutes = "0" + minutes;
}

if (hours < 9) {
  hours = "0" + hours;
}

timeElement.innerHTML = `${day}  ${hours}:${minutes}`;

//------------------------------- Weather -------------------------------
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let locationElement = document.querySelector("#search-input-result");
  let descriptionElement = document.querySelector("#weather-description");
  let feelsLikeElement = document.querySelector("#feels-like");
  let highOfElement = document.querySelector("#high-of");
  let lowOfElement = document.querySelector("#low-of");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#main-icon");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  locationElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  highOfElement.innerHTML = Math.round(response.data.main.temp_max);
  lowOfElement.innerHTML = Math.round(response.data.main.temp_min);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
  iconElement.setAttribute("src", `img/${response.data.weather[0].icon}.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

//------------------------------- Location Search -------------------------------
function search(city) {
  let apiKey = "203fa770242fcd2b9555d832a88ea567";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#location-search");
form.addEventListener("submit", handleSubmit);

search("London");
//------------------------------- Current Location Button -------------------------------
function currentCity(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "91e4be9d3f0ce62462b88df7804804ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentCity);
}

let currentButton = document.querySelector("#current-btn");
currentButton.addEventListener("click", getCurrentLocation);

/*------------------------------- Celcius | Fahrenheit links -------------------------------
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahr);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelc);

function showFahr(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  temp.innerHTML = `66`;
}

function showCelc(event) {
  event.preventDefault();
  let temp = document.querySelector("#temp");
  temp.innerHTML = `20`;
}
*/
