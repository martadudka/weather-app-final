function displayWeather(response) {
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
}

let apiKey = "1d1a4ta9d508e3cb925a520dd24fdc3o";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Lisbon&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayWeather);
