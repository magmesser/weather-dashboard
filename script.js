var APIKey = "548fe189ee5f7583e55d370db86c3c22";
var currentDay = moment().format("L");
var forecastContainer = document.querySelector("#forecastContainer");
var fiveDayContainer = document.querySelector("#fiveDayContainer");
var searchForm = document.querySelector("#searchForm");
var cityInput = document.querySelector("#cityInput");

var weather = document.getElementById('weather');
var temperature = document.getElementById('temperature');
var humidity = document.getElementById('humidity');
var wind = document.getElementById('wind');

let searchHistory = [];
let lastCitySearched = "";

var getWeatherForecast = function(city) {
  var apiURL =
    "http://api.openweathermap.org/data/2.5/weather?q=" + city +
    "&appid=" +
    APIKey + "&units=imperial";

  fetch(apiURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function(data) {
            displayWeatherSearch(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
        
    })

    .catch(function(error){
        alert("Unable to reach OpenWeather");
    })
};

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

var displayWeatherSearch = function(weatherData) {
    var weatherHeadingEl = document.createElement("h2");
    weatherHeadingEl.textContent = weatherData.name + " (" + currentDay + ")";
    forecastContainer.append(weatherHeadingEl);

    weather.textContent = "Weather: " + weatherData.weather[0].main;
    temperature.textContent = "Temperature: " + weatherData.main.temp + "°F";
    humidity.textContent = "Humidity: " + weatherData.main.humidity + "%";
    wind.textContent = "Wind: " + weatherData.wind.speed + " mph";

    let lat = weatherData.coord.lat;
    let lon = weatherData.coord.lon;

    var apiCoordURL =
    "http://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    APIKey + "&units=imperial";

    fetch(apiCoordURL)
    .then(function(response) {
        response.json().then(function(data) {
            console.log(data);

                     
                // dataObj = {
                //     date: data.dt_txt.split(' ')[0],
                //     weather: data.weather[0].main,
                //     temp: data.main.temp, 
                //     humidity: data.main.humidity,
                //     wind: data.wind.speed,
                // }
                    
            for (var i = 1; i <= 5; i++) {

            var forecastCardEl = document.createElement('div');
            forecastCardEl.classList = "col-md-2 card text-white bg-primary";

            // card title
            var cardTitleEl = document.createElement('h5');
            cardTitleEl.textContent = moment().add(i, "d").format('l');
                forecastCardEl.append(cardTitleEl);

                // card UL
                var cardListEl = document.createElement('ul');
                forecastCardEl.append(cardListEl);

                // card temp
                var cardTempEl = document.createElement('li');
                cardTempEl.textContent = "Temperature: " + data.list[i].main.temp + "°F";
                cardListEl.append(cardTempEl);

                // // card weather
                // var cardWeatherEl = document.createElement('li');
                // cardWeatherEl.textContent = "Weather: " + data.list[i].weather[0].main;
                // cardListEl.append(cardWeatherEl);

                // card humidity 
                var cardHumidEl = document.createElement('li');
                cardHumidEl.textContent = "Humidity: " + data.list[i].main.humidity + "%";
                cardListEl.append(cardHumidEl);

                // card wind 
                var cardWindEl = document.createElement('li');
                cardWindEl.textContent = "Wind: " + data.list[i].wind.speed + " mph";
                cardListEl.append(cardWindEl);

                

                fiveDayContainer.append(forecastCardEl);
                
          

            


            }
        })
    });

}


// 

    
//       var currWeatherListEl = document.createElement("ul");
//       forecastContainer.append(currWeatherListEl);

//       var temp = document.createElement("li");
//       var wind = document.createElement("li");
//       var humid = document.createElement("li");
//       var descrip = document.createElement("li");

//       temp.textContent = "Temp: " + data.current.temp + " °F";
//       wind.textContent = "Wind: " + data.wind_speed + " MPH";
//       humid.textContent = "Humidity: " + data.main.humidity + "%";
//       descrip.textContent = "Description: " + data.weather.description;

//       currWeatherListEl.append(temp);
//       currWeatherListEl.append(wind);
//       currWeatherListEl.append(humid);
//       currWeatherListEl.append(descrip);


searchForm.addEventListener("submit", citySearchSubmit);