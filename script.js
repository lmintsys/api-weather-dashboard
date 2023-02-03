var cityInput = $("#city");
var APIKey = "5aef1ff47137bc4c0cdefe3adb216acc";
var searchBtn = $("#search-btn");
var cityNameValue = $("#cityName");
var currentTempValue = $("#temperature");
var today = dayjs().format("MM/DD/YYYY");

//Get today's weather, date, and city name
function getCurrentWeather() {
  var city = cityInput.val();
  var requestURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey +
    "&units=imperial";
  console.log("this is the city you typed in: " + cityInput.val());

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    }) // Convert data to json
    .then(function (data) {
      $("#current-weather").show();
      var iconcode = data.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

      console.log(iconurl);
      document.getElementById("city-name").innerHTML =
        data.name + " (" + today + ") ";
      document.getElementById("wicon").setAttribute("src", iconurl);
      document.getElementById("temperature").innerHTML =
        "Temp: " + data.main.temp + " F";
      document.getElementById("wind").innerHTML =
        "Wind: " + data.wind.speed + " MPH";
      document.getElementById("humidity").innerHTML =
        "Humidity: " + data.main.humidity + " %";
    })
    .catch(function () {
      alert("Please enter valid city name!");
      $("#current-weather").hide();
    });
}

//Get 5 day forecast for the requested city
function getForecast() {
  var city = cityInput.val();
  var requestURL =
    "https://api.openweathermap.org/data/2.5/forecast?per_page=5&q=" +
    city +
    "&appid=" +
    APIKey +
    "&units=imperial";
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      $("#five-day-forecast").show();
      console.log(data);

      //Get every 8th object in an array of 40
      //Show only data for 3pm of each day (midday)
      for (i = 0, n = 0; i < 5 && n < 40; i++, n = n + 8) {
        var nextDays = dayjs().add(i + 1, "day");
        nextDays = nextDays.format("MM/DD/YYYY");
        document.getElementById("day" + (i + 1) + "date").innerHTML = nextDays;
        document.getElementById("day" + (i + 1) + "temp").innerHTML =
          "Temp: " + data.list[n].main.temp + " F";
        document.getElementById("day" + (i + 1) + "wind").innerHTML =
          "Wind: " + data.list[n].wind.speed + " MPH";
        document.getElementById("day" + (i + 1) + "temp").innerHTML =
          "Humidity: " + data.list[n].main.humidity + " %";
        var iconcode = data.list[n].weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
        var wicon = document.getElementById("day" + (i + 1) + "wicon");
        wicon.setAttribute("src", iconurl);
      }
    })
    .catch(function () {
      $("#five-day-forecast").hide();
    });
}

//Create new buttons with search history
function searchHistory() {
  var myDiv = document.getElementById("search-history");
  var searchHistoryBtn = document.createElement("BUTTON");
  var inputValue = cityInput.val();
  var text = document.createTextNode(inputValue);

  if (inputValue !== "") {
    searchHistoryBtn.setAttribute("class", "search-history-result");
    searchHistoryBtn.setAttribute("type", "submit");
    searchHistoryBtn.setAttribute("id", inputValue);
    searchHistoryBtn.appendChild(text);
    myDiv.appendChild(searchHistoryBtn);
  }
}

searchBtn.click(getCurrentWeather);
searchBtn.click(getForecast);
searchBtn.click(searchHistory);
