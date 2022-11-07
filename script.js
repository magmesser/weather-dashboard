// The base URL should look like the following: https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}.

var APIKey = "548fe189ee5f7583e55d370db86c3c22";

var city;
var lat;
var lon;

var searchButton = document.getElementById('searchButton');
var searchInputEl = document.getElementById('cityInput').ariaValueMax;

function displayWeatherSearch() {
    console.log('display test');
    var result = document.createElement('li');
};

var getWeatherSearch = function () {
  var queryURL =
    "http://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    APIKey;
  // do i need q= after ? ???

  console.log(queryURL);
//   e.preventDefault();

  fetch(queryURL)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        return response.json().then(function (data) {
          console.log(data);
          displayWeatherSearch(data);
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

searchButton.addEventListener('click', getWeatherSearch);