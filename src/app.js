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

function displayWeather(response) {
document.querySelector("#city-name").innerHTML = response.data.name;
let degreesElement = document.querySelector("#degrees");
degreesElement.innerHTML = Math.round(response.data.temperature.current);

let cityNameElement = document.querySelector("#city-name");
cityNameElement.innerHTML = response.data.city;

let weatherDescriptionElement = document.querySelector("#weather-description");
weatherDescriptionElement.innerHTML = response.data.condition.description;

let humidityElement = document.querySelector("#humidity");
humidityElement.innerHTML = response.data.temperature.humidity;

let windElement = document.querySelector("#wind");
windElement.innerHTML = Math.round(response.data.wind.speed);

let dateElement = document.querySelector("#date");
dateElement.innerHTML = formatDate(response.data.time * 1000);

let weatherIcon = document.querySelector("#current-weather-icon");
weatherIcon.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
weatherIcon.setAttribute("alt", response.data.condition.icon);
}

function searchCity(city) {
let apiKey = "1d1a4ta9d508e3cb925a520dd24fdc3o";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeather);
}

function buttonSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search-input").value;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", buttonSearch);

searchCity("Kyiv");
