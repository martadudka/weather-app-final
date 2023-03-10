function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
return days[day];
}

function displayForecast(response) {
let forecast = response.data.daily;

let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class="row">`;
forecast.forEach(function(forecastDay, index) {
  if (index < 6) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col-2">
    <strong class="week-day">${formatDay(forecastDay.time)}</strong>
      <img 
      class="forecast-weather-icon"
      src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
        forecastDay.condition.icon
      }.png" 
      alt=""
      >
      <strong class="max-temperature">${Math.round(
        forecastDay.temperature.maximum
      )}°</strong>
      <span class="min-temperature">${Math.round(
        forecastDay.temperature.minimum
      )}°</span>
  </div>
`;
  }
});

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "1d1a4ta9d508e3cb925a520dd24fdc3o";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let city = document.querySelector("#city-name");
  let degreesElement = document.querySelector("#degrees");
  let weatherDescriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let weatherIcon = document.querySelector("#current-weather-icon");

  celciusTemperature = response.data.temperature.current;

  city.innerHTML = response.data.city;
  degreesElement.innerHTML = Math.round(celciusTemperature);
  weatherDescriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  weatherIcon.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
  weatherIcon.setAttribute("alt", response.data.condition.icon);

 getForecast(response.data.coordinates);
}

function searchCity(city) {
  let apiKey = "1d1a4ta9d508e3cb925a520dd24fdc3o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function buttonSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search-input");
  searchCity(city.value);
}

function searchLocation(position) {
  let apiKey = "1d1a4ta9d508e3cb925a520dd24fdc3o";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
  let form = document.querySelector("#search-form");
  form.addEventListener("submit", buttonSubmit);

  let currentLocationButton = document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click", getCurrentLocation);

  searchCity("Kyiv");