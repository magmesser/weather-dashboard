var APIKey = "548fe189ee5f7583e55d370db86c3c22";
var currentDay = moment().format("L");
var forecastContainer = document.querySelector("#forecastContainer");
var fiveDayContainer = document.querySelector("#fiveDayContainer");
var searchForm = document.querySelector("#searchForm");
var cityInput = document.querySelector("#cityInput");
var searchHistory = document.getElementById("previous-search");
var weather = document.getElementById("weather");
var temperature = document.getElementById("temperature");
var humidity = document.getElementById("humidity");
var wind = document.getElementById("wind");

// api call per city input
var getWeatherForecast = function (city) {
  var apiURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey +
    "&units=imperial";

  fetch(apiURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayWeatherSearch(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })

    .catch(function (error) {
      alert("Unable to reach OpenWeather");
    });
};

// user input submit
var citySearchSubmit = function (event) {
  event.preventDefault();

  var cityName = cityInput.value.trim();

  if (cityName) {
    getWeatherForecast(cityName);

    cityInput.value = "";
  } else {
    alert("Please enter a city");
  }
};

// manipulating called data
var displayWeatherSearch = function (weatherData) {
  var weatherHeadingEl = document.createElement("h2");
  weatherHeadingEl.textContent = weatherData.name + " (" + currentDay + ")";
  forecastContainer.append(weatherHeadingEl);

  weather.textContent = "Weather: " + weatherData.weather[0].main;
  temperature.textContent = "Temperature: " + weatherData.main.temp + "°F";
  humidity.textContent = "Humidity: " + weatherData.main.humidity + "%";
  wind.textContent = "Wind: " + weatherData.wind.speed + " mph";

  var history = [];
  var value = weatherData.name;
  var historyBtn = document.createElement("button");
  historyBtn.textContent = value;
  searchHistory.append(historyBtn);

  history.push(value);

  console.log(value);
  localStorage.setItem("history", value);
  localStorage.getItem("history", value);

  let lat = weatherData.coord.lat;
  let lon = weatherData.coord.lon;

  var apiCoordURL =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    APIKey +
    "&units=imperial";

  // api call for lat and lon
  fetch(apiCoordURL).then(function (response) {
    response.json().then(function (data) {
      console.log(data);

      for (var i = 1; i <= 5; i++) {
        // card
        var forecastCardEl = document.createElement("div");
        forecastCardEl.classList =
          "col-2 py-3 p-1 card text-center text-white bg-info";

        // card body
        var cardBodyEl = document.createElement("div");
        cardBodyEl.classList = "card-body p-1";
        forecastCardEl.append(cardBodyEl);

        // card title
        var cardTitleEl = document.createElement("h5");
        cardTitleEl.classList = "card-title";
        cardTitleEl.textContent = moment().add(i, "d").format("l");
        cardBodyEl.append(cardTitleEl);

        // card UL
        var cardListEl = document.createElement("ul");
        cardListEl.classList = "card-text";
        cardBodyEl.append(cardListEl);

        // card temp
        var cardTempEl = document.createElement("li");
        cardTempEl.textContent = "Temp: " + data.list[i].main.temp + "°F";
        cardListEl.append(cardTempEl);

        // // card weather
        // var cardWeatherEl = document.createElement('li');
        // cardWeatherEl.textContent = "Weather: " + data.list[i].weather[0].main;
        // cardListEl.append(cardWeatherEl);

        // card humidity
        var cardHumidEl = document.createElement("li");
        cardHumidEl.textContent =
          "Humidity: " + data.list[i].main.humidity + "%";
        cardListEl.append(cardHumidEl);

        // card wind
        var cardWindEl = document.createElement("li");
        cardWindEl.textContent = "Wind: " + data.list[i].wind.speed + " mph";
        cardListEl.append(cardWindEl);

        fiveDayContainer.append(forecastCardEl);
      }
    });
  });
};

// submit event listener
searchForm.addEventListener("submit", citySearchSubmit);
