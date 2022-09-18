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

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//------------------------------- Forecast Layout -------------------------------

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `    
          <div class="weather-forcast-date">${formatForecastDay(
            forecastDay.dt
          )} <img src="img/${
          forecastDay.weather[0].icon
        }.png" id="main-icon" alt="clear sky"
              class="forecast-icon" />

            <span class="temperature-max">${Math.round(
              forecastDay.temp.max
            )}°</span> |
            <span class="temperature-min"> ${Math.round(
              forecastDay.temp.min
            )}°</span>

          
        </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//------------------------------- Forecast API --------------------------

function getForecast(coordinates) {
  console.log(coordinates);

  let apiKey = "203fa770242fcd2b9555d832a88ea567";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

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
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute("src", `img/${response.data.weather[0].icon}.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
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

//------------------------------- Celsius | Fahrenheit links -------------------------------
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
search("London");
