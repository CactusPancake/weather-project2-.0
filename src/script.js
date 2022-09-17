function displayTemperature(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#temperature");
  let locationElement = document.querySelector("#search-input-result");
  let descriptionElement = document.querySelector("#weather-description");
  let feelsLikeElement = document.querySelector("#feels-like");
  let highOfElement = document.querySelector("#high-of");
  let lowOfElement = document.querySelector("#low-of");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind-speed");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  locationElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  highOfElement.innerHTML = Math.round(response.data.main.temp_max);
  lowOfElement.innerHTML = Math.round(response.data.main.temp_min);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = response.data.wind.speed;
}

{
  let apiKey = "203fa770242fcd2b9555d832a88ea567";
  let location = "New York";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

search("London");

function search(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-input");
  console.log(cityInputElement.value);
}

let form = document.querySelector("#location-search");
form.addEventListener("submit", search);
