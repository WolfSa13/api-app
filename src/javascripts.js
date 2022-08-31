//feature 1
let now = new Date();

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];

let todaysDate = document.querySelector("#todays-date");


todaysDate.innerHTML = `${day}, ${hours} : ${minutes}`;

//second

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");

  let h1 = document.querySelector("#city-now");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
  } else {
    alert("Please enter in a city");
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

//Show temp

function showTemperature(response) {
  document.querySelector("#temp-now").innerHTML = `${Math.round(response.data.main.temp)}°`;  
  document.querySelector("#city-now").innerHTML = response.data.name; 
 
}

function searchCity(city) {
  let apiKey = "9db9f4f52a4cbd9fe767e34e4a8df7cb";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}


function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input");
  searchCity(city);
}

//location GEO

function searchLocation(position) {
  let units = "metric";
  let apiKey = "9db9f4f52a4cbd9fe767e34e4a8df7cb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}


let currentLocationButton = document.querySelector("#current-position-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
