var APIKey = "548fe189ee5f7583e55d370db86c3c22";
var searchButton = $("#searchButton");
var cityInput = $("#cityInput");
var forecast = $("#forecast");
var searchForm = $("searchForm");

function displayWeatherSearch(result) {
  console.log("display test");
  var result = document.createElement("li");
}

var getWeatherSearch = function (city) {
  var apiURL =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&appid=" +
    APIKey;

  fetch(apiURL)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          var lat = data.coord.lat;
          var lon = data.coord.lon;
          var apiCoordURL =
            "http://api.openweathermap.org/data/2.5/forecast?lat=" +
            lat +
            "&lon=" +
            lon +
            "&appid=" +
            APIKey;

          fetch(apiCoordURL).then(function (response) {
            if (response.ok) {
              response.json().then(function (data) {
                displayWeatherSearch(data);
                console.log(data);
              });
            }
          });
        });
      } else {
        console.log("No results found");
        alert("No results found");
      }
    })
    .catch(function (error) {
      alert("Unable to connect to Open Weather Map");
    });
};

function submitSearch(e) {
  e.preventDefault();

  var city = cityInput.val();

  getWeatherSearch(city);
}

searchForm.on("submit", submitSearch);
// ***this is diff then get weather
