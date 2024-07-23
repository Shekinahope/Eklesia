function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#weather-app-city");
  let descriptionElement = document.querySelector("#description");

  let humidityElement = document.querySelector("#humid");

  let windElement = document.querySelector("#speed");

  let timeElement = document.querySelector("#time");

  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  icon.innerHTML = `<img
      src="${response.data.condition.icon_url}"
      class="temp-icon"
    />
  `;

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  temperatureElement.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  windElement.innerHTML = `${response.data.wind.speed}km/h`;

  getForecast(response.data.city);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day} ${hours}:${minutes},`;
}
function searchCity(city) {
  let apiKey = "13353e672oa3f715a42c6bb0570t4a46";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  //let city = searchInput.value;

  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}
function getForecast(city) {
  let apiKey = "13353e672oa3f715a42c6bb0570t4a46";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query={query}&key={key}https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let days = ["Wed", "Thur", "Fri", "Sat", "Sun"];
  let forecastHtml = "";
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="weather-forecast-day">
            <div class="weather-forecast-date">${day}</div>
            <div class="weather-forecast-icon">🌥</div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
                <strong>15°</strong>
              </div>
              <div class="weather-forecast-temperature">9°</div>
            </div>
          </div>`;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Nairobi");
